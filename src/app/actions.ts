'use server';

import { smoothAnimationTransitions } from '@/ai/flows/smooth-animation-transitions';
import type { Frame } from '@/lib/types';
import { z } from 'zod';

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
    const validatedInput = SmoothAnimationInputSchema.safeParse(input);

    if (!validatedInput.success) {
        console.error("Invalid input for smoothing:", validatedInput.error);
        return { error: "Invalid input format." };
    }

    const aiInput = {
        frames: validatedInput.data.frames.map(frame => ({
            facialFeatures: frame.facialFeatures,
        })),
    };

    try {
        const result = await smoothAnimationTransitions(aiInput);
        return result;
    } catch (error) {
        console.error("Error in smoothAnimationTransitions:", error);
        return { error: "AI processing failed." };
    }
}
