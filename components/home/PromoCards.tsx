"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { promos, type Promo } from "@/data/home";
import { gsap, useGSAP } from "@/lib/gsap";
import { ButtonLink } from "@/components/ui/Button";

function PromoCard({ promo }: { promo: Promo }) {
  if (promo.variant === "bleed") {
    return (
      <article className="grid min-h-[300px] overflow-hidden rounded-2xl bg-[#f4f4f4] md:min-h-[320px] md:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col justify-center p-8 md:p-12">
          <h2 className="text-[28px] font-medium leading-tight tracking-tight">{promo.title}</h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[#393c41]">{promo.body}</p>
          <ButtonLink href={promo.href} tone="light" className="mt-6 self-start">
            Learn More
          </ButtonLink>
        </div>
        <div className="relative min-h-[220px] bg-black">
          <Image src={promo.image} alt={promo.imageAlt} fill className="object-cover" sizes="40vw" />
        </div>
      </article>
    );
  }

  return (
    <article className="grid overflow-hidden rounded-2xl bg-[#f4f4f4] md:relative md:block md:min-h-[320px]">
      <div className="relative min-h-[200px] md:absolute md:bottom-6 md:right-6 md:top-6 md:w-[44%] md:min-h-0 md:overflow-hidden md:rounded-xl">
        <Image src={promo.image} alt={promo.imageAlt} fill className="object-cover" sizes="(min-width: 768px) 30vw, 100vw" />
      </div>
      <div className="relative z-10 flex flex-col justify-center p-6 md:h-full md:max-w-[52%] md:p-12">
        <h2 className="text-2xl font-medium leading-tight tracking-tight md:text-[28px]">{promo.title}</h2>
        <p className="mt-3 text-sm leading-6 text-[#393c41]">{promo.body}</p>
        <ButtonLink href={promo.href} tone="light" className="mt-6 w-full sm:w-auto sm:self-start">
          Learn More
        </ButtonLink>
      </div>
    </article>
  );
}

export function PromoCards() {
  const [perPage, setPerPage] = useState(2);
  const [page, setPage] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const apply = () => setPerPage(media.matches ? 1 : 2);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  const pages = useMemo(() => {
    const chunks: Promo[][] = [];
    for (let i = 0; i < promos.length; i += perPage) chunks.push(promos.slice(i, i + perPage));
    return chunks;
  }, [perPage]);

  useEffect(() => {
    if (page > pages.length - 1) setPage(0);
  }, [page, pages.length]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.to(track, {
      x: -page * viewport.clientWidth,
      duration: reduce ? 0 : 0.7,
      ease: "power3.inOut",
    });
  }, [page, perPage]);

  useGSAP(() => {
    gsap.from(root.current, {
      y: 28,
      autoAlpha: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: { trigger: root.current, start: "top 85%" },
    });
  }, { scope: root });

  return (
    <section ref={root} className="bg-white px-3 pb-8 pt-3 md:px-6">
      <div className="mb-4 flex justify-center gap-2">
        {pages.map((_, dot) => (
          <button
            key={dot}
            type="button"
            aria-label={`Show offer group ${dot + 1}`}
            className={`h-2 w-2 rounded-full ${dot === page ? "bg-[#171a20]" : "bg-[#171a20]/30"}`}
            onClick={() => setPage(dot)}
          />
        ))}
      </div>
      <div ref={viewportRef} className="overflow-hidden">
        <div ref={trackRef} className="flex">
          {pages.map((group, groupIndex) => (
            <div key={groupIndex} className="w-full shrink-0">
              <div className="grid gap-4 md:grid-cols-2">
                {group.map((promo) => (
                  <PromoCard key={promo.id} promo={promo} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
