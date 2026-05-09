
export const metadata = {
  title: "Prayer for Finances (Provision, Freedom, and Wisdom)",
  description:
    "A Christian prayer for financial breakthrough — asking God for provision, wisdom, debt freedom, and financial peace.",
};

import Link from "next/link";

export default function FinancesPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Finances
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Financial stress is one of the most common burdens people carry. Whether
        you are facing debt, job loss, or simply struggling to make ends meet,
        this prayer invites God into your finances and trusts Him as Provider.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Father,
          <br />
          <br />
          I am struggling financially and I need Your help. You own everything
          and You are the ultimate Provider. I bring my debt, my bills, my
          fears, and my uncertainty before You and I choose to trust You.
          <br />
          <br />
          Please open doors of provision that I cannot open on my own. Give me
          wisdom in how I spend and steward what You've given me. Protect me
          from despair and help me see opportunities I might be missing.
          <br />
          <br />
          Replace anxiety with peace and scarcity with Your abundance. I believe
          that You supply all my needs according to Your riches.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Financial Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for your specific
          financial need or situation.
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
