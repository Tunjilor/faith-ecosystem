// src/app/tools/tithe/page.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import TitheGuide from "./TitheGuide";
import { useDictionary, useLocale } from "@/context/LocaleContext";
import { localizedHref } from "@/lib/i18n/links";
import { tithe, type Frequency } from "@/lib/i18n/dictionaries/tithe";

const FREQUENCIES: Frequency[] = ["weekly", "biweekly", "monthly", "quarterly", "yearly"];

const yearlyMultiplier: Record<Frequency, number> = {
  weekly: 52,
  biweekly: 26,
  monthly: 12,
  quarterly: 4,
  yearly: 1,
};

function money(value: number, numberLocale: string) {
  return value.toLocaleString(numberLocale, {
    style: "currency",
    currency: "USD",
  });
}

export default function TithePage() {
  const t = useDictionary(tithe);
  const locale = useLocale();
  const fmt = (value: number) => money(value, t.numberLocale);
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
        <h1 className="text-3xl font-bold text-white md:text-4xl">{t.heading}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
          {t.intro}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        {/* ── Inputs ── */}
        <div className="rounded-[28px] border border-white/10 bg-white p-6 shadow-2xl md:p-8">
          <label htmlFor="income" className="block text-sm font-medium text-slate-700">
            {t.incomeLabel}
          </label>
          <input
            id="income"
            type="number"
            inputMode="decimal"
            min="0"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder={t.incomePlaceholder}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 text-base text-slate-900 placeholder:text-slate-500 outline-none focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-black/10"
          />

          <label className="mt-6 block text-sm font-medium text-slate-700">{t.payPeriodLabel}</label>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {FREQUENCIES.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setFrequency(key)}
                className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  frequency === key
                    ? "bg-gradient-to-r from-purple-600 to-orange-500 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {t.frequency[key]}
              </button>
            ))}
          </div>

          <label htmlFor="percentage" className="mt-6 block text-sm font-medium text-slate-700">
            {t.percentageLabel} <span className="font-bold text-slate-900">{percentage}%</span>
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
            {t.offeringLabel}
          </label>
          <input
            id="offering"
            type="number"
            inputMode="decimal"
            min="0"
            value={offering}
            onChange={(e) => setOffering(e.target.value)}
            placeholder={t.offeringPlaceholder}
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
            {t.resultEyebrow}
          </p>
          <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">
            {fmt(results.tithePerPeriod)}
          </h2>
          <p className="mt-2 text-sm text-white/70">
            {t.resultLine(String(percentage), frequency)}
          </p>

          <div className="mt-6 grid gap-3">
            <div className="rounded-2xl bg-black/20 p-4">
              <p className="text-xs text-white/60">{t.totalWithOffering}</p>
              <p className="mt-1 text-2xl font-bold text-white">{fmt(results.totalPerPeriod)}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-black/20 p-4">
                <p className="text-xs text-white/60">{t.weeklyAverage}</p>
                <p className="mt-1 text-xl font-bold text-white">{fmt(results.weeklyAverage)}</p>
              </div>
              <div className="rounded-2xl bg-black/20 p-4">
                <p className="text-xs text-white/60">{t.monthlyAverage}</p>
                <p className="mt-1 text-xl font-bold text-white">{fmt(results.monthlyAverage)}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-black/20 p-4">
              <p className="text-xs text-white/60">{t.yearlyProjection}</p>
              <p className="mt-1 text-2xl font-bold text-white">{fmt(results.annualTotal)}</p>
              <p className="mt-1 text-xs text-white/60">
                {t.yearlySplit(fmt(results.annualTithe), fmt(results.annualOffering))}
              </p>
            </div>
          </div>

          <Link
            href={localizedHref("/tithing", locale)}
            className="mt-6 block rounded-2xl bg-white px-6 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            {t.bibleLink}
          </Link>
        </div>
      </div>

      {/* ── Short explainer (full guide lives at /tithing) ── */}
      <section className="mt-10 rounded-[28px] border border-white/10 bg-white/[0.06] p-6 md:p-8">
        <h2 className="text-xl font-bold text-white md:text-2xl">{t.explainer.heading}</h2>
        <p className="mt-3 text-sm leading-7 text-white/70 md:text-base">
          {t.explainer.beforeLink}{" "}
          <Link href={localizedHref("/tithing", locale)} className="font-semibold text-orange-300 underline-offset-2 hover:underline">
            {t.explainer.linkText}
          </Link>
          {t.explainer.afterLink}
        </p>
      </section>

      <TitheGuide />
    </main>
  );
}
