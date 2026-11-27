import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopCatalog } from "@/components/shop/ShopCatalog";

export const metadata: Metadata = {
  title: "Mercedes inventory",
  description: "4x4, SUV and station wagon Mercedes-Benz for sale in Cameroon, priced in FCFA.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="px-6 pt-24 text-sm">Loading inventory…</div>}>
      <ShopCatalog />
    </Suspense>
  );
}
