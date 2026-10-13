import Link from "next/link";

export default function VerseFinderPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white md:text-4xl">Verse Finder</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
          Verse Finder isn&rsquo;t available as a separate tool. These two tools already do what you&rsquo;re looking for.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/tools/verse"
          className="flex flex-col rounded-[28px] border border-white/10 bg-white p-6 shadow-2xl transition hover:opacity-95 md:p-8"
        >
          <h2 className="text-xl font-bold text-slate-900">Verse</h2>
          <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">
            Get a Bible verse for any topic or season — peace, anxiety, forgiveness, or guidance — with a short
            reflection and a simple next step.
          </p>
          <span className="mt-4 text-sm font-semibold text-slate-900">Get a verse →</span>
        </Link>

        <Link
          href="/tools/bible-search"
          className="flex flex-col rounded-[28px] border border-white/10 bg-white p-6 shadow-2xl transition hover:opacity-95 md:p-8"
        >
          <h2 className="text-xl font-bold text-slate-900">Bible Search</h2>
          <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">
            Look up a passage by reference, such as John 3:16 or Psalm 23, or search by keyword to find verses on
            peace, hope, love, or strength.
          </p>
          <span className="mt-4 text-sm font-semibold text-slate-900">Search the Bible →</span>
        </Link>
      </div>
    </main>
  );
}
