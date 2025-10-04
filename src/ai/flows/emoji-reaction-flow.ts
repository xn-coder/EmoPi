'use server';

/**
 * @fileOverview A Genkit flow that determines an emoji reaction based on a user's message.
 * 
 * - emojiReaction - A function that returns an emoji reaction.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { eyeOptions, mouthOptions, eyebrowOptions } from '@/lib/types';
import { EmojiReactionOutputSchema } from '@/lib/schemas';
import type { EmojiReactionOutput } from '@/lib/types';


export async function emojiReaction(message: string): Promise<EmojiReactionOutput> {
  return emojiReactionFlow(message);
}

const prompt = ai.definePrompt({
  name: 'emojiReactionPrompt',
  input: { schema: z.string() },
  output: { schema: EmojiReactionOutputSchema },
  prompt: `You are an AI assistant that communicates through emoji facial expressions. Based on the user's message, determine the most appropriate facial expression.

User message: {{{input}}}

Available features:
Eyes: ${eyeOptions.join(', ')}
Mouth: ${mouthOptions.join(', ')}
Eyebrows: ${eyebrowOptions.join(', ')}

Choose one of each feature to form a reaction.`,
});

const emojiReactionFlow = ai.defineFlow(
  {
    name: 'emojiReactionFlow',
    inputSchema: z.string(),
    outputSchema: EmojiReactionOutputSchema,
  },
  async (message) => {
    const { output } = await prompt(message);
    return output!;
  }
);
