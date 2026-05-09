
export const metadata = {
  title: "Prayer for Someone Dying (Comfort and Peace at the End of Life)",
  description:
    "A gentle Christian prayer for someone who is dying — bringing peace, comfort, and God's presence to their final journey.",
};

import Link from "next/link";

export default function SomeoneDyingPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Someone Who Is Dying
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        When a loved one is nearing the end of life, words can feel impossible.
        This prayer brings them before God — asking for His peace, His comfort,
        and the assurance of His presence as they transition from this life.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Father,
          <br />
          <br />
          I bring this precious person before You today. You know them
          completely and You love them completely. As they approach the end of
          their earthly life, I ask that You fill the room with Your peace.
          <br />
          <br />
          Remove fear. Let them feel Your presence. Comfort them with the
          knowledge that they are not alone and that what comes next is held in
          Your hands. Ease any physical or emotional pain they are experiencing.
          <br />
          <br />
          Give grace to the family and loved ones surrounding them. Let this be
          a sacred moment wrapped in Your love.
          <br />
          <br />
          Into Your hands we commit this soul.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for This Moment?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for this person and
          your family in this sacred time.
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
