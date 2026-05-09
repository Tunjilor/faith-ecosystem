
export const metadata = {
  title: "Prayer for Revival (Awaken the Church and Our Nation)",
  description:
    "A powerful Christian prayer for revival — asking God to awaken hearts, restore the church, and pour out His Spirit on the land.",
};

import Link from "next/link";

export default function RevivalPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Revival
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Throughout history, God has sent seasons of revival that transformed
        communities and nations. This prayer cries out for a fresh outpouring
        of His Spirit — beginning in our own hearts and spreading outward.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          God of Revival,
          <br />
          <br />
          We cry out to You for a fresh outpouring of Your Spirit. This world
          needs You desperately. Our churches need renewal. Our families need
          restoration. Our nations need Your light in the midst of darkness.
          <br />
          <br />
          Begin the revival in me. Search my heart and remove anything that
          quenches Your Spirit. Help me to pray with fervency, worship with
          sincerity, and live in a way that draws others to You.
          <br />
          <br />
          Pour out Your Spirit on all flesh. Bring a harvest of souls. Let this
          generation see what You can do when Your people humble themselves and
          seek Your face.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Revival Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for revival in your
          church, community, or nation.
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
