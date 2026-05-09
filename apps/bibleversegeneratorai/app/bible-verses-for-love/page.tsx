import type { Metadata } from "next";
import LandingPage from "@/app/components/LandingPage";

export const metadata: Metadata = {
  title: "Bible Verses for Love (God's Love & Loving Others)",
  description:
    "10 powerful Bible verses about love — God's love for us and loving others. With meaning, reflection, and a free personalized verse generator.",
  openGraph: {
    title: "Bible Verses for Love (God's Love & Loving Others)",
    description: "Scripture on love — God's love and loving others — with meaning and a free verse generator.",
    url: "https://bibleversegeneratorai.com/bible-verses-for-love",
  },
};

const content = {
  h1: "Bible Verses for Love",
  subtitle: "Love is the foundation of all Scripture — and God's love for you is beyond measure.",
  intro:
    "The Bible has more to say about love than almost any other topic. Whether you're seeking to understand God's love for you, how to love others better, or finding encouragement in a relationship — these verses will deepen your understanding of the love that defines our faith.",
  versesHeading: "Bible Verses About Love",
  verses: [
    {
      reference: "1 Corinthians 13:4-7",
      text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres.",
      meaning:
        "The most comprehensive definition of love in the Bible. Paul describes not a feeling but a choice — a consistent, self-giving, patient commitment that reflects God's character.",
    },
    {
      reference: "John 3:16",
      text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
      meaning:
        "The most famous verse in the Bible — love defined by sacrifice. God's love for you wasn't theoretical; it cost Him everything.",
    },
    {
      reference: "Romans 8:38-39",
      text: "For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.",
      meaning:
        "Paul lists every conceivable threat to God's love and declares them all powerless. Nothing — absolutely nothing — can separate you from God's love.",
    },
    {
      reference: "1 John 4:7-8",
      text: "Dear friends, let us love one another, for love comes from God. Everyone who loves has been born of God and knows God. Whoever does not love does not know God, because God is love.",
      meaning:
        "God doesn't just demonstrate love — He is love. Our capacity to love others is itself a reflection of the divine nature in us.",
    },
    {
      reference: "John 15:12-13",
      text: "My command is this: Love each other as I have loved you. Greater love has no one than this: to lay down one's life for one's friends.",
      meaning:
        "Jesus sets the standard for love: sacrificial, other-centered, and modeled after His own example. This is the love that transforms relationships.",
    },
    {
      reference: "1 John 4:19",
      text: "We love because he first loved us.",
      meaning:
        "Our ability to love is a response to being loved by God. Before we ever reached for Him, He was already loving us. This is the source of all our love.",
    },
    {
      reference: "Romans 5:8",
      text: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.",
      meaning:
        "God's love wasn't conditional on us getting our act together first. He loved us at our worst. That's the kind of love we can trust completely.",
    },
    {
      reference: "Zephaniah 3:17",
      text: "The LORD your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.",
      meaning:
        "One of the most tender verses about God's love — He doesn't just tolerate you, He delights in you and literally sings over you with joy.",
    },
    {
      reference: "Ephesians 3:17-19",
      text: "And I pray that you, being rooted and established in love, may have power, together with all the Lord's holy people, to grasp how wide and long and high and deep is the love of Christ, and to know this love that surpasses knowledge.",
      meaning:
        "Paul prays that we would comprehend a love too vast for our minds to fully contain. Being rooted in this love changes everything about how we live.",
    },
    {
      reference: "Song of Solomon 8:7",
      text: "Many waters cannot quench love; rivers cannot sweep it away.",
      meaning:
        "Love — whether human or divine — has a staying power that defies all circumstances. True love cannot be extinguished by any force the world throws at it.",
    },
  ],
  related: [
    { href: "/bible-verses-for-forgiveness", label: "Forgiveness" },
    { href: "/bible-verses-for-marriage", label: "Marriage" },
    { href: "/bible-verses-for-gratitude", label: "Gratitude" },
    { href: "/bible-verses-for-hope", label: "Hope" },
  ],
  topicSlug: "love and relationships",
};

export default function Page() {
  return <LandingPage content={content} />;
}
