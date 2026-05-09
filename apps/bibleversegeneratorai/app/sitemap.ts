import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bibleversegeneratorai.com";

  const routes = [
    "",
    "/bible-verses-for-anxiety",
    "/bible-verses-for-fear",
    "/bible-verses-for-forgiveness",
    "/bible-verses-for-guidance",
    "/bible-verses-for-healing",
    "/bible-verses-for-hope",
    "/bible-verses-for-love",
    "/bible-verses-for-strength",
    "/bible-verses-for-depression",
    "/bible-verses-for-grief",
    "/bible-verses-for-marriage",
    "/bible-verses-for-finances",
    "/bible-verses-for-loneliness",
    "/bible-verses-for-addiction",
    "/bible-verses-for-anger",
    "/bible-verses-for-gratitude",
    "/bible-verses-for-protection",
    "/bible-verses-for-sleep",
    "/bible-verses-for-students",
    "/bible-verses-for-mothers",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
