// scripts/seo-snapshot.ts
//
// Captures the SEO-relevant output of every route (status, X-Robots-Tag,
// <title>, meta description, robots, canonical, hreflang alternates, OG and
// Twitter tags) from a running server, and compares two captures.
//
// Used to prove i18n work leaves the English site unchanged:
//
//   npm run build && npm start                  # on main
//   npx tsx scripts/seo-snapshot.ts capture http://localhost:3000 before.json
//   ...switch branch, rebuild, restart...
//   npx tsx scripts/seo-snapshot.ts capture http://localhost:3000 after.json
//   npx tsx scripts/seo-snapshot.ts compare before.json after.json
//
// Routes come from the server's own /sitemap.xml plus EXTRA_ROUTES (pages that
// exist but aren't in the sitemap). Each route is also captured under /es.

import { readFileSync, writeFileSync } from "fs";

const EXTRA_ROUTES = [
  "/login",
  "/dashboard",
  "/profile",
  "/saved",
  "/tools",
  "/tools/prayer-journal",
  "/tools/verse-finder",
  "/verse",
  "/refund",
  "/reset-password",
  "/bible-verse-for-anxiety",
  "/resources/christian-living",
  "/quiz",
  "/quiz/challenge",
];

type Snapshot = Record<string, Record<string, string | string[] | number | null>>;

function decode(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function attr(tag: string, name: string) {
  const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`, "i"));
  return m ? decode(m[1]) : null;
}

function extract(html: string) {
  const head = html.split(/<\/head>/i)[0] ?? "";
  const metas = head.match(/<meta\b[^>]*>/gi) ?? [];
  const links = head.match(/<link\b[^>]*>/gi) ?? [];

  const meta = (key: string) => {
    for (const t of metas) {
      if (attr(t, "name") === key || attr(t, "property") === key) return attr(t, "content");
    }
    return null;
  };

  const alternates = links
    .filter((t) => attr(t, "rel") === "alternate" && (attr(t, "hrefLang") ?? attr(t, "hreflang")))
    .map((t) => `${attr(t, "hrefLang") ?? attr(t, "hreflang")}=${attr(t, "href")}`)
    .sort();

  const canonical = links.find((t) => attr(t, "rel") === "canonical");
  const title = head.match(/<title>([^<]*)<\/title>/i);

  return {
    title: title ? decode(title[1]) : null,
    description: meta("description"),
    robots: meta("robots"),
    canonical: canonical ? attr(canonical, "href") : null,
    hreflang: alternates,
    ogTitle: meta("og:title"),
    ogDescription: meta("og:description"),
    ogUrl: meta("og:url"),
    ogImage: meta("og:image"),
    ogLocale: meta("og:locale"),
    twitterTitle: meta("twitter:title"),
    twitterDescription: meta("twitter:description"),
    twitterImage: meta("twitter:image"),
  };
}

async function routesFrom(base: string) {
  const xml = await (await fetch(`${base}/sitemap.xml`)).text();
  // /es URLs in the sitemap are covered by prefixing each English route below.
  const fromSitemap = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1]).pathname)
    .filter((p) => p !== "/es" && !p.startsWith("/es/"));
  return [...new Set([...fromSitemap, ...EXTRA_ROUTES])].sort();
}

async function capture(base: string, out: string) {
  const routes = await routesFrom(base);
  const paths = routes.flatMap((r) => [r, r === "/" ? "/es" : `/es${r}`]);
  const snap: Snapshot = {};

  for (const path of paths) {
    const res = await fetch(`${base}${path}`, { redirect: "manual" });
    const html = res.headers.get("content-type")?.includes("text/html") ? await res.text() : "";
    snap[path] = {
      status: res.status,
      xRobotsTag: res.headers.get("x-robots-tag"),
      location: res.headers.get("location"),
      ...extract(html),
    };
  }

  writeFileSync(out, JSON.stringify(snap, null, 2));
  console.log(`Captured ${paths.length} paths from ${base} -> ${out}`);
}

function compare(aFile: string, bFile: string) {
  const a: Snapshot = JSON.parse(readFileSync(aFile, "utf8"));
  const b: Snapshot = JSON.parse(readFileSync(bFile, "utf8"));
  const paths = [...new Set([...Object.keys(a), ...Object.keys(b)])].sort();
  let enDiffs = 0;
  let esDiffs = 0;

  for (const path of paths) {
    const isEs = path === "/es" || path.startsWith("/es/");
    const before = a[path] ?? {};
    const after = b[path] ?? {};
    const keys = [...new Set([...Object.keys(before), ...Object.keys(after)])];
    for (const k of keys) {
      const x = JSON.stringify(before[k] ?? null);
      const y = JSON.stringify(after[k] ?? null);
      if (x === y) continue;
      if (isEs) esDiffs++;
      else enDiffs++;
      console.log(`${isEs ? "ES" : "EN"} ${path} ${k}: ${x} -> ${y}`);
    }
  }

  console.log(`\n${paths.length} paths compared. EN differences: ${enDiffs}. ES differences: ${esDiffs}.`);
  if (enDiffs > 0) process.exitCode = 1;
}

async function main() {
  const [cmd, x, y] = process.argv.slice(2);
  if (cmd === "capture" && x && y) await capture(x.replace(/\/$/, ""), y);
  else if (cmd === "compare" && x && y) compare(x, y);
  else {
    console.error("Usage: tsx scripts/seo-snapshot.ts capture <baseUrl> <out.json> | compare <a.json> <b.json>");
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
