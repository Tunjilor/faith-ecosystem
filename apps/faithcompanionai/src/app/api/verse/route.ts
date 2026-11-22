//src/app/api/verse/route.ts

import { NextResponse } from "next/server";
import { parseLocaleField } from "@/lib/i18n/reply-language";
import { fetchRv1909, parseBibleReference } from "@/lib/i18n/scripture-es";

export const runtime = "nodejs";

// SIMPLE deterministic output (no OpenAI here). The Spanish version uses the
// same references with RV1909 book names and the verse text from bible-api.com
// (translation=rv1909); no verse text is ever translated or written by AI.
const VERSES = [
  "Philippians 4:6-7",
  "Matthew 6:34",
  "1 Peter 5:7",
  "Psalm 94:19",
  "Isaiah 41:10",
];

const TEXT = {
  en: {
    encouragement: {
      long: "Trust God with your worries. He cares deeply for you and invites you to rest in His peace, even when life feels overwhelming.",
      short: "Trust God with your worries; He cares for you.",
    },
    nextStep: {
      long: "Take 5–10 minutes today to pray honestly. Give each worry to God and ask for His peace to guard your heart.",
      short: "Spend a few minutes in prayer, giving your anxiety to God.",
    },
  },
  es: {
    encouragement: {
      long: "Confía tus preocupaciones a Dios. Él cuida de ti con amor y te invita a descansar en su paz, aun cuando la vida se siente abrumadora.",
      short: "Confía tus preocupaciones a Dios; Él cuida de ti.",
    },
    nextStep: {
      long: "Dedica hoy de 5 a 10 minutos a orar con sinceridad. Entrégale a Dios cada preocupación y pídele que su paz guarde tu corazón.",
      short: "Dedica unos minutos a orar y entrégale a Dios tu ansiedad.",
    },
  },
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const length = body?.length === "long" ? "long" : "short";
    const localeField = parseLocaleField(body?.locale);
    if (!localeField.ok) {
      return NextResponse.json({ error: localeField.error }, { status: 400 });
    }
    const locale = localeField.locale;
    const text = TEXT[locale];

    if (locale === "en") {
      return NextResponse.json({
        verses: VERSES,
        encouragement: text.encouragement[length],
        nextStep: text.nextStep[length],
      });
    }

    const refs = VERSES.map((v) => parseBibleReference(v)).filter((r) => r !== null);
    const cards = (await Promise.all(refs.map((r) => fetchRv1909(r)))).filter((c) => c !== null);
    if (cards.length === 0) {
      return NextResponse.json(
        { error: "No se pudo cargar el texto de la Biblia. Inténtalo de nuevo." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      // Spanish references (RV1909 book names) and their RV1909 text.
      verses: cards.map((c) => c.reference),
      verseCards: cards.map((c) => ({ reference: c.reference, text: c.text })),
      encouragement: text.encouragement[length],
      nextStep: text.nextStep[length],
    });
  } catch (err) {
    console.error("Verse error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
