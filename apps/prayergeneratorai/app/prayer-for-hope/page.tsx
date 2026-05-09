
export const metadata = {
  title: "Prayer for Hope (Renew Your Hope in God)",
  description:
    "A Christian prayer for hope — asking God to restore what has been lost and fill your heart with expectation and trust in His promises.",
};

import Link from "next/link";

export default function HopePrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Hope
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        When hope fades, God is still the anchor. This prayer reaches out to
        the God of all hope and asks Him to restore a spirit of expectation,
        trust, and belief that better days are ahead.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          God of hope,
          <br />
          <br />
          I will be honest — hope is hard to find right now. Life has worn me
          down and it is difficult to believe that things can be different. But
          I know that You are the source of real, unshakeable hope, and I am
          coming to You for it.
          <br />
          <br />
          Please restore hope in my heart. Help me to see what You see: a future
          and a plan that is good. Remind me of Your past faithfulness and let
          that be the anchor when my circumstances say otherwise.
          <br />
          <br />
          Fill me with joy and peace as I trust You, so that I overflow with
          hope by the power of Your Spirit.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Hope?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for hope in your
          specific circumstances.
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
