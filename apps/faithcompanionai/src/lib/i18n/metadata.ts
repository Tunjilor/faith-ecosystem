// src/lib/i18n/metadata.ts
//
// Metadata for a page that exists in both English and Spanish. Call it from
// generateMetadata() on routes listed in TRANSLATED_ROUTES:
//
//   export function generateMetadata(): Metadata {
//     return localizedMetadata("/tools/tithe", getLocale(), {
//       en: { title, description, ogTitle, image, imageAlt, keywords },
//       es: { ... },
//     });
//   }
//
// The English output must match what the page exported before translation
// (checked with scripts/seo-snapshot.ts). Both versions get a self-referencing
// canonical and reciprocal hreflang alternates (en, es, x-default -> English).
import type { Metadata } from "next";
import { withLocale, type Locale } from "./config";

const SITE_URL = "https://faithcompanionai.com";
const SITE_NAME = "Faith Companion AI";

export type LocalizedPageMeta = {
  /** Page title; the root layout template appends " | Faith Companion AI". */
  title: string;
  description: string;
  /** OG/Twitter title. These skip the template, so include the brand. */
  ogTitle: string;
  /** Defaults to description. */
  ogDescription?: string;
  /** Defaults to ogDescription. */
  twitterDescription?: string;
  /** Path under /public, e.g. "/brand/og-tithe.png". */
  image: string;
  imageAlt: string;
  keywords?: string[];
};

export function localizedMetadata(
  path: string,
  locale: Locale,
  pages: Record<Locale, LocalizedPageMeta>,
): Metadata {
  const page = pages[locale];
  const url = withLocale(path, locale);
  const ogDescription = page.ogDescription ?? page.description;

  return {
    title: page.title,
    description: page.description,
    ...(page.keywords ? { keywords: page.keywords } : {}),
    alternates: {
      canonical: url,
      languages: {
        en: path,
        es: withLocale(path, "es"),
        "x-default": path,
      },
    },
    openGraph: {
      title: page.ogTitle,
      description: ogDescription,
      url: `${SITE_URL}${url}`,
      siteName: SITE_NAME,
      type: "website",
      // English pages never set og:locale, so only Spanish adds it.
      ...(locale === "es" ? { locale: "es_LA" } : {}),
      images: [{ url: page.image, width: 1200, height: 630, alt: page.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.ogTitle,
      description: page.twitterDescription ?? ogDescription,
      images: [page.image],
    },
  };
}
