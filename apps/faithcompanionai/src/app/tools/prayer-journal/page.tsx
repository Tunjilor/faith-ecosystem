import Link from "next/link";

export default function PrayerJournalPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white md:text-4xl">Prayer Journal</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
          A standalone prayer journal page isn&rsquo;t available right now. You can still write prayers and keep
          the ones that matter to you.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/tools/prayer"
          className="flex flex-col rounded-[28px] border border-white/10 bg-white p-6 shadow-2xl transition hover:opacity-95 md:p-8"
        >
          <h2 className="text-xl font-bold text-slate-900">Prayer</h2>
          <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">
            Generate a personal, Scripture-grounded prayer for whatever you&rsquo;re facing.
          </p>
          <span className="mt-4 text-sm font-semibold text-slate-900">Write a prayer →</span>
        </Link>

        <Link
          href="/saved"
          className="flex flex-col rounded-[28px] border border-white/10 bg-white p-6 shadow-2xl transition hover:opacity-95 md:p-8"
        >
          <h2 className="text-xl font-bold text-slate-900">Saved</h2>
          <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">
            Save prayers from the Prayer tool to your account and revisit them here. Saving requires signing
            in.
          </p>
          <span className="mt-4 text-sm font-semibold text-slate-900">View saved prayers →</span>
        </Link>
      </div>

      <p className="mt-6 text-sm leading-7 text-white/60">
        You can also track answered prayers and add notes in the Prayer Journal on your{" "}
        <Link href="/dashboard" className="font-semibold text-white underline underline-offset-4 hover:text-orange-300">
          Dashboard
        </Link>
        .
      </p>
    </main>
  );
}
