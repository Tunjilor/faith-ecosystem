export default function sitemap() {
  const base = "https://prayergeneratorai.com";
  const lastModified = new Date();

  const staticPages = [
    { url: base, priority: 1 },
    { url: `${base}/prayer-for-anxiety`, priority: 0.8 },
    { url: `${base}/prayer-for-healing`, priority: 0.8 },
    { url: `${base}/prayer-for-family`, priority: 0.8 },
    { url: `${base}/prayer-for-strength`, priority: 0.8 },
    { url: `${base}/prayer-for-protection`, priority: 0.8 },
    { url: `${base}/prayer-for-guidance`, priority: 0.8 },
    { url: `${base}/morning-prayer`, priority: 0.8 },
    { url: `${base}/prayer-before-sleep`, priority: 0.8 },
    { url: `${base}/prayer-for-peace`, priority: 0.8 },
    { url: `${base}/prayer-for-gratitude`, priority: 0.8 },
    // Relationships
    { url: `${base}/prayer-for-marriage`, priority: 0.8 },
    { url: `${base}/prayer-for-husband`, priority: 0.8 },
    { url: `${base}/prayer-for-wife`, priority: 0.8 },
    { url: `${base}/prayer-for-children`, priority: 0.8 },
    { url: `${base}/prayer-for-parents`, priority: 0.8 },
    { url: `${base}/prayer-for-son`, priority: 0.8 },
    { url: `${base}/prayer-for-daughter`, priority: 0.8 },
    { url: `${base}/prayer-for-friend`, priority: 0.8 },
    { url: `${base}/prayer-for-relationship`, priority: 0.8 },
    { url: `${base}/prayer-for-forgiveness`, priority: 0.8 },
    // Health
    { url: `${base}/prayer-for-cancer`, priority: 0.8 },
    { url: `${base}/prayer-for-surgery`, priority: 0.8 },
    { url: `${base}/prayer-for-mental-health`, priority: 0.8 },
    { url: `${base}/prayer-for-depression`, priority: 0.8 },
    { url: `${base}/prayer-for-addiction-recovery`, priority: 0.8 },
    { url: `${base}/prayer-for-chronic-illness`, priority: 0.8 },
    { url: `${base}/prayer-for-someone-dying`, priority: 0.8 },
    { url: `${base}/prayer-for-grief-and-loss`, priority: 0.8 },
    // Work & Finances
    { url: `${base}/prayer-for-finances`, priority: 0.8 },
    { url: `${base}/prayer-for-job`, priority: 0.8 },
    { url: `${base}/prayer-for-new-job`, priority: 0.8 },
    { url: `${base}/prayer-for-business`, priority: 0.8 },
    { url: `${base}/prayer-for-success`, priority: 0.8 },
    { url: `${base}/prayer-for-wisdom`, priority: 0.8 },
    { url: `${base}/prayer-for-students-and-exams`, priority: 0.8 },
    // Faith
    { url: `${base}/prayer-for-faith`, priority: 0.8 },
    { url: `${base}/prayer-for-salvation`, priority: 0.8 },
    { url: `${base}/prayer-for-church`, priority: 0.8 },
    { url: `${base}/prayer-for-pastor`, priority: 0.8 },
    { url: `${base}/prayer-for-enemies`, priority: 0.8 },
    { url: `${base}/prayer-for-repentance`, priority: 0.8 },
    { url: `${base}/prayer-for-holy-spirit`, priority: 0.8 },
    { url: `${base}/prayer-for-revival`, priority: 0.8 },
    // Life Situations
    { url: `${base}/prayer-for-travel-and-safety`, priority: 0.8 },
    { url: `${base}/prayer-for-new-beginnings`, priority: 0.8 },
    { url: `${base}/prayer-for-moving-on`, priority: 0.8 },
    { url: `${base}/prayer-for-anxiety-and-fear`, priority: 0.8 },
    { url: `${base}/prayer-for-loneliness`, priority: 0.8 },
    { url: `${base}/prayer-for-hope`, priority: 0.8 },
    { url: `${base}/prayer-for-patience`, priority: 0.8 },
    { url: `${base}/prayer-for-courage`, priority: 0.8 },
    { url: `${base}/prayer-for-pregnancy`, priority: 0.8 },
    { url: `${base}/prayer-for-baby`, priority: 0.8 },
    // Daily & Seasonal
    { url: `${base}/evening-prayer`, priority: 0.8 },
    { url: `${base}/prayer-before-meals`, priority: 0.8 },
    { url: `${base}/prayer-for-monday`, priority: 0.8 },
    { url: `${base}/sunday-prayer`, priority: 0.8 },
    { url: `${base}/christmas-prayer`, priority: 0.8 },
    { url: `${base}/easter-prayer`, priority: 0.8 },
    { url: `${base}/new-year-prayer`, priority: 0.8 },
  ];

  return staticPages.map(({ url, priority }) => ({
    url,
    lastModified,
    changeFrequency: url === base ? "weekly" : "monthly",
    priority,
  }));
}
