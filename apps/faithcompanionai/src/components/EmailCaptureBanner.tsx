// src/components/EmailCaptureBanner.tsx
//
// Presentational + submit half of the daily-verse email capture. Has no idea
// who is viewing — wrap it in <GuestEmailCapture /> (server, dynamic routes)
// or <GuestEmailCaptureClient /> (client, static routes / footer) to show it
// only to logged-out visitors. `source` is stored on the Lead row so we can
// tell which placement converts.
//
// variant "card"    — full gradient-bordered section with heading (in-content)
// variant "compact" — single row: glyph + short copy + input + button (footer)
"use client";

import { useState } from "react";

type Props = {
  source?: string;
  variant?: "card" | "compact";
};

export default function EmailCaptureBanner({ source = "quiz-results", variant = "card" }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  const form = (
    <form
      onSubmit={handleSubmit}
      className={
        variant === "compact"
          ? "flex w-full flex-wrap gap-2 sm:w-auto sm:flex-nowrap"
          : "flex w-full flex-col gap-2 sm:flex-row md:w-auto md:shrink-0"
      }
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        aria-label="Email address"
        className={
          variant === "compact"
            ? "min-h-[40px] min-w-0 flex-1 rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/40 sm:w-56 sm:flex-none"
            : "min-h-[48px] w-full rounded-xl border border-white/20 bg-black/40 px-4 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/50 sm:w-64"
        }
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className={
          variant === "compact"
            ? "inline-flex min-h-[40px] items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-orange-500 px-4 py-2 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-50"
            : "inline-flex min-h-[48px] items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-orange-500 px-6 py-2 text-sm font-bold text-white hover:opacity-95 disabled:opacity-50"
        }
      >
        {status === "loading" ? "…" : "Subscribe"}
      </button>
    </form>
  );

  if (variant === "compact") {
    if (status === "done") {
      return (
        <p className="text-sm text-emerald-300">
          ✅ You&rsquo;re in — your first verse arrives with the next daily send.
        </p>
      );
    }
    return (
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/70">
          <span className="mr-2">📖</span>
          <span className="font-semibold text-white">Daily Bible verse by email</span> — free, unsubscribe anytime.
          {status === "error" && <span className="ml-2 text-red-400">Something went wrong, please try again.</span>}
        </p>
        {form}
      </div>
    );
  }

  if (status === "done") {
    return (
      <section className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-6 text-center">
        <div className="text-2xl">✅</div>
        <h2 className="mt-2 text-xl font-extrabold text-white">You&rsquo;re in!</h2>
        <p className="mt-1 text-sm text-emerald-200/80">Your first daily verse arrives with the next daily send.</p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl bg-gradient-to-r from-purple-600 to-orange-500 p-[1px]">
      <div className="rounded-2xl px-6 py-6 sm:px-8" style={{ background: "rgba(11,10,20,0.96)" }}>
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-2xl">📖</div>
            <h2 className="mt-2 text-xl font-extrabold text-white">
              Get your daily Bible verse by email — free forever
            </h2>
            <p className="mt-1 text-sm leading-6 text-white/70">
              One verse, one prayer, every morning. No spam. Unsubscribe anytime.
            </p>
          </div>

          {form}
        </div>

        {status === "error" && (
          <p className="mt-3 text-xs text-red-400">Something went wrong. Please try again.</p>
        )}
      </div>
    </section>
  );
}
export { EmailCaptureBanner };
