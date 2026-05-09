
export const metadata = {
  title: "Prayer for Mental Health (Peace, Clarity, and Wholeness)",
  description:
    "A Christian prayer for mental health — asking God for peace, clarity, healing, and strength in times of emotional struggle.",
};

import Link from "next/link";

export default function MentalHealthPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Mental Health
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Mental health struggles are real and they matter to God. This prayer
        brings your emotional pain, mental exhaustion, and inner battles before
        the One who heals from the inside out.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Father God,
          <br />
          <br />
          I am struggling. My mind feels heavy, my emotions are overwhelming,
          and some days it is hard just to get through the hours. I come to You
          not because I have it figured out but because I know You are close to
          the brokenhearted.
          <br />
          <br />
          Please bring peace to my mind. Help me find the right support —
          whether through community, counseling, or Your Word. Quiet the voices
          of shame and give me the courage to reach out for help.
          <br />
          <br />
          Remind me that I am not alone and that this season will not last
          forever. Restore wholeness to every part of me.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Mental Health Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to create a prayer that speaks directly
          to what you're experiencing right now.
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
