import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, GitBranch, Puzzle, Shield, Cpu, Brain } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: FileText,
    title: 'State-as-a-File',
    description: 'Software and hardware communicate through Markdown files, ensuring complete decoupling and maximum transparency.',
  },
  {
    icon: GitBranch,
    title: 'Dual-Track Architecture',
    description: 'Track A handles cognitive planning with multi-agent critics. Track B manages physical execution with hardware watchdogs.',
  },
  {
    icon: Puzzle,
    title: 'Dynamic Plugin System',
    description: 'Load external hardware drivers dynamically through hal/drivers/ without modifying core code.',
  },
  {
    icon: Shield,
    title: 'Safety Verification',
    description: 'Strict action validation and LESSONS.md experience database prevent agent workflow失控.',
  },
  {
    icon: Cpu,
    title: 'Cross-Embodiment',
    description: 'Describe robot capability constraints through EMBODIED.md for seamless task migration across different robots.',
  },
  {
    icon: Brain,
    title: 'Self-Evolving',
    description: 'Automatically update SKILL.md and LESSONS.md based on execution experience for continuous workflow optimization.',
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      if (cardsRef.current) {
        gsap.fromTo(cardsRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
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
      id="features"
      className="relative py-24 lg:py-32 bg-brand-bg overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="mb-16">
            <span className="inline-block px-3 py-1 bg-brand-accent/10 text-brand-accent text-xs font-mono uppercase tracking-wider rounded mb-4">
              Features
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
              Everything you need to
              <br />
              <span className="text-brand-accent">build & deploy agents</span>, in one place
            </h2>
            <p className="text-lg text-white/50 max-w-2xl">
              The complete toolkit for orchestrating, sharing, and collaborating on embodied intelligence projects.
            </p>
          </div>

          {/* Features Grid */}
          <div 
            ref={cardsRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-brand-accent/30 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-brand-accent/10 flex items-center justify-center mb-4 group-hover:bg-brand-accent/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-brand-accent" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-display font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover glow */}
                <div className="absolute inset-0 bg-brand-accent/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
