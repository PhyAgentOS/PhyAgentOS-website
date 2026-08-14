import { useState } from 'react';
import { BarChart3, Bot, Gamepad2, Rocket, TerminalSquare } from 'lucide-react';
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
          '将部署流程、游戏目标与真实机器人任务放在同一套 Session 运行链路下展示，验证 PhyAgentOS 从指令到执行的闭环能力。',
        watch: '当前播放',
        filters: { all: '全部', deployment: '快速部署', real: '真机', simulation: '仿真', game: '游戏' },
        videos: [
          {
            title: 'LIBERO 评测',
            eyebrow: 'Benchmark · LIBERO',
            description: '展示 OpenVLA Agent 在 LIBERO 基准中的 Session 化评测流程：启动 TargetWS 与 OpenPI Policy，生成任务会话、调度执行并记录结果。',
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
            title: '饥荒游戏智能体',
            eyebrow: 'Game Target · Don’t Starve',
            description: '展示 PhyAgentOS 在复杂动态世界中的长期自主生存能力，实现从探索、规划到执行的智能体自进化闭环。',
          },
          {
            title: '星露谷游戏智能体',
            eyebrow: 'Game Target · Stardew Valley',
            description: 'Agent 通过结构化动作序列移动、管理物品并出售防风草，展示二维游戏环境中的任务规划与目标执行能力。',
          },
          {
            title: 'Minecraft 游戏智能体',
            eyebrow: 'Game Target - Minecraft',
            description: '展示 PhyAgentOS 在 Minecraft 中通过 Session 协议完成从自然语言指令到游戏内执行的完整链路。',
          },
          {
            title: 'CALVIN 评测',
            eyebrow: 'Benchmark · CALVIN',
            description: '展示 CALVIN ABC→D 长程任务评测的接入流程：启动 π0.5 FlowSDE 策略服务，通过自然语言创建评测 Session，并由验证器跟踪执行与恢复结果。',
          },
          {
            title: 'RoboCasa365 评测',
            eyebrow: 'Benchmark · RoboCasa365',
            description: '展示 RoboCasa365 target50 的评测接入：启动 Verification 与 π0.5 策略服务，通过自然语言下发冰箱门关闭任务并记录可审计的执行结果。',
          },
        ],
      }
    : {
        label: 'Live Demo',
        title: 'Runtime demos',
        highlight: 'across targets',
        description:
          'Deployment, game targets, and real robots are shown through the same Session-centered runtime path, from instruction to verifiable execution.',
        watch: 'Now playing',
        filters: { all: 'All', deployment: 'Quick Deployment', real: 'Real Robot', simulation: 'Simulation', game: 'Games' },
        videos: [
          {
            title: 'LIBERO benchmark',
            eyebrow: 'Benchmark · LIBERO',
            description: 'Shows the Session-based LIBERO evaluation flow for OpenVLA Agent: TargetWS and OpenPI policy startup, task session generation, scheduling, and result logging.',
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
            title: 'Don’t Starve game agent',
            eyebrow: 'Game Target · Don’t Starve',
            description: 'Terminal traces and gameplay run together as the agent performs long-horizon survival planning, exploration, collection, and risk handling.',
          },
          {
            title: 'Stardew Valley game agent',
            eyebrow: 'Game Target · Stardew Valley',
            description: 'The agent navigates the farm, manages its inventory, and sells parsnips through structured actions, demonstrating task planning and target execution in a 2D game environment.',
          },
          {
            title: 'Minecraft game agent',
            eyebrow: 'Game Target - Minecraft',
            description: 'Shows the complete PhyAgentOS Session path in Minecraft, from a natural-language instruction to verifiable in-game execution.',
          },
          {
            title: 'CALVIN benchmark',
            eyebrow: 'Benchmark · CALVIN',
            description: 'Shows the CALVIN ABC→D long-horizon evaluation setup: starting the π0.5 FlowSDE policy service, creating an evaluation Session in natural language, and tracking execution and recovery through the verifier.',
          },
          {
            title: 'RoboCasa365 benchmark',
            eyebrow: 'Benchmark · RoboCasa365',
            description: 'Shows the RoboCasa365 target50 evaluation setup: starting the Verification and π0.5 policy services, issuing a refrigerator-closing task in natural language, and recording auditable execution results.',
          },
        ],
      };

  const copyIds = [
    'libero-benchmark',
    'real-robot',
    'deployment',
    'dont-starve',
    'stardew',
    'minecraft-game',
    'calvin-benchmark',
    'robocasa365-benchmark',
  ];
  const copyById = Object.fromEntries(copyIds.map((id, index) => [id, copy.videos[index]]));

  const demos = [
    { id: 'real-robot', category: 'real', icon: Bot, src: '/media/demos/real-robot.mp4', poster: '/media/demos/real-robot.jpg', duration: '03:05' },
    { id: 'deployment', category: 'deployment', icon: Rocket, src: '/media/demos/deployment.mp4', poster: '/media/demos/deployment.jpg', duration: '02:29' },
    { id: 'minecraft-game', category: 'game', icon: Gamepad2, src: '/media/demos/cross-target-runtime.mp4', poster: '/media/demos/cross-target-runtime.jpg', duration: '01:10' },
    { id: 'dont-starve', category: 'game', icon: TerminalSquare, src: '/media/demos/dont-starve.mp4', poster: '/media/demos/dont-starve.png', duration: '03:03' },
    { id: 'stardew', category: 'game', icon: Gamepad2, src: '/media/demos/stardew.mp4', poster: '/media/demos/stardew.jpg', duration: '02:26' },
    { id: 'libero-benchmark', category: 'simulation', icon: BarChart3, src: '/media/demos/libero-benchmark.mp4', poster: '/media/demos/libero-benchmark.jpg', duration: '02:39' },
    { id: 'calvin-benchmark', category: 'simulation', icon: BarChart3, src: '/media/demos/calvin-benchmark.mp4', poster: '/media/demos/calvin-benchmark.jpg', duration: '02:37' },
    { id: 'robocasa365-benchmark', category: 'simulation', icon: BarChart3, src: '/media/demos/robocasa365-benchmark.mp4', poster: '/media/demos/robocasa365-benchmark.jpg', duration: '02:27' },
  ].map((demo) => ({ ...demo, ...copyById[demo.id] }));

  const filters = Object.entries(copy.filters) as [keyof typeof copy.filters, string][];
  const [filter, setFilter] = useState<keyof typeof copy.filters>('all');
  const filteredDemos = filter === 'all' ? demos : demos.filter((demo) => demo.category === filter);
  const [activeId, setActiveId] = useState(demos[0].id);
  const activeDemo = filteredDemos.find((demo) => demo.id === activeId) ?? filteredDemos[0];
  const ActiveIcon = activeDemo.icon;

  const handleFilterChange = (newFilter: keyof typeof copy.filters) => {
    setFilter(newFilter);
    const nextDemos = newFilter === 'all' ? demos : demos.filter((demo) => demo.category === newFilter);
    setActiveId(nextDemos[0].id);
  };

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
              <div className="flex flex-wrap justify-center gap-2">
                {filters.map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => handleFilterChange(key)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                      filter === key
                        ? 'bg-brand-accent text-white shadow-glow-soft'
                        : 'bg-brand-bg-secondary text-brand-text-tertiary border border-brand-border hover:text-brand-text hover:border-brand-accent/30 hover:shadow-soft'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

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

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {filteredDemos.map((demo) => {
                  const Icon = demo.icon;
                  const active = demo.id === activeDemo.id;
                  return (
                  <button
                    key={demo.id}
                    onClick={() => setActiveId(demo.id)}
                    className={`group relative flex min-h-[300px] flex-col gap-3 rounded-2xl border p-3 text-left transition-all duration-300 ${
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
                      <p className="mt-1 text-sm leading-6 text-brand-text-tertiary">
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
