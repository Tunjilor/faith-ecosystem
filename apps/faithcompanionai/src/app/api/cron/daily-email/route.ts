// src/app/api/cron/daily-email/route.ts
//
// Runs hourly via Vercel Cron (vercel.json: "0 * * * *").
//
// Each daily run sends ONE general devotional (verse + short reflection +
// closing encouragement), generated once per day via the shared devotional
// generator (the same openai-ts path as /tools/devotional) using public-domain
// WEB/KJV scripture. The same body is mailed to every recipient that day —
// opted-in users (at their chosen local hour) and email-only leads (once/day at
// LEAD_EMAIL_HOUR_UTC). Only the per-recipient unsubscribe link differs.
//
// Generation is cached per day (one model call/day, reused on same-day re-runs);
// sends are guarded per (day, hour) so a re-run never double-mails. If
// generation fails or is empty, the run skips sending and logs it.
//
// Safety valve: set TEST_EMAIL_OVERRIDE to divert ALL daily devotional mail to
// that single address (one review email/day at LEAD_EMAIL_HOUR_UTC, or any time
// with ?force=1) so output can be reviewed before real subscribers receive it.

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendDevotionalEmail } from "@/lib/email";
import { generateDailyDevotional } from "@/lib/devotional";
import {
  makeUnsubscribeToken,
  makeLeadUnsubscribeToken,
  hourInTimezone,
  parseEmailHour,
} from "@/lib/email-prefs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type DailyEmailUser = {
  id: string;
  email: string;
  emailTime: string;
  emailTimezone: string;
};

type Recipient = {
  email: string;
  unsubscribeUrl: string;
  kind: "user" | "lead" | "test";
};

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const expected = process.env.CRON_SECRET;

    if (!expected) {
      return NextResponse.json({ ok: false, error: "CRON_SECRET not set" }, { status: 500 });
    }

    // Accept secret via Authorization header (Vercel cron) or ?secret= (manual testing)
    const authHeader = req.headers.get("authorization") ?? "";
    const querySecret = url.searchParams.get("secret") ?? "";
    const authorized =
      authHeader === `Bearer ${expected}` || querySecret === expected;

    if (!authorized) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const sessionSecret = process.env.SESSION_SECRET;
    if (!sessionSecret) {
      return NextResponse.json({ ok: false, error: "SESSION_SECRET not set" }, { status: 500 });
    }

    const now = new Date();
    const currentUtcHour = now.getUTCHours();
    const dayKey = now.toISOString().slice(0, 10); // "2025-04-20"
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://faithcompanionai.com";

    // Leads (no account) have no per-user send time → one daily send at a fixed UTC hour.
    const leadHour = Number.parseInt(process.env.LEAD_EMAIL_HOUR_UTC ?? "13", 10);
    const isLeadHour = currentUtcHour === leadHour;

    // ── Safety valve ────────────────────────────────────────────────────────
    const overrideTo = process.env.TEST_EMAIL_OVERRIDE?.trim();
    const testMode = !!overrideTo;
    const force = url.searchParams.get("force") === "1";

    // ── Build the recipient list + the per-run double-send guard key ─────────
    let recipients: Recipient[] = [];
    let sentGuardKey: string | null = null;

    if (testMode) {
      // Only ever mail the override address. Once/day at leadHour, or any time with ?force=1.
      if (!force && !isLeadHour) {
        return NextResponse.json({
          ok: true,
          sent: 0,
          testMode: true,
          reason: `test mode: review email sends at LEAD_EMAIL_HOUR_UTC (${leadHour}:00 UTC), or add ?force=1`,
          utcHour: currentUtcHour,
        });
      }
      const token = makeLeadUnsubscribeToken(overrideTo!, sessionSecret);
      recipients = [
        {
          email: overrideTo!,
          kind: "test",
          unsubscribeUrl: `${baseUrl}/api/email/unsubscribe?lead=${encodeURIComponent(
            overrideTo!
          )}&token=${token}`,
        },
      ];
      // ?force bypasses the guard so reviews can be re-triggered on demand.
      sentGuardKey = force ? null : `daily-devotional-sent:${dayKey}:test`;
    } else {
      // Opted-in users whose chosen local hour matches now.
      const users = await db.user.findMany({
        where: { emailOptIn: true },
        select: { id: true, email: true, emailTime: true, emailTimezone: true },
      });

      const due = (users as DailyEmailUser[]).filter((u) => {
        return hourInTimezone(now, u.emailTimezone) === parseEmailHour(u.emailTime);
      });

      for (const u of due) {
        const token = makeUnsubscribeToken(u.id, sessionSecret);
        recipients.push({
          email: u.email,
          kind: "user",
          unsubscribeUrl: `${baseUrl}/api/email/unsubscribe?uid=${u.id}&token=${token}`,
        });
      }

      // Leads, once/day at leadHour, deduped against opted-in user emails.
      if (isLeadHour) {
        const optedInEmails = new Set(
          (users as DailyEmailUser[]).map((u) => u.email.toLowerCase())
        );
        const leads = (await db.lead.findMany({
          select: { email: true },
        })) as Array<{ email: string }>;
        for (const l of leads) {
          if (optedInEmails.has(l.email.toLowerCase())) continue;
          const token = makeLeadUnsubscribeToken(l.email, sessionSecret);
          recipients.push({
            email: l.email,
            kind: "lead",
            unsubscribeUrl: `${baseUrl}/api/email/unsubscribe?lead=${encodeURIComponent(
              l.email
            )}&token=${token}`,
          });
        }
      }

      if (recipients.length === 0) {
        return NextResponse.json({
          ok: true,
          sent: 0,
          reason: "nothing due this hour",
          utcHour: currentUtcHour,
        });
      }

      sentGuardKey = `daily-devotional-sent:${dayKey}:${currentUtcHour}`;
    }

    // ── Idempotency: skip if this (day, hour) cohort was already sent ─────────
    if (sentGuardKey) {
      const alreadySent = await db.aiCache.findUnique({
        where: { cacheKey: sentGuardKey },
        select: { id: true },
      });
      if (alreadySent) {
        return NextResponse.json({
          ok: true,
          sent: 0,
          reason: "already sent this run",
          utcHour: currentUtcHour,
        });
      }
    }

    // ── Generate (or reuse) today's ONE general devotional ───────────────────
    const genKey = `daily-devotional:${dayKey}`;
    let body: string;

    const cached = await db.aiCache.findUnique({
      where: { cacheKey: genKey },
      select: { outputText: true },
    });

    if (cached) {
      body = cached.outputText;
    } else {
      try {
        body = await generateDailyDevotional();
      } catch (err) {
        console.error(`[daily-email] devotional generation failed for ${dayKey} — skipping send:`, err);
        return NextResponse.json(
          { ok: false, error: "generation_failed", sent: 0, dayKey },
          { status: 200 }
        );
      }

      if (!body) {
        console.error(`[daily-email] devotional generation returned empty for ${dayKey} — skipping send.`);
        return NextResponse.json(
          { ok: false, error: "generation_empty", sent: 0, dayKey },
          { status: 200 }
        );
      }

      // Store the day's devotional so it's visible and reused (no regeneration).
      await db.aiCache.create({
        data: {
          cacheKey: genKey,
          kind: "daily-devotional",
          translation: "",
          inputJson: JSON.stringify({ dayKey }),
          outputText: body,
        },
      });
    }

    // ── Send the shared body; per-recipient unsubscribe link ─────────────────
    const weekday = now.toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });
    const subject = `${weekday} devotional — Faith Companion AI`;

    let sent = 0;
    let failed = 0;

    for (const r of recipients) {
      try {
        await sendDevotionalEmail({
          to: r.email,
          subject,
          contentType: "devotional",
          contentText: body,
          unsubscribeUrl: r.unsubscribeUrl,
        });
        sent++;
      } catch (err) {
        console.error(`[daily-email] send failed for ${r.email}:`, err);
        failed++;
      }
    }

    // Mark this cohort sent (only when something succeeded, so a total failure can retry).
    if (sentGuardKey && sent > 0) {
      await db.aiCache
        .create({
          data: {
            cacheKey: sentGuardKey,
            kind: "daily-devotional-sent",
            translation: "",
            inputJson: JSON.stringify({
              dayKey,
              hour: currentUtcHour,
              testMode,
              recipients: recipients.length,
            }),
            outputText: `sent=${sent} failed=${failed}`,
          },
        })
        .catch(() => {});
    }

    return NextResponse.json({
      ok: true,
      sent,
      failed,
      testMode,
      forced: force && testMode,
      recipientCount: recipients.length,
      dayKey,
      utcHour: currentUtcHour,
    });
  } catch (err: any) {
    console.error("[daily-email] cron error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
