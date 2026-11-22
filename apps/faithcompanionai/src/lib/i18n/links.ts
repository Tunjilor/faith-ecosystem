// src/lib/i18n/links.ts
import { DEFAULT_LOCALE, isTranslatedRoute, withLocale, type Locale } from "./config";

/**
 * Internal link target for the current locale. Spanish readers stay on /es only
 * when the target page is translated; otherwise they go to the English URL
 * rather than a noindexed English-under-/es page.
 *
 * Accepts paths with a query or hash ("/tithing#faq"). External URLs and
 * non-path hrefs are returned unchanged.
 */
export function localizedHref(href: string, locale: Locale) {
  if (locale === DEFAULT_LOCALE || !href.startsWith("/") || href.startsWith("//")) return href;
  const match = href.match(/^([^?#]*)(.*)$/);
  const path = match?.[1] || "/";
  const rest = match?.[2] ?? "";
  return isTranslatedRoute(path) ? `${withLocale(path, locale)}${rest}` : href;
}
