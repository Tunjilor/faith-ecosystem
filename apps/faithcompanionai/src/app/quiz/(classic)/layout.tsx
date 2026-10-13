// src/app/quiz/(classic)/layout.tsx
import type { Metadata } from "next";

// Metadata-only layout for the legacy /quiz page (a client component that cannot export
// metadata). The (classic) route group scopes it to /quiz alone — /quiz/challenge and
// /quiz/result/[id] sit outside the group and keep their own metadata.
export const metadata: Metadata = {
  // Root layout applies the "%s | Faith Companion AI" title template — no brand here.
  title: "Bible Quiz (Classic)",
  description:
    "The classic Faith Companion AI Bible quiz. For the latest version with all categories and score sharing, take the Bible Quiz.",
  // Older duplicate of /biblequiz — keep it out of search results, but let crawlers follow its links.
  robots: { index: false, follow: true },
};

export default function ClassicQuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
