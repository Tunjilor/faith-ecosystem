import type { Metadata } from "next";
import LandingPage from "@/app/components/LandingPage";

export const metadata: Metadata = {
  title: "Bible Verses for Anxiety (With Meaning & Comfort)",
  description:
    "Find the most powerful Bible verses for anxiety and worry. 10 scriptures with explanations to calm your heart, plus a free personalized verse generator.",
  openGraph: {
    title: "Bible Verses for Anxiety (With Meaning & Comfort)",
    description:
      "Scripture to calm anxiety and worry — with reflections, a free verse generator, and links to prayer.",
    url: "https://bibleversegeneratorai.com/bible-verses-for-anxiety",
  },
};

const content = {
  h1: "Bible Verses for Anxiety",
  subtitle: "When anxiety feels heavy, God's Word brings peace, comfort, and reassurance.",
  intro:
    "Anxiety is one of the most common struggles people face. Whether it's worry about the future, overwhelming stress, or a heart that won't stop racing — Scripture has spoken directly to this experience for thousands of years. These verses offer real comfort and remind you that God is present in your fear.",
  versesHeading: "Powerful Bible Verses for Anxiety",
  verses: [
    {
      reference: "Philippians 4:6-7",
      text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
      meaning:
        "One of the most direct commands about anxiety in the Bible — replace worry with prayer, and God promises a supernatural peace that goes beyond logic or understanding.",
    },
    {
      reference: "Isaiah 41:10",
      text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
      meaning:
        "God's answer to anxiety is His presence. He doesn't just say 'don't be afraid' — He promises to be right there with you, strengthening and holding you up.",
    },
    {
      reference: "1 Peter 5:7",
      text: "Cast all your anxiety on him because he cares for you.",
      meaning:
        "A beautiful, simple invitation. God doesn't want you to carry anxiety alone — He wants you to physically hand every worry over to Him, because He genuinely cares about your wellbeing.",
    },
    {
      reference: "Matthew 6:34",
      text: "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.",
      meaning:
        "Jesus himself addresses anxious thinking here. Much of our anxiety is about the future — He invites us to focus on today and trust Him with what's ahead.",
    },
    {
      reference: "John 14:27",
      text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
      meaning:
        "The peace Jesus offers isn't the temporary calm the world provides — it's a deep, enduring peace that can coexist even with difficult circumstances.",
    },
    {
      reference: "Psalm 34:4",
      text: "I sought the LORD, and he answered me; he delivered me from all my fears.",
      meaning:
        "David wrote this from personal experience. Seeking God is the active step — and the promise is that He answers and delivers us from the fears that grip us.",
    },
    {
      reference: "Romans 8:28",
      text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
      meaning:
        "Even the most anxiety-inducing situations are held in God's hands. This verse anchors us in the confidence that He is working in all things, not despite them.",
    },
    {
      reference: "2 Timothy 1:7",
      text: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.",
      meaning:
        "Fear and anxiety are not from God's Spirit. His Spirit produces the opposite — power to face challenges, love that casts out fear, and a clear, self-controlled mind.",
    },
    {
      reference: "Psalm 55:22",
      text: "Cast your cares on the LORD and he will sustain you; he will never let the righteous be shaken.",
      meaning:
        "Like 1 Peter 5:7, this is an active call to give your burdens to God. The promise is clear — He will sustain you and keep you from collapsing under the weight.",
    },
    {
      reference: "Matthew 11:28-30",
      text: "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls.",
      meaning:
        "Jesus extends an open invitation to anyone carrying heavy anxiety. The rest He offers isn't passive — it comes through walking with Him and learning His gentle ways.",
    },
  ],
  related: [
    { href: "/bible-verses-for-fear", label: "Fear" },
    { href: "/bible-verses-for-depression", label: "Depression" },
    { href: "/bible-verses-for-sleep", label: "Sleep" },
    { href: "/bible-verses-for-hope", label: "Hope" },
  ],
  topicSlug: "anxiety and worry",
};

export default function Page() {
  return <LandingPage content={content} />;
}
