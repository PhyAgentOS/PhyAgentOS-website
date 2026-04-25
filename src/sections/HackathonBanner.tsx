import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Target,
  MapPin,
  RefreshCw,
  Shield,
  Plug,
  Zap,
  Trophy,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const quickDirections = [
  { icon: Target, label: 'Precision Manipulation' },
  { icon: MapPin, label: 'Semantic Navigation' },
  { icon: RefreshCw, label: 'Long-Horizon Tasks' },
  { icon: Shield, label: 'Safety Evolution' },
  { icon: Plug, label: 'Hardware Integration' },
];

export default function HackathonBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
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
      className="relative py-16 lg:py-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/20 via-brand-accent/10 to-brand-accent/20" />
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent" />

      {/* Animated glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-accent/10 rounded-full blur-[100px]" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div ref={contentRef} className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left: Main info */}
            <div className="flex-1 text-center lg:text-left">
              {/* Live badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/15 border border-brand-accent/30 rounded-full mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent" />
                </span>
                <span className="text-xs font-semibold text-brand-accent-light uppercase tracking-wider">
                  2026 BETA Hackathon
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-3 tracking-tight">
                Build the Future of
                <br />
                <span className="text-gradient">Embodied AI</span>
              </h2>

              <p className="text-white/60 text-base sm:text-lg max-w-xl mb-6 leading-relaxed">
                You focus on creativity, we handle making the agent
                <span className="text-white/80"> "rememberable, correctable, and comprehensible"</span>.
              </p>

              {/* Quick direction pills */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                {quickDirections.map((dir, idx) => {
                  const Icon = dir.icon;
                  return (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white/60"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {dir.label}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                <Link
                  to="/hackathon"
                  className="px-6 py-3 bg-brand-accent hover:bg-brand-accent-light text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 group shadow-glow hover:shadow-glow-lg"
                >
                  <Zap className="w-4 h-4" />
                  Join Hackathon
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="https://github.com/PhyAgentOS/PhyAgentOS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-medium rounded-xl border border-white/15 transition-all duration-300 flex items-center gap-2"
                >
                  <Trophy className="w-4 h-4" />
                  View Prizes
                </a>
              </div>
            </div>

            {/* Right: Visual element */}
            <div className="flex-shrink-0 w-full max-w-sm lg:max-w-md">
              <div className="relative p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-accent/40 rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brand-accent/40 rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-brand-accent/40 rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-accent/40 rounded-br-xl" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-white/40 uppercase">Evaluation</span>
                    <span className="text-xs text-brand-accent">40% Demo + 30% Docs + 30% Creativity</span>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="text-2xl font-display font-bold text-white mb-1">5</div>
                      <div className="text-xs text-white/50">Challenge Tracks</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="text-2xl font-display font-bold text-white mb-1">∞</div>
                      <div className="text-xs text-white/50">Creativity</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-brand-accent/10 border border-brand-accent/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-brand-accent" />
                      <span className="text-sm font-medium text-white">Required Stack</span>
                    </div>
                    <div className="text-xs text-white/50 space-y-1">
                      <div>• hal_watchdog.py (Track B)</div>
                      <div>• Markdown Protocol (ACTION.md / ENVIRONMENT.md)</div>
                      <div>• Optional: Custom HAL drivers, SKILL.md, LESSONS.md</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
