// src/components/home/HomeCtaLayer.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type MeResponse = {
  signedIn?: boolean;
  authed?: boolean;
  email?: string | null;
};

export default function HomeCtaLayer() {
  const [me, setMe] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadMe() {
      try {
        const res = await fetch("/api/me", { cache: "no-store" });
        const data = res.ok ? await res.json() : null;
        if (!cancelled) setMe(data);
      } catch {
        if (!cancelled) setMe(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadMe();
    return () => {
      cancelled = true;
    };
  }, []);

  const signedIn = !!(me?.signedIn ?? me?.authed);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/biblequiz"
          className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
        >
          Start Your Faith Journey
        </Link>
      </div>
    );
  }

  if (signedIn) {
    return (
      <div className="space-y-4">
        <div className="text-sm text-white/65">
          Signed in{me?.email ? ` as ${me.email}` : ""}.
        </div>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
          >
            Open Dashboard
          </Link>

          <Link
            href="/tools/devotional"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Go Deeper with Devotional
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/biblequiz"
          className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
        >
          Start Your Faith Journey
        </Link>

        <Link
          href="/login"
          className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Create Free Account
        </Link>
      </div>
    </div>
  );
}