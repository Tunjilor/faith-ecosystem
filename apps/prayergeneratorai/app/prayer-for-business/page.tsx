
export const metadata = {
  title: "Prayer for Business (Bless My Work and Efforts)",
  description:
    "A Christian prayer for your business — asking God for favor, growth, wisdom, and His blessing over your entrepreneurial journey.",
};

import Link from "next/link";

export default function BusinessPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Business
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Running a business takes faith, resilience, and wisdom. This prayer
        covers your business in God's blessing — asking for favor with clients,
        wisdom in decisions, and growth that honors Him.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Lord,
          <br />
          <br />
          I invite You into every aspect of my business. You are my ultimate
          partner and the source of every good idea, opportunity, and resource
          I have. I ask for Your blessing to rest on this work.
          <br />
          <br />
          Give me wisdom in my decisions, creativity in my strategy, and
          integrity in my dealings. Bring the right clients, collaborators, and
          team members across my path. Open doors that only You can open.
          <br />
          <br />
          In times of difficulty, remind me that I do not build alone. May this
          business reflect Your excellence and serve others well.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Business Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for your specific
          business needs and goals.
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
