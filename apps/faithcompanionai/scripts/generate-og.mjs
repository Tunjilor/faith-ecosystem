// Generates the static default social-share images:
//   public/brand/og-quiz.png        English (site default)
//   public/brand/og-default-es.png  Spanish (default for /es pages)
//   public/brand/og-prayer-es.png   /es/tools/prayer
//   public/brand/og-verse-es.png    /es/tools/verse
//   public/brand/og-devotional-es.png /es/tools/devotional
// (English tool pages keep og-quiz.png.)
//
// The design deliberately mirrors the dynamic OG route in
// src/app/api/og/verse/route.tsx — same #170537 base, same purple/orange corner
// glows, same star mark and bottom rule — so static and dynamic share cards look
// like one family.
//
// Run from the app root:  node scripts/generate-og.mjs

import sharp from 'sharp';
import { mkdirSync } from 'fs';

const W = 1200;
const H = 630;

mkdirSync('public/brand', { recursive: true });

// Font stack mirrors what the OG route inherits; Arial/sans-serif keeps this
// working on machines without Segoe UI.
const FONT = 'Segoe UI, Helvetica Neue, Arial, sans-serif';

const VARIANTS = [
  { out: 'public/brand/og-quiz.png', tagline: 'Personalized scripture, prayer &amp; devotionals' },
  { out: 'public/brand/og-default-es.png', tagline: 'Escrituras, oraciones y devocionales personalizados' },
];

const svgFor = (tagline) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Purple glow, top-left: matches the 580px circle at (-80,-80) in the OG route -->
    <radialGradient id="purpleGlow" cx="0" cy="0" r="1"
      gradientUnits="userSpaceOnUse" gradientTransform="translate(210 210) scale(290)">
      <stop offset="0%"   stop-color="#7c3aed" stop-opacity="0.55"/>
      <stop offset="70%"  stop-color="#7c3aed" stop-opacity="0"/>
    </radialGradient>
    <!-- Orange glow, bottom-right: matches the 520px circle at (-80,-80) -->
    <radialGradient id="orangeGlow" cx="0" cy="0" r="1"
      gradientUnits="userSpaceOnUse" gradientTransform="translate(1020 450) scale(260)">
      <stop offset="0%"   stop-color="#f97316" stop-opacity="0.38"/>
      <stop offset="70%"  stop-color="#f97316" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#170537"/>
  <circle cx="210"  cy="210" r="290" fill="url(#purpleGlow)"/>
  <circle cx="1020" cy="450" r="260" fill="url(#orangeGlow)"/>

  <!-- Star mark (U+273B), as used in the OG route -->
  <text x="600" y="248" text-anchor="middle" font-family="${FONT}" font-size="44"
        fill="#c4a7f7" fill-opacity="0.65">&#10038;</text>

  <!-- Site name -->
  <text x="600" y="360" text-anchor="middle" font-family="${FONT}" font-size="82"
        font-weight="700" fill="#ffffff" fill-opacity="0.95">Faith Companion AI</text>

  <!-- Tagline -->
  <text x="600" y="424" text-anchor="middle" font-family="${FONT}" font-size="30"
        fill="#c4a7f7" fill-opacity="0.82">${tagline}</text>

  <!-- Bottom rule + domain -->
  <rect x="440" y="540" width="320" height="1" fill="#ffffff" fill-opacity="0.12"/>
  <text x="600" y="580" text-anchor="middle" font-family="${FONT}" font-size="20"
        fill="#ffffff" fill-opacity="0.40">faithcompanionai.com</text>
</svg>`;

// Spanish tool pages: page name + tagline, same layout as og-tithe-es.png
// (scripts/generate-og-tithe.mjs) without the "10%" accent.
const TOOL_VARIANTS = [
  { out: 'public/brand/og-prayer-es.png', title: 'Generador de oraciones', tagline: 'Una oración personal con la Biblia' },
  { out: 'public/brand/og-verse-es.png', title: 'Versículos de la Biblia', tagline: 'Con el texto de la Reina-Valera 1909' },
  { out: 'public/brand/og-devotional-es.png', title: 'Devocional diario', tagline: 'Reflexión, oración y pasos para hoy' },
];

const toolSvgFor = ({ title, tagline }) => svgFor(tagline)
  .replace(/<!-- Site name -->[\s\S]*?<\/text>/, `<!-- Page name -->
  <text x="600" y="360" text-anchor="middle" font-family="${FONT}" font-size="76"
        font-weight="700" fill="#ffffff" fill-opacity="0.95">${title}</text>`)
  .replace('fill-opacity="0.40">faithcompanionai.com<', 'fill-opacity="0.40">Faith Companion AI · faithcompanionai.com<');

for (const variant of TOOL_VARIANTS) {
  await sharp(Buffer.from(toolSvgFor(variant))).png().toFile(variant.out);
  const meta = await sharp(variant.out).metadata();
  console.log(`Created: ${variant.out} (${meta.width}x${meta.height})`);
}

for (const { out, tagline } of VARIANTS) {
  await sharp(Buffer.from(svgFor(tagline))).png().toFile(out);
  const meta = await sharp(out).metadata();
  console.log(`Created: ${out} (${meta.width}x${meta.height})`);
}
