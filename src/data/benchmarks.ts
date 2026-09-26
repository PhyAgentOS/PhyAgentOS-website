export type BenchmarkMode = 'hybrid' | 'direct' | 'baseline';

export interface BenchmarkResult {
  id: string;
  name: string;
  mode: BenchmarkMode;
  /** Highlight by result provenance, independently of the control mode. */
  source: 'phyagentos' | 'reference';
  successRate: number | null;
  /** Raw fields from the supplied summary, not a verified evaluation protocol. */
  tasks?: number;
  reportedEpisodes?: number;
  runtime?: string;
  tokens?: string;
  estimatedCostUsd?: number;
}

export interface BenchmarkDataset {
  id: string;
  name: string;
  status: 'preliminary' | 'pending';
  results: BenchmarkResult[];
}

const pendingResults: BenchmarkResult[] = [
  { id: 'hybrid', name: 'PAOS / VLM + VLA', mode: 'hybrid', source: 'phyagentos', successRate: null },
  { id: 'direct', name: 'PAOS / VLM', mode: 'direct', source: 'phyagentos', successRate: null },
  { id: 'baseline', name: 'VLA', mode: 'baseline', source: 'reference', successRate: null },
];

// Transcribed from the user's LIBERO summary screenshot. Its task counts and
// episode fields need reconciliation; do not present these as a matched ranking.
// Null means unreported, never a zero score. The other two benchmark slots follow
// the supplied design reference and await the researchers' confirmed results.
export const benchmarkDatasets: BenchmarkDataset[] = [
  {
    id: 'libero',
    name: 'LIBERO',
    status: 'preliminary',
    results: [
      { id: 'gpt6-pi05', name: 'PAOS / GPT6 + π0.5', mode: 'hybrid', source: 'phyagentos', successRate: 100, tasks: 12, reportedEpisodes: 5, tokens: '102M', estimatedCostUsd: 80 },
      { id: 'pi05', name: 'π0.5', mode: 'baseline', source: 'reference', successRate: 98 },
      { id: 'deepseek-flash', name: 'PAOS / DeepSeek 4.1 Flash', mode: 'direct', source: 'phyagentos', successRate: 70.8, tasks: 12, reportedEpisodes: 2, runtime: '3.52h', tokens: '507,407,203', estimatedCostUsd: 3.6 },
      { id: 'gpt6-low', name: 'PAOS / GPT6 Low', mode: 'direct', source: 'phyagentos', successRate: null, tokens: '360M', estimatedCostUsd: 522 },
      { id: 'gpt6-high', name: 'PAOS / GPT6 High', mode: 'direct', source: 'phyagentos', successRate: null, tokens: '1200M', estimatedCostUsd: 1720 },
    ],
  },
  { id: 'robotwin', name: 'RoboTwin', status: 'pending', results: pendingResults },
  { id: 'robodojo', name: 'RoboDojo', status: 'pending', results: pendingResults },
];
