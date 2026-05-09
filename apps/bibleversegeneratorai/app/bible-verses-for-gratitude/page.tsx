import type { Metadata } from "next";
import LandingPage from "@/app/components/LandingPage";

export const metadata: Metadata = {
  title: "Bible Verses for Gratitude (Thankfulness & Joy from Scripture)",
  description:
    "10 powerful Bible verses about gratitude and thankfulness, with meaning and reflection. Cultivate a heart of praise through God's Word. Free verse generator.",
  openGraph: {
    title: "Bible Verses for Gratitude (Thankfulness & Joy from Scripture)",
    description: "Scripture for gratitude and thankfulness — with meaning and a free verse generator.",
    url: "https://bibleversegeneratorai.com/bible-verses-for-gratitude",
  },
};

const content = {
  h1: "Bible Verses for Gratitude",
  subtitle: "Gratitude is one of the most transformative practices in the Christian life.",
  intro:
    "Research shows that gratitude changes our brains — and Scripture has always known this. A thankful heart is a strong heart. These verses will inspire you to cultivate a lifestyle of gratitude, find reasons to be thankful even in hard seasons, and experience the joy that flows from a heart of praise.",
  versesHeading: "Bible Verses About Gratitude and Thanksgiving",
  verses: [
    {
      reference: "1 Thessalonians 5:16-18",
      text: "Rejoice always, pray continually, give thanks in all circumstances; for this is God's will for you in Christ Jesus.",
      meaning:
        "Three commands — rejoice, pray, give thanks — in all circumstances. Not for all circumstances, but in them. Gratitude is always possible regardless of what's happening around us.",
    },
    {
      reference: "Psalm 100:4",
      text: "Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name.",
      meaning:
        "Gratitude is literally the posture we take when approaching God. Thanksgiving is the door to His presence — we enter His courts with praise.",
    },
    {
      reference: "Colossians 3:15-17",
      text: "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace. And be thankful. Let the message of Christ dwell among you richly…and whatever you do, whether in word or deed, do it all in the name of the Lord Jesus, giving thanks to God the Father through him.",
      meaning:
        "Gratitude isn't a feeling we wait for — it's a decision we make repeatedly. Paul says to 'be thankful' as a practice that shapes our whole life.",
    },
    {
      reference: "Philippians 4:6",
      text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
      meaning:
        "Thanksgiving is the key ingredient in prayer that transforms anxiety into peace. When we approach God with gratitude, something shifts in our hearts.",
    },
    {
      reference: "Psalm 107:1",
      text: "Give thanks to the LORD, for he is good; his love endures forever.",
      meaning:
        "The simplest reason for gratitude: God is good, and His love has no expiration date. Even on the worst day, these two facts are still true.",
    },
    {
      reference: "James 1:17",
      text: "Every good and perfect gift is from above, coming down from the Father of the heavenly lights, who does not change like shifting shadows.",
      meaning:
        "Everything good in your life is a gift from God. Gratitude is simply acknowledging the source of every blessing — and God's consistency in giving them.",
    },
    {
      reference: "Ephesians 5:20",
      text: "Always giving thanks to God the Father for everything, in the name of our Lord Jesus Christ.",
      meaning:
        "'Always' and 'for everything' are strong words. Gratitude becomes a lifestyle when we train ourselves to find God's hand in all things.",
    },
    {
      reference: "Psalm 136:1",
      text: "Give thanks to the LORD, for he is good. His love endures forever.",
      meaning:
        "This refrain is repeated 26 times in Psalm 136 — God's love endures forever. The repetition is intentional: let this truth sink deep into your heart.",
    },
    {
      reference: "Romans 8:28",
      text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
      meaning:
        "Gratitude in hard times is possible when we trust that God is working in all things. Even difficult seasons can become reasons for future thanksgiving.",
    },
    {
      reference: "Luke 17:15-16",
      text: "One of them, when he saw he was healed, came back, praising God in a loud voice. He threw himself at Jesus' feet and thanked him.",
      meaning:
        "Of the ten healed lepers, only one returned to give thanks. Jesus noticed. Returning to express gratitude is a practice that honors God and deepens our relationship with Him.",
    },
  ],
  related: [
    { href: "/bible-verses-for-love", label: "Love" },
    { href: "/bible-verses-for-hope", label: "Hope" },
    { href: "/bible-verses-for-healing", label: "Healing" },
    { href: "/bible-verses-for-strength", label: "Strength" },
  ],
  topicSlug: "gratitude and thankfulness",
};

export default function Page() {
  return <LandingPage content={content} />;
}
