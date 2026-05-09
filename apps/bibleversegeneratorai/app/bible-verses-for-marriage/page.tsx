import type { Metadata } from "next";
import LandingPage from "@/app/components/LandingPage";

export const metadata: Metadata = {
  title: "Bible Verses for Marriage (Strengthen Your Relationship with Scripture)",
  description:
    "10 powerful Bible verses for marriage, with meaning and reflection. Find wisdom for your relationship from Scripture. Free personalized verse generator.",
  openGraph: {
    title: "Bible Verses for Marriage (Strengthen Your Relationship with Scripture)",
    description: "Scripture for marriage — love, commitment, and unity — with meaning and a free verse generator.",
    url: "https://bibleversegeneratorai.com/bible-verses-for-marriage",
  },
};

const content = {
  h1: "Bible Verses for Marriage",
  subtitle: "God designed marriage and His Word offers wisdom for every season of it.",
  intro:
    "Whether you're preparing for marriage, working through a difficult season, celebrating a milestone, or seeking to love your spouse better — the Bible has rich guidance for every part of marriage. These verses will encourage you, challenge you, and point you and your spouse back to the God who designed love.",
  versesHeading: "Bible Verses for Marriage and Relationships",
  verses: [
    {
      reference: "Genesis 2:24",
      text: "That is why a man leaves his father and mother and is united to his wife, and they become one flesh.",
      meaning:
        "God established marriage at creation — not as a human invention but as His design. The union of husband and wife reflects something deep about God's nature.",
    },
    {
      reference: "Ephesians 5:25",
      text: "Husbands, love your wives, just as Christ loved the church and gave himself up for her.",
      meaning:
        "The standard for a husband's love is staggeringly high — Christlike, sacrificial, self-giving. This love doesn't keep score; it lays itself down.",
    },
    {
      reference: "1 Corinthians 13:4-7",
      text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs.",
      meaning:
        "The greatest description of love in Scripture — this is the love that sustains a lifelong marriage: patient, kind, and entirely other-centered.",
    },
    {
      reference: "Ecclesiastes 4:9-10",
      text: "Two are better than one, because they have a good return for their labor: If either of them falls down, one can help the other up.",
      meaning:
        "Marriage is a partnership built for mutual support. The beauty of two becoming one is that neither has to face life's falls alone.",
    },
    {
      reference: "Colossians 3:14",
      text: "And over all these virtues put on love, which binds them all together in perfect unity.",
      meaning:
        "Love is the garment that ties everything else together in a marriage. When all other virtues are in place, love is what makes them work as one.",
    },
    {
      reference: "Mark 10:9",
      text: "Therefore what God has joined together, let no one separate.",
      meaning:
        "Jesus affirms the sacred bond of marriage. It is not merely a social contract — it is a covenant God has joined. That gives it weight, protection, and purpose.",
    },
    {
      reference: "Proverbs 18:22",
      text: "He who finds a wife finds what is good and receives favor from the LORD.",
      meaning:
        "A good marriage is a gift from God. The right spouse is not just a human blessing — it is evidence of God's favor and goodness toward you.",
    },
    {
      reference: "Ruth 1:16-17",
      text: "Where you go I will go, and where you stay I will stay. Your people will be my people and your God my God.",
      meaning:
        "Ruth's declaration of loyalty to Naomi is one of the most beautiful commitments in Scripture — and a model of the kind of covenant faithfulness that marks a strong marriage.",
    },
    {
      reference: "Ephesians 4:2-3",
      text: "Be completely humble and gentle; be patient, bearing with one another in love. Make every effort to keep the unity of the Spirit through the bond of peace.",
      meaning:
        "Marriage requires active effort at unity. Humility, gentleness, and patience are the daily practices that keep a marriage strong and peaceful.",
    },
    {
      reference: "Proverbs 31:10",
      text: "A wife of noble character who can find? She is worth far more than rubies.",
      meaning:
        "The Proverbs 31 woman is a picture of strength, character, and wisdom. A spouse of noble character is the most valuable treasure a person can have.",
    },
  ],
  related: [
    { href: "/bible-verses-for-love", label: "Love" },
    { href: "/bible-verses-for-forgiveness", label: "Forgiveness" },
    { href: "/bible-verses-for-strength", label: "Strength" },
    { href: "/bible-verses-for-guidance", label: "Guidance" },
  ],
  topicSlug: "marriage and relationships",
};

export default function Page() {
  return <LandingPage content={content} />;
}
