import type { Frame } from '@/lib/types';
import { BaseFace } from '@/components/icons/base-face';
import { Eyes } from '@/components/icons/eyes';
import { Mouth } from '@/components/icons/mouth';
import { Eyebrows } from '@/components/icons/eyebrows';

export function EmojiPreview({ frame, size = 400 }: { frame: Frame; size?: number }) {
  const effectiveSize = Math.min(size, 400);

  return (
    <div className="relative transition-transform duration-300 ease-in-out hover:scale-105" style={{ width: effectiveSize, height: effectiveSize }}>
      <svg viewBox="0 0 400 400" width="100%" height="100%" aria-label="Emoji preview">
        <g>
          <BaseFace />
          <Eyes type={frame.facialFeatures.eyes} />
          <Mouth type={frame.facialFeatures.mouth} />
          <Eyebrows type={frame.facialFeatures.eyebrows} />
        </g>
      </svg>
    </div>
  );
}
