import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Code, FileCode, ArrowRight, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const docItems = [
  {
    title: 'Architecture',
    subtitle: 'Technical Documentation',
    description: 'Deep dive into PhyAgentOS system architecture design, including State-as-a-File protocol, dual-track architecture, and component interaction flows.',
    icon: BookOpen,
    href: `${import.meta.env.BASE_URL}docs/en/architecture.html`,
    color: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
  },
  {
    title: 'API Reference',
    subtitle: 'API Documentation',
    description: 'Plugin installation, Watchdog invocation, ACTION.md debugging, and Markdown file format specifications.',
    icon: Code,
    href: `${import.meta.env.BASE_URL}docs/en/api-reference.html`,
    color: 'from-blue-500/20 to-indigo-500/20',
    iconColor: 'text-blue-400',
    borderColor: 'border-blue-500/30',
  },
  {
    title: 'Developer Guide',
    subtitle: 'Development Guide',
    description: 'ReKep plugin example, new Driver integration, code style conventions, contribution workflow, and roadmap.',
    icon: FileCode,
    href: `${import.meta.env.BASE_URL}docs/en/developer-guide.html`,
    color: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-400',
    borderColor: 'border-amber-500/30',
  },
];

export default function Docs() {
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
      id="docs"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-brand-bg overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-accent/5 to-transparent" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <div ref={contentRef}>
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
                Documentation
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Explore PhyAgentOS technical documentation, from architecture design to API references, to help you build embodied AI applications quickly.
              </p>
            </div>

            {/* Docs Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {docItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    target={item.href.startsWith('http') || item.href.includes('.html') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') || item.href.includes('.html') ? 'noopener noreferrer' : undefined}
                    className={`group relative rounded-2xl border ${item.borderColor} bg-gradient-to-br ${item.color} backdrop-blur-sm p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
                  >
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-xl ${item.iconColor} bg-black/30 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <p className="text-sm text-white/50 uppercase tracking-wider mb-1">
                        {item.subtitle}
                      </p>
                      <h3 className="text-2xl font-display font-bold text-white mb-3">
                        {item.title}
                      </h3>
                      <p className="text-white/60 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
                      <span className={`text-sm ${item.iconColor} font-medium`}>
                        View Documentation
                      </span>
                      <div
                        className={`w-8 h-8 rounded-lg ${item.iconColor} bg-black/30 flex items-center justify-center transition-all duration-300 group-hover:translate-x-1`}
                      >
                        {item.href.includes('.html') ? (
                          <ExternalLink className="w-4 h-4" />
                        ) : (
                          <ArrowRight className="w-4 h-4" />
                        )}
                      </div>
                    </div>

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

