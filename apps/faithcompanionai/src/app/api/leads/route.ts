// src/app/api/leads/route.ts
//
// Email capture for the daily devotional (EmailCaptureBanner). Uses the shared
// `db` client from lib/db (Neon cold-start timeouts) plus withDbRetry, because
// the database scales to zero after 5 idle minutes and most signups arrive
// while it is asleep. Failures are logged so a lost signup is never silent.
import { NextResponse } from "next/server";
import { db, withDbRetry } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let email = "";
  let source: string | null = null;

  try {
    const body = await req.json().catch(() => null);

    email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    source =
      typeof body?.source === "string" && body.source.trim()
        ? body.source.trim().slice(0, 100)
        : null;

    await withDbRetry(() =>
      db.lead.upsert({
        where: { email },
        update: { ...(source ? { source } : {}) },
        create: { email, ...(source ? { source } : {}) },
      })
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[leads] failed to save lead", { email, source }, err);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
