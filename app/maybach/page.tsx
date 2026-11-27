import type { Metadata } from "next";
import { StoryPage } from "@/components/editorial/StoryPage";
import { formatFCFA } from "@/lib/format";
import { getVehicle, vehicles } from "@/data/vehicles";

export const metadata: Metadata = { title: "Maybach" };

export default function MaybachPage() {
  const gls680 = getVehicle("gls-680-maybach");

  return (
    <StoryPage
      title="Maybach"
      subtitle="The second row, in Douala."
      image="/images/gls-1-1.jpg"
      imageAlt="Mercedes-Maybach GLS with the Maybach grille"
      primary={{ label: "Shop Maybach", href: "/shop?line=maybach" }}
      secondary={{ label: "GLS 680", href: "/vehicles/gls-680-maybach" }}
      vehicles={vehicles.filter((vehicle) => vehicle.line === "maybach")}
      paragraphs={[
        "Maybach is the Mercedes-Benz line named for Wilhelm Maybach. On the GLS, the car is built around the rear seats: a dedicated Maybach drive mode, air suspension, and a quieter cabin than the GLS it is based on.",
        "The car in Douala is the GLS 680 facelift. Mercedes-Benz rates that model at 603 hp and 850 Nm from a 4.0-litre biturbo V8, with up to 23 hp from the 48-volt starter-generator, a 9G-TRONIC gearbox, and 4MATIC. Published 0–100 km/h is 4.4 seconds. The GLS 600 and the S 480 Maybach are on the list and out of stock.",
      ]}
      facts={[
        {
          label: "GLS 680 in Douala",
          value: gls680?.price ? `${formatFCFA(gls680.price)} · ref ${gls680.ref}` : "In stock",
        },
        { label: "Engine", value: "4.0L V8 mild hybrid · 603 hp · 850 Nm" },
        { label: "Also listed", value: "GLS 600 and S 480 Maybach, both out of stock" },
      ]}
      gallery={[
        { src: "/images/gls-1-1.jpg", alt: "Mercedes-Maybach GLS, Maybach grille and lettering" },
        { src: "/images/gls-1.jpg", alt: "Mercedes-Maybach GLS on the road" },
        { src: "/images/sclass-1.jpg", alt: "Mercedes-Maybach S-Class, the sedan in the same line" },
      ]}
      buying={[
        "The GLS 680 price in Douala is the showroom figure in FCFA. The written quote states what it includes. Insurance and registration are agreed separately.",
        "It takes premium unleaded. Confirm with the car whether the cabin is four seats or five, and which rear-seat options are actually fitted. Those change the car more than the badge does.",
        "The GLS 600, the model before this one, is rated at 558 hp and 730 Nm, with 0–100 km/h in 4.9 seconds. It is not the car in the yard.",
        "The S 480 Maybach is a long-wheelbase sedan with a 3.0-litre inline-six, 367 hp and 500 Nm, 4MATIC, and 0–100 km/h in 5.8 seconds. It is out of stock, and it was built for a non-EU specification.",
        "See the GLS 680, reference 3618, in Douala before you commit. Manufacturer figures describe the model. A quote on this site is a request until Spainzy of Douala confirms it in writing.",
      ]}
    />
  );
}
