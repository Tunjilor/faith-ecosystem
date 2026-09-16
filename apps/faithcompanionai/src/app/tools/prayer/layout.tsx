// src/app/tools/prayer/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  // Root layout applies the "%s | Faith Companion AI" title template — no brand here.
  title: "AI Prayer Assistant & Generator",
  description:
    "Get a personal, Scripture-grounded prayer in seconds — free and instant. AI prayer generator for peace, healing, strength, and any moment you face.",
  keywords: [
    "AI prayer generator",
    "Christian prayer app",
    "daily prayer online",
    "personalized Bible prayer",
    "Scripture-based prayer",
    "prayer for anxiety",
    "prayer for healing",
    "Faith Companion AI prayer",
  ],
  alternates: { canonical: "/tools/prayer" },
  openGraph: {
    // OG/Twitter titles are not run through the template, so carry the brand explicitly.
    title: "AI Prayer Assistant & Generator | Faith Companion AI",
    description:
      "Get a personal, Scripture-grounded prayer in seconds — free and instant. AI prayer generator for peace, healing, strength, and any moment you face.",
    url: "https://faithcompanionai.com/tools/prayer",
    siteName: "Faith Companion AI",
    type: "website",
    images: [{ url: "/brand/og-quiz.png", width: 1200, height: 630, alt: "Faith Companion AI Prayer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Prayer Assistant & Generator | Faith Companion AI",
    description:
      "Get a personal, Scripture-grounded prayer in seconds — free and instant. AI prayer generator for peace, healing, strength, and any moment you face.",
    images: ["/brand/og-quiz.png"],
  },
};

export default function PrayerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
