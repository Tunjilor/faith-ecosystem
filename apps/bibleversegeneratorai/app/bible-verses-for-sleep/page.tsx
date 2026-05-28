import type { Metadata } from "next";
import LandingPage from "@/app/components/LandingPage";

export const metadata: Metadata = {
  title: "Bible Verses for Sleep (Peace & Rest from Scripture)",
  description:
    "10 calming Bible verses for sleep and rest, with meaning and reflection. Find God's peace for restless nights. Free personalized verse generator.",
  openGraph: {
    title: "Bible Verses for Sleep (Peace & Rest from Scripture)",
    description: "Scripture for restful sleep and peace at night — with meaning and a free verse generator.",
    url: "https://bibleversegeneratorai.com/bible-verses-for-sleep",
  },
};

const content = {
  h1: "Bible Verses for Sleep",
  subtitle: "God gives sleep to His beloved — find peace in His Word tonight.",
  intro:
    "Sleeplessness is often driven by anxiety, fear, and unresolved worry. The Bible speaks directly about rest — God designed sleep as a gift, and He invites us to lay our burdens down at night and trust Him with whatever tomorrow holds. These verses will help you calm your mind and rest in God's care.",
  versesHeading: "Bible Verses for Peaceful Sleep and Rest",
  verses: [
    {
      reference: "Psalm 4:8",
      text: "In peace I will lie down and sleep, for you alone, LORD, make me dwell in safety.",
      meaning:
        "Peace that enables sleep comes from one source: God. When we dwell in His safety, the mind can finally rest — not because problems are solved, but because He holds them.",
    },
    {
      reference: "Proverbs 3:24",
      text: "When you lie down, you will not be afraid; when you lie down, your sleep will be sweet.",
      meaning:
        "Sweet sleep is promised to those who walk in wisdom and trust God. Fear at night is displaced when we've placed our lives in His hands during the day.",
    },
    {
      reference: "Matthew 11:28-30",
      text: "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls.",
      meaning:
        "Jesus invites the exhausted to come to Him. The rest He offers is soul-deep — not just physical sleep but the peace that comes from surrendering our burdens to Him.",
    },
    {
      reference: "Psalm 127:2",
      text: "In vain you rise early and stay up late, toiling for food to eat — for he grants sleep to those he loves.",
      meaning:
        "God gives sleep as an act of love. Striving and anxious overworking is in vain. There is a rest that comes from trusting God's provision rather than our own effort.",
    },
    {
      reference: "Isaiah 26:3",
      text: "You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
      meaning:
        "Perfect peace — the Hebrew word is 'shalom shalom' — is the gift for those whose minds are fixed on God. A mind set on Him before sleep is a mind that finds rest.",
    },
    {
      reference: "Philippians 4:6-7",
      text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
      meaning:
        "The anxiety that keeps us awake can be surrendered to God through prayer. His peace then stands guard over our minds through the night.",
    },
    {
      reference: "Psalm 23:2-3",
      text: "He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.",
      meaning:
        "God's care for us is as attentive as a shepherd — He leads us to rest, to stillness, and to soul-refreshment. He wants you to lie down in peace.",
    },
    {
      reference: "John 14:27",
      text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
      meaning:
        "Jesus directly addresses troubled hearts before sleep. His peace isn't the absence of problems — it's a deep calm that remains even when problems are present.",
    },
    {
      reference: "Jeremiah 31:25",
      text: "I will refresh the weary and satisfy the faint.",
      meaning:
        "God promises to refresh those who are truly exhausted. If you're weary to the bone, this verse is for you — He restores and satisfies.",
    },
    {
      reference: "1 Peter 5:7",
      text: "Cast all your anxiety on him because he cares for you.",
      meaning:
        "Before you close your eyes tonight, hand every worry to God. He is awake while you sleep, and He genuinely cares for what is concerning you.",
    },
  ],
  related: [
    { href: "/bible-verses-for-anxiety", label: "Anxiety" },
    { href: "/bible-verses-for-hope", label: "Hope" },
    { href: "/bible-verses-for-strength", label: "Strength" },
    { href: "/bible-verses-for-healing", label: "Healing" },
  ],
  topicSlug: "sleep and rest",
};

export default function Page() {
  return <LandingPage content={content} />;
}
