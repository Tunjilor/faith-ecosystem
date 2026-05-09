
export const metadata = {
  title: "Prayer for Patience (Trust God's Timing)",
  description:
    "A Christian prayer for patience — surrendering your timeline to God and finding peace in the waiting season.",
};

import Link from "next/link";

export default function PatiencePrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Patience
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Waiting is one of the most spiritually formative things we are called
        to do. This prayer asks God for the grace to wait well — trusting His
        timing without losing hope or running ahead of His plan.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Lord,
          <br />
          <br />
          I am tired of waiting. The thing I have been asking for has not come
          yet and I am struggling to understand why. Please give me patience —
          not just passive endurance but active trust in You during the wait.
          <br />
          <br />
          Help me to believe that Your delays are not denials and that Your
          timing is always perfect. Teach me what You want me to learn in this
          season rather than just rushing through it.
          <br />
          <br />
          Give me peace in the uncertainty and help me to remain faithful while
          I wait on You.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Patience?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for your specific
          waiting season.
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
