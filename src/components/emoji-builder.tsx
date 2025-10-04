'use client'

import { EmojiPreview } from './emoji-preview';
import type { Frame } from '@/lib/types';

type EmojiBuilderProps = {
  activeFrame: Frame;
  isAnimating?: boolean;
};

export default function EmojiBuilder({ activeFrame, isAnimating = false }: EmojiBuilderProps) {
  return (
    <div className="w-full flex-grow flex items-center justify-center">
        <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
          <EmojiPreview frame={activeFrame} isAnimating={isAnimating}/>
        </div>
    </div>
  );
}
