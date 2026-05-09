"use client";

import { useState } from "react";

interface VerseResult {
  reference: string;
  verse: string;
  reflection: string;
}

interface Props {
  defaultTopic?: string;
  compact?: boolean;
}

export default function VerseGenerator({ defaultTopic = "", compact = false }: Props) {
  const [input, setInput] = useState(defaultTopic);
  const [result, setResult] = useState<VerseResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/verse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: input }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setResult(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async () => {
    if (!email.trim() || !result) return;
    setEmailStatus("sending");
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ...result }),
      });
      if (!res.ok) throw new Error();
      setEmailStatus("sent");
    } catch {
      setEmailStatus("error");
    }
  };

  const shareText = result
    ? `${result.reference}\n\n"${result.verse}"\n\n${result.reflection}\n\n— BibleVerseGeneratorAI.com`
    : "";

  const copyToClipboard = async () => {
    if (!shareText) return;
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-[#0f172a] rounded-2xl p-6 shadow-xl border border-slate-700/50">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='What do you need a verse for? (e.g. "I feel anxious about the future")'
          className="w-full h-28 p-4 rounded-xl bg-[#020617] border border-slate-600 text-white placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base"
          maxLength={500}
        />
        <button
          onClick={generate}
          disabled={loading || !input.trim()}
          className="mt-4 w-full py-4 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl font-bold text-black text-lg transition-all shadow-lg shadow-emerald-500/25"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Finding your verse…
            </span>
          ) : (
            "Get My Verse"
          )}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-900/40 border border-red-700/50 rounded-xl text-red-300 text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 space-y-4">
          {/* Verse card */}
          <div className="bg-[#0f172a] rounded-2xl p-6 border border-emerald-700/50 shadow-xl">
            <span className="inline-block text-emerald-400 text-xs font-bold uppercase tracking-widest mb-3">
              Your Verse
            </span>
            <p className="text-emerald-300 font-bold text-xl mb-3">{result.reference}</p>
            <p className="text-white text-lg leading-relaxed italic mb-5 border-l-2 border-emerald-500/60 pl-4">
              &ldquo;{result.verse}&rdquo;
            </p>
            <div className="border-t border-slate-700 pt-4">
              <p className="text-gray-300 leading-relaxed">{result.reflection}</p>
            </div>
          </div>

          {/* Share buttons */}
          <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-700/50">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">
              Share this verse
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 rounded-lg text-sm font-medium text-[#25D366] transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbibleversegeneratorai.com&quote=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-800/40 hover:bg-blue-700/50 border border-blue-600/40 rounded-lg text-sm font-medium text-blue-300 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </a>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-700/60 hover:bg-slate-600/60 border border-slate-600/50 rounded-lg text-sm font-medium text-slate-200 transition-colors"
              >
                {copied ? (
                  <>
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-emerald-400" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Email capture */}
          <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-700/50">
            <p className="text-sm font-semibold text-white mb-3">📧 Email me this verse</p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendEmail()}
                placeholder="your@email.com"
                className="flex-1 min-w-0 px-4 py-2.5 rounded-lg bg-[#020617] border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
              <button
                onClick={sendEmail}
                disabled={emailStatus === "sending" || emailStatus === "sent" || !email.trim()}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-semibold transition-colors whitespace-nowrap"
              >
                {emailStatus === "sent"
                  ? "✓ Sent!"
                  : emailStatus === "sending"
                  ? "Sending…"
                  : "Send"}
              </button>
            </div>
            {emailStatus === "error" && (
              <p className="text-red-400 text-xs mt-2">Failed to send. Please try again.</p>
            )}
          </div>

          {/* FaithCompanionAI CTA */}
          <div className="bg-gradient-to-br from-emerald-950/80 to-slate-900 rounded-2xl p-6 border border-emerald-700/40 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Want to save this verse and get a prayer to go with it?
            </h3>
            <p className="text-gray-300 text-sm mb-5 max-w-md mx-auto">
              FaithCompanionAI helps you grow deeper in faith with personalized prayers,
              devotionals, and saved verses.
            </p>
            <a
              href="https://faithcompanionai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-black px-8 py-3.5 rounded-xl font-bold text-base transition-all shadow-lg shadow-emerald-500/25"
            >
              Continue on FaithCompanionAI →
            </a>
            <p className="text-xs text-gray-500 mt-4">
              Also try:{" "}
              <a
                href="https://prayergeneratorai.com"
                className="text-emerald-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                PrayerGeneratorAI.com
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
