import { z } from 'zod';
import { EmojiReactionOutputSchema, SmoothAnimationTransitionsInputSchema, SmoothAnimationTransitionsOutputSchema } from './schemas';

export type Frame = {
  id: string;
  emojiName: string;
};

export type EmojiReactionOutput = z.infer<typeof EmojiReactionOutputSchema>;
export type SmoothAnimationTransitionsInput = z.infer<typeof SmoothAnimationTransitionsInputSchema>;
export type SmoothAnimationTransitionsOutput = z.infer<typeof SmoothAnimationTransitionsOutputSchema>;
