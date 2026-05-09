
export const metadata = {
  title: "Prayer Before Sleep (Peaceful Night Prayer)",
  description:
    "End your day with a peaceful Christian prayer before sleep for rest, calm, protection, and gratitude.",
};

import Link from "next/link";

export default function PrayerBeforeSleepPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer Before Sleep
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Before sleep, take a moment to release the day to God and rest in His
        peace, protection, and care.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Heavenly Father,
          <br />
          <br />
          As this day comes to an end, I give You my worries, thoughts, and
          unfinished concerns.
          <br />
          <br />
          Thank You for carrying me through today. Please calm my mind, quiet my
          heart, and help me rest peacefully tonight.
          <br />
          <br />
          Watch over me and those I love. Let tomorrow bring renewed strength,
          wisdom, and hope.
          <br />
          <br />
          In Jesus’ name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Night Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Create a prayer based on what is on your heart before sleep.
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
