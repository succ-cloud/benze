import type { Metadata } from "next";
import { StoryPage } from "@/components/editorial/StoryPage";
import { formatFCFA } from "@/lib/format";
import { getVehicle, vehicles } from "@/data/vehicles";

export const metadata: Metadata = { title: "4x4" };

export default function FourByFourPage() {
  const g63 = getVehicle("g-63-amg");

  return (
    <StoryPage
      title="G-Class"
      subtitle="Ladder frame, three locks, Douala."
      image="/images/g63-front.jpg"
      imageAlt="Mercedes-AMG G 63, front"
      primary={{ label: "Shop the G-Class", href: "/shop?category=4x4" }}
      secondary={{ label: "Order G 63", href: "/quote?vehicle=g-63-amg" }}
      vehicles={vehicles.filter((vehicle) => vehicle.category === "4x4")}
      paragraphs={[
        "The G-Class has been built on a ladder frame since 1979, with a low-range transfer case and three differential locks that can each lock fully. The locks are selected individually, on the move, in high range or low range.",
        "The car in Douala is the Mercedes-AMG G 63. Its 4.0-litre biturbo V8 is rated at 585 hp and 850 Nm, with up to 20 hp and 200 Nm more from the 48-volt starter-generator. Mercedes-Benz lists 0–100 km/h in 4.4 seconds and the AMG SPEEDSHIFT TCT 9-speed automatic. An earlier petrol G 63 is on the list and out of stock.",
      ]}
      facts={[
        {
          label: "G 63 in Douala",
          value: g63?.price ? `${formatFCFA(g63.price)} · ref ${g63.ref}` : "In stock",
        },
        { label: "Engine", value: "4.0L V8 · 585 hp · 850 Nm · +20 hp hybrid" },
        { label: "Chassis", value: "Ladder frame · 3 locks · low range" },
      ]}
      buying={[
        "The price in Douala is 156 773 723 FCFA for reference 3284. The written quote states what that includes. Insurance and registration are agreed before you pay.",
        "Mercedes-Benz rates this G 63 on Super Plus. Combined consumption on the published cycle is about 14.7 l/100 km. Douala traffic will use more. Regular petrol is the wrong fuel.",
        "Tyres, brakes, and suspension parts for a G 63 are specific to the model. Ask which wheel and tyre size is on the car you are shown, and price a set before you buy.",
        "The three locks and low range are the reason to buy a G-Class over a tall SUV. Confirm they engage on the car in front of you.",
        "An earlier petrol G 63, reference 1730, is out of stock. Performance figures above are Mercedes-AMG’s for the current mild-hybrid G 63. Match the chassis to reference 3284. A quote on this site is a request until Spainzy of Douala confirms it in writing.",
      ]}
    />
  );
}
