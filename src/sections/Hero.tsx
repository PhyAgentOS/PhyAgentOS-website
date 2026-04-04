import { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLAnchorElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    return () => ctx.revert();
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
            <span className="text-sm text-white/90">Introducing PhyAgentOS: The Embodied AI Framework</span>
            <ArrowRight className="w-4 h-4 text-white/60" />
          </a>
          
          {/* Title */}
          <h1 
            ref={titleRef}
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight mb-4"
          >
            Where Intelligence
            <br />
            Meets Physics
          </h1>
          
          {/* Subtitle */}
          <p 
            ref={subtitleRef}
            className="text-xl sm:text-2xl text-white/80 mb-6"
          >
            PhyAgentOS
          </p>
          
          {/* Description */}
          <p 
            ref={descRef}
            className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Build, deploy and orchestrate embodied AI agents across the four key components of
            physical intelligence: Perception, Cognition, Action and Learning.
          </p>
          
          {/* Buttons */}
          <div ref={buttonsRef} className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/SYSU-HCP-EAI/PhyAgentOS/blob/main/docs/USER_MANUAL.md"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-brand-accent hover:bg-brand-accent-light text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2 group"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://github.com/SYSU-HCP-EAI/PhyAgentOS/blob/main/docs/plans/Report.md"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium rounded-lg border border-white/20 transition-all duration-300"
            >
              Explore Docs
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
                phyagentos.workspace
              </div>
            </div>
          </div>
          
          {/* Mockup Content */}
          <div className="bg-[#0a0a0a] p-6 grid grid-cols-12 gap-4">
            {/* Sidebar */}
            <div className="col-span-3 space-y-2">
              <div className="text-xs font-mono text-white/40 uppercase mb-3">Workspace</div>
              {['Overview', 'Agents', 'Tasks', 'Skills', 'Environment'].map((item, i) => (
                <div 
                  key={item}
                  className={`px-3 py-2 rounded-md text-sm ${i === 0 ? 'bg-brand-accent/20 text-brand-accent' : 'text-white/60 hover:bg-white/5'}`}
                >
                  {item}
                </div>
              ))}
            </div>
            
            {/* Main Content */}
            <div className="col-span-6 space-y-4">
              <div className="text-lg font-medium text-white mb-4">Active Agents</div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'AgileX PIPER', status: 'running', type: 'Arm' },
                  { name: 'Unitree GO2', status: 'idle', type: 'Quadruped' },
                  { name: 'DoBot NOVA 2', status: 'running', type: 'Arm' },
                  { name: 'FRANKA R3', status: 'error', type: 'Arm' },
                ].map((agent) => (
                  <div key={agent.name} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">{agent.name}</span>
                      <span className={`w-2 h-2 rounded-full ${
                        agent.status === 'running' ? 'bg-green-500' : 
                        agent.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                      }`} />
                    </div>
                    <div className="text-xs text-white/50">{agent.type}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Panel */}
            <div className="col-span-3 space-y-4">
              <div className="text-xs font-mono text-white/40 uppercase mb-3">System Status</div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Agents</span>
                  <span className="text-white">4</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Tasks</span>
                  <span className="text-white">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Skills</span>
                  <span className="text-white">28</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
