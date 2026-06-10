// src/app/topics/page.tsx — the /topics hub / library index.
import type { Metadata } from "next";
import Link from "next/link";
import { TOPICS, TOPIC_SLUGS, TOPIC_GROUPS, getTopic } from "./data";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Prayer & Bible Verse Library",
  description:
    "Browse the full Faith Companion library — public-domain Bible verses, written prayers, and Scripture passage guides for anxiety, grief, marriage, money, faith, and more.",
  alternates: { canonical: "/topics" },
  openGraph: {
    title: "Prayer & Bible Verse Library | Faith Companion AI",
    description:
      "Scripture, prayers, and passage guides for life's hardest moments — grouped by theme. All free, all grounded in God's Word.",
    url: "https://faithcompanionai.com/topics",
    type: "website",
    images: [{ url: "/brand/og-quiz.png", width: 1200, height: 630, alt: "Faith Companion AI — Prayer & Bible Verse Library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prayer & Bible Verse Library | Faith Companion AI",
    description: "Bible verses, prayers, and passage guides for every season — grouped by theme.",
    images: ["/brand/og-quiz.png"],
  },
};

export default function TopicsHubPage() {
  // Build the sections from the data so the hub never drifts out of date:
  //  - the editorial groups (TOPIC_GROUPS),
  //  - "Scripture Passages" derived from any page with a `passage` field,
  //  - "More Topics" — any remaining page, so nothing can ever be orphaned.
  const placed = new Set(TOPIC_GROUPS.flatMap((g) => g.slugs));
  const passageSlugs = TOPIC_SLUGS.filter((s) => TOPICS[s]?.passage && !placed.has(s));
  passageSlugs.forEach((s) => placed.add(s));
  const moreSlugs = TOPIC_SLUGS.filter((s) => !placed.has(s));

  const sections: Array<{ title: string; slugs: string[] }> = [
    ...TOPIC_GROUPS.map((g) => ({ title: g.title, slugs: g.slugs })),
    ...(passageSlugs.length ? [{ title: "Scripture Passages", slugs: passageSlugs }] : []),
    ...(moreSlugs.length ? [{ title: "More Topics", slugs: moreSlugs }] : []),
  ];

  const allSlugs = sections.flatMap((s) => s.slugs);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Faith Companion AI — Prayer & Bible Verse Library",
    description:
      "A library of Scripture-grounded pages — Bible verses, written prayers, and passage guides for life's hardest moments, grouped by theme.",
    url: "https://faithcompanionai.com/topics",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: allSlugs.length,
      itemListElement: allSlugs.map((slug, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://faithcompanionai.com/topics/${slug}`,
        name: getTopic(slug)?.title ?? slug,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <header className="mb-10">
        <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/60">
          The Library
        </div>
        <h1 className="mt-4 text-4xl font-extrabold text-white md:text-5xl">
          Bible Verses &amp; Prayers for Every Season
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
          A growing library of Scripture-grounded pages for the moments life actually brings —
          fear, grief, a hard marriage, a new job, a wandering child, a faith that feels distant.
          Every page pairs public-domain Bible verses with a written prayer you can pray right now
          and one small step. Browse by theme below.
        </p>
      </header>

      {/* Themed sections */}
      <div className="space-y-12">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-2xl font-bold text-white md:text-3xl">{section.title}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {section.slugs.map((slug) => {
                const data = getTopic(slug);
                if (!data) return null;
                return (
                  <Link
                    key={slug}
                    href={`/topics/${slug}`}
                    className="group flex flex-col rounded-[22px] border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
                  >
                    <div className="text-base font-bold text-white group-hover:text-orange-200">
                      {data.title}
                    </div>
                    <p className="mt-2 flex-1 text-sm leading-6 text-white/55">{data.description}</p>
                    <span className="mt-3 text-sm font-semibold text-orange-300">Read →</span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="mt-14 rounded-[28px] border border-white/10 bg-white/5 p-8 text-center">
        <h2 className="text-xl font-bold text-white">Need a prayer for your exact situation?</h2>
        <p className="mt-2 max-w-xl mx-auto text-sm text-white/60">
          Tell Faith Companion what you&rsquo;re going through and get a personal, Scripture-based
          prayer written for this moment — free, no account required.
        </p>
        <div className="mt-6">
          <Link
            href="/tools/prayer"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
          >
            Write a prayer
          </Link>
        </div>
      </section>
    </>
  );
}
