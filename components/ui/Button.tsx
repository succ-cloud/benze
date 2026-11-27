import Link from "next/link";
import type { ComponentProps } from "react";

const tones = {
  blue: "bg-tesla text-white hover:bg-[#345dcc]",
  white: "bg-white text-[#171a20] hover:bg-white/90",
  black: "bg-[#171a20] text-white hover:bg-black",
  light:
    "bg-white text-[#171a20] shadow-[0_2px_4px_rgba(0,0,0,0.16)] hover:bg-[#f4f4f4]",
} as const;

type ButtonLinkProps = ComponentProps<typeof Link> & {
  tone?: keyof typeof tones;
};

export function ButtonLink({
  tone = "blue",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={`inline-flex h-10 min-w-[168px] items-center justify-center rounded-[4px] px-5 text-sm font-medium transition-colors ${tones[tone]} ${className}`}
    />
  );
}
