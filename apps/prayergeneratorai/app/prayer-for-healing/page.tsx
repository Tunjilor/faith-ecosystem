
export const metadata = {
  title: "Prayer for Healing (Comfort, Strength, and Peace)",
  description:
    "Need healing? Read a comforting Christian prayer for healing, strength, peace, and God’s presence.",
};

import Link from "next/link";

export default function HealingPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Healing
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        If you or someone you love needs healing, this prayer can help you seek
        God’s comfort, strength, and peace during a difficult season.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Heavenly Father,
          <br />
          <br />
          I come before You asking for healing, comfort, and strength. Please
          touch this situation with Your love and surround it with Your peace.
          <br />
          <br />
          Bring calm where there is fear, hope where there is discouragement,
          and strength where there is weakness. Help me trust You each day, even
          when the path feels uncertain.
          <br />
          <br />
          Please guide the hands, hearts, and minds of those involved in care,
          support, and recovery.
          <br />
          <br />
          In Jesus’ name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Healing Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to create a prayer based on your exact
          healing request.
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
