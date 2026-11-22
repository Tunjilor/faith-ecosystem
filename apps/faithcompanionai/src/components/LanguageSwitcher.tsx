"use client";
// src/components/LanguageSwitcher.tsx
// EN | ES toggle that keeps the reader on the same page (and query/hash).
// The current locale comes from LocaleContext, which the server fills from the
// URL, so server and client render the same markup (no window access in render).
import { useLocale } from "@/context/LocaleContext";
import { LOCALES, LOCALE_COOKIE, splitLocale, withLocale, type Locale } from "@/lib/i18n/config";

const LABELS: Record<Locale, string> = { en: "EN", es: "ES" };
const NAMES: Record<Locale, string> = { en: "English", es: "Español" };

export default function LanguageSwitcher() {
  const current = useLocale();

  function switchTo(code: Locale) {
    document.cookie = `${LOCALE_COOKIE}=${code};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
    // Read the browser URL at click time (never during render).
    const { path } = splitLocale(window.location.pathname);
    window.location.href = `${withLocale(path, code)}${window.location.search}${window.location.hash}`;
  }

  return (
    <div className="flex items-center gap-1.5 text-xs font-semibold" aria-label="Language switcher">
      {LOCALES.map((code, i) => (
        <span key={code} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-white/20">|</span>}
          <button
            type="button"
            onClick={() => switchTo(code)}
            lang={code}
            aria-label={NAMES[code]}
            className={
              code === current
                ? "text-white cursor-default"
                : "text-white/40 hover:text-white/80 transition"
            }
            aria-current={code === current ? "true" : undefined}
            disabled={code === current}
          >
            {LABELS[code]}
          </button>
        </span>
      ))}
    </div>
  );
}
