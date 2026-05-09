
export const metadata = {
  title: "Prayer for Faith (Strengthen Your Trust in God)",
  description:
    "A Christian prayer for faith — asking God to strengthen your belief, overcome doubt, and deepen your trust in Him.",
};

import Link from "next/link";

export default function FaithPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Faith
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Faith can waver in difficult seasons, but God meets us even in our
        doubt. This prayer asks Him to strengthen your trust, anchor your heart
        in His truth, and help you believe even when you cannot see.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Lord,
          <br />
          <br />
          I confess that my faith has felt weak lately. Circumstances have
          shaken me, doubts have crept in, and I have struggled to believe what
          I know to be true. Like the father in scripture, I cry out: I believe
          — help my unbelief.
          <br />
          <br />
          Strengthen my faith today. Remind me of the times You have come
          through for me before. Let Your Word take root in my heart and grow
          into something immovable.
          <br />
          <br />
          Help me to walk by faith and not by sight, trusting that You are
          always working even when I cannot see it.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Faith?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer that speaks to your
          specific doubts and faith struggles.
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
