// src/app/tools/verse/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  // Root layout applies the "%s | Faith Companion AI" title template — no brand here.
  title: "Bible Verse Generator for Any Need",
  description:
    "Find the right Bible verse for any topic — peace, anxiety, hope, healing, grief, or guidance. Free, instant Scripture with references and encouragement.",
  keywords: [
    "Bible verse generator",
    "AI Bible verse",
    "Scripture for anxiety",
    "daily Bible verse",
    "Christian encouragement",
    "Faith Companion AI verse",
    "Bible verses for peace",
    "Bible verses for healing",
  ],
  alternates: { canonical: "/tools/verse" },
  openGraph: {
    // OG/Twitter titles are not run through the template, so carry the brand explicitly.
    title: "Bible Verse Generator for Any Need | Faith Companion AI",
    description:
      "Find the right Bible verse for any topic — peace, anxiety, hope, healing, grief, or guidance. Free, instant Scripture with references and encouragement.",
    url: "https://faithcompanionai.com/tools/verse",
    siteName: "Faith Companion AI",
    type: "website",
    images: [{ url: "/brand/og-quiz.png", width: 1200, height: 630, alt: "Faith Companion AI Verse" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bible Verse Generator for Any Need | Faith Companion AI",
    description:
      "Find the right Bible verse for any topic — peace, anxiety, hope, healing, grief, or guidance. Free, instant Scripture with references and encouragement.",
    images: ["/brand/og-quiz.png"],
  },
};

export default function VerseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
