import type { Metadata } from "next";

export function createPrayerMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  const typeMatch = path.match(/\/prayer-for-(.+)/);
  const prayerType = typeMatch ? typeMatch[1].replace(/-/g, " ") : null;
  const seoDescription = prayerType
    ? `Generate a ${prayerType} prayer with AI — heartfelt, scripture-based ${prayerType} prayers written instantly for your specific needs and situation.`
    : description;

  const ogImageUrl = `/api/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description: seoDescription,
    alternates: { canonical: path },
    openGraph: {
      title,
      description: seoDescription,
      url: `https://prayergeneratorai.com${path}`,
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
