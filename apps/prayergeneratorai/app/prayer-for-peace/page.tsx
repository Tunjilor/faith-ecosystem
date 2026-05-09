
export const metadata = {
  title: "Prayer for Peace (Calm Your Heart and Mind)",
  description:
    "A comforting Christian prayer for peace, calm, trust, and emotional rest during difficult moments.",
};

import Link from "next/link";

export default function PeacePrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Peace
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        When your heart feels unsettled or your thoughts feel heavy, this prayer
        asks God to bring peace, calm, and trust.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Heavenly Father,
          <br />
          <br />
          Please bring peace to my heart and calm to my mind. Help me breathe,
          pause, and remember that I am not alone.
          <br />
          <br />
          Replace fear with faith, tension with trust, and confusion with
          clarity. Let Your presence steady me in this moment.
          <br />
          <br />
          Teach me to rest in Your care and walk forward with a peaceful spirit.
          <br />
          <br />
          In Jesus’ name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Peace?
        </h2>

        <p className="text-gray-400 mb-6">
          Generate a custom prayer for the exact situation weighing on your
          heart.
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
