// src/app/api/prayer-requests/[id]/pray/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { claimWallPray, clientIp, consumeWallPrayLimit, isSameOrigin } from "@/lib/prayer-wall-rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Prisma cuid() ids: lowercase letters and digits.
const ID_RE = /^[a-z0-9]{20,40}$/;

const UNAVAILABLE = "Prayer counts are temporarily unavailable. Please try again later.";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
  }
  const id = params.id?.trim();
  if (!id) return NextResponse.json({ error: "Missing id." }, { status: 400 });
  if (!ID_RE.test(id)) return NextResponse.json({ error: "Invalid id." }, { status: 400 });

  try {
    // Existence check first, so unknown ids never write anything.
    const prayer = await db.prayerRequest.findUnique({ where: { id }, select: { id: true, prayCount: true } });
    if (!prayer) return NextResponse.json({ error: "Prayer not found." }, { status: 404 });

    const limit = await consumeWallPrayLimit(clientIp(req));
    if (!limit.ok) {
      return NextResponse.json(
        { error: "You've prayed for many requests this hour. Please try again later." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
      );
    }

    // Already counted today for this visitor, or the post reached today's cap:
    // return the current count without incrementing it.
    const claim = await claimWallPray(id, clientIp(req));
    if (claim !== "counted") {
      return NextResponse.json({ id: prayer.id, prayCount: prayer.prayCount });
    }

    const updated = await db.prayerRequest.update({
      where: { id },
      data: { prayCount: { increment: 1 } },
      select: { id: true, prayCount: true },
    });
    return NextResponse.json({ id: updated.id, prayCount: updated.prayCount });
  } catch (err: any) {
    if (err?.code === "P2025") {
      return NextResponse.json({ error: "Prayer not found." }, { status: 404 });
    }
    // Never report an increment that did not happen. Error details are not logged.
    console.error("[prayer-wall] prayer count unavailable");
    return NextResponse.json({ error: UNAVAILABLE }, { status: 503 });
  }
}
