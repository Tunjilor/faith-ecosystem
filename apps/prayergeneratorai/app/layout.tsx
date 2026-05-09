import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://prayergeneratorai.com"),
  title: {
    default: "Prayer Generator AI | Free Christian AI Prayer Generator",
    template: "%s | Prayer Generator AI",
  },
  description:
    "Generate personalized Christian prayers for anxiety, healing, family, strength, protection, guidance, gratitude, peace, and more.",
  keywords: [
    "AI prayer generator",
    "Christian prayer generator",
    "free prayer generator",
    "prayer for anxiety",
    "prayer for healing",
    "prayer for family",
    "prayer for strength",
    "prayer for protection",
    "morning prayer",
    "prayer before sleep",
    "FaithCompanionAI",
  ],
  authors: [{ name: "Prayer Generator AI" }],
  creator: "Prayer Generator AI",
  publisher: "Prayer Generator AI",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Prayer Generator AI | Free Christian AI Prayer Generator",
    description:
      "Create a personalized Christian prayer in seconds for peace, healing, strength, guidance, family, gratitude, and more.",
    url: "https://prayergeneratorai.com",
    siteName: "Prayer Generator AI",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prayer Generator AI | Free Christian AI Prayer Generator",
    description:
      "Generate personalized Christian prayers for your situation in seconds.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
