import { z } from 'zod';
import { EmojiReactionOutputSchema, SmoothAnimationTransitionsInputSchema, SmoothAnimationTransitionsOutputSchema } from './schemas';

export const eyeOptions = ['default', 'closed', 'wink', 'surprised'] as const;
export const mouthOptions = ['smile', 'sad', 'open', 'neutral'] as const;
export const eyebrowOptions = ['default', 'raised', 'furrowed'] as const;

export type EyeOption = typeof eyeOptions[number];
export type MouthOption = typeof mouthOptions[number];
export type EyebrowOption = typeof eyebrowOptions[number];

export type Frame = {
  id: string;
  emojiName: string;
};

export type EmojiReactionOutput = z.infer<typeof EmojiReactionOutputSchema>;
export type SmoothAnimationTransitionsInput = z.infer<typeof SmoothAnimationTransitionsInputSchema>;
export type SmoothAnimationTransitionsOutput = z.infer<typeof SmoothAnimationTransitionsOutputSchema>;
