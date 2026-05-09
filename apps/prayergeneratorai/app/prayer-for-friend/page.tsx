
export const metadata = {
  title: "Prayer for a Friend (Lift Someone You Love to God)",
  description:
    "A Christian prayer for a friend who is hurting, struggling, or in need. Intercede for the people you care about.",
};

import Link from "next/link";

export default function FriendPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for a Friend
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        One of the greatest things you can do for a friend is pray for them.
        This prayer lifts your friend into God's hands, asking for comfort,
        healing, strength, and His presence in their life.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Father God,
          <br />
          <br />
          I come to You today on behalf of my friend. You know exactly what they
          are going through right now — the pain they carry, the fears they
          face, and the questions they have. I ask that You meet them right where
          they are.
          <br />
          <br />
          Bring them comfort, clarity, and peace. Let them feel Your presence
          surrounding them. If they are lost, guide them. If they are hurting,
          heal them. If they are discouraged, lift their spirit.
          <br />
          <br />
          Thank You for placing this friendship in my life. Help me be the
          friend they need — present, faithful, and kind.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Your Friend?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer tailored to your
          friend's specific situation.
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
