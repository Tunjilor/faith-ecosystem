// src/app/tools/verse/layout.tsx
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/i18n/metadata";
import { getLocale } from "@/lib/i18n/server";

// Root layout applies the "%s | Faith Companion AI" title template — no brand here.
// OG/Twitter titles are not run through the template, so carry the brand explicitly.
// Spanish targets "versículos de la Biblia" / "versículos para la ansiedad". The
// tool returns a fixed set of verses about worry and peace (it does not read the
// topic yet), so the Spanish copy promises exactly that.
const EN_DESCRIPTION =
  "Find the right Bible verse for any topic — peace, anxiety, hope, healing, grief, or guidance. Free, instant Scripture with references and encouragement.";
const ES_DESCRIPTION =
  "Versículos de la Biblia para la ansiedad y la preocupación, con el texto de la Reina-Valera 1909, una palabra de ánimo y un paso sencillo para hoy. Gratis.";

export function generateMetadata(): Metadata {
  return localizedMetadata("/tools/verse", getLocale(), {
    en: {
      title: "Bible Verse Generator for Any Need",
      description: EN_DESCRIPTION,
      ogTitle: "Bible Verse Generator for Any Need | Faith Companion AI",
      image: "/brand/og-quiz.png",
      imageAlt: "Faith Companion AI Verse",
      keywords: [
        "Bible verse generator",
        "AI Bible verse",
        "Scripture for anxiety",
        "daily Bible verse",
        "Christian encouragement",
        "Faith Companion AI verse",
        "Bible verses for peace",
        "Bible verses for healing",
      ],
    },
    es: {
      title: "Versículos de la Biblia para la ansiedad y la paz",
      description: ES_DESCRIPTION,
      ogTitle: "Versículos de la Biblia para la ansiedad y la paz | Faith Companion AI",
      image: "/brand/og-verse-es.png",
      imageAlt: "Versículos de la Biblia de Faith Companion AI",
      keywords: [
        "versículos de la Biblia",
        "versículos para la ansiedad",
        "versículos de paz",
        "versículos para la preocupación",
        "Reina-Valera 1909",
        "versículos de ánimo",
        "Faith Companion versículos",
      ],
    },
  });
}

export default function VerseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
