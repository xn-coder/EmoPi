import { useState, useEffect } from 'react';
import type { Frame } from '@/lib/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function EmojiPreview({ frame, size = 400, isAnimating = false }: { frame: Frame; size?: number; isAnimating?: boolean }) {
  const effectiveSize = Math.min(size, 400);
  const { emojiName } = frame;
  const trimmedEmojiName = emojiName.trim();
  const newImageSrc = `/emojis/${trimmedEmojiName}.webp`;

  const [currentImage, setCurrentImage] = useState(newImageSrc);
  const [previousImage, setPreviousImage] = useState<string | null>(null);

  useEffect(() => {
    if (newImageSrc !== currentImage) {
      setPreviousImage(currentImage);
      setCurrentImage(newImageSrc);
      const timer = setTimeout(() => setPreviousImage(null), 300); // Duration of animation
      return () => clearTimeout(timer);
    }
  }, [newImageSrc, currentImage]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`Failed to load emoji image: ${e.currentTarget.src}`);
    e.currentTarget.src = '/emojis/Neutral Face.webp';
  };

  return (
    <div className={cn("relative transition-transform duration-300 ease-in-out", isAnimating ? 'scale-105' : 'hover:scale-105')} style={{ width: effectiveSize, height: effectiveSize }}>
      {previousImage && (
        <Image 
          key={previousImage}
          src={previousImage} 
          alt=""
          width={effectiveSize}
          height={effectiveSize}
          unoptimized
          className="absolute inset-0 animate-emoji-out"
          aria-hidden="true"
        />
      )}
      <Image 
        key={currentImage}
        src={currentImage} 
        alt={`Emoji reaction: ${trimmedEmojiName}`}
        width={effectiveSize}
        height={effectiveSize}
        unoptimized
        onError={handleError}
        className={cn("animate-emoji-in", isAnimating ? 'scale-105' : '')}
      />
    </div>
  );
}
