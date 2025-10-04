'use client';

import { useState, useTransition, useEffect } from 'react';
import type { Frame, EyeOption, MouthOption, EyebrowOption } from '@/lib/types';
import { eyeOptions, mouthOptions, eyebrowOptions } from '@/lib/types';
import EmojiBuilder from '@/components/emoji-builder';
import { handleAiReaction } from './actions';
import { useToast } from "@/hooks/use-toast";
import ChatInterface from '@/components/chat-interface';

const initialFrame: Frame = {
  id: 'initial-frame',
  facialFeatures: {
    eyes: 'default',
    mouth: 'smile',
    eyebrows: 'default',
  },
};

export default function Home() {
  const [frames, setFrames] = useState<Frame[]>([initialFrame]);
  const [activeFrameId, setActiveFrameId] = useState<string>(initialFrame.id);
  const [isAiReacting, setIsAiReacting] = useState(false);
  const { toast } = useToast();

  const activeFrame = frames.find((frame) => frame.id === activeFrameId) || frames[0];
  const [animatedReaction, setAnimatedReaction] = useState<Frame | null>(null);

  useEffect(() => {
    if (animatedReaction) {
      const timer = setTimeout(() => {
        // After animation, update the main frame and reset animation state
        setFrames([animatedReaction]);
        setActiveFrameId(animatedReaction.id);
        setAnimatedReaction(null);
      }, 1000); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [animatedReaction]);

  const onAiReaction = async (message: string) => {
    setIsAiReacting(true);
    try {
        const result = await handleAiReaction(message);
        if (result && result.reaction) {
            const newFrame: Frame = {
                id: crypto.randomUUID(),
                facialFeatures: {
                    eyes: (eyeOptions.includes(result.reaction.eyes) ? result.reaction.eyes : 'default') as EyeOption,
                    mouth: (mouthOptions.includes(result.reaction.mouth) ? result.reaction.mouth : 'smile') as MouthOption,
                    eyebrows: (eyebrowOptions.includes(result.reaction.eyebrows) ? result.reaction.eyebrows : 'default') as EyebrowOption,
                }
            };
            // Only set the animation. The useEffect will handle updating the main state.
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
        <ChatInterface onSendMessage={onAiReaction} isSending={isAiReacting} />
      </main>
    </div>
  );
}
