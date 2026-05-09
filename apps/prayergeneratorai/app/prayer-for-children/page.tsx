
export const metadata = {
  title: "Prayer for Children (Cover Your Kids in Prayer)",
  description:
    "A Christian prayer for your children — asking God to protect, guide, and grow them in faith, wisdom, and love.",
};

import Link from "next/link";

export default function ChildrenPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Children
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Praying over your children is the most lasting gift a parent can give.
        This prayer covers them in God's protection, wisdom, and love as they
        grow and navigate life's challenges.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Lord Jesus,
          <br />
          <br />
          I bring my children before You today. You know them completely —
          their struggles, their fears, their dreams. Please cover them with
          Your protection and surround them with Your love.
          <br />
          <br />
          Give them wisdom beyond their years and a hunger for Your Word.
          Guard their hearts from harm and their minds from the world's
          confusion. Help them to know who they are in You and to walk in
          confidence and purpose.
          <br />
          <br />
          Guide them in every decision and bring the right people into their
          lives. May they grow up to love You with all their heart.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Your Child?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for your child's
          specific needs and situation.
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
