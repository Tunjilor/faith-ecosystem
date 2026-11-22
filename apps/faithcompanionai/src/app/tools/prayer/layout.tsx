// src/app/tools/prayer/layout.tsx
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/i18n/metadata";
import { getLocale } from "@/lib/i18n/server";

// Root layout applies the "%s | Faith Companion AI" title template — no brand here.
// OG/Twitter titles are not run through the template, so carry the brand explicitly.
// Spanish targets real searches ("generador de oraciones", "oraciones cristianas",
// "oración para...") rather than translating the English.
const EN_DESCRIPTION =
  "Get a personal, Scripture-grounded prayer in seconds — free and instant. AI prayer generator for peace, healing, strength, and any moment you face.";
const ES_DESCRIPTION =
  "Generador de oraciones cristianas gratis: recibe en segundos una oración personal con citas de la Biblia (RV1909) para la paz, la sanidad, la fortaleza o lo que estés viviendo.";

export function generateMetadata(): Metadata {
  return localizedMetadata("/tools/prayer", getLocale(), {
    en: {
      title: "AI Prayer Assistant & Generator",
      description: EN_DESCRIPTION,
      ogTitle: "AI Prayer Assistant & Generator | Faith Companion AI",
      image: "/brand/og-quiz.png",
      imageAlt: "Faith Companion AI Prayer",
      keywords: [
        "AI prayer generator",
        "Christian prayer app",
        "daily prayer online",
        "personalized Bible prayer",
        "Scripture-based prayer",
        "prayer for anxiety",
        "prayer for healing",
        "Faith Companion AI prayer",
      ],
    },
    es: {
      title: "Generador de oraciones cristianas gratis",
      description: ES_DESCRIPTION,
      ogTitle: "Generador de oraciones cristianas gratis | Faith Companion AI",
      image: "/brand/og-prayer-es.png",
      imageAlt: "Generador de oraciones de Faith Companion AI",
      keywords: [
        "generador de oraciones",
        "oraciones cristianas",
        "oración personalizada",
        "oración con la Biblia",
        "oración para la ansiedad",
        "oración de sanidad",
        "oración para pedir fortaleza",
        "Faith Companion oración",
      ],
    },
  });
}

export default function PrayerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
