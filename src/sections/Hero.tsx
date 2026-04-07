import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';

type HeroAgent = {
  name: string;
  status: 'running' | 'idle' | 'error';
  type: string;
  sdkVersion: string;
  hardware: {
    controller: string;
    sensors: string[];
    actuator: string;
  };
};

type HeroTask = {
  name: string;
  status: 'queued' | 'running' | 'blocked' | 'done';
  assignedAgents: string[];
  sequence: string[];
};

type HeroSkill = {
  name: string;
  level: string;
  cooldown: string;
  assignedAgents: string[];
};

type EnvironmentNode = {
  agent: string;
  position: string;
  state: 'ready' | 'moving' | 'charging' | 'error';
};

type HeroEnvironment = {
  scene: string;
  weather: string;
  floor: string;
  nodes: EnvironmentNode[];
};

type HeroContent = {
  announcement: string;
  title: string;
  subtitle: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  workspaceName: string;
  workspaceSectionLabel: string;
  sidebarItems: string[];
  agents: HeroAgent[];
  tasks: HeroTask[];
  skills: HeroSkill[];
  environment: HeroEnvironment;
};

const fallbackContent: HeroContent = {
  announcement: 'Introducing PhyAgentOS: The Embodied AI Framework',
  title: 'Where Intelligence\nMeets Physics',
  subtitle: 'PhyAgentOS',
  description:
    'Build, deploy and orchestrate embodied AI agents across the four key components of physical intelligence: Perception, Cognition, Action and Learning.',
  primaryCta: {
    label: 'Get Started',
    href: 'https://github.com/PhyAgentOS/PhyAgentOS/blob/main/docs/user_manual/README.md',
  },
  secondaryCta: {
    label: 'Explore Docs',
    href: 'https://github.com/PhyAgentOS/PhyAgentOS/blob/main/docs/user_development_guide/README.md',
  },
  workspaceName: 'phyagentos.workspace',
  workspaceSectionLabel: 'Workspace',
  sidebarItems: ['Overview', 'Agents', 'Tasks', 'Skills', 'Environment'],
  agents: [
    {
      name: 'AgileX PIPER',
      status: 'running',
      type: 'Arm',
      sdkVersion: 'agilex-sdk@2.4.1',
      hardware: {
        controller: 'Jetson Orin NX',
        sensors: ['RGB-D Camera', '6-axis F/T Sensor'],
        actuator: '6-DoF Servo Arm',
      },
    },
    {
      name: 'Unitree GO2',
      status: 'idle',
      type: 'Quadruped',
      sdkVersion: 'unitree-sdk@3.8.0',
      hardware: {
        controller: 'Unitree Mainboard',
        sensors: ['LiDAR', 'Stereo Camera', 'IMU'],
        actuator: '12 Joint Motors',
      },
    },
    {
      name: 'DoBot NOVA 2',
      status: 'running',
      type: 'Arm',
      sdkVersion: 'dobot-api@1.9.3',
      hardware: {
        controller: 'x86 IPC',
        sensors: ['Wrist Camera', 'Proximity Sensor'],
        actuator: '4-DoF Collaborative Arm',
      },
    },
    {
      name: 'FRANKA R3',
      status: 'error',
      type: 'Arm',
      sdkVersion: 'franka-ros@0.11.0',
      hardware: {
        controller: 'Franka Control Unit',
        sensors: ['Joint Torque Sensor', 'Depth Camera'],
        actuator: '7-DoF Precision Arm',
      },
    },
  ],
  tasks: [
    {
      name: 'Fruit Harvest Pipeline',
      status: 'running',
      assignedAgents: ['Unitree GO2', 'DoBot NOVA 2'],
      sequence: ['Perceive orchard rows', 'Pick ripe fruits', 'Deliver to basket'],
    },
    {
      name: 'Tea Service Routine',
      status: 'queued',
      assignedAgents: ['AgileX PIPER'],
      sequence: ['Fetch cup', 'Boil water', 'Steep and serve'],
    },
    {
      name: 'Waste Disposal Loop',
      status: 'running',
      assignedAgents: ['Unitree GO2', 'FRANKA R3'],
      sequence: ['Detect bins', 'Sort trash', 'Transport to station'],
    },
  ],
  skills: [
    {
      name: 'One-click Deployment',
      level: 'L5',
      cooldown: '0s',
      assignedAgents: ['AgileX PIPER', 'DoBot NOVA 2'],
    },
    {
      name: 'Fruit Picking',
      level: 'L4',
      cooldown: '6s',
      assignedAgents: ['DoBot NOVA 2', 'FRANKA R3'],
    },
    {
      name: 'Tea Brewing',
      level: 'L3',
      cooldown: '15s',
      assignedAgents: ['AgileX PIPER'],
    },
    {
      name: 'Trash Throwing',
      level: 'L4',
      cooldown: '4s',
      assignedAgents: ['Unitree GO2'],
    },
    {
      name: 'Desk Cleaning',
      level: 'L5',
      cooldown: '8s',
      assignedAgents: ['FRANKA R3', 'AgileX PIPER'],
    },
  ],
  environment: {
    scene: 'Kitchen-Lab A',
    weather: 'Indoor stable',
    floor: 'Epoxy + anti-slip mat',
    nodes: [
      { agent: 'AgileX PIPER', position: '(2.2m, 1.1m)', state: 'ready' },
      { agent: 'Unitree GO2', position: '(5.8m, 3.4m)', state: 'moving' },
      { agent: 'DoBot NOVA 2', position: '(4.1m, 2.6m)', state: 'ready' },
      { agent: 'FRANKA R3', position: '(1.3m, 4.7m)', state: 'error' },
    ],
  },
};

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLAnchorElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<HeroContent>(fallbackContent);
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState('Overview');
  const titleLines = content.title.split('\n');

  const runningAgentCount = content.agents.filter(agent => agent.status === 'running').length;
  const runningTaskCount = content.tasks.filter(task => task.status === 'running').length;

  useEffect(() => {
    if (content.sidebarItems.length === 0) {
      return;
    }

    if (!content.sidebarItems.includes(activeWorkspaceTab)) {
      setActiveWorkspaceTab(content.sidebarItems[0]);
    }
  }, [activeWorkspaceTab, content.sidebarItems]);

  useEffect(() => {
    const controller = new AbortController();

    const loadContent = async () => {
      try {
        const response = await fetch('/content/hero.json', { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Failed to load hero content: ${response.status}`);
        }

        const data = (await response.json()) as Partial<HeroContent>;

        setContent(previousContent => ({
          ...previousContent,
          ...data,
          primaryCta: {
            ...previousContent.primaryCta,
            ...data.primaryCta,
          },
          secondaryCta: {
            ...previousContent.secondaryCta,
            ...data.secondaryCta,
          },
          sidebarItems: data.sidebarItems ?? previousContent.sidebarItems,
          agents: data.agents ?? previousContent.agents,
          tasks: data.tasks ?? previousContent.tasks,
          skills: data.skills ?? previousContent.skills,
          environment: {
            ...previousContent.environment,
            ...data.environment,
            nodes: data.environment?.nodes ?? previousContent.environment.nodes,
          },
        }));
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        console.error('Unable to load hero content from /content/hero.json', error);
      }
    };

    loadContent();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      
      if (badgeRef.current) {
        tl.fromTo(badgeRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        );
      }
      
      if (titleRef.current) {
        tl.fromTo(titleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.3'
        );
      }

      if (subtitleRef.current) {
        tl.fromTo(subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.5'
        );
      }

      if (descRef.current) {
        tl.fromTo(descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        );
      }

      if (buttonsRef.current) {
        tl.fromTo(buttonsRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
          '-=0.3'
        );
      }

      if (mockupRef.current) {
        tl.fromTo(mockupRef.current,
          { opacity: 0, y: 60, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' },
          '-=0.2'
        );
      }
    }, heroRef);

    return () => {
      controller.abort();
      ctx.revert();
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/home_page.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(4px)',
        }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-[1]" />
      
      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16 xl:px-24 pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Announcement Badge */}
          <a
            href="#video-demo"
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full border border-white/20 mb-8 cursor-pointer hover:bg-black/70 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-brand-accent" />
            <span className="text-sm text-white/90">{content.announcement}</span>
            <ArrowRight className="w-4 h-4 text-white/60" />
          </a>
          
          {/* Title */}
          <h1 
            ref={titleRef}
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight mb-4"
          >
            {titleLines.map((line, index) => (
              <span key={`${line}-${index}`}>
                {line}
                {index < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h1>
          
          {/* Subtitle */}
          <p 
            ref={subtitleRef}
            className="text-xl sm:text-2xl text-white/80 mb-6"
          >
            {content.subtitle}
          </p>
          
          {/* Description */}
          <p 
            ref={descRef}
            className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            {content.description}
          </p>
          
          {/* Buttons */}
          <div ref={buttonsRef} className="flex flex-wrap justify-center gap-4">
            <a
              href={content.primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-brand-accent hover:bg-brand-accent-light text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2 group"
            >
              {content.primaryCta.label}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={content.secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium rounded-lg border border-white/20 transition-all duration-300"
            >
              {content.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
      
      {/* Product Mockup */}
      <div 
        ref={mockupRef}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 mt-8"
      >
        <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10">
          {/* Mockup Header */}
          <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-2 border-b border-white/10">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-1 bg-black/50 rounded-md text-xs text-white/50 font-mono">
                {content.workspaceName}
              </div>
            </div>
          </div>
          
          {/* Mockup Content */}
          <div className="bg-[#0a0a0a] p-6 grid grid-cols-12 gap-4">
            {/* Sidebar */}
            <div className="col-span-3 space-y-2">
              <div className="text-xs font-mono text-white/40 uppercase mb-3">{content.workspaceSectionLabel}</div>
              {content.sidebarItems.map(item => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setActiveWorkspaceTab(item)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${activeWorkspaceTab === item ? 'bg-brand-accent/20 text-brand-accent' : 'text-white/60 hover:bg-white/5'}`}
                >
                  {item}
                </button>
              ))}
            </div>
            
            {/* Main Content */}
            <div className="col-span-9 space-y-4">
              {activeWorkspaceTab === 'Overview' && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-lg border border-white/10 p-4">
                    <div className="text-xs font-mono text-white/40 uppercase mb-2">Agents</div>
                    <div className="text-2xl text-white font-semibold">{content.agents.length}</div>
                    <div className="text-xs text-white/50 mt-1">Running: {runningAgentCount}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg border border-white/10 p-4">
                    <div className="text-xs font-mono text-white/40 uppercase mb-2">Tasks</div>
                    <div className="text-2xl text-white font-semibold">{content.tasks.length}</div>
                    <div className="text-xs text-white/50 mt-1">Running: {runningTaskCount}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg border border-white/10 p-4">
                    <div className="text-xs font-mono text-white/40 uppercase mb-2">Skills</div>
                    <div className="text-2xl text-white font-semibold">{content.skills.length}</div>
                    <div className="text-xs text-white/50 mt-1">Scene: {content.environment.scene}</div>
                  </div>
                </div>
              )}

              {activeWorkspaceTab === 'Agents' && (
                <div className="bg-white/5 rounded-lg border border-white/10 p-4">
                  <div className="text-xs font-mono text-white/40 uppercase mb-3">Agents</div>
                  <div className="grid grid-cols-2 gap-3">
                    {content.agents.map((agent) => (
                      <div key={agent.name} className="rounded-md border border-white/10 bg-black/30 p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-white">{agent.name}</span>
                          <span className={`w-2 h-2 rounded-full ${
                            agent.status === 'running' ? 'bg-green-500' :
                            agent.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                          }`} />
                        </div>
                        <div className="text-xs text-white/60">{agent.type} · {agent.sdkVersion}</div>
                        <div className="text-xs text-white/50 mt-1">HW: {agent.hardware.controller}</div>
                        <div className="text-xs text-white/50">Sensors: {agent.hardware.sensors.join(', ')}</div>
                        <div className="text-xs text-white/50">Actuator: {agent.hardware.actuator}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeWorkspaceTab === 'Tasks' && (
                <div className="bg-white/5 rounded-lg border border-white/10 p-4">
                  <div className="text-xs font-mono text-white/40 uppercase mb-3">Tasks</div>
                  <div className="space-y-3">
                    {content.tasks.map(task => (
                      <div key={task.name} className="rounded-md border border-white/10 bg-black/30 p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-white">{task.name}</span>
                          <span className={`text-[10px] uppercase ${
                            task.status === 'running'
                              ? 'text-green-400'
                              : task.status === 'done'
                                ? 'text-cyan-400'
                                : task.status === 'blocked'
                                  ? 'text-red-400'
                                  : 'text-yellow-400'
                          }`}>{task.status}</span>
                        </div>
                        <div className="text-xs text-white/50">Agents: {task.assignedAgents.join(', ')}</div>
                        <div className="text-xs text-white/50 mt-1">{task.sequence.join(' -> ')}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeWorkspaceTab === 'Skills' && (
                <div className="bg-white/5 rounded-lg border border-white/10 p-4">
                  <div className="text-xs font-mono text-white/40 uppercase mb-3">Skills</div>
                  <div className="grid grid-cols-2 gap-3">
                    {content.skills.map(skill => (
                      <div key={skill.name} className="rounded-md border border-white/10 bg-black/30 p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white">{skill.name}</span>
                          <span className="text-[10px] text-brand-accent">{skill.level}</span>
                        </div>
                        <div className="text-xs text-white/50 mt-1">Cooldown: {skill.cooldown}</div>
                        <div className="text-xs text-white/50">Agents: {skill.assignedAgents.join(', ')}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeWorkspaceTab === 'Environment' && (
                <div className="bg-white/5 rounded-lg border border-white/10 p-4">
                  <div className="text-xs font-mono text-white/40 uppercase mb-3">Environment</div>
                  <div className="rounded-md border border-white/10 bg-black/30 p-3 mb-3">
                    <div className="text-sm text-white">{content.environment.scene}</div>
                    <div className="text-xs text-white/50">{content.environment.weather} · {content.environment.floor}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {content.environment.nodes.map(node => (
                      <div key={node.agent} className="rounded-md border border-white/10 bg-black/30 p-2">
                        <div className="text-xs text-white">{node.agent}</div>
                        <div className="text-[11px] text-white/50">{node.position}</div>
                        <div className={`text-[10px] uppercase mt-1 ${
                          node.state === 'moving'
                            ? 'text-cyan-400'
                            : node.state === 'error'
                              ? 'text-red-400'
                              : node.state === 'charging'
                                ? 'text-yellow-400'
                                : 'text-green-400'
                        }`}>{node.state}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
