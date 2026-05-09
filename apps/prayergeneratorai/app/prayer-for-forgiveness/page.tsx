
export const metadata = {
  title: "Prayer for Forgiveness (Receive God's Grace and Mercy)",
  description:
    "A sincere Christian prayer for forgiveness — seeking God's grace, releasing guilt, and walking in freedom and restoration.",
};

import Link from "next/link";

export default function ForgivenessPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for Forgiveness
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Guilt and shame can be heavy burdens, but God's forgiveness is complete
        and free. This prayer helps you come before God honestly, receive His
        mercy, and walk forward in freedom.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Father,
          <br />
          <br />
          I come to You with a humble heart. I have fallen short, and I know
          it. I am sorry for the things I have done and the things I have left
          undone. I am sorry for the ways I have hurt others and turned away
          from You.
          <br />
          <br />
          Thank You that Your mercy is new every morning and that Your love
          never fails. I receive Your forgiveness now and ask You to wash me
          clean. Help me to release the guilt I've been carrying and to walk
          forward in grace.
          <br />
          <br />
          Give me the strength to make things right where I can, and help me
          to forgive myself as You have forgiven me.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Prayer for Forgiveness?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to create a prayer that speaks to your
          specific situation and need.
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
