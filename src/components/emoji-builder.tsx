'use client'

import { EmojiPreview } from './emoji-preview';
import { FeatureSelector } from './feature-selector';
import type { Frame, EyeOption, MouthOption, EyebrowOption } from '@/lib/types';
import { Card } from './ui/card';

type EmojiBuilderProps = {
  activeFrame: Frame;
  onFeatureChange: (feature: 'eyes' | 'mouth' | 'eyebrows', value: EyeOption | MouthOption | EyebrowOption) => void;
};

export default function EmojiBuilder({ activeFrame, onFeatureChange }: EmojiBuilderProps) {
  return (
    <div className="w-full flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-1">
        <FeatureSelector activeFeatures={activeFrame.facialFeatures} onFeatureChange={onFeatureChange} />
      </div>
      <div className="lg:col-span-2 w-full flex items-center justify-center">
          <Card className="relative w-full max-w-md aspect-square flex items-center justify-center bg-accent/20">
            <EmojiPreview frame={activeFrame} />
          </Card>
      </div>
    </div>
  );
}
