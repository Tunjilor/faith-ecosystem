// src/app/daily/page.tsx
//
// Archive of recent daily devotionals; each links to /daily/[date].
import type { Metadata } from "next";
import Link from "next/link";
import GuestEmailCaptureClient from "@/components/GuestEmailCaptureClient";
import { formatDay, getRecentDevotionals } from "@/lib/daily-devotionals";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Daily Devotionals",
  description:
    "A free daily devotional: one Bible verse, a short reflection, and a word of encouragement for each day. Read recent devotionals or get them by email.",
  alternates: { canonical: "/daily" },
};

export default async function DailyArchivePage() {
  const items = await getRecentDevotionals(30);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-white md:text-4xl">Daily Devotionals</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/70 md:text-base">
          One Bible verse, a short reflection, and a word of encouragement for each day.
        </p>
      </div>

      <div className="mt-10">
        <GuestEmailCaptureClient
          source="daily-archive"
          heading="Get each day's devotional in your inbox"
          subtext="Free, every morning. No spam. Unsubscribe anytime."
        />
      </div>

      {items.length === 0 ? (
        <p className="mt-10 text-center text-sm text-white/60">The first devotional is on its way. Check back tomorrow.</p>
      ) : (
        <ul className="mt-10 space-y-3">
          {items.map((d) => (
            <li key={d.day}>
              <Link
                href={`/daily/${d.day}`}
                className="block rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 transition hover:bg-white/[0.09]"
              >
                <div className="text-xs font-semibold uppercase tracking-wide text-white/50">{formatDay(d.day)}</div>
                <div className="mt-1 text-base font-semibold text-white">{d.reference || "Daily devotional"}</div>
                {d.parts && (
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-white/65">&ldquo;{d.parts.verse}&rdquo;</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
