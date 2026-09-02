import { useEffect } from 'react';
import CapabilityCatalog, { type CapabilityItem } from '../components/layout/CapabilityCatalog';
import { useLang } from '../i18n/LanguageContext';
import type { Lang } from '../i18n/translations';

interface LocalizedText {
  en: string;
  zh: string;
}

interface SkillEntry {
  name: LocalizedText;
  category: LocalizedText;
  status: CapabilityItem['status'];
  description: LocalizedText;
  icon: string;
  configurations: Record<Lang, string[]>;
  algorithms: Record<Lang, string[]>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const skillItems: SkillEntry[] = [
  {
    name: { en: 'Arbitrary Object Pick and Place', zh: '任意物品抓取放置' },
    category: { en: 'Manipulation', zh: '操作技能' },
    status: 'integrating',
    description: {
      en: 'Understands a target object from visual input, estimates a stable grasp pose, and completes closed-loop picking, transport, and placement.',
      zh: '从视觉输入中理解目标物品，估计稳定抓取位姿，并闭环完成抓取、搬运与指定位置放置。',
    },
    icon: '🫳',
    configurations: {
      en: ['PIPER'],
      zh: ['PIPER'],
    },
    algorithms: {
      en: ['YOLO / SAM', 'RGB-D Localization', 'Grasp Pose Estimation', 'Motion Planning'],
      zh: ['YOLO / SAM', 'RGB-D 定位', '抓取位姿估计', '运动规划'],
    },
  },
  {
    name: { en: 'LIBERO Benchmark', zh: 'LIBERO Benchmark' },
    category: { en: 'Benchmark', zh: '性能测评' },
    status: 'available',
    description: {
      en: 'Runs reproducible LIBERO evaluations across different embodied models and records comparable benchmark results.',
      zh: '支持不同模型的 LIBERO 测评，并记录可复现、可比较的基准结果。',
    },
    icon: '📊',
    configurations: {
      en: ['KAI-0.5', 'LingBot'],
      zh: ['KAI-0.5', 'LingBot'],
    },
    algorithms: {
      en: ['LIBERO'],
      zh: ['LIBERO'],
    },
  },
  {
    name: { en: 'RoboDojo Benchmark', zh: 'RoboDojo Benchmark' },
    category: { en: 'Benchmark', zh: '性能测评' },
    status: 'integrating',
    description: {
      en: 'RoboDojo evaluation workflow for standardized robot-policy testing and auditable result collection.',
      zh: '面向机器人策略标准化测试与可审计结果采集的 RoboDojo 测评流程。',
    },
    icon: '🥋',
    configurations: {
      en: [],
      zh: [],
    },
    algorithms: {
      en: ['RoboDojo'],
      zh: ['RoboDojo'],
    },
  },
  {
    name: { en: 'Natural-Language Robot Control', zh: '自然语言控制机器人' },
    category: { en: 'Robot Control', zh: '机器人控制' },
    status: 'available',
    description: {
      en: 'Turns natural-language goals into executable robot behaviors through activated Forge Skills and live robot tools.',
      zh: '通过已激活的 Forge Skill 与在线机器人工具，将自然语言目标转换为可执行的机器人行为。',
    },
    icon: '🤖',
    configurations: {
      en: ['PIPER', 'Zerith H1 PRO'],
      zh: ['PIPER', 'Zerith H1 PRO'],
    },
    algorithms: {
      en: ['Language Grounding', 'Task Planning', 'Forge Skill'],
      zh: ['语言目标解析', '任务规划', 'Forge Skill'],
    },
  },
];

export default function Skills() {
  const { lang } = useLang();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const copy = lang === 'zh'
    ? {
        label: '技能目录',
        title: '可复用的',
        highlight: '机器人技能',
        description: '覆盖机器人操作、自然语言控制与标准化测评的可复用技能，可组合感知、规划和运动控制能力完成真实任务。',
        countLabel: '项技能',
        categoryCountLabel: '技能类别',
        availableCountLabel: '已接入',
        availableLabel: '已接入',
        integratingLabel: '接入中',
        evaluatingLabel: '验证中',
        backLabel: '返回首页',
        searchPlaceholder: '搜索技能、构型或算法',
        categoryFilterLabel: '技能类别',
        statusFilterLabel: '接入状态',
        allLabel: '全部',
        resetLabel: '清空筛选',
        showingLabel: '显示',
        resultLabel: '项技能',
        emptyLabel: '没有找到匹配的技能',
        configurationsLabel: '适配构型',
        algorithmsLabel: '使用算法',
      }
    : {
        label: 'Skill Catalog',
        title: 'Reusable',
        highlight: 'robot skills',
        description: 'Reusable skills for robot manipulation, natural-language control, and standardized evaluation by composing perception, planning, and motion-control capabilities.',
        countLabel: 'skills',
        categoryCountLabel: 'skill categories',
        availableCountLabel: 'integrated',
        availableLabel: 'Integrated',
        integratingLabel: 'Integrating',
        evaluatingLabel: 'Validating',
        backLabel: 'Back to home',
        searchPlaceholder: 'Search skills, configurations, or algorithms',
        categoryFilterLabel: 'Skill Category',
        statusFilterLabel: 'Integration Status',
        allLabel: 'All',
        resetLabel: 'Reset filters',
        showingLabel: 'Showing',
        resultLabel: 'skills',
        emptyLabel: 'No matching skills found',
        configurationsLabel: 'Compatible Configurations',
        algorithmsLabel: 'Algorithms',
      };

  const items: CapabilityItem[] = skillItems.map((item) => ({
    name: item.name[lang],
    category: item.category[lang],
    status: item.status,
    description: item.description[lang],
    capabilities: [],
    icon: item.icon,
    tagGroups: [
      { label: copy.configurationsLabel, tags: item.configurations[lang] },
      { label: copy.algorithmsLabel, tags: item.algorithms[lang] },
    ].filter((group) => group.tags.length > 0),
  }));

  return <CapabilityCatalog {...copy} items={items} />;
}
