import { Bug, Gamepad2, Box, Bot, ArrowRight, Sparkles } from 'lucide-react';
import TiltCard from '../../components/animations/TiltCard';
import SectionHeader from '../../components/layout/SectionHeader';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useT } from '../../i18n/LanguageContext';

export default function Scenarios() {
  const t = useT();
const scenarios = [
  { icon: Bug, title: t.scenarios.items[0].title, subtitle: t.scenarios.items[0].subtitle, description: t.scenarios.items[0].description, features: t.scenarios.items[0].features, color: 'from-emerald-400/12 to-teal-400/12', borderColor: 'border-emerald-500/20', iconColor: 'text-emerald-700', accentColor: 'bg-emerald-500' },
  { icon: Gamepad2, title: t.scenarios.items[1].title, subtitle: t.scenarios.items[1].subtitle, description: t.scenarios.items[1].description, features: t.scenarios.items[1].features, color: 'from-purple-400/12 to-fuchsia-400/12', borderColor: 'border-purple-500/20', iconColor: 'text-purple-700', accentColor: 'bg-purple-500' },
  { icon: Box, title: t.scenarios.items[2].title, subtitle: t.scenarios.items[2].subtitle, description: t.scenarios.items[2].description, features: t.scenarios.items[2].features, color: 'from-sky-400/12 to-indigo-400/12', borderColor: 'border-sky-500/20', iconColor: 'text-sky-700', accentColor: 'bg-sky-500' },
  { icon: Bot, title: t.scenarios.items[3].title, subtitle: t.scenarios.items[3].subtitle, description: t.scenarios.items[3].description, features: t.scenarios.items[3].features, color: 'from-amber-400/12 to-orange-400/12', borderColor: 'border-amber-500/20', iconColor: 'text-amber-700', accentColor: 'bg-amber-500' },
];
  return (
    <section id="scenarios" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.02]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-accent/[0.02] rounded-full blur-[200px]" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionHeader
              label={t.scenarios.label}
              labelIcon={<Sparkles className="w-3.5 h-3.5" />}
              title={t.scenarios.title}
              highlight={t.scenarios.highlight}
              description={t.scenarios.description}
            />
          </ScrollReveal>

          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {scenarios.map((scenario, index) => {
              const Icon = scenario.icon;
              return (
                <ScrollReveal key={index} delay={index * 0.15}>
                  <TiltCard
                    className={`h-full rounded-3xl border ${scenario.borderColor} bg-gradient-to-b ${scenario.color} p-6 sm:p-8 group cursor-default shadow-card hover:shadow-card-hover transition-shadow duration-500`}
                    tiltAmount={5}
                    scale={1.01}
                  >
                    <div className="relative z-10 h-full flex flex-col">
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-2xl bg-brand-bg-secondary/80 border border-brand-border flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-soft`}>
                        <Icon className={`w-7 h-7 ${scenario.iconColor}`} />
                      </div>

                      {/* Title */}
                      <div className="mb-4">
                        <p className={`text-xs font-mono uppercase tracking-wider ${scenario.iconColor} mb-2`}>
                          {scenario.subtitle}
                        </p>
                        <h3 className="text-2xl font-display font-bold text-brand-text">
                          {scenario.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-brand-text-secondary leading-relaxed mb-6 flex-grow">
                        {scenario.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2.5 mb-6">
                        {scenario.features.map((feature, fidx) => (
                          <div key={fidx} className="flex items-center gap-2.5">
                            <div className={`w-1.5 h-1.5 rounded-full ${scenario.accentColor}`} />
                            <span className="text-xs text-brand-text-tertiary">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Link */}
                      <div className="flex items-center gap-2 text-sm font-semibold text-brand-text-secondary group-hover:text-brand-text transition-colors">
                        <span>{t.scenarios.learnMore}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </TiltCard>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Complementary note */}
          <ScrollReveal delay={0.3}>
            <div className="mt-16 text-center">
                            <p className="text-sm text-brand-text-tertiary max-w-2xl mx-auto">
                {t.scenarios.note}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
