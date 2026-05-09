import type { Metadata } from "next";
import LandingPage from "@/app/components/LandingPage";

export const metadata: Metadata = {
  title: "Bible Verses for Fear (Courage & Comfort from Scripture)",
  description:
    "10 powerful Bible verses for fear, with meaning and encouragement. Find courage through Scripture and generate a personalized verse for your situation.",
  openGraph: {
    title: "Bible Verses for Fear (Courage & Comfort from Scripture)",
    description:
      "Scripture to overcome fear — with reflections and a free personalized verse generator.",
    url: "https://bibleversegeneratorai.com/bible-verses-for-fear",
  },
};

const content = {
  h1: "Bible Verses for Fear",
  subtitle: "Whatever you are afraid of, God's Word speaks directly to fear — over 365 times.",
  intro:
    "Fear is a powerful emotion that can paralyze us, steal our joy, and make us feel alone. But the Bible is full of God's promises for those who are afraid. These verses remind you that you are not alone, that God is with you, and that His perfect love casts out fear.",
  versesHeading: "Bible Verses for Overcoming Fear",
  verses: [
    {
      reference: "Isaiah 41:10",
      text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
      meaning:
        "God's most repeated command in Scripture is 'do not fear.' This verse explains why: He is with you, He is your God, and He will personally hold you up.",
    },
    {
      reference: "Psalm 23:4",
      text: "Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
      meaning:
        "The reason for fearlessness isn't denial of difficulty — it's the confidence that God walks through every dark valley with us.",
    },
    {
      reference: "Joshua 1:9",
      text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.",
      meaning:
        "God commanded Joshua to be courageous before an intimidating mission. The same command stands for us — courage is possible because God goes with you.",
    },
    {
      reference: "2 Timothy 1:7",
      text: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.",
      meaning:
        "Fear is not from God's Spirit. He equips us with power, love, and clarity — the opposite of a fearful, timid spirit.",
    },
    {
      reference: "Psalm 27:1",
      text: "The LORD is my light and my salvation — whom shall I fear? The LORD is the stronghold of my life — of whom shall I be afraid?",
      meaning:
        "David's bold declaration: when God is your light, salvation, and stronghold — what person or circumstance can truly threaten you?",
    },
    {
      reference: "1 John 4:18",
      text: "There is no fear in love. But perfect love drives out fear, because fear has to do with punishment. The one who fears is not made perfect in love.",
      meaning:
        "The antidote to fear is love. When God's perfect, unconditional love for you is fully received and trusted, fear is displaced.",
    },
    {
      reference: "Isaiah 43:1",
      text: "Do not fear, for I have redeemed you; I have summoned you by name; you are mine.",
      meaning:
        "God speaks these words personally: you are not anonymous to Him. You are named, known, redeemed, and claimed — that identity makes fear powerless.",
    },
    {
      reference: "Deuteronomy 31:6",
      text: "Be strong and courageous. Do not be afraid or terrified because of them, for the LORD your God goes with you; he will never leave you nor forsake you.",
      meaning:
        "Whether you face opposition, uncertainty, or genuine threat — God promises never to abandon you. Courage is grounded in His faithfulness.",
    },
    {
      reference: "Romans 8:15",
      text: "The Spirit you received does not make you slaves, so that you live in fear again; rather, the Spirit you received brought about your adoption to sonship.",
      meaning:
        "Fear keeps us in bondage — but as children of God, we are not slaves to it. Our adoption into God's family is the foundation of fearless living.",
    },
    {
      reference: "Psalm 34:4",
      text: "I sought the LORD, and he answered me; he delivered me from all my fears.",
      meaning:
        "Seeking God is the active step — and deliverance from fear is the promise. This is a testimony of someone who experienced God's faithfulness firsthand.",
    },
  ],
  related: [
    { href: "/bible-verses-for-anxiety", label: "Anxiety" },
    { href: "/bible-verses-for-strength", label: "Strength" },
    { href: "/bible-verses-for-protection", label: "Protection" },
    { href: "/bible-verses-for-guidance", label: "Guidance" },
  ],
  topicSlug: "fear and being afraid",
};

export default function Page() {
  return <LandingPage content={content} />;
}
