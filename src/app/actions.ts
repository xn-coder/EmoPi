'use server';

import { smoothAnimationTransitions } from '@/ai/flows/smooth-animation-transitions';
import { emojiReaction } from '@/ai/flows/emoji-reaction-flow';
import type { Frame } from '@/lib/types';
import { z } from 'zod';
import { EmojiReactionOutputSchema } from '@/lib/schemas';

const SmoothAnimationInputSchema = z.object({
  frames: z.array(
    z.object({
      id: z.string(),
      facialFeatures: z.object({
        eyes: z.string(),
        mouth: z.string(),
        eyebrows: z.string(),
      }),
    })
  ),
});

export async function handleSmoothAnimation(input: { frames: Frame[] }) {
    // This function is not compatible with the new Frame type
    console.warn("handleSmoothAnimation is not implemented for the new emoji structure");
    return { error: "Smoothing not available." };
}

export async function handleAiReaction(message: string) {
    try {
        const result = await emojiReaction(message);
        const validatedResult = EmojiReactionOutputSchema.safeParse(result);
        if (!validatedResult.success) {
            console.error("Invalid AI response schema:", validatedResult.error);
            return { error: "Invalid AI response format." };
        }
        return { reaction: validatedResult.data };
    } catch (error) {
        console.error("Error in emojiReaction:", error);
        return { error: "AI processing failed." };
    }
}
