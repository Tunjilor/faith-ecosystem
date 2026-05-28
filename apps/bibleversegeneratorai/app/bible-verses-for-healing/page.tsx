import type { Metadata } from "next";
import LandingPage from "@/app/components/LandingPage";

export const metadata: Metadata = {
  title: "Bible Verses for Healing (Physical & Emotional Restoration)",
  description:
    "10 powerful Bible verses for healing, with meaning and encouragement. Find comfort in Scripture for physical illness, emotional wounds, and grief.",
  openGraph: {
    title: "Bible Verses for Healing (Physical & Emotional Restoration)",
    description: "Scripture for healing — physical and emotional — with meaning and a free verse generator.",
    url: "https://bibleversegeneratorai.com/bible-verses-for-healing",
  },
};

const content = {
  h1: "Bible Verses for Healing",
  subtitle: "God is the ultimate healer — of bodies, hearts, and broken spirits.",
  intro:
    "Whether you're facing illness, recovering from trauma, dealing with emotional wounds, or walking through grief — God's Word speaks directly to your need for healing. These verses remind you that you serve a God who heals, restores, and draws near to those who are suffering.",
  versesHeading: "Bible Verses About Healing",
  verses: [
    {
      reference: "Jeremiah 17:14",
      text: "Heal me, LORD, and I will be healed; save me and I will be saved, for you are the one I praise.",
      meaning:
        "Jeremiah's prayer is a model for us — honest, direct, and full of faith. God alone is the source of true healing, and calling on Him is the first step.",
    },
    {
      reference: "Psalm 147:3",
      text: "He heals the brokenhearted and binds up their wounds.",
      meaning:
        "God's healing isn't limited to the physical — He specifically tends to broken hearts and emotional wounds. He is the gentle healer of the whole person.",
    },
    {
      reference: "Isaiah 53:5",
      text: "But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed.",
      meaning:
        "The most profound healing verse in Scripture — Jesus bore our pain so we could be made whole. This healing is both spiritual and has implications for every area of life.",
    },
    {
      reference: "Exodus 15:26",
      text: "I am the LORD, who heals you.",
      meaning:
        "One of God's names in Scripture is Jehovah Rapha — 'the God who heals.' Healing is central to who He is, not just what He sometimes does.",
    },
    {
      reference: "Matthew 11:28-30",
      text: "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls.",
      meaning:
        "Jesus invites the exhausted and hurting. The rest He offers heals the soul — not by removing all difficulty, but by walking through it with Him.",
    },
    {
      reference: "James 5:16",
      text: "Therefore confess your sins to each other and pray for each other so that you may be healed. The prayer of a righteous person is powerful and effective.",
      meaning:
        "Healing can come through the community of faith — when we pray for one another with honesty and righteousness. Don't walk through sickness or pain alone.",
    },
    {
      reference: "Psalm 103:2-3",
      text: "Praise the LORD, my soul, and forget not all his benefits — who forgives all your sins and heals all your diseases.",
      meaning:
        "God's healing is listed alongside His forgiveness as a fundamental benefit of belonging to Him. He is comprehensively restorative.",
    },
    {
      reference: "Revelation 21:4",
      text: "He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away.",
      meaning:
        "The ultimate healing is promised for eternity — when God personally wipes every tear. Even when healing doesn't come as we hope in this life, complete restoration is guaranteed.",
    },
    {
      reference: "Romans 8:18",
      text: "I consider that our present sufferings are not worth comparing with the glory that will be revealed in us.",
      meaning:
        "For those in long suffering, Paul offers perspective: what's coming is so glorious it reframes our present pain. Healing is coming — in some form — for those in Christ.",
    },
    {
      reference: "3 John 1:2",
      text: "Dear friend, I pray that you may enjoy good health and that all may go well with you, even as your soul is getting along well.",
      meaning:
        "John's prayer shows that God cares about our physical health as well as our spiritual health. He wants us to flourish in both.",
    },
  ],
  related: [
    { href: "/bible-verses-for-strength", label: "Strength" },
    { href: "/bible-verses-for-hope", label: "Hope" },
    { href: "/bible-verses-for-grief", label: "Grief" },
    { href: "/bible-verses-for-depression", label: "Depression" },
  ],
  topicSlug: "healing and recovery",
};

export default function Page() {
  return <LandingPage content={content} />;
}
