
export const metadata = {
  title: "Prayer for Family (Love, Protection, and Unity)",
  description:
    "Pray for your family with this Christian prayer for love, protection, unity, peace, and guidance.",
};

import Link from "next/link";

export default function FamilyPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Family
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Families face joys, challenges, changes, and seasons of uncertainty.
        This prayer asks God for love, protection, patience, and unity.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Heavenly Father,
          <br />
          <br />
          Thank You for the gift of family. Please bless my family with love,
          patience, understanding, and peace.
          <br />
          <br />
          Protect our hearts from anger, division, and bitterness. Help us speak
          with kindness, forgive with humility, and support one another through
          every season.
          <br />
          <br />
          Guide our decisions, strengthen our relationships, and let Your love
          be the foundation of our home.
          <br />
          <br />
          In Jesus’ name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Family Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Generate a custom prayer for your family’s specific need, situation,
          or concern.
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
