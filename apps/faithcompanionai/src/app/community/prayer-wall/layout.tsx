// src/app/community/prayer-wall/layout.tsx
import type { Metadata } from "next";

const description =
  "Share a prayer request on the Faith Companion AI prayer wall and pray for others. Anyone can pray — no account needed.";

export const metadata: Metadata = {
  // Root layout applies the "%s | Faith Companion AI" title template — no brand here.
  title: "Prayer Wall",
  description,
  alternates: { canonical: "/community/prayer-wall" },
  openGraph: {
    // OG/Twitter titles are not run through the template, so carry the brand explicitly.
    title: "Prayer Wall | Faith Companion AI",
    description,
    url: "https://faithcompanionai.com/community/prayer-wall",
    siteName: "Faith Companion AI",
    type: "website",
    images: [{ url: "/brand/og-quiz.png", width: 1200, height: 630, alt: "Faith Companion AI Prayer Wall" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prayer Wall | Faith Companion AI",
    description,
    images: ["/brand/og-quiz.png"],
  },
};

export default function PrayerWallLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
