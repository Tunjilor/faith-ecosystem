// src/app/daily/feed.xml/route.ts
//
// RSS feed of the daily devotionals. Social auto-posting tools (Zapier, Make,
// Buffer) watch this feed and post each new item to the Facebook Page. Each
// item's description is ready-to-post text ending with a link back to the
// day's page, where the email signup lives.
import { getRecentDevotionals, socialPostText, formatDay, SITE_URL } from "@/lib/daily-devotionals";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function cdata(text: string): string {
  return `<![CDATA[${text.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

export async function GET() {
  const items = await getRecentDevotionals(20);

  const itemXml = items
    .map((d) => {
      const link = `${SITE_URL}/daily/${d.day}`;
      const title = d.reference ? `${formatDay(d.day)}: ${d.reference}` : formatDay(d.day);
      return `    <item>
      <title>${cdata(title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(`${d.day}T09:00:00Z`).toUTCString()}</pubDate>
      <description>${cdata(socialPostText(d))}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Faith Companion AI: Daily Devotional</title>
    <link>${SITE_URL}/daily</link>
    <atom:link href="${SITE_URL}/daily/feed.xml" rel="self" type="application/rss+xml" />
    <description>A free daily devotional: one Bible verse, a short reflection, and a word of encouragement.</description>
    <language>en-us</language>
${itemXml}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600",
    },
  });
}
