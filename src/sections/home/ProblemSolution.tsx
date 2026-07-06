import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Brain, FileText, Shield, RotateCcw } from 'lucide-react';
import SectionHeader from '../../components/layout/SectionHeader';
import { useT } from '../../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function ProblemSolution() {
  const t = useT();
const problems = [
  { icon: Brain, pain: t.problemSolution.items[0].pain, detail: t.problemSolution.items[0].detail, solution: t.problemSolution.items[0].solution, solutionDetail: t.problemSolution.items[0].solutionDetail },
  { icon: Shield, pain: t.problemSolution.items[1].pain, detail: t.problemSolution.items[1].detail, solution: t.problemSolution.items[1].solution, solutionDetail: t.problemSolution.items[1].solutionDetail },
  { icon: FileText, pain: t.problemSolution.items[2].pain, detail: t.problemSolution.items[2].detail, solution: t.problemSolution.items[2].solution, solutionDetail: t.problemSolution.items[2].solutionDetail },
  { icon: RotateCcw, pain: t.problemSolution.items[3].pain, detail: t.problemSolution.items[3].detail, solution: t.problemSolution.items[3].solution, solutionDetail: t.problemSolution.items[3].solutionDetail },
];

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.problem-card');
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { x: i % 2 === 0 ? -50 : 50 },
          {
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="problems"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-[0.02]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-accent/[0.02] rounded-full blur-[150px]" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            label={t.problemSolution.label}
            title={t.problemSolution.title}
            highlight={t.problemSolution.highlight}
            description="Four fundamental challenges that have blocked embodied intelligence, and how PhyAgentOS solves each one."
          />

          <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {problems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="problem-card group relative"
                >
                  <div className="relative p-6 sm:p-8 rounded-3xl bg-brand-bg-secondary border border-brand-border hover:border-brand-accent/30 transition-all duration-500 overflow-hidden shadow-card hover:shadow-card-hover">
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-accent/[0.03] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-6">
                        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-rose-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-brand-text mb-1">
                            {item.pain}
                          </h3>
                          <p className="text-sm text-brand-text-tertiary">
                            {item.detail}
                          </p>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="flex justify-center my-5">
                        <div className="w-9 h-9 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center shadow-glow-soft">
                          <svg className="w-4 h-4 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        </div>
                      </div>

                      {/* Solution */}
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center">
                          <Check className="w-6 h-6 text-brand-accent-dark" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-brand-text mb-1">
                            {item.solution}
                          </h3>
                          <p className="text-sm text-brand-text-secondary">
                            {item.solutionDetail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
