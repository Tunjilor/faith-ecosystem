
export const metadata = {
  title: "Prayer for Salvation (Come to God and Be Saved)",
  description:
    "A sincere Christian prayer for salvation — inviting Jesus into your heart and receiving God's gift of eternal life.",
};

import Link from "next/link";

export default function SalvationPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Salvation
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        The most important prayer anyone can pray is the one that opens the
        door to relationship with God. This prayer is for anyone ready to
        receive Jesus as their Lord and Savior — or to pray for a loved one
        who needs to know Him.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Lord Jesus,
          <br />
          <br />
          I come to You just as I am. I know that I have fallen short and that
          I need You. I believe that You died on the cross for my sins and that
          You rose again on the third day. I believe You are the Son of God
          and the only way to the Father.
          <br />
          <br />
          I ask You now to forgive me of all my sins and to come into my life.
          I receive You as my Lord and my Savior. I am Yours, and I trust that
          You have made me a new creation.
          <br />
          <br />
          Thank You for Your grace, Your love, and the gift of eternal life.
          Help me to follow You every day.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Salvation Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for yourself or a
          loved one coming to faith.
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
