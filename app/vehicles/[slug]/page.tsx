import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { VehicleDetail } from "@/components/vehicle/VehicleDetail";
import { getVehicle, vehicles } from "@/data/vehicles";

type Params = { slug: string };

export function generateStaticParams() {
  return vehicles.map((vehicle) => ({ slug: vehicle.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  return { title: vehicle?.name ?? "Vehicle" };
}

export default function VehiclePage({ params }: { params: Promise<Params> }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white px-6 pt-24 text-sm">Loading the car…</div>}>
      <VehicleContent params={params} />
    </Suspense>
  );
}

async function VehicleContent({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) notFound();

  const related = vehicles
    .filter((item) => item.slug !== vehicle.slug && item.series === vehicle.series)
    .slice(0, 3);

  return <VehicleDetail vehicle={vehicle} related={related} />;
}
