import type { Metadata } from "next";
import LandingPage from "@/app/components/LandingPage";

export const metadata: Metadata = {
  title: "Bible Verses for Mothers (Strength, Encouragement & God's Love)",
  description:
    "10 powerful Bible verses for mothers, with meaning and encouragement. Find strength, wisdom, and God's blessing for the journey of motherhood.",
  openGraph: {
    title: "Bible Verses for Mothers (Strength, Encouragement & God's Love)",
    description: "Scripture for mothers — strength, love, and God's blessing — with meaning and a free verse generator.",
    url: "https://bibleversegeneratorai.com/bible-verses-for-mothers",
  },
};

const content = {
  h1: "Bible Verses for Mothers",
  subtitle: "Motherhood is one of the most profound callings — and God's Word honors it deeply.",
  intro:
    "Whether you're a new mother finding your footing, a tired mom in the middle of it all, a mother of grown children still carrying their burdens in prayer, or honoring a mother who has passed — these Bible verses speak to the beauty, challenge, and deep significance of a mother's love.",
  versesHeading: "Bible Verses for Mothers and Motherhood",
  verses: [
    {
      reference: "Proverbs 31:25-26",
      text: "She is clothed with strength and dignity; she can laugh at the days to come. She speaks with wisdom, and faithful instruction is on her tongue.",
      meaning:
        "The Proverbs 31 mother is not defined by perfection — she's defined by character. Strength, dignity, wisdom, and faithfulness are the marks of this extraordinary woman.",
    },
    {
      reference: "Isaiah 66:13",
      text: "As a mother comforts her child, so will I comfort you; and you will be comforted over Jerusalem.",
      meaning:
        "God uses the image of a mother's comfort to describe His own — this is how tender and personal His comfort is. A mother's love reflects something of God's own heart.",
    },
    {
      reference: "Psalm 127:3",
      text: "Children are a heritage from the LORD, offspring a reward from him.",
      meaning:
        "Children are not burdens — they are blessings, entrusted to parents as gifts from God. Motherhood is a sacred stewardship.",
    },
    {
      reference: "Philippians 4:13",
      text: "I can do all this through him who gives me strength.",
      meaning:
        "For the exhausted, overwhelmed mother: strength is available. The impossible demands of motherhood are met with divine strength for those who lean on Christ.",
    },
    {
      reference: "2 Timothy 1:5",
      text: "I am reminded of your sincere faith, which first lived in your grandmother Lois and in your mother Eunice and, I am persuaded, now lives in you also.",
      meaning:
        "Paul honors the faith of Timothy's mother and grandmother. A mother's faith shapes generations. The spiritual legacy you pass on is among your most powerful gifts.",
    },
    {
      reference: "Proverbs 22:6",
      text: "Start children off on the way they should go, and even when they are old they will not turn from it.",
      meaning:
        "The investment of faithful parenting lasts a lifetime. The values, faith, and direction you instill in early years carry further than you may ever know.",
    },
    {
      reference: "Titus 2:4-5",
      text: "Then they can urge the younger women to love their husbands and children, to be self-controlled and pure, to be busy at home, to be kind.",
      meaning:
        "Motherhood is a calling that flows from love — not performance. Older women passing wisdom to younger ones is one of God's beautiful designs for community.",
    },
    {
      reference: "Lamentations 3:22-23",
      text: "Because of the LORD's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.",
      meaning:
        "For the mother who feels she has failed today: His mercies are new tomorrow. Every morning is a fresh start with the God whose compassion never runs out.",
    },
    {
      reference: "Psalm 28:7",
      text: "The LORD is my strength and my shield; my heart trusts in him, and he helps me. My heart leaps for joy, and with my song I praise him.",
      meaning:
        "God is the strength behind every good mother. He helps those who trust in Him — and in the daily demands of motherhood, that help is both promised and available.",
    },
    {
      reference: "Luke 1:45",
      text: "Blessed is she who has believed that the Lord would fulfill his promises to her!",
      meaning:
        "Spoken to Mary — but it applies to every woman who trusts God's promises for her family. The believing mother is called blessed by God Himself.",
    },
  ],
  related: [
    { href: "/bible-verses-for-love", label: "Love" },
    { href: "/bible-verses-for-strength", label: "Strength" },
    { href: "/bible-verses-for-guidance", label: "Guidance" },
    { href: "/bible-verses-for-hope", label: "Hope" },
  ],
  topicSlug: "being a mother",
};

export default function Page() {
  return <LandingPage content={content} />;
}
