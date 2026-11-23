// src/app/tools/devotional/layout.tsx
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/i18n/metadata";
import { getLocale } from "@/lib/i18n/server";

// Root layout applies the "%s | Faith Companion AI" title template — no brand here.
// OG/Twitter titles are not run through the template, so carry the brand explicitly.
// Spanish targets "devocional diario" / "devocional cristiano".
const EN_DESCRIPTION =
  "Generate a personalized Christian devotional with Scripture, reflection, prayer, and action steps. Free AI devotional app for daily spiritual growth.";
const ES_DESCRIPTION =
  "Devocional diario cristiano hecho para ti: citas de la Biblia (RV1909), una reflexión, una oración y pasos de acción para hoy. Gratis y en segundos.";

export function generateMetadata(): Metadata {
  return localizedMetadata("/tools/devotional", getLocale(), {
    en: {
      title: "Daily Devotional Generator",
      description: EN_DESCRIPTION,
      ogTitle: "Daily Devotional Generator | Faith Companion AI",
      image: "/brand/og-quiz.png",
      imageAlt: "Faith Companion AI Devotional",
      keywords: [
        "Christian devotional app",
        "AI devotional generator",
        "daily devotional online",
        "Bible devotional",
        "Christian devotional app",
        "Scripture reflection",
        "daily Bible study",
        "Faith Companion AI devotional",
      ],
    },
    es: {
      title: "Devocional diario cristiano personalizado",
      description: ES_DESCRIPTION,
      ogTitle: "Devocional diario cristiano personalizado | Faith Companion AI",
      image: "/brand/og-devotional-es.png",
      imageAlt: "Devocional diario de Faith Companion AI",
      keywords: [
        "devocional diario",
        "devocional cristiano",
        "devocional para hoy",
        "reflexión bíblica",
        "devocional con la Biblia",
        "oración y reflexión diaria",
        "Faith Companion devocional",
      ],
    },
  });
}

export default function DevotionalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
