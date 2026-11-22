// src/components/Rv1909VerseCards.tsx
// RV1909 verse text returned by the AI endpoints (fetched from bible-api.com,
// never written by the model). Shown under Spanish tool results.
import { modernizeRv1909 } from "@/lib/i18n/rv1909-text";

export type Rv1909Card = { reference: string; text: string };

export default function Rv1909VerseCards({ heading, verses }: { heading: string; verses: Rv1909Card[] }) {
  if (verses.length === 0) return null;
  return (
    <div className="mt-5 border-t border-slate-200 pt-4" lang="es">
      <div className="text-sm font-semibold text-slate-800">{heading}</div>
      <div className="mt-3 space-y-3">
        {verses.map((v) => (
          <blockquote key={v.reference} className="border-l-2 border-purple-300 pl-3 text-sm leading-6 text-slate-700">
            <span className="block font-semibold text-slate-900">{v.reference} (RV1909)</span>
            <span className="block">{modernizeRv1909(v.text)}</span>
          </blockquote>
        ))}
      </div>
    </div>
  );
}

/** Cards from an API response field, ignoring anything malformed. */
export function readVerseCards(list: unknown): Rv1909Card[] {
  if (!Array.isArray(list)) return [];
  return list
    .filter((v): v is Rv1909Card => typeof v?.reference === "string" && typeof v?.text === "string")
    .map((v) => ({ reference: v.reference, text: v.text }));
}
