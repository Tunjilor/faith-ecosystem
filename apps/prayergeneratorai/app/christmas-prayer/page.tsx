
export const metadata = {
  title: "Christmas Prayer (Celebrate the Birth of Jesus)",
  description:
    "A beautiful Christian prayer for Christmas — celebrating the birth of Jesus, giving thanks, and inviting His presence into the holiday.",
};

import Link from "next/link";

export default function ChristmasPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Christmas Prayer
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Christmas is more than a holiday — it is the celebration of God stepping
        into our world through Jesus. This prayer refocuses the season on its
        true meaning and invites the presence of Christ into your home and heart.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Father,
          <br />
          <br />
          On this Christmas, we pause to remember what really happened — that
          You loved us so much that You sent Your Son into this broken world to
          rescue us. The gift of Jesus is more than we could ever deserve and
          more than we can fully comprehend.
          <br />
          <br />
          Thank You for Emmanuel — God with us. Help us not to get so lost in
          the celebrations that we miss the Savior. Let the joy of this season
          be rooted in You, not just in gifts or gatherings.
          <br />
          <br />
          Be present in our homes, our tables, and our hearts this Christmas.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Christmas Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for your Christmas
          gathering, family, or moment of worship.
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
