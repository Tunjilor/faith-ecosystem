import type { Metadata } from "next";
import LandingPage from "@/app/components/LandingPage";

export const metadata: Metadata = {
  title: "Bible Verses for Students (Wisdom & Strength for School & College)",
  description:
    "10 powerful Bible verses for students, with meaning and reflection. Find God's wisdom and strength for exams, stress, and academic life. Free verse generator.",
  openGraph: {
    title: "Bible Verses for Students (Wisdom & Strength for School & College)",
    description: "Scripture for students — wisdom, strength, and focus — with meaning and a free verse generator.",
    url: "https://bibleversegeneratorai.com/bible-verses-for-students",
  },
};

const content = {
  h1: "Bible Verses for Students",
  subtitle: "God is interested in your education — He is the source of all wisdom and knowledge.",
  intro:
    "Student life brings unique pressures — exams, deadlines, uncertainty about the future, academic anxiety, and the challenge of maintaining faith in a new environment. These verses will help you seek God's wisdom for your studies, find strength in hard seasons, and keep an eternal perspective on your academic journey.",
  versesHeading: "Bible Verses for Students and Academic Life",
  verses: [
    {
      reference: "Proverbs 2:6",
      text: "For the LORD gives wisdom; from his mouth come knowledge and understanding.",
      meaning:
        "All true wisdom ultimately comes from God. When you study, you're exploring the knowledge that originates with the One who created everything you're learning about.",
    },
    {
      reference: "James 1:5",
      text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.",
      meaning:
        "Before an exam, before a difficult assignment, before a major decision — ask God for wisdom. He gives it generously and without criticism.",
    },
    {
      reference: "Philippians 4:13",
      text: "I can do all this through him who gives me strength.",
      meaning:
        "That difficult course, that intimidating exam, that overwhelming workload — you can do it, through Christ who empowers you. This is not a slogan; it's a promise.",
    },
    {
      reference: "Joshua 1:9",
      text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.",
      meaning:
        "Courage in the classroom, courage in a new environment, courage in uncertainty — God's command to be courageous is backed by His promise to be with you.",
    },
    {
      reference: "2 Timothy 2:15",
      text: "Do your best to present yourself to God as one approved, a worker who does not need to be ashamed and who correctly handles the word of truth.",
      meaning:
        "Diligence in your studies is a form of worship. Giving your best effort in your work is honoring to God — He sees your commitment and blesses it.",
    },
    {
      reference: "Psalm 119:66",
      text: "Teach me knowledge and good judgment, for I trust your commands.",
      meaning:
        "This is a prayer for students: Lord, teach me. Approach your education as someone who is learning from and about a God who delights in your growing understanding.",
    },
    {
      reference: "Daniel 1:17",
      text: "To these four young men God gave knowledge and understanding of all kinds of literature and learning. And Daniel could understand visions and dreams of all kinds.",
      meaning:
        "Daniel and his friends excelled in their education — and Scripture credits God as the source of their exceptional learning. God is still in the business of giving knowledge.",
    },
    {
      reference: "Proverbs 3:5-6",
      text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
      meaning:
        "For decisions about majors, careers, and the future — trust God's guidance over your own best guess. He sees the whole road; you only see the next step.",
    },
    {
      reference: "Matthew 19:26",
      text: "Jesus looked at them and said, 'With man this is impossible, but with God all things are possible.'",
      meaning:
        "When the task feels impossible — the course, the exam, the deadline — remember that possibility expands dramatically when God is involved.",
    },
    {
      reference: "Psalm 32:8",
      text: "I will instruct you and teach you in the way you should go; I will counsel you with my loving eye on you.",
      meaning:
        "God promises to personally instruct and teach you. He is the best academic advisor you have access to — His eye is on you with love and wisdom.",
    },
  ],
  related: [
    { href: "/bible-verses-for-anxiety", label: "Anxiety" },
    { href: "/bible-verses-for-strength", label: "Strength" },
    { href: "/bible-verses-for-guidance", label: "Guidance" },
    { href: "/bible-verses-for-hope", label: "Hope" },
  ],
  topicSlug: "students and school stress",
};

export default function Page() {
  return <LandingPage content={content} />;
}
