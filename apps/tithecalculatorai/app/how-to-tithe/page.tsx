import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Tithe Biblically: A Step-by-Step Guide | Tithe Calculator AI",
  description:
    "Learn how to tithe biblically — whether on gross or net income, how often to give, where to give, and how to build a consistent Christian giving habit.",
  alternates: { canonical: "/how-to-tithe" },
  openGraph: {
    title: "How to Tithe Biblically: A Step-by-Step Guide",
    description:
      "A practical, Scripture-grounded guide to tithing — including gross vs net, how often to give, where to give, and how to start even on a tight budget.",
    url: "https://tithecalculatorai.com/how-to-tithe",
    type: "article",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Tithe Biblically: A Step-by-Step Guide",
  description:
    "Learn how to tithe biblically — whether on gross or net income, how often to give, where to give, and how to build a consistent Christian giving habit.",
  url: "https://tithecalculatorai.com/how-to-tithe",
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
  mainEntityOfPage: "https://tithecalculatorai.com/how-to-tithe",
};

export default function HowToTithePage() {
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
          How to Tithe Biblically
        </h1>

        <p className="mt-4 text-lg text-slate-400">
          A step-by-step guide to faithful, consistent Christian giving
        </p>

        <div className="mt-10 space-y-8 leading-8 text-slate-300">
          <p>
            Tithing is one of the most transformative financial habits a Christian can build.
            But many believers feel uncertain about <em>how</em> to actually do it — how much,
            from which income, how often, and where to give. This guide answers every one of
            those questions from a biblical foundation.
          </p>

          <h2 className="text-2xl font-bold text-white">Step 1: Decide Your Tithe Basis</h2>
          <p>
            The first decision is whether to tithe on your <strong className="text-white">gross income
            </strong> (before taxes) or your <strong className="text-white">net income</strong> (after
            taxes). Both approaches are practiced by sincere Christians. Tithing on gross income reflects
            the "firstfruits" principle — giving God the full portion before any deductions. Tithing
            on net income is also common, with the reasoning that taxes are withheld before you ever
            see the money. Choose the approach that you can sustain cheerfully and consistently.
          </p>

          <h2 className="text-2xl font-bold text-white">Step 2: Calculate Your Tithe</h2>
          <p>
            Multiply your income by 10% (or 0.10). If you earn $4,000 per month, your tithe is
            $400. If you earn $52,000 per year, your tithe is $5,200. Our tithe calculator below
            does this instantly — for any income amount, any pay period (weekly, biweekly,
            monthly, quarterly, or yearly), and any giving percentage you choose.
          </p>

          <h2 className="text-2xl font-bold text-white">Step 3: Choose Where to Give</h2>
          <p>
            Traditionally, the tithe is given to your local church — what Malachi 3:10 calls the
            "storehouse." Your church is your spiritual home, and the tithe supports its pastors,
            staff, facilities, and ministry programs. Many Christians also direct a portion to
            parachurch ministries, missions organizations, or community outreach as offerings
            beyond the tithe.
          </p>

          <h2 className="text-2xl font-bold text-white">Step 4: Give Consistently</h2>
          <p>
            1 Corinthians 16:2 describes giving "on the first day of every week" — building
            regularity into the practice. Consistent giving creates a spiritual discipline that
            reinforces trust in God's provision. Set up an automatic transfer or church giving
            account to make your tithe as automatic as any other bill you pay.
          </p>

          <h2 className="text-2xl font-bold text-white">Step 5: Give Cheerfully</h2>
          <p>
            The heart behind the gift matters as much as the amount. 2 Corinthians 9:7 says God
            loves a "cheerful giver." If tithing feels burdensome, begin where you can — even
            5% — and grow toward 10% over time. God honors faithful, joyful stewardship at every
            income level.
          </p>

          <div className="rounded-2xl border border-emerald-700 bg-emerald-950/40 p-6 text-center">
            <p className="text-lg font-semibold text-emerald-300">
              See exactly how much your tithe is
            </p>
            <p className="mt-2 text-slate-300">
              Enter your income and pay period into our free tithe calculator and get an
              instant breakdown — per period, monthly, and annually.
            </p>
            <a
              href="/"
              className="mt-4 inline-block rounded-2xl bg-emerald-500 px-6 py-3 font-bold text-black hover:bg-emerald-400"
            >
              Calculate My Tithe Now →
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
              <a href="/tithe-vs-offering" className="text-emerald-400 hover:underline">
                Tithe vs Offering: What Is the Difference?
              </a>
            </li>
          </ul>
        </div>
      </article>
    </main>
  );
}
