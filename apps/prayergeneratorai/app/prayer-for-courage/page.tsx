
export const metadata = {
  title: "Prayer for Courage (Be Strong and Bold in God)",
  description:
    "A Christian prayer for courage — asking God to replace fear with boldness and strengthen you to take the next step of faith.",
};

import Link from "next/link";

export default function CouragePrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Courage
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Courage is not the absence of fear — it is moving forward despite it.
        This prayer asks God to strengthen you with His courage so you can face
        what lies ahead with boldness and faith.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Lord God,
          <br />
          <br />
          I am facing something that I feel afraid to step into. Fear is loud
          and it is telling me to hold back, to play it safe, to not risk it.
          But I sense You calling me forward, and I need Your courage to obey.
          <br />
          <br />
          You told Joshua to be strong and courageous and You promised to be
          with him everywhere he went. I claim that same promise today. Go with
          me. Be my strength. Let the fear lose its grip as I fix my eyes on You.
          <br />
          <br />
          I step forward in Your name, trusting that You will catch me.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Courage?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for the specific step
          of faith you are being called to take.
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
