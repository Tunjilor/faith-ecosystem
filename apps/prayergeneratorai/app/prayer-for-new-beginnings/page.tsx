
export const metadata = {
  title: "Prayer for New Beginnings (Fresh Start with God)",
  description:
    "A Christian prayer for new beginnings — asking God to go before you into a new chapter and fill it with His purpose and blessing.",
};

import Link from "next/link";

export default function NewBeginningsPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for New Beginnings
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        New seasons can be both exciting and uncertain. This prayer invites God
        to go before you into what's new — blessing the fresh chapter, calming
        any fears, and filling the unknown with His presence.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Father God,
          <br />
          <br />
          I stand at the beginning of something new and I invite You into every
          part of it. You are the God who makes all things new, and I trust that
          this season has purpose even when the path is not yet clear to me.
          <br />
          <br />
          Please go before me and prepare the way. Give me courage to step into
          the unknown with faith. Help me leave behind what belongs in the past
          and embrace fully what You have prepared for this new chapter.
          <br />
          <br />
          May this beginning be marked by Your presence, Your grace, and Your
          direction from the very first step.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Your New Beginning?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer tailored to your
          specific new season.
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
