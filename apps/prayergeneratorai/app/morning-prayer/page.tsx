
export const metadata = {
  title: "Morning Prayer (Start Your Day with God)",
  description:
    "Begin your day with a peaceful Christian morning prayer for guidance, gratitude, strength, and protection.",
};

import Link from "next/link";

export default function MorningPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Morning Prayer
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Start your day with gratitude, peace, and trust. This morning prayer
        invites God’s presence into your thoughts, decisions, and actions.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Heavenly Father,
          <br />
          <br />
          Thank You for the gift of this new day. Please guide my thoughts,
          words, and actions.
          <br />
          <br />
          Give me patience when things feel difficult, wisdom in my decisions,
          and kindness in how I treat others.
          <br />
          <br />
          Help me walk in faith, notice Your blessings, and carry peace into
          every part of this day.
          <br />
          <br />
          In Jesus’ name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Morning Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Generate a prayer for your specific day, responsibilities, or concerns.
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
