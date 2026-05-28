import type { Metadata } from "next";
import LandingPage from "@/app/components/LandingPage";

export const metadata: Metadata = {
  title: "Bible Verses for Guidance (Direction & Wisdom from Scripture)",
  description:
    "10 Bible verses for guidance and direction, with meaning and reflection. Find God's wisdom for major decisions and life crossroads. Free personalized verse generator.",
  openGraph: {
    title: "Bible Verses for Guidance (Direction & Wisdom from Scripture)",
    description: "Scripture for guidance and decisions — with meaning, reflection, and a free verse generator.",
    url: "https://bibleversegeneratorai.com/bible-verses-for-guidance",
  },
};

const content = {
  h1: "Bible Verses for Guidance",
  subtitle: "When you're at a crossroads or don't know which way to go, God promises to lead you.",
  intro:
    "Life is full of decisions — career changes, relationships, family challenges, spiritual questions. The Bible is full of God's promise to guide those who seek Him. These verses will help you slow down, trust His wisdom, and find the direction you're looking for.",
  versesHeading: "Bible Verses for Guidance and Direction",
  verses: [
    {
      reference: "Proverbs 3:5-6",
      text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
      meaning:
        "The foundational verse on guidance: stop relying only on your own analysis. Full surrender to God comes before His direction — when you submit all your ways, He makes the path clear.",
    },
    {
      reference: "Psalm 32:8",
      text: "I will instruct you and teach you in the way you should go; I will counsel you with my loving eye on you.",
      meaning:
        "God doesn't abandon us to figure things out alone — He actively instructs, teaches, and counsels from a loving, watchful care over your life.",
    },
    {
      reference: "James 1:5",
      text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.",
      meaning:
        "James makes it simple: ask for wisdom. God gives it generously, without criticism. The door to guidance is always open.",
    },
    {
      reference: "Isaiah 30:21",
      text: "Whether you turn to the right or to the left, your ears will hear a voice behind you, saying, 'This is the way; walk in it.'",
      meaning:
        "God gives clarity at the moment you need it. He guides from behind — walking with you and speaking at the decision points of life.",
    },
    {
      reference: "Psalm 119:105",
      text: "Your word is a lamp for my feet, a light on my path.",
      meaning:
        "Scripture doesn't always show the entire road — it lights the next step. Consistent time in God's Word is one of the primary ways He guides our decisions.",
    },
    {
      reference: "Proverbs 16:9",
      text: "In their hearts humans plan their course, but the LORD establishes their steps.",
      meaning:
        "Planning is good and wise, but the outcome is in God's hands. We plan, but God directs — we can rest in His sovereignty.",
    },
    {
      reference: "John 16:13",
      text: "But when he, the Spirit of truth, comes, he will guide you into all the truth.",
      meaning:
        "Jesus promised the Holy Spirit as an ever-present guide, leading into truth — spiritual, relational, and practical — for those willing to follow.",
    },
    {
      reference: "Jeremiah 33:3",
      text: "Call to me and I will answer you and tell you great and unsearchable things you do not know.",
      meaning:
        "Prayer unlocks wisdom that human reasoning alone cannot find. God promises to answer with insight beyond our natural understanding.",
    },
    {
      reference: "Romans 8:14",
      text: "For those who are led by the Spirit of God are the children of God.",
      meaning:
        "Being led by God's Spirit is a mark of belonging to God's family. Guidance isn't just about decisions — it's a relationship with a Father who walks with His children.",
    },
    {
      reference: "Matthew 7:7-8",
      text: "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.",
      meaning:
        "Guidance requires active seeking. Jesus promises that the posture of persistent asking is rewarded with answers, discovery, and open doors.",
    },
  ],
  related: [
    { href: "/bible-verses-for-strength", label: "Strength" },
    { href: "/bible-verses-for-hope", label: "Hope" },
    { href: "/bible-verses-for-students", label: "Students" },
    { href: "/bible-verses-for-anxiety", label: "Anxiety" },
  ],
  topicSlug: "guidance and direction",
};

export default function Page() {
  return <LandingPage content={content} />;
}
