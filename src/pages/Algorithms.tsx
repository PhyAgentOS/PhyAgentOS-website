import { useEffect } from 'react';
import CapabilityCatalog, { type CapabilityItem } from '../components/layout/CapabilityCatalog';
import { useLang } from '../i18n/LanguageContext';
import type { Lang } from '../i18n/translations';

interface LocalizedText {
  en: string;
  zh: string;
}

interface AlgorithmEntry {
  name: LocalizedText;
  category: LocalizedText;
  status: CapabilityItem['status'];
  description: LocalizedText;
  capabilities: Record<Lang, string[]>;
}

// Add or remove entries here. The Hero algorithm count is derived from this array.
// eslint-disable-next-line react-refresh/only-export-components
export const algorithmItems: AlgorithmEntry[] = [
  {
    name: { en: 'Pi05', zh: 'Pi05' },
    category: { en: 'Manipulation', zh: 'Manipulation' },
    status: 'available',
    description: {
      en: 'Physical Intelligence π0.5 vision-language-action model for generalist robot manipulation across diverse embodiments.',
      zh: 'Physical Intelligence π0.5 视觉-语言-动作模型，面向跨构型的通用机器人操作任务。',
    },
    capabilities: {
      en: ['Vision-language-action', 'Cross-embodiment control', 'Generalist manipulation'],
      zh: ['视觉-语言-动作', '跨构型控制', '通用操作'],
    },
  },
  {
    name: { en: 'MolmoAct2', zh: 'MolmoAct2' },
    category: { en: 'Manipulation', zh: 'Manipulation' },
    status: 'evaluating',
    description: {
      en: 'Open multimodal action model that grounds language and vision into executable robot actions for manipulation tasks.',
      zh: '开放多模态动作模型，将语言与视觉 grounding 到可执行的机器人操作动作。',
    },
    capabilities: {
      en: ['Multimodal grounding', 'Action generation', 'Open-weight VLA'],
      zh: ['多模态 grounding', '动作生成', '开放权重 VLA'],
    },
  },
  {
    name: { en: 'SmolVLA', zh: 'SmolVLA' },
    category: { en: 'Manipulation', zh: 'Manipulation' },
    status: 'evaluating',
    description: {
      en: 'Compact vision-language-action policy designed for efficient on-device or edge deployment in manipulation workflows.',
      zh: '轻量视觉-语言-动作策略，面向操作任务中的高效端侧或边缘部署。',
    },
    capabilities: {
      en: ['Lightweight VLA', 'Efficient inference', 'Manipulation policies'],
      zh: ['轻量 VLA', '高效推理', '操作策略'],
    },
  },
  {
    name: { en: 'XVLA', zh: 'XVLA' },
    category: { en: 'Manipulation', zh: 'Manipulation' },
    status: 'evaluating',
    description: {
      en: 'Cross-embodiment vision-language-action model for transferring manipulation skills across robot platforms.',
      zh: '跨构型视觉-语言-动作模型，支持操作技能在不同机器人平台间迁移。',
    },
    capabilities: {
      en: ['Cross-embodiment VLA', 'Skill transfer', 'Language-conditioned control'],
      zh: ['跨构型 VLA', '技能迁移', '语言条件控制'],
    },
  },
  {
    name: { en: 'GR00T N1.7', zh: 'GR00T N1.7' },
    category: { en: 'Locomotion', zh: 'Locomotion' },
    status: 'evaluating',
    description: {
      en: 'NVIDIA Isaac GR00T N1.7 foundation model for humanoid robots, spanning whole-body locomotion and embodied control.',
      zh: 'NVIDIA Isaac GR00T N1.7 人形机器人基础模型，覆盖全身运动与具身控制。',
    },
    capabilities: {
      en: ['Humanoid foundation model', 'Whole-body control', 'Locomotion policies'],
      zh: ['人形基础模型', '全身控制', '运动策略'],
    },
  },
  {
    name: { en: 'WALL-OSS', zh: 'WALL-OSS' },
    category: { en: 'Manipulation', zh: 'Manipulation' },
    status: 'evaluating',
    description: {
      en: 'Open-source WALL-series vision-language-action stack for building and evaluating robot manipulation agents.',
      zh: '开源 WALL 系列视觉-语言-动作栈，用于构建与评估机器人操作智能体。',
    },
    capabilities: {
      en: ['Open-source VLA', 'Manipulation agents', 'Policy evaluation'],
      zh: ['开源 VLA', '操作智能体', '策略评估'],
    },
  },
  {
    name: { en: 'Pi0', zh: 'Pi0' },
    category: { en: 'Manipulation', zh: 'Manipulation' },
    status: 'evaluating',
    description: {
      en: 'Physical Intelligence π0 generalist robot policy that maps multimodal observations and language to continuous actions.',
      zh: 'Physical Intelligence π0 通用机器人策略，将多模态观测与语言映射为连续动作。',
    },
    capabilities: {
      en: ['Generalist robot policy', 'Multimodal conditioning', 'Continuous action control'],
      zh: ['通用机器人策略', '多模态条件化', '连续动作控制'],
    },
  },
  {
    name: { en: 'Pi0Fast', zh: 'Pi0Fast' },
    category: { en: 'Manipulation', zh: 'Manipulation' },
    status: 'evaluating',
    description: {
      en: 'FAST-tokenized variant of π0 that accelerates action generation for responsive vision-language-action control.',
      zh: 'π0 的 FAST 动作分词变体，加速动作生成以提升视觉-语言-动作控制响应速度。',
    },
    capabilities: {
      en: ['FAST action tokens', 'Low-latency VLA', 'Responsive manipulation'],
      zh: ['FAST 动作分词', '低延迟 VLA', '高响应操作'],
    },
  },
  {
    name: { en: 'EO-1', zh: 'EO-1' },
    category: { en: 'Manipulation', zh: 'Manipulation' },
    status: 'evaluating',
    description: {
      en: 'Embodied foundation model focused on language-conditioned manipulation and multi-task robot control.',
      zh: '具身基础模型，面向语言条件操作与多任务机器人控制。',
    },
    capabilities: {
      en: ['Embodied foundation model', 'Language-conditioned actions', 'Multi-task control'],
      zh: ['具身基础模型', '语言条件动作', '多任务控制'],
    },
  },
  {
    name: { en: 'EVO1', zh: 'EVO1' },
    category: { en: 'Manipulation', zh: 'Manipulation' },
    status: 'evaluating',
    description: {
      en: 'Evolving vision-action policy family for continual improvement on manipulation benchmarks and real-robot tasks.',
      zh: '可演进的视觉-动作策略系列，面向操作基准与真机任务的持续提升。',
    },
    capabilities: {
      en: ['Vision-action policy', 'Continual improvement', 'Benchmark & real-robot transfer'],
      zh: ['视觉-动作策略', '持续改进', '基准与真机迁移'],
    },
  },
  {
    name: { en: 'VLA-JEPA', zh: 'VLA-JEPA' },
    category: { en: 'Manipulation', zh: 'Manipulation' },
    status: 'available',
    description: {
      en: 'Vision-language-action model combined with JEPA-style predictive representations for robust manipulation planning.',
      zh: '结合 JEPA 式预测表征的视觉-语言-动作模型，提升操作规划鲁棒性。',
    },
    capabilities: {
      en: ['VLA + JEPA', 'Predictive representations', 'Robust manipulation'],
      zh: ['VLA + JEPA', '预测表征', '鲁棒操作'],
    },
  },
  {
    name: { en: 'LingBot-VA', zh: 'LingBot-VA' },
    category: { en: 'Manipulation', zh: 'Manipulation' },
    status: 'evaluating',
    description: {
      en: 'Vision-action robot policy that couples perception with language-guided manipulation for interactive tasks.',
      zh: '视觉-动作机器人策略，将感知与语言引导操作结合，面向交互式任务。',
    },
    capabilities: {
      en: ['Vision-action coupling', 'Language-guided manipulation', 'Interactive control'],
      zh: ['视觉-动作耦合', '语言引导操作', '交互式控制'],
    },
  },
  {
    name: { en: 'FastWAM', zh: 'FastWAM' },
    category: { en: 'Motion Control', zh: 'Motion Control' },
    status: 'evaluating',
    description: {
      en: 'Fast whole-arm motion controller for generating smooth, high-frequency trajectories on manipulator arms.',
      zh: '快速整臂运动控制器，为机械臂生成平滑、高频的运动轨迹。',
    },
    capabilities: {
      en: ['Whole-arm motion', 'High-frequency control', 'Trajectory generation'],
      zh: ['整臂运动', '高频控制', '轨迹生成'],
    },
  },
  {
    name: { en: 'DreamZero', zh: 'DreamZero' },
    category: { en: 'Manipulation', zh: 'Manipulation' },
    status: 'evaluating',
    description: {
      en: 'World-model style policy stack with official LeRobot format support for training and deploying manipulation agents.',
      zh: '世界模型风格的策略栈，官方支持 LeRobot 格式，便于训练与部署操作智能体。',
    },
    capabilities: {
      en: ['World-model policy', 'Official LeRobot format', 'Manipulation training & deploy'],
      zh: ['世界模型策略', '官方支持 LeRobot 格式', '操作训练与部署'],
    },
  },
  {
    name: { en: 'SAM3', zh: 'SAM3' },
    category: { en: 'Perception', zh: 'Perception' },
    status: 'available',
    description: {
      en: 'Meta Segment Anything Model 3 for promptable segmentation and fine-grained object understanding in robot perception.',
      zh: 'Meta Segment Anything Model 3，面向机器人感知中的提示式分割与精细目标理解。',
    },
    capabilities: {
      en: ['Promptable segmentation', 'Fine-grained masks', 'Vision foundation model'],
      zh: ['提示式分割', '精细掩码', '视觉基础模型'],
    },
  },
  {
    name: { en: 'YOLO', zh: 'YOLO' },
    category: { en: 'Perception', zh: 'Perception' },
    status: 'available',
    description: {
      en: 'Ultralytics YOLO real-time object detection for efficient localization of objects in robot camera streams.',
      zh: 'Ultralytics YOLO 实时目标检测，为机器人相机流提供高效目标定位。',
    },
    capabilities: {
      en: ['Real-time detection', 'Multi-class localization', 'Camera-stream perception'],
      zh: ['实时检测', '多类别定位', '相机流感知'],
    },
  },
  {
    name: { en: 'ACT', zh: 'ACT' },
    category: { en: 'Manipulation', zh: 'Manipulation' },
    status: 'available',
    description: {
      en: 'Action Chunking with Transformers imitation-learning policy for precise bimanual and tabletop manipulation.',
      zh: 'Action Chunking with Transformers 模仿学习策略，面向精确双臂与桌面操作。',
    },
    capabilities: {
      en: ['Action chunking', 'Imitation learning', 'Bimanual / tabletop manipulation'],
      zh: ['动作分块', '模仿学习', '双臂 / 桌面操作'],
    },
  },
  {
    name: { en: 'Diffusion Policy', zh: 'Diffusion Policy' },
    category: { en: 'Motion Control', zh: 'Motion Control' },
    status: 'evaluating',
    description: {
      en: 'Diffusion-based visuomotor policy that generates smooth action sequences for contact-rich robot motion control.',
      zh: '基于扩散的视觉运动策略，生成平滑动作序列，面向接触丰富的机器人运动控制。',
    },
    capabilities: {
      en: ['Diffusion visuomotor policy', 'Smooth action sequences', 'Contact-rich control'],
      zh: ['扩散视觉运动策略', '平滑动作序列', '接触丰富控制'],
    },
  },
  {
    name: { en: 'VQ-BeT', zh: 'VQ-BeT' },
    category: { en: 'Motion Control', zh: 'Motion Control' },
    status: 'evaluating',
    description: {
      en: 'Vector-quantized Behavior Transformer for multimodal action distributions in robot motion and skill execution.',
      zh: '向量量化 Behavior Transformer，建模机器人运动与技能执行中的多模态动作分布。',
    },
    capabilities: {
      en: ['Behavior Transformer', 'Vector-quantized actions', 'Multimodal motion skills'],
      zh: ['Behavior Transformer', '向量量化动作', '多模态运动技能'],
    },
  },
  {
    name: { en: 'Multitask DiT Policy', zh: 'Multitask DiT Policy' },
    category: { en: 'Manipulation', zh: 'Manipulation' },
    status: 'evaluating',
    description: {
      en: 'Diffusion Transformer policy trained across multiple manipulation tasks for shared visuomotor representations.',
      zh: '跨多操作任务训练的 Diffusion Transformer 策略，共享视觉运动表征。',
    },
    capabilities: {
      en: ['Diffusion Transformer', 'Multi-task learning', 'Shared visuomotor features'],
      zh: ['Diffusion Transformer', '多任务学习', '共享视觉运动特征'],
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
        description: '当前正在接入、评估或已经可用的 Perception、Manipulation、Locomotion 与 Motion Control 算法。框架仍在演进，新算法可直接在本页面的数据列表中维护。',
        countLabel: '项算法与工具',
        categoryCountLabel: '算法类别',
        availableCountLabel: '已接入',
        availableLabel: '已接入',
        evaluatingLabel: '评估中',
        backLabel: '返回首页',
        searchPlaceholder: '搜索算法名称、描述或能力',
        categoryFilterLabel: '算法类别',
        statusFilterLabel: '接入状态',
        allLabel: '全部',
        resetLabel: '清空筛选',
        showingLabel: '显示',
        resultLabel: '项算法与工具',
        emptyLabel: '没有找到匹配的算法',
      }
    : {
        label: 'Algorithm Catalog',
        title: 'An evolving collection of',
        highlight: 'algorithms and tools',
        description: 'Perception, Manipulation, Locomotion, and Motion Control algorithms that are integrated or under active evaluation. Add future entries directly to this page catalog.',
        countLabel: 'algorithms and tools',
        categoryCountLabel: 'algorithm categories',
        availableCountLabel: 'available',
        availableLabel: 'Available',
        evaluatingLabel: 'Evaluating',
        backLabel: 'Back to home',
        searchPlaceholder: 'Search algorithm names, descriptions, or capabilities',
        categoryFilterLabel: 'Algorithm Category',
        statusFilterLabel: 'Integration Status',
        allLabel: 'All',
        resetLabel: 'Reset filters',
        showingLabel: 'Showing',
        resultLabel: 'algorithms and tools',
        emptyLabel: 'No matching algorithms found',
      };

  const items: CapabilityItem[] = algorithmItems.map((item) => ({
    name: item.name[lang],
    category: item.category[lang],
    status: item.status,
    description: item.description[lang],
    capabilities: item.capabilities[lang],
  }));

  return <CapabilityCatalog {...copy} items={items} />;
}
