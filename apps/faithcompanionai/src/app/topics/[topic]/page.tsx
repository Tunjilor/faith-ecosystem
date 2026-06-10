// src/app/topics/[topic]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TOPICS, TOPIC_SLUGS, getTopic } from "../data";

export const dynamic = "force-static";

type Props = { params: { topic: string } };

export function generateStaticParams() {
  return TOPIC_SLUGS.map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getTopic(params.topic);
  if (!data) return { title: "Topic not found" };

  return {
    // Absolute title bypasses the root layout's "%s | Faith Companion AI" template,
    // avoiding double-branding. Keep `${data.title}` short so the total stays < 60 chars.
    title: { absolute: `${data.title} | Faith Companion AI` },
    description: data.description,
    alternates: { canonical: `/topics/${data.topic}` },
    openGraph: {
      title: `${data.title} | Faith Companion AI`,
      description: data.description,
      url: `https://faithcompanionai.com/topics/${data.topic}`,
      type: "article",
      images: [{ url: "/brand/og-quiz.png", width: 1200, height: 630, alt: data.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: ["/brand/og-quiz.png"],
    },
  };
}

export default function TopicPage({ params }: Props) {
  const data = getTopic(params.topic);
  if (!data) notFound();

  const otherTopics = TOPIC_SLUGS.filter((s) => s !== data.topic);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.description,
    author: { "@type": "Organization", name: "Faith Companion AI" },
    publisher: { "@type": "Organization", name: "Faith Companion AI", url: "https://faithcompanionai.com" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://faithcompanionai.com/topics/${data.topic}` },
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const label = data.label ?? capitalize(data.topic);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-white/40">
        <Link href="/" className="hover:text-white">Home</Link>
        <span>›</span>
        <Link href="/resources" className="hover:text-white">Resources</Link>
        <span>›</span>
        <span className="text-white/60">{data.title}</span>
      </nav>

      {/* Hero */}
      <header className="mb-8">
        <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/60">
          Scripture for {label}
        </div>
        <h1 className="mt-4 text-4xl font-extrabold text-white md:text-5xl">{data.title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 md:text-base">{data.intro}</p>
      </header>

      {/* ── Bible Verses ── */}
      <section>
        <h2 className="text-2xl font-bold text-white md:text-3xl">
          Key Bible Verses for {label}
        </h2>

        <div className="mt-6 space-y-4">
          {data.verses.map((verse, i) => (
            <div
              key={i}
              className="rounded-[22px] border border-white/10 bg-white/5 p-6"
            >
              <div className="text-sm font-bold text-orange-300">{verse.ref}</div>
              <blockquote className="mt-3 text-base leading-7 text-white italic">
                "{verse.text}"
              </blockquote>
              <p className="mt-3 text-sm text-white/55">{verse.context}</p>
            </div>
          ))}
        </div>

        {!data.prayerCta && (
          <div className="mt-6 rounded-[20px] border border-white/10 bg-black/20 p-4 text-center text-sm text-white/55">
            Want a verse tailored to your specific situation?{" "}
            <Link href="/tools/verse" className="font-semibold text-orange-300 hover:text-orange-200">
              Generate a personalized verse →
            </Link>
          </div>
        )}
      </section>

      {/* ── Reflection (optional) ── */}
      {data.reflection && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white md:text-3xl">Reflection</h2>
          <div className="mt-6 rounded-[22px] border border-white/10 bg-white/5 p-6 md:p-8">
            <p className="whitespace-pre-line text-sm leading-7 text-white/75">
              {data.reflection}
            </p>
          </div>
        </section>
      )}

      {/* ── Prayer ── */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-white md:text-3xl">
          A Prayer for {label}
        </h2>
        <p className="mt-2 text-sm text-white/55">
          Use this prayer as-is, or let it guide your own words. There is no perfect formula — God
          cares about honesty, not performance.
        </p>

        <div className="mt-6 rounded-[22px] border border-white/10 bg-white/5 p-6 md:p-8">
          <p className="whitespace-pre-line text-sm leading-8 text-white/80 italic">
            {data.prayer}
          </p>
        </div>

        {!data.prayerCta && (
          <div className="mt-4 text-center text-sm text-white/55">
            <Link href="/tools/prayer" className="font-semibold text-orange-300 hover:text-orange-200">
              Generate a personal prayer for your exact situation →
            </Link>
          </div>
        )}
      </section>

      {/* ── One small step (optional) ── */}
      {data.actionStep && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white md:text-3xl">One Small Step</h2>
          <div className="mt-6 rounded-[22px] border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="flex gap-4">
              <div className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-orange-500/20 text-sm font-bold text-orange-300">
                ✓
              </div>
              <p className="text-sm leading-7 text-white/80">{data.actionStep}</p>
            </div>
          </div>
        </section>
      )}

      {/* ── Prayer-tool CTA (optional) ── */}
      {data.prayerCta && (
        <section className="mt-12 rounded-[28px] border border-white/10 bg-white/5 p-8 text-center">
          <p className="mx-auto max-w-xl text-sm leading-7 text-white/70">{data.prayerCta.text}</p>
          <div className="mt-6">
            <Link
              href="/tools/prayer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
            >
              {data.prayerCta.buttonLabel}
            </Link>
          </div>
        </section>
      )}

      {/* ── Related (explicit) or Explore other topics (auto) ── */}
      {data.related && data.related.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-white">Related</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {data.related.map((r) => (
              <Link
                key={r.slug}
                href={`/topics/${r.slug}`}
                className="rounded-[18px] border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white/75 transition hover:bg-white/10 hover:text-white"
              >
                {r.label}
                <span className="ml-1 text-orange-300">→</span>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-white">Explore other topics</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {otherTopics.map((t) => (
              <Link
                key={t}
                href={`/topics/${t}`}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/70 capitalize hover:bg-white/10 hover:text-white transition"
              >
                {getTopic(t)?.label ?? t}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Generic CTA (hidden when a focused prayer CTA is present) ── */}
      {!data.prayerCta && (
        <section className="mt-12 rounded-[28px] border border-white/10 bg-white/5 p-8 text-center">
          <h2 className="text-xl font-bold text-white">
            Personalize these resources for your situation
          </h2>
          <p className="mt-2 text-sm text-white/60 max-w-xl mx-auto">
            Faith Companion AI generates verses, prayers, and devotionals tailored to your exact situation —
            any topic, any tone. Free to try, no account required.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/tools/verse"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:opacity-90 transition"
            >
              Get a Verse
            </Link>
            <Link
              href="/tools/prayer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              Write a Prayer
            </Link>
            <Link
              href="/tools/devotional"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              Get a Devotional
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
