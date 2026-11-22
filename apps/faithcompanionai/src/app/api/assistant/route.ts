// src/app/api/assistant/route.ts
import { NextResponse } from "next/server";
import { enforceAskQuotaFromSessionOrThrow } from "@/lib/access";
import { extractOutputText, getModel, getOpenAI } from "@/lib/openai-ts";
import { languageInstruction, parseLocaleField, replyLanguageInConversation } from "@/lib/i18n/reply-language";
import { formatSpanishReply, rv1909VersesFor } from "@/lib/i18n/scripture-es";
import { RELATIONSHIP_SAFETY_PROMPT, withSafetyResources } from "@/lib/ai/relationship-safety";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `You are a calm, Scripture-grounded Christian faith assistant called "Spiritual Assistant."
Help users with Bible questions, faith encouragement, short prayers, devotional reflections, and spiritual guidance.
Keep responses concise (2–4 sentences), warm, and conversational.
Cite a Bible reference where naturally relevant, but don't force it into every response.
Never preach — simply encourage and guide.`;

type HistoryMsg = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  try {
    const quotaInfo = await enforceAskQuotaFromSessionOrThrow();

    const body = await req.json().catch(() => null);
    const message = body?.message as string | undefined;
    const history: HistoryMsg[] = Array.isArray(body?.history) ? body.history : [];
    const localeField = parseLocaleField(body?.locale);

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Missing message." }, { status: 400 });
    }
    if (!localeField.ok) {
      return NextResponse.json({ error: localeField.error }, { status: 400 });
    }

    // Reply in the language of the latest message; if it has none ("amén"),
    // the person's previous message decides; the page locale only at the start.
    const lang = replyLanguageInConversation(message, history.slice(-10), localeField.locale);

    const client = getOpenAI();
    const model = getModel();

    // chat.completions natively supports alternating user/assistant history;
    // responses.create() does not accept role:"assistant" turns in its input array
    const recentHistory = history.slice(-10);
    const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
      { role: "system", content: `${SYSTEM_PROMPT}
${RELATIONSHIP_SAFETY_PROMPT}
${languageInstruction(lang)}` },
      ...recentHistory.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: message.trim() },
    ];

    const resp = await client.chat.completions.create({
      model,
      messages,
      temperature: 0.7,
    });

    const raw = resp.choices[0]?.message?.content?.trim() ?? "";

    if (!raw) {
      return NextResponse.json({ error: "Empty response from AI." }, { status: 500 });
    }

    if (lang === "es") {
      // RV1909 book names + "(RV1909)" tags, and verse text from bible-api.com.
      const reply = withSafetyResources(formatSpanishReply(raw), message, "es");
      const verses = await rv1909VersesFor(reply, 2);
      return NextResponse.json({ reply, lang, verses, quota: quotaInfo });
    }

    const reply = withSafetyResources(raw, message, "en");
    return NextResponse.json({ reply, lang, quota: quotaInfo });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Server error", code: err?.code || null },
      { status: err?.status || 500 }
    );
  }
}
