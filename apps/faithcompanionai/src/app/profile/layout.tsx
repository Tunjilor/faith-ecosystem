// src/app/profile/layout.tsx
import type { Metadata } from "next";

// Metadata-only layout: the page is a client component and cannot export metadata.
export const metadata: Metadata = {
  // Root layout applies the "%s | Faith Companion AI" title template — no brand here.
  title: "Profile & Settings",
  description: "Manage your Faith Companion AI profile, display name, and password.",
  // Signed-in / per-browser page with no public content — keep it out of search results,
  // but let crawlers follow its links.
  robots: { index: false, follow: true },
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
