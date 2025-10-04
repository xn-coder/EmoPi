import type { Frame } from '@/lib/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function EmojiPreview({ frame, size = 400, isAnimating = false }: { frame: Frame; size?: number; isAnimating?: boolean }) {
  const effectiveSize = Math.min(size, 400);
  const { emojiName } = frame;
  // Trim whitespace from the emoji name to prevent path errors
  const trimmedEmojiName = emojiName.trim();
  const emojiImageSrc = `/emojis/${trimmedEmojiName}.webp`;

  return (
    <div className={cn("relative transition-transform duration-300 ease-in-out", isAnimating ? 'animate-bounce' : 'hover:scale-105')} style={{ width: effectiveSize, height: effectiveSize }}>
      <Image 
        key={emojiImageSrc}
        src={emojiImageSrc} 
        alt={`Emoji reaction: ${trimmedEmojiName}`}
        width={effectiveSize}
        height={effectiveSize}
        unoptimized // Since we are using many dynamic images
        onError={(e) => {
            // Log the problematic image source to the console for debugging
            console.error(`Failed to load emoji image: ${emojiImageSrc}`);
            // Fallback to a default image if a specific combination doesn't exist
            e.currentTarget.src = '/emojis/Neutral Face.webp';
        }}
        />
    </div>
  );
}
