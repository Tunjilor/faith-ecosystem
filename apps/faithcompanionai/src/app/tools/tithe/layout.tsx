// src/app/tools/tithe/layout.tsx
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/i18n/metadata";
import { getLocale } from "@/lib/i18n/server";

// Titles go through the root "%s | Faith Companion AI" template, so no brand
// here. OG/Twitter titles skip the template and carry the brand explicitly.
// Spanish targets real search terms ("calculadora de diezmo", "cómo calcular
// el diezmo", "cuánto es el diezmo") rather than translating the English.
const EN_DESCRIPTION =
  "Free tithe calculator: enter your income and pay period to see your tithe — weekly, monthly, or yearly, gross or net, at any percentage. Simple and clear.";
const ES_DESCRIPTION =
  "Calculadora de diezmo gratis: calcula el 10% de tu salario por semana, mes o año, sobre ingresos brutos o netos. Aprende cómo calcular el diezmo con ejemplos.";

export function generateMetadata(): Metadata {
  return localizedMetadata("/tools/tithe", getLocale(), {
    en: {
      title: "Tithe Calculator – 10% of Any Income",
      description: EN_DESCRIPTION,
      ogTitle: "Tithe Calculator – 10% of Any Income | Faith Companion AI",
      image: "/brand/og-tithe.png",
      imageAlt: "Faith Companion AI Tithe Calculator",
      keywords: [
        "tithe calculator",
        "tithing calculator",
        "calculate tithe",
        "10 percent of income",
        "how much should I tithe",
        "gross or net tithe",
        "Christian giving calculator",
        "Faith Companion tithe",
      ],
    },
    es: {
      title: "Calculadora de Diezmo – 10% de tus ingresos",
      description: ES_DESCRIPTION,
      ogTitle: "Calculadora de Diezmo – 10% de tus ingresos | Faith Companion AI",
      image: "/brand/og-tithe-es.png",
      imageAlt: "Calculadora de diezmo de Faith Companion AI",
      keywords: [
        "calculadora de diezmo",
        "cómo calcular el diezmo",
        "cuánto es el diezmo",
        "diezmo del 10%",
        "calcular diezmo mensual",
        "diezmo sobre ingresos brutos o netos",
        "diezmo y ofrenda",
        "Faith Companion diezmo",
      ],
    },
  });
}

export default function TitheLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
