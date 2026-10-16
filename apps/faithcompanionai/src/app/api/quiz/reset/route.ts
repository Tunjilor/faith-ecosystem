// src/app/api/quiz/reset/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { readSessionToken, sessionCookieName } from "@/lib/session";
import { ensureGuestCookie } from "@/lib/guest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const QUESTIONS_PER_QUIZ = 10;

type SessionPayload = { uid: string; exp: number };

function getUtcDayRange(d = new Date()) {
  const start = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0));
  const end = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1, 0, 0, 0));
  return { start, end };
}

async function getActor() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) return { ok: false as const, error: "missing_secret" as const };

  const c = cookies();
  const token = c.get(sessionCookieName())?.value;
  const payload = token ? readSessionToken<SessionPayload>(token, secret) : null;
  const isAuthed = !!payload && Date.now() <= payload.exp;

  if (isAuthed) {
    const user = await db.user.findUnique({ where: { id: payload!.uid } });
    if (user) {
      return {
        ok: true as const,
        actorKey: `user:${user.id}`,
        userId: user.id,
        email: user.email,
      };
    }
  }

  const guest = ensureGuestCookie(secret);

  return {
    ok: true as const,
    actorKey: `guest:${guest.id}`,
    userId: null as string | null,
    email: null as string | null,
  };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as { attemptId?: string | null };
    const attemptId = String(body?.attemptId || "").trim();
    if (!attemptId) return NextResponse.json({ ok: false, error: "missing_attemptId" }, { status: 400 });

    const ident = await getActor();
    if (!ident.ok) return NextResponse.json({ ok: false, error: ident.error }, { status: 500 });

    // Load attempt + verify ownership
    const attempt = await db.quizAttempt.findUnique({ where: { id: attemptId } });
    if (!attempt) return NextResponse.json({ ok: false, error: "attempt_not_found" }, { status: 404 });

    if (attempt.actorKey !== ident.actorKey) {
      return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
    }

    // Only allow resetting TODAY’s attempt (prevents “infinite do-overs” on old attempts)
    const { start, end } = getUtcDayRange();
    if (!(attempt.createdAt >= start && attempt.createdAt < end)) {
      return NextResponse.json(
        { ok: false, error: "reset_not_allowed", message: "You can only reset today’s quiz." },
        { status: 403 }
      );
    }

    // Reset answers + correctness + score
    await db.quizAttemptQuestion.updateMany({
      where: { attemptId },
      data: { chosen: null, isCorrect: null },
    });

    await db.quizAttempt.update({
      where: { id: attemptId },
      data: { score: 0, total: QUESTIONS_PER_QUIZ },
    });

    // Return the same questions again (unchanged set, but chosen = null)
    const linked = await db.quizAttemptQuestion.findMany({
  where: { attemptId },
  include: { question: true },
  orderBy: { id: "asc" },
});

const questions = linked.map((row: any) => ({
  id: row.question.id,
  category: row.question.category,
  prompt: row.question.prompt,
  choices: {
    A: row.question.optionA,
    B: row.question.optionB,
    C: row.question.optionC,
    D: row.question.optionD,
  },
  chosen: null,
}));

    return NextResponse.json({
      ok: true,
      attemptId,
      category: attempt.category,
      timed: attempt.timed,
      questions,
    });
  } catch (err) {
    console.error("RESET QUIZ ERROR:", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}