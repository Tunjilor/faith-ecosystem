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
