
export const metadata = {
  title: "Easter Prayer (Celebrate the Resurrection of Jesus)",
  description:
    "A powerful Christian Easter prayer — celebrating the resurrection of Jesus Christ and the hope it brings to every believer.",
};

import Link from "next/link";

export default function EasterPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Easter Prayer
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Easter is the cornerstone of the Christian faith. The resurrection of
        Jesus changed everything. This prayer celebrates His victory over death
        and the living hope we have because He is risen.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Risen Lord,
          <br />
          <br />
          He is risen — and because He is risen, everything is different. On
          this Easter, we stand in awe of what You accomplished through the
          cross and the empty tomb. What looked like defeat became the greatest
          victory in history.
          <br />
          <br />
          Thank You for conquering sin, death, and the grave on our behalf.
          Thank You for the living hope that we now carry because of the
          resurrection. Let this not just be a day we celebrate once a year —
          let the reality of the resurrection shape how we live every day.
          <br />
          <br />
          You are alive, and we are grateful.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Easter Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write an Easter prayer for your
          family, church, or personal reflection.
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
