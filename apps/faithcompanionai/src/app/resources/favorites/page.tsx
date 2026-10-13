import Link from "next/link";

export default function FavoritesPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white md:text-4xl">Favorites</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
          Your saved verses, prayers, and devotionals live on the Saved page.
        </p>
      </header>

      <div className="rounded-[28px] border border-white/10 bg-white p-6 shadow-2xl md:p-8">
        <h2 className="text-xl font-bold text-slate-900">Favorites aren&rsquo;t kept on this page</h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
          Premium members can save verses, prayers, and devotionals from our tools and find them on the Saved page.
          You&rsquo;ll need to sign in with a Premium account to save and view them.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/saved"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-orange-500 px-5 py-2 text-sm font-semibold text-white transition hover:opacity-95"
          >
            Go to Saved →
          </Link>
          <Link
            href="/pricing"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            See Premium plans
          </Link>
        </div>
      </div>
    </main>
  );
}
