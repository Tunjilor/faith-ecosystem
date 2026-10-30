// src/app/daily/[date]/page.tsx
//
// Public page for one day's devotional (the same one emailed to subscribers).
// Social posts link here, so every click is a site visit that ends at the
// email signup.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GuestEmailCaptureClient from "@/components/GuestEmailCaptureClient";
import { formatDay, getDevotionalForDay, isDayKey, SITE_URL } from "@/lib/daily-devotionals";

export const dynamic = "force-dynamic";

type Props = { params: { date: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isDayKey(params.date)) return { title: "Devotional not found" };
  const d = await getDevotionalForDay(params.date);
  if (!d) return { title: "Devotional not found" };

  const when = formatDay(d.day, "short");
  const title = d.reference ? `${d.reference}: Daily Devotional, ${when}` : `Daily Devotional, ${when}`;
  const verse = d.parts?.verse ?? d.text;
  const description = verse.length > 155 ? `${verse.slice(0, 152).trimEnd()}...` : verse;

  return {
    title: { absolute: `${title} | Faith Companion AI` },
    description,
    alternates: { canonical: `/daily/${d.day}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${SITE_URL}/daily/${d.day}`,
    },
  };
}

export default async function DailyDevotionalPage({ params }: Props) {
  if (!isDayKey(params.date)) notFound();
  const d = await getDevotionalForDay(params.date);
  if (!d) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <div className="text-center">
        <div className="inline-flex rounded-full bg-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-300">
          Daily Devotional
        </div>
        <h1 className="mt-4 text-3xl font-extrabold text-white md:text-4xl">{formatDay(d.day)}</h1>
      </div>

      <article className="mt-10 rounded-[28px] border border-white/10 bg-white/[0.06] p-6 md:p-10">
        {d.parts ? (
          <>
            <blockquote className="border-l-4 border-orange-500 pl-5">
              <p className="font-serif text-xl italic leading-relaxed text-white md:text-2xl">
                &ldquo;{d.parts.verse}&rdquo;
              </p>
              <footer className="mt-3 text-sm font-bold tracking-wide text-orange-400">
                {d.parts.reference}
              </footer>
            </blockquote>
            <p className="mt-8 whitespace-pre-line text-base leading-8 text-white/80">{d.parts.reflection}</p>
            {d.parts.encouragement && (
              <p className="mt-6 text-base font-bold leading-8 text-white">{d.parts.encouragement}</p>
            )}
          </>
        ) : (
          <p className="whitespace-pre-line text-base leading-8 text-white/80">{d.text}</p>
        )}

        <div className="mt-8">
          <Link
            href="/tools/prayer"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-orange-500 px-7 py-3 text-sm font-semibold text-white transition hover:opacity-95"
          >
            Get a prayer for your day &rarr;
          </Link>
        </div>
      </article>

      <div className="mt-10">
        <GuestEmailCaptureClient
          source="daily-page"
          heading="Get this devotional in your inbox every morning"
          subtext="A free Bible verse and short devotional each day. No spam. Unsubscribe anytime."
        />
      </div>

      <p className="mt-10 text-center text-sm text-white/60">
        <Link href="/daily" className="underline hover:text-white">
          More daily devotionals
        </Link>
      </p>
    </main>
  );
}
