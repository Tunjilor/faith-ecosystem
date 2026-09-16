// src/app/biblequiz/page.tsx

import type { Metadata } from "next";
import QuizClient from "./quiz-client";
import AdSenseSlot from "@/components/AdSenseSlot";

export const metadata: Metadata = {
  // Root layout applies the "%s | Faith Companion AI" title template — no brand here.
  title: "Free Bible Quiz – Test Your Knowledge",
  description:
    "Take a free Bible quiz and test your Scripture knowledge across 6 categories: General Bible, Parables, Theology, and more. Share your score with friends.",
  keywords: [
    "Bible quiz online",
    "free Bible quiz",
    "Bible trivia",
    "Christian quiz app",
    "Scripture knowledge test",
    "Bible knowledge quiz",
    "online Bible trivia",
    "Faith Companion AI quiz",
  ],
  alternates: { canonical: "/biblequiz" },
  openGraph: {
    // OG/Twitter titles are not run through the template, so carry the brand explicitly.
    title: "Free Bible Quiz – Test Your Knowledge | Faith Companion AI",
    description:
      "Take a free Bible quiz and test your Scripture knowledge across 6 categories: General Bible, Parables, Theology, and more. Share your score with friends.",
    url: "https://faithcompanionai.com/biblequiz",
    siteName: "Faith Companion AI",
    type: "website",
    images: [{ url: "/brand/og-quiz.png", width: 1200, height: 630, alt: "Faith Companion AI Bible Quiz" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Bible Quiz – Test Your Knowledge | Faith Companion AI",
    description:
      "Take a free Bible quiz and test your Scripture knowledge across 6 categories: General Bible, Parables, Theology, and more. Share your score with friends.",
    images: ["/brand/og-quiz.png"],
  },
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 md:px-6">
      <QuizClient />
      <AdSenseSlot className="mt-8" />
    </main>
  );
}
