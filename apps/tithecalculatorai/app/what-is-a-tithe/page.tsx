import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Is a Tithe? Biblical Definition & How to Calculate It",
  description:
    "A tithe is 10% of your income given to God as an act of worship. Learn the biblical definition of tithing, what the Bible says, and how to calculate your tithe instantly.",
  alternates: { canonical: "/what-is-a-tithe" },
  openGraph: {
    title: "What Is a Tithe? Biblical Definition & How to Calculate It",
    description:
      "Learn what a tithe is, what the Bible says about tithing, and how to calculate 10% of your income — with our free tithe calculator.",
    url: "https://tithecalculatorai.com/what-is-a-tithe",
    type: "article",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What Is a Tithe? Biblical Definition & How to Calculate It",
  description:
    "A tithe is 10% of your income given to God as an act of worship. Learn the biblical definition of tithing, what the Bible says, and how to calculate your tithe instantly.",
  url: "https://tithecalculatorai.com/what-is-a-tithe",
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
  mainEntityOfPage: "https://tithecalculatorai.com/what-is-a-tithe",
};

export default function WhatIsATithePage() {
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
          What Is a Tithe?
        </h1>

        <p className="mt-4 text-lg text-slate-400">
          Biblical definition, history, and how to calculate yours
        </p>

        <div className="mt-10 space-y-8 leading-8 text-slate-300">
          <p>
            A <strong className="text-white">tithe</strong> is the practice of giving one-tenth
            (10%) of your income to God. The word comes from an Old English root meaning
            "one tenth." Tithing is one of the oldest and most consistent financial
            principles found throughout the Bible, appearing from Genesis all the way through
            the New Testament.
          </p>

          <h2 className="text-2xl font-bold text-white">The Biblical Foundation of Tithing</h2>
          <p>
            The tithe first appears in Genesis 14:20, when Abraham gave a tenth of everything
            to Melchizedek, the priest of God Most High. Jacob later made a vow in Genesis 28:22
            to give a tenth of all God gave him. The practice was formally codified in the
            Mosaic Law (Leviticus 27:30), where the Israelites were commanded to bring a tenth
            of their crops and livestock to support the Levites, who had no inheritance of land.
          </p>
          <p>
            In Malachi 3:10, God says: <em>"Bring the whole tithe into the storehouse, that
            there may be food in my house. Test me in this and see if I will not throw open the
            floodgates of heaven and pour out so much blessing that there will not be room enough
            to store it."</em> This remains one of the most quoted tithing scriptures in the modern
            church.
          </p>

          <h2 className="text-2xl font-bold text-white">Tithing in the New Testament</h2>
          <p>
            Jesus acknowledged tithing in Matthew 23:23 and also elevated the spirit behind it —
            giving from the heart with justice, mercy, and faithfulness. In 2 Corinthians 9:7,
            Paul writes: <em>"Each of you should give what you have decided in your heart to give,
            not reluctantly or under compulsion, for God loves a cheerful giver."</em> The New
            Testament shifts the focus from strict law to generous, joyful stewardship.
          </p>

          <h2 className="text-2xl font-bold text-white">How to Calculate a Tithe</h2>
          <p>
            The math is simple: multiply your income by 0.10. If you earn $3,000 per month,
            your tithe is $300. If you earn $75,000 per year, your tithe is $7,500. The key
            questions are whether to tithe on gross (before tax) or net (after tax) income —
            both are considered valid by different Christian traditions.
          </p>

          <div className="rounded-2xl border border-emerald-700 bg-emerald-950/40 p-6 text-center">
            <p className="text-lg font-semibold text-emerald-300">
              Calculate your exact tithe amount instantly
            </p>
            <p className="mt-2 text-slate-300">
              Enter any income and pay period into our free AI tithe calculator.
            </p>
            <a
              href="/"
              className="mt-4 inline-block rounded-2xl bg-emerald-500 px-6 py-3 font-bold text-black hover:bg-emerald-400"
            >
              Use the Free Tithe Calculator →
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8">
          <h3 className="text-lg font-semibold text-white">Related Articles</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="/tithe-vs-offering" className="text-emerald-400 hover:underline">
                Tithe vs Offering: What Is the Difference?
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
