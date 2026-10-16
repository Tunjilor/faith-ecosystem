// src/app/tools/devotional/page.tsx

"use client";
import { useUser } from "@/context/UserContext";

import React from "react";
import { useEffect, useState } from "react";
import DenominationSelect, { getDenominationNote, readDenomination } from "@/components/DenominationSelect";
import MobileInstallBanner from "@/components/MobileInstallBanner";

function inlineBold(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) => {
    const m = part.match(/^\*\*([^*]+)\*\*$/);
    return m ? <strong key={i} className="font-semibold text-slate-900">{m[1]}</strong> : part;
  });
}

function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split("\n");
  const output: React.ReactNode[] = [];
  let key = 0;

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (!line) {
      output.push(<div key={key++} className="h-2" />);
      continue;
    }

    // Bullet point
    if (/^[-*]\s/.test(line)) {
      output.push(
        <div key={key++} className="flex gap-2 text-sm leading-6 text-slate-700">
          <span className="mt-0.5 text-slate-400">•</span>
          <span>{inlineBold(line.replace(/^[-*]\s/, ""))}</span>
        </div>
      );
      continue;
    }

    // Numbered list
    const numMatch = line.match(/^(\d+)\.\s(.+)/);
    if (numMatch) {
      output.push(
        <div key={key++} className="flex gap-2 text-sm leading-6 text-slate-700">
          <span className="w-4 shrink-0 font-semibold text-slate-500">{numMatch[1]}.</span>
          <span>{inlineBold(numMatch[2])}</span>
        </div>
      );
      continue;
    }

    // Whole-line bold (section heading like **Reflection:** or **Title**)
    const headingMatch = line.match(/^\*\*(.+?)\*\*:?\s*$/);
    if (headingMatch) {
      output.push(
        <p key={key++} className="mt-1 text-sm font-semibold text-slate-900">
          {headingMatch[1]}
        </p>
      );
      continue;
    }

    // Regular line (may contain inline bold)
    output.push(
      <p key={key++} className="text-sm leading-6 text-slate-700">
        {inlineBold(line)}
      </p>
    );
  }

  return output;
}

type Tone = "gentle" | "firm" | "short" | "detailed";

type MeResponse = {
  signedIn?: boolean;
};

type AskResponse = {
  answer?: string;
  error?: string;
  code?: string | null;
};

export default function DevotionalPage() {
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
        ? `Write a Christian devotional about ${topic.trim()}. ${
            situation.trim() ? `The user is dealing with: ${situation.trim()}.` : ""
          } Include a title, 1-3 Bible references, a reflection, a short prayer, and 2 action steps.${denomNote}`
        : `Write a Christian devotional for today. ${
            situation.trim() ? `The user is dealing with: ${situation.trim()}.` : ""
          } Include a title, 1-3 Bible references, a reflection, a short prayer, and 2 action steps.${denomNote}`;

    setIsLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          mode: "devotional",
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
        throw new Error("No devotional returned.");
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
      setError("Generate a devotional first.");
      return;
    }

    if (!me?.signedIn) {
      setError("Sign in to save your devotionals and build your personal faith journal.");
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
          type: "answer",
          title: topic.trim() || "Devotional",
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

      setSuccess("Devotional saved to your account.");
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
        <p className="text-xs font-semibold uppercase tracking-widest text-orange-400">
          Based on your faith journey, here&apos;s guidance for you today
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">Devotional</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
          This is tailored to where you are right now — enter a topic or generate one for your current season.
        </p>
      </header>

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
              placeholder="e.g., peace, endurance, hope, forgiveness"
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
              placeholder="e.g., discouragement, uncertainty, fear, waiting"
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
            {isLoading ? "Generating..." : "Generate devotional"}
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
          <div className="mt-8 rounded-2xl bg-slate-50 p-5 text-slate-900">
            <div className="text-sm font-semibold text-slate-800">Devotional</div>

            <div className="mt-3 space-y-1">
              {renderMarkdown(result)}
            </div>

            <MobileInstallBanner />
          </div>
        ) : (
          <div className="mt-8 rounded-2xl bg-slate-50 p-5">
            <p className="text-sm text-slate-600">
              Your devotional will appear here with reflection, prayer, Scripture references, and action steps.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}


