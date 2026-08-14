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
    name: { en: 'Shelf Grasp YOLO Pipeline', zh: 'Shelf Grasp YOLO Pipeline' },
    category: { en: 'VLA', zh: 'VLA' },
    status: 'available',
    description: {
      en: 'An intelligent shelf-grasping system powered by a Piper arm and Orbbec RGB-D camera, using YOLO object detection for object localization and grasp execution.',
      zh: '基于 Piper 机械臂与 Orbbec RGB-D 相机的智能货架抓取系统，结合 YOLO 目标检测完成物体定位与抓取流程。',
    },
    capabilities: {
      en: ['Dora policy integration package', 'YOLO object detection', 'Grasp pose estimation'],
      zh: ['Dora 策略集成包', 'YOLO 目标检测', '抓取位姿估计'],
    },
  },
  {
    name: { en: 'Policy Orchestrator Core', zh: 'Policy Orchestrator Core' },
    category: { en: 'Control', zh: '控制' },
    status: 'available',
    description: {
      en: 'A shared policy orchestration core library that provides a unified runtime framework, interface management, and module scheduling for robot task policies.',
      zh: '共享策略编排核心库，为机器人任务策略提供统一运行框架、接口管理和模块调度能力。',
    },
    capabilities: {
      en: ['Dora policy integration package', 'Policy orchestration', 'Module lifecycle management'],
      zh: ['Dora 策略集成包', '策略编排调度', '模块生命周期管理'],
    },
  },
  {
    name: { en: 'LLM Action Planner', zh: 'LLM Action Planner' },
    category: { en: 'VLA', zh: 'VLA' },
    status: 'available',
    description: {
      en: 'Converts natural-language tasks into structured, executable action commands for robots using large language models for high-level task planning.',
      zh: '利用大语言模型将自然语言任务转换为机器人可执行的结构化动作指令，实现高层任务规划。',
    },
    capabilities: {
      en: ['Dora policy integration package', 'Natural-language understanding', 'Structured command generation'],
      zh: ['Dora 策略集成包', '自然语言理解', '结构化指令生成'],
    },
  },
  {
    name: { en: 'Speech Recognition', zh: 'Speech Recognition' },
    category: { en: 'Perception', zh: '感知' },
    status: 'available',
    description: {
      en: 'A microphone-based speech recognition module that converts real-time speech to text, providing voice capability for robot interaction tasks.',
      zh: '基于麦克风输入的语音识别模块，将实时语音转换为文本，为机器人交互任务提供语音能力。',
    },
    capabilities: {
      en: ['Dora policy integration package', 'Real-time audio capture', 'Speech-to-text conversion'],
      zh: ['Dora 策略集成包', '实时语音采集', '语音转文本'],
    },
  },
  {
    name: { en: 'QR Code Tracker', zh: 'QR Code Tracker' },
    category: { en: 'Perception', zh: '感知' },
    status: 'available',
    description: {
      en: 'A robot QR code recognition module that uses visual detection and multi-frame fusion to reliably identify workstations, materials, and task markers.',
      zh: '机器人二维码识别模块，通过视觉检测和多帧融合稳定识别工位、物料和任务标识。',
    },
    capabilities: {
      en: ['Dora policy integration package', 'QR code detection', 'Multi-frame fusion'],
      zh: ['Dora 策略集成包', '二维码检测', '多帧融合识别'],
    },
  },
  {
    name: { en: 'Human Safety Monitor', zh: 'Human Safety Monitor' },
    category: { en: 'Perception', zh: '感知' },
    status: 'available',
    description: {
      en: 'An embodied safety detection module that visually senses human presence in work areas and dynamically adjusts robot safety policies.',
      zh: '具身智能安全检测模块，通过视觉感知人体进入工作区域，并动态调整机器人运行安全策略。',
    },
    capabilities: {
      en: ['Dora policy integration package', 'Human presence detection', 'Dynamic safety policy'],
      zh: ['Dora 策略集成包', '人体检测', '动态安全策略'],
    },
  },
  {
    name: { en: 'Object Counter', zh: 'Object Counter' },
    category: { en: 'Perception', zh: '感知' },
    status: 'available',
    description: {
      en: 'An open-vocabulary object detection module based on YOLO-World for object recognition, counting, and position analysis in camera feeds.',
      zh: '基于 YOLO-World 的开放词汇目标检测模块，实现摄像头画面中的目标识别、计数和位置分析。',
    },
    capabilities: {
      en: ['Dora policy integration package', 'Open-vocabulary detection', 'Object counting & localization'],
      zh: ['Dora 策略集成包', '开放词汇检测', '目标计数与定位'],
    },
  },
  {
    name: { en: 'Fruit Detector', zh: 'Fruit Detector' },
    category: { en: 'Perception', zh: '感知' },
    status: 'available',
    description: {
      en: 'A vision-based fruit detection module that identifies fruit categories from camera images and outputs target positions.',
      zh: '基于视觉模型的水果检测模块，从摄像头图像中识别水果类别并输出目标位置。',
    },
    capabilities: {
      en: ['Dora policy integration package', 'Fruit classification', 'Real-time visual recognition'],
      zh: ['Dora 策略集成包', '水果分类', '实时视觉识别'],
    },
  },
  {
    name: { en: 'YOLO Object Detector', zh: 'YOLO Object Detector' },
    category: { en: 'Perception', zh: '感知' },
    status: 'available',
    description: {
      en: 'A real-time object detection module based on Ultralytics YOLO, providing efficient object localization for robot vision tasks.',
      zh: '基于 Ultralytics YOLO 的实时目标检测模块，为机器人视觉任务提供高效目标定位能力。',
    },
    capabilities: {
      en: ['Dora policy integration package', 'Real-time detection', 'Multi-class localization'],
      zh: ['Dora 策略集成包', '实时检测', '多类别定位'],
    },
  },
  {
    name: { en: 'Hand Teleoperation Controller', zh: 'Hand Teleoperation Controller' },
    category: { en: 'Control', zh: '控制' },
    status: 'available',
    description: {
      en: 'A hand teleoperation system using MediaPipe hand keypoints and DexPilot algorithms to convert gestures into robot joint control commands.',
      zh: '基于 MediaPipe 手部关键点和 DexPilot 算法的人手遥操作系统，将手势转换为机器人关节控制指令。',
    },
    capabilities: {
      en: ['Dora policy integration package', 'Hand keypoint detection', 'Joint control mapping'],
      zh: ['Dora 策略集成包', '手部关键点检测', '关节控制映射'],
    },
  },
  {
    name: { en: 'Face Detection Module', zh: 'Face Detection Module' },
    category: { en: 'Perception', zh: '感知' },
    status: 'available',
    description: {
      en: 'An OpenCV-based face detection module that recognizes faces from robot camera input and outputs visual analysis results.',
      zh: '基于 OpenCV 的人脸检测模块，从机器人摄像头输入中识别人脸并输出视觉分析结果。',
    },
    capabilities: {
      en: ['Dora policy integration package', 'Face detection', 'Visual analysis output'],
      zh: ['Dora 策略集成包', '人脸检测', '视觉分析输出'],
    },
  },
  {
    name: { en: 'SAM3 Grasp Pipeline', zh: 'SAM3 Grasp Pipeline' },
    category: { en: 'VLA', zh: 'VLA' },
    status: 'available',
    description: {
      en: 'An intelligent grasping system combining SAM3 segmentation, Piper arm, and RGB-D camera for object understanding and autonomous grasping.',
      zh: '结合 SAM3 分割模型、Piper 机械臂和 RGB-D 相机的智能抓取系统，实现目标理解与自动抓取。',
    },
    capabilities: {
      en: ['Dora policy integration package', 'SAM3 segmentation', 'Grasp planning'],
      zh: ['Dora 策略集成包', 'SAM3 分割', '抓取规划'],
    },
  },
  {
    name: { en: 'SAM3 Object Detection', zh: 'SAM3 Object Detection' },
    category: { en: 'Perception', zh: '感知' },
    status: 'available',
    description: {
      en: 'A SAM3-based vision perception module for prompt-driven segmentation, object detection, and fine-grained region understanding.',
      zh: '基于 SAM3 的视觉感知模块，通过提示式分割实现目标检测和精细区域理解。',
    },
    capabilities: {
      en: ['Perception detection capability', 'Prompt-based segmentation', 'Fine-grained region understanding'],
      zh: ['感知检测能力', '提示式分割', '精细区域理解'],
    },
  },
  {
    name: { en: 'YOLO RGB Detection', zh: 'YOLO RGB Detection' },
    category: { en: 'Perception', zh: '感知' },
    status: 'available',
    description: {
      en: 'A YOLO-based RGB object detection module providing real-time object localization capabilities for robots.',
      zh: '基于 YOLO 的 RGB 图像目标检测模块，为机器人提供实时物体定位能力。',
    },
    capabilities: {
      en: ['Perception detection capability', 'RGB object detection', 'Real-time localization'],
      zh: ['感知检测能力', 'RGB 目标检测', '实时定位'],
    },
  },
  {
    name: { en: 'LeRobot Policy Runner', zh: 'LeRobot Policy Runner' },
    category: { en: 'RL', zh: 'RL' },
    status: 'available',
    description: {
      en: 'Converts robot learning policies to the LeRobot format and supports online inference execution and task deployment.',
      zh: '将机器人学习策略转换为 LeRobot 格式，并支持在线推理执行与任务部署。',
    },
    capabilities: {
      en: ['Embodied policy runtime', 'Policy format conversion', 'Online inference execution'],
      zh: ['具身策略运行时', '策略格式转换', '在线推理执行'],
    },
  },
  {
    name: { en: 'PyBullet Motion Solver', zh: 'PyBullet Motion Solver' },
    category: { en: 'Control', zh: '控制' },
    status: 'available',
    description: {
      en: 'A PyBullet simulation-based robot motion planning module for arm kinematics solving and trajectory generation.',
      zh: '基于 PyBullet 仿真的机器人运动规划模块，实现机械臂运动学求解和动作生成。',
    },
    capabilities: {
      en: ['Robot motion generation', 'Kinematics solving', 'Trajectory generation'],
      zh: ['机器人运动生成', '运动学求解', '轨迹生成'],
    },
  },
  {
    name: { en: 'Heuristic Task Planner', zh: 'Heuristic Task Planner' },
    category: { en: 'Planning', zh: '规划' },
    status: 'available',
    description: {
      en: 'A rule-based and heuristic task planning module that decomposes target tasks into executable execution steps.',
      zh: '基于规则和启发式算法的机器人任务规划模块，将目标任务转换为执行步骤。',
    },
    capabilities: {
      en: ['Task-to-action planning', 'Heuristic search', 'Task decomposition'],
      zh: ['任务到动作规划', '启发式搜索', '任务分解'],
    },
  },
  {
    name: { en: 'Whisper Speech Recognizer', zh: 'Whisper Speech Recognizer' },
    category: { en: 'Perception', zh: '感知' },
    status: 'available',
    description: {
      en: 'An offline speech recognition module based on Faster Whisper that converts robot-captured audio into text commands.',
      zh: '基于 Faster Whisper 的离线语音识别模块，将机器人采集的音频转换为文本指令。',
    },
    capabilities: {
      en: ['Speech-to-text interface', 'Offline speech recognition', 'Low-latency inference'],
      zh: ['语音转文本接口', '离线语音识别', '低延迟推理'],
    },
  },
  {
    name: { en: 'Piper Text To Speech', zh: 'Piper Text To Speech' },
    category: { en: 'Interaction', zh: '交互' },
    status: 'available',
    description: {
      en: 'An offline speech synthesis module using the Piper local TTS model for natural voice output on robots.',
      zh: '基于 Piper 本地语音模型的离线语音合成模块，实现机器人自然语音输出。',
    },
    capabilities: {
      en: ['Offline speech output', 'Offline speech synthesis', 'Natural voice output'],
      zh: ['离线语音输出', '离线语音合成', '自然语音输出'],
    },
  },
  {
    name: { en: 'VR Teleoperation Policy', zh: 'VR Teleoperation Policy' },
    category: { en: 'Control', zh: '控制' },
    status: 'available',
    description: {
      en: 'A universal VR teleoperation policy module that converts headset and controller inputs into robot motion control signals.',
      zh: '通用 VR 遥操作策略模块，将头显和控制设备输入转换为机器人运动控制信号。',
    },
    capabilities: {
      en: ['Human-in-the-loop control', 'VR device integration', 'Real-time motion mapping'],
      zh: ['人在环遥操作控制', 'VR 设备接入', '实时运动映射'],
    },
  },
  {
    name: { en: 'RGB-D 3D Localizer', zh: 'RGBD 3D Localizer' },
    category: { en: 'Perception', zh: '感知' },
    status: 'available',
    description: {
      en: 'Fuses RGB detection results with depth information to recover 3D positions of visual targets for robot perception.',
      zh: '融合 RGB 检测结果和深度信息，实现机器人视觉目标的三维位置恢复。',
    },
    capabilities: {
      en: ['RGB-D and segmentation perception', 'RGB-D fusion', '3D position recovery'],
      zh: ['RGB-D 与分割感知', 'RGB-D 融合', '三维位置恢复'],
    },
  },
  {
    name: { en: 'SAM Segmentation Perception', zh: 'SAM Segmentation Perception' },
    category: { en: 'Perception', zh: '感知' },
    status: 'available',
    description: {
      en: 'A SAM3-based continuous vision segmentation module that generates target segmentation masks and detection info from text prompts.',
      zh: '基于 SAM3 的连续视觉分割模块，根据文本提示生成目标分割结果和检测信息。',
    },
    capabilities: {
      en: ['RGB-D and segmentation perception', 'Text-prompted segmentation', 'Continuous visual tracking'],
      zh: ['RGB-D 与分割感知', '文本提示分割', '连续视觉跟踪'],
    },
  },
  {
    name: { en: 'YOLO Visual Perception', zh: 'YOLO Visual Perception' },
    category: { en: 'Perception', zh: '感知' },
    status: 'available',
    description: {
      en: 'An Ultralytics YOLO-based robot vision perception module supporting detection, segmentation, pose estimation, and tracking.',
      zh: '基于 Ultralytics YOLO 的机器人视觉感知模块，支持目标检测、分割、姿态估计和跟踪。',
    },
    capabilities: {
      en: ['RGB-D and segmentation perception', 'Detection & segmentation', 'Pose estimation & tracking'],
      zh: ['RGB-D 与分割感知', '目标检测与分割', '姿态估计与跟踪'],
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
        description: 'VLA, world-model, perception, and planning algorithms that are integrated or under active evaluation. Add future entries directly to this page catalog.',
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
