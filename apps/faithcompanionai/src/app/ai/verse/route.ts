import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { getOpenAI } from "@/lib/ai/openai";
import { sha256 } from "@/lib/ai/hash";
import { dayKeyUTC } from "@/lib/verse/pick-daily";
import { getUserKeyMaybeEmail } from "@/lib/auth/user-key";
import type { Locale } from "@/lib/i18n/config";
import { languageInstruction, parseLocaleField, replyLanguage } from "@/lib/i18n/reply-language";
import { fetchRv1909, formatSpanishReply, parseBibleReference } from "@/lib/i18n/scripture-es";
import { RELATIONSHIP_SAFETY_PROMPT, withSafetyResources } from "@/lib/ai/relationship-safety";

export const runtime = "nodejs";

type Kind = "explain" | "devotional" | "qa";

function buildPrompt(args: {
  kind: Kind;
  reference: string;
  verseText: string;
  question?: string;
  lang: Locale;
  translation: "WEB" | "RV1909";
}) {
  const languageLine =
    args.lang === "en" ? "Use clear, modern English." : languageInstruction(args.lang);
  const base = `You are FaithCompanionAI.
Be biblically respectful and doctrinally neutral.
Do not claim new revelation. Avoid stating denominations are correct/incorrect.
${RELATIONSHIP_SAFETY_PROMPT}
${languageLine}

Scripture (${args.translation}):
${args.reference}
"${args.verseText}"`;

  if (args.kind === "explain") {
    return `${base}

Task: Explain the verse plainly for a general Christian audience.
Include:
- 3–6 sentence explanation
- 3 practical takeaways (bullets)
- 1 short prayer (2–3 sentences)`;
  }

  if (args.kind === "devotional") {
    return `${base}

Task: Write a short devotional (150–250 words) based on the verse.
Include:
- Title
- Reflection
- One action step
- Short closing prayer`;
  }

  // qa
  return `${base}

User question: ${args.question || ""}

Task: Answer using Scripture first. If uncertain, say so.
Keep it under 180 words.`;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  const kind = body?.kind as Kind;
  const reference = String(body?.reference || "");
  const verseText = String(body?.verseText || "");
  const question = body?.question ? String(body.question) : undefined;
  const localeField = parseLocaleField(body?.locale);

  if (!localeField.ok) {
    return NextResponse.json({ error: localeField.error }, { status: 400 });
  }
  const locale = localeField.locale;
  // Q&A follows the language of the question; explain/devotional follow the page.
  const lang: Locale = kind === "qa" && question ? replyLanguage(question, locale) : locale;

  // Spanish answers use the RV1909 text from bible-api.com, never the client's
  // (English WEB) text or the model's memory, so verseText is optional for them.
  if (!kind || !reference || (lang === "en" && !verseText)) {
    return NextResponse.json({ error: "Missing kind/reference/verseText" }, { status: 400 });
  }

  let scripture = { reference, verseText, translation: "WEB" as "WEB" | "RV1909" };
  if (lang === "es") {
    const ref = parseBibleReference(reference);
    const verse = ref ? await fetchRv1909(ref) : null;
    if (!verse) {
      return NextResponse.json(
        { error: "No se pudo cargar el texto RV1909 de ese pasaje." },
        { status: 502 }
      );
    }
    scripture = { reference: verse.reference, verseText: verse.text, translation: "RV1909" };
  }

  const { userKey } = getUserKeyMaybeEmail();
  const dayKey = dayKeyUTC();

  // Daily abuse/cost limit per userKey
  const usage = await db.aiUsage.upsert({
    where: { dayKey_userKey: { dayKey, userKey } },
    update: { count: { increment: 1 } },
    create: { dayKey, userKey, count: 1 },
  });

  if (usage.count > 500) {
    return NextResponse.json(
      { error: "Daily limit reached. Please try again tomorrow." },
      { status: 429 }
    );
  }

  // Locale and reply language are part of the key so English and Spanish
  // answers for the same verse never share a cache row.
  const inputJson = JSON.stringify({
    kind,
    reference: scripture.reference,
    verseText: scripture.verseText,
    question,
    locale,
    lang,
  });
  const cacheKey = sha256(inputJson);
  const verse =
    lang === "es"
      ? { reference: `${scripture.reference} (RV1909)`, text: scripture.verseText, translation: "RV1909" }
      : undefined;

  const cached = await db.aiCache.findUnique({ where: { cacheKey } });
  if (cached) {
    return NextResponse.json({ cached: true, output: cached.outputText, lang, verse });
  }

  const prompt = buildPrompt({
    kind,
    reference: scripture.reference,
    verseText: scripture.verseText,
    question,
    lang,
    translation: scripture.translation,
  });

  const client = getOpenAI();

  // Using Responses API style
  const resp = await client.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
  });

  const rawOutput =
    resp.output_text?.trim?.() ||
    // fallback if SDK shape changes
    (resp as any)?.output?.[0]?.content?.[0]?.text?.trim?.() ||
    "";
  const formatted = lang === "es" ? formatSpanishReply(rawOutput) : rawOutput;
  const output = rawOutput ? withSafetyResources(formatted, question ?? "", lang) : "";

  if (!output) {
    return NextResponse.json({ error: "Empty AI output" }, { status: 500 });
  }

  await db.aiCache.create({
    data: {
      cacheKey,
      kind,
      translation: scripture.translation,
      reference: scripture.reference,
      inputJson,
      outputText: output,
    },
  });

  return NextResponse.json({ cached: false, output, lang, verse });
}
