// src/lib/ai/relationship-safety.ts
// Safety rules for marriage/relationship topics, shared by every AI prompt
// (/api/ask, /api/assistant, /ai/verse) in both languages.
//
// 1. RELATIONSHIP_SAFETY_PROMPT is appended to the system prompt: support
//    healing and communication, never urge staying together, and put safety
//    first when someone mentions abuse, fear, threats or danger.
// 2. withSafetyResources() is a server-side safety net: when the person's own
//    words suggest danger in a relationship and the reply left out the
//    hotline, the hotline and 911 are appended, so this never depends on the
//    model alone.
import type { Locale } from "@/lib/i18n/config";

export const HOTLINE_NUMBER = "1-800-799-7233";

export const RELATIONSHIP_SAFETY_PROMPT = `Marriage and relationship topics: support healing, honest communication and wise counsel (a pastor, a counselor). Never urge the person to stay in the relationship, to stay together, or to choose "reconciliation instead of separation", and never suggest that enduring mistreatment is what God wants.
If the person mentions abuse, fear of a partner or family member, threats, or danger, put their safety first: say clearly that they do not deserve to be harmed and that their safety matters to God, do not encourage reconciliation, and include the National Domestic Violence Hotline, ${HOTLINE_NUMBER} (Spanish available, 24/7, free and confidential), and 911 for immediate danger. In Spanish replies write it as: la National Domestic Violence Hotline (Línea Nacional de Violencia Doméstica) al ${HOTLINE_NUMBER}, con atención en español, y el 911 si estás en peligro inmediato.`;

function fold(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}

// Clear abuse on its own is enough.
const ABUSE = [
  /\babus(e|ed|es|ing|ive|er)\b/, /\bdomestic violence\b/, /\b(hits?|hit|beats?|beat|chokes?|choked|slaps?|slapped|pushes|pushed|shoves?|shoved) me\b/,
  /\bhurts? me\b/, /\bthreaten(s|ed|ing)? (me|to)\b/,
  /\babus(o|a|an|aba|ador|adora|ivo|iva)\b/, /\bmaltrat(o|a|an|aba|ado|ada)\b/, /\bviolencia\b/, /\bviolent[oa]\b/,
  /\bme (pega|pego|golpea|golpeo|golpeaba|empuja|empujo|ahorca|ahorco|lastima|lastimo|amenaza|amenazo|amenazaba)\b/, /\bamenaz(a|o|aba) con\b/,
];
// Fear or danger counts when a partner is mentioned (parents etc. are covered
// by the explicit abuse patterns, so "afraid for my dad's health" doesn't trigger).
const FEAR = [
  /\bafraid\b/, /\bscared\b/, /\bfear\b/, /\bfrightened\b/, /\bterrified\b/, /\bunsafe\b/, /\bdanger(ous)?\b/,
  /\bmiedo\b/, /\bme asusta\b/, /\basustad[oa]\b/, /\baterrad[oa]\b/, /\bpeligro\b/, /\bpeligros[oa]\b/, /\binsegur[oa]\b/,
];
const RELATIONSHIP = [
  /\b(husband|wife|spouse|partner|boyfriend|girlfriend|fiance|fiancee|marriage|married|ex)\b/,
  /\b(espos[oa]|marido|pareja|novi[oa]|matrimonio|casad[oa]|prometid[oa]|ex)\b/,
];

/** True when the person's words suggest abuse, or fear/danger in a relationship. */
export function mentionsRelationshipDanger(text: string) {
  const t = fold(text);
  if (ABUSE.some((re) => re.test(t))) return true;
  return FEAR.some((re) => re.test(t)) && RELATIONSHIP.some((re) => re.test(t));
}

const RESOURCES: Record<Locale, string> = {
  en: `If you are in immediate danger, call 911. You can also call the National Domestic Violence Hotline at ${HOTLINE_NUMBER} (Spanish available), 24/7, free and confidential.`,
  es: `Si estás en peligro inmediato, llama al 911. También puedes llamar a la National Domestic Violence Hotline (Línea Nacional de Violencia Doméstica) al ${HOTLINE_NUMBER}, con atención en español, las 24 horas, gratis y confidencial.`,
};

/** Append the hotline and 911 when the person's words need them and the reply left them out. */
export function withSafetyResources(reply: string, userWords: string, lang: Locale) {
  if (!mentionsRelationshipDanger(userWords)) return reply;
  if (reply.includes(HOTLINE_NUMBER) && /\b911\b/.test(reply)) return reply;
  return `${reply.trimEnd()}\n\n${RESOURCES[lang]}`;
}
