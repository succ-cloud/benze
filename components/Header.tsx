"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { inStockVehicles } from "@/data/vehicles";
import { formatFromFCFA } from "@/lib/format";
import { gsap, useGSAP } from "@/lib/gsap";
import { useQuote } from "@/components/quote/QuoteProvider";
import {
  Chevron,
  IconClose,
  IconGlobe,
  IconHelp,
  IconMenu,
  IconUser,
} from "@/components/icons";

const links = [
  { href: "/amg", label: "AMG" },
  { href: "/maybach", label: "Maybach" },
  { href: "/4x4", label: "4x4" },
  { href: "/discover", label: "Discover" },
  { href: "/shop", label: "Shop" },
];

export function Header() {
  const { slugs } = useQuote();
  const [panel, setPanel] = useState<"vehicles" | "help" | "lang" | null>(null);
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const vehicles = inStockVehicles();

  const clearTimer = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };

  const scheduleClose = () => {
    clearTimer();
    closeTimer.current = window.setTimeout(() => setPanel(null), 160);
  };

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  useGSAP(() => {
    if (!mobile) return;
    gsap.from("[data-mobile-link]", {
      y: 18,
      autoAlpha: 0,
      duration: 0.45,
      stagger: 0.05,
      ease: "power2.out",
    });
  }, [mobile]);

  useGSAP(() => {
    if (panel !== "vehicles" || !menuRef.current) return;
    gsap.fromTo(
      menuRef.current,
      { y: -10, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.35, ease: "power2.out" },
    );
  }, { dependencies: [panel] });

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      onMouseEnter={clearTimer}
      onMouseLeave={scheduleClose}
    >
      <div className="relative flex h-14 items-center px-4 md:px-8">
        <Link
          href="/"
          className="relative z-10 rounded-md bg-white px-3 py-1.5 leading-none text-[#171a20] shadow-[0_1px_4px_rgba(0,0,0,0.12)]"
          aria-label="Spainzy of Douala home"
        >
          <span className="block text-[15px] font-semibold tracking-tight">Spainzy</span>
          <span className="mt-0.5 block text-[10px] font-medium tracking-[0.14em] text-[#393c41]">
            of Douala
          </span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center rounded-[4px] bg-[#f4f4f4]/90 px-1.5 py-1 backdrop-blur-md lg:flex">
          <button
            type="button"
            className="rounded px-3 py-1.5 text-sm font-medium text-[#171a20] hover:bg-white"
            aria-expanded={panel === "vehicles"}
            onMouseEnter={() => setPanel("vehicles")}
            onFocus={() => setPanel("vehicles")}
            onClick={() => setPanel((current) => (current === "vehicles" ? null : "vehicles"))}
          >
            Vehicles
          </button>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded px-3 py-1.5 text-sm font-medium text-[#171a20] hover:bg-white"
              onMouseEnter={() => setPanel(null)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            className="hidden h-8 w-8 place-items-center rounded-full hover:bg-black/5 sm:grid"
            aria-label="Help"
            onClick={() => setPanel((current) => (current === "help" ? null : "help"))}
          >
            <IconHelp />
          </button>
          <button
            type="button"
            className="hidden h-8 w-8 place-items-center rounded-full hover:bg-black/5 sm:grid"
            aria-label="Language"
            onClick={() => setPanel((current) => (current === "lang" ? null : "lang"))}
          >
            <IconGlobe />
          </button>
          <Link
            href="/quote"
            className="relative grid h-8 w-8 place-items-center rounded-full hover:bg-black/5"
            aria-label="Your quote"
          >
            <IconUser />
            {slugs.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-tesla px-1 text-[10px] font-medium text-white">
                {slugs.length}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-full hover:bg-black/5 lg:hidden"
            aria-label={mobile ? "Close menu" : "Open menu"}
            onClick={() => {
              setMobile((open) => !open);
              setPanel(null);
            }}
          >
            {mobile ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {panel === "vehicles" && (
        <div ref={menuRef} className="hidden border-t border-black/5 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.08)] lg:block">
          <div className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-8 py-6">
            {vehicles.map((vehicle) => (
              <Link
                key={vehicle.slug}
                href={`/vehicles/${vehicle.slug}`}
                className="w-44 shrink-0"
                onClick={() => setPanel(null)}
              >
                <div className="relative h-28 overflow-hidden rounded-md bg-[#f4f4f4]">
                  <Image
                    src={vehicle.images[0]}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="176px"
                  />
                </div>
                <p className="mt-3 text-center text-sm font-medium">{vehicle.shortName}</p>
                {vehicle.price != null && (
                  <p className="text-center text-xs text-[#5c5e62]">{formatFromFCFA(vehicle.price)}</p>
                )}
              </Link>
            ))}
          </div>
          <div className="flex justify-center gap-8 border-t border-black/5 py-4 text-sm font-medium">
            <Link href="/shop" onClick={() => setPanel(null)} className="hover:underline">
              Inventory
            </Link>
            <Link href="/quote" onClick={() => setPanel(null)} className="hover:underline">
              Request a quote
            </Link>
          </div>
        </div>
      )}

      {panel === "help" && (
        <div className="absolute right-4 top-14 z-50 w-[320px] rounded-xl bg-white p-5 text-sm shadow-[0_12px_40px_rgba(0,0,0,0.14)] sm:right-8">
          <p className="text-base font-medium">Export desk</p>
          <p className="mt-2 text-[#393c41]">
            Tell us the car and the city in Cameroon. Quotes are prepared from the Douala showroom.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <Link href="/quote" className="font-medium underline" onClick={() => setPanel(null)}>
              Request a quote
            </Link>
            <Link href="/shop" className="font-medium underline" onClick={() => setPanel(null)}>
              Browse stock
            </Link>
          </div>
        </div>
      )}

      {panel === "lang" && (
        <div className="absolute right-16 top-14 z-50 w-44 rounded-xl bg-white p-2 text-sm shadow-[0_12px_40px_rgba(0,0,0,0.14)]">
          <p className="rounded-md bg-[#f4f4f4] px-3 py-2 font-medium">English</p>
        </div>
      )}

      {mobile && (
        <div className="fixed inset-0 top-14 z-40 overflow-y-auto bg-white lg:hidden">
          <nav className="flex flex-col px-6 py-6">
            <Link
              href="/shop"
              data-mobile-link
              className="border-b border-black/10 py-4 text-[22px] font-medium"
              onClick={() => setMobile(false)}
            >
              Vehicles
            </Link>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-mobile-link
                className="flex items-center justify-between border-b border-black/10 py-4 text-[22px] font-medium"
                onClick={() => setMobile(false)}
              >
                {link.label}
                <Chevron dir="right" className="h-5 w-5 text-[#5c5e62]" />
              </Link>
            ))}
            <Link
              href="/quote"
              data-mobile-link
              className="py-4 text-[22px] font-medium"
              onClick={() => setMobile(false)}
            >
              Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
