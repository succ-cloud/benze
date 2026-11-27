import Link from "next/link";

const links = [
  { href: "/shop", label: "Vehicles" },
  { href: "/amg", label: "AMG" },
  { href: "/maybach", label: "Maybach" },
  { href: "/4x4", label: "4x4" },
  { href: "/discover", label: "Discover" },
  { href: "/quote", label: "Quote" },
];

export function Footer() {
  return (
    <footer className="bg-white px-6 py-8 text-center text-xs text-[#5c5e62]">
      <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-[#171a20]">
            {link.label}
          </Link>
        ))}
      </nav>
      <p className="mt-4">Spainzy of Douala · Mercedes-Benz in Cameroon</p>
      <p className="mt-2">
        Photography: Unsplash, Pexels, and Wikimedia Commons contributors (CC BY-SA 4.0).
      </p>
    </footer>
  );
}
