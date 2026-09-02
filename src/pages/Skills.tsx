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
    name: { en: 'Natural-Language-Driven Robotic Arm', zh: '自然语言驱动机械臂' },
    category: { en: 'Atomic Skills', zh: '原子技能' },
    status: 'available',
    description: {
      en: 'Turns natural-language goals into executable tabletop manipulation actions for supported robotic arms.',
      zh: '将自然语言目标转换为机械臂可执行的桌面操作动作，完成指令理解、任务规划与控制。',
    },
    icon: '🦾',
    configurations: {
      en: ['PIPER', 'Franka', 'XLeRobot'],
      zh: ['PIPER', 'Franka', 'XLeRobot'],
    },
    algorithms: {
      en: ['Language Grounding', 'Task Planning', 'Target Adapter'],
      zh: ['语言目标解析', '任务规划', 'Target Adapter'],
    },
  },
  {
    name: { en: 'Natural-Language-Driven Legged Robot', zh: '自然语言驱动多足机器人' },
    category: { en: 'Atomic Skills', zh: '原子技能' },
    status: 'integrating',
    description: {
      en: 'Maps natural-language instructions to navigation and locomotion behaviors for legged robots.',
      zh: '将自然语言指令映射为多足机器人的导航与运动行为，支持复杂地形下的任务执行。',
    },
    icon: '🐕',
    configurations: {
      en: ['Unitree Go2'],
      zh: ['宇树 Go2'],
    },
    algorithms: {
      en: ['Language Grounding', 'Task Planning', 'Locomotion Control'],
      zh: ['语言目标解析', '任务规划', '运动控制'],
    },
  },
  {
    name: { en: 'Natural-Language-Driven Mobile Manipulator', zh: '自然语言驱动轮臂式机器人' },
    category: { en: 'Atomic Skills', zh: '原子技能' },
    status: 'integrating',
    description: {
      en: 'Coordinates mobile navigation and arm manipulation from a unified natural-language task description.',
      zh: '根据统一的自然语言任务描述，协同轮式底盘导航与机械臂操作。',
    },
    icon: '🛞',
    configurations: {
      en: ['Mobile Manipulator'],
      zh: ['轮臂式机器人'],
    },
    algorithms: {
      en: ['Language Grounding', 'Navigation', 'Whole-Body Planning'],
      zh: ['语言目标解析', '自主导航', '全身规划'],
    },
  },
  {
    name: { en: 'Natural-Language-Driven Humanoid Robot', zh: '自然语言驱动人形机器人' },
    category: { en: 'Atomic Skills', zh: '原子技能' },
    status: 'evaluating',
    description: {
      en: 'Decomposes natural-language goals into coordinated whole-body actions for humanoid robots.',
      zh: '将自然语言目标分解为人形机器人的全身协同动作，覆盖移动、交互与操作任务。',
    },
    icon: '🧍',
    configurations: {
      en: ['Humanoid Robot'],
      zh: ['人形机器人'],
    },
    algorithms: {
      en: ['Language Grounding', 'Whole-Body Planning', 'Balance Control'],
      zh: ['语言目标解析', '全身规划', '平衡控制'],
    },
  },
  {
    name: { en: 'Arbitrary Object Pick and Place', zh: '任意物品抓取放置' },
    category: { en: 'Atomic Skills', zh: '原子技能' },
    status: 'evaluating',
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
      en: ['YOLO / SAM3', 'RGB-D Localization', 'Grasp Pose Estimation', 'Motion Planning'],
      zh: ['YOLO / SAM3', 'RGB-D 定位', '抓取位姿估计', '运动规划'],
    },
  },
  {
    name: { en: 'LIBERO Automated Evaluation', zh: 'LIBERO 自动评测' },
    category: { en: 'Automated Evaluation', zh: '性能评测' },
    status: 'available',
    description: {
      en: 'Runs reproducible LIBERO evaluations across embodied models and records comparable benchmark results.',
      zh: '支持不同具身模型的 LIBERO 自动评测，并记录可复现、可比较的基准结果。',
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
    name: { en: 'RoboDojo Automated Evaluation', zh: 'RoboDojo 自动评测' },
    category: { en: 'Automated Evaluation', zh: '性能评测' },
    status: 'integrating',
    description: {
      en: 'Standardizes robot-policy testing in RoboDojo and collects auditable evaluation results.',
      zh: '在 RoboDojo 中标准化执行机器人策略测试，并采集可审计的自动评测结果。',
    },
    icon: '🥋',
    configurations: { en: [], zh: [] },
    algorithms: { en: ['RoboDojo'], zh: ['RoboDojo'] },
  },
  {
    name: { en: 'BEHAVIOR-1K Automated Evaluation', zh: 'BEHAVIOR-1K 自动评测' },
    category: { en: 'Automated Evaluation', zh: '性能评测' },
    status: 'evaluating',
    description: {
      en: 'Evaluates long-horizon household activities against the BEHAVIOR-1K task suite.',
      zh: '面向 BEHAVIOR-1K 任务集，对长程家庭活动的完成质量进行自动评测。',
    },
    icon: '🏠',
    configurations: { en: [], zh: [] },
    algorithms: { en: ['BEHAVIOR-1K'], zh: ['BEHAVIOR-1K'] },
  },
  {
    name: { en: 'CALVIN Automated Evaluation', zh: 'CALVIN 自动评测' },
    category: { en: 'Automated Evaluation', zh: '性能评测' },
    status: 'evaluating',
    description: {
      en: 'Measures language-conditioned manipulation performance on the CALVIN benchmark.',
      zh: '基于 CALVIN 基准自动衡量语言条件下的机器人连续操作能力。',
    },
    icon: '🧪',
    configurations: { en: [], zh: [] },
    algorithms: { en: ['CALVIN'], zh: ['CALVIN'] },
  },
  {
    name: { en: 'RoboCasa365 Automated Evaluation', zh: 'RoboCasa365 自动评测' },
    category: { en: 'Automated Evaluation', zh: '性能评测' },
    status: 'evaluating',
    description: {
      en: 'Evaluates generalization and task completion across diverse RoboCasa365 household scenes.',
      zh: '在 RoboCasa365 的多样化家庭场景中评测策略泛化性与任务完成效果。',
    },
    icon: '🍽️',
    configurations: { en: [], zh: [] },
    algorithms: { en: ['RoboCasa365'], zh: ['RoboCasa365'] },
  },
  {
    name: { en: 'Minecraft Automated Evaluation', zh: 'Minecraft 自动评测' },
    category: { en: 'Automated Evaluation', zh: '性能评测' },
    status: 'integrating',
    description: {
      en: 'Automatically evaluates exploration, resource collection, and long-horizon task execution in Minecraft.',
      zh: '自动评测智能体在 Minecraft 中的探索、资源收集与长程任务执行能力。',
    },
    icon: '⛏️',
    configurations: { en: ['Minecraft'], zh: ['Minecraft'] },
    algorithms: { en: ['Game Agent Evaluation'], zh: ['游戏智能体评测'] },
  },
  {
    name: { en: "Don't Starve Automated Evaluation", zh: "Don't Starve 自动评测" },
    category: { en: 'Automated Evaluation', zh: '性能评测' },
    status: 'integrating',
    description: {
      en: "Evaluates survival planning, resource management, and adaptive decision-making in Don't Starve.",
      zh: "评测智能体在 Don't Starve 中的生存规划、资源管理与自适应决策能力。",
    },
    icon: '🔥',
    configurations: { en: ["Don't Starve"], zh: ["Don't Starve"] },
    algorithms: { en: ['Game Agent Evaluation'], zh: ['游戏智能体评测'] },
  },
  {
    name: { en: 'Stardew Valley Automated Evaluation', zh: 'Stardew Valley 自动评测' },
    category: { en: 'Automated Evaluation', zh: '性能评测' },
    status: 'integrating',
    description: {
      en: 'Evaluates scheduling, tool use, and persistent long-horizon decision-making in Stardew Valley.',
      zh: '评测智能体在 Stardew Valley 中的日程规划、工具使用与持续长程决策能力。',
    },
    icon: '🌾',
    configurations: { en: ['Stardew Valley'], zh: ['Stardew Valley'] },
    algorithms: { en: ['Game Agent Evaluation'], zh: ['游戏智能体评测'] },
  },
  {
    name: { en: 'Desktop Object Sorting and Organization', zh: '桌面物品分类整理' },
    category: { en: 'Long-Horizon Capabilities', zh: '长程能力' },
    status: 'evaluating',
    description: {
      en: 'Perceives cluttered desktop objects, plans a multi-step sorting strategy, and organizes them by category.',
      zh: '感知杂乱桌面中的物品，规划多步骤分类策略，并持续完成抓取、搬运与归位。',
    },
    icon: '🗂️',
    configurations: { en: ['Desktop Arm'], zh: ['桌面机械臂'] },
    algorithms: {
      en: ['YOLO / SAM3', 'Task Planning', 'Grasp and Place'],
      zh: ['YOLO / SAM3', '任务规划', '抓取与放置'],
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
        description: '通过组合感知、规划与交互等基础算法与工具，构建可复用的原子技能、长程能力以及自动测评体系。',
        countLabel: '项技能',
        categoryCountLabel: '技能类别',
        availableCountLabel: '已接入',
        availableLabel: '已接入',
        integratingLabel: '接入中',
        evaluatingLabel: '待接入',
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
        description: 'By composing foundational perception, planning, and interaction algorithms and tools, we build reusable atomic skills, long-horizon capabilities, and automated evaluation systems.',
        countLabel: 'skills',
        categoryCountLabel: 'skill categories',
        availableCountLabel: 'integrated',
        availableLabel: 'Integrated',
        integratingLabel: 'Integrating',
        evaluatingLabel: 'Planned',
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
