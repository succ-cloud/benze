import type { Metadata } from "next";
import { StoryPage } from "@/components/editorial/StoryPage";

export const metadata: Metadata = { title: "AMG" };

export default function AmgPage() {
  return (
    <StoryPage
      title="AMG"
      subtitle="Hand-built in Affalterbach."
      image="/images/amg-gt-red.jpg"
      imageAlt="Red Mercedes-AMG GT on a forest road"
      primary={{ label: "Shop AMG", href: "/shop?line=amg" }}
      secondary={{ label: "Request a quote", href: "/quote" }}
      vehicles={[]}
      paragraphs={[
        "Mercedes-AMG began in 1967 in Affalterbach. Hans Werner Aufrecht and Erhard Melcher built the workshop; the name is their initials plus Großaspach, Aufrecht’s birthplace.",
        "Engines are still assembled one at a time, and the builder signs the engine plate. The photographs on this page are Mercedes-AMG GTs: the car, the grille, and the wheels.",
      ]}
      facts={[
        { label: "Founded", value: "1967, Affalterbach" },
        { label: "Engines", value: "One builder, one engine, signed plate" },
        { label: "On this page", value: "Mercedes-AMG GT" },
      ]}
      gallery={[
        { src: "/images/amg-gt-red.jpg", alt: "Mercedes-AMG GT, with the AMG wheel and red caliper" },
        { src: "/images/amg-gt-front.jpg", alt: "Mercedes-AMG grille and AMG plate on an AMG GT" },
        { src: "/images/amg-gt-dark.jpg", alt: "Matte black Mercedes-AMG GT" },
      ]}
      buying={[
        "A price on Spainzy of Douala is the showroom figure in FCFA. The written quote states what that figure includes. Insurance and registration are agreed before you pay.",
        "AMG petrol engines are specified for premium unleaded. Regular petrol is the wrong fuel.",
        "See the car in Douala before you commit. A quote started on this site is a request until Spainzy of Douala confirms it in writing.",
      ]}
    />
  );
}
