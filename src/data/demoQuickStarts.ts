import piperZh from '../content/piper-quickstart.md?raw';
import piperEn from '../content/piper-quickstart.en.md?raw';
import liberoGpt6 from '../content/libero-gpt6-quickstart.md?raw';
import liberoGpt6En from '../content/libero-gpt6-quickstart.en.md?raw';
import liberoPi05 from '../content/libero-pi05-quickstart.md?raw';
import liberoPi05En from '../content/libero-pi05-quickstart.en.md?raw';
import liberoGpt6Pi05 from '../content/libero-gpt6-pi05-quickstart.md?raw';
import liberoGpt6Pi05En from '../content/libero-gpt6-pi05-quickstart.en.md?raw';

interface DemoQuickStart {
  id: string;
  eyebrow: string;
  title: { zh: string; en: string };
  markdown: { zh: string; en: string };
}

// Keys match the demo IDs in LiveDemo. Keep guide content in Markdown files.
export const demoQuickStarts: Partial<Record<string, DemoQuickStart>> = {
  'real-skill-deployment': {
    id: 'piper-quick-start',
    eyebrow: 'PIPER · MOVE-ARM-BY-EE',
    title: { zh: 'Piper机械臂快速启动', en: 'Piper Robot Arm Quick Start' },
    markdown: { zh: piperZh, en: piperEn },
  },
  'libero-gpt6': {
    id: 'libero-gpt6-quick-start',
    eyebrow: 'LIBERO-10 · GPT-6 · VLM',
    title: { zh: 'LIBERO-10 纯 VLM 出动作快速启动', en: 'LIBERO-10 GPT-6 VLM Quick Start' },
    markdown: { zh: liberoGpt6, en: liberoGpt6En },
  },
  'libero-pi05': {
    id: 'libero-pi05-quick-start',
    eyebrow: 'LIBERO-10 · π0.5 · POLICY',
    title: { zh: 'LIBERO-10 π0.5（纯策略）快速启动', en: 'LIBERO-10 π0.5 Policy Quick Start' },
    markdown: { zh: liberoPi05, en: liberoPi05En },
  },
  'libero-gpt6-pi05': {
    id: 'libero-gpt6-pi05-quick-start',
    eyebrow: 'LIBERO-10 · GPT-6 + π0.5',
    title: { zh: 'LIBERO-10 π0.5 + GPT-6 监督快速启动', en: 'LIBERO-10 GPT-6 + π0.5 Supervision Quick Start' },
    markdown: { zh: liberoGpt6Pi05, en: liberoGpt6Pi05En },
  },
};
