
export const metadata = {
  title: "Prayer for Pregnancy (Health, Peace, and God's Blessing)",
  description:
    "A Christian prayer during pregnancy — asking God for health, protection, peace, and His blessing over mother and baby.",
};

import Link from "next/link";

export default function PregnancyPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Pregnancy
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Pregnancy is a sacred and often emotional journey. This prayer covers
        the mother, the baby, and the entire process in God's care — asking for
        health, peace, and His presence throughout every stage.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Father,
          <br />
          <br />
          You knit this life together in the womb. You know this child
          completely — every detail, every day already written. I come before
          You asking for Your blessing over this pregnancy.
          <br />
          <br />
          Protect the baby and the mother through every stage of development.
          Grant health, strength, and peace. Replace fear with trust and
          uncertainty with confidence in Your care.
          <br />
          <br />
          Prepare the parents' hearts for this new life and let this child come
          into the world surrounded by love — Yours first, and ours second.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Pregnancy Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for your specific stage
          of pregnancy or specific needs.
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
