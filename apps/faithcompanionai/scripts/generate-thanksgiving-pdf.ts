/**
 * Generates the static printable prayer card at /public/downloads/prayer-for-thanksgiving.pdf.
 *
 * Run with:  npx tsx scripts/generate-thanksgiving-pdf.ts
 *
 * The output is committed to source control — this script only needs to be re-run
 * if the title, verses, or prayer for the thanksgiving topic change. Content is
 * mirrored from the `thanksgiving` entry in src/app/topics/data.ts.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const TITLE = "A Thanksgiving Prayer";
const SUBTITLE = "Bible Verses & a Prayer of Thanks";

const VERSES: Array<{ ref: string; text: string }> = [
  {
    ref: "Psalm 100:4–5 (KJV)",
    text:
      "Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name. For the LORD is good; his mercy is everlasting; and his truth endureth to all generations.",
  },
  {
    ref: "1 Chronicles 16:34 (KJV)",
    text: "O give thanks unto the LORD; for he is good; for his mercy endureth for ever.",
  },
  {
    ref: "James 1:17 (KJV)",
    text:
      "Every good gift and every perfect gift is from above, and cometh down from the Father of lights, with whom is no variableness, neither shadow of turning.",
  },
  {
    ref: "2 Corinthians 9:15 (KJV)",
    text: "Thanks be unto God for his unspeakable gift.",
  },
];

// Paragraphs are drawn with a small gap between them so the PDF matches the page layout.
const PRAYER_PARAGRAPHS = [
  "Father, thank you. For this food, the hands that prepared it, and every face gathered around this table — we thank you.",
  "We know that every good gift comes down from you, the Father of lights, and we don't want to take a single one for granted. Thank you for your provision this year, for carrying us through the hard parts, and for mercies that were new every morning even when we forgot to notice them.",
  "We remember those who aren't at the table this year, and we hold them before you with love. Comfort the empty chairs and the quiet aches that holidays can stir.",
  "Make us truly grateful people — not just today, but every day. Let thanksgiving be the way we see our lives. And thank you, most of all, for your unspeakable gift in Jesus.",
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
  doc.setSubject("A printable prayer card for Thanksgiving");

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
  const outPath = join(outDir, "prayer-for-thanksgiving.pdf");
  const bytes = await doc.save();
  writeFileSync(outPath, bytes);
  console.log(`Wrote ${outPath} (${bytes.length} bytes, ${doc.getPageCount()} page(s))`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
