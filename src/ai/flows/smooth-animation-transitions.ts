'use server';

/**
 * @fileOverview AI flow to smooth out abrupt transitions between animation frames.
 *
 * - smoothAnimationTransitions - A function that smooths animation transitions.
 */

import {ai} from '@/ai/genkit';
import { SmoothAnimationTransitionsInputSchema, SmoothAnimationTransitionsOutputSchema } from '@/lib/schemas';
import type { SmoothAnimationTransitionsInput, SmoothAnimationTransitionsOutput } from '@/lib/types';

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
