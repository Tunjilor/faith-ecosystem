
export const metadata = {
  title: "Prayer for Depression (Lift the Darkness, Find Hope)",
  description:
    "A compassionate Christian prayer for depression — asking God to bring light, hope, and healing into the darkest seasons.",
};

import Link from "next/link";

export default function DepressionPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Depression
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Depression can make everything feel dark, distant, and hopeless. But
        God sees you in the darkness and He draws near. This prayer is for
        those fighting to hold on — asking God to lift the heaviness and
        restore hope.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Lord Jesus,
          <br />
          <br />
          I am in a dark place right now. Everything feels heavy — getting out
          of bed, engaging with others, believing that things can get better.
          I am tired in ways that sleep cannot fix.
          <br />
          <br />
          I need You. Please come close. Remind me that You have not abandoned
          me, even when I cannot feel Your presence. Bring even a small ray of
          hope into my day today.
          <br />
          <br />
          Help me take one step at a time. Guide me to the help I need. Silence
          the lies that tell me I am worthless or forgotten. You are the light
          of the world, and I ask You to shine in this darkness.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Depression?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to create a prayer for exactly where you
          are right now.
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
