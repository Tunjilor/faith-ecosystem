// src/app/tools/prayer/page.tsx

"use client";
import { useUser } from "@/context/UserContext";

import { useEffect, useState } from "react";
import DenominationSelect, { getDenominationNote, readDenomination } from "@/components/DenominationSelect";
import GuestEmailCaptureClient from "@/components/GuestEmailCaptureClient";
import Link from "next/link";

type Tone = "gentle" | "firm" | "short" | "detailed";

type MeResponse = {
  signedIn?: boolean;
};

type AskResponse = {
  answer?: string;
  error?: string;
  code?: string | null;
};

export default function PrayerPage() {
  const [topic, setTopic] = useState("");
  const [name, setName] = useState("");
  const [situation, setSituation] = useState("");
  const [tone, setTone] = useState<Tone>("gentle");
  const [denomination, setDenomination] = useState("non-denominational");

  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [me, setMe] = useState<MeResponse | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadMe() {
      try {
        const res = await fetch("/api/me", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) setMe(data);
      } catch {
        if (!cancelled) setMe(null);
      }
    }

    loadMe();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setDenomination(readDenomination());
    const onChanged = () => setDenomination(readDenomination());
    window.addEventListener("denomination-changed", onChanged);
    return () => window.removeEventListener("denomination-changed", onChanged);
  }, []);

  async function handleGenerate() {
    setError("");
    setSuccess("");

    const denomNote = getDenominationNote(denomination);
    const prompt =
      topic.trim().length > 0
        ? `Write a sincere Christian prayer about ${topic.trim()}. ${situation.trim() ? `The situation is: ${situation.trim()}.` : ""} Include 1-3 Bible references and make it suitable for daily encouragement.${denomNote}`
        : `Write a sincere Christian prayer for today. ${situation.trim() ? `The situation is: ${situation.trim()}.` : ""} Include 1-3 Bible references and make it suitable for daily encouragement.${denomNote}`;

    setIsLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          mode: "prayer",
          tone,
          name: name.trim(),
          situation: situation.trim(),
        }),
      });

      const text = await res.text();

      let data: AskResponse = {};
      try {
        data = JSON.parse(text);
      } catch {
        data = { error: text || "Unexpected response." };
      }

      if (!res.ok) {
        if (res.status === 429) {
          setError(data.error || "Daily limit reached. Please try again tomorrow.");
          return;
        }

        throw new Error(data.error || `Request failed (${res.status})`);
      }

      if (!data.answer) {
        throw new Error("No prayer returned.");
      }

      setResult(data.answer);
    } catch (err: any) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSave() {
    setError("");
    setSuccess("");

    if (!result.trim()) {
      setError("Generate a prayer first.");
      return;
    }

    if (!me?.signedIn) {
      setError("Sign in to save your prayers and build your personal faith journal.");
      return;
    }

    setIsSaving(true);

    try {
      const res = await fetch("/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "prayer",
          title: topic.trim() || "Prayer",
          content: result,
          reference: null,
        }),
      });

      const text = await res.text();

      let data: { error?: string } = {};
      try {
        data = JSON.parse(text);
      } catch {
        data = { error: text || "Failed to save." };
      }

      if (!res.ok) {
        throw new Error(data.error || "Failed to save.");
      }

      setSuccess("Prayer saved to your account.");
    } catch (err: any) {
      setError(err?.message || "Failed to save.");
    } finally {
      setIsSaving(false);
    }
  }

  function handleReset() {
    setTopic("");
    setName("");
    setSituation("");
    setTone("gentle");
    setResult("");
    setError("");
    setSuccess("");
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white md:text-4xl">Prayer</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
          Generate a personal prayer for your current need, with Scripture references and a calm, encouraging tone.
        </p>
      </header>

      {/* colorScheme "light": the site sets color-scheme dark globally, which made the
          native selects (Tone, Tradition) render dark-on-dark inside this white card. */}
      <div className="rounded-[28px] border border-white/10 bg-white p-6 shadow-2xl md:p-8 text-slate-900" style={{ colorScheme: "light" }}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-slate-700">
              Topic
            </label>
            <input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., peace, healing, strength, guidance"
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>

          <div>
            <label htmlFor="tone" className="block text-sm font-medium text-slate-700">
              Tone
            </label>
            <select
              id="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value as Tone)}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-black/10"
            >
              <option value="gentle">Gentle</option>
              <option value="firm">Firm</option>
              <option value="short">Short</option>
              <option value="detailed">Detailed</option>
            </select>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
              Your name (optional)
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Sarah"
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>

          <div>
            <label htmlFor="situation" className="block text-sm font-medium text-slate-700">
              What are you facing? (optional)
            </label>
            <input
              id="situation"
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="e.g., anxiety, family stress, grief, uncertainty"
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Tradition</label>
            <DenominationSelect className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-black/10" />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {isLoading ? "Generating..." : "Generate prayer"}
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={!result || isSaving}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
          >
            Reset
          </button>
        </div>

        {error && (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            {success}
          </div>
        )}

        {result ? (
          <div className="mt-8 rounded-2xl bg-slate-50 p-5">
            <div className="text-sm font-semibold text-slate-800">Prayer</div>

            <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">
              {result}
            </p>
          </div>
        ) : (
          <div className="mt-8 rounded-2xl bg-slate-50 p-5">
            <p className="text-sm text-slate-600">
              Your prayer will appear here with Scripture references and a calm, encouraging structure.
            </p>
          </div>
        )}
      </div>

      {/* Ask right after a prayer is generated, when the visitor has just
          received value. Guests get the email signup (source "prayer-result");
          signed-in users get a link to switch daily emails on. */}
      {result && (
        <div className="mt-8">
          {me?.signedIn ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-sm text-white/80">
              Want a verse and devotional like this every morning?{" "}
              <Link href="/dashboard" className="font-semibold text-white underline">
                Turn on daily emails in your dashboard
              </Link>
              .
            </div>
          ) : (
            <GuestEmailCaptureClient
              source="prayer-result"
              heading="Want encouragement like this every morning?"
              subtext="Get a free Bible verse and short devotional in your inbox each day. No spam. Unsubscribe anytime."
            />
          )}
        </div>
      )}
    </main>
  );
}


