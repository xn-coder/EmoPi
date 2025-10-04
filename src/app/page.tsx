'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Frame } from '@/lib/types';
import EmojiBuilder from '@/components/emoji-builder';
import { handleAiReaction } from './actions';
import { useToast } from "@/hooks/use-toast";
import ChatInterface from '@/components/chat-interface';
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
  const [isAiReacting, setIsAiReacting] = useState(false);
  const { toast } = useToast();

  const activeFrame = frames.find((frame) => frame.id === activeFrameId) || frames[0];
  const [animatedReaction, setAnimatedReaction] = useState<Frame | null>(null);

  // State for random playback
  const [isPlayingRandom, setIsPlayingRandom] = useState(false);
  const [shuffledEmojis, setShuffledEmojis] = useState<string[]>([]);
  const [randomFrameIndex, setRandomFrameIndex] = useState(0);

  useEffect(() => {
    if (animatedReaction) {
      const timer = setTimeout(() => {
        const newFrame = animatedReaction;
        setFrames([newFrame]);
        setActiveFrameId(newFrame.id);
        setAnimatedReaction(null);
      }, 1000); // Let animation play
      return () => clearTimeout(timer);
    }
  }, [animatedReaction]);

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
      }, 1500); // Change emoji every 1.5 seconds
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


  const onAiReaction = async (message: string) => {
    if (isPlayingRandom) setIsPlayingRandom(false); // Stop random playback
    setIsAiReacting(true);
    try {
        const result = await handleAiReaction(message);
        if (result && result.reaction) {
            const newFrame: Frame = {
                id: crypto.randomUUID(),
                emojiName: result.reaction.emoji,
            };
            setAnimatedReaction(newFrame);

        } else {
            throw new Error(result.error || "Invalid AI response");
        }
    } catch (error) {
        toast({
            variant: "destructive",
            title: "AI Reaction Failed",
            description: "Could not get AI reaction. Please try again.",
        });
    } finally {
        setIsAiReacting(false);
    }
  };

  const handleToggleRandomPlay = () => {
    setAnimatedReaction(null); // Stop any AI reaction animation
    
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
      <main className="flex-grow flex flex-col p-4 lg:p-6 gap-6 overflow-y-auto">
        <EmojiBuilder 
          activeFrame={animatedReaction || activeFrame}
          isAnimating={!!animatedReaction}
        />
        <ChatInterface 
          onSendMessage={onAiReaction} 
          isSending={isAiReacting}
          onToggleRandomPlay={handleToggleRandomPlay}
          isPlayingRandom={isPlayingRandom}
        />
      </main>
    </div>
  );
}
