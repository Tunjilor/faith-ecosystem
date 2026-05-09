
export const metadata = {
  title: "Prayer for My Daughter (Raise Her in God's Love)",
  description:
    "A heartfelt Christian prayer for your daughter — covering her with God's grace, identity, protection, and purpose.",
};

import Link from "next/link";

export default function DaughterPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for My Daughter
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Your daughter is a treasure. This prayer covers her in God's love,
        protects her identity, and asks that she grows into a woman of faith,
        grace, and strength — rooted in who God says she is.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Lord,
          <br />
          <br />
          I thank You for my daughter and the joy she brings. I ask that You
          protect her from every harm — physical, emotional, and spiritual.
          Guard her heart from lies about her worth and remind her constantly
          that she is seen, loved, and valued by You.
          <br />
          <br />
          Give her the courage to be who You created her to be. Help her
          navigate the pressures of this world without losing herself. Surround
          her with friends who lift her up and mentors who point her to You.
          <br />
          <br />
          May she grow into a woman of deep faith, genuine love, and
          unshakeable purpose.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Your Daughter?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to create a prayer specific to what your
          daughter needs right now.
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
