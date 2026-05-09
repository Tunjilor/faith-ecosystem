import type { Metadata } from "next";
import LandingPage from "@/app/components/LandingPage";

export const metadata: Metadata = {
  title: "Bible Verses for Protection (God's Shield & Safety in Scripture)",
  description:
    "10 powerful Bible verses about God's protection, with meaning and encouragement. Find safety and confidence in God's promises. Free personalized verse generator.",
  openGraph: {
    title: "Bible Verses for Protection (God's Shield & Safety in Scripture)",
    description: "Scripture about God's protection — with meaning and a free personalized verse generator.",
    url: "https://bibleversegeneratorai.com/bible-verses-for-protection",
  },
};

const content = {
  h1: "Bible Verses for Protection",
  subtitle: "God is your shield, your fortress, and your ever-present defender.",
  intro:
    "Whether you're feeling unsafe, worried about loved ones, facing spiritual attack, or simply seeking God's covering — the Bible is full of His promises of protection. These verses will help you stand firm in the confidence that God goes before you, stands behind you, and surrounds you on every side.",
  versesHeading: "Bible Verses About God's Protection",
  verses: [
    {
      reference: "Psalm 91:1-2",
      text: "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the LORD, 'He is my refuge and my fortress, my God, in whom I trust.'",
      meaning:
        "Psalm 91 is the great protection psalm. It begins with a choice — to dwell in God's shelter. Those who make that choice find themselves in the shadow of the Almighty.",
    },
    {
      reference: "Psalm 121:7-8",
      text: "The LORD will keep you from all harm — he will watch over your life; the LORD will watch over your coming and going both now and forevermore.",
      meaning:
        "God's watchfulness is comprehensive — your going out and coming in, now and always. He is an ever-vigilant protector who never sleeps or turns away.",
    },
    {
      reference: "Proverbs 18:10",
      text: "The name of the LORD is a fortified tower; the righteous run to it and are safe.",
      meaning:
        "God's name — His character and reputation — is a fortified tower. When you call on Him in danger or fear, you are running into real and proven protection.",
    },
    {
      reference: "Psalm 34:7",
      text: "The angel of the LORD encamps around those who fear him, and he delivers them.",
      meaning:
        "The image of angels camping around you is powerful — God's protection is not just passive. He has assigned heavenly protection to those who revere Him.",
    },
    {
      reference: "Romans 8:31",
      text: "What, then, shall we say in response to these things? If God is for us, who can be against us?",
      meaning:
        "Paul's rhetorical question has only one answer: no one who matters. When God is on your side, any threat is ultimately overmatched.",
    },
    {
      reference: "Isaiah 41:10",
      text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
      meaning:
        "God's presence is itself protection. He doesn't just watch from a distance — He walks with you, holds you, and actively helps you through every danger.",
    },
    {
      reference: "John 10:28-29",
      text: "I give them eternal life, and they shall never perish; no one will snatch them out of my hand. My Father, who has given them to me, is greater than all; no one can snatch them out of my Father's hand.",
      meaning:
        "The most ultimate protection: nothing can snatch you from God's hand. Not spiritual forces, not circumstances, not even death. You are held securely.",
    },
    {
      reference: "2 Thessalonians 3:3",
      text: "But the Lord is faithful, and he will strengthen you and protect you from the evil one.",
      meaning:
        "God's faithfulness is the basis of our protection. He will specifically protect us from spiritual attack — this is a promise tied to His unchanging character.",
    },
    {
      reference: "Deuteronomy 31:6",
      text: "Be strong and courageous. Do not be afraid or terrified because of them, for the LORD your God goes with you; he will never leave you nor forsake you.",
      meaning:
        "God's protection means we can be courageous even in threatening situations. He goes before us and never abandons us on the battlefield of life.",
    },
    {
      reference: "Psalm 46:1",
      text: "God is our refuge and strength, an ever-present help in trouble.",
      meaning:
        "God is not a distant emergency resource — He is ever-present. In the moment trouble comes, He is already there as refuge and strength.",
    },
  ],
  related: [
    { href: "/bible-verses-for-fear", label: "Fear" },
    { href: "/bible-verses-for-strength", label: "Strength" },
    { href: "/bible-verses-for-guidance", label: "Guidance" },
    { href: "/bible-verses-for-anxiety", label: "Anxiety" },
  ],
  topicSlug: "protection and safety",
};

export default function Page() {
  return <LandingPage content={content} />;
}
