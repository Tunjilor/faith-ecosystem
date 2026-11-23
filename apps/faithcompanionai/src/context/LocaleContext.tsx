"use client";
// src/context/LocaleContext.tsx
// Gives client components the request locale. The root layout reads it from
// the middleware header and passes it in, so server and client always agree.
import { createContext, useContext, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, isTranslatedRoute, splitLocale, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

/** Pick the current locale's entry from a dictionary module. */
export function useDictionary<T>(dictionary: Dictionary<T>) {
  return dictionary[useLocale()];
}

/**
 * Locale for text inside page content. Shared widgets (tradition picker,
 * share card, install banner) also appear on pages that are not translated
 * yet; those still render English content under /es, so the widget stays
 * English there instead of mixing Spanish into an English page.
 */
export function useContentLocale(): Locale {
  const locale = useLocale();
  const path = splitLocale(usePathname() ?? "/").path;
  return locale === "es" && isTranslatedRoute(path) ? "es" : DEFAULT_LOCALE;
}

/** Like useDictionary, but follows useContentLocale. */
export function useContentDictionary<T>(dictionary: Dictionary<T>) {
  return dictionary[useContentLocale()];
}
