/**
 * Generates the static printable prayer card at /public/downloads/prayer-for-depression.pdf.
 *
 * Run with:  npx tsx scripts/generate-depression-pdf.ts
 *
 * The output is committed to source control — this script only needs to be re-run
 * if the title, verses, or prayer for the depression topic change. Content is mirrored
 * from the `bible-verses-for-depression` entry in src/app/topics/data.ts.
 * Layout mirrors scripts/generate-sick-parent-pdf.ts.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const TITLE = "A Prayer for Depression";
const SUBTITLE = "Scripture & a Prayer for a Heavy Day";

const VERSES: Array<{ ref: string; text: string }> = [
  {
    ref: "Psalm 34:18 (KJV)",
    text: "The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.",
  },
  {
    ref: "Psalm 42:11 (WEB)",
    text:
      "Why are you in despair, my soul? Why are you disturbed within me? Hope in God! For I shall still praise him, the saving help of my countenance, and my God.",
  },
  {
    ref: "Isaiah 43:2 (WEB)",
    text:
      "When you pass through the waters, I will be with you, and through the rivers, they will not overflow you.",
  },
  {
    ref: "Matthew 11:28 (WEB)",
    text: "Come to me, all you who labor and are heavily burdened, and I will give you rest.",
  },
];

// Paragraphs are drawn with a small gap between them so the PDF matches the page layout.
const PRAYER_PARAGRAPHS = [
  "Father, I feel tired in a way I cannot fully explain. Some days even simple things feel heavy, and I do not always have the words to describe what is happening inside me. You see the sadness I try to hide, the thoughts that wear me down, and the quiet battles no one else notices.",
  "Please meet me here with your mercy. Remind me that I am not a burden to you, and that my life still matters even when I cannot feel it. Speak peace into the places that feel dark, and help me take the next small step without shame.",
  "Give me strength for today, not for every day ahead. Surround me with people who are patient, kind, and safe. Help me receive support, rest, and healing without feeling weak for needing them.",
  "Lord, when hope feels far away, hold it for me. When I cannot see the light, stay close in the darkness. Let your love steady me, carry me, and gently remind me that this is not the end of my story.",
  "Amen.",
];

const FOOTER = "faithcompanionai.com";

// Page geometry (US Letter). Margins are trimmed slightly vs. the other cards so the
// longer prayer still fits on a single page without cutting any text.
const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN = 54;
const CONTENT_W = PAGE_W - MARGIN * 2;

const INK = rgb(0.13, 0.12, 0.15);
const MUTED = rgb(0.42, 0.42, 0.46);
const ACCENT = rgb(0.42, 0.18, 0.6); // brand purple
const RULE = rgb(0.85, 0.85, 0.88);

async function main() {
  const doc = await PDFDocument.create();
  doc.setTitle(`${TITLE} — Faith Companion AI`);
  doc.setAuthor("Faith Companion AI");
  doc.setSubject("A printable prayer card for depression");

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
  y -= 30;

  // Verses
  for (const v of VERSES) {
    ensureSpace(16);
    page.drawText(v.ref, { x: MARGIN, y, size: 11, font: bold, color: ACCENT });
    y -= 17;
    drawWrapped(`“${v.text}”`, italic, 12, 16);
    y -= 13;
  }

  // Divider before the prayer
  y -= 2;
  page.drawLine({
    start: { x: MARGIN, y },
    end: { x: PAGE_W - MARGIN, y },
    thickness: 0.75,
    color: RULE,
  });
  y -= 24;

  // Prayer heading
  ensureSpace(20);
  page.drawText("A Prayer", { x: MARGIN, y, size: 15, font: bold, color: INK });
  y -= 22;

  // Prayer body — one wrapped block per paragraph, with a small gap between them.
  PRAYER_PARAGRAPHS.forEach((para, i) => {
    drawWrapped(para, body, 12, 17);
    if (i < PRAYER_PARAGRAPHS.length - 1) y -= 7;
  });

  // Footer sits just below the prayer (a small, intentional gap), not at the page bottom.
  drawFooter(y - 6);

  const outDir = join(__dirname, "..", "public", "downloads");
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "prayer-for-depression.pdf");
  const bytes = await doc.save();
  writeFileSync(outPath, bytes);
  console.log(`Wrote ${outPath} (${bytes.length} bytes, ${doc.getPageCount()} page(s))`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
