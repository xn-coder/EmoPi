import type { Frame } from '@/lib/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function EmojiPreview({ frame, size = 400, isAnimating = false }: { frame: Frame; size?: number; isAnimating?: boolean }) {
  const effectiveSize = Math.min(size, 400);
  const { eyes, mouth, eyebrows } = frame.facialFeatures;
  const emojiImageSrc = `/emojis/${eyes}_${mouth}_${eyebrows}.png`;

  return (
    <div className={cn("relative transition-transform duration-300 ease-in-out", isAnimating ? 'animate-bounce' : 'hover:scale-105')} style={{ width: effectiveSize, height: effectiveSize }}>
      <Image 
        src={emojiImageSrc} 
        alt="Emoji reaction" 
        width={effectiveSize}
        height={effectiveSize}
        unoptimized // Since we are using many dynamic images
        onError={(e) => {
            // Fallback to a default image if a specific combination doesn't exist
            e.currentTarget.src = '/emojis/default_smile_default.png';
        }}
        />
    </div>
  );
}
