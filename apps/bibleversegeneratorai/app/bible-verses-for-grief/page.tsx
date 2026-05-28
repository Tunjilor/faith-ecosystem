import type { Metadata } from "next";
import LandingPage from "@/app/components/LandingPage";

export const metadata: Metadata = {
  title: "Bible Verses for Grief (Comfort & Hope After Loss)",
  description:
    "10 comforting Bible verses for grief and loss, with meaning and encouragement. Find God's comfort when you are mourning. Free personalized verse generator.",
  openGraph: {
    title: "Bible Verses for Grief (Comfort & Hope After Loss)",
    description: "Scripture for grief and loss — God's comfort in mourning — with meaning and a free verse generator.",
    url: "https://bibleversegeneratorai.com/bible-verses-for-grief",
  },
};

const content = {
  h1: "Bible Verses for Grief",
  subtitle: "God meets us in our grief — He doesn't ask us to grieve less, but to grieve with hope.",
  intro:
    "Grief is the price of love, and the Bible never asks us to pretend it away. From David's laments to Jesus weeping at Lazarus's tomb — God honors grief. These verses offer the comfort of a God who understands loss personally and promises to one day wipe every tear away.",
  versesHeading: "Bible Verses for Those Who Are Grieving",
  verses: [
    {
      reference: "Matthew 5:4",
      text: "Blessed are those who mourn, for they will be comforted.",
      meaning:
        "Jesus begins with the grieving and calls them blessed — not because grief is good, but because God specifically meets those who mourn with His comfort.",
    },
    {
      reference: "Psalm 34:18",
      text: "The LORD is close to the brokenhearted and saves those who are crushed in spirit.",
      meaning:
        "In grief, you may feel God is far away. Scripture says the opposite is true — He draws closest to the brokenhearted.",
    },
    {
      reference: "John 11:35",
      text: "Jesus wept.",
      meaning:
        "The shortest verse in the Bible carries enormous weight: God Himself wept at the grave of His friend. He understands loss from the inside, not just as an observer.",
    },
    {
      reference: "Revelation 21:4",
      text: "He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away.",
      meaning:
        "The ultimate promise for the grieving: a day is coming when God will personally wipe every tear from your eyes. Grief is not the final word.",
    },
    {
      reference: "2 Corinthians 1:3-4",
      text: "Praise be to the God and Father of our Lord Jesus Christ, the Father of compassion and the God of all comfort, who comforts us in all our troubles, so that we can comfort those in any trouble with the comfort we ourselves receive from God.",
      meaning:
        "God is specifically called the God of all comfort — comprehensive, all-encompassing comfort. And He uses our grief to equip us to comfort others.",
    },
    {
      reference: "Psalm 147:3",
      text: "He heals the brokenhearted and binds up their wounds.",
      meaning:
        "God is the healer of broken hearts. Grief is a wound, and He tends to it with the care of a physician who knows exactly what you need.",
    },
    {
      reference: "1 Thessalonians 4:13-14",
      text: "Brothers and sisters, we do not want you to be uninformed about those who sleep in death, so that you do not grieve like the rest of mankind, who have no hope. For we believe that Jesus died and rose again, and so we believe that God will bring with Jesus those who have fallen asleep in him.",
      meaning:
        "For those grieving the loss of a believer: we grieve, but not without hope. The resurrection of Jesus guarantees a reunion for those who are in Him.",
    },
    {
      reference: "Isaiah 61:3",
      text: "To bestow on them a crown of beauty instead of ashes, the oil of joy instead of mourning, and a garment of praise instead of a spirit of despair.",
      meaning:
        "God is in the business of transforming grief into beauty. Ashes become a crown, mourning becomes joy. The exchange is God's promise to the brokenhearted.",
    },
    {
      reference: "Romans 8:28",
      text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
      meaning:
        "This doesn't mean grief is good — it means God is working in all things, including the worst ones. Our loss is not wasted in His hands.",
    },
    {
      reference: "Psalm 30:11",
      text: "You turned my wailing into dancing; you removed my sackcloth and clothed me with joy.",
      meaning:
        "The Psalmist writes looking back — and sees how God transformed his mourning. What feels like permanent grief can become a testimony of God's restoration.",
    },
  ],
  related: [
    { href: "/bible-verses-for-healing", label: "Healing" },
    { href: "/bible-verses-for-hope", label: "Hope" },
    { href: "/bible-verses-for-depression", label: "Depression" },
    { href: "/bible-verses-for-strength", label: "Strength" },
  ],
  topicSlug: "grief and loss",
};

export default function Page() {
  return <LandingPage content={content} />;
}
