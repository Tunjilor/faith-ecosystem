// src/components/UntranslatedNotice.tsx
// Shown at the top of /es pages that are not in TRANSLATED_ROUTES yet (those
// pages also get X-Robots-Tag: noindex from middleware). Spanish-only by design.
import { site } from "@/lib/i18n/dictionaries/site";

export default function UntranslatedNotice() {
  return (
    <div
      role="note"
      lang="es"
      className="mb-6 rounded-2xl border border-orange-300/30 bg-orange-400/10 px-4 py-3 text-sm leading-6 text-white/85"
    >
      {site.es.untranslatedNotice}
    </div>
  );
}
