// src/app/tools/tithe/TitheGuide.tsx
// Explainer content shown below the tithe calculator: how-to steps, worked
// examples and an FAQ. The FAQ array feeds both the visible text and the
// FAQPage JSON-LD, so the two always match exactly.
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";

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

function usd(value: number, cents = true) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  });
}

const steps = [
  {
    title: "Decide gross or net",
    body: "Choose whether you give on your income before taxes (gross) or your take-home pay (net). Either is a sincere choice; just be consistent.",
  },
  {
    title: "Find your income for one pay period",
    body: "Look at your pay stub for the gross or net amount of a single paycheck. If you only know your annual salary, you can use that instead.",
  },
  {
    title: "Multiply by 10%",
    body: "Multiply that amount by 0.10. For example, a $2,000 paycheck gives a $200 tithe. If you give a different percentage, multiply by that instead.",
  },
  {
    title: "Set it aside each payday",
    body: "Give the amount when you are paid, so your tithe comes first rather than from whatever is left at the end of the month.",
  },
];

const faqs = [
  {
    q: "Should I tithe on gross or net income?",
    a: "The Bible does not say. Many Christians give on gross income as the firstfruits of everything they earn, while others give on net income, the pay they actually take home. Both are sincere choices. Pick the one you can give on faithfully and consistently.",
  },
  {
    q: "How much is a tithe per paycheck?",
    a: `A tithe is 10% of each paycheck. Multiply the paycheck amount by 0.10: a $2,000 paycheck means a $200 tithe. On a ${usd(fiftyK.salary, false)} salary paid every two weeks, that works out to ${usd(fiftyK.biweekly)} per paycheck, or ${usd(fiftyK.weekly)} if you are paid weekly.`,
  },
  {
    q: "Is a tithe always 10%?",
    a: "Yes. The word tithe means a tenth, so a tithe is 10% by definition. Some people choose to give less while they work toward a full tithe, and others give more than 10%. Any amount beyond the tithe is usually called an offering.",
  },
  {
    q: "What is the difference between a tithe and an offering?",
    a: "A tithe is a set portion, 10% of your income, usually given regularly to your local church. An offering is any gift above the tithe, given freely in whatever amount you choose, for example to a missions project or someone in need.",
  },
  {
    q: "How do I calculate a monthly tithe?",
    a: `Multiply your monthly income by 0.10. If you know your yearly salary instead, divide your yearly tithe by 12. For example, a ${usd(sixtyK.salary, false)} salary gives a ${usd(sixtyK.yearly, false)} yearly tithe, which is ${usd(sixtyK.monthly, false)} a month.`,
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const sectionClass = "mt-6 rounded-[28px] border border-white/10 bg-white/[0.06] p-6 md:p-8";
const h2Class = "text-xl font-bold text-white md:text-2xl";
const pClass = "text-sm leading-7 text-white/70 md:text-base";
const linkClass = "font-semibold text-orange-300 underline-offset-2 hover:underline";

export default function TitheGuide() {
  return (
    <>
      <JsonLd data={faqSchema} />

      {/* ── How to calculate ── */}
      <section className={sectionClass}>
        <h2 className={h2Class}>How to calculate your tithe from your salary</h2>
        <ol className="mt-4 space-y-4">
          {steps.map((step, i) => (
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
        <h2 className={h2Class}>Tithe examples by salary</h2>
        <p className={`mt-3 ${pClass}`}>
          A {TITHE_PERCENT}% tithe on common yearly salaries, rounded to the nearest cent. Bi-weekly
          assumes 26 paychecks a year and weekly assumes 52.
        </p>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[520px] text-left text-sm md:text-base">
            <thead className="bg-white/[0.06] text-white">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Yearly salary</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">Yearly tithe</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">Monthly</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">Bi-weekly</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">Weekly</th>
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
          Wondering why Christians give a tenth at all? Our{" "}
          <Link href="/tithing" className={linkClass}>
            guide to tithing in the Bible
          </Link>{" "}
          walks through the key passages.
        </p>
      </section>

      {/* ── FAQ ── */}
      <section className={sectionClass}>
        <h2 className={h2Class}>Tithe calculator FAQ</h2>
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
