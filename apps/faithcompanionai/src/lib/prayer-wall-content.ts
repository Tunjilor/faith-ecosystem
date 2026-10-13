// src/lib/prayer-wall-content.ts
// Pure helpers for public Prayer Wall text: cleaning invisible characters and
// rejecting obvious contact details. No I/O — safe to unit test.

// Characters removed outright: zero-width space, word joiner, BOM, soft hyphen, and
// bidirectional embeddings/overrides/isolates (used to disguise text). Zero-width
// joiner/non-joiner (U+200D/U+200C) are kept — emoji sequences and scripts such as
// Persian and Hindi rely on them.
const INVISIBLE = /[​⁠﻿­‪-‮⁦-⁩]/g;
// C0/C1 control characters, including newlines and tabs, become spaces — posts are
// displayed as a single paragraph.
const CONTROL = /[\u0000-\u001F\u007F-\u009F]/g;

export function cleanWallText(v: string) {
  return v.replace(INVISIBLE, "").replace(CONTROL, " ").replace(/\s+/g, " ").trim();
}

// Bare domains ("mysite.com"). Only a fixed list of endings counts, so references such
// as "Ps.23" or "1Cor.13" are never mistaken for links. Endings that are never words
// match in any case ("MySite.Net"); endings that are also words — in English or in
// other languages, such as Spanish "de", Italian "io" or French "ca" — must be
// lowercase, so a missing space after a full stop ("Dios.De…", "the.Top…") is not flagged.
const LABEL = String.raw`\b[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.`;
const BARE_DOMAIN_ANY_CASE = new RegExp(
  `${LABEL}(?:com|net|org|info|biz|xyz|ru|cn|uk|ng|fr|tv|gg|cc|tk|ly|pw|ws|vip|icu|cyou)\\b`,
  "i"
);
const BARE_DOMAIN_LOWERCASE = new RegExp(`${LABEL}(?:co|de|io|ca|app|dev|online|site|top)\\b`);
const LINK = /\bhttps?:\/\/|\bwww\./i;
const EMAIL = /[^\s@]+@[^\s@]+\.[a-z]{2,}/i;
// A run of digits joined only by up to two spaces, dots, dashes or brackets
// (optionally starting with "+"). Colons and slashes break a run, so verse references
// ("John 3:16-18") and dates ("12/10/2026") stay short.
const DIGIT_RUN = /\+?\d(?:[ .\-()]{0,2}\d)+/g;
const MIN_PHONE_DIGITS = 9;

function looksLikePhone(run: string) {
  const digits = run.replace(/\D/g, "");
  if (digits.length < MIN_PHONE_DIGITS) return false;
  // A list of years ("2023 2024 2025") is not a phone number.
  const groups = run.split(/[^\d]+/).filter(Boolean);
  if (groups.every((g) => /^(19|20)\d\d$/.test(g))) return false;
  return true;
}

export type ContactDetail = "link" | "email" | "phone";

// Returns the first kind of contact detail found, or null. Detection runs on an NFKC
// copy so full-width digits and letters are caught; the stored text is unchanged.
export function findContactDetail(v: string): ContactDetail | null {
  const s = v.normalize("NFKC");
  // Email first — an address also contains a domain.
  if (EMAIL.test(s)) return "email";
  if (LINK.test(s) || BARE_DOMAIN_ANY_CASE.test(s) || BARE_DOMAIN_LOWERCASE.test(s)) return "link";
  for (const m of s.matchAll(DIGIT_RUN)) {
    if (looksLikePhone(m[0])) return "phone";
  }
  return null;
}
