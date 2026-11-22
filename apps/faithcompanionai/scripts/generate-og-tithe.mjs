// Generates the static social-share images for the tithe calculator:
//   public/brand/og-tithe.png     English (/tools/tithe)
//   public/brand/og-tithe-es.png  Spanish (/es/tools/tithe)
//
// Same visual family as scripts/generate-og.mjs (og-quiz.png): #170537 base,
// purple/orange corner glows, star mark, bottom rule + domain.
//
// Run from the app root:  node scripts/generate-og-tithe.mjs

import sharp from 'sharp';
import { mkdirSync } from 'fs';

const W = 1200;
const H = 630;

mkdirSync('public/brand', { recursive: true });

const FONT = 'Segoe UI, Helvetica Neue, Arial, sans-serif';

const VARIANTS = [
  {
    out: 'public/brand/og-tithe.png',
    title: 'Tithe Calculator',
    tagline: 'Your tithe per paycheck, month or year',
  },
  {
    out: 'public/brand/og-tithe-es.png',
    title: 'Calculadora de Diezmo',
    tagline: 'Tu diezmo por pago, por mes o por año',
  },
];

const svgFor = ({ title, tagline }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="purpleGlow" cx="0" cy="0" r="1"
      gradientUnits="userSpaceOnUse" gradientTransform="translate(210 210) scale(290)">
      <stop offset="0%"   stop-color="#7c3aed" stop-opacity="0.55"/>
      <stop offset="70%"  stop-color="#7c3aed" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="orangeGlow" cx="0" cy="0" r="1"
      gradientUnits="userSpaceOnUse" gradientTransform="translate(1020 450) scale(260)">
      <stop offset="0%"   stop-color="#f97316" stop-opacity="0.38"/>
      <stop offset="70%"  stop-color="#f97316" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#170537"/>
  <circle cx="210"  cy="210" r="290" fill="url(#purpleGlow)"/>
  <circle cx="1020" cy="450" r="260" fill="url(#orangeGlow)"/>

  <!-- Star mark (U+2736), as in og-quiz.png -->
  <text x="600" y="190" text-anchor="middle" font-family="${FONT}" font-size="44"
        fill="#c4a7f7" fill-opacity="0.65">&#10038;</text>

  <!-- "10%" accent -->
  <text x="600" y="300" text-anchor="middle" font-family="${FONT}" font-size="96"
        font-weight="700" fill="#fdba74" fill-opacity="0.95">10%</text>

  <!-- Page name -->
  <text x="600" y="390" text-anchor="middle" font-family="${FONT}" font-size="76"
        font-weight="700" fill="#ffffff" fill-opacity="0.95">${title}</text>

  <!-- Tagline -->
  <text x="600" y="450" text-anchor="middle" font-family="${FONT}" font-size="30"
        fill="#c4a7f7" fill-opacity="0.82">${tagline}</text>

  <!-- Bottom rule + brand/domain -->
  <rect x="440" y="530" width="320" height="1" fill="#ffffff" fill-opacity="0.12"/>
  <text x="600" y="575" text-anchor="middle" font-family="${FONT}" font-size="20"
        fill="#ffffff" fill-opacity="0.40">Faith Companion AI · faithcompanionai.com</text>
</svg>`;

for (const variant of VARIANTS) {
  await sharp(Buffer.from(svgFor(variant))).png().toFile(variant.out);
  const meta = await sharp(variant.out).metadata();
  console.log(`Created: ${variant.out} (${meta.width}x${meta.height})`);
}
