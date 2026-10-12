// src/lib/contact-rate-limit.ts
import crypto from "crypto";
import { db } from "@/lib/db";

// Fixed-window limits for the public contact form. Counters live in Postgres
// (the existing AiUsage table) so every serverless instance shares them.
// Keys are namespaced with "contact:" and never collide with the AI quota keys
// ("uid:", "guest:", "anon_"), which are always looked up by their own userKey.
export const CONTACT_LIMIT_PER_IP_HOUR = 3; // per IP per UTC hour
// All senders per UTC day. Resend's plan allows 100 emails/day shared with
// sign-in links, password resets and devotionals, so contact mail is capped well below it.
export const CONTACT_LIMIT_GLOBAL_DAY = 20;

const HASH_DOMAIN = "contact-rate-limit";

export class ContactRateLimitUnavailable extends Error {}

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

// Raw IPs are never stored. The window is part of the keyed hash, so rows from
// different hours cannot be linked to the same visitor, and the domain prefix keeps
// this hash distinct from every other use of SESSION_SECRET.
function hashIp(secret: string, window: string, ip: string) {
  return crypto
    .createHmac("sha256", secret)
    .update(`${HASH_DOMAIN}|${window}|${ip}`)
    .digest("hex")
    .slice(0, 32);
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

export type ContactRateLimitResult =
  | { ok: true }
  | { ok: false; scope: "ip" | "global"; retryAfterSeconds: number };

// Throws ContactRateLimitUnavailable when it cannot run safely (no secret) and lets
// database errors propagate — callers must fail closed in both cases.
export async function consumeContactRateLimit(ip: string, now = new Date()): Promise<ContactRateLimitResult> {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new ContactRateLimitUnavailable("SESSION_SECRET is not set");
  }

  const hour = hourWindow(now);
  const ipCount = await increment(`contact:${hour}`, `contact:ip:${hashIp(secret, hour, ip)}`);
  if (ipCount > CONTACT_LIMIT_PER_IP_HOUR) {
    return { ok: false, scope: "ip", retryAfterSeconds: secondsUntilNextHour(now) };
  }

  const globalCount = await increment(`contact:${dayWindow(now)}`, "contact:global");
  if (globalCount > CONTACT_LIMIT_GLOBAL_DAY) {
    return { ok: false, scope: "global", retryAfterSeconds: secondsUntilNextDay(now) };
  }

  return { ok: true };
}
