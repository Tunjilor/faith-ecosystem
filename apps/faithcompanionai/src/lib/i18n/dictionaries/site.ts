// src/lib/i18n/dictionaries/site.ts
// Site-wide default metadata (root layout) and the untranslated-page notice.
//
// Spanish metadata targets real Spanish search terms ("oraciones",
// "versículos de la Biblia", "devocional diario", "calculadora de diezmo")
// rather than literal translations of the English copy.
import { defineDictionary, type Translation } from "../dictionary";

const en = {
  meta: {
    defaultTitle: "Faith Companion AI – Free AI Tools for Prayer & Bible",
    description:
      "Your complete faith ecosystem powered by AI. Free tools for prayer generation, Bible verse discovery, tithe calculation, and daily devotion. The best Christian AI companion for spiritual growth.",
    ogDescription:
      "Your complete faith ecosystem powered by AI. Free tools for prayer generation, Bible verse discovery, tithe calculation, and daily devotion.",
    twitterDescription:
      "Your complete faith ecosystem powered by AI. Free tools for prayer, Bible verses, and tithing.",
    image: "/brand/og-quiz.png",
  },
  untranslatedNotice:
    "This page isn't available in Spanish yet, so it's shown in English. We're translating more pages.",
};

const es: Translation<typeof en> = {
  meta: {
    defaultTitle: "Faith Companion AI – Oraciones, versículos de la Biblia y devocionales con IA",
    description:
      "Herramientas cristianas gratis con inteligencia artificial: crea oraciones personalizadas, encuentra versículos de la Biblia para cada situación, lee un devocional diario y usa la calculadora de diezmo.",
    ogDescription:
      "Herramientas cristianas gratis con IA: oraciones personalizadas, versículos de la Biblia, devocional diario y calculadora de diezmo.",
    twitterDescription:
      "Herramientas cristianas gratis con IA: oraciones, versículos de la Biblia y diezmo.",
    image: "/brand/og-default-es.png",
  },
  untranslatedNotice:
    "Esta página aún no está disponible en español, por eso la mostramos en inglés. Estamos traduciendo más páginas.",
};

export const site = defineDictionary(en, es);

/** Spanish keywords for the root layout; English keeps its existing list. */
export const SPANISH_KEYWORDS = [
  "oraciones cristianas",
  "generador de oraciones",
  "versículos de la Biblia",
  "versículos bíblicos",
  "devocional diario",
  "calculadora de diezmo",
  "estudio bíblico",
  "inteligencia artificial cristiana",
  "herramientas cristianas gratis",
  "Faith Companion AI",
];
