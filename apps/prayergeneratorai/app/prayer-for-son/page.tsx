
export const metadata = {
  title: "Prayer for My Son (Raise Him in God's Purpose)",
  description:
    "A powerful Christian prayer for your son — covering him with God's wisdom, protection, and a life of purpose and faith.",
};

import Link from "next/link";

export default function SonPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for My Son
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Whether your son is a toddler, a teenager, or a grown man, this prayer
        covers him in God's purpose and protection. Praying for your son shapes
        the man he is becoming.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Father,
          <br />
          <br />
          I pray for my son today. Thank You for trusting me with him. I ask
          that You build in him a strong character, a courageous heart, and a
          deep love for You. Shield him from every negative influence and
          surround him with people who will encourage him in the right direction.
          <br />
          <br />
          Give him clarity about his identity and confidence in Your calling on
          his life. When the world tries to define him, let Your voice be louder.
          Guard his mind, his heart, and his future.
          <br />
          <br />
          Raise him to be a man who honors You in all he does.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Your Son?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for exactly what your
          son is going through right now.
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
