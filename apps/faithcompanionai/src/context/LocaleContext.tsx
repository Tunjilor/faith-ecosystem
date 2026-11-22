"use client";
// src/context/LocaleContext.tsx
// Gives client components the request locale. The root layout reads it from
// the middleware header and passes it in, so server and client always agree.
import { createContext, useContext, type ReactNode } from "react";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
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
