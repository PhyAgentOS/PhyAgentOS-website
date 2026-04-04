import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(contentRef.current.children,
          { opacity: 0, y: 30 },
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
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/PhyAgentOS-website/human_robot.png)',
          backgroundSize: '100% auto',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-[1]" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <div ref={contentRef}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Every Agent has a Story,
              <br />
              <span className="text-brand-accent">Build it with PhyAgentOS</span>
            </h2>
            
            <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto">
              Join the community of researchers and developers building the future of embodied AI.
            </p>
            
            <a
              href="https://github.com/SYSU-HCP-EAI/PhyAgentOS/blob/main/docs/USER_MANUAL.md"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-brand-accent hover:bg-brand-accent-light text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2 group mx-auto"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
