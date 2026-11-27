import type { Metadata } from "next";
import { StoryPage } from "@/components/editorial/StoryPage";
import { formatFCFA } from "@/lib/format";
import { getVehicle, vehicles } from "@/data/vehicles";

export const metadata: Metadata = { title: "AMG" };

export default function AmgPage() {
  const gle63 = getVehicle("gle-63-s-amg");
  const gle53 = getVehicle("gle-53-amg");
  const g63 = getVehicle("g-63-amg");

  return (
    <StoryPage
      title="AMG"
      subtitle="Affalterbach, in stock in Douala."
      image="/images/amg-gt-red.jpg"
      imageAlt="Red Mercedes-AMG GT on a forest road"
      primary={{ label: "Shop AMG", href: "/shop?line=amg" }}
      secondary={{ label: "GLE 63 S", href: "/vehicles/gle-63-s-amg" }}
      vehicles={vehicles.filter((vehicle) => vehicle.line === "amg")}
      paragraphs={[
        "Mercedes-AMG began in 1967 in Affalterbach. Hans Werner Aufrecht and Erhard Melcher built the workshop; the name is their initials plus Großaspach, Aufrecht’s birthplace. AMG engines are still assembled one at a time, and the builder signs the engine plate.",
        "The cars in Douala are the GLE 63 S Coupé, the GLE 53, and the G 63. All three are mild-hybrid petrol, automatic, and left-hand drive. The photographs are Mercedes-AMG GTs, including the grille, the plate, and the wheels.",
      ]}
      facts={[
        {
          label: "GLE 63 S Coupé",
          value: gle63?.price ? `${formatFCFA(gle63.price)} · 612 hp · 0–100 in 3.8 s` : "612 hp",
        },
        {
          label: "GLE 53 Coupé",
          value: gle53?.price ? `${formatFCFA(gle53.price)} · 435 hp · 0–100 in 5.3 s` : "435 hp",
        },
        {
          label: "G 63",
          value: g63?.price ? `${formatFCFA(g63.price)} · 585 hp · 0–100 in 4.4 s` : "585 hp",
        },
      ]}
      gallery={[
        { src: "/images/amg-gt-red.jpg", alt: "Mercedes-AMG GT, with the AMG wheel and red caliper" },
        { src: "/images/amg-gt-front.jpg", alt: "Mercedes-AMG grille and AMG plate on an AMG GT" },
        { src: "/images/amg-gt-dark.jpg", alt: "Matte black Mercedes-AMG GT" },
      ]}
      buying={[
        "Prices are the Douala showroom prices in FCFA. The written quote states what is included. Insurance and registration are settled before you pay, and they are not assumed to be inside the figure.",
        "These engines are specified for premium unleaded. The GLE 53 product sheet calls for RON 95 or higher. The G 63 is rated on Super Plus. Regular petrol is the wrong fuel.",
        "On the manufacturer’s combined cycle, the GLE 63 S Coupé is about 11.5 l/100 km, the GLE 53 Coupé about 9.3 l/100 km, and the current G 63 about 14.7 l/100 km. Douala traffic uses more.",
        "The GLE 63 S Coupé’s published tyres are 285/40 R22 at the front and 325/35 R22 at the rear. Budget for that staggered size.",
        "See the car in Douala and match it to the reference: 3657 for the GLE 63 S, 3643 for the GLE 53, 3284 for the G 63. Horsepower figures are Mercedes-AMG’s for the model, not a dyno result for that chassis. A quote on this site is a request until Spainzy of Douala confirms it in writing.",
      ]}
    />
  );
}
