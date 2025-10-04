'use client'

import { EmojiPreview } from './emoji-preview';
import type { Frame } from '@/lib/types';
import { Card } from './ui/card';

type EmojiBuilderProps = {
  activeFrame: Frame;
  isAnimating?: boolean;
};

export default function EmojiBuilder({ activeFrame, isAnimating = false }: EmojiBuilderProps) {
  return (
    <div className="w-full flex-grow flex items-center justify-center">
        <Card className="relative w-full max-w-md aspect-square flex items-center justify-center bg-accent/20">
          <EmojiPreview frame={activeFrame} isAnimating={isAnimating}/>
        </Card>
    </div>
  );
}
