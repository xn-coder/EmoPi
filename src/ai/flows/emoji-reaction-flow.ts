'use server';

/**
 * @fileOverview A Genkit flow that determines an emoji reaction based on a user's message.
 * 
 * - emojiReaction - A function that returns an emoji reaction.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { eyeOptions, mouthOptions, eyebrowOptions } from '@/lib/types';
import { EmojiReactionOutputSchema } from '@/lib/schemas';
import type { EmojiReactionOutput } from '@/lib/types';
import emojiData from '@/lib/emojis.json';


export async function emojiReaction(message: string): Promise<EmojiReactionOutput> {
  return emojiReactionFlow(message);
}

const prompt = ai.definePrompt({
  name: 'emojiReactionPrompt',
  input: { schema: z.string() },
  output: { schema: EmojiReactionOutputSchema },
  prompt: `You are an AI assistant that communicates through emoji facial expressions. Based on the user's message, determine the most appropriate facial expression.

User message: {{{input}}}

Your response must be a valid emoji combination.
A valid combination is one that exists in the following list of available emojis:
${emojiData.emojis.join(', ')}

The format of each item is: eyes_mouth_eyebrows.
From the chosen combination, extract the eye, mouth, and eyebrow values and return them in the output format.`,
});

const emojiReactionFlow = ai.defineFlow(
  {
    name: 'emojiReactionFlow',
    inputSchema: z.string(),
    outputSchema: EmojiReactionOutputSchema,
  },
  async (message) => {
    const { output } = await prompt(message);
    
    // Validate that the combination is valid
    const combination = `${output!.eyes}_${output!.mouth}_${output!.eyebrows}`;
    if (!emojiData.emojis.includes(combination)) {
      // Fallback to a default safe combination if the model hallucinates
      return {
        eyes: 'default',
        mouth: 'smile',
        eyebrows: 'default',
      };
    }
    
    return output!;
  }
);
