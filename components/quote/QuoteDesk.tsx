"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getVehicle } from "@/data/vehicles";
import { formatFCFA } from "@/lib/format";
import { useQuote } from "@/components/quote/QuoteProvider";
import { gsap, useGSAP } from "@/lib/gsap";
import Link from "next/link";

export function QuoteDesk() {
  const params = useSearchParams();
  const { slugs, add, remove, clear, ready } = useQuote();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [port, setPort] = useState("");
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState<string | null>(null);
  const [savedText, setSavedText] = useState("");
  const [copied, setCopied] = useState(false);

  const vehicle = params.get("vehicle");
  const intent = params.get("intent");

  useEffect(() => {
    if (vehicle) add(vehicle);
  }, [vehicle, add]);

  const selected = useMemo(
    () => slugs.map((slug) => getVehicle(slug)).filter((item) => item != null),
    [slugs],
  );

  useGSAP(() => {
    gsap.from("[data-quote-block]", {
      y: 16,
      autoAlpha: 0,
      duration: 0.5,
      stagger: 0.06,
      ease: "power2.out",
    });
  });

  if (reference) {
    return (
      <div className="mx-auto max-w-2xl px-6 pb-20 pt-24">
        <p className="text-sm text-[#5c5e62]">Request saved on this device</p>
        <h1 className="mt-2 text-4xl font-medium">Reference {reference}</h1>
        <p className="mt-4 text-sm leading-6 text-[#393c41]">
          Mail delivery is not connected yet. Copy the request and send it from your own mailbox, or keep it here until the desk is wired up.
        </p>
        <pre className="mt-6 whitespace-pre-wrap rounded-2xl bg-[#f4f4f4] p-5 text-sm">{savedText}</pre>
        <button
          type="button"
          className="mt-4 h-10 rounded-[4px] bg-[#171a20] px-5 text-sm font-medium text-white"
          onClick={async () => {
            await navigator.clipboard.writeText(savedText);
            setCopied(true);
          }}
        >
          {copied ? "Copied" : "Copy request"}
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-20 pt-24 lg:grid-cols-[0.9fr_1.1fr]">
      <section data-quote-block>
        <p className="text-sm text-[#5c5e62]">
          {intent === "demo" ? "Schedule a demo" : "Quote in FCFA"}
        </p>
        <h1 className="mt-2 text-4xl font-medium tracking-tight">Your cars</h1>
        <p className="mt-3 text-sm leading-6 text-[#393c41]">
          Prices are in FCFA at the Douala showroom. Delivery to other cities in Cameroon is confirmed with the quote.
        </p>
        {!ready ? (
          <p className="mt-8 text-sm">Loading your list…</p>
        ) : selected.length === 0 ? (
          <p className="mt-8 text-sm">
            No cars yet.{" "}
            <Link href="/shop" className="underline">
              Browse the Mercedes inventory.
            </Link>
          </p>
        ) : (
          <ul className="mt-6 divide-y divide-neutral-200">
            {selected.map((item) => (
              <li key={item.slug} className="flex items-start justify-between gap-4 py-4">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-[#5c5e62]">ref : {item.ref}</p>
                  <p className="text-sm">{item.price != null ? formatFCFA(item.price) : "Price on request"}</p>
                </div>
                <button type="button" className="text-sm underline" onClick={() => remove(item.slug)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <form
        data-quote-block
        className="rounded-2xl bg-[#f4f4f4] p-6 md:p-8"
        onSubmit={(event) => {
          event.preventDefault();
          if (!name.trim() || !email.includes("@") || selected.length === 0) return;
          const ref = `SZ-${Math.floor(1000 + Math.random() * 9000)}`;
          const text = [
            `Spainzy of Douala quote ${ref}`,
            intent === "demo" ? "Request: schedule a demo" : "Request: purchase in Cameroon",
            `${name} · ${email} · ${phone}`,
            `City: ${country}`,
            `Delivery: ${port}`,
            message,
            ...selected.map((item) =>
              `${item.name} (ref ${item.ref})${item.price != null ? ` · ${formatFCFA(item.price)}` : ""}`,
            ),
          ]
            .filter(Boolean)
            .join("\n");
          localStorage.setItem(
            "benze-last-quote",
            JSON.stringify({ ref, name, email, phone, country, port, message, intent, slugs, text }),
          );
          setSavedText(text);
          setReference(ref);
          clear();
        }}
      >
        <h2 className="text-2xl font-medium">Request</h2>
        <div className="mt-5 grid gap-3">
          <input required placeholder="Full name" value={name} onChange={(event) => setName(event.target.value)} className="h-11 rounded border border-neutral-300 bg-white px-3 text-sm" />
          <input required type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} className="h-11 rounded border border-neutral-300 bg-white px-3 text-sm" />
          <input placeholder="Phone" value={phone} onChange={(event) => setPhone(event.target.value)} className="h-11 rounded border border-neutral-300 bg-white px-3 text-sm" />
          <input placeholder="Cameroon" value={country} onChange={(event) => setCountry(event.target.value)} className="h-11 rounded border border-neutral-300 bg-white px-3 text-sm" />
          <input placeholder="Delivery city" value={port} onChange={(event) => setPort(event.target.value)} className="h-11 rounded border border-neutral-300 bg-white px-3 text-sm" />
          <textarea placeholder="Notes" value={message} onChange={(event) => setMessage(event.target.value)} rows={4} className="rounded border border-neutral-300 bg-white px-3 py-2 text-sm" />
        </div>
        <button
          type="submit"
          disabled={selected.length === 0}
          className="mt-5 h-10 w-full rounded-[4px] bg-[#171a20] text-sm font-medium text-white disabled:opacity-40"
        >
          Save quote request
        </button>
      </form>
    </div>
  );
}
