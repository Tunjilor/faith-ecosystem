// src/lib/daily-devotionals.ts
//
// Read side of the daily devotional: the cron (/api/cron/daily-email) writes
// one AiCache row per day with cacheKey "daily-devotional:YYYY-MM-DD". These
// helpers power the public /daily pages and the /daily/feed.xml RSS feed that
// social auto-posting tools (Zapier, Make) watch.

import { db, withDbRetry } from "@/lib/db";
import { parseDevotional, extractReference, type DevotionalParts } from "@/lib/devotional-format";

export const SITE_URL = "https://faithcompanionai.com";
const KEY_PREFIX = "daily-devotional:";

export type DailyDevotional = {
  /** UTC day the devotional was written for, "YYYY-MM-DD". */
  day: string;
  text: string;
  parts: DevotionalParts | null;
  reference: string;
  createdAt: Date;
};

export function isDayKey(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

/** "Friday, October 30, 2026" (UTC, so the date never shifts by timezone). */
export function formatDay(day: string, style: "long" | "short" = "long"): string {
  return new Date(`${day}T12:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    ...(style === "long"
      ? { weekday: "long", month: "long", day: "numeric", year: "numeric" }
      : { month: "short", day: "numeric", year: "numeric" }),
  });
}

function toDevotional(row: { cacheKey: string; outputText: string; reference: string | null; createdAt: Date }): DailyDevotional {
  const parts = parseDevotional(row.outputText);
  return {
    day: row.cacheKey.slice(KEY_PREFIX.length),
    text: row.outputText,
    parts,
    reference: row.reference || parts?.reference || extractReference(row.outputText),
    createdAt: row.createdAt,
  };
}

export async function getDevotionalForDay(day: string): Promise<DailyDevotional | null> {
  if (!isDayKey(day)) return null;
  const row = (await withDbRetry(() =>
    db.aiCache.findUnique({
      where: { cacheKey: `${KEY_PREFIX}${day}` },
      select: { cacheKey: true, outputText: true, reference: true, createdAt: true },
    })
  )) as { cacheKey: string; outputText: string; reference: string | null; createdAt: Date } | null;
  return row ? toDevotional(row) : null;
}

export async function getRecentDevotionals(limit = 30): Promise<DailyDevotional[]> {
  const rows = (await withDbRetry(() =>
    db.aiCache.findMany({
      where: { kind: "daily-devotional", cacheKey: { startsWith: KEY_PREFIX } },
      select: { cacheKey: true, outputText: true, reference: true, createdAt: true },
      orderBy: { cacheKey: "desc" },
      take: limit,
    })
  )) as Array<{ cacheKey: string; outputText: string; reference: string | null; createdAt: Date }>;
  return rows.map(toDevotional);
}

/** Plain-text post body for social media: verse, reflection, closing line, call to action. */
export function socialPostText(d: DailyDevotional): string {
  const link = `${SITE_URL}/daily/${d.day}`;
  const body = d.parts
    ? `“${d.parts.verse}” — ${d.parts.reference}\n\n${d.parts.reflection}${
        d.parts.encouragement ? `\n\n${d.parts.encouragement}` : ""
      }`
    : d.text;
  // The link sits mid-text, not at the end: Facebook hides a trailing URL once it
  // turns it into a preview card, which left a dangling "every morning:".
  return `${body}\n\nGet a free devotional like this in your inbox every morning:\n${link}\n\nTap the link to sign up. It's free.`;
}
