// src/app/tools/tithe/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tithe Calculator – Work Out 10% of Your Income | Faith Companion",
  description:
    "Free tithe calculator. Enter your income and pay period to see your tithe — weekly, monthly, or yearly — on gross or net, at any percentage. Scripture-grounded and simple.",
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
    title: "Tithe Calculator – Faith Companion",
    description:
      "Work out your tithe in seconds — any income, any pay period, gross or net. Free and Scripture-grounded.",
    url: "https://faithcompanionai.com/tools/tithe",
    siteName: "Faith Companion AI",
    type: "website",
    images: [{ url: "/brand/og-quiz.png", width: 1200, height: 630, alt: "Faith Companion AI Tithe Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tithe Calculator – Faith Companion",
    description: "Work out 10% of your income in seconds — gross or net, any pay period. Free.",
    images: ["/brand/og-quiz.png"],
  },
};

export default function TitheLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
