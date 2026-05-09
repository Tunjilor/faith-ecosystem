
export const metadata = {
  title: "Evening Prayer (End Your Day with God)",
  description:
    "A peaceful Christian evening prayer to close your day — giving thanks, releasing the day's burdens, and resting in God's care.",
};

import Link from "next/link";

export default function EveningPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Evening Prayer
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Ending your day in prayer is a powerful practice of gratitude and
        surrender. This evening prayer helps you release the events of the day,
        give thanks for God's faithfulness, and rest peacefully in His care.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Heavenly Father,
          <br />
          <br />
          As this day comes to a close, I come before You with a grateful heart.
          Thank You for Your presence and provision throughout today — even in
          the moments I may not have noticed.
          <br />
          <br />
          I lay down the burdens of this day at Your feet. Any mistakes,
          worries, or unresolved things — I release them into Your hands. I
          forgive those who may have hurt me and I ask forgiveness for anywhere
          I fell short.
          <br />
          <br />
          Watch over me and my loved ones as we sleep. Grant us peaceful rest
          and a fresh start tomorrow.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Evening Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write an evening prayer based on your
          day and what's on your heart tonight.
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
