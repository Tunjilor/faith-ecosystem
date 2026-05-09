
export const metadata = {
  title: "Prayer for Parents (Honor and Bless Your Mom and Dad)",
  description:
    "A heartfelt Christian prayer for your parents — asking God to bless, protect, and bring peace into their lives.",
};

import Link from "next/link";

export default function ParentsPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Parents
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Whether you are praying for aging parents, a parent facing hardship, or
        simply wanting to honor those who raised you, this prayer lifts them
        before God and asks for His blessing over their lives.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Heavenly Father,
          <br />
          <br />
          I thank You for the parents You gave me. They have sacrificed, loved,
          and given so much. Today I lift them to You and ask for Your blessing
          over every area of their lives.
          <br />
          <br />
          Grant them good health, peace of mind, and joy in their hearts. Where
          they carry burdens, lift the weight. Where they feel tired, renew
          their strength. If they don't know You, draw them gently into Your
          love.
          <br />
          <br />
          May their remaining years be filled with meaning, comfort, and the
          awareness of Your presence each day.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Your Parents?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to create a prayer for your parents'
          specific needs.
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
