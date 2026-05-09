import type { Metadata } from "next";
import LandingPage from "@/app/components/LandingPage";

export const metadata: Metadata = {
  title: "Bible Verses for Strength (Courage & Endurance from Scripture)",
  description:
    "10 powerful Bible verses for strength and endurance, with meaning and reflection. Find the courage to keep going through God's Word.",
  openGraph: {
    title: "Bible Verses for Strength (Courage & Endurance from Scripture)",
    description: "Scripture for strength in hard times — with meaning and a free personalized verse generator.",
    url: "https://bibleversegeneratorai.com/bible-verses-for-strength",
  },
};

const content = {
  h1: "Bible Verses for Strength",
  subtitle: "When life feels overwhelming, God's Word reminds you where your strength comes from.",
  intro:
    "True strength isn't just willpower or pushing through alone — it comes from a source outside ourselves. These Bible verses about strength will encourage you to look to God as your sustainer, your fortress, and your ever-present help in times of need.",
  versesHeading: "Bible Verses About Strength",
  verses: [
    {
      reference: "Philippians 4:13",
      text: "I can do all this through him who gives me strength.",
      meaning:
        "Paul wrote this from prison — not in comfortable circumstances. The strength he's describing isn't for easy tasks; it's supernatural empowerment for hard ones, through Christ.",
    },
    {
      reference: "Isaiah 40:31",
      text: "But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
      meaning:
        "Waiting on God isn't passive — it renews strength. When your own energy runs out, He replenishes it for those who trust in Him.",
    },
    {
      reference: "Psalm 46:1",
      text: "God is our refuge and strength, an ever-present help in trouble.",
      meaning:
        "God is not just a source of strength — He is our strength. He's also ever-present, meaning He's available in the exact moment you need help most.",
    },
    {
      reference: "2 Corinthians 12:9",
      text: "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.' Therefore I will boast all the more gladly about my weaknesses, so that Christ's power may rest on me.",
      meaning:
        "God's strength is displayed most clearly through our weakness. When you feel like you have nothing left, you are in the perfect position for His power to show up.",
    },
    {
      reference: "Nehemiah 8:10",
      text: "Do not grieve, for the joy of the LORD is your strength.",
      meaning:
        "Joy isn't just an emotion — it's a source of strength. The joy that comes from knowing God and being known by Him is a fuel that sustains us through the hardest seasons.",
    },
    {
      reference: "Ephesians 6:10",
      text: "Finally, be strong in the Lord and in his mighty power.",
      meaning:
        "Paul doesn't say 'be strong in yourself' — he says be strong in the Lord. The location of our strength matters: His power, not our own.",
    },
    {
      reference: "Joshua 1:9",
      text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.",
      meaning:
        "Strength is commanded, not just hoped for. And the basis for that command is God's presence. His being with us makes courage possible.",
    },
    {
      reference: "Psalm 28:7",
      text: "The LORD is my strength and my shield; my heart trusts in him, and he helps me. My heart leaps for joy, and with my song I praise him.",
      meaning:
        "Strength and trust are connected here — when we trust God, our hearts are strengthened, and that strength overflows into praise.",
    },
    {
      reference: "Isaiah 41:10",
      text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
      meaning:
        "God's strengthening is personal and active: He will strengthen you, He will help you, He will uphold you. These are His personal commitments.",
    },
    {
      reference: "Psalm 73:26",
      text: "My flesh and my heart may fail, but God is the strength of my heart and my portion forever.",
      meaning:
        "Even when our own heart and body fail us, God remains the strength of our inner life. He is our forever portion — no circumstance can change that.",
    },
  ],
  related: [
    { href: "/bible-verses-for-hope", label: "Hope" },
    { href: "/bible-verses-for-fear", label: "Fear" },
    { href: "/bible-verses-for-anxiety", label: "Anxiety" },
    { href: "/bible-verses-for-guidance", label: "Guidance" },
  ],
  topicSlug: "strength and endurance",
};

export default function Page() {
  return <LandingPage content={content} />;
}
