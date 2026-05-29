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
    default: "Bible Verse Generator AI — Random Scripture by Topic, Mood & Translation",
    template: "%s | Bible Verse Generator AI",
  },
  description:
    "Generate Bible verses instantly by topic, mood, or keyword using AI. Get daily scripture for encouragement, healing, strength, anxiety, and more — KJV, NIV, ESV and all major translations.",
  keywords: [
    "Bible verse generator",
    "random Bible verse generator",
    "AI Bible verse generator",
    "daily Bible verse generator",
    "Bible verse by topic",
    "Bible scripture generator",
    "Bible quote generator",
    "Bible verse finder",
    "random Bible verse for encouragement",
    "Bible verse generator by mood",
    "Bible verse for anxiety",
    "Bible verse for strength",
    "Bible verse for healing",
    "Bible verse for grief",
    "Bible verse for love",
    "Bible verse for new beginnings",
    "Bible verse generator KJV",
    "Bible verse generator NIV",
    "Bible verse of the day",
    "random scripture generator",
    "Bible verse for depression",
    "Bible verse for fear",
    "Bible verse for forgiveness",
    "Bible verse for gratitude",
    "Bible verse for marriage",
    "Bible verse for children",
    "Bible verse for sleep",
    "Bible verse for hope",
    "scripture of the day",
    "daily scripture verse",
    "Bible verse lookup",
    "find Bible verses by topic",
    "Bible verse search by keyword",
    "inspirational Bible verses",
    "encouraging Bible scriptures",
    "Bible verses about faith",
  ],
  authors: [{ name: "Bible Verse Generator AI" }],
  creator: "Bible Verse Generator AI",
  publisher: "Bible Verse Generator AI",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Bible Verse Generator AI — Random Scripture by Topic, Mood & Translation",
    description:
      "Generate Bible verses instantly by topic, mood, or keyword using AI. Get daily scripture for encouragement, healing, strength, anxiety, and more — KJV, NIV, ESV and all major translations.",
    url: "https://bibleversegeneratorai.com",
    siteName: "Bible Verse Generator AI",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Bible Verse Generator AI — Random Scripture by Topic, Mood & Translation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bible Verse Generator AI — Random Scripture by Topic, Mood & Translation",
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
      alternateName: [
        "Random Scripture Generator",
        "Daily Bible Verse Tool",
        "AI Scripture Finder",
        "Bible Quote Generator",
      ],
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
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How does the AI Bible verse generator work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our AI analyzes your topic, mood, or keyword and matches it against thousands of scriptures across the entire Bible. It returns the most relevant verses with context and reflection prompts.",
          },
        },
        {
          "@type": "Question",
          name: "Can I get Bible verses by topic?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. You can search by topics like hope, love, anxiety, healing, strength, forgiveness, gratitude, marriage, fear, and hundreds more. Each topic returns curated scriptures with explanations.",
          },
        },
        {
          "@type": "Question",
          name: "Which Bible translations are supported?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our generator supports KJV, NIV, ESV, NLT, NKJV, CSB, and more. You can compare translations side by side to find the wording that speaks most powerfully to you.",
          },
        },
        {
          "@type": "Question",
          name: "Can I get a random Bible verse?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Our random Bible verse generator delivers a fresh scripture every time, drawn from a curated library spanning both Old and New Testaments, tagged by theme and mood.",
          },
        },
        {
          "@type": "Question",
          name: "What is the Bible verse of the day?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Each day our AI selects a featured verse chosen for its encouragement and relevance. You can also subscribe to receive a daily scripture in your preferred translation.",
          },
        },
      ],
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
                href="https://www.prayergeneratorai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
              >
                AI Prayer Generator
              </a>
              <a
                href="https://www.tithecalculatorai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
              >
                AI Tithe Calculator
              </a>
              <a
                href="https://faithcompanionai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
              >
                Faith Companion AI
              </a>
            </div>
            <p className="text-xs text-slate-600">
              Part of the Faith Companion AI ecosystem — explore all free Christian AI tools at faithcompanionai.com
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
