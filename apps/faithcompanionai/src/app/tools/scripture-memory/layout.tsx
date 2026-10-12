// src/app/tools/scripture-memory/layout.tsx
import type { Metadata } from "next";

const description =
  "Memorize Bible verses with flashcard practice and word-by-word hints. Add the verses you want to learn and track your best score.";

export const metadata: Metadata = {
  // Root layout applies the "%s | Faith Companion AI" title template — no brand here.
  title: "Scripture Memory",
  description,
  alternates: { canonical: "/tools/scripture-memory" },
  openGraph: {
    // OG/Twitter titles are not run through the template, so carry the brand explicitly.
    title: "Scripture Memory | Faith Companion AI",
    description,
    url: "https://faithcompanionai.com/tools/scripture-memory",
    siteName: "Faith Companion AI",
    type: "website",
    images: [{ url: "/brand/og-quiz.png", width: 1200, height: 630, alt: "Faith Companion AI Scripture Memory" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scripture Memory | Faith Companion AI",
    description,
    images: ["/brand/og-quiz.png"],
  },
};

export default function ScriptureMemoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
