import type { Metadata } from "next";

export const metadata: Metadata = {
  // Root layout applies the "%s | Faith Companion AI" title template — no brand here.
  title: "Bible Verse Card Maker – Free Images",
  description:
    "Turn any Bible verse into a beautiful, shareable image card. Free PNG download for Instagram, Facebook, or Twitter/X — or share straight from your phone.",
  keywords: [
    "Bible verse card",
    "shareable Bible image",
    "verse image generator",
    "Christian Instagram post",
    "scripture card maker",
    "Bible verse download",
    "Faith Companion AI",
  ],
  alternates: { canonical: "/tools/share-card" },
  openGraph: {
    // OG/Twitter titles are not run through the template, so carry the brand explicitly.
    title: "Bible Verse Card Maker – Free Images | Faith Companion AI",
    description:
      "Turn any Bible verse into a beautiful, shareable image card. Free PNG download for Instagram, Facebook, or Twitter/X — or share straight from your phone.",
    url: "https://faithcompanionai.com/tools/share-card",
    siteName: "Faith Companion AI",
    type: "website",
    images: [
      {
        url: "/api/og/verse",
        width: 1200,
        height: 630,
        alt: "Faith Companion AI Verse Card",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bible Verse Card Maker – Free Images | Faith Companion AI",
    description:
      "Turn any Bible verse into a beautiful, shareable image card. Free PNG download for Instagram, Facebook, or Twitter/X — or share straight from your phone.",
    images: ["/api/og/verse"],
  },
};

export default function ShareCardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
