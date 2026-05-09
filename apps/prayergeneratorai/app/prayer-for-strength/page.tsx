
export const metadata = {
  title: "Prayer for Strength (Courage During Hard Times)",
  description:
    "Need strength today? Read a Christian prayer for courage, endurance, faith, and peace.",
};

import Link from "next/link";

export default function StrengthPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Strength
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        When life feels heavy, prayer can help you pause, breathe, and ask God
        for the strength to keep going.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Heavenly Father,
          <br />
          <br />
          I feel tired, stretched, and in need of strength. Please help me face
          this day with courage and faith.
          <br />
          <br />
          When I feel weak, remind me that I do not have to carry everything
          alone. Give me patience, wisdom, endurance, and peace.
          <br />
          <br />
          Help me take one step at a time and trust that You are with me in
          every challenge.
          <br />
          <br />
          In Jesus’ name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Strength?
        </h2>

        <p className="text-gray-400 mb-6">
          Create a prayer based on what you are personally facing today.
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
