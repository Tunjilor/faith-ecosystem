// src/lib/devotional.ts
//
// Shared daily-devotional generator. Uses the SAME generation path as the
// devotional tool (/api/ask devotional mode): the openai-ts client + model +
// output extractor, called via responses.create. Produces ONE general
// (non-personalized) devotional for the whole list — verse + short reflection
// + a closing line of encouragement — using only public-domain WEB/KJV
// scripture, consistent with the rest of the site.

import { getOpenAI, getModel, extractOutputText } from "@/lib/openai-ts";

const DAILY_DEVOTIONAL_SYSTEM = `You are the devotional writer for Faith Companion AI's free daily devotional email, sent to a general Christian audience. Write ONE short daily devotional in plain text (no markdown, no title, no headings), in this exact order:

1) One encouraging Bible verse: the reference, then the verse text in quotes. Use ONLY public-domain scripture — the World English Bible (WEB) or the King James Version (KJV). Put the translation in parentheses right after the reference, e.g. "Isaiah 41:10 (WEB)".
2) A short reflection: 2-4 warm, encouraging sentences.
3) One closing line of encouragement.

Keep it GENERAL and universally encouraging for any reader — do NOT address a specific person, name, or situation, and do not ask the reader for details. No action steps, no multiple sections. Quote ONLY WEB or KJV (public domain). Vary the verse and theme so it feels fresh day to day.`;

/**
 * Generates one general daily devotional. Returns trimmed text (may be empty
 * if the model returns nothing — callers must handle the empty case and skip
 * sending rather than mailing a blank email). Throws on API/transport errors.
 */
export async function generateDailyDevotional(): Promise<string> {
  const client = getOpenAI();
  const model = getModel();

  const resp = await client.responses.create({
    model,
    input: [
      { role: "system", content: DAILY_DEVOTIONAL_SYSTEM },
      { role: "user", content: "Write today's general daily devotional." },
    ],
    temperature: 0.7,
  });

  return extractOutputText(resp).trim();
}
