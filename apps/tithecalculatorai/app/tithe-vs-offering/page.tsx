import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tithe vs Offering: What Is the Difference? | Tithe Calculator AI",
  description:
    "What is the difference between a tithe and an offering? Learn the biblical distinction, why both matter, and how to calculate your tithe and offering together.",
  alternates: { canonical: "/tithe-vs-offering" },
  openGraph: {
    title: "Tithe vs Offering: What Is the Difference?",
    description:
      "Understand the biblical difference between a tithe and an offering, and how to give both faithfully — with our free tithe and offering calculator.",
    url: "https://tithecalculatorai.com/tithe-vs-offering",
    type: "article",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Tithe vs Offering: What Is the Difference?",
  description:
    "What is the difference between a tithe and an offering? Learn the biblical distinction, why both matter, and how to calculate your tithe and offering together.",
  url: "https://tithecalculatorai.com/tithe-vs-offering",
  author: {
    "@type": "Organization",
    name: "Tithe Calculator AI",
    url: "https://tithecalculatorai.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Tithe Calculator AI",
    url: "https://tithecalculatorai.com",
  },
  mainEntityOfPage: "https://tithecalculatorai.com/tithe-vs-offering",
};

export default function TitheVsOfferingPage() {
  return (
    <main className="min-h-screen bg-[#050814] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-6 py-16">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-emerald-400">
          TitheCalculatorAI.com
        </p>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Tithe vs Offering: What Is the Difference?
        </h1>

        <p className="mt-4 text-lg text-slate-400">
          Understanding the two core ways Christians give back to God
        </p>

        <div className="mt-10 space-y-8 leading-8 text-slate-300">
          <p>
            Many Christians use the words <strong className="text-white">tithe</strong> and{" "}
            <strong className="text-white">offering</strong> interchangeably, but they are
            distinct concepts in Scripture. Understanding the difference helps you give with
            more intention, clarity, and faithfulness.
          </p>

          <h2 className="text-2xl font-bold text-white">What Is a Tithe?</h2>
          <p>
            A tithe is a fixed proportion — traditionally 10% of your income — given as an
            act of worship and obedience. The Hebrew word for tithe is <em>maaser</em>, meaning
            "a tenth." The tithe is typically directed to your local church, which the Old
            Testament referred to as the "storehouse" (Malachi 3:10). It is considered the
            baseline of Christian giving — a starting point, not a ceiling.
          </p>
          <p>
            Most Christian denominations teach that the tithe should be given consistently and
            systematically — weekly, biweekly, or monthly — in step with how you receive
            your income. Proverbs 3:9 instructs believers to honor God with the "firstfruits"
            of their increase, which many interpret as giving before other expenses are paid.
          </p>

          <h2 className="text-2xl font-bold text-white">What Is an Offering?</h2>
          <p>
            An offering is any giving beyond the tithe. It is voluntary, flexible, and often
            directed toward a specific need or cause. Offerings may support missions, disaster
            relief, building funds, ministries serving the poor, or individuals in need. In
            2 Corinthians 9:6-7, Paul says: <em>"Whoever sows generously will also reap
            generously. Each of you should give what you have decided in your heart to give,
            not reluctantly or under compulsion."</em>
          </p>
          <p>
            Unlike the tithe, offerings are not prescribed by a fixed percentage. They flow
            from a spirit of gratitude, compassion, and generosity — and can vary week to week
            based on your circumstances and what God places on your heart.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
              <h3 className="font-bold text-emerald-300">Tithe</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li>• Fixed: typically 10% of income</li>
                <li>• Given to your local church</li>
                <li>• Systematic and consistent</li>
                <li>• An act of obedience and worship</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
              <h3 className="font-bold text-emerald-300">Offering</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li>• Flexible: any amount beyond the tithe</li>
                <li>• Directed to any ministry or cause</li>
                <li>• Given as God leads and as you are able</li>
                <li>• An expression of generosity and love</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white">Giving Both Together</h2>
          <p>
            Many Christians aim to tithe faithfully as a discipline, then give offerings as
            opportunities arise. Our tithe calculator lets you enter both your tithe and your
            offering in a single calculation, so you can see your complete giving picture —
            per pay period and annually.
          </p>

          <div className="rounded-2xl border border-emerald-700 bg-emerald-950/40 p-6 text-center">
            <p className="text-lg font-semibold text-emerald-300">
              Calculate your tithe and offering together
            </p>
            <p className="mt-2 text-slate-300">
              Our free calculator handles both in one place — enter your income, choose a
              percentage, and add your offering to see the full projection.
            </p>
            <a
              href="/"
              className="mt-4 inline-block rounded-2xl bg-emerald-500 px-6 py-3 font-bold text-black hover:bg-emerald-400"
            >
              Use the Free Tithe &amp; Offering Calculator →
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8">
          <h3 className="text-lg font-semibold text-white">Related Articles</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="/what-is-a-tithe" className="text-emerald-400 hover:underline">
                What Is a Tithe? Biblical Definition & How to Calculate It
              </a>
            </li>
            <li>
              <a href="/how-to-tithe" className="text-emerald-400 hover:underline">
                How to Tithe Biblically: A Step-by-Step Guide
              </a>
            </li>
          </ul>
        </div>
      </article>
    </main>
  );
}
