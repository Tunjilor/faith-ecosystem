import type { Metadata } from "next";

export function createPrayerMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  const ogImageUrl = `/api/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: `https://prayergeneratorai.com${path}`,
      type: "article",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}
