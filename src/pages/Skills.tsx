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
    status: 'available',
    description: {
      en: 'Understands a target object from visual input, estimates a stable grasp pose, and completes closed-loop picking, transport, and placement.',
      zh: '从视觉输入中理解目标物品，估计稳定抓取位姿，并闭环完成抓取、搬运与指定位置放置。',
    },
    icon: '🫳',
    configurations: {
      en: ['Unitree Go2', 'Astra Pro'],
      zh: ['Unitree Go2', 'Astra Pro'],
    },
    algorithms: {
      en: ['YOLO / SAM', 'RGB-D Localization', 'Grasp Pose Estimation', 'Motion Planning'],
      zh: ['YOLO / SAM', 'RGB-D 定位', '抓取位姿估计', '运动规划'],
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
        description: '面向不同机器人构型复用的高层操作技能，可组合感知、抓取规划与运动控制算法完成真实任务。',
        countLabel: '项技能',
        categoryCountLabel: '技能类别',
        availableCountLabel: '已可用',
        availableLabel: '可用',
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
        description: 'High-level manipulation skills reusable across robot configurations by composing perception, grasp planning, and motion control algorithms.',
        countLabel: 'skills',
        categoryCountLabel: 'skill categories',
        availableCountLabel: 'available',
        availableLabel: 'Available',
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
    ],
  }));

  return <CapabilityCatalog {...copy} items={items} />;
}
