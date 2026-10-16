// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { getPublishedPosts } from "./blog/content";
import { TOPICS, TOPIC_SLUGS } from "./topics/data";

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

  return [...static_pages, ...blog_posts, ...topic_pages].map(({ route, priority, freq, lastModified }) => ({
    url: `${base}${route}`,
    ...(lastModified ? { lastModified } : {}),
    changeFrequency: freq,
    priority,
  }));
}
