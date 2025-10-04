import { z } from 'zod';
import { eyeOptions, mouthOptions, eyebrowOptions } from '@/lib/types';

export const EmojiReactionOutputSchema = z.object({
  eyes: z.enum(eyeOptions).describe('The state of the eyes.'),
  mouth: z.enum(mouthOptions).describe('The state of the mouth.'),
  eyebrows: z.enum(eyebrowOptions).describe('The state of the eyebrows.'),
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
