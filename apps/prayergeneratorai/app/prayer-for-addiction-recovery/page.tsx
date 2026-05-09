
export const metadata = {
  title: "Prayer for Addiction Recovery (Freedom and Healing)",
  description:
    "A Christian prayer for addiction recovery — asking God for freedom, strength, healing, and a new life beyond addiction.",
};

import Link from "next/link";

export default function AddictionRecoveryPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Addiction Recovery
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Recovery is a hard road, but you do not walk it alone. This prayer
        brings your struggle before God and asks for His power to break chains,
        bring healing, and open a new chapter of freedom.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Heavenly Father,
          <br />
          <br />
          I have been trapped in a cycle I cannot break on my own. I come to
          You honestly — with all my failure, my shame, and my longing to be
          free. You are the God who breaks chains, and I need Your power now.
          <br />
          <br />
          Please give me strength to resist the pull of addiction today. Remove
          the triggers that lead me back. Surround me with people who support
          my recovery and with Your presence when I feel alone.
          <br />
          <br />
          Heal the deeper wounds that this addiction has covered. Replace the
          emptiness with Your fullness. I want a life of freedom, and I believe
          You can bring me there.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Recovery Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for your specific
          recovery journey.
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
