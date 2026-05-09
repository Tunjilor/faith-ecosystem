import type { Metadata } from "next";
import LandingPage from "@/app/components/LandingPage";

export const metadata: Metadata = {
  title: "Bible Verses for Hope (Encouragement When Life Is Hard)",
  description:
    "10 powerful Bible verses for hope, with meaning and encouragement. Find light in the darkness through Scripture and a free personalized verse generator.",
  openGraph: {
    title: "Bible Verses for Hope (Encouragement When Life Is Hard)",
    description: "Scripture to renew hope — with meaning, reflection, and a free verse generator.",
    url: "https://bibleversegeneratorai.com/bible-verses-for-hope",
  },
};

const content = {
  h1: "Bible Verses for Hope",
  subtitle: "Even in the darkest moments, God's promises light the way forward.",
  intro:
    "Hope is not wishful thinking — it's a confident expectation rooted in who God is and what He has promised. When circumstances are dark and hope feels distant, Scripture anchors our hearts in something unshakeable. These verses will help you find and hold onto real, lasting hope.",
  versesHeading: "Bible Verses About Hope",
  verses: [
    {
      reference: "Jeremiah 29:11",
      text: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.",
      meaning:
        "Written to people in exile — in the hardest season of their lives — God declared that His plans for them were good. He says the same to you today.",
    },
    {
      reference: "Romans 15:13",
      text: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.",
      meaning:
        "God Himself is called the God of hope — hope is part of His character. He fills us with hope by His Spirit, not by our own effort or optimism.",
    },
    {
      reference: "Lamentations 3:22-23",
      text: "Because of the LORD's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.",
      meaning:
        "Written at one of Israel's lowest points — yet the author finds reason to hope: God's mercies are fresh every single morning. Each day is a new beginning with Him.",
    },
    {
      reference: "Romans 5:3-5",
      text: "Not only so, but we also glory in our sufferings, because we know that suffering produces perseverance; perseverance, character; and character, hope. And hope does not put us to shame, because God's love has been poured out into our hearts through the Holy Spirit.",
      meaning:
        "Paul reveals the surprising source of hope: it grows through difficulty. Suffering → perseverance → character → hope. This is the path God often takes us on.",
    },
    {
      reference: "Isaiah 40:31",
      text: "But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
      meaning:
        "Hope in God doesn't just comfort us — it energizes us. When we anchor our hope in Him, He renews our capacity to keep going.",
    },
    {
      reference: "Hebrews 11:1",
      text: "Now faith is confidence in what we hope for and assurance about what we do not see.",
      meaning:
        "Hope and faith are intertwined. Hope is the forward-looking confidence that what God has promised will come — even when it hasn't yet arrived.",
    },
    {
      reference: "Psalm 31:24",
      text: "Be strong and take heart, all you who hope in the LORD.",
      meaning:
        "Hoping in God is itself an act of courage. This verse is a direct encouragement to those in difficult circumstances: be strong — your hope in Him is not misplaced.",
    },
    {
      reference: "Colossians 1:27",
      text: "To them God has chosen to make known among the Gentiles the glorious riches of this mystery, which is Christ in you, the hope of glory.",
      meaning:
        "The ultimate source of hope: Christ living in us. Not a religious idea, but the risen Jesus dwelling within you — that is the foundation of real, lasting hope.",
    },
    {
      reference: "Romans 8:24-25",
      text: "For in this hope we were saved. But hope that is seen is no hope at all. Who hopes for what they already have? But if we hope for what we do not yet have, we wait for it patiently.",
      meaning:
        "Christian hope is future-oriented — it looks toward what God has promised but not yet fully delivered. Patient waiting is part of hope, and God honors that patience.",
    },
    {
      reference: "Psalm 71:14",
      text: "As for me, I will always have hope; I will praise you more and more.",
      meaning:
        "Hope is a choice as much as a feeling. Even when circumstances push toward despair, we can choose — like the Psalmist — to hold onto hope and praise God through it.",
    },
  ],
  related: [
    { href: "/bible-verses-for-strength", label: "Strength" },
    { href: "/bible-verses-for-healing", label: "Healing" },
    { href: "/bible-verses-for-depression", label: "Depression" },
    { href: "/bible-verses-for-anxiety", label: "Anxiety" },
  ],
  topicSlug: "hope and encouragement",
};

export default function Page() {
  return <LandingPage content={content} />;
}
