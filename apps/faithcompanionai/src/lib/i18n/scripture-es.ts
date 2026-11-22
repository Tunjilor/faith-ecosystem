// src/lib/i18n/scripture-es.ts
// Bible references in Spanish AI replies:
// - recognize references written with English or Spanish book names,
// - rewrite them with RV1909 book names and a "(RV1909)" tag,
// - fetch the RV1909 verse text from bible-api.com (never from model memory).
import { BIBLE_BOOKS, type BibleBook } from "./bible-books";
import { modernizeRv1909 } from "./rv1909-text";

export { modernizeRv1909 };

const BOOK_BY_NAME = new Map<string, BibleBook>();
for (const book of BIBLE_BOOKS) {
  for (const name of [book.en, book.es, ...(book.aliases ?? [])]) {
    BOOK_BY_NAME.set(name, book);
  }
}

// Longest names first so "1 Juan" wins over "Juan" and "Song of Solomon" over "Song".
// Matching is case-sensitive: book names are capitalized, so ordinary words such
// as "números" or "job" in running text are not taken for references.
const NAME_PATTERN = [...BOOK_BY_NAME.keys()]
  .sort((a, b) => b.length - a.length)
  .map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/ /g, "\\s+"))
  .join("|");

// Book + chapter, optionally :verse, a verse range, and ", 18" style extra verses.
const REF_SOURCE =
  `(?<![\\p{L}\\d])(${NAME_PATTERN})\\s+(\\d{1,3})` +
  `(?::(\\d{1,3})(?:[-–](\\d{1,3}))?((?:,\\s?\\d{1,3}(?:[-–]\\d{1,3})?(?![\\d:]|\\s*\\p{Lu}))*))?` +
  `(?![\\d\\p{L}])`;

function refRegex() {
  return new RegExp(REF_SOURCE, "gu");
}

export type ParsedRef = {
  book: BibleBook;
  chapter: number;
  verseStart?: number;
  verseEnd?: number;
  extra: string; // ", 18" style extra verses, kept verbatim
};

function parseMatch(m: RegExpExecArray): ParsedRef | null {
  const book = BOOK_BY_NAME.get(m[1].replace(/\s+/g, " "));
  if (!book) return null;
  return {
    book,
    chapter: Number(m[2]),
    verseStart: m[3] ? Number(m[3]) : undefined,
    verseEnd: m[4] ? Number(m[4]) : undefined,
    extra: m[5] ?? "",
  };
}

// "Salmo 23" (one psalm) is correct Spanish usage next to the RV1909 book name
// "Salmos"; keep it when the reply already says "Salmo" ("el Salmo 23:1",
// never "el Salmos 23:1").
function bookLabel(ref: ParsedRef, written?: string) {
  if (ref.book.id === "PSA" && written === "Salmo") return "Salmo";
  return ref.book.es;
}

function formatRef(ref: ParsedRef, written?: string) {
  let out = `${bookLabel(ref, written)} ${ref.chapter}`;
  if (ref.verseStart) out += `:${ref.verseStart}`;
  if (ref.verseEnd) out += `-${ref.verseEnd}`;
  return out + ref.extra.replace(/\s+/g, " ").replace(/,(\S)/g, ", $1");
}

/** Remove Bible references from a message (used before language detection). */
export function stripBibleReferences(text: string) {
  return text.replace(refRegex(), (match, ...rest) => {
    const m = [match, ...rest] as unknown as RegExpExecArray;
    return parseMatch(m) ? " " : match;
  });
}

// A translation tag the model may have written after a reference:
// "(RVR1960)", "(Reina-Valera 1909)", "(NVI)", ", RV1909" inside parentheses...
const TAG_AFTER =
  /^(\s*\((?:RV|RVR|RVA|Reina|NVI|LBLA|NTV|DHH|TLA|PDT|NBLA|BLP|WEB|KJV|NIV|ESV)[^)]*\)|,\s*(?:RV|RVR|Reina)[^);]*(?=[);]))/i;

/**
 * Rewrite every reference in a Spanish reply with its RV1909 book name and a
 * "(RV1909)" tag, replacing any other translation tag the model added. Inside
 * parentheses the tag becomes ", RV1909" to avoid nested parentheses.
 */
export function formatSpanishReferences(text: string) {
  const re = refRegex();
  let out = "";
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const ref = parseMatch(m);
    if (!ref) continue;
    const end = m.index + m[0].length;
    const tag = TAG_AFTER.exec(text.slice(end));
    const resumeAt = end + (tag ? tag[0].length : 0);

    const before = text.slice(0, m.index);
    const insideParens = before.lastIndexOf("(") > before.lastIndexOf(")");

    out += text.slice(last, m.index) + formatRef(ref, m[1]) +(insideParens ? ", RV1909" : " (RV1909)");
    last = resumeAt;
    re.lastIndex = resumeAt;
  }
  return out + text.slice(last);
}

/** References in a text, in order, without duplicates. */
export function findBibleReferences(text: string): ParsedRef[] {
  const seen = new Set<string>();
  const refs: ParsedRef[] = [];
  const re = refRegex();
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const ref = parseMatch(m);
    if (!ref) continue;
    const key = formatRef(ref);
    if (seen.has(key)) continue;
    seen.add(key);
    refs.push(ref);
  }
  return refs;
}

export function parseBibleReference(text: string): ParsedRef | null {
  const re = refRegex();
  const m = re.exec(text.trim());
  return m ? parseMatch(m) : null;
}

/**
 * Final pass over every Spanish AI reply: lowercase "amén" after a comma
 * ("En el nombre de Jesús, amén.") and RV1909 reference formatting.
 */
export function formatSpanishReply(text: string) {
  const polished = text
    .replace(/,(\s*)Amén(?!\p{L})/gu, ",$1amén")
    // The most common gendered slip aimed at the reader; fixed phrase only.
    .replace(/(?<!\p{L})([Nn])o estás sol[oa](?!\p{L})/gu, "$1o estás a solas");
  return formatSpanishReferences(polished);
}

export type Rv1909Verse ={ reference: string; text: string; translation: "RV1909"; sourceUrl: string };

const MAX_VERSES_PER_PASSAGE = 6;
const verseCache = new Map<string, Rv1909Verse | null>();

/**
 * RV1909 text for one reference from bible-api.com. Chapter-only references
 * and long ranges are skipped (too long to show in a reply). Returns null on
 * any failure so callers can simply leave the passage out.
 */
export async function fetchRv1909(ref: ParsedRef, timeoutMs = 4000): Promise<Rv1909Verse | null> {
  if (!ref.verseStart) return null;
  const end = ref.verseEnd ?? ref.verseStart;
  if (end < ref.verseStart || end - ref.verseStart + 1 > MAX_VERSES_PER_PASSAGE) return null;

  const verses = end === ref.verseStart ? `${ref.verseStart}` : `${ref.verseStart}-${end}`;
  const query = `${ref.book.id} ${ref.chapter}:${verses}`;
  if (verseCache.has(query)) return verseCache.get(query) ?? null;

  const sourceUrl = `https://bible-api.com/${encodeURIComponent(query)}?translation=rv1909`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(sourceUrl, { cache: "no-store", signal: controller.signal });
    if (!res.ok) {
      if (res.status === 404) verseCache.set(query, null);
      return null;
    }
    const data: any = await res.json();
    const raw = typeof data?.text === "string" ? data.text.replace(/\s+/g, " ").trim() : "";
    const text = modernizeRv1909(raw);
    if (!text || data?.translation_id !== "rv1909") return null;
    const verse: Rv1909Verse = {
      reference: `${ref.book.es} ${ref.chapter}:${verses}`,
      text,
      translation: "RV1909",
      sourceUrl,
    };
    verseCache.set(query, verse);
    return verse;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** RV1909 text for the first `limit` verse-level references in a reply. */
export async function rv1909VersesFor(text: string, limit = 3): Promise<Rv1909Verse[]> {
  const refs = findBibleReferences(text).filter((r) => r.verseStart).slice(0, limit);
  const results = await Promise.all(refs.map((r) => fetchRv1909(r)));
  return results.filter((v): v is Rv1909Verse => v !== null);
}
