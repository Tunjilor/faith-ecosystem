// src/lib/i18n/server.ts
// Server-only locale helpers. Client components use useLocale() from
// @/context/LocaleContext instead.
import { headers } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_HEADER, isLocale, type Locale } from "./config";

/**
 * The locale of the current request, as set by middleware from the URL prefix.
 * The middleware always overwrites this header, so clients cannot spoof it.
 */
export function getLocale(): Locale {
  const value = headers().get(LOCALE_HEADER);
  return isLocale(value) ? value : DEFAULT_LOCALE;
}
