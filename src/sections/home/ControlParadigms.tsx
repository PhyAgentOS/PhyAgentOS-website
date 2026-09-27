import { BarChart3, Bot, Layers3, Network, Settings2, Workflow, Wrench } from 'lucide-react';
import SectionHeader from '../../components/layout/SectionHeader';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useT } from '../../i18n/LanguageContext';
import './control-paradigms.css';

const paradigms = [
  { id: 'general', icon: Bot },
  { id: 'hybrid', icon: Network },
  { id: 'action', icon: Workflow },
] as const;

const foundationIcons = [Bot, Wrench, Settings2, BarChart3];

export default function ControlParadigms() {
  const { controlParadigms: copy } = useT();

  return (
    <section id="control-paradigms" className="control-paradigms relative scroll-mt-20 overflow-hidden py-24 lg:py-32">
      {/* Preserve incoming links to the former task section. */}
      <span id="scenarios" className="absolute top-0 scroll-mt-20" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.02]" />
      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionHeader
              label={copy.label}
              labelIcon={<Layers3 className="h-3.5 w-3.5" />}
              title={copy.title}
              highlight={copy.highlight}
              description={copy.description}
              className="control-paradigms-heading"
            />
          </ScrollReveal>

          <ScrollReveal className="mt-12 sm:mt-16" delay={0.1}>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
              {paradigms.map(({ id, icon: Icon }, index) => {
                const item = copy.items[index];
                return (
                  <article className="control-card rounded-3xl border p-6 sm:p-8" data-mode={id} key={id}>
                    <div className="control-icon mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border shadow-soft">
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <p className="control-eyebrow text-xs font-medium leading-6">{item.subtitle}</p>
                    <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-brand-text sm:text-3xl">{item.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-brand-text-secondary">{item.description}</p>
                    <ul className="mt-6 space-y-3 text-sm text-brand-text-secondary">
                      {item.features.map((feature) => (
                        <li className="flex items-start gap-3" key={feature}>
                          <span className="control-dot mt-2 h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>

            <div className="control-connectors" aria-hidden="true">
              <svg viewBox="0 0 1000 48" preserveAspectRatio="none" className="hidden h-full w-full lg:block">
                <path d="M166 0 V12 Q166 30 184 30 H482 Q500 30 500 48 M834 0 V12 Q834 30 816 30 H518 Q500 30 500 48 M500 0 V48" />
                <circle cx="166" cy="4" r="3" className="control-node-general" />
                <circle cx="500" cy="4" r="3" className="control-node-hybrid" />
                <circle cx="834" cy="4" r="3" className="control-node-action" />
              </svg>
            </div>

            <div className="control-foundation rounded-3xl border p-5 sm:p-7">
              <div className="flex items-center justify-center gap-3">
                <Layers3 className="h-7 w-7 shrink-0 text-brand-accent" aria-hidden="true" />
                <h3 className="font-display text-xl font-bold text-brand-text sm:text-3xl">{copy.foundationTitle}</h3>
              </div>
              <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-6 text-brand-text-secondary">{copy.foundationDescription}</p>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {copy.foundationItems.map((item, index) => {
                  const Icon = foundationIcons[index];
                  return (
                    <li className="flex items-center gap-4 rounded-2xl border border-brand-border/60 bg-brand-bg-secondary/70 px-5 py-4" key={item.title}>
                      <Icon className="h-6 w-6 shrink-0 text-brand-accent" aria-hidden="true" />
                      <div>
                        <h4 className="text-sm font-semibold text-brand-text">{item.title}</h4>
                        <p className="mt-1 text-xs leading-5 text-brand-text-secondary">{item.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
