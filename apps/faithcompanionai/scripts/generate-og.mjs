// Generates the static social-share image at public/brand/og-quiz.png.
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

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
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
        fill="#c4a7f7" fill-opacity="0.82">Personalized scripture, prayer &amp; devotionals</text>

  <!-- Bottom rule + domain -->
  <rect x="440" y="540" width="320" height="1" fill="#ffffff" fill-opacity="0.12"/>
  <text x="600" y="580" text-anchor="middle" font-family="${FONT}" font-size="20"
        fill="#ffffff" fill-opacity="0.40">faithcompanionai.com</text>
</svg>`;

const out = 'public/brand/og-quiz.png';
await sharp(Buffer.from(svg)).png().toFile(out);

const meta = await sharp(out).metadata();
console.log(`Created: ${out} (${meta.width}x${meta.height})`);
