
export const metadata = {
  title: "Prayer for a Baby (Bless This New Life)",
  description:
    "A tender Christian prayer for a newborn baby — asking God to bless, protect, and guide this precious new life.",
};

import Link from "next/link";

export default function BabyPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for a Baby
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        A new baby is one of life's most profound gifts. This prayer dedicates
        this precious child to God — asking for His blessing, protection, and
        purpose over every day of their life.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Heavenly Father,
          <br />
          <br />
          Thank You for this baby — for this miracle of life, this tiny person
          You have formed and called by name before they were even born.
          <br />
          <br />
          I dedicate this child to You. Protect them from harm and watch over
          their development in body, mind, and spirit. Give wisdom to the
          parents who will love and raise them. Let this child grow up knowing
          they are deeply loved — by their family and by You.
          <br />
          <br />
          May their life be full of purpose and may they bring joy to all who
          know them. We trust You with this gift.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Your Baby?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer dedicating your baby
          to God in your own words.
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
