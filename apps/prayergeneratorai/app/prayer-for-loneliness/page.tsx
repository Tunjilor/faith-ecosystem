
export const metadata = {
  title: "Prayer for Loneliness (You Are Never Alone)",
  description:
    "A Christian prayer for loneliness — finding comfort in God's presence and asking Him to bring meaningful connection into your life.",
};

import Link from "next/link";

export default function LonelinessPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Loneliness
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Loneliness is one of the most painful human experiences. This prayer
        brings that ache before God — the One who promises to never leave or
        forsake us — and asks Him to fill the void and bring connection.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Lord,
          <br />
          <br />
          I feel so alone. The silence around me feels heavy, and the longing
          for genuine connection is real. I know that You see me in this moment,
          and I ask You to meet me here.
          <br />
          <br />
          Remind me that I am never truly alone — that Your Spirit is with me
          always. But I also ask that You bring people into my life who see me,
          value me, and walk alongside me.
          <br />
          <br />
          Give me the courage to reach out, to be vulnerable, and to receive
          the community You have for me. Let Your presence fill the empty spaces
          that nothing else can.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Loneliness?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for your specific
          season of isolation or loneliness.
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
