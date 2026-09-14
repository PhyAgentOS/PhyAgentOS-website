import type { CapabilityItem } from '../components/layout/CapabilityCatalog';
import type { Lang } from '../i18n/translations';

interface SimulationEvaluationEntry {
  name: Record<Lang, string>;
  category: Record<Lang, string>;
  status: CapabilityItem['status'];
  description: Record<Lang, string>;
  icon: string;
  supportedModels: string[];
}

export const simulationEvaluationItems: SimulationEvaluationEntry[] = [
  {
    name: { en: 'LIBERO Automated Evaluation', zh: 'LIBERO 自动评测' },
    category: { en: 'Robotics Simulation', zh: '机器人仿真' },
    status: 'available',
    description: {
      en: 'Supports automated evaluation of different models on LIBERO and records reproducible, comparable benchmark results.',
      zh: '支持不同模型在 LIBERO 上进行自动评测，并记录可复现、可比较的基准结果。',
    },
    icon: '📊',
    supportedModels: ['Kai0.5', 'LingBot-VA'],
  },
  {
    name: { en: 'RoboDojo Automated Evaluation', zh: 'RoboDojo 自动评测' },
    category: { en: 'Robotics Simulation', zh: '机器人仿真' },
    status: 'integrating',
    description: {
      en: 'Supports automated evaluation of different models on RoboDojo and records reproducible, comparable benchmark results.',
      zh: '支持不同模型在 RoboDojo 上进行自动评测，并记录可复现、可比较的基准结果。',
    },
    icon: '🥋',
    supportedModels: [],
  },
  {
    name: { en: 'BEHAVIOR-1K Automated Evaluation', zh: 'BEHAVIOR-1K 自动评测' },
    category: { en: 'Robotics Simulation', zh: '机器人仿真' },
    status: 'evaluating',
    description: {
      en: 'Supports automated evaluation of different models on BEHAVIOR-1K and records reproducible, comparable benchmark results.',
      zh: '支持不同模型在 BEHAVIOR-1K 上进行自动评测，并记录可复现、可比较的基准结果。',
    },
    icon: '🏠',
    supportedModels: [],
  },
  {
    name: { en: 'CALVIN Automated Evaluation', zh: 'CALVIN 自动评测' },
    category: { en: 'Robotics Simulation', zh: '机器人仿真' },
    status: 'evaluating',
    description: {
      en: 'Supports automated evaluation of different models on CALVIN and records reproducible, comparable benchmark results.',
      zh: '支持不同模型在 CALVIN 上进行自动评测，并记录可复现、可比较的基准结果。',
    },
    icon: '🧪',
    supportedModels: [],
  },
  {
    name: { en: 'RoboCasa365 Automated Evaluation', zh: 'RoboCasa365 自动评测' },
    category: { en: 'Robotics Simulation', zh: '机器人仿真' },
    status: 'evaluating',
    description: {
      en: 'Supports automated evaluation of different models on RoboCasa365 and records reproducible, comparable benchmark results.',
      zh: '支持不同模型在 RoboCasa365 上进行自动评测，并记录可复现、可比较的基准结果。',
    },
    icon: '🍽️',
    supportedModels: [],
  },
  {
    name: { en: 'Minecraft Automated Evaluation', zh: 'Minecraft 自动评测' },
    category: { en: 'Game Environments', zh: '游戏场景' },
    status: 'integrating',
    description: {
      en: 'Evaluates different models on atomic skill mastery, cross-environment transfer, compositional generalization, and the ability to plan and execute long-horizon tasks along resource dependency chains in game environments.',
      zh: '支持不同模型在游戏场景中的原子技能掌握、跨环境迁移、组合泛化，以及沿资源依赖链完成长程任务的规划与执行能力。',
    },
    icon: '⛏️',
    supportedModels: [],
  },
  {
    name: { en: "Don't Starve Automated Evaluation", zh: "Don't Starve 自动评测" },
    category: { en: 'Game Environments', zh: '游戏场景' },
    status: 'integrating',
    description: {
      en: "Evaluates agents' survival planning, resource management, and adaptive decision-making in Don't Starve.",
      zh: "评测智能体在 Don't Starve 中的生存规划、资源管理与自适应决策能力。",
    },
    icon: '🔥',
    supportedModels: [],
  },
  {
    name: { en: 'Stardew Valley Automated Evaluation', zh: 'Stardew Valley 自动评测' },
    category: { en: 'Game Environments', zh: '游戏场景' },
    status: 'integrating',
    description: {
      en: 'Supports automated evaluation of different models on long-horizon temporal tasks, assessing embodied agents’ phase planning, resource scheduling, state transitions, and dynamic replanning under waiting, deadline, and cross-day constraints.',
      zh: '支持不同模型在长程时序任务上进行自动评测，考察具身 Agent 在等待、截止时间和跨日约束下的阶段规划、资源调度、状态切换与动态重规划能力。',
    },
    icon: '🌾',
    supportedModels: [],
  },
];
