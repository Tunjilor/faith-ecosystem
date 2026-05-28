import type { Metadata } from "next";
import LandingPage from "@/app/components/LandingPage";

export const metadata: Metadata = {
  title: "Bible Verses for Anger (Peace & Self-Control from Scripture)",
  description:
    "10 powerful Bible verses for dealing with anger, with meaning and reflection. Find God's peace and self-control through Scripture. Free verse generator.",
  openGraph: {
    title: "Bible Verses for Anger (Peace & Self-Control from Scripture)",
    description: "Scripture for anger management and peace — with meaning and a free verse generator.",
    url: "https://bibleversegeneratorai.com/bible-verses-for-anger",
  },
};

const content = {
  h1: "Bible Verses for Anger",
  subtitle: "The Bible doesn't say anger is sin — it says how we handle it matters greatly.",
  intro:
    "Anger is a God-given emotion — Jesus himself expressed righteous anger. But when anger controls us, it damages relationships, hardens hearts, and opens doors to sin. These verses will help you understand healthy and unhealthy anger, find self-control, and discover the peace that God offers in tense moments.",
  versesHeading: "Bible Verses About Anger and Self-Control",
  verses: [
    {
      reference: "James 1:19-20",
      text: "My dear brothers and sisters, take note of this: Everyone should be quick to listen, slow to speak and slow to become angry, because human anger does not produce the righteousness that God desires.",
      meaning:
        "James gives a practical prescription: listen more, speak less, and slow down before getting angry. Human anger rarely produces what we actually want — righteousness.",
    },
    {
      reference: "Ephesians 4:26-27",
      text: "In your anger do not sin: Do not let the sun go down while you are still angry, and do not give the devil a foothold.",
      meaning:
        "Paul acknowledges that anger is real — the issue is what we do with it. Prolonged, unresolved anger is a foothold for the enemy. Deal with it before the day ends.",
    },
    {
      reference: "Proverbs 15:1",
      text: "A gentle answer turns away wrath, but a harsh word stirs up anger.",
      meaning:
        "One of the most practical anger management tools in Scripture: a gentle response de-escalates, while a sharp word inflames. The power to change the atmosphere is in how we respond.",
    },
    {
      reference: "Proverbs 29:11",
      text: "Fools give full vent to their rage, but the wise bring calm in the end.",
      meaning:
        "Releasing rage freely isn't strength — it's foolishness. Wisdom is the ability to govern anger rather than let anger govern you.",
    },
    {
      reference: "Romans 12:19",
      text: "Do not take revenge, my dear friends, but leave room for God's wrath, for it is written: 'It is mine to avenge; I will repay,' says the Lord.",
      meaning:
        "When we've been wronged, anger wants justice immediately. God invites us to release that need for revenge and trust Him to deal with injustice rightly.",
    },
    {
      reference: "Psalm 37:8",
      text: "Refrain from anger and turn from wrath; do not fret — it leads only to evil.",
      meaning:
        "Fretting and festering anger lead to evil, not resolution. God's invitation is to stop feeding the anger and turn away from it — not suppress it, but redirect it.",
    },
    {
      reference: "Colossians 3:8",
      text: "But now you must also rid yourselves of all such things as these: anger, rage, malice, slander, and filthy language from your lips.",
      meaning:
        "Paul calls anger something to deliberately put off, like removing a destructive piece of clothing. These are choices we can make with God's help.",
    },
    {
      reference: "Ecclesiastes 7:9",
      text: "Do not be quickly provoked in your spirit, for anger resides in the lap of fools.",
      meaning:
        "Slow to anger is wisdom; quick to anger is foolishness. A person who is easily provoked hands control of their emotions to others.",
    },
    {
      reference: "Matthew 5:22",
      text: "But I tell you that anyone who is angry with a brother or sister will be subject to judgment.",
      meaning:
        "Jesus takes anger seriously — especially toward people we're in relationship with. Unchecked anger toward others is a matter of spiritual seriousness.",
    },
    {
      reference: "Galatians 5:22-23",
      text: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.",
      meaning:
        "Self-control is a fruit of the Holy Spirit — it grows naturally in a surrendered life. Anger management isn't just willpower; it's a Spirit-filled life.",
    },
  ],
  related: [
    { href: "/bible-verses-for-forgiveness", label: "Forgiveness" },
    { href: "/bible-verses-for-love", label: "Love" },
    { href: "/bible-verses-for-healing", label: "Healing" },
    { href: "/bible-verses-for-guidance", label: "Guidance" },
  ],
  topicSlug: "anger and frustration",
};

export default function Page() {
  return <LandingPage content={content} />;
}
