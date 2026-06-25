# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository shape

This is a **multi-app monorepo with no root tooling** — there is no root `package.json`, workspace config, or shared build. Each directory under `apps/` is a fully independent Next.js project with its own `package.json`, `node_modules`, lockfile, and Vercel project. Always `cd` into the specific app before running any command. The apps are not linked at build time; they only reference each other by production URL (cross-promotion links).

Four apps:

| App | Stack | Role |
| --- | --- | --- |
| `apps/faithcompanionai` | Next **14.2.35**, React 18, Tailwind **v3**, Prisma + Postgres, Stripe, OpenAI, Resend | Flagship product: accounts, premium subscriptions, Bible quiz, prayer wall, daily email. The complex app. |
| `apps/prayergeneratorai` | Next **16.2.4**, React 19, Tailwind **v4** | AI prayer generator. Uses OpenAI + Resend (email-a-prayer). |
| `apps/bibleversegeneratorai` | Next 16.2.4, React 19, Tailwind v4 | Bible-verse landing pages + OG images. |
| `apps/tithecalculatorai` | Next 16.2.4, React 19, Tailwind v4 | Tithe calculator + OG images. |

The three lightweight apps are mostly **programmatic-SEO landing pages**: one `app/<topic>/page.tsx` per topic, a small `lib/*-page-metadata.ts` driving them, and `app/api/og/route.tsx` for social images. When adding a topic, follow the existing sibling page exactly.

> Note: the three Next 16 apps carry an `AGENTS.md` warning that Next 16 has breaking changes vs. older training data. Consult `node_modules/next/dist/docs/` in that app before writing framework code there. `faithcompanionai` is on Next 14 and does **not** share this caveat.

## Commands (run from inside an app directory)

All apps:
```bash
npm run dev        # next dev
npm run build      # next build
npm run lint       # eslint
```

`faithcompanionai` only — it has Prisma and a richer toolchain:
```bash
npm run typecheck          # tsc --noEmit
npm run prisma:validate    # prisma validate
npm run predeploy          # lint + typecheck + prisma:validate + build  (run this before deploying)
npm run seed               # tsx prisma/seed.ts
npm run studio             # prisma studio
npm run seed:ai            # tsx scripts/seed-questions.ts  (generates quiz questions via OpenAI)

# Admin one-offs (tsx scripts/*.ts):
npm run admin:make-premium
npm run admin:revoke-premium
npm run admin:reset-attempts
npm run admin:count-questions
```
There is no test runner in any app. `predeploy` is the de-facto gate for `faithcompanionai`. `build` there runs `prisma generate` first (also wired into `postinstall`).

## faithcompanionai architecture

App Router under `src/app`. Business logic lives in `src/lib`; pages/routes stay thin.

- **Database** — Prisma + PostgreSQL (Neon serverless), ~19 models in `prisma/schema.prisma` (User, Subscription, QuizAttempt, SavedItem, UserStreak, PrayerRequest, referrals, email prefs, etc.). Schema changes require a migration in `prisma/migrations/`. The Prisma client is a global singleton; **import `db` from `@/lib/db`** (`lib/db.ts` appends Neon pooling params — `connection_limit=1` etc. — to `DATABASE_URL`). `lib/prisma.ts` is an older, simpler duplicate of the same singleton; prefer `lib/db.ts`.
- **Auth is custom — there is no NextAuth.** Sessions are stateless HMAC-signed cookies (`fc_session`) implemented in `lib/session.ts` (`createSessionToken` / `readSessionToken`, SHA-256 HMAC over a base64url payload, `timingSafeEqual`). Login paths: password (bcryptjs, `lib/hash.ts`) and email magic links (`lib/magicLink.ts`, routes under `api/auth/`). Anonymous users get a guest cookie (`lib/guest.ts`).
- **Premium / quotas** — `lib/premium.ts` is the gatekeeper. It resolves the current actor (session user or guest), checks `isPremium`/`premiumUntil`, and enforces per-day usage limits, throwing typed HTTP errors (`status` + `code`, e.g. 401 `UNAUTHORIZED`, 429 `LIMIT_REACHED`). Route handlers translate these into responses. Premium is granted via Stripe.
- **Stripe** — checkout in `api/auth/stripe/`, fulfillment via the webhook at `api/webhooks/stripe/route.ts` (writes `Subscription` rows and flips `User.isPremium`). `lib/stripe.ts` holds the client.
- **Cron jobs** — declared in `vercel.json`, implemented under `api/cron/` (`daily-email` hourly, `premium-expiry-reminder`, plus `neon-warm` / retention jobs). Email via Resend (`lib/email.ts`, `lib/email-prefs.ts`).
- **OpenAI** — quiz generation and assistant features. Note three overlapping helpers exist (`lib/openai.ts`, `lib/openai-text.ts`, `lib/openai-ts.ts`, and `lib/ai/openai.ts`); check which a feature already uses before adding a new one.
- **OG / share images** — generated with the Next `ImageResponse` route runtime (`api/og/*`, `opengraph-image.tsx`). Standalone PDF/icon generators live in `scripts/` (pdf-lib, sharp).
- **Client state** — `src/context/UserContext.tsx` plus `src/hooks/useMe.ts` / `usePremium.ts` for reading auth/premium state in client components.

## Conventions

- TypeScript path alias `@/*` → `src/*` (faithcompanionai). The lightweight apps import relatively / from their `lib/`.
- API route handlers set `export const runtime = "nodejs"` and usually `export const dynamic = "force-dynamic"` — keep this on routes that read cookies, the DB, or env at request time.
- Conventional commits, scoped to the app, e.g. `chore(faithcompanionai): ...`.
