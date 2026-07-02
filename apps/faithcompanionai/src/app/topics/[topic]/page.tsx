// src/app/topics/[topic]/page.tsx
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { TOPICS, TOPIC_SLUGS, TOPIC_ALIASES, getTopic } from "../data";
import ShareBlock from "./ShareBlock";

export const dynamic = "force-static";
// Allow slugs outside generateStaticParams to render on demand so the
// unknown-slug redirect below can fire (instead of Next serving a 404).
export const dynamicParams = true;

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
  if (!data) {
    // Pinterest theme alias (e.g. /topics/mercy) → redirect to the best-matching page.
    const alias = TOPIC_ALIASES[params.topic];
    if (alias) redirect(`/topics/${alias}`);
    // Safety net: any other unknown slug redirects to the /topics hub rather than
    // serving a dead 404, so no pin ever hits a dead end.
    redirect("/topics");
  }

  const otherTopics = TOPIC_SLUGS.filter((s) => s !== data.topic);

  const articleDate = data.dateModified ?? data.datePublished;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.description,
    ...(data.datePublished ? { datePublished: data.datePublished } : {}),
    ...(articleDate ? { dateModified: articleDate } : {}),
    author: { "@type": "Organization", name: "Faith Companion AI" },
    publisher: { "@type": "Organization", name: "Faith Companion AI", url: "https://faithcompanionai.com" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://faithcompanionai.com/topics/${data.topic}` },
  };

  // FAQPage structured data — emitted only when a page supplies an FAQ (for "People Also Ask" eligibility).
  const faqSchema =
    data.faqs && data.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: data.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const label = data.label ?? capitalize(data.topic);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

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

      {/* ── Full passage quote (optional — scripture passage pages) ── */}
      {data.passage && (
        <section className="mb-10">
          <div className="rounded-[22px] border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="text-sm font-bold text-orange-300">{data.passage.ref}</div>
            <blockquote className="mt-4 whitespace-pre-line text-base leading-8 text-white/90 italic">
              {data.passage.text}
            </blockquote>
          </div>
        </section>
      )}

      {/* ── What this passage means (optional — passage pages) ── */}
      {data.meaning && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white md:text-3xl">What this passage means</h2>
          <div className="mt-6 rounded-[22px] border border-white/10 bg-white/5 p-6 md:p-8">
            <p className="whitespace-pre-line text-sm leading-7 text-white/75">{data.meaning}</p>
          </div>
        </section>
      )}

      {/* ── Bible Verses (topical pages only) ── */}
      {data.verses.length > 0 && (
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
      )}

      {/* ── Seasonal content sections (optional — subheadings, verse-a-day lists, mood verses, word of the year) ── */}
      {data.contentSections?.map((sec, i) => (
        <section className="mt-12" key={i}>
          <h2 className="text-2xl font-bold text-white md:text-3xl">{sec.heading}</h2>

          {sec.kind === "prose" && (
            <div className="mt-6 rounded-[22px] border border-white/10 bg-white/5 p-6 md:p-8">
              <p className="whitespace-pre-line text-sm leading-7 text-white/75">{sec.body}</p>
              {sec.callout && (
                <div className="mt-6 rounded-[18px] border border-orange-400/20 bg-orange-500/5 p-5 text-sm leading-7 text-white/85">
                  {sec.callout}
                </div>
              )}
            </div>
          )}

          {sec.kind === "verseList" && (
            <div className="mt-6 rounded-[22px] border border-white/10 bg-white/5 p-6 md:p-8">
              {sec.intro && <p className="mb-5 text-sm leading-7 text-white/65">{sec.intro}</p>}
              <ol className="space-y-3">
                {sec.items.map((item, j) => (
                  <li key={j} className="flex gap-4">
                    <div className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-purple-500/20 text-xs font-bold text-purple-200">
                      {j + 1}
                    </div>
                    <p className="text-sm leading-7 text-white/80">
                      <span className="font-semibold text-orange-300">{item.ref}</span>
                      {item.note && <span className="text-white/60"> — {item.note}</span>}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {sec.kind === "moodVerses" && (
            <>
              {sec.intro && <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">{sec.intro}</p>}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {sec.groups.map((g, j) => (
                  <div key={j} className="rounded-[22px] border border-white/10 bg-white/5 p-6">
                    <div className="text-xs font-semibold uppercase tracking-wide text-purple-200/80">{g.mood}</div>
                    <div className="mt-2 text-sm font-bold text-orange-300">{g.ref}</div>
                    <p className="mt-2 text-sm leading-7 text-white/70">{g.note}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {sec.kind === "wordOfYear" && (
            <>
              {sec.intro && <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">{sec.intro}</p>}
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {sec.words.map((w, j) => (
                  <Link
                    key={j}
                    href={sec.shareHref}
                    className="group rounded-[22px] border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
                  >
                    <div className="text-lg font-bold text-white">{w.word}</div>
                    <div className="mt-1 text-sm font-semibold text-orange-300">{w.ref}</div>
                    <div className="mt-3 text-xs font-semibold text-white/50 group-hover:text-white/70">
                      Create your card →
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </section>
      ))}

      {/* ── Interactive-tool CTAs (optional — prominent buttons, seasonal pages) ── */}
      {data.toolCtas && (
        <section className="mt-12 rounded-[28px] border border-white/10 bg-white/5 p-8 text-center">
          <h2 className="text-xl font-bold text-white">{data.toolCtas.heading}</h2>
          {data.toolCtas.intro && (
            <p className="mx-auto mt-2 max-w-xl text-sm text-white/60">{data.toolCtas.intro}</p>
          )}
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            {data.toolCtas.buttons.map((b, i) => (
              <Link
                key={i}
                href={b.href}
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
              >
                {b.label}
              </Link>
            ))}
          </div>
        </section>
      )}

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

        {data.pdfDownload && (
          <div className="mt-4 text-center text-sm">
            <a
              href={data.pdfDownload.href}
              download
              className="inline-flex items-center gap-2 font-semibold text-orange-300 hover:text-orange-200"
            >
              ⬇ {data.pdfDownload.label}
            </a>
          </div>
        )}

        {!data.prayerCta && (
          <div className="mt-4 text-center text-sm text-white/55">
            <Link href="/tools/prayer" className="font-semibold text-orange-300 hover:text-orange-200">
              Generate a personal prayer for your exact situation →
            </Link>
          </div>
        )}
      </section>

      {/* ── 5-minute devotional (optional) ── */}
      {data.devotional && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white md:text-3xl">{data.devotional.heading}</h2>
          <div className="mt-6 rounded-[22px] border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="text-sm font-bold text-orange-300">{data.devotional.passage.ref}</div>
            <blockquote className="mt-3 text-base leading-7 text-white italic">
              "{data.devotional.passage.text}"
            </blockquote>
            <p className="mt-5 whitespace-pre-line text-sm leading-7 text-white/75">
              {data.devotional.reflection}
            </p>
            <div className="mt-6 rounded-[18px] border border-orange-400/20 bg-orange-500/5 p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-orange-300/80">
                Sit with this
              </div>
              <p className="mt-2 text-sm leading-7 text-white/85">{data.devotional.question}</p>
            </div>
          </div>
        </section>
      )}

      {/* ── Reflection / discussion questions (optional) ── */}
      {data.reflectionQuestions && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white md:text-3xl">{data.reflectionQuestions.heading}</h2>
          <div className="mt-6 rounded-[22px] border border-white/10 bg-white/5 p-6 md:p-8">
            <ol className="space-y-4">
              {data.reflectionQuestions.questions.map((q, i) => (
                <li key={i} className="flex gap-4">
                  <div className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-purple-500/20 text-sm font-bold text-purple-200">
                    {i + 1}
                  </div>
                  <p className="text-sm leading-7 text-white/80">{q}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ── Small-group / family discussion guide (optional) ── */}
      {data.discussionGuide && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white md:text-3xl">{data.discussionGuide.heading}</h2>
          <div className="mt-6 rounded-[22px] border border-white/10 bg-white/5 p-6 md:p-8">
            <p className="whitespace-pre-line text-sm leading-7 text-white/75">{data.discussionGuide.text}</p>
          </div>
        </section>
      )}

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

      {/* ── Seasonal Bible-quiz link (optional) ── */}
      {data.quizLink && (
        <section className="mt-12">
          <Link
            href={data.quizLink.href}
            className="flex items-center justify-between gap-4 rounded-[22px] border border-white/10 bg-gradient-to-r from-purple-600/15 to-orange-500/15 p-6 transition hover:from-purple-600/25 hover:to-orange-500/25"
          >
            <span className="text-base font-semibold text-white">{data.quizLink.label}</span>
            <span className="flex-none text-2xl text-orange-300">→</span>
          </Link>
        </section>
      )}

      {/* ── "When the season is hard" — gentle support links (optional) ── */}
      {data.hardSeason && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white md:text-3xl">{data.hardSeason.heading}</h2>
          <div className="mt-6 rounded-[22px] border border-white/10 bg-white/5 p-6 md:p-8">
            <p className="whitespace-pre-line text-sm leading-7 text-white/75">{data.hardSeason.text}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {data.hardSeason.links.map((l) => (
                <Link
                  key={l.slug}
                  href={`/topics/${l.slug}`}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/75 transition hover:bg-white/10 hover:text-white"
                >
                  {l.label}
                  <span className="ml-1 text-orange-300">→</span>
                </Link>
              ))}
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

      {/* ── Share block (optional — copy page URL to clipboard) ── */}
      {data.shareBlock && (
        <ShareBlock text={data.shareBlock.text} url={`https://faithcompanionai.com/topics/${data.topic}`} />
      )}

      {/* ── FAQ (optional — paired with FAQPage JSON-LD above) ── */}
      {data.faqs && data.faqs.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white md:text-3xl">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-4">
            {data.faqs.map((f, i) => (
              <div key={i} className="rounded-[22px] border border-white/10 bg-white/5 p-6">
                <h3 className="text-base font-bold text-white">{f.question}</h3>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-white/70">{f.answer}</p>
              </div>
            ))}
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
