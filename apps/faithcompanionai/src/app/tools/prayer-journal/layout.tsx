// src/app/tools/prayer-journal/layout.tsx
import type { Metadata } from "next";

const description =
  "Write down your prayers in a simple online prayer journal, and keep a record of what you are bringing to God.";

export const metadata: Metadata = {
  // Root layout applies the "%s | Faith Companion AI" title template — no brand here.
  title: "Prayer Journal",
  description,
  alternates: { canonical: "/tools/prayer-journal" },
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
