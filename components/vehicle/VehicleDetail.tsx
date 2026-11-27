"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { guideFor } from "@/data/guides";
import type { Vehicle } from "@/data/vehicles";
import { formatFCFA, formatFromFCFA } from "@/lib/format";
import { gsap, useGSAP } from "@/lib/gsap";
import { useQuote } from "@/components/quote/QuoteProvider";
import { ButtonLink } from "@/components/ui/Button";

export function VehicleDetail({
  vehicle,
  related,
}: {
  vehicle: Vehicle;
  related: Vehicle[];
}) {
  const [index, setIndex] = useState(0);
  const photoRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { add, has } = useQuote();
  useGSAP(() => {
    gsap.fromTo(
      photoRef.current,
      { scale: 1.06, autoAlpha: 0.4 },
      { scale: 1, autoAlpha: 1, duration: 0.7, ease: "power2.out" },
    );
  }, { dependencies: [index, vehicle.slug] });

  const guide = guideFor(vehicle.slug);
  const photos = [(guide?.pageImages ?? vehicle.images)[0]].filter(Boolean);
  const image = photos[index] ?? photos[0];

  const quote = () => {
    add(vehicle.slug);
    router.push(`/quote?vehicle=${vehicle.slug}`);
  };

  return (
    <article className="bg-white pt-14">
      <section className="relative h-[72vh] min-h-[480px] bg-[#111]">
        <div ref={photoRef} className="absolute inset-0">
          <Image
            src={image}
            alt={vehicle.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 text-white md:px-12">
          <p className="text-sm font-medium">{vehicle.tag}</p>
          <h1 className="mt-2 text-4xl font-medium tracking-tight md:text-6xl">{vehicle.shortName}</h1>
          {vehicle.price != null && (
            <p className="mt-2 text-lg underline underline-offset-4">{formatFromFCFA(vehicle.price)}</p>
          )}
        </div>
      </section>

      {photos.length > 1 && (
        <div className="mx-auto flex max-w-6xl gap-3 overflow-x-auto px-6 py-4">
          {photos.map((src, imageIndex) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(imageIndex)}
              className={`relative h-20 w-32 shrink-0 overflow-hidden rounded-md ${imageIndex === index ? "ring-2 ring-[#171a20]" : ""}`}
              aria-label={`Photo ${imageIndex + 1}`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="128px" />
            </button>
          ))}
        </div>
      )}

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-10 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <p className="text-sm text-[#5c5e62]">ref : {vehicle.ref} · Mercedes</p>
          <h2 className="mt-2 text-2xl font-medium">{vehicle.name}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#393c41]">{vehicle.blurb}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {vehicle.highlights.map((item) => (
              <li key={item} className="rounded-xl bg-[#f4f4f4] px-4 py-3 text-sm font-medium">
                {item}
              </li>
            ))}
          </ul>
          {guide?.imageNote && (
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#5c5e62]">{guide.imageNote}</p>
          )}
          <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[#e7e7e7] sm:grid-cols-2">
            {vehicle.specs.map((spec) => (
              <div key={spec.label} className="bg-white px-5 py-4">
                <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#5c5e62]">{spec.label}</dt>
                <dd className="mt-1 text-[15px] font-medium leading-snug tracking-[-0.015em]">{spec.value}</dd>
              </div>
            ))}
          </dl>
          {guide && (
            <div className="mt-10">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#5c5e62]">Before you buy</p>
              <ol className="mt-4 grid gap-px overflow-hidden rounded-2xl bg-[#e7e7e7] sm:grid-cols-2">
                {guide.know.map((item, itemIndex) => (
                  <li key={item} className="bg-white px-5 py-5">
                    <span className="text-[11px] font-medium tracking-[0.16em] text-[#5c5e62]">
                      {String(itemIndex + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-2 text-[15px] font-normal leading-7 tracking-[-0.011em] text-[#393c41]">{item}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        <aside className="h-fit rounded-2xl bg-[#f4f4f4] p-6 lg:sticky lg:top-20">
          <p className="text-sm text-[#5c5e62]">{vehicle.inStock ? "In stock" : "Out of stock"}</p>
          {vehicle.price != null ? (
            <>
              <p className="mt-3 text-xs uppercase tracking-wide text-[#5c5e62]">Price in Douala</p>
              <p className="text-3xl font-medium">{formatFCFA(vehicle.price)}</p>
            </>
          ) : (
            <p className="mt-3 text-2xl font-medium">Price on request</p>
          )}
          <p className="mt-3 text-sm text-[#393c41]">
            {[vehicle.engine, vehicle.fuelLabel, vehicle.transmission, vehicle.drive, vehicle.emission]
              .filter(Boolean)
              .join(" · ")}
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={quote}
              className="inline-flex h-10 items-center justify-center rounded-[4px] bg-tesla text-sm font-medium text-white hover:bg-[#345dcc]"
            >
              {vehicle.inStock ? (has(vehicle.slug) ? "Added — open quote" : "Order Now") : "Join the waitlist"}
            </button>
            <ButtonLink href="/shop" tone="light">
              Back to shop
            </ButtonLink>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <h2 className="text-2xl font-medium">Also in the yard</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/vehicles/${item.slug}`} className="group overflow-hidden rounded-2xl bg-[#f4f4f4]">
                <div className="relative h-44">
                  <Image src={guideFor(item.slug)?.pageImages?.[0] ?? item.images[0]} alt="" fill className="object-cover transition duration-500 group-hover:scale-105" sizes="33vw" />
                </div>
                <div className="p-4">
                  <p className="font-medium">{item.shortName}</p>
                  {item.price != null && <p className="text-sm text-[#5c5e62]">{formatFCFA(item.price)}</p>}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
