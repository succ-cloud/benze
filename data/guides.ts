export type ModelGuide = {
  /** Photographs safe to show on this model's own page. */
  pageImages?: string[];
  /** Shown when the photograph is AMG or Maybach, but not this exact chassis. */
  imageNote?: string;
  /** What a buyer should know before paying. */
  know: string[];
};

const showroom = [
  "The figure on this page is the Douala showroom price in FCFA. The written quote is what states what that price includes.",
  "Insurance and registration in your name are agreed before you pay. They are not assumed to be inside the figure.",
  "Every car here is left-hand drive, which is the correct layout for Cameroon.",
  "See the car at the Douala showroom and match it to the reference number. A quote started on this site is a request until Spainzy of Douala confirms it in writing.",
  "Manufacturer performance and consumption figures describe the model. Year, mileage, and options on the car in the yard are confirmed on the quote.",
];

export const guides: Record<string, ModelGuide> = {
  "gle-63-s-amg": {
    know: [
      ...showroom,
      "Mercedes-AMG rates the GLE 63 S 4MATIC+ Coupé at 612 hp from the 4.0-litre V8, plus 22 hp from the EQ Boost starter-alternator, 850 Nm, and 0–100 km/h in 3.8 seconds. Top speed is 280 km/h, electronically limited.",
      "It uses AMG Performance 4MATIC+ and the AMG SPEEDSHIFT TCT 9-speed automatic. The published tyre size is 285/40 R22 at the front and 325/35 R22 at the rear, so replacements are staggered and not a normal passenger-car tyre.",
      "Fuel is premium unleaded. Mercedes-Benz published combined consumption of 11.5 l/100 km for this coupé. Douala traffic will use more. The tank is 85 litres.",
      "Reference 3657 is the car in stock, at 85 602 389 FCFA.",
    ],
  },
  "gle-53-amg": {
    pageImages: ["/images/gle-coupe.jpg"],
    imageNote:
      "The photograph is a Mercedes-AMG GLE 63 S Coupé, the same AMG coupé body. This listing is the GLE 53, reference 3643. You see that car in Douala.",
    know: [
      ...showroom,
      "Mercedes-AMG rates the GLE 53 4MATIC+ Coupé at 435 hp and 520 Nm from the 3.0-litre inline-six, plus 22 hp and 250 Nm from EQ Boost. 0–100 km/h is 5.3 seconds, and top speed is 250 km/h.",
      "Drive is AMG Performance 4MATIC+. The gearbox is the AMG SPEEDSHIFT TCT 9-speed. The product sheet specifies unleaded petrol of RON 95 or higher.",
      "Published combined consumption is 9.3 l/100 km, with an 85-litre tank. City driving in Douala will sit above that.",
      "Reference 3643 is the car in stock, at 88 488 600 FCFA.",
    ],
  },
  "g-63-amg": {
    know: [
      ...showroom,
      "The current Mercedes-AMG G 63 uses a 4.0-litre biturbo V8 with 585 hp and 850 Nm, plus up to 20 hp and 200 Nm from the 48-volt starter-generator. Mercedes-Benz lists 0–100 km/h in 4.4 seconds.",
      "Three differential locks, each able to lock fully, can be selected individually. The gearbox is the AMG SPEEDSHIFT TCT 9-speed. The body still sits on a ladder frame, with low range.",
      "Mercedes-Benz Switzerland rates it on Super Plus, at about 14.7 l/100 km combined. Budget for premium petrol, and for tyres and brakes that match a 585 hp G-Class.",
      "Reference 3284 is the car in stock, at 156 773 723 FCFA.",
    ],
  },
  "gle-63-amg-coupe": {
    know: [
      ...showroom,
      "This is an earlier GLE 63 AMG Coupé, not the S model that is in stock. Mercedes-AMG rated that car at 571 hp, with the same 4.0-litre V8 layout and 4MATIC+.",
      "It is out of stock. Ask for reference 3413 only if you want to be told when another one is in Douala. The in-stock S model is reference 3657.",
      "Premium unleaded only. Confirm year and mileage before any deposit.",
    ],
  },
  "gle-63-mild": {
    pageImages: ["/images/gle-coupe.jpg"],
    imageNote:
      "The photograph is a Mercedes-AMG GLE 63 S Coupé. This listing is the GLE 63 mild hybrid, reference 2937, which is out of stock.",
    know: [
      ...showroom,
      "A 4.0-litre V8 mild hybrid with 4MATIC and an automatic gearbox. It is out of stock, so there is no Douala price until a car is allocated.",
      "Treat it as a premium-unleaded AMG. Reference 2937 is the one to ask for.",
    ],
  },
  "gle-53-plus": {
    pageImages: ["/images/gle-coupe.jpg"],
    imageNote:
      "The photograph is a Mercedes-AMG GLE 63 S Coupé. This listing is the GLE 53 Coupé, reference 2575, which is out of stock.",
    know: [
      ...showroom,
      "The GLE 53 uses the 3.0-litre mild-hybrid inline-six, rated at 435 hp plus EQ Boost, with 4MATIC+.",
      "This reference is out of stock. The GLE 53 that is in Douala is reference 3643.",
    ],
  },
  "g-63-petrol": {
    know: [
      ...showroom,
      "An earlier G 63 with the 4.0-litre petrol V8, before the current 48-volt car. Same ladder frame and three differential locks.",
      "It is out of stock. The G 63 in Douala is reference 3284.",
    ],
  },
  "gls-680-maybach": {
    know: [
      ...showroom,
      "Mercedes-Benz rates the Maybach GLS 680 at 603 hp and 850 Nm from a 4.0-litre biturbo V8, with up to 23 hp from the 48-volt starter-generator. 0–100 km/h is 4.4 seconds. The gearbox is the 9G-TRONIC, and drive is 4MATIC.",
      "It takes premium unleaded. The point of the car is the second row: executive seating, a Maybach drive mode, and air suspension. Confirm whether the car in the yard is four seats or five.",
      "Reference 3618 is the facelift in stock, at 150 870 110 FCFA.",
    ],
  },
  "gls-600-maybach": {
    know: [
      ...showroom,
      "The previous Maybach GLS 600 is a 4.0-litre V8 with 558 hp and 730 Nm, plus 22 hp from EQ Boost. Mercedes-Benz published 0–100 km/h in 4.9 seconds, a 9G-TRONIC gearbox, and 4MATIC.",
      "It is out of stock. The Maybach GLS in Douala now is the GLS 680, reference 3618.",
      "Premium unleaded. Rear-seat specification, including whether E-ACTIVE BODY CONTROL is fitted, has to be read off the car rather than assumed.",
    ],
  },
  "s-480-maybach": {
    know: [
      ...showroom,
      "The Maybach S 480 4MATIC uses a 3.0-litre inline-six with 367 hp and 500 Nm, plus EQ Boost, a 9-speed automatic, and 4MATIC. Published 0–100 km/h is 5.8 seconds. Fuel grade on the Chinese specification is RON 95.",
      "It is a long-wheelbase Maybach sedan, built around the rear seats. It is out of stock, and it was specified for a non-EU market, so equipment can differ from a European S 580 or S 680.",
      "Reference 3295. There is no Douala price until a car is here.",
    ],
  },
  "gla-200d": {
    know: [
      ...showroom,
      "Mercedes-Benz rates the GLA 200 d at 150 hp and 320 Nm from a 2.0-litre diesel, with the 8-speed 8G-DCT dual-clutch automatic. 0–100 km/h is 8.8 seconds. Combined WLTP consumption is about 5.4 l/100 km.",
      "The standard GLA 200 d is front-wheel drive, uses diesel, and needs AdBlue. The listing name does not say 4MATIC, so confirm drive layout on the car rather than assuming all-wheel drive.",
      "The tank is 43 litres. Reference 3647 is in stock at 28 796 512 FCFA.",
    ],
  },
  "glc-300": {
    know: [
      ...showroom,
      "Mercedes-Benz rates the GLC 300 4MATIC at 258 hp and 400 Nm from a 2.0-litre petrol four, plus 23 hp and up to 200 Nm from the 48-volt starter-alternator. 0–100 km/h is 6.2 seconds. The gearbox is the 9G-TRONIC.",
      "It is out of stock, so the price is on request. It takes premium unleaded. The published tank is 62 litres.",
      "Reference 3090.",
    ],
  },
  "glc-300-coupe": {
    know: [
      ...showroom,
      "The GLC 300 4MATIC Coupé uses the same 2.0-litre mild-hybrid petrol engine, 258 hp plus 23 hp, 400 Nm, 9G-TRONIC, and 4MATIC. Mercedes-Benz in Brazil lists 0–100 km/h in 6.3 seconds for the coupé.",
      "It is out of stock. Premium unleaded. Reference 3335.",
    ],
  },
};

export function guideFor(slug: string) {
  return guides[slug];
}
