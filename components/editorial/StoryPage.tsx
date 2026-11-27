"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { guideFor } from "@/data/guides";
import type { Vehicle } from "@/data/vehicles";
import { formatFCFA } from "@/lib/format";
import { gsap, useGSAP } from "@/lib/gsap";
import { ButtonLink } from "@/components/ui/Button";

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
  const copy = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.from(titleRef.current, { y: 24, autoAlpha: 0, duration: 0.7, ease: "power3.out" });
  });

  useGSAP(() => {
    gsap.from("[data-story-card]", {
      y: 24,
      autoAlpha: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: { trigger: copy.current, start: "top 80%" },
    });
  }, { scope: copy });

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

      <section ref={copy} className="mx-auto max-w-6xl px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-4 text-[15px] leading-7 text-[#393c41]">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {facts.length > 0 && (
          <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label} data-story-card className="rounded-2xl bg-[#f4f4f4] px-5 py-4">
                <dt className="text-sm text-[#5c5e62]">{fact.label}</dt>
                <dd className="mt-1 text-lg font-medium leading-snug">{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {gallery.length > 0 && (
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((shot) => (
              <figure key={shot.src} data-story-card className="overflow-hidden rounded-2xl bg-[#f4f4f4]">
                <div className="relative h-56">
                  <Image src={shot.src} alt={shot.alt} fill className="object-cover" sizes="33vw" />
                </div>
                <figcaption className="px-4 py-3 text-sm text-[#393c41]">{shot.alt}</figcaption>
              </figure>
            ))}
          </div>
        )}

        <h2 className="mt-14 text-2xl font-medium">In this range</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => {
            const guide = guideFor(vehicle.slug);
            const photo = guide?.pageImages?.[0] ?? vehicle.images[0];
            return (
              <Link
                key={vehicle.slug}
                href={`/vehicles/${vehicle.slug}`}
                data-story-card
                className="overflow-hidden rounded-2xl bg-[#f4f4f4]"
              >
                <div className="relative h-52">
                  <Image src={photo} alt="" fill className="object-cover" sizes="33vw" />
                </div>
                <div className="p-4">
                  <p className="text-lg font-medium">{vehicle.shortName}</p>
                  <p className="text-sm text-[#5c5e62]">
                    {vehicle.inStock ? "In stock in Douala" : "Out of stock"} · ref {vehicle.ref}
                  </p>
                  {vehicle.price != null && <p className="mt-1 text-sm">{formatFCFA(vehicle.price)}</p>}
                  {guide?.imageNote && <p className="mt-2 text-xs leading-5 text-[#5c5e62]">{guide.imageNote}</p>}
                </div>
              </Link>
            );
          })}
        </div>

        {buying.length > 0 && (
          <div className="mx-auto mt-14 max-w-3xl">
            <h2 className="text-2xl font-medium">Before you buy</h2>
            <ul className="mt-4 space-y-3 text-[15px] leading-7 text-[#393c41]">
              {buying.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
