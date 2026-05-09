
export const metadata = {
  title: "Prayer for Travel and Safety (God's Protection on the Road)",
  description:
    "A Christian prayer for travel — asking God for safety, protection, and His presence on every road, flight, and journey.",
};

import Link from "next/link";

export default function TravelAndSafetyPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Travel and Safety
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Whether you are beginning a short trip or a long journey, this prayer
        commits every mile into God's hands — asking for His protection, clear
        paths, and a safe arrival.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Lord,
          <br />
          <br />
          As I prepare to travel, I place this journey into Your hands. You
          neither sleep nor slumber, and Your eye is on me wherever I go. I
          ask for Your protection over every part of this trip.
          <br />
          <br />
          Guard the roads, the skies, and the paths ahead of me. Keep me alert
          and clear-minded. Protect those I leave behind and bring me safely
          back to them.
          <br />
          <br />
          May this journey be free from harm, delay, and trouble. Let Your
          peace travel with me and let me arrive safely in Your grace.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Travel Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for your specific trip
          or journey.
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
