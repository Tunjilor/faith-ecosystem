// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { getPublishedPosts } from "./blog/content";
import { TOPICS, TOPIC_SLUGS } from "./topics/data";
import { isTranslatedRoute, withLocale } from "@/lib/i18n/config";

// Regenerate daily so scheduled blog posts appear on their publishDate
// (blog/[slug] 404s until then, so they must not be listed early).
export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://faithcompanionai.com";

  type Freq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  // lastModified is only set where the content carries a real date (YYYY-MM-DD).
  // Pages without one omit <lastmod> rather than claiming they changed at build time.
  type Entry = { route: string; priority: number; freq: Freq; lastModified?: string };

  const static_pages: Entry[] = [
    { route: "",                          priority: 1.0, freq: "weekly" },
    { route: "/tools/verse",              priority: 0.9, freq: "weekly" },
    { route: "/tools/tithe",              priority: 0.9, freq: "weekly" },
    { route: "/tools/prayer",             priority: 0.9, freq: "weekly" },
    { route: "/tools/devotional",         priority: 0.9, freq: "weekly" },
    { route: "/tools/bible-search",       priority: 0.9, freq: "weekly" },
    { route: "/tools/share-card",         priority: 0.9, freq: "weekly" },
    { route: "/biblequiz",                priority: 0.9, freq: "weekly" },
    { route: "/topics",                   priority: 0.9, freq: "weekly" },
    { route: "/blog",                     priority: 0.85, freq: "weekly" },
    { route: "/resources",                priority: 0.85, freq: "weekly" },
    { route: "/how-to-pray",              priority: 0.8, freq: "monthly" },
    { route: "/tithing",                  priority: 0.8, freq: "monthly" },
    { route: "/daily-devotional",         priority: 0.8, freq: "monthly" },
    { route: "/daily",                    priority: 0.8, freq: "daily" },
    { route: "/tools/scripture-memory",   priority: 0.75, freq: "monthly" },
    { route: "/community",                priority: 0.7, freq: "monthly" },
    { route: "/community/prayer-wall",    priority: 0.7, freq: "monthly" },
    { route: "/about",                    priority: 0.6, freq: "monthly" },
    { route: "/faq",                      priority: 0.6, freq: "monthly" },
    { route: "/contact",                  priority: 0.6, freq: "monthly" },
    { route: "/support",                  priority: 0.55, freq: "monthly" },
    { route: "/privacy",                  priority: 0.4, freq: "monthly" },
    { route: "/terms",                    priority: 0.4, freq: "monthly" },
  ];

  const blog_posts: Entry[] =
    getPublishedPosts().map((p) => ({
      route: `/blog/${p.slug}`,
      priority: 0.8,
      freq: "monthly",
      lastModified: p.dateISO,
    }));

  const topic_pages: Entry[] =
    TOPIC_SLUGS.map((t) => ({
      route: `/topics/${t}`,
      priority: 0.8,
      freq: "monthly",
      lastModified: TOPICS[t].dateModified ?? TOPICS[t].datePublished,
    }));

  const entries = [...static_pages, ...blog_posts, ...topic_pages];

  // Translated routes get hreflang alternates on both language versions, and
  // their /es URL is listed right after the English one. Untranslated /es
  // pages are noindexed and never listed.
  const alternatesFor = (route: string) => ({
    languages: {
      en: `${base}${route}`,
      es: `${base}${withLocale(route || "/", "es")}`,
      "x-default": `${base}${route}`,
    },
  });

  return entries.flatMap(({ route, priority, freq, lastModified }) => {
    const common = {
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: freq,
      priority,
    };
    if (!isTranslatedRoute(route || "/")) {
      return [{ url: `${base}${route}`, ...common }];
    }
    const alternates = alternatesFor(route);
    return [
      { url: `${base}${route}`, ...common, alternates },
      { url: `${base}${withLocale(route || "/", "es")}`, ...common, alternates },
    ];
  });
}
