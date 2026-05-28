import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const OG_IMAGE = "/api/og";

export const metadata: Metadata = {
  metadataBase: new URL("https://tithecalculatorai.com"),
  title: "Tithe Calculator AI | Calculate Your Tithe by Income",
  description:
    "Use this free tithe calculator to estimate your giving by income, pay period, and percentage. Learn what tithing means, what the Bible says, and the difference between tithe and offering.",
  keywords: [
    "tithe calculator",
    "tithing calculator",
    "calculate tithe",
    "10 percent tithe calculator",
    "monthly tithe calculator",
    "yearly tithe calculator",
    "what is tithing",
    "tithe vs offering",
    "Bible verses about tithing",
    "FaithCompanionAI",
  ],
  authors: [{ name: "Tithe Calculator AI" }],
  creator: "Tithe Calculator AI",
  publisher: "Tithe Calculator AI",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Tithe Calculator AI | Calculate Your Tithe by Income",
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
        alt: "Tithe Calculator AI | Calculate Your Tithe by Income",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tithe Calculator AI | Calculate Your Tithe by Income",
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
    },
    {
      "@type": "WebApplication",
      "@id": "https://tithecalculatorai.com/#webapp",
      name: "Tithe Calculator AI",
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
        <Analytics />
      </body>
    </html>
  );
}
