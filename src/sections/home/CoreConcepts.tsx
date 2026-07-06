import { useState } from 'react';
import { Layers, Puzzle, GitBranch, ShieldCheck, FileText, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../../components/layout/SectionHeader';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useT } from '../../i18n/LanguageContext';

export default function CoreConcepts() {
  const t = useT();

const concepts = [
  { id: 'session-runtime', icon: Layers, title: t.coreConcepts.items[0].title, subtitle: t.coreConcepts.items[0].subtitle, description: t.coreConcepts.items[0].description, highlight: t.coreConcepts.items[0].highlight, color: 'from-sky-400/15 to-indigo-400/15', borderColor: 'border-sky-500/25', iconColor: 'text-sky-700' },
  { id: 'adapter-bridge', icon: Puzzle, title: t.coreConcepts.items[1].title, subtitle: t.coreConcepts.items[1].subtitle, description: t.coreConcepts.items[1].description, highlight: t.coreConcepts.items[1].highlight, color: 'from-emerald-400/15 to-teal-500/15', borderColor: 'border-emerald-500/25', iconColor: 'text-emerald-700' },
  { id: 'dual-runtime', icon: GitBranch, title: t.coreConcepts.items[2].title, subtitle: t.coreConcepts.items[2].subtitle, description: t.coreConcepts.items[2].description, highlight: t.coreConcepts.items[2].highlight, color: 'from-amber-400/15 to-orange-400/15', borderColor: 'border-amber-500/25', iconColor: 'text-amber-700' },
  { id: 'safety', icon: ShieldCheck, title: t.coreConcepts.items[3].title, subtitle: t.coreConcepts.items[3].subtitle, description: t.coreConcepts.items[3].description, highlight: t.coreConcepts.items[3].highlight, color: 'from-rose-400/15 to-red-400/15', borderColor: 'border-rose-500/25', iconColor: 'text-rose-700' },
  { id: 'auditability', icon: FileText, title: t.coreConcepts.items[4].title, subtitle: t.coreConcepts.items[4].subtitle, description: t.coreConcepts.items[4].description, highlight: t.coreConcepts.items[4].highlight, color: 'from-violet-400/15 to-purple-400/15', borderColor: 'border-violet-500/25', iconColor: 'text-violet-700' },
  { id: 'memory-reflection', icon: BrainCircuit, title: t.coreConcepts.items[5].title, subtitle: t.coreConcepts.items[5].subtitle, description: t.coreConcepts.items[5].description, highlight: t.coreConcepts.items[5].highlight, color: 'from-teal-400/15 to-cyan-400/15', borderColor: 'border-teal-500/25', iconColor: 'text-teal-700' },
];
  const [activeId, setActiveId] = useState(concepts[0].id);
  const activeConcept = concepts.find((c) => c.id === activeId)!;
  const ActiveIcon = activeConcept.icon;

  return (
    <section id="features" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.02]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-accent/[0.02] rounded-full blur-[200px]" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionHeader
              label={t.coreConcepts.label}
              title={t.coreConcepts.title}
              highlight={t.coreConcepts.highlight}
              description={t.coreConcepts.description}
            />
          </ScrollReveal>

          {/* Tabs */}
          <ScrollReveal delay={0.2}>
            <div className="mt-16 flex flex-wrap justify-center gap-2 sm:gap-3">
              {concepts.map((concept) => {
                const Icon = concept.icon;
                const isActive = concept.id === activeId;
                return (
                  <button
                    key={concept.id}
                    onClick={() => setActiveId(concept.id)}
                    className={`relative flex items-center gap-2.5 px-4 sm:px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-brand-accent text-white border border-brand-accent shadow-glow-soft'
                        : 'bg-brand-bg-secondary text-brand-text-tertiary border border-brand-border hover:text-brand-text hover:border-brand-accent/30 hover:shadow-soft'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : concept.iconColor}`} />
                    <span className="hidden sm:inline">{concept.title}</span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Content */}
          <div className="mt-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeConcept.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
              >
                {/* Left: Text */}
                <div className="order-2 lg:order-1">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-xs font-mono uppercase tracking-wider text-brand-accent-dark mb-6 shadow-glow-soft">
                    {activeConcept.subtitle}
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-display font-bold text-brand-text mb-4">
                    {activeConcept.title}
                  </h3>

                  <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed mb-6">
                    {activeConcept.description}
                  </p>

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-accent/5 border border-brand-accent/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                    <span className="text-sm text-brand-accent font-medium">
                      {activeConcept.highlight}
                    </span>
                  </div>
                </div>

                {/* Right: Visual */}
                <div className="order-1 lg:order-2">
                <div
                  className={`relative aspect-square max-w-md mx-auto rounded-3xl border ${activeConcept.borderColor} bg-gradient-to-br ${activeConcept.color} p-8 flex items-center justify-center shadow-card hover:shadow-card-hover transition-shadow duration-500`}
                >
                  {/* Glow */}
                  <div className="absolute inset-0 rounded-3xl bg-brand-accent/[0.03] blur-2xl" />

                  {/* Icon */}
                  <div className="relative z-10 p-8 rounded-3xl bg-brand-bg-secondary/60 border border-brand-border shadow-soft">
                    <ActiveIcon className={`w-20 h-20 sm:w-28 sm:h-28 ${activeConcept.iconColor} opacity-90`} />
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-6 left-6 w-16 h-16 border border-brand-border/60 rounded-2xl" />
                  <div className="absolute bottom-6 right-6 w-16 h-16 border border-brand-border/60 rounded-2xl" />
                  <div className="absolute top-1/2 right-6 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-brand-text/[0.2]" />
                  <div className="absolute bottom-1/4 left-6 w-2.5 h-2.5 rounded-full bg-brand-text/[0.2]" />
                </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
