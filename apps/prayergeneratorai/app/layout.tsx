import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const OG_IMAGE = "/api/og";

export const metadata: Metadata = {
  metadataBase: new URL("https://prayergeneratorai.com"),
  title: {
    default: "Prayer Generator AI — Free Personalized Christian Prayers",
    template: "%s | Prayer Generator AI",
  },
  description:
    "Generate heartfelt, personalized prayers instantly with AI. Create prayers for healing, strength, anxiety, grief, marriage, family and any occasion — free Christian prayer generator.",
  keywords: [
    "AI prayer generator",
    "prayer generator",
    "prayer generator free",
    "generate a prayer",
    "AI prayer",
    "Christian prayer generator",
    "online prayer generator",
    "personalized prayer generator",
    "generate a morning prayer",
    "AI prayer for healing",
    "generate a prayer for someone you love",
    "create a prayer for anxiety",
    "AI prayer for strength",
    "generate bedtime prayer",
    "AI prayer for grief",
    "AI prayer for marriage",
    "prayer generator for special occasions",
    "prayer for healing",
    "prayer for strength",
    "prayer for anxiety",
    "prayer for a friend",
    "prayer for family",
    "prayer for guidance",
    "prayer for forgiveness",
    "prayer for protection",
    "prayer for peace",
    "short prayer generator",
    "long prayer generator",
    "prayer points generator",
    "intercessory prayer generator",
    "prayer for the sick",
    "prayer for financial breakthrough",
    "prayer for my husband",
    "prayer for my wife",
    "prayer for my children",
    "prayer for salvation",
    "how to write a personal prayer",
    "what to say in a prayer",
    "AI written prayer",
    "custom prayer generator",
    "prayer generator 2025",
  ],
  authors: [{ name: "Prayer Generator AI" }],
  creator: "Prayer Generator AI",
  publisher: "Prayer Generator AI",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Prayer Generator AI — Free Personalized Christian Prayers",
    description:
      "Generate heartfelt, personalized prayers instantly with AI. Create prayers for healing, strength, anxiety, grief, marriage, family and any occasion — free Christian prayer generator.",
    url: "https://prayergeneratorai.com",
    siteName: "Prayer Generator AI",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Prayer Generator AI — Free Personalized Christian Prayers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prayer Generator AI — Free Personalized Christian Prayers",
    description:
      "Generate personalized Christian prayers for your situation in seconds.",
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
      "@id": "https://prayergeneratorai.com/#organization",
      name: "Prayer Generator AI",
      url: "https://prayergeneratorai.com",
      description: "Free AI-powered Christian prayer generator",
    },
    {
      "@type": "WebSite",
      "@id": "https://prayergeneratorai.com/#website",
      url: "https://prayergeneratorai.com",
      name: "Prayer Generator AI",
      publisher: { "@id": "https://prayergeneratorai.com/#organization" },
    },
    {
      "@type": "WebApplication",
      "@id": "https://prayergeneratorai.com/#webapp",
      name: "Prayer Generator AI",
      alternateName: [
        "Christian Prayer Writer",
        "AI Prayer Composer",
        "Personalized Prayer Tool",
        "Online Prayer Generator",
      ],
      url: "https://prayergeneratorai.com",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      description:
        "Generate personalized Christian prayers for anxiety, healing, family, strength, and more.",
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
          name: "How does the AI prayer generator work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You describe your situation, need, or intention and our AI crafts a personalized, scripture-inspired prayer in seconds. You can customize the tone, length, and focus.",
          },
        },
        {
          "@type": "Question",
          name: "Can AI write a prayer for me?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Our AI prayer generator creates unique, heartfelt prayers tailored to your specific needs — whether for healing, guidance, gratitude, grief, relationships, or any life situation.",
          },
        },
        {
          "@type": "Question",
          name: "Is the prayer generator free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, our AI prayer generator is completely free to use. Generate as many personalized prayers as you need with no subscriptions or hidden costs.",
          },
        },
        {
          "@type": "Question",
          name: "What kinds of prayers can I generate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can generate morning prayers, bedtime prayers, prayers for healing, prayers for anxiety, intercessory prayers, prayers for family, marriage prayers, prayers for guidance, and much more.",
          },
        },
        {
          "@type": "Question",
          name: "How do I write a personal prayer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A personal prayer starts by addressing God, expressing gratitude, sharing your honest needs or concerns, asking for guidance aligned with His will, and closing with trust. Our AI follows this structure automatically.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        {children}
        <footer className="border-t border-slate-800 mt-16">
          <div className="mx-auto max-w-4xl px-6 py-8 flex flex-col items-center gap-4 text-center">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <a
                href="https://www.bibleversegeneratorai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
              >
                Bible Verse Generator AI
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
        <Analytics />
      </body>
    </html>
  );
}
