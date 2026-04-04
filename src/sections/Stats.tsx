import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 54, suffix: '+', label: 'GitHub Stars' },
  { value: 8, suffix: '+', label: 'Supported Robots' },
  { value: 5, suffix: '', label: 'Core Contributors' },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: value,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function() {
            setDisplayValue(Math.floor(this.targets()[0].val));
          },
        });
      },
      once: true,
    });

    return () => trigger.kill();
  }, [value]);

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  );
}

export default function Stats() {
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
      className="relative py-24 lg:py-32 bg-brand-bg overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <div ref={contentRef}>
            {/* Header */}
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              <div>
                <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
                  Impact Metrics
                </h2>
              </div>
              <div>
                <p className="text-white/50 leading-relaxed">
                  PhyAgentOS doesn't just orchestrate AI agents—it accelerates embodied AI development. 
                  By unifying perception, cognition, and action, we're transforming how quickly teams 
                  can build, deploy, and iterate on physical intelligence.
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="relative corner-bracket p-8"
                >
                  <div className="text-6xl sm:text-7xl lg:text-8xl font-display font-bold text-white mb-2">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-white/40 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
