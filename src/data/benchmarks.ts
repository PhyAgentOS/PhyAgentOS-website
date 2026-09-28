export type BenchmarkMode = 'general' | 'hybrid' | 'action';

export interface BenchmarkResult {
  id: string;
  name: string;
  mode: BenchmarkMode | null;
  /** Highlight PAOS results independently of their control paradigm. */
  source: 'phyagentos' | 'reference';
  successRate: number | null;
  averageTimeSeconds: number | null;
  /** Preserve the source's precision and approximation marker, e.g. ~0.5M. */
  averageTokens: string | null;
}

export interface BenchmarkDataset {
  id: string;
  name: string;
  results: BenchmarkResult[];
}

// Transcribed from the user's latest LIBERO-Long and RoboDojo summary tables.
// Preserve the reported model names, precision, control modes, and PAOS flags.
// Null means the source cell is blank, never a zero result. Omit unnamed rows.
export const benchmarkDatasets: BenchmarkDataset[] = [
  {
    id: 'libero-long',
    name: 'LIBERO-Long',
    results: [
      {
        id: 'gpt6-pi05', name: 'PAOS / GPT-6 + π0.5', mode: 'hybrid', source: 'phyagentos',
        successRate: 100.00, averageTimeSeconds: 145, averageTokens: '3.4M',
      },
      {
        id: 'cosmos-policy', name: 'Cosmos Policy', mode: 'action', source: 'reference',
        successRate: 97.60, averageTimeSeconds: null, averageTokens: null,
      },
      {
        id: 'deepseek-pi05', name: 'PAOS / DeepSeek 4.1 Flash + π0.5', mode: 'hybrid', source: 'phyagentos',
        successRate: 97.22, averageTimeSeconds: 452, averageTokens: '~0.5M',
      },
      {
        id: 'pi05', name: 'π0.5', mode: 'action', source: 'reference',
        successRate: 93.30, averageTimeSeconds: 28, averageTokens: '0',
      },
      {
        id: 'pi0', name: 'π0', mode: 'action', source: 'reference',
        successRate: 85.20, averageTimeSeconds: null, averageTokens: null,
      },
      {
        id: 'deepseek-flash', name: 'PAOS / DeepSeek 4.1 Flash', mode: 'general', source: 'phyagentos',
        successRate: 82.00, averageTimeSeconds: 253, averageTokens: '10.15M',
      },
      {
        id: 'kimi-k3', name: 'PAOS / Kimi-K3', mode: 'general', source: 'phyagentos',
        successRate: 60.00, averageTimeSeconds: 3211, averageTokens: '25.40M',
      },
      {
        id: 'openvla', name: 'OpenVLA', mode: 'action', source: 'reference',
        successRate: 53.70, averageTimeSeconds: null, averageTokens: null,
      },
      {
        id: 'kimi-k3-pi05', name: 'PAOS / Kimi-K3 + π0.5', mode: 'hybrid', source: 'phyagentos',
        successRate: null, averageTimeSeconds: null, averageTokens: null,
      },
      {
        id: 'glm-pi05', name: 'PAOS / GLM 5.3 Flash + π0.5', mode: 'hybrid', source: 'phyagentos',
        successRate: null, averageTimeSeconds: null, averageTokens: null,
      },
      {
        id: 'glm-flash', name: 'PAOS / GLM 5.3 Flash', mode: null, source: 'phyagentos',
        successRate: null, averageTimeSeconds: null, averageTokens: null,
      },
    ],
  },
  {
    id: 'robodojo',
    name: 'RoboDojo',
    results: [
      {
        id: 'deepseek-pi05', name: 'PAOS / DeepSeek 4.1 Flash + π0.5', mode: 'hybrid', source: 'phyagentos',
        successRate: 26.70, averageTimeSeconds: 540, averageTokens: '~0.3M',
      },
      {
        id: 'dm05', name: 'DM0.5', mode: 'action', source: 'reference',
        successRate: 24.97, averageTimeSeconds: null, averageTokens: null,
      },
      {
        id: 'gpt6-pi05', name: 'PAOS / GPT-6 + π0.5', mode: 'hybrid', source: 'phyagentos',
        successRate: 23.30, averageTimeSeconds: 324, averageTokens: '2.73M',
      },
      {
        id: 'g05', name: 'G0.5', mode: 'action', source: 'reference',
        successRate: 20.23, averageTimeSeconds: null, averageTokens: null,
      },
      {
        id: 'glm-pi05', name: 'PAOS / GLM 5.3 Flash + π0.5', mode: 'hybrid', source: 'phyagentos',
        successRate: 20.00, averageTimeSeconds: 1260, averageTokens: '8.56M',
      },
      {
        id: 'pi05', name: 'π0.5', mode: 'action', source: 'reference',
        successRate: 6.91, averageTimeSeconds: null, averageTokens: null,
      },
      {
        id: 'lingbot-vla', name: 'LingBot-VLA', mode: 'action', source: 'reference',
        successRate: 5.50, averageTimeSeconds: null, averageTokens: null,
      },
      {
        id: 'pi0', name: 'π0', mode: 'action', source: 'reference',
        successRate: 3.48, averageTimeSeconds: null, averageTokens: null,
      },
      {
        id: 'deepseek-flash', name: 'PAOS / DeepSeek 4.1 Flash', mode: 'general', source: 'phyagentos',
        successRate: null, averageTimeSeconds: null, averageTokens: null,
      },
      {
        id: 'kimi-k3', name: 'PAOS / Kimi-K3', mode: 'general', source: 'phyagentos',
        successRate: null, averageTimeSeconds: null, averageTokens: null,
      },
      {
        id: 'glm-flash', name: 'PAOS / GLM 5.3 Flash', mode: 'general', source: 'phyagentos',
        successRate: null, averageTimeSeconds: null, averageTokens: null,
      },
    ],
  },
];
