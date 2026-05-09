
export const metadata = {
  title: "Prayer for Anxiety (Find Peace and Calm)",
  description:
    "Struggling with anxiety? Generate a powerful personalized prayer for peace, calm, and trust in God.",
};

import Link from "next/link";

export default function AnxietyPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Anxiety
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        If you’re feeling overwhelmed, anxious, or restless, you’re not alone.
        This prayer is designed to help you find peace, calm your thoughts, and
        trust in God’s presence.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Heavenly Father,
          <br />
          <br />
          I come before You with a heavy heart and a restless mind. My thoughts
          feel overwhelming, and I struggle to find peace. Please calm my spirit
          and remind me that You are in control.
          <br />
          <br />
          Help me release my worries into Your hands. Replace my fear with faith,
          my anxiety with peace, and my uncertainty with trust in You.
          <br />
          <br />
          Fill me with Your presence and guide me through this moment.
          <br />
          <br />
          In Jesus’ name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to create a custom prayer based on your
          exact situation.
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
