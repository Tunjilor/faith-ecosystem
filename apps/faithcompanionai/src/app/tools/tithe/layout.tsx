// src/app/tools/tithe/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  // Root layout applies the "%s | Faith Companion AI" title template — no brand here.
  title: "Tithe Calculator – 10% of Any Income",
  description:
    "Free tithe calculator: enter your income and pay period to see your tithe — weekly, monthly, or yearly, gross or net, at any percentage. Simple and clear.",
  keywords: [
    "tithe calculator",
    "tithing calculator",
    "calculate tithe",
    "10 percent of income",
    "how much should I tithe",
    "gross or net tithe",
    "Christian giving calculator",
    "Faith Companion tithe",
  ],
  alternates: { canonical: "/tools/tithe" },
  openGraph: {
    // OG/Twitter titles are not run through the template, so carry the brand explicitly.
    title: "Tithe Calculator – 10% of Any Income | Faith Companion AI",
    description:
      "Free tithe calculator: enter your income and pay period to see your tithe — weekly, monthly, or yearly, gross or net, at any percentage. Simple and clear.",
    url: "https://faithcompanionai.com/tools/tithe",
    siteName: "Faith Companion AI",
    type: "website",
    images: [{ url: "/brand/og-quiz.png", width: 1200, height: 630, alt: "Faith Companion AI Tithe Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tithe Calculator – 10% of Any Income | Faith Companion AI",
    description:
      "Free tithe calculator: enter your income and pay period to see your tithe — weekly, monthly, or yearly, gross or net, at any percentage. Simple and clear.",
    images: ["/brand/og-quiz.png"],
  },
};

export default function TitheLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
