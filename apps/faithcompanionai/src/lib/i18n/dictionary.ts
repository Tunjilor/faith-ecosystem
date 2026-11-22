// src/lib/i18n/dictionary.ts
//
// Dictionary pattern: each page or area gets one module exporting an English
// object and a Spanish object typed against it, so a missing or extra Spanish
// key is a type error (`npm run typecheck` fails).
//
//   // src/lib/i18n/dictionaries/tithe.ts
//   const en = { heading: "Tithe Calculator", ... };
//   const es: Translation<typeof en> = { heading: "Calculadora de diezmo", ... };
//   export const tithe = defineDictionary(en, es);
//
//   // server component:  const t = tithe[getLocale()];
//   // client component:  const t = useDictionary(tithe);
//
// Keep dictionaries per page/area so a client page only bundles its own text.
// Spanish copy: neutral Latin American Spanish ("ustedes", never "vosotros").
import type { Locale } from "./config";

/** Same shape as the English dictionary, with every string leaf still a string. */
export type Translation<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends (...args: infer A) => string
      ? (...args: A) => string
      : T[K] extends readonly (infer U)[]
        ? readonly Translation<U>[]
        : Translation<T[K]>;
};

export type Dictionary<T> = Record<Locale, T | Translation<T>>;

export function defineDictionary<T>(en: T, es: Translation<T>): Dictionary<T> {
  return { en, es };
}
