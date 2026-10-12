// src/app/tools/verse-finder/layout.tsx
import type { Metadata } from "next";

const description =
  "Find a Bible verse for any topic or season — peace, anxiety, forgiveness, or guidance — with a short reflection and a simple next step.";

export const metadata: Metadata = {
  // Root layout applies the "%s | Faith Companion AI" title template — no brand here.
  title: "Verse Finder",
  description,
  alternates: { canonical: "/tools/verse-finder" },
  openGraph: {
    // OG/Twitter titles are not run through the template, so carry the brand explicitly.
    title: "Verse Finder | Faith Companion AI",
    description,
    url: "https://faithcompanionai.com/tools/verse-finder",
    siteName: "Faith Companion AI",
    type: "website",
    images: [{ url: "/brand/og-quiz.png", width: 1200, height: 630, alt: "Faith Companion AI Verse Finder" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Verse Finder | Faith Companion AI",
    description,
    images: ["/brand/og-quiz.png"],
  },
};

export default function VerseFinderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
