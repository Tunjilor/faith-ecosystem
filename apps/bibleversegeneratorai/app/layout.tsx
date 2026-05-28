import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const OG_IMAGE = "/api/og";

export const metadata: Metadata = {
  metadataBase: new URL("https://bibleversegeneratorai.com"),
  title: {
    default: "Bible Verse Generator AI — Find a Verse for Any Situation",
    template: "%s | Bible Verse Generator AI",
  },
  description:
    "Find powerful, personalized Bible verses for anxiety, strength, healing, hope, and more. Get a meaningful scripture with reflection instantly — no login required.",
  keywords: [
    "Bible verse generator",
    "Christian Bible verses",
    "free Bible verse finder",
    "Bible verses for anxiety",
    "Bible verses for strength",
    "Bible verses for healing",
    "Bible verses for hope",
    "scripture generator",
    "daily Bible verse",
    "Bible verse by topic",
    "FaithCompanionAI",
  ],
  authors: [{ name: "Bible Verse Generator AI" }],
  creator: "Bible Verse Generator AI",
  publisher: "Bible Verse Generator AI",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Bible Verse Generator AI — Find a Verse for Any Situation",
    description:
      "Find powerful Bible verses for anxiety, strength, healing, hope, and more. Get scripture with reflection instantly — no login required.",
    url: "https://bibleversegeneratorai.com",
    siteName: "Bible Verse Generator AI",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Bible Verse Generator AI — Find a Verse for Any Situation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bible Verse Generator AI — Find a Verse for Any Situation",
    description:
      "Find Bible verses for any situation instantly. Free, no login required.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "googled139fb02f40d1ca6",
  },
  category: "faith",
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://bibleversegeneratorai.com/#organization",
      name: "Bible Verse Generator AI",
      url: "https://bibleversegeneratorai.com",
      description: "Free AI-powered Bible verse finder by topic",
    },
    {
      "@type": "WebSite",
      "@id": "https://bibleversegeneratorai.com/#website",
      url: "https://bibleversegeneratorai.com",
      name: "Bible Verse Generator AI",
      publisher: { "@id": "https://bibleversegeneratorai.com/#organization" },
    },
    {
      "@type": "WebApplication",
      "@id": "https://bibleversegeneratorai.com/#webapp",
      name: "Bible Verse Generator AI",
      url: "https://bibleversegeneratorai.com",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      description:
        "Find personalized Bible verses for anxiety, strength, healing, hope, and more.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  ],
};

const navTopics = [
  { href: "/bible-verses-for-anxiety", label: "Anxiety" },
  { href: "/bible-verses-for-strength", label: "Strength" },
  { href: "/bible-verses-for-hope", label: "Hope" },
  { href: "/bible-verses-for-healing", label: "Healing" },
  { href: "/bible-verses-for-depression", label: "Depression" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-[#020617] text-white antialiased`}>
        {/* Nav */}
        <header className="border-b border-slate-800 sticky top-0 z-50 bg-[#020617]/95 backdrop-blur-sm">
          <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
            <Link
              href="/"
              className="font-bold text-base sm:text-lg text-white hover:text-emerald-400 transition-colors flex-shrink-0"
            >
              📖 BibleVerseGeneratorAI
            </Link>
            <div className="hidden md:flex items-center gap-1 overflow-x-auto">
              {navTopics.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="px-3 py-1.5 text-sm text-slate-300 hover:text-emerald-400 hover:bg-emerald-900/20 rounded-lg transition-colors whitespace-nowrap"
                >
                  {t.label}
                </Link>
              ))}
            </div>
            <a
              href="https://faithcompanionai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 text-xs sm:text-sm text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              FaithCompanionAI →
            </a>
          </nav>
        </header>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        {children}
        <Analytics />

        {/* Footer */}
        <footer className="border-t border-slate-800 mt-16">
          <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col items-center gap-4 text-center">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <a
                href="https://prayergeneratorai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
              >
                PrayerGeneratorAI.com
              </a>
              <a
                href="https://bibleversegeneratorai.com"
                className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
              >
                BibleVerseGeneratorAI.com
              </a>
              <a
                href="https://faithcompanionai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
              >
                FaithCompanionAI.com
              </a>
            </div>
            <p className="text-xs text-slate-600">Part of the Faith Companion ecosystem</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
