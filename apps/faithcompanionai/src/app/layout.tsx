import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ReferralTracker } from "@/components/ReferralTracker";
import { UserProvider } from "@/context/UserContext";
import Script from "next/script";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import { LocaleProvider } from "@/context/LocaleContext";
import { getLocale, getRoutePath } from "@/lib/i18n/server";
import { isTranslatedRoute } from "@/lib/i18n/config";
import { site, SPANISH_KEYWORDS } from "@/lib/i18n/dictionaries/site";
import UntranslatedNotice from "@/components/UntranslatedNotice";
import dynamic from "next/dynamic";
import { Analytics } from "@vercel/analytics/react";

// Both are fixed-position, non-critical widgets that nothing above the fold depends on
// (AddToHomeScreen is additionally gated behind a 30s timer). Loading them lazily keeps
// them out of the initial hydration pass.
const SpiritualAssistant = dynamic(() => import("@/components/SpiritualAssistant"), {
  ssr: false,
});
const AddToHomeScreen = dynamic(() => import("@/components/AddToHomeScreen"), {
  ssr: false,
});

const GA_ID = "G-5WYYE098DH";

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://faithcompanionai.com/#organization",
      name: "Faith Companion AI",
      url: "https://faithcompanionai.com",
      logo: "https://faithcompanionai.com/brand/icon-512.png",
      description:
        "A faith ecosystem of free AI-powered Christian tools for prayer, Bible study, and giving",
      sameAs: [],
      foundingDate: "2024",
      keywords: "Christian AI, faith tools, AI prayer, Bible verse generator, tithe calculator",
    },
    {
      "@type": "WebSite",
      "@id": "https://faithcompanionai.com/#website",
      url: "https://faithcompanionai.com",
      name: "Faith Companion AI",
      publisher: { "@id": "https://faithcompanionai.com/#organization" },
    },
    {
      "@type": "WebApplication",
      "@id": "https://faithcompanionai.com/#webapp",
      name: "Faith Companion AI",
      url: "https://faithcompanionai.com",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      description:
        "Daily Bible verses, personalized prayers, devotionals, and faith quizzes – grounded in Scripture.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
  ],
};

const enMeta = site.en.meta;

const baseMetadata: Metadata = {
  metadataBase: new URL("https://faithcompanionai.com"),
  title: {
    default: enMeta.defaultTitle,
    template: "%s | Faith Companion AI",
  },
  description: enMeta.description,
  applicationName: "Faith Companion AI",
  keywords: [
    "faith companion AI",
    "Christian AI app",
    "AI Bible study",
    "AI spiritual companion",
    "Christian AI tools",
    "AI prayer and Bible app",
    "faith AI tools",
    "free Christian AI",
    "Bible AI chat",
    "AI devotional",
    "AI tools for Christians",
    "best Christian AI apps 2025",
    "AI Bible study tools",
    "AI prayer app free",
    "AI faith companion for daily devotion",
    "Christian AI chatbot",
    "AI-powered scripture study",
    "digital faith companion",
    "AI devotional generator",
    "faith-based AI assistant",
    "AI tithe calculator",
    "AI Bible verse generator",
    "AI prayer generator",
    "Christian spiritual growth app",
    "online Bible study AI",
    "AI church tools",
    "sermon preparation AI",
    "faith technology",
    "Christian technology tools",
    "AI for church",
    "Bible study assistant AI",
    "daily devotional AI",
    "scripture study AI",
    "Christian AI ecosystem",
    "faith ecosystem AI tools",
    "free Christian AI tools 2025",
  ],
  authors: [{ name: "Faith Companion AI" }],
  creator: "Faith Companion AI",
  publisher: "Faith Companion AI",
  category: "Religion & Spirituality",
  // No site-wide canonical: it is inherited by every route that doesn't set its own,
  // which pointed those pages at the homepage. Each indexable route sets its own.
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/brand/icon-32.png", sizes: "32x32", type: "image/png" },{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    type: "website",
    url: "https://faithcompanionai.com",
    siteName: "Faith Companion AI",
    title: enMeta.defaultTitle,
    description: enMeta.ogDescription,
    images: [{ url: enMeta.image, width: 1200, height: 630, alt: "Faith Companion AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: enMeta.defaultTitle,
    description: enMeta.twitterDescription,
    images: [enMeta.image],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {},
  other: {
    "theme-color": "#6d28d9",
    "color-scheme": "dark",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Faith Companion",
  },
};

// English output is exactly baseMetadata. Spanish swaps the defaults that
// /es pages inherit when they don't set their own.
export function generateMetadata(): Metadata {
  if (getLocale() !== "es") return baseMetadata;
  const es = site.es.meta;
  return {
    ...baseMetadata,
    title: { default: es.defaultTitle, template: "%s | Faith Companion AI" },
    description: es.description,
    keywords: SPANISH_KEYWORDS,
    openGraph: {
      ...baseMetadata.openGraph,
      url: "https://faithcompanionai.com/es",
      title: es.defaultTitle,
      description: es.ogDescription,
      locale: "es_LA",
      images: [{ url: es.image, width: 1200, height: 630, alt: "Faith Companion AI" }],
    },
    twitter: {
      ...baseMetadata.twitter,
      title: es.defaultTitle,
      description: es.twitterDescription,
      images: [es.image],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#6d28d9",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = getLocale();
  const routePath = getRoutePath();
  // Null on force-static routes (no request headers): no notice there.
  const showUntranslatedNotice = locale === "es" && routePath !== null && !isTranslatedRoute(routePath);
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}</Script>
      </head>
      <body className="min-h-screen bg-fc text-fc">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <div className="fc-bg" />
        <LocaleProvider locale={locale}>
        <UserProvider>
          <Navbar />
          <main
            className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 md:px-6"
            lang={showUntranslatedNotice ? "en" : undefined}
          >
            {showUntranslatedNotice && <UntranslatedNotice />}
            {children}
          </main>
          <Footer />
          <SpiritualAssistant />
          <ReferralTracker />
          <AddToHomeScreen />
          <ServiceWorkerRegistration />
        </UserProvider>
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
