// src/lib/i18n/reply-language.ts
// Shared language rules for the AI endpoints (/api/ask, /api/assistant, /ai/verse).
//
// - `locale` in the request body is the page locale ("en" | "es"). Missing means
//   "en" so existing callers keep working; anything else is a 400.
// - The reply language follows the language the person wrote in. Messages with
//   no clear language ("ok", "amén", a bare verse reference) fall back to the
//   page locale.
import { isLocale, type Locale } from "./config";
import { stripBibleReferences } from "./scripture-es";

export type LocaleParse = { ok: true; locale: Locale } | { ok: false; error: string };

export function parseLocaleField(value: unknown): LocaleParse {
  if (value === undefined || value === null) return { ok: true, locale: "en" };
  if (isLocale(value)) return { ok: true, locale: value };
  return { ok: false, error: `Invalid 'locale'. Use "en" or "es".` };
}

// Common words that only appear in one of the two languages. Words both
// languages share ("no", "me", "a", "he", "son", "sin") are left out on purpose.
const ES_WORDS = new Set(
  `de la que el en y los del se las por un para con una su al lo como mas pero sus le ya o este si porque esta entre
cuando muy sobre tambien hasta hay donde quien desde todo nos durante todos uno les ni contra otros ese eso ante ellos
esto mi antes algunos que unos yo otro otras otra el tanto esa estos mucho quienes nada muchos cual poco ella estar estas
algunas algo nosotros mis tu te ti tus ellas puedo puedes puede quiero quieres necesito estoy esta estas siento ayuda
ayudame ayudar gracias hola oracion orar ora dios senor versiculo versiculos biblia dime explica explicame significa
tengo tiene miedo ansiedad trabajo familia hoy dia buenos buenas noches favor perdon perdonar esperanza fuerza paz amor
hijo hija esposo esposa madre padre mama papa salud enfermo enferma triste solo sola cansado cansada preocupado
preocupada dame dar dice decir sabes saber hacer hago vida corazon alma mundo cosas cosa ahora siempre nunca bien mal
mejor peor gran grande pequeno hermano hermana iglesia pastor pecado gracia cielo es soy eres son estoy estamos`
    .split(/\s+/)
    .filter(Boolean),
);
// "son" is kept above: "son" (they are) is far more common in Spanish chat than
// "son" in English, and English messages that use it have plenty of other signal.

const EN_WORDS = new Set(
  `the and to of is are i you my what how why can could would should please help pray prayer for with about this that it in
on be have has do does am was were feel need want god lord verse verses bible thank thanks hello hi today tell explain
mean means anxious anxiety worried scared afraid work job family your we our they she not don't dont i'm im i've can't
it's will from at an so if just really give some morning night good bad better worse life heart soul world things thing
now always never well sad tired lonely sick church sin grace heaven peace love hope strength mom dad wife husband son
daughter brother sister friend friends who where when which there their them his her him me's does did let lets let's`
    .split(/\s+/)
    .filter(Boolean)
    .filter((w) => w !== "son"),
);

// Words that say nothing about the language (shared religious vocabulary).
const NEUTRAL = new Set(
  "amen amén ok okay aleluya hallelujah alleluia jesus jesús cristo christ maria maría".split(" "),
);

function fold(word: string) {
  return word.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/** Which language a message is written in, or null when it is unclear. */
export function detectMessageLanguage(text: string): Locale | null {
  const cleaned = stripBibleReferences(text);
  let es = 0;
  let en = 0;

  if (/[¿¡]/.test(cleaned)) es += 2;

  const words = cleaned.toLowerCase().match(/[\p{L}']+/gu) ?? [];
  for (const raw of words) {
    if (NEUTRAL.has(raw)) continue;
    const word = fold(raw);
    if (/[ñáéíóúü]/.test(raw)) es += 1;
    else if (ES_WORDS.has(word)) es += 1;
    if (EN_WORDS.has(raw)) en += 1;
  }

  if (es > en) return "es";
  if (en > es) return "en";
  return null;
}

/** Reply language: the message's own language, else the page locale. */
export function replyLanguage(text: string, pageLocale: Locale): Locale {
  return detectMessageLanguage(text) ?? pageLocale;
}

/**
 * Instruction appended to every system prompt so the model answers in the
 * chosen language. Spanish replies cite RV1909 book names and must not quote
 * verse wording from memory: the app shows the RV1909 text from bible-api.com.
 */
export function languageInstruction(lang: Locale) {
  if (lang === "en") return "Write your entire reply in English.";
  return `Write your entire reply in Spanish: neutral Latin American Spanish. Address the reader as "tú"; for a group use "ustedes", never "vosotros"; avoid Spain-only vocabulary. Use Spanish sentence case in titles and headings ("La paciencia en tiempos difíciles", not "La Paciencia en Tiempos Difíciles").
Cite Bible references with Reina-Valera 1909 book names (for example Juan, Salmos, Filipenses, Cantares, Apocalipsis) followed by "(RV1909)", e.g. "Filipenses 4:6-7 (RV1909)".
Do not quote the wording of any Bible verse, not even a phrase in quotation marks: give the reference and describe or paraphrase its meaning in your own words. The app shows the verse text itself.`;
}
