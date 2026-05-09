import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type VerseResult = {
  reference: string;
  verse: string;
  reflection: string;
};

const fallbackDb: VerseResult[] = [
  {
    reference: "Philippians 4:6-7",
    verse:
      "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
    reflection:
      "God invites you to trade your anxiety for His peace. You don't have to carry this alone — bring every worry to Him through prayer and He will guard your heart with a peace beyond understanding.",
  },
  {
    reference: "Isaiah 41:10",
    verse:
      "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
    reflection:
      "Fear can feel overwhelming, but God's presence is stronger. He doesn't just say 'don't be afraid' — He promises to be with you, strengthen you, and hold you up.",
  },
  {
    reference: "Jeremiah 29:11",
    verse:
      "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.",
    reflection:
      "Whatever you're going through, God has not forgotten you. His plans for your life are good, full of hope and a meaningful future — trust Him even when the path is unclear.",
  },
  {
    reference: "Romans 8:28",
    verse:
      "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    reflection:
      "Even painful seasons have purpose in God's hands. He is working all things — even the hardest moments — together for your good.",
  },
  {
    reference: "Psalm 46:1",
    verse: "God is our refuge and strength, an ever-present help in trouble.",
    reflection:
      "No matter what storm you face, God is your safe place. He is always present, always ready to help — you can run to Him right now.",
  },
  {
    reference: "Matthew 11:28-30",
    verse:
      "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls.",
    reflection:
      "Jesus personally invites the weary and worn out. You don't need to have it together to come to Him — He promises rest for your soul.",
  },
  {
    reference: "Psalm 34:18",
    verse:
      "The LORD is close to the brokenhearted and saves those who are crushed in spirit.",
    reflection:
      "When your heart is broken, God draws closest to you. He sees your pain and comes near — you are not alone in this.",
  },
  {
    reference: "1 Peter 5:7",
    verse: "Cast all your anxiety on him because he cares for you.",
    reflection:
      "God doesn't want you to carry your worries alone. He genuinely cares about you — hand every concern over to Him and receive His peace.",
  },
  {
    reference: "Proverbs 3:5-6",
    verse:
      "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reflection:
      "When life feels confusing, God offers guidance. Step back from trying to figure it all out on your own and place your trust in Him — He will clear the path ahead.",
  },
  {
    reference: "Philippians 4:13",
    verse: "I can do all this through him who gives me strength.",
    reflection:
      "The strength you need isn't something you have to manufacture yourself. Through Christ, you have access to an inexhaustible source of power — for whatever you're facing today.",
  },
];

function getFallback(topic: string): VerseResult {
  const lower = topic.toLowerCase();
  const keywords: Record<string, number> = {
    anxiet: 0,
    worry: 0,
    stress: 0,
    fear: 1,
    afraid: 1,
    scared: 1,
    hope: 2,
    future: 2,
    plan: 2,
    purpose: 3,
    good: 3,
    refuge: 4,
    strength: 4,
    strong: 9,
    tired: 5,
    weary: 5,
    rest: 5,
    broken: 6,
    grief: 6,
    sad: 6,
    depress: 6,
    cast: 7,
    anxious: 0,
    trust: 8,
    guidance: 8,
    direct: 8,
    power: 9,
  };

  for (const [kw, idx] of Object.entries(keywords)) {
    if (lower.includes(kw)) return fallbackDb[idx];
  }
  return fallbackDb[Math.floor(Math.random() * fallbackDb.length)];
}

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();
    if (!topic?.trim()) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(getFallback(topic));
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a compassionate biblical counselor. Always respond with valid JSON only — no markdown, no extra text.",
          },
          {
            role: "user",
            content: `Find a comforting, relevant Bible verse for someone experiencing: "${topic}"\n\nReturn ONLY this JSON (no markdown):\n{\n  "reference": "Book Chapter:Verse",\n  "verse": "The complete verse text",\n  "reflection": "2-3 warm, encouraging sentences connecting this verse to their specific situation"\n}`,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 450,
      }),
    });

    if (!res.ok) return NextResponse.json(getFallback(topic));

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) return NextResponse.json(getFallback(topic));

    const result: VerseResult = JSON.parse(content);
    if (!result.reference || !result.verse || !result.reflection) {
      return NextResponse.json(getFallback(topic));
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(getFallback("general"));
  }
}
