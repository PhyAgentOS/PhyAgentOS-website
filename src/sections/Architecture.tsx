import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Cpu, Eye, Hand, FileText, Cog, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const trackAItems = [
  { icon: Brain, label: 'AgentLoop', sublabel: 'Orchestration' },
  { icon: FileText, label: 'ContextBuilder', sublabel: 'Context' },
  { icon: Cog, label: 'ToolRegistry', sublabel: 'Tools' },
];

const trackBItems = [
  { icon: Eye, label: 'HAL Watchdog', sublabel: 'Monitor' },
  { icon: Cpu, label: 'Driver Layer', sublabel: 'Drivers' },
  { icon: Hand, label: 'Physical Exec', sublabel: 'Action' },
];

const protocolFiles = [
  'ENVIRONMENT.md',
  'EMBODIED.md',
  'ACTION.md',
  'LESSONS.md',
  'TASK.md',
  'SKILL.md',
];

export default function Architecture() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(contentRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="architecture"
      className="relative py-24 lg:py-32 bg-brand-bg overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <div ref={contentRef}>
            {/* Header */}
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 bg-brand-accent/10 text-brand-accent text-xs font-mono uppercase tracking-wider rounded mb-4">
                Architecture
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
                Dual-Track Intelligence
              </h2>
              <p className="text-lg text-white/50 max-w-2xl mx-auto">
                Cognition and execution working in harmony through a shared protocol surface
              </p>
            </div>

            {/* Architecture Diagram */}
            <div className="relative">
              {/* Main container */}
              <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6">
                
                {/* Track A: Cognitive Core */}
                <div className="flex-1 max-w-sm bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-white">Track A</h3>
                      <p className="text-xs font-mono text-emerald-400">Cognitive Core</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {trackAItems.map((item, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                      >
                        <item.icon className="w-4 h-4 text-emerald-400" />
                        <div>
                          <p className="text-sm font-medium text-white">{item.label}</p>
                          <p className="text-xs text-white/40">{item.sublabel}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Critic badge */}
                  <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                    <p className="text-xs font-mono text-amber-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      Multi-Agent Critic
                    </p>
                  </div>
                </div>

                {/* Center: Shared Protocol */}
                <div className="flex flex-col items-center justify-center gap-4 lg:w-56">
                  {/* Connection arrows */}
                  <div className="hidden lg:flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-brand-accent" />
                    <span className="text-xs font-mono text-white/40">Read</span>
                  </div>

                  {/* Protocol Surface */}
                  <div className="relative w-full max-w-xs aspect-square">
                    <div className="absolute inset-0 bg-brand-accent/20 blur-2xl rounded-full" />
                    <div className="relative h-full rounded-xl bg-white/5 border-2 border-brand-accent/50 flex flex-col items-center justify-center p-4">
                      <FileText className="w-8 h-8 text-brand-accent mb-2" />
                      <p className="text-sm font-display font-bold text-white text-center">Workspace</p>
                      <p className="text-xs text-white/40 text-center">Shared Protocol</p>
                      <p className="text-xs font-mono text-brand-accent mt-1">State is File</p>
                    </div>
                  </div>

                  {/* Connection arrows */}
                  <div className="hidden lg:flex items-center gap-2">
                    <span className="text-xs font-mono text-white/40">Write</span>
                    <ArrowRight className="w-5 h-5 text-brand-accent rotate-180" />
                  </div>
                </div>

                {/* Track B: Physical Execution */}
                <div className="flex-1 max-w-sm bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-rose-500/20 flex items-center justify-center">
                      <Cpu className="w-5 h-5 text-rose-400" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-white">Track B</h3>
                      <p className="text-xs font-mono text-rose-400">Physical Execution</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {trackBItems.map((item, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                      >
                        <item.icon className="w-4 h-4 text-rose-400" />
                        <div>
                          <p className="text-sm font-medium text-white">{item.label}</p>
                          <p className="text-xs text-white/40">{item.sublabel}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Fleet mode badge */}
                  <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <p className="text-xs font-mono text-blue-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                      Fleet Mode
                    </p>
                  </div>
                </div>
              </div>

              {/* Protocol files */}
              <div className="mt-10 flex flex-wrap justify-center gap-2">
                {protocolFiles.map((file, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded font-mono text-xs text-white/50 hover:border-brand-accent hover:text-brand-accent transition-colors"
                  >
                    {file}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
