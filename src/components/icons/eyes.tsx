import type { EyeOption } from "@/lib/types";

const eyePaths: Record<EyeOption, React.ReactNode> = {
  default: (
    <>
      <ellipse cx="140" cy="160" rx="20" ry="28" fill="white" stroke="black" strokeWidth="5" />
      <circle cx="140" cy="162" r="9" fill="black" />
      <ellipse cx="260" cy="160" rx="20" ry="28" fill="white" stroke="black" strokeWidth="5" />
      <circle cx="260" cy="162" r="9" fill="black" />
    </>
  ),
  closed: (
    <>
      <path d="M120 160 Q140 170 160 160" stroke="black" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M240 160 Q260 170 280 160" stroke="black" strokeWidth="5" fill="none" strokeLinecap="round" />
    </>
  ),
  wink: (
    <>
      <ellipse cx="140" cy="160" rx="20" ry="28" fill="white" stroke="black" strokeWidth="5" />
      <circle cx="140" cy="162" r="9" fill="black" />
      <path d="M240 160 Q260 170 280 160" stroke="black" strokeWidth="5" fill="none" strokeLinecap="round" />
    </>
  ),
  surprised: (
    <>
      <ellipse cx="140" cy="160" rx="28" ry="38" fill="white" stroke="black" strokeWidth="5" />
      <circle cx="140" cy="160" r="12" fill="black" />
      <ellipse cx="260" cy="160" rx="28" ry="38" fill="white" stroke="black" strokeWidth="5" />
      <circle cx="260" cy="160" r="12" fill="black" />
    </>
  ),
};

export function Eyes({ type }: { type: EyeOption }) {
  return eyePaths[type] || eyePaths.default;
}
