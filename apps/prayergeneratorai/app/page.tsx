"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const topics = [
  "Anxiety",
  "Healing",
  "Family",
  "Guidance",
  "Strength",
  "Protection",
  "Gratitude",
  "Before Sleep",
];

const prayerPages = [
  { label: "Prayer for Anxiety", href: "/prayer-for-anxiety" },
  { label: "Prayer for Healing", href: "/prayer-for-healing" },
  { label: "Prayer for Family", href: "/prayer-for-family" },
  { label: "Prayer for Strength", href: "/prayer-for-strength" },
  { label: "Prayer for Protection", href: "/prayer-for-protection" },
  { label: "Prayer for Guidance", href: "/prayer-for-guidance" },
  { label: "Morning Prayer", href: "/morning-prayer" },
  { label: "Prayer Before Sleep", href: "/prayer-before-sleep" },
  { label: "Prayer for Peace", href: "/prayer-for-peace" },
  { label: "Prayer for Gratitude", href: "/prayer-for-gratitude" },
];

const allPrayerCategories = [
  {
    heading: "Relationships & Family",
    links: [
      { label: "Prayer for Family", href: "/prayer-for-family" },
      { label: "Prayer for Marriage", href: "/prayer-for-marriage" },
      { label: "Prayer for Husband", href: "/prayer-for-husband" },
      { label: "Prayer for Wife", href: "/prayer-for-wife" },
      { label: "Prayer for Son", href: "/prayer-for-son" },
      { label: "Prayer for Daughter", href: "/prayer-for-daughter" },
      { label: "Prayer for Children", href: "/prayer-for-children" },
      { label: "Prayer for Parents", href: "/prayer-for-parents" },
      { label: "Prayer for Baby", href: "/prayer-for-baby" },
      { label: "Prayer for a Friend", href: "/prayer-for-friend" },
      { label: "Prayer for Relationship", href: "/prayer-for-relationship" },
      { label: "Prayer for Enemies", href: "/prayer-for-enemies" },
    ],
  },
  {
    heading: "Health & Healing",
    links: [
      { label: "Prayer for Healing", href: "/prayer-for-healing" },
      { label: "Prayer for Anxiety", href: "/prayer-for-anxiety" },
      { label: "Prayer for Anxiety and Fear", href: "/prayer-for-anxiety-and-fear" },
      { label: "Prayer for Depression", href: "/prayer-for-depression" },
      { label: "Prayer for Mental Health", href: "/prayer-for-mental-health" },
      { label: "Prayer for Cancer", href: "/prayer-for-cancer" },
      { label: "Prayer for Chronic Illness", href: "/prayer-for-chronic-illness" },
      { label: "Prayer for Surgery", href: "/prayer-for-surgery" },
      { label: "Prayer for Pregnancy", href: "/prayer-for-pregnancy" },
      { label: "Prayer for Addiction Recovery", href: "/prayer-for-addiction-recovery" },
      { label: "Prayer for Someone Dying", href: "/prayer-for-someone-dying" },
    ],
  },
  {
    heading: "Work & Finances",
    links: [
      { label: "Prayer for a Job", href: "/prayer-for-job" },
      { label: "Prayer for a New Job", href: "/prayer-for-new-job" },
      { label: "Prayer for Business", href: "/prayer-for-business" },
      { label: "Prayer for Finances", href: "/prayer-for-finances" },
      { label: "Prayer for Success", href: "/prayer-for-success" },
      { label: "Prayer for Students and Exams", href: "/prayer-for-students-and-exams" },
    ],
  },
  {
    heading: "Faith & Spiritual Growth",
    links: [
      { label: "Prayer for Faith", href: "/prayer-for-faith" },
      { label: "Prayer for Wisdom", href: "/prayer-for-wisdom" },
      { label: "Prayer for Guidance", href: "/prayer-for-guidance" },
      { label: "Prayer for Forgiveness", href: "/prayer-for-forgiveness" },
      { label: "Prayer for Repentance", href: "/prayer-for-repentance" },
      { label: "Prayer for Salvation", href: "/prayer-for-salvation" },
      { label: "Prayer for the Holy Spirit", href: "/prayer-for-holy-spirit" },
      { label: "Prayer for Revival", href: "/prayer-for-revival" },
      { label: "Prayer for Church", href: "/prayer-for-church" },
      { label: "Prayer for Pastor", href: "/prayer-for-pastor" },
      { label: "Prayer for Courage", href: "/prayer-for-courage" },
      { label: "Prayer for Patience", href: "/prayer-for-patience" },
      { label: "Prayer for Hope", href: "/prayer-for-hope" },
    ],
  },
  {
    heading: "Life Situations",
    links: [
      { label: "Prayer for Strength", href: "/prayer-for-strength" },
      { label: "Prayer for Peace", href: "/prayer-for-peace" },
      { label: "Prayer for Protection", href: "/prayer-for-protection" },
      { label: "Prayer for Gratitude", href: "/prayer-for-gratitude" },
      { label: "Prayer for Grief and Loss", href: "/prayer-for-grief-and-loss" },
      { label: "Prayer for Loneliness", href: "/prayer-for-loneliness" },
      { label: "Prayer for Moving On", href: "/prayer-for-moving-on" },
      { label: "Prayer for New Beginnings", href: "/prayer-for-new-beginnings" },
      { label: "Prayer for Travel and Safety", href: "/prayer-for-travel-and-safety" },
    ],
  },
  {
    heading: "Daily & Seasonal",
    links: [
      { label: "Morning Prayer", href: "/morning-prayer" },
      { label: "Evening Prayer", href: "/evening-prayer" },
      { label: "Prayer Before Sleep", href: "/prayer-before-sleep" },
      { label: "Prayer Before Meals", href: "/prayer-before-meals" },
      { label: "Sunday Prayer", href: "/sunday-prayer" },
      { label: "Prayer for Monday", href: "/prayer-for-monday" },
      { label: "Christmas Prayer", href: "/christmas-prayer" },
      { label: "Easter Prayer", href: "/easter-prayer" },
      { label: "New Year Prayer", href: "/new-year-prayer" },
    ],
  },
];

type EmailStatus = "idle" | "sending" | "sent" | "error";

export default function Home() {
  const [input, setInput] = useState("");
  const [prayer, setPrayer] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [emailStatus, setEmailStatus] = useState<EmailStatus>("idle");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShowBackToTop(window.scrollY > 400);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function generatePrayer() {
    if (!input.trim()) return;

    setLoading(true);
    setPrayer("");
    setCopied(false);
    setSaving(false);
    setError("");
    setEmailAddress("");
    setEmailStatus("idle");

    try {
      const response = await fetch("/api/prayer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: input.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.error || "Unable to generate prayer.");
        return;
      }

      setPrayer(data.prayer);
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copyPrayer() {
    if (!prayer) return;

    await navigator.clipboard.writeText(prayer);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  async function sendEmail() {
    if (!emailAddress.trim() || !prayer) return;

    setEmailStatus("sending");

    try {
      const res = await fetch("/api/email-prayer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailAddress.trim(),
          prayer,
          topic: input.trim(),
        }),
      });

      const data = await res.json();

      if (data.fallback) {
        // No API key configured — open mailto as fallback
        const subject = encodeURIComponent(`Your prayer for ${input.trim()}`);
        const body = encodeURIComponent(
          `${prayer}\n\n---\nWant a verse and devotional to go with this prayer?\nVisit FaithCompanionAI: https://faithcompanionai.com/?from=prayergeneratorai-email`
        );
        window.location.href = `mailto:${emailAddress.trim()}?subject=${subject}&body=${body}`;
        setEmailStatus("sent");
        return;
      }

      if (res.ok) {
        setEmailStatus("sent");
      } else {
        setEmailStatus("error");
      }
    } catch {
      setEmailStatus("error");
    }
  }

  function shareWhatsApp() {
    const text = encodeURIComponent(
      `${prayer}\n\n— Generated at PrayerGeneratorAI.com`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  }

  function shareFacebook() {
    const url = encodeURIComponent("https://prayergeneratorai.com");
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank",
      "width=600,height=400"
    );
  }

  async function saveOnFaithCompanion() {
    if (!prayer) return;

    setSaving(true);

    try {
      await navigator.clipboard.writeText(prayer);
    } catch {
      // Continue even if clipboard fails.
    }

    const encodedPrayer = encodeURIComponent(prayer);
    const encodedTopic = encodeURIComponent(input.trim());

    window.location.href = `https://faithcompanionai.com/tools/prayer?from=prayergeneratorai&topic=${encodedTopic}&prayer=${encodedPrayer}`;
  }

  function resetForm() {
    setInput("");
    setPrayer("");
    setCopied(false);
    setSaving(false);
    setError("");
    setEmailAddress("");
    setEmailStatus("idle");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
        <p className="mb-4 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
          Free Christian AI Prayer Generator
        </p>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Generate a Personalized Prayer in Seconds
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          Write what you need prayer for, and receive a thoughtful Christian
          prayer you can read, reflect on, copy, save, and share.
        </p>

        <p className="mt-3 text-sm text-slate-400">
          Created for believers seeking peace, strength, comfort, and guidance.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => {
                setInput(`Prayer for ${topic.toLowerCase()}`);
                setPrayer("");
                setCopied(false);
                setSaving(false);
                setError("");
                setEmailAddress("");
                setEmailStatus("idle");
              }}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
            >
              {topic}
            </button>
          ))}
        </div>

        <div className="mt-8 w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl">
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError("");
            }}
            maxLength={500}
            placeholder="Example: I need prayer for peace, healing, my family, or guidance..."
            className="min-h-36 w-full resize-none rounded-2xl border border-white/10 bg-slate-900 p-4 text-white outline-none placeholder:text-slate-500"
          />

          <div className="mt-2 text-right text-xs text-slate-500">
            {input.length}/500
          </div>

          <button
            onClick={generatePrayer}
            disabled={loading || !input.trim()}
            className="mt-4 w-full rounded-2xl bg-emerald-500 px-6 py-4 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Generating Prayer..." : "Generate My Prayer"}
          </button>

          {error && (
            <p className="mt-4 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-200">
              {error}
            </p>
          )}
        </div>

        {prayer && (
          <div className="mt-8 w-full max-w-2xl rounded-3xl border border-emerald-400/20 bg-slate-950/90 p-6 text-left shadow-2xl">
            <h2 className="text-2xl font-bold">Your Prayer</h2>

            <p className="mt-4 whitespace-pre-line leading-8 text-slate-200">
              {prayer}
            </p>

            {/* Share buttons */}
            <div className="mt-6 flex flex-wrap gap-2">
              <button
                onClick={shareWhatsApp}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10"
              >
                <span>📱</span> WhatsApp
              </button>
              <button
                onClick={shareFacebook}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10"
              >
                <span>📘</span> Facebook
              </button>
              <button
                onClick={copyPrayer}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10"
              >
                <span>{copied ? "✓" : "📋"}</span>
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* Email capture */}
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="mb-3 text-sm font-medium text-slate-300">
                ✉️ Email me this prayer
              </p>
              {emailStatus === "sent" ? (
                <p className="text-sm text-emerald-400">
                  ✓ Prayer sent to your inbox!
                </p>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={emailAddress}
                    onChange={(e) => {
                      setEmailAddress(e.target.value);
                      setEmailStatus("idle");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && sendEmail()}
                    placeholder="your@email.com"
                    className="flex-1 rounded-xl border border-white/10 bg-slate-900 px-4 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-500/50"
                  />
                  <button
                    onClick={sendEmail}
                    disabled={emailStatus === "sending" || !emailAddress.trim()}
                    className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {emailStatus === "sending" ? "Sending…" : "Send"}
                  </button>
                </div>
              )}
              {emailStatus === "error" && (
                <p className="mt-2 text-xs text-red-400">
                  Could not send. Please try again.
                </p>
              )}
            </div>

            {/* Warmer FaithCompanionAI CTA */}
            <div className="mt-6 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6 text-center">
              <p className="text-lg font-semibold text-white">
                Want a verse and devotional to go with this prayer?
              </p>

              <button
                onClick={saveOnFaithCompanion}
                disabled={saving}
                className="mt-4 w-full rounded-2xl bg-emerald-500 px-6 py-4 text-center font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Opening FaithCompanionAI..."
                  : "→ Continue your faith journey on FaithCompanionAI"}
              </button>

              <p className="mt-3 text-xs text-slate-400">
                Free to start · Save prayers · Bible tools · Daily devotionals
              </p>
            </div>

            <button
              onClick={resetForm}
              className="mt-3 w-full rounded-2xl border border-white/10 px-6 py-4 text-center font-semibold text-slate-200 transition hover:bg-white/10"
            >
              Generate Another Prayer
            </button>
          </div>
        )}

        <div className="mt-16 flex w-full max-w-3xl flex-wrap justify-center gap-8 border-y border-white/10 py-10">
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold text-white">50,000+</span>
            <span className="text-sm text-slate-400">Prayers Generated</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold text-white">Trusted</span>
            <span className="text-sm text-slate-400">by Christians Worldwide</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold text-white">100% Free</span>
            <span className="text-sm text-slate-400">to Use</span>
          </div>
        </div>

        <section className="mt-16 max-w-3xl text-left text-slate-300">
          <h2 className="text-2xl font-bold text-white">
            How to Use This AI Prayer Generator
          </h2>

          <p className="mt-4 leading-7">
            Type a short description of what you need prayer for, such as
            anxiety, healing, family, guidance, strength, protection, or
            gratitude. The generator will create a simple Christian prayer you
            can use for personal reflection.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-white">
            Popular Prayer Topics
          </h2>

          <p className="mt-4 leading-7">
            Browse prayer topics below or generate a custom prayer for your
            personal situation.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {prayerPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white transition hover:bg-white/10"
              >
                {page.label}
              </Link>
            ))}
          </div>

          <div className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-800/60 to-slate-900/60 px-8 py-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
              Ready to go deeper?
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white">
              Save Your Prayers. Build Your Faith.
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              FaithCompanionAI lets you save prayers, track your faith journey,
              and access devotionals and Bible tools anytime.
            </p>
            <a
              href="https://faithcompanionai.com"
              className="mt-6 inline-block rounded-2xl bg-white px-6 py-4 font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Start Free on FaithCompanionAI
            </a>
          </div>

          <h2 className="mt-16 text-2xl font-bold text-white">
            Browse All 60 Prayer Topics
          </h2>

          <p className="mt-4 leading-7">
            Explore every prayer topic available — organized by category so you
            can find exactly what you need.
          </p>

          <div className="mt-8 space-y-10">
            {allPrayerCategories.map((category) => (
              <div key={category.heading}>
                <h3 className="mb-4 text-lg font-semibold text-emerald-400">
                  {category.heading}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {category.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/10"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-16 text-2xl font-bold text-white">
            Continue Your Faith Journey
          </h2>

          <p className="mt-4 leading-7">
            Prayer Generator AI helps you create a prayer quickly. FaithCompanionAI
            helps you save prayers, explore devotionals, use Bible tools, and
            return to your saved faith content anytime.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="https://faithcompanionai.com/?from=prayergeneratorai"
              className="inline-block rounded-2xl bg-white px-6 py-4 font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Visit FaithCompanionAI
            </a>
            <a
              href="https://tithecalculatorai.com"
              className="inline-block rounded-2xl bg-white px-6 py-4 font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Calculate Your Tithe
            </a>
            <a
              href="https://bibleversegeneratorai.com"
              className="inline-block rounded-2xl bg-white px-6 py-4 font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Find Bible Verses
            </a>
          </div>
        </section>
      </section>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 flex flex-col items-center justify-center gap-0.5 rounded-2xl border border-white/10 bg-slate-800 px-3 py-2 text-slate-300 shadow-lg transition-opacity duration-300 hover:bg-slate-700 hover:text-white ${
          showBackToTop ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
        <span className="text-[10px] font-medium leading-none">Top</span>
      </button>
    </main>
  );
}
