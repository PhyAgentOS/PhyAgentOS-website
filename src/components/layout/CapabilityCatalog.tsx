import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../animations/ScrollReveal';
import SectionHeader from './SectionHeader';

export interface CapabilityTagGroup {
  label: string;
  tags: string[];
}

export interface CapabilityItem {
  name: string;
  category: string;
  status: 'available' | 'evaluating';
  description: string;
  capabilities: string[];
  icon?: string;
  tagGroups?: CapabilityTagGroup[];
}

interface CapabilityCatalogProps {
  label: string;
  title: string;
  highlight: string;
  description: string;
  countLabel: string;
  categoryCountLabel: string;
  availableCountLabel: string;
  availableLabel: string;
  evaluatingLabel: string;
  backLabel: string;
  searchPlaceholder: string;
  categoryFilterLabel: string;
  statusFilterLabel: string;
  allLabel: string;
  resetLabel: string;
  showingLabel: string;
  resultLabel: string;
  emptyLabel: string;
  items: CapabilityItem[];
}

type StatusFilter = CapabilityItem['status'] | 'all';

export default function CapabilityCatalog({
  label,
  title,
  highlight,
  description,
  countLabel,
  categoryCountLabel,
  availableCountLabel,
  availableLabel,
  evaluatingLabel,
  backLabel,
  searchPlaceholder,
  categoryFilterLabel,
  statusFilterLabel,
  allLabel,
  resetLabel,
  showingLabel,
  resultLabel,
  emptyLabel,
  items,
}: CapabilityCatalogProps) {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const categories = useMemo(
    () => Array.from(new Set(items.map((item) => item.category))),
    [items],
  );
  const availableCount = items.filter((item) => item.status === 'available').length;
  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return items.filter((item) => {
      const searchableText = [
        item.name,
        item.category,
        item.description,
        ...item.capabilities,
        ...(item.tagGroups?.flatMap((group) => [group.label, ...group.tags]) ?? []),
      ].join(' ').toLowerCase();
      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

      return matchesQuery && matchesCategory && matchesStatus;
    });
  }, [categoryFilter, items, query, statusFilter]);

  return (
    <div className="min-h-screen pt-24 lg:pt-32">
      <div className="px-6 pb-24 sm:px-8 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-brand-text-tertiary transition-colors hover:text-brand-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </Link>
            <SectionHeader label={label} title={title} highlight={highlight} description={description} align="left" />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="relative mt-6">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-text-tertiary" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={searchPlaceholder}
                className="h-14 w-full rounded-2xl border border-brand-border bg-brand-bg-secondary pl-12 pr-4 text-sm text-brand-text outline-none transition-all placeholder:text-brand-text-tertiary focus:border-brand-accent/40 focus:shadow-glow-soft"
              />
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { value: items.length, label: countLabel },
                { value: categories.length, label: categoryCountLabel },
                { value: availableCount, label: availableCountLabel },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg border border-brand-border bg-brand-bg-secondary/80 px-6 py-4 shadow-soft">
                  <div className="font-display text-3xl font-bold text-brand-text">{stat.value}</div>
                  <div className="mt-1 text-sm font-medium text-brand-text-tertiary">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="mt-8 rounded-2xl border border-brand-border bg-brand-bg-secondary/80 p-4 shadow-soft">
              <div className="grid gap-5 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
                <div>
                  <div className="mb-3 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-text-tertiary">
                    <SlidersHorizontal className="h-4 w-4" />
                    {categoryFilterLabel}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['all', ...categories].map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setCategoryFilter(category)}
                        className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${categoryFilter === category ? 'bg-brand-accent text-white shadow-glow-soft' : 'border border-brand-border bg-brand-text/[0.03] text-brand-text-tertiary hover:border-brand-accent/30 hover:text-brand-text'}`}
                      >
                        {category === 'all' ? allLabel : category}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3 text-xs font-mono uppercase tracking-wider text-brand-text-tertiary">{statusFilterLabel}</div>
                  <div className="flex flex-wrap gap-2">
                    {([
                      { value: 'all', label: allLabel },
                      { value: 'available', label: availableLabel },
                      { value: 'evaluating', label: evaluatingLabel },
                    ] as const).map((status) => (
                      <button
                        key={status.value}
                        type="button"
                        onClick={() => setStatusFilter(status.value)}
                        className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${statusFilter === status.value ? 'bg-brand-accent text-white shadow-glow-soft' : 'border border-brand-border bg-brand-text/[0.03] text-brand-text-tertiary hover:border-brand-accent/30 hover:text-brand-text'}`}
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setCategoryFilter('all');
                    setStatusFilter('all');
                  }}
                  className="rounded-xl border border-brand-border bg-brand-bg px-4 py-2 text-sm font-medium text-brand-text-tertiary transition-all hover:border-brand-accent/30 hover:text-brand-text"
                >
                  {resetLabel}
                </button>
              </div>

              <div className="mt-5 border-t border-brand-border pt-4 text-sm text-brand-text-tertiary">
                {showingLabel} <span className="font-semibold text-brand-text">{filteredItems.length}</span> {resultLabel}
              </div>
            </div>
          </ScrollReveal>

          {filteredItems.length > 0 ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((item, index) => {
                const isAvailable = item.status === 'available';
                const StatusIcon = isAvailable ? CheckCircle2 : FlaskConical;

                return (
                  <ScrollReveal key={item.name} delay={Math.min(index * 0.06, 0.3)}>
                    <article className="group relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-2xl border border-brand-border bg-brand-bg-secondary p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/25 hover:shadow-card-hover">
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/[0.05] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="relative z-10 flex h-full flex-col">
                        <div className="flex items-start justify-between gap-4">
                          {item.icon ? (
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-accent/15 bg-brand-accent/[0.08] text-4xl shadow-soft" aria-hidden="true">
                              {item.icon}
                            </div>
                          ) : (
                            <span className="rounded-full border border-brand-border bg-brand-text/[0.03] px-3 py-1 text-xs font-mono uppercase tracking-wider text-brand-text-tertiary">{item.category}</span>
                          )}
                          <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${isAvailable ? 'text-emerald-600' : 'text-amber-600'}`}>
                            <StatusIcon className="h-3.5 w-3.5" />
                            {isAvailable ? availableLabel : evaluatingLabel}
                          </span>
                        </div>

                        {item.icon && (
                          <span className="mt-5 w-fit rounded-full border border-brand-border bg-brand-text/[0.03] px-3 py-1 text-xs font-mono uppercase tracking-wider text-brand-text-tertiary">{item.category}</span>
                        )}
                        <h2 className={`${item.icon ? 'mt-3' : 'mt-6'} font-display text-2xl font-bold text-brand-text`}>{item.name}</h2>
                        <p className="mt-3 text-sm leading-6 text-brand-text-secondary">{item.description}</p>

                        {item.tagGroups ? (
                          <div className="mt-6 space-y-4 border-t border-brand-border pt-5">
                            {item.tagGroups.map((group) => (
                              <div key={group.label}>
                                <div className="mb-2 text-xs font-medium text-brand-text-tertiary">{group.label}</div>
                                <div className="flex flex-wrap gap-2">
                                  {group.tags.map((tag) => (
                                    <span key={tag} className="rounded-lg border border-brand-accent/15 bg-brand-accent/[0.07] px-2.5 py-1 text-xs font-medium text-brand-text-secondary">{tag}</span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="mt-6 space-y-2 border-t border-brand-border pt-5">
                            {item.capabilities.map((capability) => (
                              <div key={capability} className="flex items-start gap-2 text-sm text-brand-text-tertiary">
                                <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-accent" />
                                <span>{capability}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  </ScrollReveal>
                );
              })}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-brand-border px-6 py-16 text-center text-sm text-brand-text-tertiary">{emptyLabel}</div>
          )}
        </div>
      </div>
    </div>
  );
}
