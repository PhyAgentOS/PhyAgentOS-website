import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Circle, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const phases = [
  {
    phase: 'Phase 1',
    title: '桌面循环与协议建立',
    items: [
      { version: 'v0.0.1', title: '框架设计与初始化', status: 'completed' },
      { version: 'v0.0.2', title: '具身技能插件部署', status: 'completed' },
      { version: 'v0.0.3', title: '视觉解耦 + 抓取管道', status: 'completed' },
      { version: 'v0.0.4', title: '基于原子动作的VLN', status: 'completed' },
      { version: 'v0.0.5', title: '多智能体协议设计', status: 'completed' },
      { version: 'v0.0.6', title: '长程任务分解与执行', status: 'in-progress' },
      { version: 'v0.0.7', title: 'IoT设备集成', status: 'pending' },
    ],
  },
  {
    phase: 'Phase 2',
    title: '多具身协调与记忆',
    items: [
      { version: 'v0.1.0', title: 'Fleet模式多机协调', status: 'pending' },
      { version: 'v0.1.1', title: '多模态记忆系统', status: 'pending' },
      { version: 'v0.1.2', title: '跨机器人技能迁移', status: 'pending' },
    ],
  },
  {
    phase: 'Phase 3',
    title: '约束求解与高级协调',
    items: [
      { version: 'v1.0.0', title: '约束求解引擎', status: 'pending' },
      { version: 'v1.0.1', title: '高级异构协调', status: 'pending' },
      { version: 'v1.0.2', title: '自主任务规划', status: 'pending' },
    ],
  },
];

export default function Roadmap() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        const elements = contentRef.current.querySelectorAll('.animate-item');
        const trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 70%',
          onEnter: () => {
            gsap.fromTo(elements,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }
            );
          },
          once: true,
        });
        triggersRef.current.push(trigger);
      }
    }, sectionRef);

    return () => {
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="w-3.5 h-3.5 text-emerald-400" />;
      case 'in-progress':
        return <Clock className="w-3.5 h-3.5 text-brand-accent" />;
      default:
        return <Circle className="w-3.5 h-3.5 text-brand-border" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-emerald-400/30 bg-emerald-400/5';
      case 'in-progress':
        return 'border-brand-accent/30 bg-brand-accent/5';
      default:
        return 'border-brand-border bg-brand-bg-tertiary/50';
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="roadmap"
      className="relative py-24 lg:py-32 bg-brand-bg overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div ref={contentRef} className="text-center mb-16 lg:mb-20">
            <span className="animate-item inline-block text-sm font-mono text-brand-accent uppercase tracking-wider mb-4">
              发展规划
            </span>
            <h2 className="animate-item text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
              路线图
            </h2>
            <p className="animate-item text-lg text-brand-text-muted max-w-2xl mx-auto">
              PhyAgentOS的发展历程，从桌面循环到高级异构协调
            </p>
          </div>

          {/* Roadmap */}
          <div className="animate-item grid lg:grid-cols-3 gap-8">
            {phases.map((phase, phaseIndex) => (
              <div 
                key={phaseIndex}
                className="bg-brand-bg-secondary border border-brand-border rounded-lg p-6"
              >
                {/* Phase header */}
                <div className="mb-6 pb-4 border-b border-brand-border">
                  <span className="inline-block px-3 py-1 bg-brand-accent/10 text-brand-accent text-xs font-mono rounded mb-2">
                    {phase.phase}
                  </span>
                  <h3 className="text-xl font-display font-bold text-white">
                    {phase.title}
                  </h3>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {phase.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${getStatusClass(item.status)}`}
                    >
                      {getStatusIcon(item.status)}
                      <span className="text-xs font-mono text-brand-text-muted w-12 flex-shrink-0">
                        {item.version}
                      </span>
                      <span className={`text-sm ${item.status === 'pending' ? 'text-brand-text-muted' : 'text-white'}`}>
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
