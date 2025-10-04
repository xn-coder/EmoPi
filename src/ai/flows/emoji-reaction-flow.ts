'use server';

/**
 * @fileOverview A Genkit flow that determines an emoji reaction based on a user's message.
 * 
 * - emojiReaction - A function that returns an emoji reaction.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
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
  prompt: `You are an AI assistant that communicates through emoji reactions. Based on the user's message, determine the most appropriate emoji reaction.

User message: {{{input}}}

Your response must be a valid emoji name from the following list:
${emojiData.emojis.join(', ')}

Choose the single best emoji from the list and return it in the output format.`,
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
    if (!emojiData.emojis.includes(output!.emoji)) {
      // Fallback to a default safe combination if the model hallucinates
      return {
        emoji: 'Smiling Face',
      };
    }
    
    return output!;
  }
);
