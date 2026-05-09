
export const metadata = {
  title: "New Year Prayer (Step Into the New Year with God)",
  description:
    "A Christian prayer for the New Year — surrendering the year ahead to God, setting intentions of faith, and trusting His plans.",
};

import Link from "next/link";

export default function NewYearPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        New Year Prayer
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        A new year is a gift — an invitation to begin again. This prayer
        surrenders the year ahead to God, reflects on His faithfulness in the
        past, and steps into what's next with hope and trust.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Father,
          <br />
          <br />
          As a new year begins, I come to You first. Thank You for walking with
          me through the year that has passed — through the highs and the lows,
          through every moment You carried me that I may not have even noticed.
          <br />
          <br />
          I step into this new year with open hands. I don't know what it holds,
          but I trust the One who holds it. Please guide my steps, align my
          desires with Your will, and help me to grow in faith, love, and
          purpose.
          <br />
          <br />
          May this year bring me closer to You than I have ever been before.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized New Year Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for this new year based
          on your specific hopes, goals, and needs.
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
