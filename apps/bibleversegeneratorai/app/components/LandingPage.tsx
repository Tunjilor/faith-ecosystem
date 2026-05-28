import Link from "next/link";
import VerseGenerator from "@/app/components/VerseGenerator";

export interface VerseEntry {
  reference: string;
  text: string;
  meaning: string;
}

export interface RelatedLink {
  href: string;
  label: string;
}

export interface LandingPageContent {
  h1: string;
  subtitle: string;
  intro: string;
  versesHeading: string;
  verses: VerseEntry[];
  related: RelatedLink[];
  topicSlug: string;
}

interface Props {
  content: LandingPageContent;
}

export default function LandingPage({ content }: Props) {
  const { h1, subtitle, intro, versesHeading, verses, related, topicSlug } = content;

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      {/* Breadcrumb */}
      <div className="border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-6 py-3 text-sm text-slate-500">
          <Link href="/" className="hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span className="text-slate-300">{h1}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-14 pb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{h1}</h1>
        <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      </section>

      {/* Intro */}
      <section className="max-w-3xl mx-auto px-6 pb-10">
        <p className="text-gray-400 text-base leading-relaxed text-center">{intro}</p>
      </section>

      {/* Verses */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">{versesHeading}</h2>
        <div className="grid gap-4">
          {verses.map((v, i) => (
            <div
              key={i}
              className="bg-[#0f172a] rounded-2xl p-6 border border-slate-700/50 hover:border-emerald-700/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-emerald-400 text-sm font-bold">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-emerald-400 font-bold text-base mb-2">{v.reference}</p>
                  <p className="text-white text-lg leading-relaxed italic mb-3">
                    &ldquo;{v.text}&rdquo;
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">{v.meaning}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Embedded Generator */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">Get a Personalized Verse for Your Situation</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Tell us exactly what you&rsquo;re going through and receive a Bible verse chosen just for
            you, with a personal reflection.
          </p>
        </div>
        <VerseGenerator defaultTopic={topicSlug} compact />
      </section>

      {/* Related Topics */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-6">Related Topics</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {related.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="bg-[#0f172a] hover:bg-[#1e2d47] border border-slate-700/50 hover:border-emerald-700/50 rounded-xl px-4 py-3 text-sm font-medium text-slate-200 hover:text-emerald-300 transition-all text-center"
            >
              {r.label}
            </Link>
          ))}
        </div>
      </section>

      {/* FaithCompanionAI CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-10">
        <div className="bg-gradient-to-br from-emerald-950/70 to-slate-900 rounded-2xl p-8 border border-emerald-700/40 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Want to Save This Verse and Get a Prayer to Go With It?
          </h2>
          <p className="text-gray-300 mb-6 max-w-lg mx-auto">
            FaithCompanionAI helps you grow deeper in faith with personalized prayers, devotionals,
            and saved verses — all in one place.
          </p>
          <a
            href="https://faithcompanionai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black px-8 py-3.5 rounded-xl font-bold text-base transition-all shadow-lg shadow-emerald-500/20 mb-3"
          >
            Continue on FaithCompanionAI →
          </a>
        </div>
      </section>

      {/* PrayerGeneratorAI CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-[#0f172a] rounded-2xl p-6 border border-slate-700/50 text-center">
          <p className="text-gray-300 mb-3 text-sm">
            Looking for a prayer to match your verse?
          </p>
          <a
            href="https://prayergeneratorai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-emerald-400 hover:text-emerald-300 font-semibold text-base hover:underline transition-colors"
          >
            Generate a Prayer on PrayerGeneratorAI.com →
          </a>
        </div>
      </section>

      {/* Footer nav */}
      <div className="border-t border-slate-800 py-6">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm text-slate-500">
          <Link href="/" className="hover:text-emerald-400 transition-colors">
            ← Back to Bible Verse Generator AI
          </Link>
        </div>
      </div>
    </main>
  );
}
