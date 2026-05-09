
export const metadata = {
  title: "Prayer for Relationship (Restoration and Healing)",
  description:
    "Seeking God's help in a relationship? A Christian prayer for restoration, healing, and clarity in any relationship.",
};

import Link from "next/link";

export default function RelationshipPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for a Relationship
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Whether you're seeking healing in a broken relationship, clarity in a
        complicated one, or asking God to bless a new connection, this prayer
        invites Him into the heart of your situation.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Lord,
          <br />
          <br />
          I bring this relationship before You today. You see every layer of it
          — the history, the hurt, the hope. I ask for Your wisdom and guidance
          as I navigate this connection.
          <br />
          <br />
          Where there has been pain, bring healing. Where there is confusion,
          bring clarity. Help me to love with patience and to forgive as You
          have forgiven me. Guard my heart from bitterness and help me to see
          this person through Your eyes.
          <br />
          <br />
          If this relationship is meant to grow, bless it. If it is causing harm,
          give me the strength and wisdom to set healthy boundaries. Guide me
          in every step.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Relationship Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for your unique
          relationship situation.
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
