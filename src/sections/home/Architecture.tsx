import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Brain, FileText, ShieldCheck, Eye, Cpu, Boxes, Activity, Network, ArrowRight, X } from 'lucide-react';
import SectionHeader from '../../components/layout/SectionHeader';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useT } from '../../i18n/LanguageContext';

interface ArchNode {
  id: string;
  icon: LucideIcon;
  label: string;
  sublabel: string;
  description: string;
  track: 'A' | 'B' | 'protocol';
}

const protocolFiles = [
  'AGENTS.md',
  'SOUL.md',
  'TOOLS.md',
  'SKILLS.md',
  'EMBODIED.md',
  'ENVIRONMENT.md',
  'LESSONS.md',
  'TASK.md',
  'RUNTIME.md',
  'TARGETS.md',
  'SKILLRUNTIME.md',
  'SESSIONS.md',
];

export default function Architecture() {
  const t = useT();
const nodes: ArchNode[] = [
  { id: 'planner', icon: Brain, label: t.architecture.nodes[0].label, sublabel: t.architecture.nodes[0].sublabel, description: t.architecture.nodes[0].description, track: 'A' },
  { id: 'context-builder', icon: FileText, label: t.architecture.nodes[1].label, sublabel: t.architecture.nodes[1].sublabel, description: t.architecture.nodes[1].description, track: 'A' },
  { id: 'critic', icon: Eye, label: t.architecture.nodes[2].label, sublabel: t.architecture.nodes[2].sublabel, description: t.architecture.nodes[2].description, track: 'A' },
  { id: 'memory', icon: Activity, label: t.architecture.nodes[3].label, sublabel: t.architecture.nodes[3].sublabel, description: t.architecture.nodes[3].description, track: 'A' },
  { id: 'watchdog', icon: ShieldCheck, label: t.architecture.nodes[4].label, sublabel: t.architecture.nodes[4].sublabel, description: t.architecture.nodes[4].description, track: 'B' },
  { id: 'session-runner', icon: Activity, label: t.architecture.nodes[5].label, sublabel: t.architecture.nodes[5].sublabel, description: t.architecture.nodes[5].description, track: 'B' },
  { id: 'skill-runtime', icon: Boxes, label: t.architecture.nodes[6].label, sublabel: t.architecture.nodes[6].sublabel, description: t.architecture.nodes[6].description, track: 'B' },
  { id: 'adapter-bridge', icon: Network, label: t.architecture.nodes[7].label, sublabel: t.architecture.nodes[7].sublabel, description: t.architecture.nodes[7].description, track: 'B' },
];
  const [selectedNode, setSelectedNode] = useState<ArchNode | null>(null);

  const trackANodes = nodes.filter((n) => n.track === 'A');
  const trackBNodes = nodes.filter((n) => n.track === 'B');

  return (
    <section id="architecture" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.02]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-brand-accent/[0.02] rounded-full blur-[200px]" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionHeader
              label={t.architecture.label}
              title={t.architecture.title}
              highlight={t.architecture.highlight}
              description="Cognition and execution decoupled through a shared file-protocol layer. Click any component to explore."
            />
          </ScrollReveal>

          {/* Architecture Diagram */}
          <ScrollReveal delay={0.2}>
            <div className="mt-20 relative">
              <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 lg:gap-8">
                {/* Track A: Agent Layer */}
                <div className="flex-1 max-w-sm">
                  <div className="h-full rounded-3xl bg-brand-bg-secondary border border-emerald-500/25 p-6 shadow-card hover:shadow-card-hover transition-shadow duration-500">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-brand-border">
                      <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                        <Brain className="w-5 h-5 text-emerald-700" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-brand-text text-lg">{t.architecture.trackA}</h3>
                        <p className="text-xs font-mono text-emerald-700">{t.architecture.trackASub}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {trackANodes.map((node) => {
                        const NodeIcon = node.icon;
                        return (
                          <button
                            key={node.id}
                            onClick={() => setSelectedNode(node)}
                            className={`w-full flex items-center gap-3 p-3.5 rounded-2xl transition-all duration-300 text-left group ${
                              selectedNode?.id === node.id
                                ? 'bg-emerald-500/10 border border-emerald-500/30 shadow-glow-soft'
                                : 'bg-brand-text/[0.03] border border-transparent hover:bg-brand-text/[0.04] hover:border-brand-accent/30 hover:shadow-soft'
                            }`}
                          >
                            <NodeIcon className={`w-4 h-4 flex-shrink-0 ${selectedNode?.id === node.id ? 'text-emerald-700' : 'text-emerald-700/60'}`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-brand-text truncate">{node.label}</p>
                              <p className="text-xs text-brand-text-tertiary">{node.sublabel}</p>
                            </div>
                            <ArrowRight className={`w-3.5 h-3.5 transition-all duration-300 ${selectedNode?.id === node.id ? 'text-emerald-700 translate-x-0 opacity-100' : 'text-brand-text-tertiary -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Center: Protocol Surface */}
                <div className="flex flex-col items-center justify-center gap-6 lg:w-64">
                  {/* Read arrow */}
                  <div className="hidden lg:flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-brand-accent" />
                    <span className="text-sm lg:text-base font-mono font-semibold tracking-wide text-brand-text-secondary">{t.architecture.read}</span>
                  </div>

                  {/* Protocol hub */}
                  <div className="relative w-full max-w-xs aspect-square">
                    <div className="absolute inset-0 bg-brand-accent/20 blur-3xl rounded-full animate-pulse" />
                    <div className="relative h-full rounded-3xl bg-brand-bg-secondary border-2 border-brand-accent/40 flex flex-col items-center justify-center p-6 glass shadow-card hover:shadow-card-hover transition-shadow duration-500">
                      <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-4 shadow-glow-soft">
                        <FileText className="w-8 h-8 text-brand-accent" />
                      </div>
                      <p className="text-xl font-display font-bold text-brand-text text-center">{t.architecture.protocol}</p>
                      <p className="text-xs text-brand-text-tertiary text-center mt-2">{t.architecture.sharedSurface}</p>
                      <p className="text-xs font-mono text-brand-accent mt-3 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20">{t.architecture.stateIsFile}</p>
                    </div>
                  </div>

                  {/* Write arrow */}
                  <div className="hidden lg:flex items-center gap-2">
                    <span className="text-sm lg:text-base font-mono font-semibold tracking-wide text-brand-text-secondary">{t.architecture.write}</span>
                    <ArrowRight className="w-5 h-5 text-brand-accent rotate-180" />
                  </div>
                </div>

                {/* Track B: Execution Layer */}
                <div className="flex-1 max-w-sm">
                  <div className="h-full rounded-3xl bg-brand-bg-secondary border border-sky-500/25 p-6 shadow-card hover:shadow-card-hover transition-shadow duration-500">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-brand-border">
                      <div className="w-11 h-11 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center">
                        <Cpu className="w-5 h-5 text-sky-700" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-brand-text text-lg">{t.architecture.trackB}</h3>
                        <p className="text-xs font-mono text-sky-700">{t.architecture.trackBSub}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {trackBNodes.map((node) => {
                        const NodeIcon = node.icon;
                        return (
                          <button
                            key={node.id}
                            onClick={() => setSelectedNode(node)}
                            className={`w-full flex items-center gap-3 p-3.5 rounded-2xl transition-all duration-300 text-left group ${
                              selectedNode?.id === node.id
                                ? 'bg-sky-500/10 border border-sky-500/30 shadow-glow-soft'
                                : 'bg-brand-text/[0.03] border border-transparent hover:bg-brand-text/[0.04] hover:border-brand-accent/30 hover:shadow-soft'
                            }`}
                          >
                            <NodeIcon className={`w-4 h-4 flex-shrink-0 ${selectedNode?.id === node.id ? 'text-sky-700' : 'text-sky-700/60'}`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-brand-text truncate">{node.label}</p>
                              <p className="text-xs text-brand-text-tertiary">{node.sublabel}</p>
                            </div>
                            <ArrowRight className={`w-3.5 h-3.5 transition-all duration-300 ${selectedNode?.id === node.id ? 'text-sky-700 translate-x-0 opacity-100' : 'text-brand-text-tertiary -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Protocol files */}
              <div className="mt-12 flex flex-wrap justify-center gap-2">
                {protocolFiles.map((file) => (
                  <span
                    key={file}
                    className="px-3.5 py-2 bg-brand-bg-secondary border border-brand-border rounded-xl font-mono text-xs text-brand-text-tertiary hover:border-brand-accent/30 hover:text-brand-accent hover:shadow-soft transition-all duration-300 cursor-default"
                  >
                    {file}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Detail Panel */}
          {selectedNode && (
            <div className="mt-10 max-w-2xl mx-auto">
              <div className="relative p-6 rounded-3xl bg-brand-bg-secondary border border-brand-border shadow-card hover:shadow-card-hover transition-shadow duration-500">
                <button
                  onClick={() => setSelectedNode(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-brand-text/[0.04] transition-colors"
                >
                  <X className="w-4 h-4 text-brand-text-tertiary" />
                </button>
                <div className="flex items-center gap-3 mb-4">
                  {(() => {
                    const SelectedIcon = selectedNode.icon;
                    return <SelectedIcon className={`w-5 h-5 ${selectedNode.track === 'A' ? 'text-emerald-700' : 'text-sky-700'}`} />;
                  })()}
                  <h4 className="text-lg font-semibold text-brand-text">{selectedNode.label}</h4>
                  <span className={`text-xs font-mono px-2.5 py-1 rounded-lg ${selectedNode.track === 'A' ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20' : 'bg-sky-500/10 text-sky-700 border border-sky-500/20'}`}>
                    Track {selectedNode.track}
                  </span>
                </div>
                <p className="text-sm text-brand-text-secondary leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
