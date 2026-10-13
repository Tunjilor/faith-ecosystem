// src/lib/prayer-wall-rate-limit.ts
import crypto from "crypto";
import { db } from "@/lib/db";

// Fixed-window limits for the public Prayer Wall. Counters live in Postgres (the
// existing AiUsage table) so every serverless instance shares them. Every key starts
// with "wall:" and never collides with the AI quota keys or the "contact:" keys.
export const WALL_POSTS_PER_IP_HOUR = 3; // accepted posts per IP per UTC hour
export const WALL_POSTS_GLOBAL_DAY = 30; // accepted posts site-wide per UTC day
export const WALL_PRAYS_PER_IP_HOUR = 30; // "I'm praying" requests per IP per UTC hour
export const WALL_PRAYS_PER_POST_DAY = 500; // newly recorded prayers per post per UTC day

export class WallRateLimitUnavailable extends Error {}

// Request guards shared by the Prayer Wall routes (same rules as /api/contact).
// Browsers always send Origin on POST, so a missing or foreign Origin is refused.
export function isSameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  try {
    return !!host && new URL(origin).host === host;
  } catch {
    return false;
  }
}

// Vercel overwrites x-forwarded-for at its edge, so the first entry is the real client.
export function clientIp(req: Request) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

function hourWindow(d: Date) {
  return d.toISOString().slice(0, 13); // "2026-10-12T20"
}

function dayWindow(d: Date) {
  return d.toISOString().slice(0, 10); // "2026-10-12"
}

function secondsUntilNextHour(d: Date) {
  return 3600 - (d.getUTCMinutes() * 60 + d.getUTCSeconds());
}

function secondsUntilNextDay(d: Date) {
  return 86400 - (d.getUTCHours() * 3600 + d.getUTCMinutes() * 60 + d.getUTCSeconds());
}

function requireSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new WallRateLimitUnavailable("SESSION_SECRET is not set");
  return secret;
}

// IPv6 visitors are grouped by their /64 network — one device can rotate through many
// addresses inside it. IPv4 (and IPv4-mapped IPv6) addresses are used as-is.
export function ipBucket(ip: string) {
  const s = ip.trim().toLowerCase().replace(/^\[|\]$/g, "").replace(/%.*$/, "");
  const mapped = s.match(/^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/);
  if (mapped) return mapped[1];
  if (!s.includes(":")) return s;
  const groups = expandIpv6(s);
  if (!groups) return s; // not a valid IPv6 address — bucket it as given
  return groups.slice(0, 4).join(":") + "::/64";
}

// "2001:db8::1" → ["2001", "db8", "0", "0", "0", "0", "0", "1"], or null if invalid.
function expandIpv6(s: string): string[] | null {
  const halves = s.split("::");
  if (halves.length > 2) return null;
  const split = (h: string) => (h ? h.split(":") : []);
  const head = split(halves[0]);
  const tail = halves.length === 2 ? split(halves[1]) : [];
  // A trailing embedded IPv4 address ("64:ff9b::1.2.3.4") counts as two groups.
  const lastSide = tail.length ? tail : head;
  const v4 = lastSide.length ? lastSide[lastSide.length - 1].match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/) : null;
  if (v4) {
    if ([v4[1], v4[2], v4[3], v4[4]].some((o) => +o > 255)) return null;
    lastSide.splice(-1, 1, ((+v4[1] << 8) | +v4[2]).toString(16), ((+v4[3] << 8) | +v4[4]).toString(16));
  }
  const fill = halves.length === 2 ? 8 - head.length - tail.length : 0;
  if (halves.length === 2 ? fill < 1 : head.length !== 8) return null;
  const groups = [...head, ...Array(fill).fill("0"), ...tail];
  if (!groups.every((g) => /^[0-9a-f]{1,4}$/.test(g))) return null;
  return groups.map((g) => g.replace(/^0+(?=.)/, ""));
}

// Raw IPs are never stored. Each hash is keyed with SESSION_SECRET, includes its time
// window, and carries a purpose prefix distinct from every other use of the secret.
function hash(secret: string, parts: string[]) {
  return crypto.createHmac("sha256", secret).update(["prayer-wall", ...parts].join("|")).digest("hex").slice(0, 32);
}

async function increment(dayKey: string, userKey: string) {
  // Single unique-key upsert with an atomic increment (native INSERT … ON CONFLICT
  // on Postgres); returns the post-increment count.
  const row = await db.aiUsage.upsert({
    where: { dayKey_userKey: { dayKey, userKey } },
    update: { count: { increment: 1 } },
    create: { dayKey, userKey, count: 1 },
    select: { count: true },
  });
  return row.count;
}

export type WallLimitResult =
  | { ok: true }
  | { ok: false; scope: "ip" | "global"; retryAfterSeconds: number };

// Throws WallRateLimitUnavailable without a secret and lets database errors propagate —
// callers must fail closed in both cases.
export async function consumeWallPostLimit(ip: string, now = new Date()): Promise<WallLimitResult> {
  const secret = requireSecret();
  const hour = hourWindow(now);
  const ipCount = await increment(`wall:post:${hour}`, `wall:post:ip:${hash(secret, ["post", hour, ipBucket(ip)])}`);
  if (ipCount > WALL_POSTS_PER_IP_HOUR) {
    return { ok: false, scope: "ip", retryAfterSeconds: secondsUntilNextHour(now) };
  }
  const globalCount = await increment(`wall:post:${dayWindow(now)}`, "wall:post:global");
  if (globalCount > WALL_POSTS_GLOBAL_DAY) {
    return { ok: false, scope: "global", retryAfterSeconds: secondsUntilNextDay(now) };
  }
  return { ok: true };
}

export async function consumeWallPrayLimit(ip: string, now = new Date()): Promise<WallLimitResult> {
  const secret = requireSecret();
  const hour = hourWindow(now);
  const count = await increment(`wall:pray:${hour}`, `wall:pray:ip:${hash(secret, ["pray", hour, ipBucket(ip)])}`);
  if (count > WALL_PRAYS_PER_IP_HOUR) {
    return { ok: false, scope: "ip", retryAfterSeconds: secondsUntilNextHour(now) };
  }
  return { ok: true };
}

// Decides whether one "I'm praying" request may add to a post's count today. Each step
// is a single atomic statement, so concurrent requests can neither count the same
// visitor twice nor push a post past its daily cap:
//   1. INSERT … ON CONFLICT DO NOTHING on a once-per-visitor-per-post-per-day marker —
//      exactly one of any concurrent duplicates inserts it.
//   2. Atomic increment of the post's daily counter — concurrent requests each receive
//      a distinct count, so at most WALL_PRAYS_PER_POST_DAY are allowed.
// A failure after step 1 can only under-count (the marker stays), never double-count.
export async function claimWallPray(
  prayerId: string,
  ip: string,
  now = new Date()
): Promise<"counted" | "duplicate" | "capped"> {
  const secret = requireSecret();
  const day = dayWindow(now);
  const marker = await db.aiUsage.createMany({
    data: [{ dayKey: `wall:pray:${day}`, userKey: `wall:pray:once:${hash(secret, ["once", day, prayerId, ipBucket(ip)])}`, count: 1 }],
    skipDuplicates: true,
  });
  if (marker.count === 0) return "duplicate";
  const postCount = await increment(`wall:pray:${day}`, `wall:pray:post:${prayerId}`);
  if (postCount > WALL_PRAYS_PER_POST_DAY) return "capped";
  return "counted";
}
