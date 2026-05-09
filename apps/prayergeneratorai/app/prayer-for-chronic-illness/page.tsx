
export const metadata = {
  title: "Prayer for Chronic Illness (Endurance, Peace, and Healing)",
  description:
    "A Christian prayer for chronic illness — seeking God's strength, peace, and healing through long-term health struggles.",
};

import Link from "next/link";

export default function ChronicIllnessPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Chronic Illness
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Living with a chronic illness is exhausting in ways others may not
        understand. This prayer is for those who face daily pain, fatigue, or
        limitation — asking God for endurance, peace, and the hope of healing.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Lord,
          <br />
          <br />
          This illness has taken so much — my energy, my plans, sometimes my
          hope. I am tired of fighting battles that never seem to end. But I
          come to You because You are my strength when I have none.
          <br />
          <br />
          Please give me grace for today. Not a cure necessarily — though I
          believe You can — but grace for this moment, this hour, this day.
          Help me find joy in what remains and purpose in the middle of the
          pain.
          <br />
          <br />
          Guide my doctors to answers, sustain my spirit, and let me know
          that You are near in every hard moment.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Chronic Illness?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for your specific
          condition and daily needs.
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
