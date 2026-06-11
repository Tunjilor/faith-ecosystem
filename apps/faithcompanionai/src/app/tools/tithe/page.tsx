// src/app/tools/tithe/page.tsx
"use client";

import Link from "next/link";
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

export default function TithePage() {
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
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white md:text-4xl">Tithe Calculator</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
          Enter your income, choose your pay period, and adjust the percentage to see your
          tithe broken down per period and across the year — on gross or net, whichever you give on.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        {/* ── Inputs ── */}
        <div className="rounded-[28px] border border-white/10 bg-white p-6 shadow-2xl md:p-8">
          <label htmlFor="income" className="block text-sm font-medium text-slate-700">
            Income per pay period
          </label>
          <input
            id="income"
            type="number"
            inputMode="decimal"
            min="0"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="Enter your income"
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 text-base text-slate-900 placeholder:text-slate-500 outline-none focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-black/10"
          />

          <label className="mt-6 block text-sm font-medium text-slate-700">Pay period</label>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {Object.entries(frequencyLabels).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setFrequency(key as Frequency)}
                className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  frequency === key
                    ? "bg-gradient-to-r from-purple-600 to-orange-500 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <label htmlFor="percentage" className="mt-6 block text-sm font-medium text-slate-700">
            Tithe percentage: <span className="font-bold text-slate-900">{percentage}%</span>
          </label>
          <input
            id="percentage"
            type="range"
            min="1"
            max="20"
            value={percentage}
            onChange={(e) => setPercentage(Number(e.target.value))}
            className="mt-2 w-full accent-purple-600"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {[5, 10, 12, 15].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setPercentage(value)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                  percentage === value
                    ? "border-purple-400 bg-purple-50 text-purple-700"
                    : "border-slate-300 text-slate-600 hover:border-slate-400"
                }`}
              >
                {value}%
              </button>
            ))}
          </div>

          <label htmlFor="offering" className="mt-6 block text-sm font-medium text-slate-700">
            Optional offering per pay period
          </label>
          <input
            id="offering"
            type="number"
            inputMode="decimal"
            min="0"
            value={offering}
            onChange={(e) => setOffering(e.target.value)}
            placeholder="Example: 25"
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 text-base text-slate-900 placeholder:text-slate-500 outline-none focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-black/10"
          />
        </div>

        {/* ── Results ── */}
        <div
          className="rounded-[28px] p-6 shadow-2xl md:p-8"
          style={{
            background:
              "linear-gradient(135deg, rgba(109,40,217,0.18) 0%, rgba(234,88,12,0.12) 100%)",
            border: "1px solid rgba(139,92,246,0.25)",
          }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-300">
            Your estimated tithe
          </p>
          <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">
            {money(results.tithePerPeriod)}
          </h2>
          <p className="mt-2 text-sm text-white/70">
            {percentage}% of your {frequencyLabels[frequency].toLowerCase()} income.
          </p>

          <div className="mt-6 grid gap-3">
            <div className="rounded-2xl bg-black/20 p-4">
              <p className="text-xs text-white/60">Total with offering</p>
              <p className="mt-1 text-2xl font-bold text-white">{money(results.totalPerPeriod)}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-black/20 p-4">
                <p className="text-xs text-white/60">Weekly average</p>
                <p className="mt-1 text-xl font-bold text-white">{money(results.weeklyAverage)}</p>
              </div>
              <div className="rounded-2xl bg-black/20 p-4">
                <p className="text-xs text-white/60">Monthly average</p>
                <p className="mt-1 text-xl font-bold text-white">{money(results.monthlyAverage)}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-black/20 p-4">
              <p className="text-xs text-white/60">Yearly giving projection</p>
              <p className="mt-1 text-2xl font-bold text-white">{money(results.annualTotal)}</p>
              <p className="mt-1 text-xs text-white/60">
                Tithe: {money(results.annualTithe)} · Offering: {money(results.annualOffering)}
              </p>
            </div>
          </div>

          <Link
            href="/tithing"
            className="mt-6 block rounded-2xl bg-white px-6 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            What does the Bible say about tithing? →
          </Link>
        </div>
      </div>

      {/* ── Short explainer (full guide lives at /tithing) ── */}
      <section className="mt-10 rounded-[28px] border border-white/10 bg-white/[0.06] p-6 md:p-8">
        <h2 className="text-xl font-bold text-white md:text-2xl">Gross or net — which do I use?</h2>
        <p className="mt-3 text-sm leading-7 text-white/70 md:text-base">
          The Bible doesn&apos;t specify gross versus net, and sincere believers land in both places.
          Some give on gross (pre-tax) income as the &ldquo;firstfruits&rdquo; of everything they earn;
          others give on net (take-home) pay, the portion they actually receive. This calculator works
          for either — just enter the income figure you&apos;ve decided to give on. For the full
          breakdown, including tithe vs. offering and what Scripture says, see the{" "}
          <Link href="/tithing" className="font-semibold text-orange-300 underline-offset-2 hover:underline">
            complete tithing guide
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
