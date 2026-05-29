import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const OG_IMAGE = "/api/og";

export const metadata: Metadata = {
  metadataBase: new URL("https://tithecalculatorai.com"),
  title: "Tithe Calculator AI — Free Biblical Giving Calculator",
  description:
    "Calculate your tithe instantly with our free AI-powered tithe calculator. Find out how much to give based on gross or net income, with biblical guidance on tithing and Christian stewardship.",
  keywords: [
    "tithe calculator",
    "tithe calculator online",
    "how much should I tithe",
    "10 percent tithe calculator",
    "biblical giving calculator",
    "church giving calculator",
    "Christian giving calculator",
    "AI tithe calculator",
    "tithe and offering calculator",
    "how to calculate tithe on gross or net income",
    "what is a tithe percentage",
    "should I tithe on my gross or net income",
    "how to tithe biblically",
    "tithe calculator free",
    "tithing calculator with income",
    "what is a tithe",
    "how much is a tithe",
    "should Christians tithe today",
    "tithe on gross or net",
    "what does the Bible say about tithing",
    "free tithe calculator",
    "monthly tithe calculator",
    "annual tithe calculator",
    "tithe vs offering",
    "biblical tithing percentage",
    "Christian stewardship calculator",
    "how to calculate 10 percent tithe",
    "tithe calculator 2025",
  ],
  authors: [{ name: "Tithe Calculator AI" }],
  creator: "Tithe Calculator AI",
  publisher: "Tithe Calculator AI",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Tithe Calculator AI — Free Biblical Giving Calculator",
    description:
      "Free tithe calculator by income, pay period, and percentage — with Bible context on Christian giving.",
    url: "https://tithecalculatorai.com",
    siteName: "Tithe Calculator AI",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Tithe Calculator AI — Free Biblical Giving Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tithe Calculator AI — Free Biblical Giving Calculator",
    description:
      "Free tithe calculator — estimate your giving instantly with Bible context.",
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
      "@id": "https://tithecalculatorai.com/#organization",
      name: "Tithe Calculator AI",
      url: "https://tithecalculatorai.com",
      description: "Free AI-powered tithe and Christian giving calculator",
    },
    {
      "@type": "WebSite",
      "@id": "https://tithecalculatorai.com/#website",
      url: "https://tithecalculatorai.com",
      name: "Tithe Calculator AI",
      publisher: { "@id": "https://tithecalculatorai.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.tithecalculatorai.com/?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebApplication",
      "@id": "https://tithecalculatorai.com/#webapp",
      name: "Tithe Calculator AI",
      alternateName: [
        "Biblical Giving Calculator",
        "Christian Tithe Calculator",
        "AI Tithing Tool",
      ],
      url: "https://tithecalculatorai.com",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      description:
        "Calculate your tithe by income, pay period, and percentage — with Bible context on Christian giving.",
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
          name: "What is a tithe?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A tithe is a tenth (10%) of your income given to God as an act of worship and obedience. It is a biblical principle found throughout Scripture, from Genesis to Malachi to the New Testament.",
          },
        },
        {
          "@type": "Question",
          name: "Should I tithe on gross or net income?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Bible does not specify gross or net. Most theologians recommend tithing on gross income as the firstfruits of your earnings, but tithing on net is also a faithful practice. Our calculator lets you calculate both.",
          },
        },
        {
          "@type": "Question",
          name: "How do I calculate my tithe?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Multiply your income by 0.10 (10%) to find your tithe amount. For example, a $50,000 annual income means a $5,000 tithe. Our AI tithe calculator does this instantly for any income and frequency.",
          },
        },
        {
          "@type": "Question",
          name: "Is tithing still required for Christians today?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Many Christian denominations teach that tithing remains a meaningful spiritual discipline. While views vary, giving generously and systematically is consistently encouraged throughout the New Testament.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between a tithe and an offering?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A tithe is the baseline 10% given to your local church. An offering is any additional giving beyond the tithe — to missions, charities, or individuals in need.",
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
                href="https://www.prayergeneratorai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
              >
                AI Prayer Generator
              </a>
              <a
                href="https://www.bibleversegeneratorai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
              >
                Bible Verse Generator AI
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
