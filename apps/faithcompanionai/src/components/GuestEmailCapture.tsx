// src/components/GuestEmailCapture.tsx
//
// Server-side gate for the daily-verse email capture: renders the banner only
// when the *viewer* has no session, regardless of what page it sits on or who
// owns the content being viewed. Drop it into any server component (page,
// layout, footer) — the session lookup is shared per request via React cache().
//
// Signed-in users already have an email on file and opt in from the dashboard
// (User.emailOptIn), so they never see this.
import { getUserFromSession } from "@/lib/premium";
import EmailCaptureBanner from "@/components/EmailCaptureBanner";

export default async function GuestEmailCapture({ source }: { source: string }) {
  const viewer = await getUserFromSession();
  if (viewer) return null;
  return <EmailCaptureBanner source={source} />;
}
