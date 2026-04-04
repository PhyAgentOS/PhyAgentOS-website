import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Demo() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(contentRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
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
      className="relative py-24 bg-brand-bg overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Torn edge top */}
      <div 
        className="absolute top-0 left-0 right-0 h-16 bg-brand-bg"
        style={{
          clipPath: 'polygon(0% 100%, 2% 80%, 4% 95%, 6% 75%, 8% 90%, 10% 70%, 12% 85%, 14% 65%, 16% 80%, 18% 60%, 20% 75%, 22% 55%, 24% 70%, 26% 50%, 28% 65%, 30% 45%, 32% 60%, 34% 40%, 36% 55%, 38% 35%, 40% 50%, 42% 30%, 44% 45%, 46% 25%, 48% 40%, 50% 20%, 52% 35%, 54% 15%, 56% 30%, 58% 10%, 60% 25%, 62% 5%, 64% 20%, 66% 0%, 68% 15%, 70% 0%, 72% 10%, 74% 0%, 76% 5%, 78% 0%, 80% 10%, 82% 0%, 84% 5%, 86% 0%, 88% 10%, 90% 0%, 92% 5%, 94% 0%, 96% 10%, 98% 5%, 100% 20%, 100% 100%)',
        }}
      />

      <div ref={contentRef} className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Building Better
              <br />
              <span className="text-brand-accent">Agent Workflows</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Developers build embodied AI agents on PhyAgentOS, enabling seamless 
              coordination between perception, cognition, and physical action.
            </p>
          </div>

          {/* Demo Image */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src="/scene.png"
              alt="Robot Assembly"
              className="w-full h-auto"
            />
            
            {/* Overlay UI */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="text-xs font-mono text-white/40 mb-1">TASK PROGRESS</div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-brand-accent rounded-full" />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-display font-bold text-white">75%</div>
                  <div className="text-xs text-white/40">Complete</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
