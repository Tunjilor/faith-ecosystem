// src/lib/ai/relationship-safety.ts
// Safety rules for marriage/relationship topics, shared by every AI prompt
// (/api/ask, /api/assistant, /ai/verse) in both languages.
//
// 1. RELATIONSHIP_SAFETY_PROMPT is appended to the system prompt: support
//    healing and communication, never urge staying together, and put safety
//    first when someone describes abuse, fear of a partner, threats or danger.
// 2. withSafetyResources() is a server-side safety net, so this never depends
//    on the model alone. It works at two levels:
//    - "clear": danger is described (abuse, fear of the partner, a partner who
//      yells/insults/controls plus fear, feeling unsafe). The full block with
//      911 and the hotline is appended if the reply left it out.
//    - "possible": a partner and fear are only mentioned together ("mi esposo
//      perdió el trabajo y tengo miedo por el futuro"). One gentle sentence is
//      appended instead, since people in a harmful relationship often don't say
//      so at first, but the reply should not treat the message as abuse.
import type { Locale } from "@/lib/i18n/config";

export const HOTLINE_NUMBER = "1-800-799-7233";

const FULL_BLOCK: Record<Locale, string> = {
  en: `If you are in immediate danger, call 911. You can also call the National Domestic Violence Hotline at ${HOTLINE_NUMBER} (Spanish available), 24/7, free and confidential.`,
  es: `Si estás en peligro inmediato, llama al 911. También puedes llamar a la National Domestic Violence Hotline (Línea Nacional de Violencia Doméstica) al ${HOTLINE_NUMBER}, con atención en español, las 24 horas, gratis y confidencial.`,
};

const GENTLE_LINE: Record<Locale, string> = {
  en: `If you ever feel unsafe at home, you can call the National Domestic Violence Hotline at ${HOTLINE_NUMBER} (Spanish available), or 911 in an emergency.`,
  es: `Si alguna vez te sientes en peligro en casa, puedes llamar a la National Domestic Violence Hotline al ${HOTLINE_NUMBER} (con atención en español), o al 911 en una emergencia.`,
};

export const RELATIONSHIP_SAFETY_PROMPT = `Marriage and relationship topics: support healing, honest communication and wise counsel (a pastor, a counselor). Never urge the person to stay in the relationship, to stay together, or to choose "reconciliation instead of separation", and never suggest that enduring mistreatment is what God wants.
If the person describes abuse, fear of their partner or a family member, threats, or danger, put their safety first: say clearly that they do not deserve to be harmed and that their safety matters to God, do not encourage reconciliation, and include both resources. In English replies write exactly: "${FULL_BLOCK.en}" In Spanish replies write exactly: "${FULL_BLOCK.es}"
If they only mention a partner and a worry or fear about something else (money, a job, health, the future), do not treat it as abuse and do not add the hotline or 911 yourself: answer the actual concern. The app adds one gentle safety sentence on its own.`;

function fold(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}

// Abuse described in so many words: enough on its own.
const ABUSE = [
  /\babus(e|ed|es|ing|ive|er)\b/, /\bdomestic violence\b/, /\b(hits?|hit|beats?|beat|chokes?|choked|slaps?|slapped|pushes|pushed|shoves?|shoved) me\b/,
  /\bhurts? me\b/, /\bthreaten(s|ed|ing)? (me|to)\b/,
  /\babus(o|a|an|aba|ador|adora|ivo|iva)\b/, /\bmaltrat(o|a|an|aba|ado|ada)\b/, /\bviolencia\b/, /\bviolent[oa]\b/,
  /\bme (pega|pego|golpea|golpeo|golpeaba|empuja|empujo|ahorca|ahorco|lastima|lastimo|amenaza|amenazo|amenazaba)\b/, /\bamenaz(a|o|aba) con\b/,
];
// Fear aimed at the partner ("tengo miedo de mi esposo", "afraid of him").
const FEAR_OF_PARTNER = [
  /\b(afraid|scared|terrified|frightened) of (my )?(husband|wife|spouse|partner|boyfriend|girlfriend|fiance|fiancee|ex|him|her)\b/,
  /\b(miedo|temor|panico) (a|de) (mi )?(espos[oa]|marido|pareja|novi[oa]|prometid[oa]|ex|el|ella)\b/,
  /\ble tengo miedo\b/, /\bme da miedo (mi )?(espos[oa]|marido|pareja|novi[oa]|el|ella)\b/,
];
// The partner doing something hostile; with fear this counts as clear danger.
const HOSTILE = [
  /\b(yells|yelled|screams|screamed|shouts|shouted) at me\b/, /\b(insults|insulted|humiliates|humiliated|controls|controlled|locks|locked) me\b/,
  /\bme (grita|gritaba|insulta|insultaba|humilla|humillaba|controla|controlaba|encierra|encerro|cela|celaba)\b/,
];
// Feeling unsafe or in danger (stronger than worry).
const DANGER = [
  /\bunsafe\b/, /\bin danger\b/, /\bdangerous\b/, /\bnot safe\b/,
  /\ben peligro\b/, /\bpeligros[oa]\b/, /\binsegur[oa]\b/, /\bno me siento segur[oa]\b/,
];
const FEAR = [
  /\bafraid\b/, /\bscared\b/, /\bfear\b/, /\bfrightened\b/, /\bterrified\b/,
  /\bmiedo\b/, /\bme asusta\b/, /\basustad[oa]\b/, /\baterrad[oa]\b/, /\btemor\b/,
];
const RELATIONSHIP = [
  /\b(husband|wife|spouse|partner|boyfriend|girlfriend|fiance|fiancee|marriage|married|ex)\b/,
  /\b(espos[oa]|marido|pareja|novi[oa]|matrimonio|casad[oa]|prometid[oa]|ex)\b/,
];

export type DangerLevel = "clear" | "possible" | null;

const any = (patterns: RegExp[], t: string) => patterns.some((re) => re.test(t));

/** How strongly the person's words suggest danger in a relationship. */
export function relationshipDangerLevel(text: string): DangerLevel {
  const t = fold(text);
  if (any(ABUSE, t) || any(FEAR_OF_PARTNER, t)) return "clear";
  const partner = any(RELATIONSHIP, t);
  if (!partner) return null;
  if (any(DANGER, t)) return "clear";
  if (any(HOSTILE, t)) return any(FEAR, t) ? "clear" : "possible";
  if (any(FEAR, t)) return "possible";
  return null;
}

/** True when any safety text applies (kept for callers that only need yes/no). */
export function mentionsRelationshipDanger(text: string) {
  return relationshipDangerLevel(text) !== null;
}

/**
 * Append safety resources the reply left out: the full block when danger is
 * clearly described, one gentle sentence when it is only possible.
 */
export function withSafetyResources(reply: string, userWords: string, lang: Locale) {
  const level = relationshipDangerLevel(userWords);
  if (!level) return reply;

  if (level === "possible") {
    // Any mention of the hotline already covers it.
    if (reply.includes(HOTLINE_NUMBER)) return reply;
    return `${reply.trimEnd()}\n\n${GENTLE_LINE[lang]}`;
  }

  // Our exact block, or the number + 911 + the Spanish-service note.
  if (reply.includes(FULL_BLOCK[lang])) return reply;
  const spanishNote = lang === "en" ? /Spanish/i : /en español/i;
  if (reply.includes(HOTLINE_NUMBER) && /\b911\b/.test(reply) && spanishNote.test(reply)) return reply;
  return `${reply.trimEnd()}\n\n${FULL_BLOCK[lang]}`;
}
