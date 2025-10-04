export const eyeOptions = ['default', 'closed', 'wink', 'surprised'] as const;
export const mouthOptions = ['smile', 'sad', 'open', 'neutral'] as const;
export const eyebrowOptions = ['default', 'raised', 'furrowed'] as const;

export type EyeOption = typeof eyeOptions[number];
export type MouthOption = typeof mouthOptions[number];
export type EyebrowOption = typeof eyebrowOptions[number];

export type Frame = {
  id: string;
  facialFeatures: {
    eyes: EyeOption;
    mouth: MouthOption;
    eyebrows: EyebrowOption;
  };
};
