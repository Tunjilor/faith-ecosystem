// src/app/tools/tithe/TitheGuide.tsx
// Explainer content shown below the tithe calculator: how-to steps, worked
// examples and an FAQ. The FAQ array feeds both the visible text and the
// FAQPage JSON-LD, so the two always match exactly (in each language).
"use client";

import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { useDictionary, useLocale } from "@/context/LocaleContext";
import { localizedHref } from "@/lib/i18n/links";
import { tithe, type TitheText } from "@/lib/i18n/dictionaries/tithe";
import type { Translation } from "@/lib/i18n/dictionary";

const TITHE_PERCENT = 10;
const EXAMPLE_SALARIES = [30_000, 50_000, 75_000, 100_000];

// Work in whole cents so the yearly figure is exact, then round each
// per-period amount to the nearest cent once.
function titheBreakdown(salary: number) {
  const yearlyCents = Math.round(salary * 100 * (TITHE_PERCENT / 100));
  return {
    salary,
    yearly: yearlyCents / 100,
    monthly: Math.round(yearlyCents / 12) / 100,
    biweekly: Math.round(yearlyCents / 26) / 100,
    weekly: Math.round(yearlyCents / 52) / 100,
  };
}

const examples = EXAMPLE_SALARIES.map(titheBreakdown);
const fiftyK = titheBreakdown(50_000);
const sixtyK = titheBreakdown(60_000);

function currency(numberLocale: string) {
  return (value: number, cents = true) =>
    value.toLocaleString(numberLocale, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: cents ? 2 : 0,
      maximumFractionDigits: cents ? 2 : 0,
    });
}

function buildFaqs(t: TitheText | Translation<TitheText>, usd: ReturnType<typeof currency>) {
  const f = t.faq;
  return [
    { q: f.grossOrNet.q, a: f.grossOrNet.a },
    {
      q: f.perPaycheck.q,
      a: f.perPaycheck.a(usd(fiftyK.salary, false), usd(fiftyK.biweekly), usd(fiftyK.weekly)),
    },
    { q: f.alwaysTen.q, a: f.alwaysTen.a },
    { q: f.titheVsOffering.q, a: f.titheVsOffering.a },
    {
      q: f.monthly.q,
      a: f.monthly.a(usd(sixtyK.salary, false), usd(sixtyK.yearly, false), usd(sixtyK.monthly, false)),
    },
  ];
}

const sectionClass = "mt-6 rounded-[28px] border border-white/10 bg-white/[0.06] p-6 md:p-8";
const h2Class = "text-xl font-bold text-white md:text-2xl";
const pClass = "text-sm leading-7 text-white/70 md:text-base";
const linkClass = "font-semibold text-orange-300 underline-offset-2 hover:underline";

export default function TitheGuide() {
  const t = useDictionary(tithe);
  const locale = useLocale();
  const g = t.guide;
  const usd = currency(t.numberLocale);
  const faqs = buildFaqs(t, usd);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    // English output predates i18n and stays byte-identical; Spanish declares its language.
    ...(locale === "es" ? { inLanguage: "es" } : {}),
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />

      {/* ── How to calculate ── */}
      <section className={sectionClass}>
        <h2 className={h2Class}>{g.stepsHeading}</h2>
        <ol className="mt-4 space-y-4">
          {g.steps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-orange-500 text-sm font-bold text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-white">{step.title}</h3>
                <p className={`mt-1 ${pClass}`}>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Worked examples ── */}
      <section className={sectionClass}>
        <h2 className={h2Class}>{g.examplesHeading}</h2>
        <p className={`mt-3 ${pClass}`}>{g.examplesIntro(String(TITHE_PERCENT))}</p>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[520px] text-left text-sm md:text-base">
            <thead className="bg-white/[0.06] text-white">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">{g.columns.salary}</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">{g.columns.yearly}</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">{g.columns.monthly}</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">{g.columns.biweekly}</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">{g.columns.weekly}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-white/80">
              {examples.map((row) => (
                <tr key={row.salary}>
                  <th scope="row" className="px-4 py-3 font-semibold text-white">
                    {usd(row.salary, false)}
                  </th>
                  <td className="px-4 py-3 text-right tabular-nums">{usd(row.yearly)}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{usd(row.monthly)}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{usd(row.biweekly)}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{usd(row.weekly)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={`mt-4 ${pClass}`}>
          {g.guideLinkBefore}{" "}
          <Link href={localizedHref("/tithing", locale)} className={linkClass}>
            {g.guideLinkText}
          </Link>{" "}
          {g.guideLinkAfter}
        </p>
      </section>

      {/* ── FAQ ── */}
      <section className={sectionClass}>
        <h2 className={h2Class}>{g.faqHeading}</h2>
        <div className="mt-4 space-y-5">
          {faqs.map((item) => (
            <div key={item.q}>
              <h3 className="font-semibold text-white">{item.q}</h3>
              <p className={`mt-1 ${pClass}`}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
