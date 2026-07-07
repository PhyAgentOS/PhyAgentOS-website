import { useState } from 'react';
import { BarChart3, Bot, FlaskConical, Gamepad2, Rocket, Sparkles, TerminalSquare } from 'lucide-react';
import SectionHeader from '../../components/layout/SectionHeader';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useLang } from '../../i18n/LanguageContext';

export default function LiveDemo() {
  const { lang } = useLang();
  const copy = lang === 'zh'
    ? {
        label: '实时演示',
        title: '跨目标',
        highlight: '运行实录',
        description:
          '将产品概念、部署流程、游戏目标与真实机器人任务放在同一套 Session 运行链路下展示，验证 PhyAgentOS 从指令到执行的闭环能力。',
        watch: '当前播放',
        videos: [
          {
            title: '概念短片',
            eyebrow: 'Session-Centered Runtime',
            description: '从“AI 能思考，如何行动”切入，展示 Session 文件协议、可审计闭环，以及跨游戏、仿真、真机的一体化运行时。',
          },
          {
            title: 'LIBERO 评测 Demo',
            eyebrow: 'Benchmark · LIBERO',
            description: '展示 OpenVLA Agent 在 LIBERO 基准中的 Session 化评测流程：启动 TargetWS 与 OpenPI Policy，生成任务会话、调度执行并记录结果。',
          },
          {
            title: 'BEHAVIOR-1K 评测 Demo',
            eyebrow: 'Benchmark · BEHAVIOR-1K',
            description: '展示 BEHAVIOR-1K 仿真评测链路：TargetWS9004 渲染场景，Policy8000 接收观测并返回动作，实时查看推理步骤和任务完成状态。',
          },
          {
            title: '真机任务链',
            eyebrow: 'Real Robot Execution',
            description: '真实房间中的人形/移动机器人连续完成购物、整理、取放、开袋、收纳等物理任务，展示从计划到动作的执行稳定性。',
          },
          {
            title: '部署流程',
            eyebrow: 'Deployment Walkthrough',
            description: '从设备连接、虚拟环境、配置文件、API Key 到给 Go2 发出起身行走指令，展示首次部署与运行路径。',
          },
          {
            title: '饥荒游戏目标',
            eyebrow: 'Game Target · Don’t Starve',
            description: '终端日志与游戏画面同步，Agent 基于环境状态进行长期生存规划、探索、采集与风险应对。',
          },
          {
            title: '星露谷清理石头',
            eyebrow: 'Game Target · Stardew Valley',
            description: 'Agent 通过结构化动作序列移动、选择工具并清理农场石块，展示二维游戏环境中的目标执行能力。',
          },
        ],
      }
    : {
        label: 'Live Demo',
        title: 'Runtime demos',
        highlight: 'across targets',
        description:
          'Concept, deployment, game targets, and real robots are shown through the same Session-centered runtime path, from instruction to verifiable execution.',
        watch: 'Now playing',
        videos: [
          {
            title: 'Concept film',
            eyebrow: 'Session-Centered Runtime',
            description: 'Introduces the question “AI can think, but can it act?” through Session files, auditable verification, and one runtime across games, simulation, and robots.',
          },
          {
            title: 'LIBERO benchmark demo',
            eyebrow: 'Benchmark · LIBERO',
            description: 'Shows the Session-based LIBERO evaluation flow for OpenVLA Agent: TargetWS and OpenPI policy startup, task session generation, scheduling, and result logging.',
          },
          {
            title: 'BEHAVIOR-1K benchmark demo',
            eyebrow: 'Benchmark · BEHAVIOR-1K',
            description: 'Shows the BEHAVIOR-1K simulation evaluation path: TargetWS9004 renders scenes, Policy8000 returns actions from observations, and reasoning plus completion status are tracked live.',
          },
          {
            title: 'Real-robot task chain',
            eyebrow: 'Real Robot Execution',
            description: 'A humanoid/mobile robot completes shopping, sorting, pick-and-place, bag opening, and storage tasks in a real room, showing stable plan-to-action execution.',
          },
          {
            title: 'Deployment walkthrough',
            eyebrow: 'Deployment Walkthrough',
            description: 'Covers device setup, virtual environment, configuration files, API key setup, and the first Go2 standing/walking instruction.',
          },
          {
            title: 'Don’t Starve game target',
            eyebrow: 'Game Target · Don’t Starve',
            description: 'Terminal traces and gameplay run together as the agent performs long-horizon survival planning, exploration, collection, and risk handling.',
          },
          {
            title: 'Stardew Valley stone clearing',
            eyebrow: 'Game Target · Stardew Valley',
            description: 'The agent moves, selects tools, and clears farm stones through structured actions, demonstrating target execution in a 2D game environment.',
          },
        ],
      };

  const copyIds = [
    'overview',
    'libero-benchmark',
    'b1k-benchmark',
    'real-robot',
    'deployment',
    'dont-starve',
    'stardew',
  ];
  const copyById = Object.fromEntries(copyIds.map((id, index) => [id, copy.videos[index]]));

  const demos = [
    { id: 'overview', icon: Sparkles, src: '/media/demos/overview.mp4', poster: '/media/demos/overview.jpg', duration: '01:09' },
    { id: 'real-robot', icon: Bot, src: '/media/demos/real-robot.mp4', poster: '/media/demos/real-robot.jpg', duration: '03:14' },
    { id: 'deployment', icon: Rocket, src: '/media/demos/deployment.mp4', poster: '/media/demos/deployment.jpg', duration: '03:27' },
    { id: 'dont-starve', icon: TerminalSquare, src: '/media/demos/dont-starve.mp4', poster: '/media/demos/dont-starve.jpg', duration: '03:03' },
    { id: 'stardew', icon: Gamepad2, src: '/media/demos/stardew.mp4', poster: '/media/demos/stardew.jpg', duration: '02:09' },
    { id: 'libero-benchmark', icon: BarChart3, src: '/media/demos/libero-benchmark.mp4', poster: '/media/demos/libero-benchmark.jpg', duration: '02:29' },
    { id: 'b1k-benchmark', icon: FlaskConical, src: '/media/demos/b1k-benchmark.mp4', poster: '/media/demos/b1k-benchmark.jpg', duration: '01:11' },
  ].map((demo) => ({ ...demo, ...copyById[demo.id] }));

  const [activeId, setActiveId] = useState(demos[0].id);
  const activeDemo = demos.find((demo) => demo.id === activeId) ?? demos[0];
  const ActiveIcon = activeDemo.icon;

  return (
    <section id="demo" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-brand-bg-secondary/40" />
      <div className="absolute inset-0 bg-grid opacity-[0.02]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-accent/[0.03] rounded-full blur-[150px]" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionHeader
              label={copy.label}
              title={copy.title}
              highlight={copy.highlight}
              description={copy.description}
            />
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-16 space-y-5">
              <div className="relative overflow-hidden rounded-3xl border border-brand-border bg-black shadow-2xl">
                <video
                  key={activeDemo.id}
                  src={activeDemo.src}
                  poster={activeDemo.poster}
                  className="aspect-video w-full object-contain"
                  controls
                  autoPlay
                  muted
                  preload="auto"
                  playsInline
                />
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-xs font-mono font-semibold uppercase tracking-[0.16em] text-white/85 backdrop-blur-md">
                  <ActiveIcon className="h-4 w-4 text-brand-accent-light" />
                  {copy.watch}
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {demos.map((demo) => {
                  const Icon = demo.icon;
                  const active = demo.id === activeDemo.id;
                  return (
                  <button
                    key={demo.id}
                    onClick={() => setActiveId(demo.id)}
                    className={`group relative flex min-h-[232px] flex-col gap-3 rounded-2xl border p-3 text-left transition-all duration-300 ${
                      active
                        ? 'border-brand-accent/35 bg-brand-accent/10 shadow-glow-soft'
                        : 'border-brand-border bg-brand-bg-secondary hover:border-brand-accent/30 hover:shadow-soft'
                    }`}
                  >
                    <div className="relative overflow-hidden rounded-xl bg-black">
                      <img
                        src={demo.poster}
                        alt=""
                        className="aspect-video w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-2 left-2 rounded-full bg-black/65 px-2 py-0.5 text-[11px] font-mono text-white/85">
                        {demo.duration}
                      </div>
                    </div>
                    <div className="min-w-0 py-1">
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${active ? 'text-brand-accent-light' : 'text-brand-text-tertiary'}`} />
                        <p className="truncate text-xs font-mono uppercase tracking-[0.14em] text-brand-text-tertiary">
                          {demo.eyebrow}
                        </p>
                      </div>
                      <h3 className={`mt-2 font-display text-lg font-bold leading-tight ${active ? 'text-brand-text' : 'text-brand-text-secondary'}`}>
                        {demo.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm leading-6 text-brand-text-tertiary">
                        {demo.description}
                      </p>
                    </div>
                    {active && (
                      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                    )}
                  </button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
