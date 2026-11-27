"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { guideFor } from "@/data/guides";
import type { Vehicle } from "@/data/vehicles";
import { formatFCFA } from "@/lib/format";
import { gsap, useGSAP } from "@/lib/gsap";
import { ButtonLink } from "@/components/ui/Button";
import { tileDelay, tileMotion, tileStyle } from "@/components/ui/tiles";

type Action = { label: string; href: string };
type Fact = { label: string; value: string };
type Shot = { src: string; alt: string };

export function StoryPage({
  title,
  subtitle,
  image,
  imageAlt,
  primary,
  secondary,
  vehicles,
  paragraphs,
  facts = [],
  gallery = [],
  buying = [],
}: {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  primary: Action;
  secondary: Action;
  vehicles: Vehicle[];
  paragraphs: string[];
  facts?: Fact[];
  gallery?: Shot[];
  buying?: string[];
}) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.from(titleRef.current, { y: 24, autoAlpha: 0, duration: 0.7, ease: "power3.out" });
  });

  return (
    <div className="bg-white">
      <section className="relative flex h-svh min-h-[640px] items-center justify-center overflow-hidden bg-[#111] text-center text-white">
        <Image src={image} alt={imageAlt} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.4),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/50 to-transparent" />
        <div className="relative z-10 px-6">
          <h1 ref={titleRef} className="text-5xl font-medium tracking-tight md:text-7xl">
            {title}
          </h1>
          <p className="mt-3 text-lg md:text-2xl">{subtitle}</p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <ButtonLink href={primary.href} tone="blue" className="sm:min-w-[200px]">
              {primary.label}
            </ButtonLink>
            <ButtonLink href={secondary.href} tone="light" className="sm:min-w-[200px]">
              {secondary.label}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-[#171a20] font-sans text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white lg:col-span-5">The line</p>
          <div className="space-y-4 text-[15px] font-normal leading-7 tracking-[-0.011em] text-white lg:col-span-5 lg:row-start-2">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {facts.length > 0 && (
            <dl
              className="grid content-stretch gap-4 self-stretch sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:row-start-2 lg:h-full lg:grid-cols-1"
              style={{ gridTemplateRows: `repeat(${facts.length}, minmax(7.5rem, 1fr))` }}
            >
              {facts.map((fact, factIndex) => (
                <div
                  key={fact.label}
                  data-story-card
                  style={tileDelay(factIndex)}
                  className="grid content-center gap-2 rounded-2xl border border-white bg-transparent px-8 py-8 tile-rise sm:grid-cols-[11rem_1fr] sm:items-center sm:gap-8"
                >
                  <dt className="text-[13px] font-medium uppercase tracking-[0.16em] text-white">{fact.label}</dt>
                  <dd className="text-xl font-medium leading-snug tracking-[-0.02em] text-white">{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 font-sans">
        {gallery.length > 0 && (
          <div className={`mt-16 grid gap-4 ${gallery.length > 1 ? "sm:grid-cols-3" : "grid-cols-1"}`}>
            {gallery.map((shot, shotIndex) => (
              <figure key={shot.src} data-story-card className={`group overflow-hidden ${tileMotion}`} style={{ ...tileStyle(shotIndex), ...tileDelay(shotIndex) }}>
                <div className={`relative overflow-hidden ${gallery.length > 1 ? "h-72" : "h-[28rem]"}`}>
                  <Image src={shot.src} alt={shot.alt} fill className="object-cover transition duration-700 ease-out group-hover:scale-105" sizes={gallery.length > 1 ? "33vw" : "100vw"} />
                </div>
                <figcaption className="px-4 py-3 text-[13px] font-normal leading-5 tracking-[-0.011em]">{shot.alt}</figcaption>
              </figure>
            ))}
          </div>
        )}

        {vehicles.length > 0 && <div className="mt-16">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-tesla">In this range</p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((vehicle) => {
              const guide = guideFor(vehicle.slug);
              const photo = guide?.pageImages?.[0] ?? vehicle.images[0];
              return (
                <Link
                  key={vehicle.slug}
                  href={`/vehicles/${vehicle.slug}`}
                  data-story-card
                  style={{ ...tileStyle(vehicles.indexOf(vehicle) + 1), ...tileDelay(vehicles.indexOf(vehicle)) }}
                  className={`block overflow-hidden ${tileMotion}`}
                >
                  <div className="relative h-52">
                    <Image src={photo} alt="" fill className="object-cover" sizes="33vw" />
                  </div>
                  <div className="p-4">
                    <p className="text-[17px] font-medium tracking-[-0.02em] text-tesla">{vehicle.shortName}</p>
                    <p className="mt-1 text-[13px] font-normal tracking-[-0.011em] opacity-80">
                      {vehicle.inStock ? "In stock in Douala" : "Out of stock"} · ref {vehicle.ref}
                    </p>
                    {vehicle.price != null && (
                      <p className="mt-2 text-[13px] font-medium tracking-[-0.011em] text-tesla">{formatFCFA(vehicle.price)}</p>
                    )}
                    {guide?.imageNote && (
                      <p className="mt-2 text-[12px] font-normal leading-5 tracking-[-0.011em] opacity-80">{guide.imageNote}</p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>}

      </section>

      {buying.length > 0 && (
        <section className="bg-[#171a20] font-sans text-white">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white">Before you buy</p>
            <ol className="mt-5 grid gap-8 sm:grid-cols-2">
              {buying.map((item, itemIndex) => (
                <li key={item} style={tileDelay(itemIndex)} className="tile-rise">
                  <span className="text-[11px] font-medium tracking-[0.16em] text-white">
                    {String(itemIndex + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 text-[15px] font-normal leading-7 tracking-[-0.011em] text-white">{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}
    </div>
  );
}
