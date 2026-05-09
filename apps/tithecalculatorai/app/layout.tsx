import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tithe Calculator AI | Calculate Your Tithe by Income",
  description:
    "Use this tithe calculator to estimate your giving by income, pay period, and percentage. Learn what tithing means, what the Bible says about tithing, and the difference between tithe and offering.",
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
  ],
  metadataBase: new URL("https://tithecalculatorai.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tithe Calculator AI | Calculate Your Tithe by Income",
    description:
      "Use this tithe calculator to estimate your giving by income, pay period, and percentage.",
    url: "https://tithecalculatorai.com",
    siteName: "Tithe Calculator AI",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tithe Calculator AI | Calculate Your Tithe by Income",
    description:
      "Calculate your tithe by income, pay period, and percentage. Free and instant.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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