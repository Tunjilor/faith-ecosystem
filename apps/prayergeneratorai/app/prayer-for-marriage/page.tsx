
export const metadata = {
  title: "Prayer for Marriage (Strengthen Your Relationship with God)",
  description:
    "Seek God's blessing over your marriage. A powerful Christian prayer for love, unity, and restoration in your relationship.",
};

import Link from "next/link";

export default function MarriagePrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Marriage
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Whether you are preparing for marriage, seeking restoration, or simply
        wanting to grow closer together, this prayer invites God into the center
        of your relationship to bring love, unity, and lasting commitment.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Heavenly Father,
          <br />
          <br />
          Thank You for the gift of marriage. You designed this covenant as a
          reflection of Your love, and I ask that You protect and strengthen
          ours. Where there is division, bring unity. Where there is hurt, bring
          healing. Where there is distance, draw us closer to each other and to
          You.
          <br />
          <br />
          Help us to love sacrificially, forgive quickly, and communicate with
          grace. Remind us each day to choose one another and to honor the vows
          we have made. Guard our hearts against bitterness and let Your peace
          rule in our home.
          <br />
          <br />
          May our marriage be a testimony of Your faithfulness.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Marriage Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to create a custom prayer tailored to
          your specific marriage situation.
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
