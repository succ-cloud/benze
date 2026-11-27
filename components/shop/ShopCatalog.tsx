"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  categoryOptions,
  fuelOptions,
  seriesOptions,
  transmissionOptions,
  vehicles,
  type Vehicle,
} from "@/data/vehicles";
import { formatFCFA } from "@/lib/format";
import { gsap, useGSAP } from "@/lib/gsap";
import { Chevron } from "@/components/icons";

const faqs = [
  {
    q: "Why buy a Mercedes-Benz from Spainzy of Douala?",
    a: "The showroom is in Douala. You choose the car, we confirm the FCFA price, and we arrange delivery in Cameroon.",
  },
  {
    q: "What should you look for on Cameroon roads?",
    a: "Ground clearance, a drivetrain a local workshop can service, and an engine that matches the fuel on the ground. The diesel GLA and the mild-hybrid petrol AMGs are both in Douala.",
  },
  {
    q: "Where can the car be delivered?",
    a: "From the Douala showroom we deliver across Cameroon, including Yaoundé, Bafoussam, Bamenda, Garoua, Limbe, Kribi, Buea and Ngaoundéré.",
  },
  {
    q: "How is the price shown?",
    a: "Every price is in FCFA for a car sold in Cameroon. Delivery outside Douala is confirmed with the quote.",
  },
];

function parseList(value: string | null) {
  if (!value) return [];
  return value.split(",").filter(Boolean);
}

function CardGallery({ vehicle, eager = false }: { vehicle: Vehicle; eager?: boolean }) {
  const [index, setIndex] = useState(0);
  const count = vehicle.images.length;
  const image = vehicle.images[index] ?? vehicle.images[0];

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-[#ececec]">
      <Image
        src={image}
        alt=""
        fill
        className={`object-cover ${vehicle.inStock ? "" : "grayscale"}`}
        priority={eager && index === 0}
        sizes="(min-width: 1280px) 30vw, (min-width: 640px) 50vw, 100vw"
      />
      <Link href={`/vehicles/${vehicle.slug}`} className="absolute inset-0" aria-label={vehicle.name} />
      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 z-10 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-lg"
            onClick={() => setIndex((current) => (current - 1 + count) % count)}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next photo"
            className="absolute right-2 top-1/2 z-10 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-lg"
            onClick={() => setIndex((current) => (current + 1) % count)}
          >
            ›
          </button>
        </>
      )}
      {vehicle.has360 && (
        <span className="absolute left-3 top-3 z-10 rounded bg-black/80 px-2 py-0.5 text-xs font-medium text-white">
          360°
        </span>
      )}
      {!vehicle.inStock && (
        <span className="absolute right-3 top-3 z-10 rounded bg-white px-2 py-0.5 text-xs font-medium">
          Out of Stock
        </span>
      )}
    </div>
  );
}

export function ShopCatalog() {
  const params = useSearchParams();
  const router = useRouter();
  const gridRef = useRef<HTMLDivElement>(null);
  const [min, setMin] = useState(Number(params.get("min") ?? 1000000));
  const [max, setMax] = useState(Number(params.get("max") ?? 250000000));
  const [sort, setSort] = useState<"price-asc" | "price-desc">("price-asc");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const series = parseList(params.get("series"));
  const category = parseList(params.get("category"));
  const fuel = parseList(params.get("fuel"));
  const transmission = parseList(params.get("transmission"));
  const line = params.get("line");

  useEffect(() => {
    setMin(Number(params.get("min") ?? 1000000));
    setMax(Number(params.get("max") ?? 250000000));
  }, [params]);

  const replaceParams = (next: URLSearchParams) => {
    const query = next.toString();
    router.replace(query ? `/shop?${query}` : "/shop", { scroll: false });
  };

  const toggle = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    const current = new Set(parseList(next.get(key)));
    if (current.has(value)) current.delete(value);
    else current.add(value);
    if (current.size) next.set(key, [...current].join(","));
    else next.delete(key);
    replaceParams(next);
  };

  const clearLine = () => {
    const next = new URLSearchParams(params.toString());
    next.delete("line");
    replaceParams(next);
  };

  const clearAll = () => {
    setMin(1000000);
    setMax(250000000);
    setSort("price-asc");
    router.replace("/shop", { scroll: false });
  };

  const filtered = useMemo(() => {
    return vehicles.filter((vehicle) => {
      if (series.length && !series.includes(vehicle.series)) return false;
      if (category.length && !category.includes(vehicle.category)) return false;
      if (fuel.length && !fuel.includes(vehicle.fuel)) return false;
      if (transmission.length && !transmission.includes(vehicle.transmission)) return false;
      if (line && vehicle.line !== line) return false;
      if (vehicle.inStock && vehicle.price != null && (vehicle.price < min || vehicle.price > max)) {
        return false;
      }
      return true;
    });
  }, [series, category, fuel, transmission, line, min, max]);

  const inStock = filtered
    .filter((vehicle) => vehicle.inStock)
    .sort((a, b) => {
      const left = a.price ?? 0;
      const right = b.price ?? 0;
      return sort === "price-asc" ? left - right : right - left;
    });
  const soldOut = filtered.filter((vehicle) => !vehicle.inStock);

  const activeCount =
    series.length +
    category.length +
    fuel.length +
    transmission.length +
    (line ? 1 : 0) +
    (min !== 1000000 || max !== 250000000 ? 1 : 0);

  const signature = [...inStock, ...soldOut].map((vehicle) => vehicle.slug).join("|");

  useGSAP(() => {
    gsap.from("[data-vehicle-card]", {
      y: 24,
      autoAlpha: 0,
      duration: 0.5,
      stagger: 0.04,
      ease: "power2.out",
    });
  }, { scope: gridRef, dependencies: [signature] });

  const renderFilters = () => (
    <form
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        setFiltersOpen(false);
      }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button type="button" className="text-sm underline" onClick={clearAll}>
          Clear all
        </button>
      </div>
      <fieldset>
        <legend className="text-sm font-medium">Price range (FCFA)</legend>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="number"
            min={0}
            value={min}
            onChange={(event) => setMin(Number(event.target.value))}
            className="w-full rounded border border-neutral-300 px-2 py-2 text-sm"
            aria-label="Minimum price"
          />
          <span className="text-neutral-400">—</span>
          <input
            type="number"
            min={0}
            value={max}
            onChange={(event) => setMax(Number(event.target.value))}
            className="w-full rounded border border-neutral-300 px-2 py-2 text-sm"
            aria-label="Maximum price"
          />
        </div>
      </fieldset>
      <fieldset>
        <legend className="text-sm font-medium">Series</legend>
        <div className="mt-2 space-y-1">
          {seriesOptions.map((option) => (
            <label key={option.id} className="flex items-center gap-2 py-1 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 accent-[#171a20]"
                checked={series.includes(option.id)}
                onChange={() => toggle("series", option.id)}
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="text-sm font-medium">Category</legend>
        <div className="mt-2 space-y-1">
          {categoryOptions.map((option) => (
            <label key={option.id} className="flex items-center gap-2 py-1 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 accent-[#171a20]"
                checked={category.includes(option.id)}
                onChange={() => toggle("category", option.id)}
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="text-sm font-medium">Fuel</legend>
        <div className="mt-2 space-y-1">
          {fuelOptions.map((option) => (
            <label key={option.id} className="flex items-center gap-2 py-1 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 accent-[#171a20]"
                checked={fuel.includes(option.id)}
                onChange={() => toggle("fuel", option.id)}
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="text-sm font-medium">Transmission</legend>
        <div className="mt-2 space-y-1">
          {transmissionOptions.map((option) => (
            <label key={option} className="flex items-center gap-2 py-1 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 accent-[#171a20]"
                checked={transmission.includes(option)}
                onChange={() => toggle("transmission", option)}
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>
      <button
        type="submit"
        className="h-10 w-full rounded-[4px] bg-[#171a20] text-sm font-medium text-white"
      >
        See results
      </button>
    </form>
  );

  return (
    <div className="bg-white pt-14">
      <div className="mx-auto max-w-[1240px] px-4 py-8 md:px-6">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-[#5c5e62]">
          <Link href="/" className="hover:underline">Home</Link>
          <Chevron dir="right" className="h-3.5 w-3.5" />
          <span>4x4, SUV & Station Wagon</span>
          <Chevron dir="right" className="h-3.5 w-3.5" />
          <span className="text-[#171a20]">Mercedes</span>
        </nav>

        <h1 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
          4x4, SUV & Station Wagon Mercedes
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#393c41]">
          In-stock Mercedes-Benz SUVs and the G-Class at Spainzy of Douala, priced in FCFA for Cameroon.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {categoryOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => toggle("category", option.id)}
              className={`rounded-full border px-3 py-1 text-sm ${category.includes(option.id) ? "border-[#171a20] bg-[#171a20] text-white" : "border-neutral-300"}`}
            >
              {option.label}
            </button>
          ))}
          {seriesOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => toggle("series", option.id)}
              className={`rounded-full border px-3 py-1 text-sm ${series.includes(option.id) ? "border-[#171a20] bg-[#171a20] text-white" : "border-neutral-300"}`}
            >
              {option.label}
            </button>
          ))}
          {line && (
            <button type="button" onClick={clearLine} className="rounded-full bg-[#171a20] px-3 py-1 text-sm text-white">
              {line.toUpperCase()} ×
            </button>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded border border-neutral-300 px-3 text-sm lg:hidden"
              onClick={() => setFiltersOpen(true)}
            >
              Filters
              {activeCount > 0 && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#171a20] px-1 text-xs text-white">
                  {activeCount}
                </span>
              )}
            </button>
            <p className="text-sm" aria-live="polite">
              <span className="font-semibold">{inStock.length}</span> vehicles found
            </p>
          </div>
          <label className="flex items-center gap-2 text-sm">
            Sort by:
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as "price-asc" | "price-desc")}
              className="h-10 rounded border border-neutral-300 bg-white px-2"
            >
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </label>
        </div>

        <div className="mt-6 lg:grid lg:grid-cols-[270px_1fr] lg:gap-8">
          <aside className="sticky top-20 hidden h-fit rounded-xl bg-[#f7f7f7] p-5 lg:block">
            {renderFilters()}
          </aside>

          <div ref={gridRef}>
            {inStock.length === 0 ? (
              <p className="rounded-xl border border-dashed border-neutral-300 px-6 py-16 text-center text-sm text-[#393c41]">
                Nothing in stock matches these filters. Clear them or ask the desk to source the car.
              </p>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                {inStock.map((vehicle, cardIndex) => (
                  <VehicleCard key={vehicle.slug} vehicle={vehicle} eager={cardIndex < 3} />
                ))}
              </div>
            )}

            {soldOut.length > 0 && (
              <div className="mt-14">
                <h2 className="text-xl font-semibold">Out of stock</h2>
                <div className="mt-6 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                  {soldOut.map((vehicle) => (
                    <VehicleCard key={vehicle.slug} vehicle={vehicle} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <section className="mt-16 rounded-2xl bg-[#f4f4f4] px-6 py-8 md:px-10">
          <h2 className="text-2xl font-semibold">Delivery across Cameroon</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#393c41]">
            Cars leave the Douala showroom for Yaoundé, Bafoussam, Bamenda, Garoua, Limbe, Kribi, Buea, Ngaoundéré and other cities in Cameroon.
          </p>
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-semibold">Mercedes-Benz in Cameroon</h2>
          <p className="mt-4 text-sm leading-7 text-[#393c41]">
            The list is mostly Mercedes-Benz: GLA, GLC, GLE, GLS, Maybach and the G-Class. Prices are in FCFA at the Douala showroom. Out-of-stock cars stay on the page so you can ask for the next one.
          </p>
        </section>

        <section className="mt-12 border-t border-neutral-200">
          <h2 className="pt-8 text-2xl font-semibold">FAQ</h2>
          <div className="mt-4 divide-y divide-neutral-200">
            {faqs.map((item, index) => {
              const open = openFaq === index;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 py-4 text-left text-base font-medium"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : index)}
                  >
                    {item.q}
                    <Chevron dir="down" className={`h-5 w-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="pb-4 text-sm leading-6 text-[#393c41]">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-neutral-200 px-6 py-8">
          <h2 className="text-xl font-semibold">Yard notes</h2>
          <p className="mt-2 text-sm text-[#393c41]">Leave an email and the city in Cameroon.</p>
          {subscribed ? (
            <p className="mt-4 text-sm font-medium">Saved on this device. We will use it when mail delivery is connected.</p>
          ) : (
            <form
              className="mt-4 flex flex-col gap-3 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                if (!email.includes("@")) return;
                localStorage.setItem("benze-notes", JSON.stringify({ email, country }));
                setSubscribed(true);
              }}
            >
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-11 flex-1 rounded border border-neutral-300 px-3 text-sm"
              />
              <input
                placeholder="City in Cameroon"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                className="h-11 flex-1 rounded border border-neutral-300 px-3 text-sm"
              />
              <button type="submit" className="h-11 rounded bg-[#171a20] px-5 text-sm font-medium text-white">
                Subscribe
              </button>
            </form>
          )}
        </section>
      </div>

      {filtersOpen && (
        <div className="fixed inset-x-0 bottom-0 top-14 z-40 overflow-y-auto bg-white px-5 py-6 lg:hidden">
          <div className="mb-4 flex justify-end">
            <button type="button" className="text-sm underline" onClick={() => setFiltersOpen(false)}>
              Close
            </button>
          </div>
          {renderFilters()}
        </div>
      )}
    </div>
  );
}

function VehicleCard({ vehicle, eager = false }: { vehicle: Vehicle; eager?: boolean }) {
  return (
    <article data-vehicle-card className="flex h-full flex-col">
      <CardGallery vehicle={vehicle} eager={eager} />
      <div className="flex flex-1 flex-col pt-3">
        <p className="text-xs text-[#5c5e62]">ref : {vehicle.ref}</p>
        <p className="mt-1 text-sm text-[#393c41]">Mercedes</p>
        <h3 className="mt-1 text-lg font-semibold leading-snug">
          <Link href={`/vehicles/${vehicle.slug}`} className="hover:underline">
            {vehicle.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-[#393c41]">
          {[vehicle.engine, vehicle.fuelLabel, vehicle.transmission, vehicle.drive, vehicle.emission]
            .filter(Boolean)
            .join(" · ")}
        </p>
        {vehicle.price != null ? (
          <>
            <p className="mt-4 text-xs uppercase tracking-wide text-[#5c5e62]">Price in Douala</p>
            <p className="text-xl font-semibold">{formatFCFA(vehicle.price)}</p>
          </>
        ) : (
          <p className="mt-4 text-sm text-[#5c5e62]">Price on request</p>
        )}
        <Link
          href={`/quote?vehicle=${vehicle.slug}`}
          className="mt-auto inline-flex h-9 w-fit items-center rounded-[4px] border border-[#171a20] px-4 text-sm font-medium hover:bg-[#171a20] hover:text-white"
        >
          {vehicle.inStock ? "Quote" : "Join the waitlist"}
        </Link>
      </div>
    </article>
  );
}
