"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

type Props = {
  /** Warm prompt shown above the copy-link button. */
  text: string;
  /** Absolute URL of this page, copied to the clipboard. */
  url: string;
};

/**
 * Bottom-of-content share prompt with a copy-link button.
 * Client component (needs the clipboard API) embedded in the otherwise-static topic page.
 */
export default function ShareBlock({ text, url }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for older browsers without the async clipboard API.
        const input = document.createElement("input");
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        input.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Permission denied or unsupported — leave the button state unchanged.
    }
  }

  return (
    <section className="mt-12 overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-r from-purple-600/20 to-orange-500/20 p-8 text-center">
      <p className="mx-auto max-w-xl text-base font-semibold leading-7 text-white">{text}</p>
      <div className="mt-6">
        <button
          type="button"
          onClick={handleCopy}
          aria-live="polite"
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
        >
          {copied ? <Check size={16} /> : <Link2 size={16} />}
          {copied ? "Link copied!" : "Copy link to share"}
        </button>
      </div>
    </section>
  );
}
