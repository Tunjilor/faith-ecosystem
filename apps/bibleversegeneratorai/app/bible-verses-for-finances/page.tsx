import type { Metadata } from "next";
import LandingPage from "@/app/components/LandingPage";

export const metadata: Metadata = {
  title: "Bible Verses for Finances (God's Provision & Financial Wisdom)",
  description:
    "10 powerful Bible verses for financial worry, provision, and wisdom. Find God's peace about money through Scripture. Free personalized verse generator.",
  openGraph: {
    title: "Bible Verses for Finances (God's Provision & Financial Wisdom)",
    description: "Scripture for financial stress and wisdom — with meaning and a free verse generator.",
    url: "https://bibleversegeneratorai.com/bible-verses-for-finances",
  },
};

const content = {
  h1: "Bible Verses for Finances",
  subtitle: "God cares about every area of your life — including your financial worries.",
  intro:
    "Financial stress is one of the most common and heavy burdens people carry. Whether you're in debt, struggling to make ends meet, worried about the future, or simply seeking wisdom with money — God's Word has direct guidance and comfort for your financial situation.",
  versesHeading: "Bible Verses About Money and Financial Peace",
  verses: [
    {
      reference: "Matthew 6:33",
      text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
      meaning:
        "Jesus' core financial principle: prioritize God first, and watch how He provides for the rest. This doesn't promise wealth, but it promises provision for those who put Him first.",
    },
    {
      reference: "Philippians 4:19",
      text: "And my God will meet all your needs according to the riches of his glory in Christ Jesus.",
      meaning:
        "Paul wrote this from prison, yet declared with confidence that God would supply all needs. The source is God's limitless riches — not our bank account.",
    },
    {
      reference: "Proverbs 3:9-10",
      text: "Honor the LORD with your wealth, with the firstfruits of all your crops; then your barns will be filled to overflowing.",
      meaning:
        "Generosity to God is linked to abundance. When we honor God with what we have — even when it's little — He takes care of what comes next.",
    },
    {
      reference: "Matthew 6:19-21",
      text: "Do not store up for yourselves treasures on earth, where moths and vermin destroy, and where thieves break in and steal. But store up for yourselves treasures in heaven.",
      meaning:
        "Jesus reorients our financial goals from earthly accumulation to eternal investment. Our money choices reveal what we truly value.",
    },
    {
      reference: "1 Timothy 6:6-7",
      text: "But godliness with contentment is great gain. For we brought nothing into the world, and we can take nothing out of it.",
      meaning:
        "True financial peace isn't found in having more — it's found in contentment. Godliness with contentment is described as 'great gain,' regardless of bank balance.",
    },
    {
      reference: "Psalm 37:25",
      text: "I was young and now I am old, yet I have never seen the righteous forsaken or their children begging bread.",
      meaning:
        "David's lifelong testimony: God provides for those who walk with Him. His track record of faithfulness is the basis for trusting Him financially.",
    },
    {
      reference: "Malachi 3:10",
      text: "Bring the whole tithe into the storehouse, that there may be food in my house. Test me in this and see if I will not throw open the floodgates of heaven and pour out so much blessing that there will not be room enough to store it.",
      meaning:
        "One of the few places God invites us to test Him. Faithful generosity unlocks His faithful provision — this is a promise with a track record.",
    },
    {
      reference: "2 Corinthians 9:8",
      text: "And God is able to bless you abundantly, so that in all things at all times, having all that you need, you will abound in every good work.",
      meaning:
        "God's goal in provision is not hoarding — it's abundance that overflows into generosity. He supplies so we can supply others.",
    },
    {
      reference: "Luke 16:11",
      text: "So if you have not been trustworthy in handling worldly wealth, who will trust you with true riches?",
      meaning:
        "Faithfulness with money is a spiritual matter. How we handle our finances reflects and shapes our capacity for deeper spiritual responsibility.",
    },
    {
      reference: "Proverbs 22:7",
      text: "The rich rule over the poor, and the borrower is slave to the lender.",
      meaning:
        "A practical word on debt: debt creates bondage. Seeking financial freedom is not just practical wisdom — it's a form of stewardship that honors God.",
    },
  ],
  related: [
    { href: "/bible-verses-for-anxiety", label: "Anxiety" },
    { href: "/bible-verses-for-strength", label: "Strength" },
    { href: "/bible-verses-for-guidance", label: "Guidance" },
    { href: "/bible-verses-for-gratitude", label: "Gratitude" },
  ],
  topicSlug: "finances and financial worry",
};

export default function Page() {
  return <LandingPage content={content} />;
}
