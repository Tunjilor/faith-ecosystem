// src/app/api/prayer-requests/route.ts
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cleanWallText, findContactDetail } from "@/lib/prayer-wall-content";
import { clientIp, consumeWallPostLimit, isSameOrigin } from "@/lib/prayer-wall-rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const prayers = await db.prayerRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      select: { id: true, name: true, text: true, prayCount: true, createdAt: true },
    });
    return NextResponse.json({ prayers });
  } catch (err) {
    console.error("GET /api/prayer-requests error:", err);
    return NextResponse.json({ error: "Failed to load prayers." }, { status: 500 });
  }
}

const MAX_BODY_BYTES = 4 * 1024;
const MIN_FILL_MS = 3000; // humans take longer than this to write a request
const TEXT_MIN = 5;
const TEXT_MAX = 200;
const NAME_MAX = 50;

function fail(status: number, error: string, headers?: HeadersInit) {
  return NextResponse.json({ error }, { status, headers });
}

export async function POST(req: Request) {
  // 1. Only same-site JSON submissions from the Prayer Wall page.
  if (!isSameOrigin(req)) return fail(403, "Request not allowed.");
  if (!(req.headers.get("content-type") || "").toLowerCase().includes("application/json")) {
    return fail(415, "Unsupported request format.");
  }

  // 2. Size limit before parsing.
  if (Number(req.headers.get("content-length") || 0) > MAX_BODY_BYTES) {
    return fail(413, "Your prayer request is too long.");
  }
  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return fail(400, "Invalid request.");
  }
  if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
    return fail(413, "Your prayer request is too long.");
  }

  let body: Record<string, unknown>;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    body = parsed as Record<string, unknown>;
  } catch {
    return fail(400, "Invalid request.");
  }

  // 3. Bot checks. A filled honeypot gets a normal-looking reply and nothing is stored.
  if (typeof body.fc_hp === "string" && body.fc_hp.trim()) {
    return NextResponse.json(
      { prayer: { id: randomUUID(), name: null, text: "", prayCount: 0, createdAt: new Date().toISOString() } },
      { status: 201 }
    );
  }
  if (body.elapsedMs === undefined) {
    return fail(400, "Please refresh the page and try again.");
  }
  const elapsedMs = Number(body.elapsedMs);
  if (!Number.isFinite(elapsedMs) || elapsedMs < MIN_FILL_MS) {
    return fail(400, "That was quick! Please take a moment and try again.");
  }

  // 4. Validation. Over-length input is rejected, never silently cut short.
  const text = typeof body.text === "string" ? cleanWallText(body.text) : "";
  if (text.length < TEXT_MIN) {
    return fail(400, "Prayer request must be at least 5 characters.");
  }
  if (text.length > TEXT_MAX) {
    return fail(400, `Prayer requests can be up to ${TEXT_MAX} characters.`);
  }
  if (body.name !== undefined && body.name !== null && typeof body.name !== "string") {
    return fail(400, "Invalid request.");
  }
  const name = typeof body.name === "string" ? cleanWallText(body.name) : "";
  if (name.length > NAME_MAX) {
    return fail(400, `Names can be up to ${NAME_MAX} characters.`);
  }
  if (findContactDetail(text) || (name && findContactDetail(name))) {
    return fail(400, "Please remove links, email addresses and phone numbers — prayer requests are public.");
  }

  // 5. Rate limit (shared across instances). Fail closed if it can't run safely.
  try {
    const limit = await consumeWallPostLimit(clientIp(req));
    if (!limit.ok) {
      return fail(
        429,
        limit.scope === "ip"
          ? "You've shared several prayer requests recently. Please try again later."
          : "The Prayer Wall has reached today's limit for new requests. Please try again tomorrow.",
        { "Retry-After": String(limit.retryAfterSeconds) }
      );
    }
  } catch {
    console.error("[prayer-wall] rate limiter unavailable");
    return fail(503, "The Prayer Wall is temporarily unavailable. Please try again later.");
  }

  // 6. Store. Error details are not logged — they can echo the submitted text.
  try {
    const prayer = await db.prayerRequest.create({
      data: { text, name: name || null },
      select: { id: true, name: true, text: true, prayCount: true, createdAt: true },
    });
    return NextResponse.json({ prayer }, { status: 201 });
  } catch {
    console.error("[prayer-wall] failed to store prayer request");
    return fail(500, "Failed to submit prayer.");
  }
}
