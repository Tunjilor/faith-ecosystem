
export const metadata = {
  title: "Prayer for Husband (Cover Him with God's Grace)",
  description:
    "A heartfelt Christian prayer for your husband — for his strength, protection, faith, and leadership in your home.",
};

import Link from "next/link";

export default function HusbandPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for My Husband
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Praying for your husband is one of the most powerful things you can do
        as a wife. This prayer covers him in God's grace, wisdom, and protection
        as he leads, provides, and loves your family.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Lord,
          <br />
          <br />
          I lift my husband to You today. Thank You for placing him in my life.
          Please strengthen him in every area — his faith, his mind, his body,
          and his spirit. Give him wisdom to lead with love and humility, and
          courage to face every challenge with confidence in You.
          <br />
          <br />
          Protect him from discouragement, temptation, and harm. Surround him
          with Your presence throughout his day. Help him know how valued and
          loved he is — by You and by me.
          <br />
          <br />
          Draw his heart closer to Yours and let him be a man of faith, purpose,
          and integrity.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Your Husband?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer specific to his needs
          right now.
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
