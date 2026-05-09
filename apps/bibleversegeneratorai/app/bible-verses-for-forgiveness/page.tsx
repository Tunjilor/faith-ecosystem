import type { Metadata } from "next";
import LandingPage from "@/app/components/LandingPage";

export const metadata: Metadata = {
  title: "Bible Verses for Forgiveness (Healing & Freedom in Scripture)",
  description:
    "10 powerful Bible verses about forgiveness — forgiving others and receiving God's forgiveness. With meaning, reflection, and a personalized verse generator.",
  openGraph: {
    title: "Bible Verses for Forgiveness (Healing & Freedom in Scripture)",
    description: "Scripture on forgiveness with meaning, reflection, and a free verse generator.",
    url: "https://bibleversegeneratorai.com/bible-verses-for-forgiveness",
  },
};

const content = {
  h1: "Bible Verses for Forgiveness",
  subtitle: "Forgiveness is one of the most powerful acts — and Scripture shows us how and why.",
  intro:
    "Whether you need to forgive someone who has deeply hurt you, or you're struggling to receive God's forgiveness for yourself, the Bible speaks powerfully about this topic. These verses will help you understand the depth of God's mercy and find the freedom that comes through releasing others.",
  versesHeading: "Bible Verses About Forgiveness",
  verses: [
    {
      reference: "Colossians 3:13",
      text: "Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you.",
      meaning:
        "The standard and motivation are the same: forgive as God forgave you. When we remember the magnitude of our own forgiveness, forgiving others becomes more possible.",
    },
    {
      reference: "Ephesians 4:32",
      text: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.",
      meaning:
        "Forgiveness flows from kindness and compassion. Christ's forgiveness toward us is both the model and the power source for forgiving others.",
    },
    {
      reference: "1 John 1:9",
      text: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.",
      meaning:
        "For those weighed down by guilt, this is one of the most freeing verses. God's forgiveness is certain and complete — not partial or dependent on our feelings.",
    },
    {
      reference: "Matthew 6:14-15",
      text: "For if you forgive other people when they sin against you, your heavenly Father will also forgive you. But if you do not forgive others their sins, your Father will not forgive your sins.",
      meaning:
        "Jesus connects our willingness to forgive with our experience of being forgiven. Holding onto unforgiveness affects our own spiritual freedom.",
    },
    {
      reference: "Psalm 103:12",
      text: "As far as the east is from the west, so far has he removed our transgressions from us.",
      meaning:
        "East and west never meet — they are infinite in distance. That's how thoroughly God removes our sin. He doesn't remember it against us.",
    },
    {
      reference: "Matthew 18:21-22",
      text: "Then Peter came to Jesus and asked, 'Lord, how many times shall I forgive my brother or sister who sins against me? Up to seven times?' Jesus answered, 'I tell you, not seven times, but seventy-seven times.'",
      meaning:
        "Forgiveness isn't a limited resource — it's a posture of the heart that reflects God's own inexhaustible mercy toward us.",
    },
    {
      reference: "Romans 12:19",
      text: "Do not take revenge, my dear friends, but leave room for God's wrath, for it is written: 'It is mine to avenge; I will repay,' says the Lord.",
      meaning:
        "Forgiveness doesn't mean injustice goes unaddressed — it means we trust God to handle what we cannot. Releasing revenge is releasing the burden to Him.",
    },
    {
      reference: "Luke 23:34",
      text: "Jesus said, 'Father, forgive them, for they do not know what they are doing.'",
      meaning:
        "Jesus modeled forgiveness at its most extreme — forgiving those killing Him, in real time. This is the ultimate example of forgiving those who feel least deserving.",
    },
    {
      reference: "Micah 7:18",
      text: "Who is a God like you, who pardons sin and forgives the transgression of the remnant of his inheritance? You do not stay angry forever but delight to show mercy.",
      meaning:
        "God's very nature is merciful. He doesn't hold grudges — He delights in mercy. That's the God who offers you forgiveness today.",
    },
    {
      reference: "Isaiah 43:25",
      text: "I, even I, am he who blots out your transgressions, for my own sake, and remembers your sins no more.",
      meaning:
        "God doesn't just forgive — He forgets. For those haunted by shame over past mistakes, this is extraordinary news.",
    },
  ],
  related: [
    { href: "/bible-verses-for-love", label: "Love" },
    { href: "/bible-verses-for-anger", label: "Anger" },
    { href: "/bible-verses-for-healing", label: "Healing" },
    { href: "/bible-verses-for-hope", label: "Hope" },
  ],
  topicSlug: "forgiveness",
};

export default function Page() {
  return <LandingPage content={content} />;
}
