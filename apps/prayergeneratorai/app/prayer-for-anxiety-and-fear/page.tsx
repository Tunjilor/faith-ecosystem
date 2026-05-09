
export const metadata = {
  title: "Prayer for Anxiety and Fear (Cast Your Worries on God)",
  description:
    "A Christian prayer for anxiety and fear — surrendering worry to God and receiving His perfect peace that passes understanding.",
};

import Link from "next/link";

export default function AnxietyAndFearPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Anxiety and Fear
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Anxiety and fear are real — but so is the peace that God promises.
        This prayer releases your worries and fears into God's hands and asks
        for His supernatural calm to guard your heart and mind.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Father,
          <br />
          <br />
          The anxiety in my chest, the fear in my mind — I bring all of it to
          You right now. I cannot carry this alone any longer. Your Word says
          to cast all my cares on You because You care for me, so I am doing
          that now.
          <br />
          <br />
          Please take every fear, every worst-case scenario, every "what if"
          and hold them in Your hands so I don't have to. Replace the anxiety
          with Your peace — the kind that doesn't make logical sense but
          transcends my understanding.
          <br />
          <br />
          Remind me today that You are in control and that I am safe in You.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Your Anxiety?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for your specific fears
          and anxious thoughts.
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
