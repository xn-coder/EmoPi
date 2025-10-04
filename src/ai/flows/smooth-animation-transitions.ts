'use server';

/**
 * @fileOverview AI flow to smooth out abrupt transitions between animation frames.
 *
 * - smoothAnimationTransitions - A function that smooths animation transitions.
 * - SmoothAnimationTransitionsInput - The input type for the smoothAnimationTransitions function.
 * - SmoothAnimationTransitionsOutput - The return type for the smoothAnimationTransitions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmoothAnimationTransitionsInputSchema = z.object({
  frames: z.array(
    z.object({
      facialFeatures: z.record(z.string(), z.any()).describe('Facial feature settings for this frame.'),
    })
  ).describe('Array of animation frames, each containing facial feature settings.'),
});
export type SmoothAnimationTransitionsInput = z.infer<typeof SmoothAnimationTransitionsInputSchema>;

const SmoothAnimationTransitionsOutputSchema = z.object({
  smoothedFrames: z.array(
    z.object({
      facialFeatures: z.record(z.string(), z.any()).describe('Smoothed facial feature settings for this frame.'),
    })
  ).describe('Array of animation frames with smoothed transitions.'),
});
export type SmoothAnimationTransitionsOutput = z.infer<typeof SmoothAnimationTransitionsOutputSchema>;

export async function smoothAnimationTransitions(
  input: SmoothAnimationTransitionsInput
): Promise<SmoothAnimationTransitionsOutput> {
  return smoothAnimationTransitionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smoothAnimationTransitionsPrompt',
  input: {schema: SmoothAnimationTransitionsInputSchema},
  output: {schema: SmoothAnimationTransitionsOutputSchema},
  prompt: `You are an animation expert specializing in smoothing transitions between animation frames.

You will receive an array of animation frames, each containing a set of facial feature settings.

Your task is to analyze the transitions between consecutive frames and adjust the facial feature settings to create a smoother, more fluid animation.

Specifically, identify any abrupt changes in facial features between frames and generate intermediate settings that gradually transition from one frame to the next.

Return the array of smoothed animation frames.

Here are the original frames:

{{#each frames}}
  Frame {{@index}}:
  {{#each facialFeatures}}
    {{@key}}: {{this}}
  {{/each}}
{{/each}}`,
});

const smoothAnimationTransitionsFlow = ai.defineFlow(
  {
    name: 'smoothAnimationTransitionsFlow',
    inputSchema: SmoothAnimationTransitionsInputSchema,
    outputSchema: SmoothAnimationTransitionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
