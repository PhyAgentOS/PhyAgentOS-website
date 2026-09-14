import { useEffect } from 'react';
import CapabilityCatalog, { type CapabilityItem } from '../components/layout/CapabilityCatalog';
import { simulationEvaluationItems } from '../data/simulationEvaluations';
import { useLang } from '../i18n/LanguageContext';

export default function SimulationEvaluation() {
  const { lang } = useLang();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const copy = lang === 'zh'
    ? {
        label: '仿真测评',
        title: '所支持的',
        highlight: '仿真测评',
        description: '在机器人仿真与游戏场景中，自动评测不同模型的任务执行、迁移泛化与长程规划能力，记录可复现、可比较的基准结果。',
        countLabel: '项评测基准',
        categoryCountLabel: '评测类别',
        availableCountLabel: '已接入',
        availableLabel: '已接入',
        integratingLabel: '接入中',
        evaluatingLabel: '待接入',
        backLabel: '返回首页',
        searchPlaceholder: '搜索评测基准、模型或评测能力',
        categoryFilterLabel: '评测类别',
        statusFilterLabel: '接入状态',
        allLabel: '全部',
        resetLabel: '清空筛选',
        showingLabel: '显示',
        resultLabel: '项评测基准',
        emptyLabel: '没有找到匹配的评测基准',
        supportedModelsLabel: '支持模型',
      }
    : {
        label: 'Simulation Evaluation',
        title: 'Supported',
        highlight: 'simulation evaluations',
        description: 'Automatically evaluate task execution, transfer, generalization, and long-horizon planning across models in robotics simulations and game environments, with reproducible, comparable benchmark results.',
        countLabel: 'evaluation benchmarks',
        categoryCountLabel: 'evaluation categories',
        availableCountLabel: 'integrated',
        availableLabel: 'Integrated',
        integratingLabel: 'Integrating',
        evaluatingLabel: 'Planned',
        backLabel: 'Back to home',
        searchPlaceholder: 'Search benchmarks, models, or evaluation capabilities',
        categoryFilterLabel: 'Evaluation Category',
        statusFilterLabel: 'Integration Status',
        allLabel: 'All',
        resetLabel: 'Reset filters',
        showingLabel: 'Showing',
        resultLabel: 'evaluation benchmarks',
        emptyLabel: 'No matching evaluation benchmarks found',
        supportedModelsLabel: 'Supported Models',
      };

  const items: CapabilityItem[] = simulationEvaluationItems.map((item) => ({
    name: item.name[lang],
    category: item.category[lang],
    status: item.status,
    description: item.description[lang],
    capabilities: [],
    icon: item.icon,
    tagGroups: item.supportedModels.length > 0
      ? [{ label: copy.supportedModelsLabel, tags: item.supportedModels }]
      : undefined,
  }));

  return <CapabilityCatalog key={lang} {...copy} items={items} />;
}
