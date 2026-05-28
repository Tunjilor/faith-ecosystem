import type { Metadata } from "next";
import LandingPage from "@/app/components/LandingPage";

export const metadata: Metadata = {
  title: "Bible Verses for Loneliness (You Are Never Truly Alone)",
  description:
    "10 powerful Bible verses for loneliness and isolation, with meaning and encouragement. God's presence fills the empty spaces. Free personalized verse generator.",
  openGraph: {
    title: "Bible Verses for Loneliness (You Are Never Truly Alone)",
    description: "Scripture for loneliness — God's companionship and comfort — with meaning and a free verse generator.",
    url: "https://bibleversegeneratorai.com/bible-verses-for-loneliness",
  },
};

const content = {
  h1: "Bible Verses for Loneliness",
  subtitle: "Loneliness is one of the deepest human pains — and God speaks directly to it.",
  intro:
    "Loneliness can be felt even in a crowd. Whether you've lost a relationship, moved somewhere new, or simply feel unseen and unknown — God promises a presence that goes beyond human connection. These verses remind you that you are known by name, never abandoned, and never truly alone.",
  versesHeading: "Bible Verses for Those Who Feel Lonely",
  verses: [
    {
      reference: "Psalm 68:6",
      text: "God sets the lonely in families, he leads out the prisoners with singing.",
      meaning:
        "God's heart is specifically for the lonely. He doesn't just tolerate our loneliness — He actively works to place us in community and bring us out of isolation.",
    },
    {
      reference: "Matthew 28:20",
      text: "And surely I am with you always, to the very end of the age.",
      meaning:
        "Jesus' final promise before ascending to heaven: always. Not sometimes, not when you feel it — always. You are never in a room alone if Christ is with you.",
    },
    {
      reference: "Hebrews 13:5",
      text: "Never will I leave you; never will I forsake you.",
      meaning:
        "God's double 'never' — never leave, never forsake. This is an absolute, unchanging promise that defies every lonely feeling and circumstance.",
    },
    {
      reference: "Isaiah 41:10",
      text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
      meaning:
        "God's presence is the antidote to loneliness. He isn't just near — He strengthens you, helps you, and holds you up with His own hand.",
    },
    {
      reference: "John 14:16-17",
      text: "And I will ask the Father, and he will give you another advocate to help you and be with you forever — the Spirit of truth.",
      meaning:
        "Jesus promised to send the Holy Spirit to be with us forever. The Spirit is not an occasional visitor — He is a permanent, ever-present companion.",
    },
    {
      reference: "Deuteronomy 31:8",
      text: "The LORD himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid; do not be discouraged.",
      meaning:
        "God doesn't just walk beside us — He goes ahead of us, clearing the way. In the most unfamiliar seasons of life, He has already been there.",
    },
    {
      reference: "Romans 8:38-39",
      text: "For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God.",
      meaning:
        "Separation from God's love is impossible. Loneliness may be the feeling, but it is not the reality. His love is an unbreakable connection.",
    },
    {
      reference: "John 15:15",
      text: "I no longer call you servants, because a servant does not know his master's business. Instead, I have called you friends, for everything that I learned from my Father I have made known to you.",
      meaning:
        "Jesus calls us friends — not just followers. This is a relationship of intimacy and shared life. You are not just known by God; you are His friend.",
    },
    {
      reference: "Psalm 46:1",
      text: "God is our refuge and strength, an ever-present help in trouble.",
      meaning:
        "Ever-present — God is not hard to find. He is here, now, as a refuge and strength in this very moment of loneliness.",
    },
    {
      reference: "1 Peter 5:7",
      text: "Cast all your anxiety on him because he cares for you.",
      meaning:
        "The reason we can give God our loneliness is because He genuinely cares for us. It is not indifference but deep, personal care that motivates His constant presence.",
    },
  ],
  related: [
    { href: "/bible-verses-for-anxiety", label: "Anxiety" },
    { href: "/bible-verses-for-hope", label: "Hope" },
    { href: "/bible-verses-for-love", label: "Love" },
    { href: "/bible-verses-for-depression", label: "Depression" },
  ],
  topicSlug: "loneliness and feeling alone",
};

export default function Page() {
  return <LandingPage content={content} />;
}
