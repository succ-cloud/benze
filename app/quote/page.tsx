import type { Metadata } from "next";
import { Suspense } from "react";
import { QuoteDesk } from "@/components/quote/QuoteDesk";

export const metadata: Metadata = { title: "Quote" };

export default function QuotePage() {
  return (
    <Suspense fallback={<div className="px-6 pt-24 text-sm">Loading your quote…</div>}>
      <QuoteDesk />
    </Suspense>
  );
}
