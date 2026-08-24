import { useEffect, useRef, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Trophy,
  Target,
  MapPin,
  RefreshCw,
  Shield,
  Plug,
  FileText,
  GitBranch,
  Puzzle,
  CheckCircle2,
  Zap,
  Video,
  MessageSquare,
  ChevronDown,
  ExternalLink,
  Github,
  Sparkles,
  BrainCircuit,
  Cpu,
} from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import ChallengeRecap from '../sections/home/ChallengeRecap';

gsap.registerPlugin(ScrollTrigger);

/* ───────── Pain Points ───────── */
const painPoints = [
  {
    pain: 'LLM directly controls hardware, errors hard to trace',
    solution: 'Cognitive-Physical Decoupling: Planner and HAL run independently, communicating transparently via ACTION.md',
  },
  {
    pain: 'Action failures cannot be learned from',
    solution: 'LESSONS.md experience library for automatic accumulation, enabling true self-evolution',
  },
  {
    pain: 'Debugging like a black box',
    solution: 'Markdown Protocol Matrix: all states readable and writable, extreme transparency',
  },
  {
    pain: 'No safety guarantees',
    solution: 'Critic Multi-Agent Verification: high-risk actions must validate against EMBODIED.md before execution',
  },
];

/* ───────── Directions ───────── */
const directions = [
  {
    icon: Target,
    title: 'Precision Manipulation',
    desc: 'Semantic grasping based on SAM3 / ReKep: "Put that red tool into the second drawer on the left"',
    color: 'from-amber-500/20 to-orange-600/20',
    border: 'border-amber-500/30',
    iconColor: 'text-amber-400',
  },
  {
    icon: MapPin,
    title: 'Semantic Navigation',
    desc: 'Scene-graph grounded natural language movement: "Go to the kitchen and find the cup that\'s still steaming"',
    color: 'from-cyan-500/20 to-blue-600/20',
    border: 'border-cyan-500/30',
    iconColor: 'text-cyan-400',
  },
  {
    icon: RefreshCw,
    title: 'Long-Horizon Tasks',
    desc: 'Complex action chains: "Help me prepare a cup of coffee" (complete SOP including opening, scooping, brewing, and recycling)',
    color: 'from-emerald-500/20 to-green-600/20',
    border: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
  },
  {
    icon: Shield,
    title: 'Safety Evolution',
    desc: 'Demonstrate how the Critic mechanism intercepts dangerous actions and writes correction experiences into LESSONS.md',
    color: 'from-rose-500/20 to-red-600/20',
    border: 'border-rose-500/30',
    iconColor: 'text-rose-400',
  },
  {
    icon: Plug,
    title: 'New Hardware Integration',
    desc: 'Write a hal/drivers/ plugin for your robot, enabling one-click PhyAgentOS takeover',
    color: 'from-violet-500/20 to-purple-600/20',
    border: 'border-violet-500/30',
    iconColor: 'text-violet-400',
  },
];

/* ───────── Tech Requirements ───────── */
const techReqs = [
  { label: 'Required', text: 'Use PhyAgentOS\'s hal_watchdog.py as the hardware execution layer (Track B)', required: true },
  { label: 'Required', text: 'Communicate between cognitive and physical layers via Markdown protocol files (ENVIRONMENT.md / ACTION.md)', required: true },
  { label: 'Bonus', text: 'Implement custom HAL driver plugins to integrate officially unsupported hardware', required: false },
  { label: 'Bonus', text: 'Design reusable SKILL.md workflows to accumulate successful experiences', required: false },
  { label: 'Bonus', text: 'Demonstrate Critic safety correction mechanisms or LESSONS.md failure experience accumulation', required: false },
];

/* ───────── Evaluation Criteria ───────── */
const evalCriteria = [
  { dim: 'Demo Showcase', weight: '40%', desc: 'On-site execution of the embodied task, fluency of the full chain from natural language to physical action, and stability of the system' },
  { dim: 'Documentation', weight: '30%', desc: 'Quality and completeness of SKILL.md (successful workflow), LESSONS.md (failure experiences), and technical write-up' },
  { dim: 'Creative Explanation', weight: '30%', desc: 'Clarity of the scenario motivation, originality of the idea, and insight into how PhyAgentOS\'s decoupled architecture was leveraged' },
];

/* ───────── Support ───────── */
const supports = [
  { icon: FileText, title: 'Integration Guide', desc: 'Official HAL driver templates + plugin development docs for quick hardware integration' },
  { icon: Cpu, title: 'Simulation Support', desc: 'Built-in lightweight simulation; validate logic without hardware' },
  { icon: MessageSquare, title: 'Q&A Channel', desc: 'GitHub Issues with dedicated tags, core maintainers responding online' },
  { icon: Plug, title: 'Hardware Reference', desc: 'Verified robot parameter references (PIPER / Nova 2 / Go2, etc.)' },
];

/* ───────── Submission ───────── */
const submissions = [
  { num: '01', title: 'Code', desc: 'Fork the official repository or submit an independent repository, including complete driver plugins (if applicable)' },
  { num: '02', title: 'Demo Video', desc: '3-5 minute video demonstrating the full chain: Natural Language Instruction → Markdown Protocol → Physical Execution' },
  { num: '03', title: 'Protocol Files', desc: 'Submit your SKILL.md (successful workflow) and/or LESSONS.md (failure experiences)' },
  { num: '04', title: 'Presentation', desc: '5-minute showcase + 3-minute Q&A, focusing on how you leveraged PhyAgentOS\'s decoupled architecture' },
];

/* ───────── Google Form Submission Config ───────── */
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdPuJ5YvOuI2AUOGPun0VIAa0g6P6rcmyo8Nw46gNkSOE4Zxw/viewform';

export default function Hackathon() {
  const { lang } = useLang();
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const copy = lang === 'zh'
    ? {
        eventTitle: '2026 BETA',
        hackathonTitle: '黑客松',
        heroSubtitle: '自进化物理智能体操作系统',
        heroDescription: '你专注于创意，我们负责让智能体',
        heroEmphasis: '“可记忆、可纠错、可理解”',
        heroDescriptionEnd: '。',
        viewGithub: '查看 GitHub',
        whyLabel: '为什么选择 PhyAgentOS？',
        whyTitle: '解决具身智能最棘手的问题',
        whyDescription: '看看 PhyAgentOS 如何从根本上解决具身智能领域的难题。',
        painPoints: [
          { pain: '大模型直接控制硬件，错误难以追溯', solution: '认知-物理解耦：规划器与 HAL 独立运行，通过 ACTION.md 透明通信' },
          { pain: '动作失败无法沉淀为经验', solution: 'LESSONS.md 经验库自动积累，支持真正的自进化' },
          { pain: '像黑盒一样调试', solution: 'Markdown 协议矩阵：所有状态可读可写，极致透明' },
          { pain: '缺少安全保障', solution: 'Critic 多智能体验证：高风险动作执行前必须依据 EMBODIED.md 完成校验' },
        ],
        directionsLabel: '推荐方向',
        directionsTitle: '单体具身赛道',
        directionsDescription: '选择一个令你兴奋的方向，推动具身智能能力的边界。',
        directions: [
          { icon: Target, title: '精准操作', desc: '基于 SAM3 / ReKep 的语义抓取：“把那个红色工具放进左侧第二个抽屉”', color: 'from-amber-500/20 to-orange-600/20', border: 'border-amber-500/30', iconColor: 'text-amber-400' },
          { icon: MapPin, title: '语义导航', desc: '基于场景图的自然语言移动：“去厨房找到还在冒热气的杯子”', color: 'from-cyan-500/20 to-blue-600/20', border: 'border-cyan-500/30', iconColor: 'text-cyan-400' },
          { icon: RefreshCw, title: '长程任务', desc: '复杂动作链：“帮我准备一杯咖啡”（完成开封、取料、冲泡与回收等完整流程）', color: 'from-emerald-500/20 to-green-600/20', border: 'border-emerald-500/30', iconColor: 'text-emerald-400' },
          { icon: Shield, title: '安全演化', desc: '展示 Critic 机制如何拦截危险动作，并将修正经验写入 LESSONS.md', color: 'from-rose-500/20 to-red-600/20', border: 'border-rose-500/30', iconColor: 'text-rose-400' },
          { icon: Plug, title: '新硬件接入', desc: '为机器人编写 hal/drivers/ 插件，实现 PhyAgentOS 一键接管', color: 'from-violet-500/20 to-purple-600/20', border: 'border-violet-500/30', iconColor: 'text-violet-400' },
        ],
        ideaTitle: '你的想法',
        ideaDescription: '有其他想法？我们欢迎所有富有创造力的方向！',
        submitProposal: '提交方案',
        techLabel: '技术要求',
        techTitle: '构建于坚实基础之上',
        techReqs: [
          { label: '必需', text: '使用 PhyAgentOS 的 hal_watchdog.py 作为硬件执行层（Track B）', required: true },
          { label: '必需', text: '通过 Markdown 协议文件（ENVIRONMENT.md / ACTION.md）连接认知层与物理层', required: true },
          { label: '加分', text: '实现自定义 HAL 驱动插件，接入官方暂未支持的硬件', required: false },
          { label: '加分', text: '设计可复用的 SKILL.md 工作流，沉淀成功经验', required: false },
          { label: '加分', text: '展示 Critic 安全纠错机制或 LESSONS.md 失败经验积累', required: false },
        ],
        architectureTitle: '架构概览',
        architectureDescription: 'PhyAgentOS 采用双轨架构，将认知规划与物理执行完全解耦。',
        trackA: 'Track A：认知规划 + Critic 验证',
        trackB: 'Track B：HAL Watchdog + 物理执行',
        protocol: '协议：Markdown 文件（ACTION.md / ENVIRONMENT.md）',
        evaluationLabel: '评审标准',
        evaluationTitle: '我们如何评审',
        evalCriteria: [
          { dim: '演示展示', weight: '40%', desc: '具身任务的现场执行，从自然语言到物理动作的完整链路流畅度，以及系统稳定性' },
          { dim: '文档质量', weight: '30%', desc: 'SKILL.md（成功工作流）、LESSONS.md（失败经验）和技术说明的质量与完整性' },
          { dim: '创意阐释', weight: '30%', desc: '场景动机的清晰度、方案原创性，以及对 PhyAgentOS 解耦架构的运用理解' },
        ],
        supportLabel: '参赛支持',
        supportTitle: '我们为你提供支持',
        supports: [
          { icon: FileText, title: '集成指南', desc: '官方 HAL 驱动模板与插件开发文档，帮助快速接入硬件' },
          { icon: Cpu, title: '仿真支持', desc: '内置轻量仿真，无需硬件即可验证逻辑' },
          { icon: MessageSquare, title: '问答渠道', desc: '带有专属标签的 GitHub Issues，核心维护者在线答疑' },
          { icon: Plug, title: '硬件参考', desc: '经过验证的机器人参数参考（PIPER / Nova 2 / Go2 等）' },
        ],
        submissionLabel: '提交要求',
        submissionTitle: '需要提交什么',
        submissions: [
          { num: '01', title: '代码', desc: 'Fork 官方仓库或提交独立仓库，包含完整驱动插件（如适用）' },
          { num: '02', title: '演示视频', desc: '3-5 分钟视频展示完整链路：自然语言指令 → Markdown 协议 → 物理执行' },
          { num: '03', title: '协议文件', desc: '提交 SKILL.md（成功工作流）和/或 LESSONS.md（失败经验）' },
          { num: '04', title: '演示汇报', desc: '5 分钟展示 + 3 分钟问答，重点说明如何利用 PhyAgentOS 的解耦架构' },
        ],
        readyLabel: '准备提交？',
        uploadTitle: '上传你的参赛作品',
        uploadDescription: '将代码、演示视频、协议文件和演示文稿打包为一个 ZIP 文件，并上传到 Google Drive 文件夹。请确保文件名包含团队名称。',
        formTitle: '通过 Google Form 提交',
        formDescription: '填写团队信息并上传 ZIP 文件',
        formSteps: ['团队名称与联系方式', '项目说明', '上传 ZIP 提交文件'],
        openForm: '打开提交表单',
        redirect: '你将被重定向到 Google Forms 完成提交。',
        ctaTitle: '一起探索',
        ctaHighlight: '物理世界？',
        ctaDescription: '加入 2026 BETA 黑客松，与 PhyAgentOS 一起构建具身智能的未来。期待看到你的具身方案与 PhyAgentOS 碰撞出新的火花！',
        joinHackathon: '加入黑客松',
        exploreRepo: '探索代码仓库',
      }
    : {
        eventTitle: '2026 BETA',
        hackathonTitle: 'Hackathon',
        heroSubtitle: 'Self-Evolving Physical Agent Operating System',
        heroDescription: 'You focus on the creativity, we handle making the agent',
        heroEmphasis: '"rememberable, correctable, and comprehensible"',
        heroDescriptionEnd: '.',
        viewGithub: 'View on GitHub',
        whyLabel: 'Why PhyAgentOS?',
        whyTitle: 'Pain Points & Solutions',
        whyDescription: 'See how PhyAgentOS fundamentally solves the hardest problems in embodied AI.',
        painPoints,
        directionsLabel: 'Recommended Directions',
        directionsTitle: 'Single Embodiment Tracks',
        directionsDescription: 'Choose a direction that excites you. Each track pushes the boundary of what embodied AI can achieve.',
        directions,
        ideaTitle: 'Your Idea',
        ideaDescription: 'Have something else in mind? We welcome all creative directions!',
        submitProposal: 'Submit your proposal',
        techLabel: 'Technical Requirements',
        techTitle: 'Build on Solid Foundations',
        techReqs,
        architectureTitle: 'Architecture Overview',
        architectureDescription: 'PhyAgentOS uses a dual-track architecture where cognitive planning and physical execution are fully decoupled.',
        trackA: 'Track A: Cognitive Planning + Critic Verification',
        trackB: 'Track B: HAL Watchdog + Physical Execution',
        protocol: 'Protocol: Markdown Files (ACTION.md / ENVIRONMENT.md)',
        evaluationLabel: 'Evaluation Criteria',
        evaluationTitle: 'How We Judge',
        evalCriteria,
        supportLabel: 'Participant Support',
        supportTitle: 'We Got Your Back',
        supports,
        submissionLabel: 'Submission Requirements',
        submissionTitle: 'What to Submit',
        submissions,
        readyLabel: 'Ready to Submit?',
        uploadTitle: 'Upload Your Submission',
        uploadDescription: 'Package your code, demo video, protocol files, and presentation into a single ZIP file and upload it to our Google Drive folder. Make sure your filename includes your team name.',
        formTitle: 'Submit via Google Form',
        formDescription: 'Fill in team info and upload your ZIP',
        formSteps: ['Team name & contact', 'Project description', 'Upload ZIP submission'],
        openForm: 'Open Submission Form',
        redirect: "You'll be redirected to Google Forms to complete your submission.",
        ctaTitle: 'Ready to Hack the',
        ctaHighlight: 'Physical World?',
        ctaDescription: 'Join the 2026 BETA Hackathon and build the future of embodied AI with PhyAgentOS. Looking forward to seeing the sparks fly when your embodiment meets PhyAgentOS!',
        joinHackathon: 'Join Hackathon',
        exploreRepo: 'Explore Repo',
      };

  const handleUpload = useCallback(() => {
    window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll('.hero-animate'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            delay: 0.2,
          }
        );
      }

      // Scroll-triggered sections
      const sections = contentRef.current?.querySelectorAll('.gsap-section');
      sections?.forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll('.gsap-item'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
            },
          }
        );
      });
    }, contentRef);

    return () => ctx.revert();
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${(i * 37) % 100}%`,
      top: `${(i * 53) % 100}%`,
      delay: `${(i * 0.4) % 3}s`,
      duration: `${2 + ((i * 0.7) % 3)}s`,
    }));
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      {/* ───────── Hero ───────── */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20"
      >
        {/* Background effects */}
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-accent/5 rounded-full blur-[100px]" />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute w-1 h-1 bg-brand-accent/40 rounded-full animate-pulse"
              style={{
                left: p.left,
                top: p.top,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24 max-w-6xl mx-auto text-center">
          {/* Title */}
          <h1 className="hero-animate text-5xl sm:text-6xl lg:text-8xl font-display font-bold tracking-tight mb-6">
            <span className="text-gradient">{copy.eventTitle}</span>
            <br />
            <span className="text-brand-text">{copy.hackathonTitle}</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-animate text-xl sm:text-2xl text-brand-text max-w-3xl mx-auto mb-4 leading-relaxed">
            {copy.heroSubtitle}
          </p>
          <p className="hero-animate text-base sm:text-lg text-brand-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            {copy.heroDescription}
            <span className="text-brand-text"> {copy.heroEmphasis}</span>{copy.heroDescriptionEnd}
          </p>

          {/* CTA Buttons */}
          <div className="hero-animate flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/PhyAgentOS/PhyAgentOS-core"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-brand-bg-secondary hover:bg-brand-bg-tertiary text-brand-text font-semibold rounded-2xl border border-brand-border hover:border-brand-accent/30 transition-all duration-300 flex items-center gap-2 shadow-soft hover:shadow-card"
            >
              <Github className="w-4 h-4" />
              {copy.viewGithub}
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="hero-animate mt-20">
            <button
              type="button"
              onClick={() => document.getElementById('why')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-brand-text-tertiary hover:text-brand-text-secondary transition-colors"
            >
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      <div ref={contentRef}>
        <ChallengeRecap />

        {/* ───────── Why PhyAgentOS ───────── */}
        <section id="why" className="gsap-section relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-accent/[0.02] to-transparent" />
          <div className="px-6 sm:px-8 lg:px-16 xl:px-24 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 gsap-item">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-text/[0.03] rounded-full text-xs text-brand-text-secondary mb-4">
                  <BrainCircuit className="w-3.5 h-3.5" />
                  {copy.whyLabel}
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-brand-text mb-4">
                  {copy.whyTitle}
                </h2>
                <p className="text-brand-text-secondary max-w-2xl mx-auto">
                  {copy.whyDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {copy.painPoints.map((item, idx) => (
                  <div
                    key={idx}
                    className="gsap-item group relative p-6 rounded-2xl border border-brand-border bg-brand-text/[0.03] hover:bg-brand-text/[0.04] transition-all duration-300 hover:border-brand-accent/30"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <span className="text-red-400 text-lg font-bold">×</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-brand-text-secondary text-sm mb-3 line-through decoration-red-500/50">
                          {item.pain}
                        </p>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-brand-accent-dark flex-shrink-0 mt-0.5" />
                          <p className="text-brand-text text-sm leading-relaxed">
                            {item.solution}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Recommended Directions ───────── */}
        <section className="gsap-section py-24 lg:py-32">
          <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 gsap-item">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-text/[0.03] rounded-full text-xs text-brand-text-secondary mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  {copy.directionsLabel}
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-brand-text mb-4">
                  {copy.directionsTitle}
                </h2>
                <p className="text-brand-text-secondary max-w-2xl mx-auto">
                  {copy.directionsDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {copy.directions.map((dir, idx) => {
                  const Icon = dir.icon;
                  return (
                    <div
                      key={idx}
                      className={`gsap-item group relative p-6 rounded-2xl border ${dir.border} bg-gradient-to-br ${dir.color} backdrop-blur-sm hover:scale-[1.02] transition-all duration-300`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-brand-text/[0.04] flex items-center justify-center mb-4 ${dir.iconColor}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-brand-text mb-2">
                        {dir.title}
                      </h3>
                      <p className="text-sm text-brand-text-secondary leading-relaxed">
                        {dir.desc}
                      </p>
                    </div>
                  );
                })}

                {/* CTA Card */}
                <div className="gsap-item relative p-6 rounded-2xl border border-dashed border-brand-accent/25 flex flex-col items-center justify-center text-center hover:border-brand-accent/40 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent-dark mb-4">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-brand-text mb-2">{copy.ideaTitle}</h3>
                  <p className="text-sm text-brand-text-secondary mb-4">
                    {copy.ideaDescription}
                  </p>
                  <a
                    href="https://www.notion.so/2026-BETA-Hackathon-34b41d54c5b8806ca0a8c05a812e49db"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-accent-dark hover:text-brand-accent-light flex items-center gap-1 transition-colors"
                  >
                    {copy.submitProposal}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Technical Requirements ───────── */}
        <section className="gsap-section py-24 lg:py-32 bg-gradient-to-b from-transparent via-brand-text/[0.01] to-transparent">
          <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 gsap-item">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-text/[0.03] rounded-full text-xs text-brand-text-secondary mb-4">
                  <GitBranch className="w-3.5 h-3.5" />
                  {copy.techLabel}
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-brand-text mb-4">
                  {copy.techTitle}
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 space-y-4">
                  {copy.techReqs.map((req, idx) => (
                    <div
                      key={idx}
                      className="gsap-item flex items-start gap-4 p-5 rounded-xl border border-brand-border bg-brand-text/[0.03] hover:bg-brand-text/[0.04] transition-colors"
                    >
                      <span
                        className={`flex-shrink-0 px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider ${
                          req.required
                            ? 'bg-brand-accent/15 text-brand-accent-dark border border-brand-accent/20'
                            : 'bg-brand-text/[0.03] text-brand-text-secondary border border-brand-border'
                        }`}
                      >
                        {req.label}
                      </span>
                      <p className="text-sm text-brand-text leading-relaxed">{req.text}</p>
                    </div>
                  ))}
                </div>

                <div className="lg:col-span-2 gsap-item p-6 rounded-2xl border border-brand-border bg-brand-text/[0.03]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center">
                      <Puzzle className="w-5 h-5 text-brand-accent-dark" />
                    </div>
                    <h3 className="text-lg font-semibold text-brand-text">{copy.architectureTitle}</h3>
                  </div>
                  <p className="text-sm text-brand-text-secondary leading-relaxed mb-4">
                    {copy.architectureDescription}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-brand-text-secondary">
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                      {copy.trackA}
                    </div>
                    <div className="flex items-center gap-2 text-brand-text-secondary">
                      <div className="w-2 h-2 rounded-full bg-brand-accent" />
                      {copy.trackB}
                    </div>
                    <div className="flex items-center gap-2 text-brand-text-secondary">
                      <div className="w-2 h-2 rounded-full bg-brand-text/40" />
                      {copy.protocol}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Evaluation Criteria ───────── */}
        <section className="gsap-section py-24 lg:py-32">
          <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 gsap-item">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-text/[0.03] rounded-full text-xs text-brand-text-secondary mb-4">
                  <Trophy className="w-3.5 h-3.5" />
                  {copy.evaluationLabel}
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-brand-text mb-4">
                  {copy.evaluationTitle}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {copy.evalCriteria.map((item, idx) => (
                  <div
                    key={idx}
                    className="gsap-item relative p-8 rounded-2xl border border-brand-border bg-brand-text/[0.03] text-center group hover:border-brand-accent/30 transition-all duration-300"
                  >
                    <div className="text-5xl font-display font-bold text-gradient mb-4">
                      {item.weight}
                    </div>
                    <h3 className="text-xl font-semibold text-brand-text mb-3">
                      {item.dim}
                    </h3>
                    <p className="text-sm text-brand-text-secondary leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Participant Support ───────── */}
        <section className="gsap-section py-24 lg:py-32 bg-gradient-to-b from-transparent via-brand-text/[0.01] to-transparent">
          <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 gsap-item">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-text/[0.03] rounded-full text-xs text-brand-text-secondary mb-4">
                  <Zap className="w-3.5 h-3.5" />
                  {copy.supportLabel}
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-brand-text mb-4">
                  {copy.supportTitle}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {copy.supports.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="gsap-item p-6 rounded-2xl border border-brand-border bg-brand-text/[0.03] hover:bg-brand-text/[0.04] hover:border-brand-accent/30 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent-dark mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-semibold text-brand-text mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-brand-text-secondary leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Submission Requirements ───────── */}
        <section className="gsap-section py-24 lg:py-32">
          <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 gsap-item">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-text/[0.03] rounded-full text-xs text-brand-text-secondary mb-4">
                  <FileText className="w-3.5 h-3.5" />
                  {copy.submissionLabel}
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-brand-text mb-4">
                  {copy.submissionTitle}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {copy.submissions.map((sub, idx) => (
                  <div
                    key={idx}
                    className="gsap-item relative p-6 rounded-2xl border border-brand-border bg-brand-text/[0.03] group hover:border-brand-accent/30 transition-all duration-300"
                  >
                    <div className="text-4xl font-display font-bold text-brand-text/10 group-hover:text-brand-accent/20 transition-colors mb-4">
                      {sub.num}
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      {sub.title === 'Code' && <Github className="w-4 h-4 text-brand-accent-dark" />}
                      {sub.title === 'Demo Video' && <Video className="w-4 h-4 text-brand-accent-dark" />}
                      {sub.title === 'Protocol Files' && <FileText className="w-4 h-4 text-brand-accent-dark" />}
                      {sub.title === 'Presentation' && <MessageSquare className="w-4 h-4 text-brand-accent-dark" />}
                      <h3 className="text-base font-semibold text-brand-text">{sub.title}</h3>
                    </div>
                    <p className="text-sm text-brand-text-secondary leading-relaxed">
                      {sub.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* ───────── Upload Zone ───────── */}
              <div className="gsap-item mt-12">
                <div className="relative p-8 sm:p-10 rounded-2xl border border-brand-accent/20 bg-gradient-to-br from-brand-accent/[0.06] to-transparent overflow-hidden">
                  {/* Decorative glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                  <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
                    {/* Left: Info */}
                    <div className="flex-1 text-center lg:text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded-full text-xs text-brand-accent-light mb-4">
                        <ExternalLink className="w-3.5 h-3.5" />
                        {copy.readyLabel}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-brand-text mb-3">
                        {copy.uploadTitle}
                      </h3>
                      <p className="text-brand-text-secondary text-sm sm:text-base leading-relaxed max-w-lg">
                        {copy.uploadDescription}
                      </p>
                    </div>

                    {/* Right: Drop zone */}
                    <div className="w-full max-w-md flex-shrink-0">
                      {/* Form preview card */}
                      <div className="relative p-6 rounded-xl border border-brand-border bg-brand-text/[0.03]">
                        <div className="text-center mb-5">
                          <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-7 h-7 text-brand-accent-dark" />
                          </div>
                          <p className="text-brand-text font-medium mb-1">
                            {copy.formTitle}
                          </p>
                          <p className="text-brand-text-tertiary text-sm">
                            {copy.formDescription}
                          </p>
                        </div>

                        <div className="space-y-3 mb-5">
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-brand-text/[0.04] border border-brand-border">
                            <div className="w-6 h-6 rounded-full bg-brand-accent/20 flex items-center justify-center text-xs text-brand-accent-dark font-bold">1</div>
                            <span className="text-sm text-brand-text-secondary">{copy.formSteps[0]}</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-brand-text/[0.04] border border-brand-border">
                            <div className="w-6 h-6 rounded-full bg-brand-accent/20 flex items-center justify-center text-xs text-brand-accent-dark font-bold">2</div>
                            <span className="text-sm text-brand-text-secondary">{copy.formSteps[1]}</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-brand-text/[0.04] border border-brand-border">
                            <div className="w-6 h-6 rounded-full bg-brand-accent/20 flex items-center justify-center text-xs text-brand-accent-dark font-bold">3</div>
                            <span className="text-sm text-brand-text-secondary">{copy.formSteps[2]}</span>
                          </div>
                        </div>

                        {/* Open Google Form button */}
                        <button
                          type="button"
                          onClick={handleUpload}
                          className="w-full px-6 py-3.5 bg-brand-accent hover:bg-brand-accent-light text-brand-text-on-accent font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-glow hover:shadow-glow-lg"
                        >
                          <ExternalLink className="w-5 h-5" />
                          {copy.openForm}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </button>

                        <p className="text-center text-xs text-brand-text-tertiary mt-3">
                          {copy.redirect}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── CTA ───────── */}
        <section className="gsap-section relative py-32 lg:py-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-brand-accent/10 via-transparent to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[150px]" />

          <div className="px-6 sm:px-8 lg:px-16 xl:px-24 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="gsap-item">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-brand-text mb-6">
                  {copy.ctaTitle}
                  <br />
                  <span className="text-gradient">{copy.ctaHighlight}</span>
                </h2>
                <p className="text-lg text-brand-text-secondary mb-10 max-w-2xl mx-auto">
                  {copy.ctaDescription}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="https://www.notion.so/2026-BETA-Hackathon-34b41d54c5b8806ca0a8c05a812e49db"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-10 py-4 bg-brand-accent hover:bg-brand-accent-light text-brand-text-on-accent font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 group shadow-glow hover:shadow-glow-lg"
                  >
                    {copy.joinHackathon}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="https://github.com/PhyAgentOS/PhyAgentOS-core"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-10 py-4 bg-brand-text/[0.03] hover:bg-brand-text/[0.05] backdrop-blur-sm text-brand-text font-semibold rounded-xl border border-brand-border-hover transition-all duration-300 flex items-center gap-2"
                  >
                    <Github className="w-5 h-5" />
                    {copy.exploreRepo}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
