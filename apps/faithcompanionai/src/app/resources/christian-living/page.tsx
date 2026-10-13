import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  // Root layout applies the "%s | Faith Companion AI" title template — no brand here.
  title: "Christian Living",
  description:
    "Practical encouragement for daily life with God — faith, habits, relationships, and Scripture for everyday moments.",
  // Short hub page that points to the blog and topic guides — keep it out of search
  // results, but let crawlers follow its links.
  robots: { index: false, follow: true },
};

const links = [
  {
    href: "/blog",
    title: "Blog",
    description: "Articles on prayer, devotional habits, and walking with God in everyday life.",
    cta: "Read the blog →",
  },
  {
    href: "/topics",
    title: "Topics",
    description: "Scripture, prayers, and encouragement for anxiety, peace, grief, guidance, and more.",
    cta: "Browse topics →",
  },
];

export default function ChristianLivingPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white md:text-4xl">Christian Living</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
          Simple, practical encouragement for daily life — faith, habits, relationships, and walking with God.
          Start with our articles and topic guides.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col rounded-[28px] border border-white/10 bg-white p-6 shadow-2xl transition hover:opacity-95 md:p-8"
          >
            <h2 className="text-xl font-bold text-slate-900">{item.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">{item.description}</p>
            <span className="mt-4 text-sm font-semibold text-slate-900">{item.cta}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
