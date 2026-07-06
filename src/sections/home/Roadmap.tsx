import { Check, Clock, Circle } from 'lucide-react';
import SectionHeader from '../../components/layout/SectionHeader';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useT } from '../../i18n/LanguageContext';

const statusConfig = {
  completed: {
    icon: Check,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/25',
    dotColor: 'bg-emerald-600',
  },
  'in-progress': {
    icon: Clock,
    color: 'text-brand-accent',
    bgColor: 'bg-brand-accent/10',
    borderColor: 'border-brand-accent/20',
    dotColor: 'bg-brand-accent',
  },
  pending: {
    icon: Circle,
    color: 'text-brand-text-tertiary',
    bgColor: 'bg-brand-text/[0.03]',
    borderColor: 'border-brand-border',
    dotColor: 'bg-brand-text-tertiary',
  },
};

export default function Roadmap() {
  const t = useT();
const phases = [
  { phase: t.roadmap.phases[0].phase, title: t.roadmap.phases[0].title, period: t.roadmap.phases[0].period, items: [
    { version: 'v0.0.1', title: t.roadmap.phases[0].items[0].title, status: 'completed' as const },
    { version: 'v0.0.2', title: t.roadmap.phases[0].items[1].title, status: 'completed' as const },
    { version: 'v0.0.3', title: t.roadmap.phases[0].items[2].title, status: 'completed' as const },
    { version: 'v0.0.5', title: t.roadmap.phases[0].items[3].title, status: 'completed' as const },
  ]},
  { phase: t.roadmap.phases[1].phase, title: t.roadmap.phases[1].title, period: t.roadmap.phases[1].period, items: [
    { version: 'v0.1.0', title: t.roadmap.phases[1].items[0].title, status: 'completed' as const },
    { version: 'v0.1.1', title: t.roadmap.phases[1].items[1].title, status: 'completed' as const },
    { version: 'v0.1.2', title: t.roadmap.phases[1].items[2].title, status: 'completed' as const },
    { version: 'v0.1.3', title: t.roadmap.phases[1].items[3].title, status: 'completed' as const },
    { version: 'v0.1.4', title: t.roadmap.phases[1].items[4].title, status: 'completed' as const },
    { version: 'v0.1.5', title: t.roadmap.phases[1].items[5].title, status: 'completed' as const },
    { version: 'v0.1.6', title: t.roadmap.phases[1].items[6].title, status: 'in-progress' as const },
  ]},
  { phase: t.roadmap.phases[2].phase, title: t.roadmap.phases[2].title, period: t.roadmap.phases[2].period, items: [
    { version: 'v0.2.0', title: t.roadmap.phases[2].items[0].title, status: 'in-progress' as const },
    { version: 'v0.2.1', title: t.roadmap.phases[2].items[1].title, status: 'pending' as const },
    { version: 'v0.2.2', title: t.roadmap.phases[2].items[2].title, status: 'pending' as const },
  ]},
  { phase: t.roadmap.phases[3].phase, title: t.roadmap.phases[3].title, period: t.roadmap.phases[3].period, items: [
    { version: 'v1.0.0', title: t.roadmap.phases[3].items[0].title, status: 'pending' as const },
    { version: 'v1.0.1', title: t.roadmap.phases[3].items[1].title, status: 'pending' as const },
    { version: 'v1.0.2', title: t.roadmap.phases[3].items[2].title, status: 'pending' as const },
  ]},
];
  return (
    <section id="roadmap" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.02]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-accent/[0.02] rounded-full blur-[200px]" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionHeader
              label={t.roadmap.label}
              title={t.roadmap.title}
              highlight={t.roadmap.highlight}
              description={t.roadmap.description}
            />
          </ScrollReveal>

          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {phases.map((phase, phaseIndex) => (
              <ScrollReveal key={phaseIndex} delay={phaseIndex * 0.15}>
                <div className="h-full rounded-3xl bg-brand-bg-secondary border border-brand-border p-6 sm:p-8 shadow-card hover:shadow-card-hover transition-shadow duration-500">
                  {/* Phase header */}
                  <div className="mb-8 pb-6 border-b border-brand-border">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent-dark text-xs font-mono font-semibold shadow-glow-soft">
                        {phase.phase}
                      </span>
                      <span className="text-xs text-brand-text-tertiary font-mono">
                        {phase.period}
                      </span>
                    </div>
                    <h3 className="text-xl font-display font-bold text-brand-text">
                      {phase.title}
                    </h3>
                  </div>

                  {/* Items */}
                  <div className="space-y-3">
                    {phase.items.map((item, itemIndex) => {
                      const status = statusConfig[item.status];
                      const StatusIcon = status.icon;
                      return (
                        <div
                          key={itemIndex}
                          className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all duration-300 ${status.borderColor} ${status.bgColor}`}
                        >
                          <StatusIcon className={`w-4 h-4 flex-shrink-0 ${status.color}`} />
                          <span className="text-xs font-mono text-brand-text-tertiary w-12 flex-shrink-0">
                            {item.version}
                          </span>
                          <span
                            className={`text-sm ${
                              item.status === 'pending'
                                ? 'text-brand-text-tertiary'
                                : 'text-brand-text font-medium'
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
