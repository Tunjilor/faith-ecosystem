
export const metadata = {
  title: "Prayer for Church (Unity, Growth, and God's Presence)",
  description:
    "A Christian prayer for your church — asking God for unity among believers, spiritual growth, revival, and His glory to fill the congregation.",
};

import Link from "next/link";

export default function ChurchPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Church
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        The church is God's design for community and mission. This prayer
        covers your local church and the body of Christ at large — asking God
        for unity, revival, strong leadership, and His presence to dwell among
        His people.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Father,
          <br />
          <br />
          I pray for my church. Thank You for bringing together a community of
          believers in this place. Please protect it from division, pride, and
          any influence that would weaken Your body.
          <br />
          <br />
          Bring unity among members, passion for worship, and a hunger for Your
          Word. Let the gifts of each person be used fully and let no one feel
          overlooked or unimportant.
          <br />
          <br />
          Pour out Your Spirit on this congregation. May our church be a refuge
          for the hurting, a light in the community, and a place where people
          genuinely encounter You.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Your Church?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer tailored to your
          church's specific season or need.
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
