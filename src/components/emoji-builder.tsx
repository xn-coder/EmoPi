'use client'

import { EmojiPreview } from './emoji-preview';
import type { Frame } from '@/lib/types';

type EmojiBuilderProps = {
  activeFrame: Frame;
  isAnimating?: boolean;
};

export default function EmojiBuilder({ activeFrame, isAnimating = false }: EmojiBuilderProps) {
  return (
    <div className="flex items-center justify-center">
        <div className="relative w-full max-w-xs aspect-square flex items-center justify-center">
          <EmojiPreview frame={activeFrame} isAnimating={isAnimating}/>
        </div>
    </div>
  );
}
