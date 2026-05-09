
export const metadata = {
  title: "Prayer for the Holy Spirit (Be Filled and Empowered)",
  description:
    "A Christian prayer for the Holy Spirit — asking God to fill you afresh, lead you, and empower your daily life and witness.",
};

import Link from "next/link";

export default function HolySpiritPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for the Holy Spirit
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Jesus promised that the Holy Spirit would be our Comforter, Guide, and
        Empowerment. This prayer invites the Spirit to fill every part of your
        life, lead your steps, and activate the gifts He has placed in you.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Lord,
          <br />
          <br />
          I ask to be filled afresh with Your Holy Spirit today. I do not want
          to live life in my own strength — I want to be led, empowered, and
          transformed by Your presence within me.
          <br />
          <br />
          Come and fill every room of my life. Convict me of what needs to
          change. Comfort me in what I cannot bear. Guide me into all truth.
          Give me boldness to speak and love to serve.
          <br />
          <br />
          Move in and through me in ways that bring glory to Your name. I
          surrender every part of myself to You.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Holy Spirit Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for the specific work
          of the Spirit you are seeking.
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
