
export const metadata = {
  title: "Prayer for Gratitude (Thankfulness and Reflection)",
  description:
    "A Christian prayer of gratitude to thank God for blessings, daily provision, strength, and grace.",
};

import Link from "next/link";

export default function GratitudePrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Gratitude
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Gratitude helps us slow down and notice God’s blessings. This prayer is
        a simple way to give thanks.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Heavenly Father,
          <br />
          <br />
          Thank You for Your love, mercy, and daily provision. Thank You for the
          blessings I notice and the ones I sometimes overlook.
          <br />
          <br />
          Help me live with a grateful heart. Teach me to appreciate each day,
          love others well, and remember that every good gift comes from You.
          <br />
          <br />
          May gratitude shape my attitude, my words, and my actions.
          <br />
          <br />
          In Jesus’ name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Gratitude Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Generate a prayer of thanks based on your blessings, season, or
          personal reflection.
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
