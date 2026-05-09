
export const metadata = {
  title: "Prayer for Students and Exams (Focus, Peace, and Success)",
  description:
    "A Christian prayer for students facing exams — asking God for focus, calm, mental clarity, and success in studies.",
};

import Link from "next/link";

export default function StudentsAndExamsPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Students and Exams
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Exams and academic pressure can be overwhelming. This prayer covers
        students in God's peace, sharpens their focus, and asks for the
        clarity and recall needed to perform their very best.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Lord Jesus,
          <br />
          <br />
          I come to You as I prepare for this exam. You gave me this mind and
          the ability to learn, and I trust You with the results. Please calm
          my nerves and help me to focus. Let the things I have studied come
          back to me clearly when I need them.
          <br />
          <br />
          Replace anxiety with confidence and doubt with peace. Help me to
          manage my time well and to think clearly under pressure.
          <br />
          <br />
          Whatever the outcome, remind me that my worth is not defined by a
          score. But I believe You care about this and I trust You to help me
          do my best.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Student Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for your specific exam,
          subject, or academic challenge.
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
