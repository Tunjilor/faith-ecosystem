
export const metadata = {
  title: "Prayer for Guidance (Wisdom and Direction)",
  description:
    "Need direction? Read a Christian prayer for guidance, wisdom, clarity, and trust in God.",
};

import Link from "next/link";

export default function GuidancePrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Guidance
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        When decisions feel difficult or the path ahead feels unclear, this
        prayer can help you ask God for wisdom and direction.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Heavenly Father,
          <br />
          <br />
          I need Your guidance. Please give me wisdom, clarity, and peace as I
          face the decisions before me.
          <br />
          <br />
          Help me not to rush ahead in fear or confusion. Teach me to listen,
          wait, and trust Your timing.
          <br />
          <br />
          Lead me toward what is right, protect me from what is harmful, and
          give me courage to follow where You guide.
          <br />
          <br />
          In Jesus’ name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Guidance Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Use the prayer generator to create a custom prayer for your decision
          or situation.
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
