"use client";

import { useState } from "react";
import Link from "next/link";
import VerseGenerator from "@/app/components/VerseGenerator";
import BackToTop from "@/app/components/BackToTop";

const categories = [
  { label: "Peace", topic: "peace and calm" },
  { label: "Strength", topic: "needing strength" },
  { label: "Faith", topic: "growing in faith" },
  { label: "Hope", topic: "finding hope" },
  { label: "Healing", topic: "healing and recovery" },
  { label: "Guidance", topic: "seeking guidance and direction" },
  { label: "Fear", topic: "dealing with fear" },
  { label: "Love", topic: "love and relationships" },
  { label: "Forgiveness", topic: "forgiveness" },
  { label: "Anxiety", topic: "anxiety and worry" },
];

const allTopics = [
  { href: "/bible-verses-for-anxiety", label: "Anxiety" },
  { href: "/bible-verses-for-fear", label: "Fear" },
  { href: "/bible-verses-for-forgiveness", label: "Forgiveness" },
  { href: "/bible-verses-for-guidance", label: "Guidance" },
  { href: "/bible-verses-for-healing", label: "Healing" },
  { href: "/bible-verses-for-hope", label: "Hope" },
  { href: "/bible-verses-for-love", label: "Love" },
  { href: "/bible-verses-for-strength", label: "Strength" },
  { href: "/bible-verses-for-depression", label: "Depression" },
  { href: "/bible-verses-for-grief", label: "Grief" },
  { href: "/bible-verses-for-marriage", label: "Marriage" },
  { href: "/bible-verses-for-finances", label: "Finances" },
  { href: "/bible-verses-for-loneliness", label: "Loneliness" },
  { href: "/bible-verses-for-addiction", label: "Addiction" },
  { href: "/bible-verses-for-anger", label: "Anger" },
  { href: "/bible-verses-for-gratitude", label: "Gratitude" },
  { href: "/bible-verses-for-protection", label: "Protection" },
  { href: "/bible-verses-for-sleep", label: "Sleep" },
  { href: "/bible-verses-for-students", label: "Students" },
  { href: "/bible-verses-for-mothers", label: "Mothers" },
];

export default function Home() {
  const [activeTopic, setActiveTopic] = useState("");

  return (
    <>
      <div className="min-h-screen bg-[#020617] text-white" id="top">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 pt-16 pb-8 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-900/40 border border-emerald-700/40 text-emerald-400 text-sm font-semibold mb-6">
            Free · No login required · Instant
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 leading-tight">
            Find a Bible Verse for{" "}
            <span className="text-emerald-400">Your Situation</span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Enter what you&rsquo;re going through and receive a meaningful Bible verse with
            reflection and encouragement — personalized just for you.
          </p>
        </section>

        {/* Social Proof Stats Bar */}
        <section className="max-w-3xl mx-auto px-6 pb-8">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-0 sm:divide-x sm:divide-slate-700">
            <div className="flex-1 text-center px-6">
              <p className="text-2xl font-bold text-white">1,000,000+</p>
              <p className="text-sm text-slate-400 mt-1">Verses Generated</p>
            </div>
            <div className="flex-1 text-center px-6">
              <p className="text-2xl font-bold text-white">Trusted by Christians</p>
              <p className="text-sm text-slate-400 mt-1">Worldwide</p>
            </div>
            <div className="flex-1 text-center px-6">
              <p className="text-2xl font-bold text-white">100% Free</p>
              <p className="text-sm text-slate-400 mt-1">to Use</p>
            </div>
          </div>
        </section>

        {/* Category Buttons */}
        <section className="max-w-3xl mx-auto px-6 pb-8">
          <p className="text-center text-sm text-slate-400 mb-4 font-medium">Quick select a topic:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c.label}
                onClick={() => setActiveTopic(c.topic)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  activeTopic === c.topic
                    ? "bg-emerald-600 border-emerald-500 text-white"
                    : "bg-slate-800/60 border-slate-700 text-slate-300 hover:border-emerald-700/60 hover:text-emerald-300"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </section>

        {/* Generator */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <VerseGenerator key={activeTopic} defaultTopic={activeTopic} />
        </section>

        {/* How it works */}
        <section className="border-t border-slate-800 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Describe Your Situation",
                  desc: "Type what you're going through or choose a category above.",
                },
                {
                  step: "2",
                  title: "Get Your Verse",
                  desc: "Receive a relevant Bible verse with a personal reflection written just for you.",
                },
                {
                  step: "3",
                  title: "Share & Save",
                  desc: "Share on WhatsApp or Facebook, email it to yourself, or continue on FaithCompanionAI.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-[#0f172a] rounded-2xl p-6 border border-slate-700/50 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-emerald-400 font-bold text-lg mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-base mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Browse All Topics */}
        <section className="border-t border-slate-800 py-16" id="topics">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-3">Browse All Topics</h2>
            <p className="text-slate-400 text-center mb-10">
              Find Bible verses for any situation in your life.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {allTopics.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="bg-[#0f172a] hover:bg-[#162032] border border-slate-700/50 hover:border-emerald-700/50 rounded-xl px-3 py-3 text-sm font-medium text-slate-200 hover:text-emerald-300 transition-all text-center"
                >
                  {t.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FaithCompanionAI Banner */}
        <section className="border-t border-slate-800 py-16">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <div className="bg-gradient-to-br from-emerald-950/70 to-slate-900 rounded-3xl p-10 border border-emerald-700/40">
              <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-3">
                Take Your Faith Deeper
              </p>
              <h2 className="text-3xl font-bold mb-4">
                Want to Save Verses & Get Prayers?
              </h2>
              <p className="text-gray-300 mb-8 max-w-md mx-auto leading-relaxed">
                FaithCompanionAI lets you save favorite verses, access daily devotionals, and receive
                personalized prayers — all in one place.
              </p>
              <a
                href="https://faithcompanionai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-emerald-500/20 mb-4"
              >
                Try FaithCompanionAI Free →
              </a>
              <p className="text-slate-500 text-sm">
                Also try:{" "}
                <a
                  href="https://prayergeneratorai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  PrayerGeneratorAI.com
                </a>
                {" · "}
                <a
                  href="https://tithecalculatorai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  TitheCalculatorAI.com
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Testimonial-style social proof */}
        <section className="border-t border-slate-800 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-center mb-10">
              Scripture for Every Season of Life
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  quote:
                    "When I typed 'I feel lost and don't know what to do,' I got exactly the verse I needed.",
                  topic: "Guidance",
                },
                {
                  quote:
                    "I shared a verse about healing with my mom who is going through treatment. She cried happy tears.",
                  topic: "Healing",
                },
                {
                  quote:
                    "Perfect for my morning devotional when I need a quick but meaningful verse to start the day.",
                  topic: "Faith",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-[#0f172a] rounded-2xl p-5 border border-slate-700/50"
                >
                  <p className="text-slate-300 text-sm leading-relaxed italic mb-3">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <span className="inline-block text-xs font-semibold text-emerald-400 bg-emerald-900/30 rounded-full px-3 py-1">
                    {item.topic}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <BackToTop />
    </>
  );
}
