
export const metadata = {
  title: "Prayer for Grief and Loss (Comfort in Your Sorrow)",
  description:
    "A compassionate Christian prayer for grief and loss — bringing sorrow to God and receiving His comfort, hope, and peace.",
};

import Link from "next/link";

export default function GriefAndLossPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Grief and Loss
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Grief is love with nowhere to go. This prayer is for those who are
        mourning a loss — whether a person, a relationship, a dream, or a
        season. God meets us in our sorrow and promises to bring comfort.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Lord,
          <br />
          <br />
          My heart is broken. I am carrying a grief that feels too heavy to
          bear. I miss what was and I am afraid of what comes next. I do not
          have words to explain the depth of this pain — but You already know.
          <br />
          <br />
          You promised to be close to the brokenhearted and to save those who
          are crushed in spirit. Be that for me now. Wrap me in Your presence
          and let me feel that I am not alone in this.
          <br />
          <br />
          Give me permission to grieve while also holding out hope. Remind me
          that this is not the end of the story, because You are not finished.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Your Grief?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for the specific loss
          you are carrying.
        </p>

        <Link
          href="/"
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold"
        >
          Generate My Prayer
        </Link>
      </div>
    </main>
  );
}
