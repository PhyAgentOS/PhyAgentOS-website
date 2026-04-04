import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Code2, Shield, Cpu, Brain } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: FileText,
    title: 'State-as-a-File',
    description: '软硬件通过Markdown文件通信，确保完全解耦',
  },
  {
    icon: Code2,
    title: '零代码迁移',
    description: '原生支持跨硬件平台的零代码迁移',
  },
  {
    icon: Shield,
    title: '安全验证',
    description: '基于Multi-Agent Critic的安全纠正机制',
  },
  {
    icon: Cpu,
    title: '动态插件',
    description: '通过hal/drivers/动态加载硬件驱动',
  },
  {
    icon: Brain,
    title: '自进化',
    description: '基于执行经验持续优化工作流',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      if (contentRef.current) {
        const elements = contentRef.current.querySelectorAll('.animate-item');
        const trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 70%',
          onEnter: () => {
            gsap.fromTo(elements,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }
            );
          },
          once: true,
        });
        triggersRef.current.push(trigger);
      }

      // Image animation
      if (imageRef.current) {
        const trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 60%',
          onEnter: () => {
            gsap.fromTo(imageRef.current,
              { opacity: 0, scale: 0.95 },
              { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
            );
          },
          once: true,
        });
        triggersRef.current.push(trigger);
      }
    }, sectionRef);

    return () => {
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="relative py-24 lg:py-32 bg-[#f5f5f0] overflow-hidden"
    >
      {/* Blueprint background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'url(/PhyAgentOS-website/blueprint.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div ref={contentRef}>
              <span className="animate-item inline-block text-sm font-mono text-brand-accent uppercase tracking-wider mb-4">
                核心理念
              </span>
              
              <h2 className="animate-item text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-brand-bg mb-6 leading-tight">
                解耦架构
              </h2>
              
              <p className="animate-item text-xl text-brand-bg/70 mb-4">
                认知与物理执行的分离
              </p>
              
              <p className="animate-item text-base text-brand-bg/60 leading-relaxed mb-10">
                通过构建语言-动作接口，PhyAgentOS将动作表示与具身形态完全解耦，
                实现高推理云端模型到边缘物理执行层的标准化映射。
                采用State-as-a-File协议矩阵，原生支持零代码迁移、
                沙盒驱动的工具自生成，以及基于Multi-Agent Critic验证的安全纠正机制。
              </p>

              {/* Feature grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="animate-item flex items-start gap-3 p-4 rounded-lg bg-white/50 hover:bg-white hover:shadow-soft transition-all duration-300 group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-accent/10 flex items-center justify-center group-hover:bg-brand-accent transition-colors">
                      <feature.icon className="w-5 h-5 text-brand-accent group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-brand-bg text-sm">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-brand-bg/50 mt-0.5">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image */}
            <div 
              ref={imageRef}
              className="relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-brand-accent/10 blur-3xl rounded-full" />
                
                {/* Neural network image */}
                <img
                  src="/PhyAgentOS-website/scene.png"
                  alt="Neural Network"
                  className="relative z-10 w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
