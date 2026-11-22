// src/app/tools/devotional/page.tsx

"use client";
import { useUser } from "@/context/UserContext";

import { useEffect, useState } from "react";
import DenominationSelect, { getDenominationNote, readDenomination } from "@/components/DenominationSelect";
import MobileInstallBanner from "@/components/MobileInstallBanner";
import AiResultText from "@/components/AiResultText";
import Rv1909VerseCards, { readVerseCards, type Rv1909Card } from "@/components/Rv1909VerseCards";
import { useDictionary, useLocale } from "@/context/LocaleContext";
import { tools } from "@/lib/i18n/dictionaries/tools";

type Tone = "gentle" | "firm" | "short" | "detailed";

type MeResponse = {
  signedIn?: boolean;
};

type AskResponse = {
  answer?: string;
  error?: string;
  code?: string | null;
  verses?: unknown;
};

export default function DevotionalPage() {
  const locale = useLocale();
  const { common, devotional: t } = useDictionary(tools);
  const [topic, setTopic] = useState("");
  const [name, setName] = useState("");
  const [situation, setSituation] = useState("");
  const [tone, setTone] = useState<Tone>("gentle");
  const [denomination, setDenomination] = useState("non-denominational");

  const [result, setResult] = useState("");
  const [verseCards, setVerseCards] = useState<Rv1909Card[]>([]);
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
    // English instruction template; on /es the person's own words go in
    // `userText` so the reply language follows them.
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
          ...(locale === "es"
            ? { locale, userText: [topic.trim(), situation.trim()].filter(Boolean).join(". ") }
            : {}),
        }),
      });

      const text = await res.text();

      let data: AskResponse = {};
      try {
        data = JSON.parse(text);
      } catch {
        data = { error: text || common.unexpected };
      }

      if (!res.ok) {
        if (res.status === 429) {
          setError(locale === "es" ? common.limitReached : data.error || common.limitReached);
          return;
        }

        throw new Error((locale === "en" && data.error) || common.requestFailed(res.status));
      }

      if (!data.answer) {
        throw new Error(t.noResult);
      }

      setResult(data.answer);
      setVerseCards(locale === "es" ? readVerseCards(data.verses) : []);
    } catch (err: any) {
      setError(err?.message || common.somethingWrong);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSave() {
    setError("");
    setSuccess("");

    if (!result.trim()) {
      setError(t.needResult);
      return;
    }

    if (!me?.signedIn) {
      setError(t.signIn);
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
          title: topic.trim() || t.defaultTitle,
          content: result,
          reference: null,
        }),
      });

      const text = await res.text();

      let data: { error?: string } = {};
      try {
        data = JSON.parse(text);
      } catch {
        data = { error: text || common.failedSave };
      }

      if (!res.ok) {
        throw new Error((locale === "en" && data.error) || common.failedSave);
      }

      setSuccess(t.saved);
    } catch (err: any) {
      setError(err?.message || common.failedSave);
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
    setVerseCards([]);
    setError("");
    setSuccess("");
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-orange-400">
          {t.eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">{t.heading}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
          {t.intro}
        </p>
      </header>

      <div className="rounded-[28px] border border-white/10 bg-white p-6 shadow-2xl md:p-8 text-slate-900" style={{ colorScheme: "light" }}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-slate-700">
              {common.topic}
            </label>
            <input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={t.topicPlaceholder}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>

          <div>
            <label htmlFor="tone" className="block text-sm font-medium text-slate-700">
              {common.tone}
            </label>
            <select
              id="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value as Tone)}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-black/10"
            >
              <option value="gentle">{common.tones.gentle}</option>
              <option value="firm">{common.tones.firm}</option>
              <option value="short">{common.tones.short}</option>
              <option value="detailed">{common.tones.detailed}</option>
            </select>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
              {common.name}
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={common.namePlaceholder}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>

          <div>
            <label htmlFor="situation" className="block text-sm font-medium text-slate-700">
              {common.situation}
            </label>
            <input
              id="situation"
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder={t.situationPlaceholder}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700">{common.tradition}</label>
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
            {isLoading ? common.generating : t.generate}
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={!result || isSaving}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 disabled:opacity-50"
          >
            {isSaving ? common.saving : common.save}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
          >
            {common.reset}
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
            <div className="text-sm font-semibold text-slate-800">{t.resultHeading}</div>

            <AiResultText text={result} className="mt-3" />

            <Rv1909VerseCards heading={common.versesHeading} verses={verseCards} />

            <MobileInstallBanner />
          </div>
        ) : (
          <div className="mt-8 rounded-2xl bg-slate-50 p-5">
            <p className="text-sm text-slate-600">
              {t.empty}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
