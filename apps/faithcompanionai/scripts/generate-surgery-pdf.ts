/**
 * Generates the static printable prayer card at /public/downloads/prayer-before-surgery.pdf.
 *
 * Run with:  npx tsx scripts/generate-surgery-pdf.ts
 *
 * The output is committed to source control — this script only needs to be re-run
 * if the title, verses, or prayer for the surgery topic change. Content is mirrored
 * from the `prayer-before-surgery` entry in src/app/topics/data.ts.
 * Layout mirrors scripts/generate-grief-pdf.ts.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const TITLE = "A Prayer Before Surgery";
const SUBTITLE = "Scripture & a Prayer for the Operating Room";

const VERSES: Array<{ ref: string; text: string }> = [
  {
    ref: "Psalm 56:3 (WEB)",
    text: "When I am afraid, I will put my trust in you.",
  },
  {
    ref: "Psalm 23:4 (WEB)",
    text:
      "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me. Your rod and your staff, they comfort me.",
  },
  {
    ref: "Proverbs 3:5–6 (KJV)",
    text:
      "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
  },
  {
    ref: "Psalm 91:1–2 (KJV)",
    text:
      "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty. I will say of the LORD, He is my refuge and my fortress: my God; in him will I trust.",
  },
];

// Paragraphs are drawn with a small gap between them so the PDF matches the page layout.
const PRAYER_PARAGRAPHS = [
  "Father, surgery is coming, and I feel the weight of everything I cannot control. You know the fear sitting in my chest tonight — the unknowns, the waiting, and the what-ifs I keep turning over.",
  "Thank you that you will be in that operating room when I cannot be, steadying the hands of every doctor and nurse and watching over every moment. Quiet my racing thoughts, calm my body, and give me the kind of peace that does not depend on knowing the outcome.",
  "Whatever the result, help me trust that I am held by a God who is good and who never leaves. Into your hands I place this body, this day, and the people I love.",
  "Amen.",
];

const FOOTER = "faithcompanionai.com";

// Page geometry (US Letter).
const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN = 64;
const CONTENT_W = PAGE_W - MARGIN * 2;

const INK = rgb(0.13, 0.12, 0.15);
const MUTED = rgb(0.42, 0.42, 0.46);
const ACCENT = rgb(0.42, 0.18, 0.6); // brand purple
const RULE = rgb(0.85, 0.85, 0.88);

async function main() {
  const doc = await PDFDocument.create();
  doc.setTitle(`${TITLE} — Faith Companion AI`);
  doc.setAuthor("Faith Companion AI");
  doc.setSubject("A printable prayer card for before surgery");

  const body = await doc.embedFont(StandardFonts.TimesRoman);
  const italic = await doc.embedFont(StandardFonts.TimesRomanItalic);
  const bold = await doc.embedFont(StandardFonts.TimesRomanBold);

  let page = doc.addPage([PAGE_W, PAGE_H]);
  let y = PAGE_H - MARGIN;

  /** Word-wrap `text` to CONTENT_W (or a given width) and draw it, advancing `y`. */
  function drawWrapped(
    text: string,
    font: typeof body,
    size: number,
    lineHeight: number,
    color = INK,
    width = CONTENT_W,
    x = MARGIN,
  ) {
    const words = text.split(/\s+/);
    let line = "";
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(test, size) > width && line) {
        ensureSpace(lineHeight);
        page.drawText(line, { x, y, size, font, color });
        y -= lineHeight;
        line = word;
      } else {
        line = test;
      }
    }
    if (line) {
      ensureSpace(lineHeight);
      page.drawText(line, { x, y, size, font, color });
      y -= lineHeight;
    }
  }

  /** Add a fresh page if the next line wouldn't fit above the bottom margin. */
  function ensureSpace(lineHeight: number) {
    if (y - lineHeight < MARGIN + 28) {
      // A continued page gets its footer pinned to the bottom margin.
      drawFooter(MARGIN - 24);
      page = doc.addPage([PAGE_W, PAGE_H]);
      y = PAGE_H - MARGIN;
    }
  }

  function drawFooter(yPos: number) {
    const size = 9;
    const w = body.widthOfTextAtSize(FOOTER, size);
    page.drawText(FOOTER, { x: (PAGE_W - w) / 2, y: yPos, size, font: body, color: MUTED });
  }

  // Title
  const titleSize = 26;
  const titleW = bold.widthOfTextAtSize(TITLE, titleSize);
  page.drawText(TITLE, { x: (PAGE_W - titleW) / 2, y, size: titleSize, font: bold, color: INK });
  y -= 26;

  // Subtitle
  const subSize = 12;
  const subW = italic.widthOfTextAtSize(SUBTITLE, subSize);
  page.drawText(SUBTITLE, { x: (PAGE_W - subW) / 2, y, size: subSize, font: italic, color: MUTED });
  y -= 22;

  // Accent rule under the header
  page.drawLine({
    start: { x: PAGE_W / 2 - 40, y },
    end: { x: PAGE_W / 2 + 40, y },
    thickness: 2,
    color: ACCENT,
  });
  y -= 34;

  // Verses
  for (const v of VERSES) {
    ensureSpace(16);
    page.drawText(v.ref, { x: MARGIN, y, size: 11, font: bold, color: ACCENT });
    y -= 18;
    drawWrapped(`“${v.text}”`, italic, 12, 17);
    y -= 16;
  }

  // Divider before the prayer
  y -= 4;
  page.drawLine({
    start: { x: MARGIN, y },
    end: { x: PAGE_W - MARGIN, y },
    thickness: 0.75,
    color: RULE,
  });
  y -= 28;

  // Prayer heading
  ensureSpace(20);
  page.drawText("A Prayer", { x: MARGIN, y, size: 15, font: bold, color: INK });
  y -= 24;

  // Prayer body — one wrapped block per paragraph, with a small gap between them.
  PRAYER_PARAGRAPHS.forEach((para, i) => {
    drawWrapped(para, body, 12, 18);
    if (i < PRAYER_PARAGRAPHS.length - 1) y -= 8;
  });

  // Footer sits just below the prayer (a small, intentional gap), not at the page bottom.
  drawFooter(y - 6);

  const outDir = join(__dirname, "..", "public", "downloads");
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "prayer-before-surgery.pdf");
  const bytes = await doc.save();
  writeFileSync(outPath, bytes);
  console.log(`Wrote ${outPath} (${bytes.length} bytes, ${doc.getPageCount()} page(s))`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
