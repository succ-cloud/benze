/** White and soft white. Blue is reserved for headings. */
export const tileColors = [
  { backgroundColor: "#ffffff", border: "1px solid #e7e7e7" },
  { backgroundColor: "#f4f4f4", border: "1px solid #f4f4f4" },
] as const;

export function tileStyle(index: number) {
  return tileColors[index % tileColors.length];
}

export const tileMotion =
  "tile-rise rounded-2xl transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(23,26,32,0.16)]";

export function tileDelay(index: number) {
  return { animationDelay: `${index * 70}ms` };
}
