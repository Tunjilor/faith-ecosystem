// src/components/QuizLimitPrompt.tsx
//
// One calm prompt, shown at a single moment: when a free user has used all
// 3 free quiz days (3 days x 10 questions) and starts/returns for another quiz.
// Offers two honest paths (Premium, or a free daily devotional email) plus a
// clear dismiss. NOT a wall — the quiz stays playable behind it.
//
// Devotional opt-in routes by auth state:
//   - signed-in free user → PATCH /api/me/email-prefs { emailOptIn: true }
//     so they flow through the existing opted-in-user daily-email path.
//   - guest               → POST /api/leads (durable Lead row, mailed by the
//     daily-email cron's lead pass).
"use client";

import { useState } from "react";
import Link from "next/link";

export default function QuizLimitPrompt({
  onClose,
  signedIn = false,
}: {
  onClose: () => void;
  signedIn?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      let res: Response;
      if (signedIn) {
        // Account already has an email — just opt them in.
        res = await fetch("/api/me/email-prefs", {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ emailOptIn: true }),
        });
      } else {
        if (!email.includes("@")) {
          setStatus("idle");
          return;
        }
        res = await fetch("/api/leads", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email: email.trim(), source: "quiz-3day-limit" }),
        });
      }
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
        style={{ background: "rgba(11,10,20,0.98)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-purple-600 to-orange-500" />
        <div className="px-7 py-7">
          <h2 className="text-xl font-extrabold text-white">You&rsquo;ve used your 3 free quiz days</h2>
          <p className="mt-2 text-sm leading-6 text-white/65">
            The free plan includes 3 quiz days, 10 questions each. You&rsquo;re welcome to keep
            playing &mdash; or, if the quiz has become part of your routine, here are two ways to go deeper:
          </p>

          {/* Primary path */}
          <Link
            href="/pricing"
            onClick={onClose}
            className="mt-5 flex min-h-[52px] w-full items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-orange-500 text-sm font-bold text-white hover:opacity-95"
          >
            Go Premium &mdash; unlimited, $4.99/month
          </Link>

          {/* Secondary path: free daily devotional email */}
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
            {status === "done" ? (
              <p className="text-sm font-semibold text-emerald-300">
                ✓ You&rsquo;re on the list. A verse and short devotional will arrive each morning.
              </p>
            ) : (
              <>
                <div className="text-sm font-semibold text-white">
                  Or get a verse and short devotional each morning, free
                </div>

                {signedIn ? (
                  <button
                    type="button"
                    onClick={subscribe}
                    disabled={status === "loading"}
                    className="mt-3 w-full rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-50"
                  >
                    {status === "loading" ? "…" : "Yes, email me each morning"}
                  </button>
                ) : (
                  <form onSubmit={subscribe} className="mt-3 flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      aria-label="Email address for the free daily devotional"
                      className="min-w-0 flex-1 rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/30"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="shrink-0 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-50"
                    >
                      {status === "loading" ? "…" : "Subscribe"}
                    </button>
                  </form>
                )}

                {status === "error" && (
                  <p className="mt-2 text-xs text-red-400">Something went wrong. Please try again.</p>
                )}
                <p className="mt-2 text-xs text-white/40">No spam. Unsubscribe anytime.</p>
              </>
            )}
          </div>

          {/* Clear dismiss — not a wall */}
          <button
            type="button"
            onClick={onClose}
            className="mt-4 w-full text-center text-sm text-white/45 hover:text-white/75"
          >
            Maybe later — keep playing
          </button>
        </div>
      </div>
    </div>
  );
}

export { QuizLimitPrompt };
