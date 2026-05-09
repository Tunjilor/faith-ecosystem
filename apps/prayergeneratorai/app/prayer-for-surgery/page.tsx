
export const metadata = {
  title: "Prayer for Surgery (Peace, Safety, and Healing)",
  description:
    "A Christian prayer for before surgery — asking God for safety, calm, skilled hands, and a smooth recovery.",
};

import Link from "next/link";

export default function SurgeryPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Surgery
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Whether facing surgery yourself or praying for someone else, this prayer
        brings the procedure before God — asking for peace, protection, skilled
        medical hands, and a full recovery.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Lord,
          <br />
          <br />
          I come before You ahead of this surgery, placing every detail into
          Your hands. You know every cell of this body, and I trust You as the
          ultimate Healer. Please calm the fear and anxiety surrounding this
          procedure and replace it with a deep, settled peace.
          <br />
          <br />
          Guide the hands of the surgeons, anesthesiologists, and every member
          of the medical team. Give them clarity, precision, and wisdom. Let
          everything go smoothly, and let recovery be swift.
          <br />
          <br />
          I trust You with this moment, Lord. Be present in that operating room.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Surgery?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for this surgery and
          the road to recovery.
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
