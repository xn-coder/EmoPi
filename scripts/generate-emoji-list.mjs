import fs from 'fs';
import path from 'path';

const eyeOptions = ['default', 'closed', 'wink', 'surprised'];
const mouthOptions = ['smile', 'sad', 'open', 'neutral'];
const eyebrowOptions = ['default', 'raised', 'furrowed'];

const combinations = [];

for (const eyes of eyeOptions) {
  for (const mouth of mouthOptions) {
    for (const eyebrows of eyebrowOptions) {
      combinations.push(`${eyes}_${mouth}_${eyebrows}`);
    }
  }
}

const content = JSON.stringify({ emojis: combinations }, null, 2);
const outputPath = path.join(process.cwd(), 'src', 'lib', 'emojis.json');

fs.writeFileSync(outputPath, content);

console.log(`Generated ${combinations.length} emoji combinations in src/lib/emojis.json`);
