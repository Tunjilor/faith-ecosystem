// src/components/Footer.tsx
import Link from "next/link";
import GuestEmailCaptureClient from "@/components/GuestEmailCaptureClient";
import { getLocale } from "@/lib/i18n/server";
import { localizedHref } from "@/lib/i18n/links";
import { footer } from "@/lib/i18n/dictionaries/footer";

type FooterText = (typeof footer)["en"];

// hrefs are English paths, localized at render time.
function buildLinks(l: FooterText["links"]) {
  return {
    sitemapLinks: [
      { label: l.home, href: "/" },
      { label: l.dashboard, href: "/dashboard" },
      { label: l.tools, href: "/tools/verse" },
      { label: l.prayerLibrary, href: "/topics" },
      { label: l.resources, href: "/resources" },
      { label: l.quiz, href: "/biblequiz" },
    ],
    toolLinks: [
      { label: l.verse, href: "/tools/verse" },
      { label: l.prayer, href: "/tools/prayer" },
      { label: l.devotional, href: "/tools/devotional" },
    ],
    legalLinks: [
      { label: l.about, href: "/about" },
      { label: l.faq, href: "/faq" },
      { label: l.contact, href: "/contact" },
      { label: l.privacy, href: "/privacy" },
      { label: l.terms, href: "/terms" },
    ],
    ecosystemLinks: [
      { label: l.titheCalculator, href: "/tools/tithe" },
      { label: l.prayerGenerator, href: "/tools/prayer" },
      { label: l.verseGenerator, href: "/tools/verse" },
    ],
  };
}

export default function Footer() {
  const locale = getLocale();
  const t = footer[locale];
  const { sitemapLinks, toolLinks, legalLinks, ecosystemLinks } = buildLinks(t.links);
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_1fr]">
            <div>
              <div className="flex items-start gap-3">
                <img
                  src="/brand/logo-dark.png"
                  alt="Faith Companion AI"
                  loading="lazy"
                  className="mt-1 h-9 w-9 rounded-lg object-contain"
                />
                <div>
                  <div className="font-extrabold text-white">Faith Companion AI</div>
                  <div className="text-sm text-white/60">
                    {t.tagline}
                  </div>
                </div>
              </div>

              <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
                {t.blurb}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={localizedHref("/biblequiz", locale)}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-95"
                >
                  {t.quizCta}
                </Link>
              </div>

              <p className="mt-4 text-xs leading-6 text-white/45">
                {t.quizTip}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">
                {t.sitemapHeading}
              </h3>
              <div className="mt-4 space-y-3">
                {sitemapLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={localizedHref(item.href, locale)}
                    className="block text-sm text-white/75 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">
                {t.toolsHeading}
              </h3>
              <div className="mt-4 space-y-3">
                {toolLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={localizedHref(item.href, locale)}
                    className="block text-sm text-white/75 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">
                {t.helpHeading}
              </h3>
              <div className="mt-4 space-y-3">
                {legalLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={localizedHref(item.href, locale)}
                    className="block text-sm text-white/75 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-6 text-sm text-white/60">
                {t.email}
              </div>
              <a
                href="mailto:support@faithcompanionai.com"
                className="mt-1 block text-sm text-white/80 underline underline-offset-4 hover:text-white"
              >
                support@faithcompanionai.com
              </a>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">
                {t.ecosystemHeading}
              </h3>
              <div className="mt-4 space-y-3">
                {ecosystemLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={localizedHref(item.href, locale)}
                    className="block text-sm text-white/75 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <p className="mt-5 text-xs leading-5 text-white/45">
                {t.ecosystemNote}
              </p>
            </div>
          </div>

          {/* Daily-verse email capture — logged-out visitors only. Client-gated because the
              footer also renders on force-static routes. Hidden on pages that carry their own
              inline capture so a guest is never asked twice. Hidden on /es while the daily
              emails are English-only. */}
          <div className="mt-10 border-t border-white/10 pt-6 empty:hidden">
            <GuestEmailCaptureClient
              source="footer"
              variant="compact"
              hideOnSpanish
              hideOnPathPrefixes={["/", "/topics/", "/biblequiz/results/", "/tools/prayer", "/daily"]}
            />
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <div>&copy; {new Date().getFullYear()} Faith Companion AI. {t.rights}</div>
            <div className="flex flex-wrap items-center gap-4">
              <div>{t.bottomLine}</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export { Footer };
