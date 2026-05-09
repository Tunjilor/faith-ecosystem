
export const metadata = {
  title: "Prayer for Cancer (Healing, Strength, and Hope)",
  description:
    "A powerful Christian prayer for those battling cancer — asking God for healing, peace, strength, and hope during treatment.",
};

import Link from "next/link";

export default function CancerPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Cancer
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        A cancer diagnosis can shake everything. This prayer brings your fear,
        pain, and hope before God — asking for miraculous healing, supernatural
        peace, and strength to face each day of treatment.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Almighty God,
          <br />
          <br />
          You are the God who heals. I come before You in this difficult season,
          facing a battle that feels bigger than I can handle. But I know You
          are bigger still. I ask for Your healing hand to move in this body and
          for Your peace to guard my heart through every appointment, treatment,
          and uncertain moment.
          <br />
          <br />
          Give strength to face this day. Give wisdom to the doctors and medical
          team. Give hope where despair tries to creep in.
          <br />
          <br />
          I trust You, Lord, with the outcome. Whatever the path ahead holds,
          let me walk it with faith in Your faithfulness.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Cancer?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to create a prayer for your specific
          situation during this journey.
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
