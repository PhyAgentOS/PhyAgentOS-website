export type BenchmarkMode = 'general' | 'hybrid' | 'action';

export interface BenchmarkResult {
  id: string;
  name: string;
  mode: BenchmarkMode;
  /** Highlight PAOS results independently of their control paradigm. */
  source: 'phyagentos' | 'reference';
  successRate: number;
}

export interface BenchmarkDataset {
  id: string;
  name: string;
  results: BenchmarkResult[];
}

// Transcribed from the user's latest LIBERO-Long and RoboDojo summary tables.
// Preserve the reported model names, precision, control modes, and PAOS flags.
// Earlier task counts, costs, and pending slots do not describe this result set.
export const benchmarkDatasets: BenchmarkDataset[] = [
  {
    id: 'libero-long',
    name: 'LIBERO-Long',
    results: [
      { id: 'gpt6-pi05', name: 'PAOS / GPT6 + π0.5', mode: 'hybrid', source: 'phyagentos', successRate: 100.00 },
      { id: 'cosmos-policy', name: 'Cosmos Policy', mode: 'action', source: 'reference', successRate: 97.60 },
      { id: 'deepseek-pi05', name: 'PAOS / DeepSeek 4.1 Flash + π0.5', mode: 'hybrid', source: 'phyagentos', successRate: 97.22 },
      { id: 'pi05', name: 'π0.5', mode: 'action', source: 'reference', successRate: 92.40 },
      { id: 'pi0', name: 'π0', mode: 'action', source: 'reference', successRate: 85.20 },
      { id: 'deepseek-flash', name: 'PAOS / DeepSeek 4.1 Flash', mode: 'general', source: 'phyagentos', successRate: 82.00 },
      { id: 'openvla', name: 'OpenVLA', mode: 'action', source: 'reference', successRate: 53.70 },
    ],
  },
  {
    id: 'robodojo',
    name: 'RoboDojo',
    results: [
      { id: 'deepseek-pi05', name: 'PAOS / DeepSeek 4.1 Flash + π0.5', mode: 'hybrid', source: 'phyagentos', successRate: 26.00 },
      { id: 'dm05', name: 'DM0.5', mode: 'action', source: 'reference', successRate: 24.97 },
      { id: 'gpt6-pi05', name: 'PAOS / GPT6 + π0.5', mode: 'hybrid', source: 'phyagentos', successRate: 23.30 },
      { id: 'g05', name: 'G0.5', mode: 'action', source: 'reference', successRate: 20.23 },
      { id: 'glm-pi05', name: 'PAOS / GLM 5.3 Flash + π0.5', mode: 'hybrid', source: 'phyagentos', successRate: 20.00 },
      { id: 'pi05', name: 'π0.5', mode: 'action', source: 'reference', successRate: 6.91 },
      { id: 'lingbot-vla', name: 'LingBot-VLA', mode: 'action', source: 'reference', successRate: 5.50 },
      { id: 'pi0', name: 'π0', mode: 'action', source: 'reference', successRate: 3.48 },
    ],
  },
];
