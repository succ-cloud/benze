"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ButtonLink } from "@/components/ui/Button";
import Image from "next/image";

const steps = [
  {
    n: "01",
    title: "Choose the car",
    body: "Five Mercedes-Benz are in the yard, from the GLA 200d to the G 63 and the Maybach GLS.",
  },
  {
    n: "02",
    title: "Ask for a quote",
    body: "Tell us your city in Cameroon. The price is in FCFA from the Douala showroom.",
  },
  {
    n: "03",
    title: "We deliver in Cameroon",
    body: "From Douala to Yaoundé, Bafoussam, Bamenda, Garoua, Limbe, Kribi and the rest of the country.",
  },
];

const cities = ["Douala", "Yaoundé", "Bafoussam", "Bamenda", "Garoua", "Limbe", "Kribi", "Buea"];

export function DiscoverView() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from("[data-step]", {
      y: 28,
      autoAlpha: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: { trigger: root.current, start: "top 75%" },
    });
  }, { scope: root });

  return (
    <div className="bg-white">
      <section className="relative flex h-svh min-h-[640px] items-center justify-center overflow-hidden text-center text-white">
        <Image
          src="/images/amg-gt-dark.jpg"
          alt="Mercedes-AMG GT beside a harbour at dusk"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/50 to-transparent" />
        <div className="relative z-10 px-6">
          <h1 className="text-5xl font-medium tracking-tight md:text-7xl">Discover</h1>
          <p className="mt-3 text-lg md:text-2xl">Mercedes-Benz, sold in Cameroon.</p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <ButtonLink href="/shop" tone="blue" className="sm:min-w-[200px]">
              Shop stock
            </ButtonLink>
            <ButtonLink href="/quote" tone="light" className="sm:min-w-[200px]">
              Request a quote
            </ButtonLink>
          </div>
        </div>
      </section>

      <section ref={root} className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">
        {steps.map((step) => (
          <article key={step.n} data-step className="rounded-2xl bg-[#f4f4f4] p-6">
            <p className="text-sm text-tesla">{step.n}</p>
            <h2 className="mt-3 text-2xl font-medium">{step.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[#393c41]">{step.body}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-3xl font-medium">Cities we deliver to</h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {cities.map((city) => (
            <li key={city} className="rounded-full border border-neutral-300 px-4 py-2 text-sm">
              {city}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-sm leading-6 text-[#393c41]">
          Spainzy of Douala sells Mercedes-Benz in Cameroon. Prices are in FCFA. AMG and Maybach sit at the top of the list.
        </p>
        <Link href="/shop" className="mt-6 inline-block text-sm font-medium underline">
          Open the Mercedes inventory
        </Link>
      </section>
    </div>
  );
}
