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
