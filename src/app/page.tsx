
'use client';

import { useState, useEffect } from 'react';
import type { Frame } from '@/lib/types';
import EmojiBuilder from '@/components/emoji-builder';
import emojiData from '@/lib/emojis.json';

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
  const [isPlayingRandom, setIsPlayingRandom] = useState(true);
  const [shuffledEmojis, setShuffledEmojis] = useState<string[]>([]);
  const [randomFrameIndex, setRandomFrameIndex] = useState(0);

  // State for showing the time
  const [showTime, setShowTime] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Effect to start random playback on load
  useEffect(() => {
    const newShuffledList = shuffleArray(emojiData.emojis);
    setShuffledEmojis(newShuffledList);
    setRandomFrameIndex(0);
  }, []);

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
      }, 4000); // Change emoji every 4 seconds
    }
    return () => clearInterval(interval);
  }, [isPlayingRandom, shuffledEmojis]);
  
    // Effect to update time every second when the clock is shown
  useEffect(() => {
    let timeInterval: NodeJS.Timeout | undefined;
    if (showTime) {
      timeInterval = setInterval(() => {
        // This runs on the client, so `new Date()` is safe.
        setCurrentTime(new Date().toLocaleTimeString());
      }, 1000);
    }
    return () => clearInterval(timeInterval);
  }, [showTime]);

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

  const handleShowTimeClick = () => {
    // This function will only run on the client, so `new Date()` is safe.
    setCurrentTime(new Date().toLocaleTimeString());
    setShowTime(true);
    setIsPlayingRandom(false);

    setTimeout(() => {
      setShowTime(false);
      setIsPlayingRandom(true);
    }, 4000);
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
      <div
        className="absolute top-4 right-4 w-20 h-20 z-10 cursor-pointer"
        onClick={handleShowTimeClick}
        aria-label="Show current time"
      />
      <main className="flex-grow flex flex-col items-center justify-center p-4 lg:p-6 gap-6">
        {showTime ? (
          <div className="text-8xl font-bold text-foreground animate-emoji-in">
            {currentTime}
          </div>
        ) : (
          <EmojiBuilder 
            activeFrame={activeFrame}
            isAnimating={isPlayingRandom}
          />
        )}
      </main>
    </div>
  );
}
