// src/app/api/quiz/start/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { readSessionToken, sessionCookieName } from "@/lib/session";
import { ensureGuestCookie } from "@/lib/guest";
import { generateQuizQuestions, supportsGeneration } from "@/lib/quiz-generate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const QUESTIONS_PER_QUIZ = 10;

type SessionPayload = { uid: string; exp: number };
type CategoryId =
  | "general"
  | "women"
  | "parables"
  | "ai"
  | "theology"
  | "history"
  | "christmas"
  | "thanksgiving"
  | "new-year";
type Choice = "A" | "B" | "C" | "D";

const CATEGORY_LABELS: Record<CategoryId, string> = {
  general: "General Bible Knowledge",
  women: "Women of the Bible",
  parables: "Jesus’ Parables",
  ai: "AI Bible Questions",
  theology: "Theology",
  history: "Church History",
  christmas: "Christmas & the Nativity",
  thanksgiving: "Thanksgiving & Gratitude",
  "new-year": "New Year & New Beginnings",
};

// Seasonal categories skip no-repeat seen tracking and always draw from the full pool.
// Keyed off this flag set, not scattered slug checks.
const SEASONAL_CATEGORIES = new Set<CategoryId>(["christmas", "thanksgiving", "new-year"]);

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableDbError(err: unknown) {
  const msg = err instanceof Error ? err.message : String(err || "");
  return (
    msg.includes("Can't reach database server") ||
    msg.includes("PrismaClientInitializationError") ||
    msg.includes("Error in PostgreSQL connection") ||
    msg.includes("kind: Closed") ||
    msg.includes("P1001")
  );
}

async function withDbRetry<T>(
  fn: () => Promise<T>,
  attempts = 3,
  delayMs = 1250
): Promise<T> {
  let lastErr: unknown;

  for (let i = 0; i < attempts; i += 1) {
    try {
      await db.$queryRaw`SELECT 1`;
      return await fn();
    } catch (err) {
      lastErr = err;
      if (!isRetryableDbError(err) || i === attempts - 1) {
        throw err;
      }
      await sleep(delayMs);
    }
  }

  throw lastErr;
}

function shuffle<T>(items: T[]) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function getActor() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    return { ok: false as const, error: "missing_secret" as const };
  }

  const cookieStore = cookies();
  const token = cookieStore.get(sessionCookieName())?.value;
  const payload = token ? readSessionToken<SessionPayload>(token, secret) : null;
  const isAuthed = !!payload && Date.now() <= payload.exp;

  if (isAuthed) {
    const user = await withDbRetry(() =>
      db.user.findUnique({
        where: { id: payload!.uid },
      })
    );

    if (user) {
      return {
        ok: true as const,
        actorKey: `user:${user.id}`,
        userId: user.id,
        email: user.email,
      };
    }
  }

  const guest = ensureGuestCookie(cookieStore as any, secret);

  return {
    ok: true as const,
    actorKey: `guest:${guest.id}`,
    userId: null as string | null,
    email: null as string | null,
  };
}

export async function POST(req: Request) {
  try {
    let body: { category?: string; timed?: boolean; clientSeenIds?: string[] } = {};
    try {
      const text = await req.text();
      if (text) body = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { ok: false, error: "invalid_body", message: "Request body must be valid JSON." },
        { status: 400 }
      );
    }

    const rawCategory = typeof body?.category === "string" ? body.category.trim() : "";
    const timed = Boolean(body?.timed);

    const validCategories = new Set<string>(Object.keys(CATEGORY_LABELS));
    if (!rawCategory || !validCategories.has(rawCategory)) {
      return NextResponse.json(
        {
          ok: false,
          error: "invalid_category",
          message: `Invalid category. Valid options: ${[...validCategories].join(", ")}.`,
        },
        { status: 400 }
      );
    }

    // Narrowed to CategoryId after the set check above
    const category = rawCategory as CategoryId;
    const isSeasonal = SEASONAL_CATEGORIES.has(category);

    const ident = await getActor();
    if (!ident.ok) {
      return NextResponse.json(
        { ok: false, error: ident.error },
        { status: 500 }
      );
    }

    // Seasonal categories have no no-repeat tracking: skip the seen read
    // entirely and allow repeats from the full pool.
    const seenRows = isSeasonal
      ? []
      : await withDbRetry(() =>
          db.quizSeenQuestion.findMany({
            where: {
              actorKey: ident.actorKey,
              category,
            },
            select: {
              questionId: true,
            },
          })
        );

    // Merge server-tracked seen IDs with any client-side localStorage IDs (guests).
    // Skipped for seasonal categories so they never de-duplicate.
    const clientSeenIds =
      !isSeasonal && Array.isArray(body.clientSeenIds)
        ? (body.clientSeenIds as unknown[]).filter((s): s is string => typeof s === "string").slice(0, 500)
        : [];
    const seenIds = [...new Set([...seenRows.map((row) => row.questionId), ...clientSeenIds])];

    let candidateRows = await withDbRetry(() =>
      db.question.findMany({
        where: {
          category,
          ...(seenIds.length > 0 ? { id: { notIn: seenIds } } : {}),
        },
      })
    );

    if (candidateRows.length < QUESTIONS_PER_QUIZ) {
      if (supportsGeneration(category)) {
        // Generate fresh questions to fill the gap and save them to the bank.
        const deficit = QUESTIONS_PER_QUIZ - candidateRows.length;
        try {
          // Fetch recent prompts so OpenAI avoids near-duplicates.
          const existingPrompts = await withDbRetry(() =>
            db.question.findMany({
              where: { category },
              select: { prompt: true },
              orderBy: { createdAt: "desc" },
              take: 60,
            })
          );

          // Ask for a couple of extras to absorb any validation failures.
          const generated = await generateQuizQuestions(
            category,
            deficit + 2,
            existingPrompts.map((q) => q.prompt)
          );

          if (generated.length > 0) {
            await withDbRetry(() =>
              db.question.createMany({
                data: generated.map((q) => ({
                  category,
                  prompt: q.prompt.trim(),
                  optionA: q.optionA.trim(),
                  optionB: q.optionB.trim(),
                  optionC: q.optionC.trim(),
                  optionD: q.optionD.trim(),
                  answer: q.answer,
                  explanation: q.explanation?.trim() ?? null,
                })),
                skipDuplicates: true,
              })
            );

            // Fetch back the newly inserted rows (by prompt) so we have their DB ids.
            const newRows = await withDbRetry(() =>
              db.question.findMany({
                where: {
                  category,
                  prompt: { in: generated.map((q) => q.prompt.trim()) },
                },
              })
            );

            // Append only rows the user hasn't already seen.
            const seenIdSet = new Set(seenIds);
            for (const row of newRows) {
              if (!seenIdSet.has(row.id)) {
                candidateRows.push(row);
                seenIdSet.add(row.id); // prevent double-adding if prompt matched multiple rows
              }
            }
          }
        } catch (err) {
          console.error("[quiz/start] question generation failed:", err);
        }

        // If generation didn't fully cover the deficit (API failure, low yield, etc.),
        // fall back to the full pool so the quiz always has enough questions.
        if (candidateRows.length < QUESTIONS_PER_QUIZ) {
          candidateRows = await withDbRetry(() =>
            db.question.findMany({ where: { category } })
          );
        }
      } else {
        // No generator for this category: allow repeats from the full pool.
        candidateRows = await withDbRetry(() =>
          db.question.findMany({ where: { category } })
        );
      }
    }

    // Deduplicate by ID before slicing — guards against any upstream duplicate
    // (e.g. DB retry inserting createMany twice) reaching the client.
    const seen = new Set<string>();
    const rows = shuffle(candidateRows).filter((q) => {
      if (seen.has(q.id)) return false;
      seen.add(q.id);
      return true;
    }).slice(0, QUESTIONS_PER_QUIZ);

    if (!rows || rows.length < QUESTIONS_PER_QUIZ) {
      return NextResponse.json(
        {
          ok: false,
          error: "not_enough_questions",
          message: `Not enough questions found for ${category}.`,
        },
        { status: 400 }
      );
    }

    const attempt = await withDbRetry(() =>
      db.quizAttempt.create({
        data: {
          actorKey: ident.actorKey,
          userId: ident.userId,
          email: ident.email,
          category,
          timed,
          score: 0,
          total: QUESTIONS_PER_QUIZ,
        },
      })
    );

    await withDbRetry(() =>
      db.quizAttemptQuestion.createMany({
        data: rows.map((q) => ({
          attemptId: attempt.id,
          questionId: q.id,
        })),
        skipDuplicates: true,
      })
    );

    // Seasonal categories are not tracked for no-repeat, so don't record seen questions.
    if (!isSeasonal) {
      await withDbRetry(() =>
        db.quizSeenQuestion.createMany({
          data: rows.map((q) => ({
            actorKey: ident.actorKey,
            category,
            questionId: q.id,
          })),
          skipDuplicates: true,
        })
      );
    }

    const questions = rows.map((q) => ({
      id: q.id,
      category: q.category,
      prompt: q.prompt,
      choices: {
        A: q.optionA,
        B: q.optionB,
        C: q.optionC,
        D: q.optionD,
      },
      chosen: null as Choice | null,
    }));

    return NextResponse.json({
      ok: true,
      attemptId: attempt.id,
      category,
      timed,
      questions,
    });
  } catch (err) {
    console.error("START QUIZ ERROR:", err);

    if (isRetryableDbError(err)) {
      return NextResponse.json(
        {
          ok: false,
          error: "db_waking",
          message: "The database is waking up. Please try again in a few seconds.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        ok: false,
        error: "server_error",
        message: "Could not start quiz. Please try again.",
      },
      { status: 500 }
    );
  }
}