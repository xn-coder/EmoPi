import { z } from 'zod';
import emojiData from './emojis.json';

// Make sure that the list is not empty and has at least one string.
const emojiNames = emojiData.emojis as [string, ...string[]];

export const EmojiReactionOutputSchema = z.object({
  emoji: z.enum(emojiNames).describe('The name of the emoji to display.'),
});

export const SmoothAnimationTransitionsInputSchema = z.object({
  frames: z.array(
    z.object({
      facialFeatures: z.record(z.string(), z.any()).describe('Facial feature settings for this frame.'),
    })
  ).describe('Array of animation frames, each containing facial feature settings.'),
});

export const SmoothAnimationTransitionsOutputSchema = z.object({
  smoothedFrames: z.array(
    z.object({
      facialFeatures: z.record(z.string(), z.any()).describe('Smoothed facial feature settings for this frame.'),
    })
  ).describe('Array of animation frames with smoothed transitions.'),
});
