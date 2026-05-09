
export const metadata = {
  title: "Prayer for a New Job (Grace, Favor, and a Fresh Start)",
  description:
    "A Christian prayer for starting a new job — asking God for confidence, favor, wisdom, and a successful new beginning.",
};

import Link from "next/link";

export default function NewJobPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for a New Job
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Starting a new job brings both excitement and nerves. This prayer asks
        God to go before you into this new season — granting favor, confidence,
        wisdom, and the grace to thrive in your new role.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Heavenly Father,
          <br />
          <br />
          Thank You for this new opportunity. I believe You opened this door and
          I walk through it trusting You. As I begin this new role, I ask for
          Your hand of favor and grace over everything I put my hands to.
          <br />
          <br />
          Help me to learn quickly, to build strong relationships with my
          colleagues, and to bring my best to this work. Give me wisdom in
          moments of uncertainty and confidence in my abilities without
          arrogance.
          <br />
          <br />
          Let me be a positive presence in this workplace. May this job be a
          blessing — to me and through me.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Your New Job?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for your specific role
          and new workplace.
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
