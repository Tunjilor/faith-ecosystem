// src/lib/i18n/rv1909-text.ts
// Kept separate (no imports) so client components can use it without
// bundling the Bible book map.

// Whole words whose 1909 accent modern Spanish dropped, and their modern form.
// Deliberately short: nothing beyond this list changes.
const WORDS: ReadonlyArray<[string, string]> = [
  ["á", "a"], ["Á", "A"],
  ["ó", "o"], ["Ó", "O"],
  ["fué", "fue"], ["Fué", "Fue"],
  ["fuí", "fui"], ["Fuí", "Fui"],
  ["dió", "dio"], ["Dió", "Dio"],
  ["vió", "vio"], ["Vió", "Vio"],
];

const WORD_PATTERNS = WORDS.map(([old, modern]) => [new RegExp(`(?<!\\p{L})${old}(?!\\p{L})`, "gu"), modern] as const);

/**
 * Modern spelling for RV1909 display, whole words only: "á"→"a", "ó"→"o",
 * "fué"→"fue", "fuí"→"fui", "dió"→"dio", "vió"→"vio" (and capitalized forms).
 * Accents inside other words ("está", "perdonándoos") and all other wording,
 * vosotros forms included, stay exactly as published.
 */
export function modernizeRv1909(text: string) {
  return WORD_PATTERNS.reduce((out, [re, modern]) => out.replace(re, modern), text);
}
