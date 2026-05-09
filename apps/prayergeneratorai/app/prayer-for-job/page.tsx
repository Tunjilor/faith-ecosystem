
export const metadata = {
  title: "Prayer for a Job (Open Doors and Divine Opportunity)",
  description:
    "A Christian prayer for finding a job — asking God to open the right doors, grant favor, and bring the right opportunity.",
};

import Link from "next/link";

export default function JobPrayerPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer for a Job
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Job searching can be discouraging and uncertain. This prayer asks God
        to guide your search, open the right doors, grant favor with employers,
        and bring the opportunity that aligns with His purpose for your life.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Lord,
          <br />
          <br />
          I am trusting You in this job search. I have submitted applications,
          prepared interviews, and waited — and I need Your help. Please open
          the right doors and close the ones that are not meant for me.
          <br />
          <br />
          Give me favor with every employer and recruiter I encounter. Grant me
          confidence and clarity in interviews. Help me not to grow discouraged
          during the wait, but to trust that Your timing is perfect.
          <br />
          <br />
          Bring me into a role where I can use the gifts You've given me and
          make a meaningful contribution. You know what I need, Lord. I trust
          You to provide it.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Job Search Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer tailored to your
          specific job search and industry.
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
