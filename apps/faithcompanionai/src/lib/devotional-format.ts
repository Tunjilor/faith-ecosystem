// src/lib/devotional-format.ts
//
// Parser for the labeled daily-devotional format (REFERENCE / VERSE /
// REFLECTION / ENCOURAGEMENT) written by generateDailyDevotional. Kept free of
// imports so lib/email can use it without pulling in the OpenAI client.

export type DevotionalParts = {
  reference: string;
  verse: string;
  reflection: string;
  encouragement: string;
};

/**
 * Parses the labeled format produced by generateDailyDevotional. Returns null
 * for older free-form text (e.g. a devotional cached before this format
 * existed) so callers can fall back to rendering the raw text.
 */
export function parseDevotional(text: string): DevotionalParts | null {
  const grab = (label: string) => {
    const m = text.match(
      new RegExp(`^\\s*${label}:\\s*([\\s\\S]*?)(?=^\\s*(?:REFERENCE|VERSE|REFLECTION|ENCOURAGEMENT):|$(?![\\s\\S]))`, "m")
    );
    return m ? m[1].trim() : "";
  };
  const reference = grab("REFERENCE");
  const verse = grab("VERSE").replace(/^["\u201c\u201d']+|["\u201c\u201d']+$/g, "").trim();
  const reflection = grab("REFLECTION");
  const encouragement = grab("ENCOURAGEMENT");
  if (!reference || !verse || !reflection) return null;
  return { reference, verse, reflection, encouragement };
}

/**
 * Pulls the Bible reference out of a stored devotional, in either the labeled
 * format or older free-form text (e.g. "Philippians 4:19 (KJV) ..."). Returns
 * "" when none is found.
 */
export function extractReference(text: string): string {
  const parts = parseDevotional(text);
  if (parts) return parts.reference;
  const m = text.match(/([1-3]?\s?[A-Z][a-z]+(?:\s(?:of\s)?[A-Z][a-z]+)*)\s+(\d+:\d+(?:-\d+)?)/);
  return m ? `${m[1]} ${m[2]}` : "";
}

/**
 * Normalizes a reference for "same verse?" comparisons: drops the translation,
 * case and spacing, and keeps only the first verse of a range, so
 * "Philippians 4:19 (KJV)" and "philippians 4:19-20 (WEB)" match.
 */
export function normalizeReference(ref: string): string {
  return ref
    .replace(/\([^)]*\)/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
    .replace(/(\d+:\d+)-\d+$/, "$1");
}
