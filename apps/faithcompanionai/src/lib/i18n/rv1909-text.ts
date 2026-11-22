// src/lib/i18n/rv1909-text.ts
// Kept separate (no imports) so client components can use it without
// bundling the Bible book map.

/**
 * Modern spelling for RV1909 display: the 1909 text writes the one-letter words
 * "a" and "o" with an accent ("á su Hijo", "ó"). Only those standalone words
 * change; accents inside words ("está", "perdonándoos") and all other wording,
 * vosotros forms included, stay exactly as published.
 */
export function modernizeRv1909(text: string) {
  return text
    .replace(/(?<!\p{L})á(?!\p{L})/gu, "a")
    .replace(/(?<!\p{L})Á(?!\p{L})/gu, "A")
    .replace(/(?<!\p{L})ó(?!\p{L})/gu, "o")
    .replace(/(?<!\p{L})Ó(?!\p{L})/gu, "O");
}
