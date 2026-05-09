import type { Metadata } from "next";
import LandingPage from "@/app/components/LandingPage";

export const metadata: Metadata = {
  title: "Bible Verses for Depression (Hope & Comfort in Scripture)",
  description:
    "10 powerful Bible verses for depression and despair, with meaning and reflection. Find God's comfort in your darkest moments. Free personalized verse generator.",
  openGraph: {
    title: "Bible Verses for Depression (Hope & Comfort in Scripture)",
    description: "Scripture for depression — God's presence in the darkest moments — with meaning and a free verse generator.",
    url: "https://bibleversegeneratorai.com/bible-verses-for-depression",
  },
};

const content = {
  h1: "Bible Verses for Depression",
  subtitle: "God meets you in your darkest moments — and Scripture speaks honestly about depression.",
  intro:
    "Depression is real, it's painful, and it's not a sign of spiritual failure. Many of the Bible's greatest figures — David, Elijah, Jeremiah, Job — struggled with deep despair. These verses don't offer empty platitudes; they offer the presence of a God who draws close to the brokenhearted and knows what it's like to suffer.",
  versesHeading: "Bible Verses for Those Struggling with Depression",
  verses: [
    {
      reference: "Psalm 34:18",
      text: "The LORD is close to the brokenhearted and saves those who are crushed in spirit.",
      meaning:
        "This is one of the most comforting truths in all of Scripture — when you are at your lowest, God is not distant. He draws closest to the brokenhearted.",
    },
    {
      reference: "Matthew 11:28-30",
      text: "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls.",
      meaning:
        "Jesus speaks directly to the exhausted and overwhelmed. He doesn't ask you to perform or get better first — just to come to Him as you are.",
    },
    {
      reference: "Psalm 42:11",
      text: "Why, my soul, are you downcast? Why so disturbed within me? Put your hope in God, for I will yet praise him, my Savior and my God.",
      meaning:
        "The Psalmist is honest about his depression — he questions his own soul. But then he points himself back to God. This is the practice: acknowledge the darkness, then turn toward hope.",
    },
    {
      reference: "Isaiah 43:2",
      text: "When you pass through the waters, I will be with you; and when you pass through the rivers, they will not sweep over you. When you walk through the fire, you will not be burned; the flames will not set you ablaze.",
      meaning:
        "God doesn't always remove the suffering — He promises to be with us through it. You are not alone in the waters you're walking through right now.",
    },
    {
      reference: "2 Corinthians 4:8-9",
      text: "We are hard pressed on every side, but not crushed; perplexed, but not in despair; persecuted, but not abandoned; struck down, but not destroyed.",
      meaning:
        "Paul writes with radical honesty — things are hard, really hard — but God's presence means we are never completely crushed. There is always a 'but not' with God.",
    },
    {
      reference: "Psalm 30:5",
      text: "For his anger lasts only a moment, but his favor lasts a lifetime; weeping may stay for the night, but rejoicing comes in the morning.",
      meaning:
        "One of the most beautiful promises about depression: it is a night season, not a permanent state. Morning is coming — not as denial, but as promise.",
    },
    {
      reference: "1 Kings 19:5",
      text: "All at once an angel touched him and said, 'Get up and eat.' He looked around, and there by his head was some bread baked over hot coals, and a jar of water. He ate and drank and then lay down again.",
      meaning:
        "Elijah was suicidal under a juniper tree, and God's first response was food and rest — not a lecture. God meets physical and emotional needs with gentleness.",
    },
    {
      reference: "Romans 8:18",
      text: "I consider that our present sufferings are not worth comparing with the glory that will be revealed in us.",
      meaning:
        "This verse doesn't minimize pain — it puts it in eternal perspective. What is coming is so magnificent that it reframes present suffering.",
    },
    {
      reference: "Psalm 23:4",
      text: "Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
      meaning:
        "The valley of the shadow of death is a real place — but God walks through it with us. His presence is the comfort, not the removal of the valley.",
    },
    {
      reference: "Jeremiah 29:11",
      text: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.",
      meaning:
        "Depression lies and says there is no future. God declares the opposite: He has specific, good plans for you that include hope and a future.",
    },
  ],
  related: [
    { href: "/bible-verses-for-anxiety", label: "Anxiety" },
    { href: "/bible-verses-for-hope", label: "Hope" },
    { href: "/bible-verses-for-healing", label: "Healing" },
    { href: "/bible-verses-for-grief", label: "Grief" },
  ],
  topicSlug: "depression and despair",
};

export default function Page() {
  return <LandingPage content={content} />;
}
