/**
 * Generates the static printable prayer card at /public/downloads/prayer-for-grief.pdf.
 *
 * Run with:  npx tsx scripts/generate-grief-pdf.ts
 *
 * The output is committed to source control — this script only needs to be re-run
 * if the title, verses, or prayer for the grief topic change. Content is mirrored
 * from the `bible-verses-for-grief` entry in src/app/topics/data.ts.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const TITLE = "A Prayer for Grief";
const SUBTITLE = "Bible Verses & a Prayer for the Brokenhearted";

const VERSES: Array<{ ref: string; text: string }> = [
  {
    ref: "Psalm 34:18 (KJV)",
    text:
      "The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.",
  },
  {
    ref: "Matthew 5:4 (WEB)",
    text: "Blessed are those who mourn, for they shall be comforted.",
  },
  {
    ref: "Revelation 21:4 (WEB)",
    text:
      "He will wipe away every tear from their eyes. Death will be no more; neither will there be mourning, nor crying, nor pain any more, for the first things have passed away.",
  },
  {
    ref: "Psalm 147:3 (WEB)",
    text: "He heals the broken in heart, and binds up their wounds.",
  },
];

const PRAYER =
  "Father, I am grieving, and some days the weight of it is almost more than I can carry. You know who I've lost and the exact shape of this empty space — the conversations that won't happen, the ordinary moments I keep reaching for out of habit. Thank you that you are near to the brokenhearted and that you keep track of every one of my tears. Comfort me in the places no one else can reach, and don't let me feel ashamed of how long this is taking. Hold the hope in front of me that death does not get the final word, and that what is hidden in you is never truly lost. Until that day, be my comfort and my strength, one ordinary morning at a time. Amen.";

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
  doc.setSubject("A printable prayer card for grief and loss");

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

  // Prayer body
  drawWrapped(PRAYER, body, 12, 18);

  // Footer sits just below the prayer (a small, intentional gap), not at the page bottom.
  drawFooter(y - 6);

  const outDir = join(__dirname, "..", "public", "downloads");
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "prayer-for-grief.pdf");
  const bytes = await doc.save();
  writeFileSync(outPath, bytes);
  console.log(`Wrote ${outPath} (${bytes.length} bytes, ${doc.getPageCount()} page(s))`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
