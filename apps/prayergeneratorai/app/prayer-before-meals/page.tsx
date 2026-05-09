
export const metadata = {
  title: "Prayer Before Meals (Give Thanks and Bless Your Food)",
  description:
    "A simple and heartfelt Christian prayer before meals — giving thanks to God for His provision and blessing your food.",
};

import Link from "next/link";

export default function PrayerBeforeMealsPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Prayer Before Meals
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-8">
        Pausing to give thanks before a meal is a beautiful act of gratitude.
        This prayer blesses the food, acknowledges God as Provider, and
        invites His presence around your table.
      </p>

      <div className="max-w-2xl bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-300 leading-relaxed">
          Lord,
          <br />
          <br />
          We pause before this meal to give You thanks. Every good gift comes
          from You, and this food is no exception. You are our Provider and we
          do not take Your generosity for granted.
          <br />
          <br />
          Bless this food to nourish our bodies and give us the strength we need
          to serve You and others well. Bless the hands that prepared it.
          <br />
          <br />
          And as we eat together, may we be reminded of the greater feast You
          have prepared for us — and let gratitude fill our hearts.
          <br />
          <br />
          In Jesus' name, Amen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want a Personalized Mealtime Prayer?
        </h2>

        <p className="text-gray-400 mb-6">
          Use our AI prayer generator to write a prayer for your specific meal,
          occasion, or gathering.
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
