import type { Metadata } from "next";
import LandingPage from "@/app/components/LandingPage";

export const metadata: Metadata = {
  title: "Bible Verses for Addiction (Freedom & Recovery Through Scripture)",
  description:
    "10 powerful Bible verses for overcoming addiction, with meaning and hope. Find God's strength for recovery. Free personalized verse generator.",
  openGraph: {
    title: "Bible Verses for Addiction (Freedom & Recovery Through Scripture)",
    description: "Scripture for addiction recovery — God's freedom and strength — with meaning and a free verse generator.",
    url: "https://bibleversegeneratorai.com/bible-verses-for-addiction",
  },
};

const content = {
  h1: "Bible Verses for Addiction",
  subtitle: "God's power is stronger than any addiction — and recovery is possible through Him.",
  intro:
    "Addiction affects millions of people across every walk of life. Whether you're struggling with substance use, behavioral addiction, or helping someone you love — the Bible speaks powerfully about bondage and freedom. God does not shame those who struggle; He offers grace, power, and a way out.",
  versesHeading: "Bible Verses for Freedom from Addiction",
  verses: [
    {
      reference: "John 8:36",
      text: "So if the Son sets you free, you will be free indeed.",
      meaning:
        "Jesus offers a freedom that is complete and real — not just behavior management but genuine liberation at the deepest level. What He frees, stays free.",
    },
    {
      reference: "1 Corinthians 10:13",
      text: "No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear. But when you are tempted, he will also provide a way out so that you can endure it.",
      meaning:
        "God always provides a way of escape in the moment of temptation. The craving is real — but the exit is always there. Look for it.",
    },
    {
      reference: "Galatians 5:1",
      text: "It is for freedom that Christ has set us free. Stand firm, then, and do not let yourselves be burdened again by a yoke of slavery.",
      meaning:
        "Freedom is God's purpose for you — not just from consequences, but from the bondage itself. Recovery is about learning to stand firm in a freedom that is already yours in Christ.",
    },
    {
      reference: "Romans 6:14",
      text: "For sin shall no longer be your master, because you are not under the law, but under grace.",
      meaning:
        "Addiction says it has power over you — but Scripture says sin is no longer your master. Under grace, the old master has lost its authority over your life.",
    },
    {
      reference: "Romans 8:1-2",
      text: "Therefore, there is now no condemnation for those who are in Christ Jesus, because through Christ Jesus the law of the Spirit who gives life has set you free from the law of sin and death.",
      meaning:
        "No condemnation — this is critical for recovery. Shame drives us back to addiction; grace is what breaks the cycle. You are free from both condemnation and the pull of sin.",
    },
    {
      reference: "Philippians 4:13",
      text: "I can do all this through him who gives me strength.",
      meaning:
        "Recovery is hard — genuinely hard. But it is possible through Christ's strength. This verse is not passive; it means actively drawing on His power in every difficult moment.",
    },
    {
      reference: "James 4:7",
      text: "Submit yourselves, then, to God. Resist the devil, and he will flee from you.",
      meaning:
        "The two-step pattern for overcoming temptation: submit to God, then resist. Resistance without submission tends to fail; but when we're yielded to God, resistance becomes possible.",
    },
    {
      reference: "2 Corinthians 5:17",
      text: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
      meaning:
        "Your identity in Christ is new — not just reformed, but recreated. Recovery is the process of learning to live out what is already true about who you are.",
    },
    {
      reference: "Isaiah 41:10",
      text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
      meaning:
        "The road of recovery is not walked alone. God promises to strengthen you, help you, and hold you up. Relapse does not disqualify you from this promise.",
    },
    {
      reference: "Psalm 34:18",
      text: "The LORD is close to the brokenhearted and saves those who are crushed in spirit.",
      meaning:
        "The shame and brokenness of addiction don't push God away — they draw Him closer. He is especially near to those who are crushed.",
    },
  ],
  related: [
    { href: "/bible-verses-for-strength", label: "Strength" },
    { href: "/bible-verses-for-healing", label: "Healing" },
    { href: "/bible-verses-for-forgiveness", label: "Forgiveness" },
    { href: "/bible-verses-for-hope", label: "Hope" },
  ],
  topicSlug: "addiction and recovery",
};

export default function Page() {
  return <LandingPage content={content} />;
}
