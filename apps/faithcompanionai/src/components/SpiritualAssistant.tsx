"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { RotateCcw, X, Send } from "lucide-react";
import { useDictionary, useLocale } from "@/context/LocaleContext";
import { assistant } from "@/lib/i18n/dictionaries/assistant";
import { localizedHref } from "@/lib/i18n/links";
import { modernizeRv1909 } from "@/lib/i18n/rv1909-text";

type Verse = { reference: string; text: string };

type Msg = {
  role: "assistant" | "user";
  content: string;
  ts: number;
  // RV1909 text from bible-api.com for references in a Spanish reply.
  verses?: Verse[];
};

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

const STORAGE_KEY = "fcai_chat_v1";

// The greeting used to be stored as the first message. It is now rendered from
// the dictionary at display time (so it matches the page language and is never
// sent as history), so drop any stored copy left over from the old widget.
const LEGACY_GREETINGS = new Set([
  "Hello! I'm your Faith Companion AI assistant. I can help with Scripture-based encouragement, short prayers, and faith questions. What would you like help with today?",
  "Hello! I'm your Faith Companion AI assistant. How can I help you today?",
]);

function withoutLegacyGreeting(msgs: Msg[]) {
  return msgs.filter((m) => !(m.role === "assistant" && LEGACY_GREETINGS.has(m.content)));
}

function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function SpiritualAssistant() {
  const locale = useLocale();
  const t = useDictionary(assistant);
  const [open, setOpen] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) as Msg[]) : [];
      return Array.isArray(parsed) ? withoutLegacyGreeting(parsed) : [];
    } catch {
      return [];
    }
  });

  const listRef = useRef<HTMLDivElement | null>(null);

  // Built from the dictionary at display time; not stored, not sent as history.
  const greeting = cleared ? t.greetingAfterClear : t.greeting;

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
    } catch {
      // ignore
    }
  }, [msgs]);

  // Auto-scroll
  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [open, msgs]);

  const transcript = useMemo(() => {
    const greetingLine = `${t.assistant}: ${greeting}${t.spanishOffer ? ` ${t.spanishOffer}` : ""}`;
    return [
      greetingLine,
      ...msgs.map((m) => {
        const who = m.role === "user" ? t.you : t.assistant;
        const time = new Date(m.ts).toLocaleString(locale);
        const verses = (m.verses ?? []).map((v) => `\n${v.reference} (RV1909): ${modernizeRv1909(v.text)}`).join("");
        return `[${time}] ${who}: ${m.content}${verses}`;
      }),
    ].join("\n\n");
  }, [msgs, greeting, t, locale]);

  async function addUserMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;

    const userMsg: Msg = { role: "user", content: trimmed, ts: Date.now() };
    setMsgs((prev) => [...prev, userMsg]);
    setInput("");
    setThinking(true);

    try {
      // Pass the last 10 messages as history for context (excluding the one we just added)
      const history = msgs.slice(-10).map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: trimmed, history, locale }),
      });

      const data = await res.json().catch(() => null);

      const replyContent = res.ok && data?.reply
        ? data.reply
        : data?.error === "LIMIT_REACHED" || res.status === 429
        ? t.limitReached
        : t.genericError || data?.error || t.fallbackError;
      const verses: Verse[] | undefined =
        res.ok && Array.isArray(data?.verses) && data.verses.length > 0
          ? data.verses.map((v: Verse) => ({ reference: v.reference, text: v.text }))
          : undefined;

      setMsgs((prev) => [
        ...prev,
        { role: "assistant", content: replyContent, ts: Date.now(), ...(verses ? { verses } : {}) },
      ]);
    } catch {
      setMsgs((prev) => [
        ...prev,
        {
          role: "assistant",
          content: t.offline,
          ts: Date.now(),
        },
      ]);
    } finally {
      setThinking(false);
    }
  }

  function clearChat() {
    setMsgs([]);
    setCleared(true);
  }

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-95"
          aria-label={t.openAria}
        >
          {"💬"} <span className="hidden sm:inline">{t.openLabel}</span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div className="fixed bottom-5 right-5 z-50 w-[92vw] max-w-md overflow-hidden rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-orange-500 px-4 py-3 text-white">
            <div className="font-semibold">{t.title}</div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={clearChat}
                className="rounded-md bg-white/15 px-2 py-1 text-xs hover:bg-white/25"
                aria-label={t.clearAria}
                title={t.clearTitle}
              >
                <RotateCcw size={14} />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md bg-white/15 px-2 py-1 text-xs hover:bg-white/25"
                aria-label={t.closeAria}
                title={t.closeTitle}
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Quick actions */}
          <div className="px-4 py-3">
            <div className="text-xs font-semibold text-white/70">{t.quickActions}</div>
            <div className="mt-2 flex flex-wrap gap-2">
              <Link
                href={localizedHref("/tools/prayer", locale)}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 hover:bg-white/15 hover:text-white"
              >
                {t.actions.prayer}
              </Link>
              <Link
                href={localizedHref("/tools/verse", locale)}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 hover:bg-white/15 hover:text-white"
              >
                {t.actions.verse}
              </Link>
              <Link
                href={localizedHref("/tools/devotional", locale)}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 hover:bg-white/15 hover:text-white"
              >
                {t.actions.devotional}
              </Link>
            </div>

            {/* Save/Download */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs)); } catch { /* ignore */ }
                  setSavedFlash(true);
                  setTimeout(() => setSavedFlash(false), 2000);
                }}
                className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white"
              >
                {savedFlash ? t.saved : t.save}
              </button>
              <button
                type="button"
                onClick={() =>
                  downloadText(
                    `faith-companion-chat-${new Date()
                      .toISOString()
                      .slice(0, 10)}.txt`,
                    transcript
                  )
                }
                className="rounded-md bg-gradient-to-r from-purple-600 to-orange-500 px-3 py-2 text-xs font-semibold text-white hover:opacity-95"
              >
                {t.download}
              </button>
              <button
                type="button"
                onClick={clearChat}
                className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/50 hover:bg-white/10 hover:text-white/80"
              >
                {t.clear}
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            className="max-h-[48vh] space-y-3 overflow-y-auto px-4 pb-4"
          >
            <div className="max-w-[92%] rounded-2xl bg-white/5 px-3 py-2 text-sm leading-relaxed text-white/80">
              {greeting}
              {t.spanishOffer && (
                <span lang="es" className="mt-1 block">
                  {t.spanishOffer}
                </span>
              )}
            </div>
            {msgs.map((m, idx) => (
              <React.Fragment key={idx}>
                <div
                  className={cn(
                    "max-w-[92%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                    m.role === "user"
                      ? "ml-auto bg-white/10 text-white"
                      : "bg-white/5 text-white/80"
                  )}
                >
                  {m.content}
                  {m.verses?.map((v) => (
                    <blockquote
                      key={v.reference}
                      lang="es"
                      className="mt-2 border-l-2 border-white/20 pl-2 text-xs text-white/70"
                    >
                      <span className="block font-semibold text-white/80">{v.reference} (RV1909)</span>
                      {/* Also covers cards saved before the server modernized the spelling. */}
                      <span className="block">{modernizeRv1909(v.text)}</span>
                    </blockquote>
                  ))}
                </div>
              </React.Fragment>
            ))}
            {thinking && (
              <div className="max-w-[92%] rounded-2xl bg-white/5 px-3 py-2 text-sm text-white/50">
                {t.thinking}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            className="border-t border-white/10 bg-black/40 px-3 py-3"
            onSubmit={(e) => {
              e.preventDefault();
              addUserMessage(input);
            }}
          >
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
              />
              <button
                type="submit"
                disabled={thinking}
                className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white hover:bg-white/15 disabled:opacity-50"
                aria-label={t.send}
              >
                {thinking ? "..." : <Send size={16} />}
              </button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-white/30">
              {t.footnote}
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export { SpiritualAssistant };
