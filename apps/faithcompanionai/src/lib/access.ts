// src/lib/access.ts
import { cache } from "react";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { sha256, dayKeyUTC } from "@/lib/hash";
import { readSessionToken, sessionCookieName } from "@/lib/session";
import { ensureGuestCookie, actorKeyForGuest } from "@/lib/guest";

type SessionPayload = {
  uid: string;
  exp: number;
};

type SessionUser = {
  id: string;
  email: string;
};

// Abuse/cost guard for AI requests. Applies to every actor (signed-in or guest).
const DAILY_AI_LIMIT = 500;

function makeHttpError(
  message: string,
  status: number,
  code?: string
): Error & { status: number; code?: string } {
  const err = new Error(message) as Error & { status: number; code?: string };
  err.status = status;
  err.code = code;
  return err;
}

function quotaError(message: string) {
  return makeHttpError(message, 429, "LIMIT_REACHED");
}

function authError(message = "Unauthorized") {
  return makeHttpError(message, 401, "UNAUTHORIZED");
}

/**
 * Reads fc_session, verifies it, returns DB user or null.
 * Wrapped in React cache() so multiple callers within one server render
 * (e.g. a page and a nested server component) share a single DB lookup.
 */
export const getUserFromSession = cache(async (): Promise<SessionUser | null> => {
  const secret = process.env.SESSION_SECRET;
  if (!secret) return null;

  const token = cookies().get(sessionCookieName())?.value;
  if (!token) return null;

  const payload = readSessionToken<SessionPayload>(token, secret);
  if (!payload) return null;
  if (Date.now() > payload.exp) return null;

  const user = await db.user.findUnique({
    where: { id: payload.uid },
    select: {
      id: true,
      email: true,
    },
  });

  return user ?? null;
});

export async function requireUserFromSession() {
  const user = await getUserFromSession();
  if (!user) {
    throw authError("You must be signed in.");
  }
  return user;
}

/**
 * Daily AI usage limiter by hashed actor key.
 */
async function enforceDailyLimitOrThrow(userKey: string) {
  const dayKey = dayKeyUTC();

  const existing = await db.aiUsage.findUnique({
    where: { dayKey_userKey: { dayKey, userKey } },
  });

  if ((existing?.count ?? 0) >= DAILY_AI_LIMIT) {
    throw quotaError("Daily limit reached. Please try again tomorrow.");
  }

  await db.aiUsage.upsert({
    where: { dayKey_userKey: { dayKey, userKey } },
    update: { count: { increment: 1 } },
    create: { dayKey, userKey, count: 1 },
  });
}

/**
 * Ask quota enforcement: every actor (signed-in user or guest) gets the
 * same generous daily limit.
 */
export async function enforceAskQuotaFromSessionOrThrow() {
  const user = await getUserFromSession();
  if (user) {
    await enforceDailyLimitOrThrow(`uid:${sha256(user.id)}`);
    return { kind: "user" } as const;
  }

  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is missing.");
  }

  const cookieStore = cookies();
  const guest = ensureGuestCookie(cookieStore as any, secret);
  await enforceDailyLimitOrThrow(actorKeyForGuest(guest.id));

  return { kind: "guest" } as const;
}
