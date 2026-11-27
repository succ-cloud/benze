"use client";

import Image from "next/image";
import { useRef } from "react";
import { feature } from "@/data/home";
import { gsap, useGSAP } from "@/lib/gsap";
import { ButtonLink } from "@/components/ui/Button";

export function FeatureSplit() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.from("[data-feature-copy]", {
      x: -36,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: root.current, start: "top 75%" },
    });
    gsap.from("[data-feature-photo]", {
      x: 36,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: root.current, start: "top 75%" },
    });
  }, { scope: root });

  return (
    <section ref={root} className="bg-white px-3 py-3 md:px-6">
      <div className="grid overflow-hidden rounded-2xl bg-[#f4f4f4] md:grid-cols-2">
        <div data-feature-copy className="flex flex-col justify-center px-6 py-10 md:px-14 md:py-16">
          <h2 className="text-[32px] font-medium leading-[1.15] tracking-tight md:text-[40px]">
            {feature.title}
            <br />
            <span className="text-tesla">{feature.accent}</span>
          </h2>
          <p className="mt-3 text-sm text-[#393c41]">{feature.kicker}</p>
          <div className="mt-8 flex flex-wrap gap-10">
            {feature.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-medium tracking-tight md:text-5xl">{stat.value}</p>
                <p className="mt-1 text-sm text-[#5c5e62]">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={feature.primary.href} tone="black" className="sm:min-w-[180px]">
              {feature.primary.label}
            </ButtonLink>
            <ButtonLink href={feature.secondary.href} tone="light" className="sm:min-w-[180px]">
              {feature.secondary.label}
            </ButtonLink>
          </div>
        </div>
        <div data-feature-photo className="relative min-h-[280px] md:min-h-[520px]">
          <Image
            src={feature.image}
            alt={feature.imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          <p className="absolute bottom-4 right-4 rounded bg-black/55 px-3 py-1 text-xs text-white">
            {feature.caption}
          </p>
        </div>
      </div>
    </section>
  );
}
