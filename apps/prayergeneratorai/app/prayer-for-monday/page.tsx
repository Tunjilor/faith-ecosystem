
export const metadata = {
  title: "Prayer for Monday (Start Your Week with God)",
  description:
    "A Christian prayer for Monday — inviting God into your work week, setting your intentions, and beginning with faith.",
};

import Link from "next/link";

export default function MondayPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Monday
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Mondays can feel overwhelming or full of opportunity — sometimes both.
        This prayer invites God into the start of your week, setting a tone of
        trust, purpose, and dependence on Him for all that lies ahead.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Father,
          <br />
          <br />
          A new week begins today and I choose to start it with You. Before the
          tasks, the meetings, the to-do lists, and the pressure of the week
          ahead — I bring this Monday to You.
          <br />
          <br />
          Please go before me into every commitment this week holds. Give me
          focus, energy, and grace. Where I feel behind or overwhelmed, remind
          me that I am not alone. Help me to work with excellence and to be a
          blessing to the people I encounter.
          <br />
          <br />
          Let this week be used by You for good.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Monday Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer that speaks to what
          this specific week holds for you.
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
