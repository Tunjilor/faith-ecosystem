// src/app/refund/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Faith Companion AI is free. Help for past Premium purchases.",
  alternates: {
    canonical: "/refund",
  },
};

export default function RefundPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
      <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur md:p-10">
        <h1 className="text-3xl font-bold text-white md:text-4xl">Refund Policy</h1>

        <p className="mt-6 text-sm leading-7 text-white/75 md:text-base">
          Faith Companion AI is free. If you paid for Premium in the past and need help,{" "}
          <Link href="/contact" className="underline underline-offset-4 hover:text-white">
            contact us
          </Link>
          .
        </p>
      </div>
    </main>
  );
}