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
  capabilities: Record<Lang, string[]>;
}

// Add or remove entries here. The Hero skill count is derived from this array.
// eslint-disable-next-line react-refresh/only-export-components
export const skillItems: SkillEntry[] = [
  {
    name: { en: 'Benchmark Evaluation & Reporting', zh: 'Benchmark 评测与报告' },
    category: { en: 'Evaluation', zh: '评测' },
    status: 'available',
    description: {
      en: 'Runs benchmark tasks through a standardized Session workflow and produces traceable evaluation results.',
      zh: '通过标准化 Session 流程执行 benchmark 任务，并产出可追踪的评测结果。',
    },
    capabilities: {
      en: ['Task batch execution', 'Metric aggregation', 'Auditable report output'],
      zh: ['任务批量执行', '指标汇总', '可审计报告产出'],
    },
  },
  {
    name: { en: 'Closed-Loop Failure Recovery', zh: '闭环失败恢复重试' },
    category: { en: 'Recovery', zh: '恢复' },
    status: 'available',
    description: {
      en: 'Detects failed execution, preserves evidence, adjusts the next attempt, and retries through the same Session.',
      zh: '检测执行失败、保留证据、调整下一次尝试，并在同一 Session 中闭环重试。',
    },
    capabilities: {
      en: ['Failure detection', 'Verifier-triggered retry', 'Recovery trace recording'],
      zh: ['失败检测', '验证器触发重试', '恢复轨迹记录'],
    },
  },
  {
    name: { en: 'Session Task Orchestration', zh: 'Session 任务编排' },
    category: { en: 'Runtime', zh: 'Runtime' },
    status: 'available',
    description: {
      en: 'Turns goals into structured sessions and coordinates agents, policies, tools, and target adapters.',
      zh: '将目标转换为结构化会话，并协调 Agent、策略、工具与 Target Adapter。',
    },
    capabilities: {
      en: ['Task lifecycle management', 'Agent-policy coordination', 'Target dispatch'],
      zh: ['任务生命周期管理', 'Agent 与策略协调', '目标调度'],
    },
  },
  {
    name: { en: 'Semantic Verification', zh: '语义验证' },
    category: { en: 'Verification', zh: '验证' },
    status: 'available',
    description: {
      en: 'Evaluates whether execution outcomes satisfy task intent instead of relying only on low-level completion signals.',
      zh: '判断执行结果是否满足任务意图，而不是仅依赖底层完成信号。',
    },
    capabilities: {
      en: ['Outcome interpretation', 'Task success judgment', 'Retry decision support'],
      zh: ['结果语义理解', '任务成功判断', '重试决策支持'],
    },
  },
  {
    name: { en: 'Evidence & Audit Trail', zh: '证据与审计轨迹' },
    category: { en: 'Observability', zh: '可观测性' },
    status: 'available',
    description: {
      en: 'Records commands, runtime events, verification outcomes, and recovery history for reproducible analysis.',
      zh: '记录指令、运行事件、验证结果与恢复历史，用于复现和分析。',
    },
    capabilities: {
      en: ['Structured event logging', 'Execution evidence capture', 'Session replay context'],
      zh: ['结构化事件日志', '执行证据采集', 'Session 回放上下文'],
    },
  },
  {
    name: { en: 'Cross-Target Deployment', zh: '跨目标部署' },
    category: { en: 'Deployment', zh: '部署' },
    status: 'available',
    description: {
      en: 'Uses a consistent adapter protocol to move workflows across games, simulation benchmarks, and real robots.',
      zh: '通过一致的适配协议，将工作流部署到游戏、仿真评测和真实机器人。',
    },
    capabilities: {
      en: ['Target adapter registration', 'Environment configuration', 'Unified command path'],
      zh: ['Target Adapter 注册', '环境配置', '统一指令链路'],
    },
  },
  {
    name: { en: 'Long-Term Lesson Reuse', zh: '长期经验复用' },
    category: { en: 'Self-Evolution', zh: '自进化' },
    status: 'evaluating',
    description: {
      en: 'Turns execution lessons and recovery experience into reusable context for future tasks and targets.',
      zh: '将执行经验与恢复过程沉淀为可复用上下文，为后续任务和目标提供参考。',
    },
    capabilities: {
      en: ['Lesson extraction', 'Cross-session reuse', 'Continuous workflow improvement'],
      zh: ['经验提取', '跨 Session 复用', '工作流持续改进'],
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
        title: '可组合的',
        highlight: '系统技能',
        description: 'PhyAgentOS 当前提供或正在验证的 Runtime 技能，包括 benchmark 评测报告、闭环失败恢复、语义验证与跨目标部署。后续技能可直接在本页面的数据列表中维护。',
        countLabel: '项系统技能',
        availableLabel: '可用',
        evaluatingLabel: '验证中',
        backLabel: '返回首页',
      }
    : {
        label: 'Skill Catalog',
        title: 'Composable',
        highlight: 'runtime skills',
        description: 'Runtime skills currently available or under validation, including benchmark reporting, closed-loop recovery, semantic verification, and cross-target deployment.',
        countLabel: 'runtime skills',
        availableLabel: 'Available',
        evaluatingLabel: 'Validating',
        backLabel: 'Back to home',
      };

  const items: CapabilityItem[] = skillItems.map((item) => ({
    name: item.name[lang],
    category: item.category[lang],
    status: item.status,
    description: item.description[lang],
    capabilities: item.capabilities[lang],
  }));

  return <CapabilityCatalog {...copy} items={items} />;
}
