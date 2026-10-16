// src/app/tools/prayer-journal/layout.tsx
import type { Metadata } from "next";

const description =
  "Write a personal prayer with the Prayer tool, and save the prayers that matter to you.";

export const metadata: Metadata = {
  // Root layout applies the "%s | Faith Companion AI" title template — no brand here.
  title: "Prayer Journal",
  description,
  alternates: { canonical: "/tools/prayer-journal" },
  // A standalone journal isn't available yet — the page points to Prayer and Saved.
  // Keep it out of search results, but let crawlers follow those links.
  robots: { index: false, follow: true },
  openGraph: {
    // OG/Twitter titles are not run through the template, so carry the brand explicitly.
    title: "Prayer Journal | Faith Companion AI",
    description,
    url: "https://faithcompanionai.com/tools/prayer-journal",
    siteName: "Faith Companion AI",
    type: "website",
    images: [{ url: "/brand/og-quiz.png", width: 1200, height: 630, alt: "Faith Companion AI Prayer Journal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prayer Journal | Faith Companion AI",
    description,
    images: ["/brand/og-quiz.png"],
  },
};

export default function PrayerJournalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
