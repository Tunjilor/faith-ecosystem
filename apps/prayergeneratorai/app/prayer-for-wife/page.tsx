
export const metadata = {
  title: "Prayer for Wife (Bless and Protect Her)",
  description:
    "A powerful Christian prayer for your wife — covering her with God's love, peace, strength, and joy every day.",
};

import Link from "next/link";

export default function WifePrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for My Wife
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Interceding for your wife is one of the greatest acts of love a husband
        can offer. This prayer asks God to surround her with His peace, fill her
        with joy, and sustain her through every season of life.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Father God,
          <br />
          <br />
          I come before You with a grateful heart for the woman You have given
          me. Please bless my wife in every dimension of her life. Give her
          peace that passes understanding and joy that sustains her through hard
          days.
          <br />
          <br />
          Where she feels weary, renew her strength. Where she feels unseen,
          remind her how deeply she is known and loved by You. Help her walk in
          confidence, purpose, and grace.
          <br />
          <br />
          Protect her mind from anxiety and her heart from discouragement. Let
          her know that she is cherished, valued, and prayed over.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Your Wife?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to craft a prayer that speaks to her
          specific needs today.
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
