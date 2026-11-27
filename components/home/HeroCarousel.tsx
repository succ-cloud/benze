"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { heroSlides } from "@/data/home";
import { gsap, useGSAP } from "@/lib/gsap";
import { ButtonLink } from "@/components/ui/Button";
import { Chevron } from "@/components/icons";

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const paused = useRef(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const slide = heroSlides[index];

  const go = (next: number) => {
    const count = heroSlides.length;
    setIndex((next + count) % count);
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!paused.current) go(index + 1);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [index]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (event.key === "ArrowRight") go(index + 1);
      if (event.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    heroSlides.forEach((item, itemIndex) => {
      const frame = document.querySelector<HTMLElement>(`[data-hero-frame="${item.id}"]`);
      const photo = frame?.querySelector("img, video");
      if (!frame) return;
      gsap.to(frame, {
        autoAlpha: itemIndex === index ? 1 : 0,
        duration: reduce ? 0 : 0.8,
        ease: "power2.inOut",
      });
      if (photo && itemIndex === index && !reduce) {
        gsap.fromTo(photo, { scale: 1.08 }, { scale: 1, duration: 7, ease: "none" });
      }
    });

    const targets = [titleRef.current, subRef.current, actionsRef.current];
    if (reduce) {
      gsap.set(targets, { autoAlpha: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      titleRef.current,
      { y: 28, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" },
    );
    gsap.fromTo(
      subRef.current,
      { y: 18, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.6, delay: 0.12, ease: "power3.out" },
    );
    gsap.fromTo(
      actionsRef.current,
      { y: 16, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.55, delay: 0.22, ease: "power3.out" },
    );
  }, { dependencies: [index] });

  return (
    <section
      className="relative h-svh min-h-[640px] w-full overflow-hidden bg-[#111]"
      aria-roledescription="carousel"
      aria-label="Featured Mercedes-Benz"
      onMouseEnter={() => {
        paused.current = true;
      }}
      onMouseLeave={() => {
        paused.current = false;
      }}
    >
      {heroSlides.map((item, itemIndex) => (
        <div
          key={item.id}
          data-hero-frame={item.id}
          className="absolute inset-0"
          style={{ opacity: itemIndex === 0 ? 1 : 0 }}
          aria-hidden={itemIndex !== index}
        >
          {item.video ? (
            <video
              className="h-full w-full object-cover"
              style={{ objectPosition: item.videoPosition ?? "center center" }}
              src={item.video}
              poster={item.image}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : item.photos && item.photos.length > 1 ? (
            <div className="grid h-full w-full grid-cols-2">
              {item.photos.map((photo) => (
                <div key={photo.src} className="relative h-full">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    priority={itemIndex === 0}
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
              ))}
            </div>
          ) : (
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              priority={itemIndex === 0}
              className="object-cover"
              sizes="100vw"
            />
          )}
        </div>
      ))}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.38),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/55 to-transparent" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <h1
          ref={titleRef}
          className="max-w-4xl text-[40px] font-medium leading-[1.12] tracking-tight drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] md:text-[56px]"
        >
          {slide.title}
        </h1>
        <p
          ref={subRef}
          className="mt-2 text-lg font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] md:text-[22px]"
        >
          {slide.subtitle}
        </p>
        <div ref={actionsRef} className="mt-6 flex w-full max-w-md flex-col gap-3 sm:w-auto sm:flex-row">
          <ButtonLink href={slide.primary.href} tone="blue" className="w-full sm:w-auto sm:min-w-[200px]">
            {slide.primary.label}
          </ButtonLink>
          <ButtonLink href={slide.secondary.href} tone="light" className="w-full sm:w-auto sm:min-w-[200px]">
            {slide.secondary.label}
          </ButtonLink>
        </div>
      </div>

      <button
        type="button"
        className="absolute left-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-[#171a20] shadow-sm backdrop-blur hover:bg-white md:left-5"
        aria-label="Previous slide"
        onClick={() => go(index - 1)}
      >
        <Chevron dir="left" />
      </button>
      <button
        type="button"
        className="absolute right-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-[#171a20] shadow-sm backdrop-blur hover:bg-white md:right-5"
        aria-label="Next slide"
        onClick={() => go(index + 1)}
      >
        <Chevron dir="right" />
      </button>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {heroSlides.map((item, itemIndex) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Show ${item.title}`}
            className={`h-2.5 w-2.5 rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.25)] ${itemIndex === index ? "bg-white" : "bg-white/70"}`}
            onClick={() => setIndex(itemIndex)}
          />
        ))}
      </div>
    </section>
  );
}
