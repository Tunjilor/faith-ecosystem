
export const metadata = {
  title: "Prayer for Enemies (Love and Forgive Those Who Hurt You)",
  description:
    "A Christian prayer for your enemies — following Jesus' command to love and pray for those who have wronged or opposed you.",
};

import Link from "next/link";

export default function EnemiesPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Enemies
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Jesus commanded us to pray for those who persecute and oppose us. This
        is one of the hardest commands to follow — but this prayer helps you
        release bitterness, choose love, and trust God with the outcome.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Father,
          <br />
          <br />
          I choose to obey Your Word and pray for those who have hurt me,
          opposed me, or wished me harm. This is not easy — my natural response
          is anger and self-protection. But You have asked something different
          of me.
          <br />
          <br />
          I release this person into Your hands. Please deal with this situation
          in a way that brings justice and redemption. Soften their heart. Help
          me to forgive genuinely and not carry bitterness. Protect me from
          harm while I release the need for revenge.
          <br />
          <br />
          Let Your love flow through me even toward those who are difficult to
          love.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for This Situation?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for a specific person
          or conflict you're navigating.
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
