'use client';

import { useState, useEffect } from 'react';
import type { Frame } from '@/lib/types';
import EmojiBuilder from '@/components/emoji-builder';
import { useToast } from "@/hooks/use-toast";
import emojiData from '@/lib/emojis.json';
import { Button } from '@/components/ui/button';
import { Pause, Shuffle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const initialFrame: Frame = {
  id: 'initial-frame',
  emojiName: 'Neutral Face',
};

// Function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function Home() {
  const [frames, setFrames] = useState<Frame[]>([initialFrame]);
  const [activeFrameId, setActiveFrameId] = useState<string>(initialFrame.id);
  
  const activeFrame = frames.find((frame) => frame.id === activeFrameId) || frames[0];

  // State for random playback
  const [isPlayingRandom, setIsPlayingRandom] = useState(false);
  const [shuffledEmojis, setShuffledEmojis] = useState<string[]>([]);
  const [randomFrameIndex, setRandomFrameIndex] = useState(0);

  // Effect for random playback
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingRandom && shuffledEmojis.length > 0) {
      interval = setInterval(() => {
        setRandomFrameIndex(prevIndex => {
          const nextIndex = (prevIndex + 1) % shuffledEmojis.length;
          // If we've looped, re-shuffle for the next cycle
          if (nextIndex === 0) {
            setShuffledEmojis(shuffleArray(emojiData.emojis));
          }
          return nextIndex;
        });
      }, 2000); // Change emoji every 2 seconds
    }
    return () => clearInterval(interval);
  }, [isPlayingRandom, shuffledEmojis]);

  // Update the active frame during random playback
  useEffect(() => {
    if (isPlayingRandom && shuffledEmojis.length > 0) {
      const newFrame: Frame = {
        id: `random-${randomFrameIndex}`,
        emojiName: shuffledEmojis[randomFrameIndex],
      };
      setFrames([newFrame]);
      setActiveFrameId(newFrame.id);
    }
  }, [randomFrameIndex, isPlayingRandom, shuffledEmojis]);

  const handleToggleRandomPlay = () => {
    if (!isPlayingRandom) {
      // Start playing
      const newShuffledList = shuffleArray(emojiData.emojis);
      setShuffledEmojis(newShuffledList);
      setRandomFrameIndex(0);
    }
    setIsPlayingRandom(!isPlayingRandom);
  };


  if (!activeFrame) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading Editor...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background font-body overflow-hidden">
      <main className="flex-grow flex flex-col items-center justify-center p-4 lg:p-6 gap-6 overflow-y-auto">
        <EmojiBuilder 
          activeFrame={activeFrame}
          isAnimating={isPlayingRandom}
        />
        <div className="mt-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleToggleRandomPlay} 
                  size="lg"
                  className="px-6 py-6 text-lg"
                >
                  {isPlayingRandom ? <Pause className="mr-2"/> : <Shuffle className="mr-2"/>}
                  {isPlayingRandom ? 'Stop' : 'Play Random Emojis'}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isPlayingRandom ? 'Stop random playback' : 'Play all emojis randomly'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </main>
    </div>
  );
}
