
export const metadata = {
  title: "Prayer for Protection (Safety, Peace, and Guidance)",
  description:
    "A Christian prayer for protection, safety, peace, and God’s guidance over your life and loved ones.",
};

import Link from "next/link";

export default function ProtectionPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Protection
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        This prayer asks God for protection, wisdom, peace, and guidance over
        your life, home, family, and daily path.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Heavenly Father,
          <br />
          <br />
          Please watch over me and those I love. Surround us with Your peace,
          wisdom, and protection.
          <br />
          <br />
          Guide our steps, guard our hearts, and help us make wise choices.
          Keep us from harm and give us calm minds in uncertain moments.
          <br />
          <br />
          May Your presence bring comfort, confidence, and peace wherever we go.
          <br />
          <br />
          In Jesus’ name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Protection Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Generate a custom prayer for your specific protection request.
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
