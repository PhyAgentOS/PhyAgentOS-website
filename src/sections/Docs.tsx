import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Code, FileCode, ArrowRight, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const docItems = [
  {
    title: '技术资料',
    subtitle: 'Architecture',
    description: '深入了解 PhyAgentOS 的系统架构设计，包括 State-as-a-File 协议、双轨架构和组件交互流程。',
    icon: BookOpen,
    href: `${import.meta.env.BASE_URL}docs/current_architecture_flowchart.html`,
    color: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
  },
  {
    title: 'API 使用',
    subtitle: 'API Reference',
    description: '完整的 API 文档，涵盖核心模块、驱动接口、协议表面和工具链的详细使用说明。',
    icon: Code,
    href: '#',
    color: 'from-blue-500/20 to-indigo-500/20',
    iconColor: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    comingSoon: true,
  },
  {
    title: '开发文档',
    subtitle: 'Developer Guide',
    description: '开发者指南，学习如何扩展 PhyAgentOS，创建自定义驱动和插件，以及最佳实践。',
    icon: FileCode,
    href: '#',
    color: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    comingSoon: true,
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
                文档中心
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                探索 PhyAgentOS 的技术文档，从架构设计到 API 参考，助你快速构建具身智能应用
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
                    className={`group relative rounded-2xl border ${item.borderColor} bg-gradient-to-br ${item.color} backdrop-blur-sm p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
                      item.comingSoon ? 'pointer-events-none opacity-70' : ''
                    }`}
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
                      {item.comingSoon ? (
                        <span className="text-sm text-white/40">即将推出</span>
                      ) : (
                        <span className={`text-sm ${item.iconColor} font-medium`}>
                          查看文档
                        </span>
                      )}
                      {item.comingSoon ? (
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                          <span className="text-white/30 text-xs">-</span>
                        </div>
                      ) : (
                        <div
                          className={`w-8 h-8 rounded-lg ${item.iconColor} bg-black/30 flex items-center justify-center transition-all duration-300 group-hover:translate-x-1`}
                        >
                          {item.href.includes('.html') ? (
                            <ExternalLink className="w-4 h-4" />
                          ) : (
                            <ArrowRight className="w-4 h-4" />
                          )}
                        </div>
                      )}
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
