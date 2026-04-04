import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "PhyAgentOS's dual-track architecture makes embodied AI development incredibly intuitive. The State-as-a-File protocol is a game changer for robotics research.",
    author: 'Research Team',
    role: 'HCP Lab, Sun Yat-sen University',
    avatar: 'H',
  },
  {
    quote: "The cross-embodiment capability allows us to deploy the same task logic across different robot platforms seamlessly. It's a fantastic tool for rapid prototyping.",
    author: 'Contributors',
    role: 'Open Source Community',
    avatar: 'C',
  },
  {
    quote: "Having a unified framework where perception, cognition, and action work together through a shared protocol surface simplifies the entire development pipeline.",
    author: 'Developers',
    role: 'Robotics Engineers',
    avatar: 'D',
  },
];

export default function Testimonials() {
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
      className="relative py-24 lg:py-32 bg-brand-bg-light overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-dark opacity-10" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <div ref={contentRef}>
            {/* Testimonials Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="dashed-card rounded-xl p-6 hover:bg-white/50 transition-colors"
                >
                  <p className="text-brand-text-dark/70 leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center">
                      <span className="text-brand-accent font-display font-bold">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-brand-text-dark">{testimonial.author}</p>
                      <p className="text-sm text-brand-text-dark/50">{testimonial.role}</p>
                    </div>
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
