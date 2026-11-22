// src/lib/i18n/config.ts
//
// Single source of truth for locales and for which routes have a real Spanish
// translation. Imported by middleware (Edge runtime), so keep this file free of
// Node/React/server-only imports.

export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** Cookie the switcher writes. Informational only: the URL is the source of truth. */
export const LOCALE_COOKIE = "NEXT_LOCALE";
/** Request header the middleware sets for server components. */
export const LOCALE_HEADER = "x-locale";
/** Request header carrying the route path without its locale prefix ("/es/x" -> "/x"). */
export const ROUTE_PATH_HEADER = "x-route-path";

/**
 * Routes (English paths, no /es prefix) whose Spanish version is fully
 * translated and ready to index. Adding a route here:
 *   - stops middleware sending X-Robots-Tag: noindex on its /es version
 *   - adds the /es URL and hreflang alternates to the sitemap
 *   - makes localizedHref() keep Spanish readers on /es for links to it
 *
 * Long-form pages (tithing guide, FAQ, topics) join only after a native
 * speaker has reviewed the Spanish.
 */
export const TRANSLATED_ROUTES: readonly string[] = [
  "/tools/tithe",
];

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** Normalise a path for registry lookups: no trailing slash (except "/"). */
function normalise(path: string) {
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

export function isTranslatedRoute(path: string) {
  return TRANSLATED_ROUTES.includes(normalise(path));
}

/** Split "/es/tools/tithe" into { locale: "es", path: "/tools/tithe" }. */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  for (const locale of LOCALES) {
    if (pathname === `/${locale}`) return { locale, path: "/" };
    if (pathname.startsWith(`/${locale}/`)) return { locale, path: pathname.slice(locale.length + 1) };
  }
  return { locale: DEFAULT_LOCALE, path: pathname };
}

/** Prefix an English path for a locale: ("/tools/tithe", "es") -> "/es/tools/tithe". */
export function withLocale(path: string, locale: Locale) {
  if (locale === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
