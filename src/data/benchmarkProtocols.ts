import type { Lang } from '../i18n/translations';

type LocalizedText = Record<Lang, string>;

interface BenchmarkProtocol {
  summary: LocalizedText;
  configuration?: string;
  initStateIds: string;
  seed: string;
  maxSteps: LocalizedText;
  episodes: number;
  groupLabel?: LocalizedText;
  tasks: { name: string; group?: LocalizedText }[];
  seedNote: LocalizedText;
}

const text = (zh: string, en: string): LocalizedText => ({ zh, en });

// Source: 三Bench测评协议_简版_20261010.md. Task IDs follow the source's row order.
export const benchmarkProtocols: Record<string, BenchmarkProtocol> = {
  'libero-long': {
    summary: text(
      '按长程与组合操作能力选定 libero_10 单个 suite，取全部 10 个任务；每任务固定 3 个初始态，seed 固定，多样性靠初始态。',
      'Select the libero_10 suite for long-horizon and compositional manipulation, use all 10 tasks with 3 fixed initial states each, and hold the seed fixed so diversity comes from initial states.',
    ),
    configuration: 'libero_10',
    initStateIds: '[0, 1, 2]',
    seed: '0',
    maxSteps: text('800', '800'),
    episodes: 30,
    tasks: [
      { name: 'put both the alphabet soup and the tomato sauce in the basket' },
      { name: 'put both the cream cheese box and the butter in the basket' },
      { name: 'turn on the stove and put the moka pot on it' },
      { name: 'put the black bowl in the bottom drawer of the cabinet and close it' },
      { name: 'put the white mug on the left plate and put the yellow and white mug on the right plate' },
      { name: 'pick up the book and place it in the back compartment of the caddy' },
      { name: 'put the white mug on the plate and put the chocolate pudding to the right of the plate' },
      { name: 'put both the alphabet soup and the cream cheese box in the basket' },
      { name: 'put both moka pots on the stove' },
      { name: 'put the yellow and white mug in the microwave and close it' },
    ],
    seedNote: text(
      '每任务初始态池 50 个，本协议取前 3 个（init_state_id=0/1/2）；seed=0 下环境逐集派生 episode_seed，记录在结果 JSON（例：task 2 / init 0 → 149578303）。',
      'Each task has a pool of 50 initial states; this protocol uses the first 3 (init_state_id=0/1/2). With seed=0, the environment derives an episode_seed for each episode and records it in the result JSON (example: task 2 / init 0 → 149578303).',
    ),
  },
  robodojo: {
    summary: text(
      '按官方五个能力维度人工选定 12 个任务（Open 2、Memory 2、Precision 3、Long-Horizon 4、Generalization 1）；每任务仅 1 个初始态，改用 3 个环境种子，多样性靠种子。',
      'Manually select 12 tasks across five official capability dimensions (Open 2, Memory 2, Precision 3, Long-Horizon 4, Generalization 1), with one initial state and 3 environment seeds per task for diversity.',
    ),
    initStateIds: '[0]',
    seed: '0 / 1 / 2',
    maxSteps: text('2000', '2000'),
    episodes: 36,
    groupLabel: text('能力维度', 'Capability'),
    tasks: [
      { name: 'general_pickup', group: text('Open', 'Open') },
      { name: 'organize_table', group: text('Long-Horizon', 'Long-Horizon') },
      { name: 'align_blocks', group: text('Open', 'Open') },
      { name: 'build_tower', group: text('Precision', 'Precision') },
      { name: 'classify_objects', group: text('Long-Horizon', 'Long-Horizon') },
      { name: 'cover_blocks', group: text('Memory', 'Memory') },
      { name: 'fill_pen_holder', group: text('Long-Horizon', 'Long-Horizon') },
      { name: 'fasten_screws', group: text('Precision', 'Precision') },
      { name: 'insert_key', group: text('Precision', 'Precision') },
      { name: 'match_and_pick_from_conveyor', group: text('Memory', 'Memory') },
      { name: 'put_bottles_into_dustbin', group: text('Long-Horizon', 'Long-Horizon') },
      { name: 'stack_blocks', group: text('Generalization', 'Generalization') },
    ],
    seedNote: text(
      'seed=0/1/2 由环境逐集派生成 episode_seed，记录在结果 JSON（例：task 0 / seed 0 → 28855157）。除成功率外同时记录官方过程分。',
      'The environment derives an episode_seed for each episode from seed=0/1/2 and records it in the result JSON (example: task 0 / seed 0 → 28855157). Official process scores are recorded alongside success rates.',
    ),
  },
  robotwin: {
    summary: text(
      '按五个自定义能力抽样组选定 T01–T10；每任务 3 个初始态，seed 固定，多样性靠初始态与官方场景种子游标。',
      'Select T01–T10 across five custom capability groups, using 3 initial states per task and a fixed seed, with diversity from initial states and the official scene-seed cursor.',
    ),
    configuration: 'demo_clean',
    initStateIds: '[0, 1, 2]',
    seed: '0',
    maxSteps: text('各任务官方值（400–1700）', 'Official per-task limits (400–1700)'),
    episodes: 30,
    groupLabel: text('抽样组', 'Sampling group'),
    tasks: [
      { name: 'adjust_bottle', group: text('目标定位与搬运', 'Target localization & transport') },
      { name: 'place_object_basket', group: text('目标定位与搬运', 'Target localization & transport') },
      { name: 'handover_block', group: text('双臂协同', 'Bimanual coordination') },
      { name: 'lift_pot', group: text('双臂协同', 'Bimanual coordination') },
      { name: 'open_microwave', group: text('关节物体与工具', 'Articulated objects & tools') },
      { name: 'beat_block_hammer', group: text('关节物体与工具', 'Articulated objects & tools') },
      { name: 'hanging_mug', group: text('精确装配与堆叠', 'Precise assembly & stacking') },
      { name: 'stack_blocks_three', group: text('精确装配与堆叠', 'Precise assembly & stacking') },
      { name: 'blocks_ranking_rgb', group: text('属性与顺序', 'Attributes & ordering') },
      { name: 'blocks_ranking_size', group: text('属性与顺序', 'Attributes & ordering') },
    ],
    seedNote: text(
      'seed=0 只是驱动侧种子；真正决定场景的是官方顺序种子游标——每个 (task, run_index) 从 100000×(1+run_index) 起只增不减，遇 UnStableError 或 expert 预筛失败跳过且不回收。逐集实际种子记在结果 JSON 的 metrics.scene_seed_ledger（例：task 0 三集 → 100001/100002/100005），报告复现须附此表。',
      'seed=0 is only the driver-side seed. Scenes are determined by the official sequential seed cursor: each (task, run_index) starts at 100000×(1+run_index) and only increases. Seeds skipped due to UnStableError or failed expert pre-screening are never reused. Actual episode seeds are recorded in metrics.scene_seed_ledger in the result JSON (example: task 0, three episodes → 100001/100002/100005); this ledger must accompany reproduction reports.',
    ),
  },
};
