import type { Metadata } from "next";

export function createVersePageMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  const topicMatch = path.match(/\/bible-verses-for-(.+)/);
  const topic = topicMatch ? topicMatch[1].replace(/-/g, " ") : null;
  const seoDescription = topic
    ? `Find Bible verses about ${topic} — AI-generated scriptures for ${topic} from KJV, NIV, ESV and more. Perfect for daily devotion, prayer, and spiritual growth.`
    : description;

  const ogImageUrl = `/api/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description: seoDescription,
    alternates: { canonical: path },
    openGraph: {
      title,
      description: seoDescription,
      url: `https://bibleversegeneratorai.com${path}`,
      type: "article",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: seoDescription,
      images: [ogImageUrl],
    },
  };
}
