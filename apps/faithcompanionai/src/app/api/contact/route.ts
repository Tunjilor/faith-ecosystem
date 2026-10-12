// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";
import { consumeContactRateLimit } from "@/lib/contact-rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPPORT_EMAIL = "support@faithcompanionai.com";
const MAX_BODY_BYTES = 16 * 1024;
const MIN_FILL_MS = 3000; // humans take longer than this to fill in four fields

const LIMITS = {
  name: { min: 1, max: 100 },
  email: { min: 3, max: 254 },
  subject: { min: 3, max: 150 },
  message: { min: 10, max: 5000 },
} as const;

type Field = keyof typeof LIMITS;

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]+$/;

function fail(status: number, error: string, extra?: Record<string, unknown>, headers?: HeadersInit) {
  return NextResponse.json({ ok: false, error, supportEmail: SUPPORT_EMAIL, ...extra }, { status, headers });
}

// Single-line fields: collapse CR/LF and other control characters so nothing can
// break out of an email header.
function singleLine(v: unknown) {
  return typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim() : "";
}

// Message body: keep newlines and tabs, drop other control characters.
function multiLine(v: unknown) {
  return typeof v === "string"
    ? v.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim()
    : "";
}

function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  try {
    return !!host && new URL(origin).host === host;
  } catch {
    return false;
  }
}

function clientIp(req: Request) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

export async function POST(req: Request) {
  // 1. Only accept same-site JSON submissions from the contact page.
  if (!sameOrigin(req)) {
    return fail(403, "Request not allowed.");
  }
  if (!(req.headers.get("content-type") || "").toLowerCase().includes("application/json")) {
    return fail(415, "Unsupported request format.");
  }

  // 2. Size limit before parsing.
  const declared = Number(req.headers.get("content-length") || 0);
  if (declared > MAX_BODY_BYTES) {
    return fail(413, "Your message is too long.");
  }
  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return fail(400, "Invalid request.");
  }
  if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
    return fail(413, "Your message is too long.");
  }

  let body: Record<string, unknown>;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    body = parsed as Record<string, unknown>;
  } catch {
    return fail(400, "Invalid request.");
  }

  // 3. Bot checks. A filled honeypot gets a quiet success and nothing is sent.
  if (singleLine(body.fc_hp)) {
    return NextResponse.json({ ok: true });
  }
  const elapsedMs = Number(body.elapsedMs);
  if (!Number.isFinite(elapsedMs) || elapsedMs < MIN_FILL_MS) {
    return fail(400, "That was quick! Please take a moment and try again.");
  }

  // 4. Validation.
  const values: Record<Field, string> = {
    name: singleLine(body.name),
    email: singleLine(body.email).toLowerCase(),
    subject: singleLine(body.subject),
    message: multiLine(body.message),
  };

  const fields: Partial<Record<Field, string>> = {};
  for (const key of Object.keys(LIMITS) as Field[]) {
    const { min, max } = LIMITS[key];
    const len = values[key].length;
    if (len === 0) fields[key] = "This field is required.";
    else if (len < min) fields[key] = `Please enter at least ${min} characters.`;
    else if (len > max) fields[key] = `Please keep this under ${max} characters.`;
  }
  if (!fields.email && !EMAIL_RE.test(values.email)) {
    fields.email = "Please enter a valid email address.";
  }
  if (Object.keys(fields).length) {
    return fail(400, "Please check the highlighted fields.", { fields });
  }

  // 5. Rate limit (shared across instances). Fail closed — and never send — if the
  //    limiter can't run (missing SESSION_SECRET or database unavailable).
  try {
    const limit = await consumeContactRateLimit(clientIp(req));
    if (!limit.ok) {
      return fail(
        429,
        "Too many messages have been sent. Please try again later or email us directly.",
        undefined,
        { "Retry-After": String(limit.retryAfterSeconds) }
      );
    }
  } catch {
    console.error("[contact] rate limiter unavailable");
    return fail(503, "The contact form is temporarily unavailable. Please email us directly.");
  }

  // 6. Send. Success is only reported once the provider has accepted the message.
  const result = await sendContactEmail(values);
  if (!result.ok) {
    return fail(502, "We couldn't send your message right now. Please email us directly.");
  }

  return NextResponse.json({ ok: true });
}
