'use client';

import { useState, useTransition, useEffect } from 'react';
import type { Frame, EyeOption, MouthOption, EyebrowOption } from '@/lib/types';
import { eyeOptions, mouthOptions, eyebrowOptions } from '@/lib/types';
import EmojiBuilder from '@/components/emoji-builder';
import { handleSmoothAnimation, handleAiReaction } from './actions';
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
  const [isPending, startTransition] = useTransition();
  const [isAiReacting, setIsAiReacting] = useState(false);
  const { toast } = useToast();

  const activeFrame = frames.find((frame) => frame.id === activeFrameId) || frames[0];
  const [animatedReaction, setAnimatedReaction] = useState<Frame | null>(null);

  useEffect(() => {
    if (animatedReaction) {
      const timer = setTimeout(() => setAnimatedReaction(null), 1000); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [animatedReaction]);


  const updateFeature = (feature: 'eyes' | 'mouth' | 'eyebrows', value: EyeOption | MouthOption | EyebrowOption) => {
    setFrames((prevFrames) =>
      prevFrames.map((frame) =>
        frame.id === activeFrameId
          ? {
              ...frame,
              facialFeatures: { ...frame.facialFeatures, [feature]: value },
            }
          : frame
      )
    );
  };
  
  const addFrame = () => {
    const newFrame: Frame = {
        ...JSON.parse(JSON.stringify(activeFrame)), // Deep copy
        id: crypto.randomUUID(),
    };
    const activeIndex = frames.findIndex(frame => frame.id === activeFrameId);
    const newFrames = [...frames];
    newFrames.splice(activeIndex + 1, 0, newFrame);
    setFrames(newFrames);
    setActiveFrameId(newFrame.id);
  };

  const deleteFrame = (id: string) => {
    if (frames.length <= 1) {
        toast({
            variant: "destructive",
            title: "Cannot delete",
            description: "You must have at least one frame.",
        });
        return;
    }
    const activeIndex = frames.findIndex(frame => frame.id === id);
    const newFrames = frames.filter((frame) => frame.id !== id);
    setFrames(newFrames);
    if(activeFrameId === id) {
        const newActiveIndex = Math.max(0, activeIndex - 1);
        setActiveFrameId(newFrames[newActiveIndex]?.id || '');
    }
  };

  const onSmoothAnimation = () => {
    startTransition(async () => {
        try {
            const result = await handleSmoothAnimation({ frames });
            if (result && result.smoothedFrames) {
                const smoothedFramesWithIds = result.smoothedFrames.map((frameData) => ({
                    id: crypto.randomUUID(),
                    facialFeatures: {
                      eyes: (eyeOptions.includes(frameData.facialFeatures.eyes) ? frameData.facialFeatures.eyes : 'default') as EyeOption,
                      mouth: (mouthOptions.includes(frameData.facialFeatures.mouth) ? frameData.facialFeatures.mouth : 'smile') as MouthOption,
                      eyebrows: (eyebrowOptions.includes(frameData.facialFeatures.eyebrows) ? frameData.facialFeatures.eyebrows : 'default') as EyebrowOption,
                    }
                }));

                setFrames(smoothedFramesWithIds);
                toast({
                    title: "Animation Smoothed",
                    description: "AI has added transitions to your animation.",
                });
            } else {
                throw new Error(result.error || "Invalid response from AI");
            }
        } catch (error) {
             toast({
                variant: "destructive",
                title: "Smoothing Failed",
                description: "Could not smooth the animation. Please try again.",
            });
        }
    });
  };

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
            setAnimatedReaction(newFrame);
            // Also update the main builder and timeline
            setFrames([newFrame]);
            setActiveFrameId(newFrame.id);

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
          onFeatureChange={updateFeature} 
        />
        <ChatInterface onSendMessage={onAiReaction} isSending={isAiReacting} />
      </main>
    </div>
  );
}
