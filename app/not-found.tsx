import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-14 text-center">
      <h1 className="text-4xl font-medium">That page is not at the showroom</h1>
      <Link href="/shop" className="mt-6 text-sm font-medium underline">
        Browse Mercedes-Benz
      </Link>
    </div>
  );
}
