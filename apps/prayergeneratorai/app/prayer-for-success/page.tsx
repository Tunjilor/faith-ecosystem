
export const metadata = {
  title: "Prayer for Success (God's Favor on Your Goals)",
  description:
    "A Christian prayer for success — asking God to bless your efforts, align your ambitions with His will, and grant lasting results.",
};

import Link from "next/link";

export default function SuccessPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Success
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        True success flows from God's blessing on your work and alignment with
        His purpose. This prayer asks God to direct your path, empower your
        efforts, and bring His definition of success into your life.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Father God,
          <br />
          <br />
          I come to You with goals, dreams, and ambitions. I ask that You align
          every one of them with Your will. Bless the work of my hands and let
          my efforts produce lasting fruit — not just for myself but for the
          people around me.
          <br />
          <br />
          Keep me humble in success and resilient in setback. Help me remember
          that my value is not in my achievements but in who You say I am.
          <br />
          <br />
          Go before me, open doors, and make a way where I see none. Let me
          seek Your kingdom first and trust that all else will follow.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Success?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for your specific goals
          and ambitions.
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
