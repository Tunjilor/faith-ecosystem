import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "es"] as const;
const DEFAULT_LOCALE = "en";
const COOKIE = "NEXT_LOCALE";

function hasLocalePrefix(pathname: string) {
  return LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
}

function detectLocale(request: NextRequest): string {
  const cookie = request.cookies.get(COOKIE)?.value;
  if (cookie && (LOCALES as readonly string[]).includes(cookie)) return cookie;
  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Pass through static assets and service worker
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|webp|woff|woff2|txt|xml|json|js|css)$/)
  ) {
    return NextResponse.next();
  }

  if (hasLocalePrefix(pathname)) {
    const locale = LOCALES.find(
      (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
    ) ?? DEFAULT_LOCALE;
    const stripped = pathname.replace(`/${locale}`, "") || "/";

    // If someone visits /en/... redirect to /... (canonical is without /en)
    if (locale === DEFAULT_LOCALE) {
      const url = request.nextUrl.clone();
      url.pathname = stripped;
      return NextResponse.redirect(url, 301);
    }

    // Non-default locale (e.g. /es) — rewrite to the page and set locale header
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", locale);
    const response = NextResponse.rewrite(new URL(stripped, request.url), {
      request: { headers: requestHeaders },
    });
    response.cookies.set(COOKIE, locale, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    return response;
  }

  // No locale prefix — only redirect if non-default locale
  const locale = detectLocale(request);
  if (locale !== DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // Default locale (en) — serve directly without redirect, set header
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", DEFAULT_LOCALE);
  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.cookies.set(COOKIE, DEFAULT_LOCALE, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|brand|manifest.json|sw.js|offline.html).*)"],
};