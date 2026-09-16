// src/components/GuestEmailCaptureClient.tsx
//
// Client-side gate for the daily-verse email capture, for places where the
// server gate (<GuestEmailCapture />) can't see the session:
//   - `force-static` routes (topic pages), where cookies() is empty at build
//   - the global footer, which renders on both static and dynamic routes
//
// Renders nothing until /api/me has settled, then only for logged-out
// viewers — so signed-in users never get a flash of the banner. Placements
// using this sit below the fold, so the late reveal isn't visible.
//
// `hideOnPathPrefixes` lets one instance (the footer) step aside on routes
// that already carry an inline capture, so a guest is never asked twice on
// one page. "/" matches the homepage exactly; anything else is a prefix.
"use client";

import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import EmailCaptureBanner from "@/components/EmailCaptureBanner";

type Props = {
  source: string;
  variant?: "card" | "compact";
  hideOnPathPrefixes?: string[];
};

export default function GuestEmailCaptureClient({ source, variant, hideOnPathPrefixes = [] }: Props) {
  const user = useUser();
  const pathname = usePathname() ?? "";

  const hidden = hideOnPathPrefixes.some((p) => (p === "/" ? pathname === "/" : pathname.startsWith(p)));
  if (hidden) return null;
  if (!user.loaded || user.signedIn || user.authed) return null;

  return <EmailCaptureBanner source={source} variant={variant} />;
}
