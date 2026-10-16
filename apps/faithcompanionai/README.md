// initial production deploy

# Faith Companion AI

Faith Companion AI is a Next.js + Prisma application providing Bible-based quizzes, scripture guidance, and faith tools.

---

## Tech Stack

- Next.js 14 (App Router)
- Prisma ORM
- SQLite (local development)
- PostgreSQL (production – Vercel / Neon)
- TypeScript

---

# 🚀 DAILY DEVELOPMENT WORKFLOW (DEV)

### Terminal A (Next.js App)
```bash
cd C:\dev\faithcompanionai
npm run dev
App runs at: http://localhost:3000

Terminal B (Database / Admin)
cd C:\dev\faithcompanionai
npm run studio
Prisma Studio: http://localhost:5555

One-time (or when DB changes)
npm run seed
Seeds quiz questions into local SQLite database

🧠 ADMIN SCRIPTS (LOCAL OR PROD)
Admin scripts are never exposed to users.

npm run admin:count-questions
npm run admin:reset-attempts -- user@example.com
🔐 ENVIRONMENT SETUP
Local (.env.local)
DATABASE_URL="file:./prisma/dev.db"

SESSION_SECRET=some-long-random-string
Production (Vercel)
DATABASE_URL → PostgreSQL (Neon)

NEVER use file: in production

SESSION_SECRET required

🧪 PRE-DEPLOY CHECKLIST (RUN BEFORE PUSH)
npm run predeploy
This runs:

ESLint

TypeScript checks

Prisma validation

Production build

✅ If this passes, deployment is safe.

🚢 PRODUCTION DEPLOYMENT (VERCEL)
Push to main

Vercel auto-builds and deploys

Verify production env variables

Confirm database is PostgreSQL

🔄 ROLLBACK PLAN (IMPORTANT)
If production breaks:

Go to Vercel → Project → Deployments

Find last known good deployment

Click ⋯ → Promote to Production

Rollback is instant.

⚠️ Never rollback if the newer deploy ran incompatible DB migrations.

🔒 PRODUCTION SAFETY RULES
SQLite never allowed in production

Admin routes require secret token

AI usage rate-limited daily per user/guest

🧭 TROUBLESHOOTING RULES
If something feels “off”:

Stop (Ctrl+C) and restart npm run dev

Confirm correct port (3000 vs 3001)

Confirm DATABASE_URL

Check Prisma Studio for data

Re-run npm run seed if needed

✅ STATUS
Local dev: ✅ stable

Seeding: ✅ stable

API routes: ✅ working

Ready for production when PostgreSQL is connected

🙏 Built with intention and care.


---





