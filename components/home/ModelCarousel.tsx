"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { inStockVehicles } from "@/data/vehicles";
import { formatFromFCFA } from "@/lib/format";
import { gsap, useGSAP } from "@/lib/gsap";
import { ButtonLink } from "@/components/ui/Button";
import { Chevron } from "@/components/icons";

export function ModelCarousel() {
  const vehicles = inStockVehicles();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(Math.min(1, vehicles.length - 1));
  const dragged = useRef(false);
  const pointer = useRef({ x: 0, origin: 0, moved: false });

  const go = (next: number) => {
    setIndex(Math.max(0, Math.min(vehicles.length - 1, next)));
  };

  const position = (target: number, animate: boolean) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-card]");
    if (!viewport || !track || !card) return;
    const gap = 20;
    const x = (viewport.clientWidth - card.offsetWidth) / 2 - target * (card.offsetWidth + gap);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (animate && !reduce) {
      gsap.to(track, { x, duration: 0.9, ease: "power3.inOut" });
    } else {
      gsap.set(track, { x });
    }
  };

  useLayoutEffect(() => {
    position(index, true);
    const onResize = () => position(index, false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [index]);

  useGSAP(() => {
    gsap.from(viewportRef.current, {
      y: 32,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: { trigger: viewportRef.current, start: "top 88%" },
    });
  }, { scope: viewportRef });

  return (
    <section className="bg-white px-0 py-3 md:py-4" aria-label="Models in stock">
      <div
        ref={viewportRef}
        className="relative overflow-hidden"
        onPointerDown={(event) => {
          const track = trackRef.current;
          if (!track) return;
          pointer.current = {
            x: event.clientX,
            origin: Number(gsap.getProperty(track, "x")) || 0,
            moved: false,
          };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!event.currentTarget.hasPointerCapture(event.pointerId) || !trackRef.current) return;
          const dx = event.clientX - pointer.current.x;
          if (Math.abs(dx) > 8) pointer.current.moved = true;
          gsap.set(trackRef.current, { x: pointer.current.origin + dx });
        }}
        onPointerUp={(event) => {
          if (!pointer.current.moved) return;
          dragged.current = true;
          const dx = event.clientX - pointer.current.x;
          if (dx < -48) go(index + 1);
          else if (dx > 48) go(index - 1);
          else position(index, true);
        }}
        onClickCapture={(event) => {
          if (!dragged.current) return;
          event.preventDefault();
          event.stopPropagation();
          dragged.current = false;
        }}
      >
        <div ref={trackRef} className="flex gap-5 px-5">
          {vehicles.map((vehicle) => (
            <article
              key={vehicle.slug}
              data-card
              className="relative h-[68vh] min-h-[420px] w-[86vw] max-w-[1100px] shrink-0 overflow-hidden rounded-2xl bg-[#e8e8e8] md:w-[68vw] lg:w-[62vw]"
            >
              <Image
                src={vehicle.images[0]}
                alt={vehicle.name}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 62vw, 86vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20" />
              <p className="absolute left-6 top-6 text-sm font-medium text-white drop-shadow md:left-8 md:top-8">
                {vehicle.tag}
              </p>
              <div className="absolute bottom-6 left-6 right-6 text-white md:bottom-8 md:left-8">
                <h2 className="text-4xl font-medium tracking-tight md:text-5xl">{vehicle.shortName}</h2>
                {vehicle.price != null && (
                  <p className="mt-1 text-sm font-medium underline decoration-white/80 underline-offset-4">
                    {formatFromFCFA(vehicle.price)}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap gap-3">
                  <ButtonLink
                    href={`/quote?vehicle=${vehicle.slug}`}
                    tone="blue"
                    className="min-w-[132px]"
                  >
                    Order Now
                  </ButtonLink>
                  <ButtonLink
                    href={`/vehicles/${vehicle.slug}`}
                    tone="light"
                    className="min-w-[132px]"
                  >
                    Learn More
                  </ButtonLink>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="absolute left-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-md bg-white/90 text-[#171a20] shadow disabled:opacity-40"
          aria-label="Previous model"
          disabled={index === 0}
          onClick={() => go(index - 1)}
        >
          <Chevron dir="left" />
        </button>
        <button
          type="button"
          className="absolute right-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-md bg-white/90 text-[#171a20] shadow disabled:opacity-40"
          aria-label="Next model"
          disabled={index === vehicles.length - 1}
          onClick={() => go(index + 1)}
        >
          <Chevron dir="right" />
        </button>
      </div>
    </section>
  );
}
