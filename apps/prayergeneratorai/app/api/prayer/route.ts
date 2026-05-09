import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const topic = String(body?.topic || "").trim();

    if (!topic) {
      return NextResponse.json(
        { error: "Please enter what you need prayer for." },
        { status: 400 }
      );
    }

    if (topic.length > 500) {
      return NextResponse.json(
        { error: "Please keep your prayer request under 500 characters." },
        { status: 400 }
      );
    }

    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5-mini",
      input: [
        {
          role: "system",
          content:
            "You write warm, reverent, non-denominational Christian prayers. Keep the tone comforting, sincere, and biblically respectful. Do not claim guaranteed outcomes. Do not provide medical, legal, financial, or emergency advice. Keep prayers concise but meaningful.",
        },
        {
          role: "user",
          content: `Write a personalized Christian prayer for this request: ${topic}`,
        },
      ],
    });

    const prayer =
      response.output_text?.trim() ||
      "Heavenly Father, please bring peace, strength, wisdom, and comfort in this situation. Amen.";

    return NextResponse.json({ prayer });
  } catch (error) {
    console.error("Prayer generation error:", error);

    return NextResponse.json(
      { error: "Something went wrong while generating your prayer." },
      { status: 500 }
    );
  }
}
