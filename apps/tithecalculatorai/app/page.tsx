"use client";

import { useMemo, useState } from "react";

type Frequency = "weekly" | "biweekly" | "monthly" | "quarterly" | "yearly";

const frequencyLabels: Record<Frequency, string> = {
  weekly: "Weekly",
  biweekly: "Bi-weekly",
  monthly: "Monthly",
  quarterly: "Quarterly",
  yearly: "Yearly",
};

const yearlyMultiplier: Record<Frequency, number> = {
  weekly: 52,
  biweekly: 26,
  monthly: 12,
  quarterly: 4,
  yearly: 1,
};

function money(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is tithing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tithing is the practice of giving a portion of your income back to God. Many Christians understand a tithe as 10% of income. This calculator helps you estimate your tithe clearly based on your pay period and chosen percentage.",
      },
    },
    {
      "@type": "Question",
      name: "Should you tithe on gross or net income?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Some believers tithe on their gross (pre-tax) income, seeing it as giving God the first and full portion before any deductions. Others tithe on net (after-tax) income, reasoning that they never actually receive the withheld portion. Both views are held by sincere Christians. The most important thing is giving cheerfully and consistently.",
      },
    },
    {
      "@type": "Question",
      name: "What does the Bible say about tithing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Key Bible verses about tithing include Malachi 3:10 which speaks about bringing the tithe and trusting God's provision, Proverbs 3:9 which teaches honoring the Lord with your wealth, Genesis 14:20 showing Abram giving a tenth as an early example, and 2 Corinthians 9:7 reminding believers that giving should come from the heart.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between tithe and offering?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A tithe is commonly understood as a set portion, often 10%, given as an act of faith and obedience. An offering is usually extra giving beyond the tithe. Offerings may support missions, church projects, families in need, community outreach, or other causes.",
      },
    },
    {
      "@type": "Question",
      name: "What percentage should I tithe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The traditional tithe is 10% of your income. However, many Christians give more or less depending on their financial situation and conviction. The key principle is generous, cheerful, and consistent giving. Use this calculator to find the amount that works for your income and pay period.",
      },
    },
    {
      "@type": "Question",
      name: "Can I tithe to organizations other than my church?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "While many Christians direct their tithe to their local church, others also give to Christian ministries, missions organizations, or charitable causes. Some split their giving between their church and other organizations. The important thing is giving with a willing and generous heart.",
      },
    },
    {
      "@type": "Question",
      name: "How do I start tithing if I have never done it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start by calculating what percentage of your income you can give. Many people begin with a smaller percentage and work toward 10% over time. Use this calculator to see what different percentages look like for your income. Set up automatic giving to stay consistent, and remember that any amount given cheerfully is meaningful.",
      },
    },
  ],
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Tithe Calculator AI",
  url: "https://tithecalculatorai.com",
  description:
    "Free tithe calculator to estimate your giving by income, pay period, and percentage.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function Home() {
  const [income, setIncome] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [percentage, setPercentage] = useState(10);
  const [offering, setOffering] = useState("0");

  const results = useMemo(() => {
    const incomeNumber = Number(income) || 0;
    const offeringNumber = Number(offering) || 0;

    const tithePerPeriod = incomeNumber * (percentage / 100);
    const totalPerPeriod = tithePerPeriod + offeringNumber;

    const annualTithe = tithePerPeriod * yearlyMultiplier[frequency];
    const annualOffering = offeringNumber * yearlyMultiplier[frequency];
    const annualTotal = totalPerPeriod * yearlyMultiplier[frequency];

    return {
      tithePerPeriod,
      totalPerPeriod,
      annualTithe,
      annualOffering,
      annualTotal,
      monthlyAverage: annualTotal / 12,
      weeklyAverage: annualTotal / 52,
    };
  }, [income, frequency, percentage, offering]);

  return (
    <>
      <main className="min-h-screen bg-[#050814] text-white">
        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-emerald-400">
              TitheCalculatorAI.com
            </p>

            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
              Calculate Your Tithe Instantly
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
              Enter your income, choose your pay period, adjust your giving
              percentage, and see your tithe breakdown clearly.
            </p>

            <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-6 text-left shadow-2xl">
                <label className="mb-2 block text-sm font-semibold text-slate-200">
                  Income per pay period
                </label>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  className="mb-5 w-full rounded-2xl border border-slate-700 bg-black px-4 py-4 text-lg outline-none focus:border-emerald-400"
                  placeholder="Enter your income"
                />

                <label className="mb-2 block text-sm font-semibold text-slate-200">
                  Pay period
                </label>
                <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-5">
                  {Object.entries(frequencyLabels).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setFrequency(key as Frequency)}
                      className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${
                        frequency === key
                          ? "bg-emerald-400 text-black"
                          : "bg-slate-800 text-white hover:bg-slate-700"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <label className="mb-2 block text-sm font-semibold text-slate-200">
                  Tithe percentage: {percentage}%
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={percentage}
                  onChange={(e) => setPercentage(Number(e.target.value))}
                  className="mb-5 w-full"
                />

                <div className="mb-5 flex flex-wrap gap-3">
                  {[5, 10, 12, 15].map((value) => (
                    <button
                      key={value}
                      onClick={() => setPercentage(value)}
                      className="rounded-full border border-slate-700 px-4 py-2 text-sm hover:border-emerald-400"
                    >
                      {value}%
                    </button>
                  ))}
                </div>

                <label className="mb-2 block text-sm font-semibold text-slate-200">
                  Optional offering amount per pay period
                </label>
                <input
                  type="number"
                  value={offering}
                  onChange={(e) => setOffering(e.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-black px-4 py-4 text-lg outline-none focus:border-emerald-400"
                  placeholder="Example: 25"
                />
              </div>

              <div className="rounded-3xl border border-emerald-700 bg-emerald-950/40 p-6 text-left shadow-2xl">
                <p className="text-sm font-semibold uppercase tracking-widest text-emerald-300">
                  Your estimated tithe
                </p>

                <h2 className="mt-4 text-5xl font-bold text-emerald-300">
                  {money(results.tithePerPeriod)}
                </h2>

                <p className="mt-2 text-slate-300">
                  Based on {percentage}% of your{" "}
                  {frequencyLabels[frequency].toLowerCase()} income.
                </p>

                <div className="mt-8 grid gap-4">
                  <div className="rounded-2xl bg-black/30 p-4">
                    <p className="text-slate-400">Total with offering</p>
                    <p className="text-2xl font-bold">
                      {money(results.totalPerPeriod)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-black/30 p-4">
                      <p className="text-slate-400">Weekly average</p>
                      <p className="text-xl font-bold">
                        {money(results.weeklyAverage)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-black/30 p-4">
                      <p className="text-slate-400">Monthly average</p>
                      <p className="text-xl font-bold">
                        {money(results.monthlyAverage)}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-black/30 p-4">
                    <p className="text-slate-400">Yearly giving projection</p>
                    <p className="text-2xl font-bold">
                      {money(results.annualTotal)}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Tithe: {money(results.annualTithe)} · Offering:{" "}
                      {money(results.annualOffering)}
                    </p>
                  </div>
                </div>

                
                  href="https://faithcompanionai.com"
                  className="mt-6 block rounded-2xl bg-white px-6 py-4 text-center font-bold text-black hover:bg-slate-200"
                >
                  Continue Your Faith Journey
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-800 px-6 py-12">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-white">10,000+</p>
                <p className="mt-1 text-sm text-slate-400">
                  Calculations Made
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">50+</p>
                <p className="mt-1 text-sm text-slate-400">
                  Countries Represented
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">100%</p>
                <p className="mt-1 text-sm text-slate-400">Free to Use</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-800 px-6 py-16">
          <div className="mx-auto max-w-4xl space-y-12">
            <div>
              <h2 className="text-3xl font-bold">What Is Tithing?</h2>
              <p className="mt-4 leading-8 text-slate-300">
                Tithing is the practice of giving a portion of your income back
                to God. Many Christians understand a tithe as 10% of income.
                This calculator helps you estimate your tithe clearly based on
                your pay period and chosen percentage.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                Should You Tithe on Gross or Net Income?
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                This is one of the most common questions Christians ask about
                tithing.
              </p>

              <div className="mt-6 grid gap-4">
                <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
                  <h3 className="font-bold text-emerald-300">
                    Gross Income View
                  </h3>
                  <p className="mt-2 text-slate-300">
                    Some believers tithe on their gross (pre-tax) income, seeing
                    it as giving God the first and full portion before any
                    deductions.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
                  <h3 className="font-bold text-emerald-300">
                    Net Income View
                  </h3>
                  <p className="mt-2 text-slate-300">
                    Others tithe on net (after-tax) income, reasoning that they
                    never actually receive the withheld portion.
                  </p>
                </div>
              </div>

              <p className="mt-4 leading-8 text-slate-300">
                Both views are held by sincere Christians. The most important
                thing is giving cheerfully and consistently. Use the calculator
                above to find your number either way.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                What Does the Bible Say About Tithing?
              </h2>

              <div className="mt-6 grid gap-4">
                <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
                  <h3 className="font-bold text-emerald-300">Malachi 3:10</h3>
                  <p className="mt-2 text-slate-300">
                    This verse speaks about bringing the tithe and trusting
                    God&apos;s provision.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
                  <h3 className="font-bold text-emerald-300">Proverbs 3:9</h3>
                  <p className="mt-2 text-slate-300">
                    This verse teaches honoring the Lord with your wealth and
                    the firstfruits of what you receive.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
                  <h3 className="font-bold text-emerald-300">Genesis 14:20</h3>
                  <p className="mt-2 text-slate-300">
                    Abram gave a tenth, showing an early biblical example of
                    giving.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
                  <h3 className="font-bold text-emerald-300">
                    2 Corinthians 9:7
                  </h3>
                  <p className="mt-2 text-slate-300">
                    This verse reminds believers that giving should come from
                    the heart, not from pressure.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                Tithe vs Offering: What Is the Difference?
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                A tithe is commonly understood as a set portion, often 10%,
                given as an act of faith and obedience. An offering is usually
                extra giving beyond the tithe. Offerings may support missions,
                church projects, families in need, community outreach, or other
                causes.
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-700 bg-emerald-950/40 p-8 text-center">
              <h2 className="text-3xl font-bold">
                Grow Beyond the Calculation
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                TitheCalculatorAI helps you calculate your giving.
                FaithCompanionAI helps you grow spiritually with prayers, Bible
                tools, devotionals, and saved faith content.
              </p>

              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                
                  href="https://faithcompanionai.com"
                  className="rounded-2xl bg-white px-6 py-3 font-bold text-black hover:bg-slate-200"
                >
                  Visit FaithCompanionAI
                </a>

                
                  href="https://prayergeneratorai.com"
                  className="rounded-2xl border border-slate-600 px-6 py-3 font-bold text-white hover:border-emerald-400"
                >
                  Generate a Prayer
                </a>

                
                  href="https://bibleversegeneratorai.com"
                  className="rounded-2xl border border-slate-600 px-6 py-3 font-bold text-white hover:border-emerald-400"
                >
                  Find Bible Verses
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Structured Data - FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Structured Data - WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
    </>
  );
}