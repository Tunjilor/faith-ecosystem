
export const metadata = {
  title: "Prayer for Wisdom (Clarity, Discernment, and Guidance)",
  description:
    "A Christian prayer for wisdom — asking God for clarity, discernment, and divine guidance in life's important decisions.",
};

import Link from "next/link";

export default function WisdomPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Wisdom
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        God promises to give wisdom generously to those who ask. Whether facing
        a major life decision or navigating daily complexities, this prayer
        seeks God's discernment, clarity, and guidance in every choice.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Lord,
          <br />
          <br />
          I need Your wisdom. I am facing decisions that feel too big for me,
          and I do not want to move forward based on my own limited understanding.
          Your Word says that if I ask for wisdom, You will give it generously.
          So I am asking.
          <br />
          <br />
          Grant me clarity where there is confusion, discernment where there is
          deception, and patience to wait on Your timing. Help me to hear Your
          voice above all the noise and to trust what You reveal.
          <br />
          <br />
          Let me walk in Your wisdom today and make choices that honor You and
          bless those around me.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Wisdom?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for the specific
          decision or situation you are navigating.
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
