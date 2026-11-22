// src/app/tools/verse/page.tsx

"use client";
import { useUser } from "@/context/UserContext";

import { useEffect, useMemo, useState } from "react";
import DenominationSelect, { getDenominationNote, readDenomination } from "@/components/DenominationSelect";
import ShareCardModal from "@/components/ShareCardModal";
import { ImageIcon } from "lucide-react";
import Rv1909VerseCards, { readVerseCards, type Rv1909Card } from "@/components/Rv1909VerseCards";
import { useDictionary, useLocale } from "@/context/LocaleContext";
import { tools } from "@/lib/i18n/dictionaries/tools";

type Length = "short" | "medium" | "long";

type MeResponse = {
  signedIn?: boolean;
};

type VerseResponse = {
  verses?: string[];
  verseCards?: unknown;
  encouragement?: string;
  nextStep?: string;
  error?: string;
};

type ResultData = {
  verses: string[];
  encouragement: string;
  nextStep: string;
  // Spanish only: RV1909 text for each reference, from bible-api.com.
  cards: Rv1909Card[];
};

type VerseText = { textReferences: string; textEncouragement: string; textNextStep: string };

function resultToText(data: ResultData, t: VerseText): string {
  const cardText = new Map(data.cards.map((c) => [c.reference, c.text]));
  return [
    t.textReferences,
    ...data.verses.map((v) => (cardText.has(v) ? `- ${v} (RV1909): ${cardText.get(v)}` : `- ${v}`)),
    "",
    `${t.textEncouragement} ${data.encouragement}`,
    "",
    `${t.textNextStep} ${data.nextStep}`,
  ].join("\n");
}

export default function VersePage() {
  const locale = useLocale();
  const { common, verse: t } = useDictionary(tools);
  const [topic, setTopic] = useState("");
  const [length, setLength] = useState<Length>("short");
  const [denomination, setDenomination] = useState("non-denominational");
  const [result, setResult] = useState<ResultData | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);
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
    setIsLoading(true);

    try {
      const res = await fetch("/api/verse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic + getDenominationNote(denomination),
          length,
          ...(locale === "es" ? { locale } : {}),
        }),
      });

      const text = await res.text();

      let data: VerseResponse = {};
      try {
        data = JSON.parse(text);
      } catch {
        data = { error: text || common.unexpected };
      }

      if (!res.ok) {
        throw new Error((locale === "en" && data.error) || common.requestFailed(res.status));
      }

      if (!data.verses || !data.encouragement || !data.nextStep) {
        throw new Error(t.incomplete);
      }

      const newResult = {
        verses: data.verses,
        encouragement: data.encouragement,
        nextStep: data.nextStep,
        cards: locale === "es" ? readVerseCards(data.verseCards) : [],
      };
      setResult(newResult);
    } catch (err: any) {
      setError(err?.message || common.somethingWrong);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSave() {
    setError("");
    setSuccess("");

    if (!result) {
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
          type: "verse",
          title: topic.trim() || t.savedTitle(locale === "es" ? t.lengths[length].toLowerCase() : length),
          content: resultToText(result, t),
          reference: null,
          meta: {
            topic: topic.trim() || null,
            length,
          },
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
    setLength("short");
    setResult(null);
    setError("");
    setSuccess("");
  }

  const lengthHelp = useMemo(() => t.lengthHelp[length] ?? "", [length, t]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white md:text-4xl">{t.heading}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
          {t.intro}
        </p>
      </header>

      <div className="rounded-[28px] border border-white/10 bg-white p-6 shadow-2xl md:p-8">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <label htmlFor="topic" className="block text-sm font-medium text-slate-700">
              {t.topic}
            </label>
            <input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={t.topicPlaceholder}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 outline-none focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-black/10"
            />
          </div>

          <div>
            <label htmlFor="length" className="block text-sm font-medium text-slate-700">
              {t.length}
            </label>
            <select
              id="length"
              value={length}
              onChange={(e) => setLength(e.target.value as Length)}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-medium text-white outline-none focus:border-slate-500 focus:ring-2 focus:ring-black/10"
            >
              <option value="short" className="bg-white text-slate-900">
                {t.lengths.short}
              </option>
              <option value="medium" className="bg-white text-slate-900">
                {t.lengths.medium}
              </option>
              <option value="long" className="bg-white text-slate-900">
                {t.lengths.long}
              </option>
            </select>
            <p className="mt-2 text-xs text-slate-500">{lengthHelp}</p>
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-slate-700">
              {common.tradition}
            </label>
            <DenominationSelect className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-500" />
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

          {result && (
            <button
              type="button"
              onClick={() => setShowShareCard(true)}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-purple-300 bg-purple-50 px-5 py-3 text-sm font-semibold text-purple-700 transition hover:bg-purple-100"
            >
              <ImageIcon size={15} />
              {t.shareCard}
            </button>
          )}
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
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-slate-800">{t.resultHeading}</div>
              <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                {t.lengthBadge(t.lengths[length])}
              </div>
            </div>

            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
              <div>
                <p className="font-semibold text-slate-900">{t.references}</p>
                <ul className="mt-1 space-y-1 pl-1">
                  {result.verses.map((v) => (
                    <li key={v} className="flex gap-2">
                      <span className="text-slate-400">—</span>
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-semibold text-slate-900">{t.encouragement}</p>
                <p className="mt-1">{result.encouragement}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-900">{t.nextStep}</p>
                <p className="mt-1">{result.nextStep}</p>
              </div>
            </div>

            <Rv1909VerseCards heading={common.versesHeading} verses={result.cards} />
          </div>
        ) : (
          <div className="mt-8 rounded-2xl bg-slate-50 p-5">
            <p className="text-sm text-slate-600">
              {t.empty}
            </p>
          </div>
        )}
      </div>
      {showShareCard && result && (
        <ShareCardModal
          initialText={result.encouragement}
          initialReference={result.verses[0] ?? ""}
          onClose={() => setShowShareCard(false)}
        />
      )}
    </main>
  );
}


