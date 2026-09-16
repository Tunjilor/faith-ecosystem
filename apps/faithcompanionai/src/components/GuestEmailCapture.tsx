// src/components/GuestEmailCapture.tsx
//
// Server-side gate for the daily-verse email capture: renders the banner only
// when the *viewer* has no session, regardless of what page it sits on or who
// owns the content being viewed. Use it in dynamically rendered server
// components (page, layout) — the session lookup is shared per request via
// React cache().
//
// NOT for `force-static` routes: there cookies() is empty at build time, so
// this gate would bake the banner in for everyone. Use
// <GuestEmailCaptureClient /> on those routes instead.
//
// Signed-in users already have an email on file and opt in from the dashboard
// (User.emailOptIn), so they never see this.
import { getUserFromSession } from "@/lib/premium";
import EmailCaptureBanner from "@/components/EmailCaptureBanner";

type Props = {
  source: string;
  variant?: "card" | "compact";
};

export default async function GuestEmailCapture({ source, variant }: Props) {
  const viewer = await getUserFromSession();
  if (viewer) return null;
  return <EmailCaptureBanner source={source} variant={variant} />;
}
