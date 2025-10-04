import type { MouthOption } from "@/lib/types";

const mouthPaths: Record<MouthOption, React.ReactNode> = {
  smile: (
    <path d="M150 250 Q200 310 250 250" stroke="black" strokeWidth="5" fill="none" strokeLinecap="round" />
  ),
  sad: (
    <path d="M150 280 Q200 240 250 280" stroke="black" strokeWidth="5" fill="none" strokeLinecap="round" />
  ),
  open: (
    <ellipse cx="200" cy="270" rx="40" ry="25" fill="#6B4A2F" stroke="black" strokeWidth="5" />
  ),
  neutral: (
    <path d="M160 270 H240" stroke="black" strokeWidth="5" fill="none" strokeLinecap="round" />
  ),
};

export function Mouth({ type }: { type: MouthOption }) {
  return mouthPaths[type] || mouthPaths.smile;
}
