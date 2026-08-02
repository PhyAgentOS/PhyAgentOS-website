import { useEffect } from 'react';
import CapabilityCatalog, { type CapabilityItem } from '../components/layout/CapabilityCatalog';
import { useLang } from '../i18n/LanguageContext';
import type { Lang } from '../i18n/translations';

interface LocalizedText {
  en: string;
  zh: string;
}

interface AlgorithmEntry {
  name: string;
  category: LocalizedText;
  status: CapabilityItem['status'];
  description: LocalizedText;
  capabilities: Record<Lang, string[]>;
}

// Add or remove entries here. The Hero algorithm count is derived from this array.
// eslint-disable-next-line react-refresh/only-export-components
export const algorithmItems: AlgorithmEntry[] = [
  {
    name: 'OpenVLA',
    category: { en: 'VLA', zh: 'VLA 模型' },
    status: 'evaluating',
    description: {
      en: 'A vision-language-action policy connected to the Session runtime for manipulation evaluation and reproducible execution.',
      zh: '接入 Session Runtime 的视觉-语言-动作策略，用于机器人操作评测与可复现执行。',
    },
    capabilities: {
      en: ['LIBERO evaluation pipeline', 'Natural-language task input', 'Session result logging'],
      zh: ['LIBERO 评测流水线', '自然语言任务输入', 'Session 结果记录'],
    },
  },
  {
    name: 'π0.5 FlowSDE',
    category: { en: 'VLA / Flow Policy', zh: 'VLA / Flow 策略' },
    status: 'evaluating',
    description: {
      en: 'A flow-based embodied policy used in long-horizon manipulation benchmark integrations.',
      zh: '面向长程机器人操作评测接入的 Flow-based 具身策略。',
    },
    capabilities: {
      en: ['CALVIN ABC→D evaluation', 'RoboCasa365 target50 evaluation', 'Policy service integration'],
      zh: ['CALVIN ABC→D 评测', 'RoboCasa365 target50 评测', '策略服务接入'],
    },
  },
  {
    name: 'ReKep',
    category: { en: 'Spatial Reasoning', zh: '空间推理' },
    status: 'available',
    description: {
      en: 'A constraint-based spatial reasoning pipeline for turning task intent into robot manipulation targets.',
      zh: '基于约束的空间推理流水线，将任务意图转换为机器人操作目标。',
    },
    capabilities: {
      en: ['Keypoint constraint generation', 'Manipulation planning', 'Real-robot deployment'],
      zh: ['关键点约束生成', '操作规划', '真机部署'],
    },
  },
  {
    name: 'SAM3',
    category: { en: 'Visual Perception', zh: '视觉感知' },
    status: 'available',
    description: {
      en: 'A visual segmentation tool integrated into perception and grasping workflows for physical targets.',
      zh: '集成到物理目标感知与抓取流程中的视觉分割工具。',
    },
    capabilities: {
      en: ['Object segmentation', 'Grasp target extraction', 'ReKep pipeline collaboration'],
      zh: ['目标分割', '抓取目标提取', '与 ReKep 流水线协同'],
    },
  },
  {
    name: 'World Model Adapter',
    category: { en: 'World Model', zh: '世界模型' },
    status: 'evaluating',
    description: {
      en: 'An evolving adapter interface for evaluating predictive world models inside the same target and Session protocol.',
      zh: '持续演进中的世界模型适配接口，用统一 Target 与 Session 协议评估环境预测能力。',
    },
    capabilities: {
      en: ['State prediction interface', 'Rollout comparison', 'Pluggable model evaluation'],
      zh: ['状态预测接口', 'Rollout 对比', '可插拔模型评估'],
    },
  },
  {
    name: 'LLM / VLM Planner',
    category: { en: 'Task Planning', zh: '任务规划' },
    status: 'available',
    description: {
      en: 'A model-agnostic planning layer that converts natural-language goals into auditable Session tasks and actions.',
      zh: '模型无关的任务规划层，将自然语言目标转换为可审计的 Session 任务与动作。',
    },
    capabilities: {
      en: ['Goal decomposition', 'Tool and action selection', 'Cross-target orchestration'],
      zh: ['目标拆解', '工具与动作选择', '跨目标编排'],
    },
  },
];

export default function Algorithms() {
  const { lang } = useLang();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const copy = lang === 'zh'
    ? {
        label: '算法目录',
        title: '持续扩展的',
        highlight: '算法与工具',
        description: '当前正在接入、评估或已经可用的 VLA、世界模型、感知与规划算法。框架仍在演进，新算法可直接在本页面的数据列表中维护。',
        countLabel: '项算法与工具',
        availableLabel: '已接入',
        evaluatingLabel: '评估中',
        backLabel: '返回首页',
      }
    : {
        label: 'Algorithm Catalog',
        title: 'An evolving collection of',
        highlight: 'algorithms and tools',
        description: 'VLA, world-model, perception, and planning algorithms that are integrated or under active evaluation. Add future entries directly to this page catalog.',
        countLabel: 'algorithms and tools',
        availableLabel: 'Available',
        evaluatingLabel: 'Evaluating',
        backLabel: 'Back to home',
      };

  const items: CapabilityItem[] = algorithmItems.map((item) => ({
    name: item.name,
    category: item.category[lang],
    status: item.status,
    description: item.description[lang],
    capabilities: item.capabilities[lang],
  }));

  return <CapabilityCatalog {...copy} items={items} />;
}
