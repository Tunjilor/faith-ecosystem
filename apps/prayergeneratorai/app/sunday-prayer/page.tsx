
export const metadata = {
  title: "Sunday Prayer (Worship, Rest, and Renewal)",
  description:
    "A Christian prayer for Sunday — entering the Lord's day with worship, gratitude, and an open heart to receive from Him.",
};

import Link from "next/link";

export default function SundayPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Sunday Prayer
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Sunday is a day set apart for worship, rest, and renewal. This prayer
        prepares your heart to receive all that God has for you — in community,
        in His Word, and in His presence.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Lord,
          <br />
          <br />
          I come to You on this day of rest with a heart of worship. Thank You
          for this day set apart — a day to step back from the pace of life and
          remember what truly matters.
          <br />
          <br />
          Open my ears to hear Your Word clearly today. Let my worship be
          genuine and not just routine. Help me to connect with others in faith
          and to encourage those around me.
          <br />
          <br />
          Fill me afresh with Your Spirit. Let me leave today renewed, inspired,
          and ready for the week ahead — having spent real time in Your presence.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Sunday Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for this Sunday based
          on your heart and what you need from God.
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
