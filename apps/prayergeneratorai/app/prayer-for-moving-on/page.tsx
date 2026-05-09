
export const metadata = {
  title: "Prayer for Moving On (Healing and Letting Go)",
  description:
    "A Christian prayer for moving on — asking God for the strength to let go of the past and step into a healed, hopeful future.",
};

import Link from "next/link";

export default function MovingOnPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Moving On
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Moving on after loss, heartbreak, or a closed chapter is one of the
        hardest things to do. This prayer asks God for the grace to release
        what was, find healing, and trust Him with what's ahead.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Lord,
          <br />
          <br />
          I am holding on to something that I know I need to release. The pain
          of what happened, the memory of what was, and the fear of what moving
          on means — all of it keeps me stuck. I need Your help to let go.
          <br />
          <br />
          Please heal the wounds that keep pulling me backward. Help me grieve
          what needs to be grieved and then give me the courage to look forward.
          I do not need to forget the past to move forward from it.
          <br />
          <br />
          Take my hand and lead me into the next chapter. I trust that Your
          plans for me are good, even when this season has been hard.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Moving On?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for your specific
          healing and letting-go journey.
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
