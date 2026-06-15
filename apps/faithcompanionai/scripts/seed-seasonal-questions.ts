// scripts/seed-seasonal-questions.ts
//
// ADDITIVE seed for the three seasonal quiz categories: christmas, thanksgiving, new-year.
//
// Unlike prisma/seed.ts, this script NEVER deletes anything. It only inserts the 36
// seasonal questions that are not already present, leaving completely untouched:
//   • every existing question (general / women / parables / theology / history)
//   • all AI-generated questions accumulated in the question bank (ai / theology / history)
//   • all quiz attempts and attempt history (quizAttempt / quizAttemptQuestion)
//   • all seen-question tracking (quizSeenQuestion)
//
// The 36 questions below mirror the seasonal entries in prisma/seed.ts — keep them in sync.
// They are NOT imported from prisma/seed.ts on purpose: importing that file would execute
// its top-level main(), which performs a destructive deleteMany() reset.
//
// Idempotency note: the Question table has no unique constraint, so Prisma's
// `skipDuplicates` cannot detect duplicates on its own (Postgres needs a unique index to
// skip via ON CONFLICT). This script therefore filters out questions whose (category, prompt)
// already exists BEFORE inserting, so re-running it never creates duplicate rows.
// `skipDuplicates: true` is kept as a harmless second layer of defense.
//
// Run with:  npx tsx scripts/seed-seasonal-questions.ts --confirm

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env") });
config({ path: resolve(process.cwd(), ".env.local"), override: true });
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({ log: ["error"] });

const SEASONAL_CATEGORIES = ["christmas", "thanksgiving", "new-year"] as const;
type SeasonalCategory = (typeof SEASONAL_CATEGORIES)[number];

interface SeasonalQuestion {
  category: SeasonalCategory;
  prompt: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: "A" | "B" | "C" | "D";
  explanation: string;
}

const QUESTIONS: SeasonalQuestion[] = [
  // ─── Christmas & the Nativity (12 questions) ────────────────────────────────
  {
    category: "christmas",
    prompt: "In which town was Jesus born?",
    optionA: "Nazareth",
    optionB: "Jerusalem",
    optionC: "Bethlehem",
    optionD: "Capernaum",
    answer: "C",
    explanation: "Jesus was born in Bethlehem, fulfilling the prophecy of Micah 5:2 (Luke 2:4–7).",
  },
  {
    category: "christmas",
    prompt: "Which angel announced to Mary that she would give birth to Jesus?",
    optionA: "Michael",
    optionB: "Gabriel",
    optionC: "Raphael",
    optionD: "An unnamed angel",
    answer: "B",
    explanation: "The angel Gabriel was sent by God to Mary in Nazareth (Luke 1:26–31).",
  },
  {
    category: "christmas",
    prompt: "Why did Mary and Joseph travel to Bethlehem before Jesus was born?",
    optionA: "To flee from King Herod",
    optionB: "For a Roman census and registration",
    optionC: "To celebrate the Passover",
    optionD: "To present an offering at the temple",
    answer: "B",
    explanation: "Caesar Augustus decreed a census, so Joseph went to Bethlehem, the city of David, to be registered (Luke 2:1–5).",
  },
  {
    category: "christmas",
    prompt: "Where did Mary lay the newborn Jesus?",
    optionA: "In a cradle",
    optionB: "In a woven basket",
    optionC: "In a manger",
    optionD: "On a bed of straw in the inn",
    answer: "C",
    explanation: "She wrapped him in swaddling clothes and laid him in a manger, because there was no room in the inn (Luke 2:7).",
  },
  {
    category: "christmas",
    prompt: "To whom did the angel first announce the birth of Jesus?",
    optionA: "The wise men",
    optionB: "Shepherds keeping watch over their flocks",
    optionC: "King Herod",
    optionD: "The temple priests",
    answer: "B",
    explanation: "An angel of the Lord announced the good news to shepherds abiding in the fields by night (Luke 2:8–11).",
  },
  {
    category: "christmas",
    prompt: "What sign did the angel give the shepherds to identify the baby?",
    optionA: "A bright star over the stable",
    optionB: "A babe wrapped in swaddling clothes, lying in a manger",
    optionC: "A choir of angels at the door",
    optionD: "A crown upon the child",
    answer: "B",
    explanation: "The sign was: 'Ye shall find the babe wrapped in swaddling clothes, lying in a manger' (Luke 2:12).",
  },
  {
    category: "christmas",
    prompt: "What did the multitude of the heavenly host say after the angel's announcement?",
    optionA: "Hosanna in the highest",
    optionB: "Glory to God in the highest, and on earth peace, good will toward men",
    optionC: "Worthy is the Lamb that was slain",
    optionD: "He is risen, as he said",
    answer: "B",
    explanation: "The angels praised God saying, 'Glory to God in the highest, and on earth peace, good will toward men' (Luke 2:13–14).",
  },
  {
    category: "christmas",
    prompt: "According to Matthew, what led the wise men to seek the newborn king?",
    optionA: "A dream from God",
    optionB: "A letter from the prophets",
    optionC: "A star they saw in the east",
    optionD: "A visit from an angel",
    answer: "C",
    explanation: "The wise men followed a star they had seen in the east, which led them toward the child (Matthew 2:1–2, 9).",
  },
  {
    category: "christmas",
    prompt: "What three gifts did the wise men present to Jesus?",
    optionA: "Gold, frankincense, and myrrh",
    optionB: "Gold, silver, and bronze",
    optionC: "Bread, wine, and oil",
    optionD: "Spices, linen, and myrrh",
    answer: "A",
    explanation: "They opened their treasures and presented gold, frankincense, and myrrh (Matthew 2:11).",
  },
  {
    category: "christmas",
    prompt: "What did the angel tell Joseph to name the child, and why?",
    optionA: "John, for he would prepare the way",
    optionB: "Jesus, for he would save his people from their sins",
    optionC: "Israel, for he would reign over the nation",
    optionD: "Messiah, for he was the anointed one",
    answer: "B",
    explanation: "'Thou shalt call his name JESUS: for he shall save his people from their sins' (Matthew 1:21).",
  },
  {
    category: "christmas",
    prompt: "The name 'Emmanuel,' applied to Jesus, means what?",
    optionA: "Prince of Peace",
    optionB: "God with us",
    optionC: "Mighty God",
    optionD: "The Anointed One",
    answer: "B",
    explanation: "Matthew 1:23 cites Isaiah 7:14: 'they shall call his name Emmanuel, which being interpreted is, God with us.'",
  },
  {
    category: "christmas",
    prompt: "Who sang the song of praise beginning 'My soul doth magnify the Lord'?",
    optionA: "Elizabeth",
    optionB: "Anna the prophetess",
    optionC: "Mary",
    optionD: "Miriam",
    answer: "C",
    explanation: "Mary sang this song, known as the Magnificat, while visiting Elizabeth (Luke 1:46–47).",
  },

  // ─── Thanksgiving & Gratitude (12 questions) ────────────────────────────────
  {
    category: "thanksgiving",
    prompt: "According to Psalm 100:4, how are we to enter his gates?",
    optionA: "With singing",
    optionB: "With thanksgiving",
    optionC: "With sacrifices",
    optionD: "With fasting",
    answer: "B",
    explanation: "'Enter into his gates with thanksgiving, and into his courts with praise' (Psalm 100:4).",
  },
  {
    category: "thanksgiving",
    prompt: "Complete 1 Thessalonians 5:18: 'In every thing give thanks: for this is the ___ of God in Christ Jesus concerning you.'",
    optionA: "love",
    optionB: "will",
    optionC: "grace",
    optionD: "peace",
    answer: "B",
    explanation: "'...for this is the will of God in Christ Jesus concerning you' (1 Thessalonians 5:18).",
  },
  {
    category: "thanksgiving",
    prompt: "When Jesus healed ten lepers, how many returned to thank him?",
    optionA: "All ten",
    optionB: "Five",
    optionC: "Three",
    optionD: "One",
    answer: "D",
    explanation: "Only one of the ten returned to glorify God and give thanks (Luke 17:15–17).",
  },
  {
    category: "thanksgiving",
    prompt: "What was notable about the one leper who returned to thank Jesus?",
    optionA: "He was a priest",
    optionB: "He was a Samaritan",
    optionC: "He was a child",
    optionD: "He was a Roman soldier",
    answer: "B",
    explanation: "The one who returned to give thanks was a Samaritan — a foreigner (Luke 17:16).",
  },
  {
    category: "thanksgiving",
    prompt: "According to James 1:17, every good and perfect gift comes down from whom?",
    optionA: "The Son of Man",
    optionB: "The Father of lights",
    optionC: "The Spirit of truth",
    optionD: "The King of kings",
    answer: "B",
    explanation: "'Every good gift and every perfect gift is from above, and cometh down from the Father of lights' (James 1:17).",
  },
  {
    category: "thanksgiving",
    prompt: "Philippians 4:6 says to make our requests known to God by prayer and supplication with what?",
    optionA: "Fasting",
    optionB: "Boldness",
    optionC: "Thanksgiving",
    optionD: "Patience",
    answer: "C",
    explanation: "'...by prayer and supplication with thanksgiving let your requests be made known unto God' (Philippians 4:6).",
  },
  {
    category: "thanksgiving",
    prompt: "Which Israelite feast celebrated the ingathering of the harvest?",
    optionA: "The Passover",
    optionB: "The Feast of Tabernacles (Booths)",
    optionC: "The Feast of Purim",
    optionD: "The Day of Atonement",
    answer: "B",
    explanation: "The Feast of Tabernacles, also called the feast of ingathering, celebrated the gathering of the harvest (Exodus 23:16; Leviticus 23:34–43).",
  },
  {
    category: "thanksgiving",
    prompt: "Before feeding the multitude with the loaves, what did Jesus do?",
    optionA: "He blessed the crowd",
    optionB: "He gave thanks",
    optionC: "He prayed for rain",
    optionD: "He fasted",
    answer: "B",
    explanation: "'And Jesus took the loaves; and when he had given thanks, he distributed to the disciples' (John 6:11).",
  },
  {
    category: "thanksgiving",
    prompt: "Complete Psalm 107:1: 'O give thanks unto the LORD; for he is good: for his ___ endureth for ever.'",
    optionA: "glory",
    optionB: "mercy",
    optionC: "word",
    optionD: "power",
    answer: "B",
    explanation: "'...for his mercy endureth for ever' (Psalm 107:1).",
  },
  {
    category: "thanksgiving",
    prompt: "Despite a royal decree against prayer, how often did Daniel kneel to pray and give thanks?",
    optionA: "Once a day",
    optionB: "Twice a day",
    optionC: "Three times a day",
    optionD: "Seven times a day",
    answer: "C",
    explanation: "Daniel kneeled and prayed, giving thanks three times a day, as he had always done (Daniel 6:10).",
  },
  {
    category: "thanksgiving",
    prompt: "Colossians 3:17 says whatever we do in word or deed, to do all in the name of the Lord Jesus, doing what?",
    optionA: "Giving thanks to God",
    optionB: "Keeping the law",
    optionC: "Seeking a reward",
    optionD: "Fearing judgment",
    answer: "A",
    explanation: "'...do all in the name of the Lord Jesus, giving thanks to God and the Father by him' (Colossians 3:17).",
  },
  {
    category: "thanksgiving",
    prompt: "Who appointed Levites to give thanks to the LORD when the ark was brought to Jerusalem?",
    optionA: "Moses",
    optionB: "David",
    optionC: "Solomon",
    optionD: "Samuel",
    answer: "B",
    explanation: "David appointed Levites to thank the LORD, singing 'O give thanks unto the LORD; for he is good' (1 Chronicles 16:4–8, 34).",
  },

  // ─── New Year & New Beginnings (12 questions) ───────────────────────────────
  {
    category: "new-year",
    prompt: "According to Lamentations 3:22–23, how often are the LORD's mercies new?",
    optionA: "Every year",
    optionB: "Every morning",
    optionC: "Every Sabbath",
    optionD: "Every hour",
    answer: "B",
    explanation: "'They are new every morning: great is thy faithfulness' (Lamentations 3:23).",
  },
  {
    category: "new-year",
    prompt: "Complete 2 Corinthians 5:17: 'If any man be in Christ, he is a new ___.'",
    optionA: "spirit",
    optionB: "creature",
    optionC: "heart",
    optionD: "name",
    answer: "B",
    explanation: "'...he is a new creature: old things are passed away; behold, all things are become new' (2 Corinthians 5:17).",
  },
  {
    category: "new-year",
    prompt: "In Isaiah 43:19 God says, 'I will do a new thing... I will even make a way in the wilderness, and ___ in the desert.'",
    optionA: "rivers",
    optionB: "gardens",
    optionC: "cities",
    optionD: "roads",
    answer: "A",
    explanation: "'...I will even make a way in the wilderness, and rivers in the desert' (Isaiah 43:19).",
  },
  {
    category: "new-year",
    prompt: "In Revelation 21:5, what does the one seated on the throne declare?",
    optionA: "It is finished",
    optionB: "Behold, I make all things new",
    optionC: "I am Alpha and Omega",
    optionD: "Come, follow me",
    answer: "B",
    explanation: "'And he that sat upon the throne said, Behold, I make all things new' (Revelation 21:5).",
  },
  {
    category: "new-year",
    prompt: "Jeremiah 29:11 says God's thoughts toward us are thoughts of peace, and not of what?",
    optionA: "fear",
    optionB: "evil",
    optionC: "judgment",
    optionD: "sorrow",
    answer: "B",
    explanation: "'...thoughts of peace, and not of evil, to give you an expected end' (Jeremiah 29:11).",
  },
  {
    category: "new-year",
    prompt: "In Philippians 3:13, what does Paul do with 'those things which are behind'?",
    optionA: "Treasures them",
    optionB: "Records them",
    optionC: "Forgets them",
    optionD: "Mourns them",
    answer: "C",
    explanation: "'...forgetting those things which are behind, and reaching forth unto those things which are before' (Philippians 3:13).",
  },
  {
    category: "new-year",
    prompt: "What did God repeatedly command Joshua as he prepared to lead Israel into the Promised Land?",
    optionA: "Be strong and of a good courage",
    optionB: "Fear the LORD only",
    optionC: "Remember the Sabbath",
    optionD: "Love thy neighbour",
    answer: "A",
    explanation: "'Be strong and of a good courage... for the LORD thy God is with thee whithersoever thou goest' (Joshua 1:9).",
  },
  {
    category: "new-year",
    prompt: "Complete Proverbs 3:6: 'In all thy ways acknowledge him, and he shall direct thy ___.'",
    optionA: "steps",
    optionB: "paths",
    optionC: "plans",
    optionD: "heart",
    answer: "B",
    explanation: "'In all thy ways acknowledge him, and he shall direct thy paths' (Proverbs 3:6).",
  },
  {
    category: "new-year",
    prompt: "According to Isaiah 40:31, those who wait upon the LORD shall renew their what?",
    optionA: "faith",
    optionB: "strength",
    optionC: "joy",
    optionD: "vision",
    answer: "B",
    explanation: "'...they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles' (Isaiah 40:31).",
  },
  {
    category: "new-year",
    prompt: "How does the Bible begin in Genesis 1:1?",
    optionA: "In the beginning was the Word",
    optionB: "In the beginning God created the heaven and the earth",
    optionC: "Hear, O Israel: The LORD our God is one LORD",
    optionD: "Blessed is the man that walketh not in the counsel of the ungodly",
    answer: "B",
    explanation: "'In the beginning God created the heaven and the earth' (Genesis 1:1).",
  },
  {
    category: "new-year",
    prompt: "Psalm 121:8 promises the LORD will preserve your going out and coming in for how long?",
    optionA: "For this day only",
    optionB: "From this time forth, and even for evermore",
    optionC: "Until the morning",
    optionD: "Throughout the new year",
    answer: "B",
    explanation: "'The LORD shall preserve thy going out and thy coming in from this time forth, and even for evermore' (Psalm 121:8).",
  },
  {
    category: "new-year",
    prompt: "Who succeeded Moses to lead Israel into the Promised Land — a new chapter for the nation?",
    optionA: "Aaron",
    optionB: "Caleb",
    optionC: "Joshua",
    optionD: "Gideon",
    answer: "C",
    explanation: "After Moses died, Joshua led Israel across the Jordan into the Promised Land (Joshua 1:1–2).",
  },
];

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// Retry wrapper for transient Neon cold-start / connection errors (mirrors scripts/seed-questions.ts).
async function withDbRetry<T>(fn: () => Promise<T>, attempts = 4): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      await db.$queryRaw`SELECT 1`;
      return await fn();
    } catch (err: any) {
      lastErr = err;
      const msg = err?.message ?? "";
      const retryable =
        msg.includes("Can't reach database") ||
        msg.includes("Connection refused") ||
        msg.includes("P1001") ||
        msg.includes("closed");
      if (!retryable || i === attempts - 1) throw err;
      console.log(`  ↻ DB connection lost — retrying in 3s (attempt ${i + 2}/${attempts})`);
      await sleep(3000);
    }
  }
  throw lastErr;
}

// Print the target DB host (credentials stripped) so the operator can confirm where this writes.
function describeTarget(): string {
  const raw = process.env.DATABASE_URL;
  if (!raw) return "(DATABASE_URL not set)";
  try {
    const u = new URL(raw);
    const dbName = u.pathname.replace(/^\//, "");
    return `${u.host}/${dbName}`;
  } catch {
    return "(unparseable DATABASE_URL)";
  }
}

async function main() {
  // ── Safety guard: refuse to run without --confirm ───────────────────────────
  if (!process.argv.includes("--confirm")) {
    console.error(
      [
        "",
        "✋ Refusing to run without --confirm.",
        "",
        "This script ADDS the 36 seasonal quiz questions (christmas / thanksgiving / new-year)",
        "to the question bank. It performs NO deletes and leaves all existing questions,",
        "AI-generated questions, attempt history, and seen-question tracking untouched.",
        "",
        `It will write to: ${describeTarget()}`,
        "(Set by DATABASE_URL — make sure this is the database you intend.)",
        "",
        "To proceed, re-run with the --confirm flag:",
        "",
        "    npx tsx scripts/seed-seasonal-questions.ts --confirm",
        "",
      ].join("\n")
    );
    process.exit(1);
  }

  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL is not set. Check your .env / .env.local file or shell environment.");
    process.exit(1);
  }

  console.log(`\n🎄 Additive seasonal seed — target DB: ${describeTarget()}\n`);

  // Sanity check on the inline data: exactly 36 questions, 12 per category.
  const byCat = SEASONAL_CATEGORIES.map((cat) => ({
    cat,
    count: QUESTIONS.filter((q) => q.category === cat).length,
  }));
  console.log("  Inline question set:");
  for (const { cat, count } of byCat) console.log(`    ${cat.padEnd(12)}: ${count}`);

  let totalInserted = 0;
  let totalSkipped = 0;

  for (const category of SEASONAL_CATEGORIES) {
    const all = QUESTIONS.filter((q) => q.category === category);

    // Read existing prompts for this category so we only insert what isn't already there.
    // (The Question table has no unique constraint, so we must dedupe in app code — see header.)
    const existing = await withDbRetry(() =>
      db.question.findMany({
        where: { category },
        select: { prompt: true },
      })
    );
    const existingPrompts = new Set(existing.map((q) => q.prompt.trim()));

    const toInsert = all.filter((q) => !existingPrompts.has(q.prompt.trim()));
    const skipped = all.length - toInsert.length;
    totalSkipped += skipped;

    if (toInsert.length === 0) {
      console.log(`\n  [${category}] all ${all.length} already present — nothing to insert.`);
      continue;
    }

    console.log(
      `\n  [${category}] inserting ${toInsert.length} new (${skipped} already present, ${existing.length} total in category)...`
    );

    const result = await withDbRetry(() =>
      db.question.createMany({
        data: toInsert.map((q) => ({
          category: q.category,
          prompt: q.prompt.trim(),
          optionA: q.optionA.trim(),
          optionB: q.optionB.trim(),
          optionC: q.optionC.trim(),
          optionD: q.optionD.trim(),
          answer: q.answer,
          explanation: q.explanation.trim(),
        })),
        skipDuplicates: true,
      })
    );

    totalInserted += result.count;
    console.log(`  ✓ Inserted ${result.count}.`);
  }

  // Final report (read-only) — counts for the seasonal categories only.
  const totals = await withDbRetry(() =>
    db.question.groupBy({ by: ["category"], _count: { id: true } })
  );
  console.log("\n✅ Done. No existing data was modified or deleted.");
  console.log(`   Inserted this run: ${totalInserted}   |   Already present (skipped): ${totalSkipped}\n`);
  console.log("   Seasonal categories now in database:");
  for (const category of SEASONAL_CATEGORIES) {
    const row = totals.find((t) => t.category === category);
    console.log(`     ${category.padEnd(12)}: ${row?._count.id ?? 0}`);
  }
}

main()
  .catch((err) => {
    console.error("\n❌ Script failed:", err?.message ?? err);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
