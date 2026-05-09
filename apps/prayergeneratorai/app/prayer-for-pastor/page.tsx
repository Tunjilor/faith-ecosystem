
export const metadata = {
  title: "Prayer for Pastor (Strength, Wisdom, and Protection)",
  description:
    "A powerful Christian prayer for your pastor — covering them with God's strength, wisdom, protection, and renewal.",
};

import Link from "next/link";

export default function PastorPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for My Pastor
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Pastors carry enormous spiritual responsibility. This prayer lifts your
        pastor before God — asking for His strength to sustain them, wisdom to
        lead well, and protection from spiritual attack and burnout.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Lord,
          <br />
          <br />
          I lift my pastor to You today. Thank You for calling them into
          leadership and for placing them in my life. They carry a weight that
          many don't fully see — please sustain them with Your grace.
          <br />
          <br />
          Give them fresh revelation when they prepare to preach. Protect their
          mind from doubt and discouragement. Shield their family from spiritual
          attack. Give them wise counsel and deep rest when they need it.
          <br />
          <br />
          Let them know they are not laboring in vain. May their love for You
          stay strong and may the fruit of their ministry be abundant and lasting.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Your Pastor?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for your pastor's
          specific needs and ministry.
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
