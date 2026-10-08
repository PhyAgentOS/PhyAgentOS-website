import { readFile, writeFile } from 'node:fs/promises';

// Produce self-contained SVG images from the existing cover and model names.
// The embedded JPEG preserves the original background and PhyAgentOS branding.
const posterDir = new URL('../public/media/demos/', import.meta.url);
const background = await readFile(new URL('libero-benchmark.jpg', posterDir));
const models = [
  ['libero-gpt6.svg', 'GPT-6'],
  ['libero-pi05.svg', 'π0.5'],
  ['libero-gpt6-pi05.svg', 'GPT-6 + π0.5'],
];

for (const [filename, label] of models) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <title>LIBERO Benchmark · ${label}</title>
  <image width="1600" height="900" href="data:image/jpeg;base64,${background.toString('base64')}"/>
  <text x="800" y="670" text-anchor="middle" font-family="Arial, sans-serif" font-size="56" font-weight="600" fill="#ffffff" fill-opacity="0.85">${label}</text>
</svg>
`;
  await writeFile(new URL(filename, posterDir), svg);
  console.log(`Generated ${filename}`);
}
