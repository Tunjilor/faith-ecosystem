
export const metadata = {
  title: "Prayer for Repentance (Turn Back to God)",
  description:
    "A sincere Christian prayer for repentance — honestly acknowledging sin, turning back to God, and receiving His restoration.",
};

import Link from "next/link";

export default function RepentancePrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Repentance
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Repentance is not just feeling sorry — it is turning back to God with
        an honest heart. This prayer helps you acknowledge where you've gone
        wrong, receive God's grace, and walk in a new direction.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Heavenly Father,
          <br />
          <br />
          I come before You with a humble and honest heart. I have gone my own
          way in areas where I knew better. I have chosen my will over Yours
          and it has cost me — in my relationship with You and with others.
          <br />
          <br />
          I am sorry. Not just for the consequences but for the choices
          themselves. I don't want to stay where I am. I want to turn around
          and walk back toward You.
          <br />
          <br />
          Thank You that Your arms are open and Your mercy never runs out. Help
          me to walk differently from today and to lean on Your Spirit for the
          strength I don't have on my own.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Repentance Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for your specific area
          of repentance and restoration.
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
