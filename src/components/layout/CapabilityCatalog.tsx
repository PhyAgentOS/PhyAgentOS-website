import { ArrowLeft, ArrowRight, CheckCircle2, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../animations/ScrollReveal';
import SectionHeader from './SectionHeader';

export interface CapabilityItem {
  name: string;
  category: string;
  status: 'available' | 'evaluating';
  description: string;
  capabilities: string[];
}

interface CapabilityCatalogProps {
  label: string;
  title: string;
  highlight: string;
  description: string;
  countLabel: string;
  availableLabel: string;
  evaluatingLabel: string;
  backLabel: string;
  items: CapabilityItem[];
}

export default function CapabilityCatalog({
  label,
  title,
  highlight,
  description,
  countLabel,
  availableLabel,
  evaluatingLabel,
  backLabel,
  items,
}: CapabilityCatalogProps) {
  return (
    <div className="min-h-screen pt-24 lg:pt-32">
      <div className="px-6 pb-24 sm:px-8 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <Link
              to="/"
              className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-brand-text-tertiary transition-colors hover:text-brand-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </Link>
            <SectionHeader
              label={label}
              title={title}
              highlight={highlight}
              description={description}
              align="left"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-12 inline-flex items-end gap-3 rounded-2xl border border-brand-accent/20 bg-brand-accent/[0.06] px-6 py-4 shadow-glow-soft">
              <span className="font-display text-4xl font-bold leading-none text-brand-text">{items.length}</span>
              <span className="pb-1 text-sm font-medium text-brand-text-secondary">{countLabel}</span>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item, index) => {
              const isAvailable = item.status === 'available';
              const StatusIcon = isAvailable ? CheckCircle2 : FlaskConical;

              return (
                <ScrollReveal key={item.name} delay={Math.min(index * 0.06, 0.3)}>
                  <article className="group relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-3xl border border-brand-border bg-brand-bg-secondary p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-brand-accent/25 hover:shadow-card-hover">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/[0.05] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative z-10 flex h-full flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <span className="rounded-full border border-brand-border bg-brand-text/[0.03] px-3 py-1 text-xs font-mono uppercase tracking-wider text-brand-text-tertiary">
                          {item.category}
                        </span>
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${isAvailable ? 'text-emerald-600' : 'text-amber-600'}`}>
                          <StatusIcon className="h-3.5 w-3.5" />
                          {isAvailable ? availableLabel : evaluatingLabel}
                        </span>
                      </div>

                      <h2 className="mt-6 font-display text-2xl font-bold text-brand-text">{item.name}</h2>
                      <p className="mt-3 text-sm leading-6 text-brand-text-secondary">{item.description}</p>

                      <div className="mt-6 space-y-2 border-t border-brand-border pt-5">
                        {item.capabilities.map((capability) => (
                          <div key={capability} className="flex items-start gap-2 text-sm text-brand-text-tertiary">
                            <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-accent" />
                            <span>{capability}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
