import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  // Root layout applies the "%s | Faith Companion AI" title template — no brand here.
  title: "Faith Journey Recap",
  description: "A yearly recap of your faith journey on Faith Companion AI. Not available yet.",
  // Feature not available yet — keep it out of search results, but let crawlers follow its links.
  robots: { index: false, follow: true },
};

export default function WrappedPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white md:text-4xl">Wrapped</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
          A recap of your faith journey — streaks, saved verses, prayers, and progress.
        </p>
      </header>

      <div className="rounded-[28px] border border-white/10 bg-white p-6 shadow-2xl md:p-8">
        <h2 className="text-xl font-bold text-slate-900">Not available yet</h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
          Your Faith Companion Wrapped recap isn&rsquo;t available yet. In the meantime, your Dashboard shows your
          daily streak, account details, and saved prayers.
        </p>

        <Link
          href="/dashboard"
          className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-orange-500 px-5 py-2 text-sm font-semibold text-white transition hover:opacity-95"
        >
          Go to your Dashboard →
        </Link>
      </div>
    </main>
  );
}
