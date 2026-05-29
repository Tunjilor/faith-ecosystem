import { NextRequest, NextResponse } from "next/server";
const LOCALES = ["en", "es"] as const;
const DEFAULT_LOCALE = "en";
const COOKIE = "NEXT_LOCALE";
const LEGACY_REDIRECTS: Record<string, string> = {
  "/Verse": "/verse",
  "/Refund": "/refund",
  "/Blog": "/blog",
  "/Home": "/",
  "/home": "/",
  "/Courses": "/",
  "/WeeklyDevotional": "/daily-devotional",
  "/Search": "/tools/bible-search",
  "/bible-quiz": "/biblequiz",
  "/sign-in": "/login",
  "/premium": "/pricing",
};
function hasLocalePrefix(pathname: string) {
  return LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
}
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname in LEGACY_REDIRECTS) {
    const url = request.nextUrl.clone();
    url.pathname = LEGACY_REDIRECTS[pathname];
    return NextResponse.redirect(url, 301);
  }
  if (pathname.startsWith("/Blog/")) {
    const url = request.nextUrl.clone();
    url.pathname = "/blog/" + pathname.slice("/Blog/".length);
    return NextResponse.redirect(url, 301);
  }
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
    if (locale === DEFAULT_LOCALE) {
      const url = request.nextUrl.clone();
      url.pathname = stripped;
      return NextResponse.redirect(url, 301);
    }
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", locale);
    const response = NextResponse.rewrite(new URL(stripped, request.url), {
      request: { headers: requestHeaders },
    });
    response.cookies.set(COOKIE, locale, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    return response;
  }
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
