import type { EyebrowOption } from "@/lib/types";

const eyebrowPaths: Record<EyebrowOption, React.ReactNode> = {
  default: (
    <>
      <path d="M120 100 Q150 90 180 100" stroke="black" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M220 100 Q250 90 280 100" stroke="black" strokeWidth="8" fill="none" strokeLinecap="round" />
    </>
  ),
  raised: (
    <>
      <path d="M120 100 Q150 70 180 100" stroke="black" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M220 100 Q250 70 280 100" stroke="black" strokeWidth="8" fill="none" strokeLinecap="round" />
    </>
  ),
  furrowed: (
    <>
      <path d="M120 100 Q150 110 180 90" stroke="black" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M220 90 Q250 110 280 100" stroke="black" strokeWidth="8" fill="none" strokeLinecap="round" />
    </>
  ),
};

export function Eyebrows({ type }: { type: EyebrowOption }) {
  return eyebrowPaths[type] || eyebrowPaths.default;
}
