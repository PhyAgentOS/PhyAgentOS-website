import { useRef, useState, type KeyboardEvent } from 'react';
import { ArrowUpRight, BarChart3, ChevronRight } from 'lucide-react';
import SectionHeader from '../../components/layout/SectionHeader';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useT } from '../../i18n/LanguageContext';
import { benchmarkDatasets, type BenchmarkResult } from '../../data/benchmarks';
import './benchmark.css';
import BenchmarkProtocol from './BenchmarkProtocol';

const ticks = [0, 25, 50, 75, 100];

export default function Benchmark() {
  const { benchmark: copy } = useT();
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dataset = benchmarkDatasets[activeIndex];
  const reportedResults = dataset.results.filter(
    (result): result is BenchmarkResult & { successRate: number } => result.successRate !== null,
  );
  const missingValue = <span aria-label={copy.notProvided}>—</span>;

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case 'ArrowRight': next = (index + 1) % benchmarkDatasets.length; break;
      case 'ArrowLeft': next = (index - 1 + benchmarkDatasets.length) % benchmarkDatasets.length; break;
      case 'Home': next = 0; break;
      case 'End': next = benchmarkDatasets.length - 1; break;
      default: return;
    }
    event.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section id="benchmark" className="relative scroll-mt-20 overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.02]" />
      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionHeader
              label={copy.label}
              labelIcon={<BarChart3 className="h-3.5 w-3.5" />}
              title={copy.title}
              highlight={copy.highlight}
              description={copy.description}
            />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="benchmark-card mx-auto mt-12 max-w-6xl overflow-hidden rounded-3xl border border-brand-border bg-brand-bg-secondary shadow-card sm:mt-16">
              <div
                id="benchmark-panel"
                role="tabpanel"
                aria-labelledby={`benchmark-tab-${dataset.id}`}
                tabIndex={0}
                className="px-5 pb-5 pt-6 sm:px-9 sm:pb-7 sm:pt-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-2xl font-bold tracking-tight text-brand-text sm:text-3xl">{dataset.name}</h3>
                      <span className="benchmark-status rounded-full border border-brand-border bg-brand-bg px-2.5 py-1 text-[11px] font-medium text-brand-text-secondary">{copy.resultsLabel}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-brand-text-secondary">
                      <span className="inline-flex items-center gap-2"><span className="benchmark-legend-swatch" data-source="phyagentos" aria-hidden="true" />{copy.paos}</span>
                      <span className="inline-flex items-center gap-2"><span className="benchmark-legend-swatch" data-source="reference" aria-hidden="true" />{copy.reference}</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 pt-1 text-xs font-medium text-brand-text-secondary">
                    {copy.successRate} (%) <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>

                <div className="benchmark-chart mt-8" aria-label={`${dataset.name} · ${copy.successRate}`}>
                  <div className="benchmark-scale" aria-hidden="true">
                    {ticks.map((tick) => <span key={tick}>{tick}</span>)}
                  </div>
                  <ul className="benchmark-rows" aria-label={copy.strategies} key={dataset.id}>
                    {reportedResults.map((result) => (
                      <li className="benchmark-row" data-source={result.source} data-mode={result.mode} key={result.id}>
                        <div className="benchmark-strategy">
                          <span className="benchmark-name block text-sm font-semibold leading-5">{result.name}</span>
                          {(result.source === 'phyagentos' || result.averageTimeSeconds !== null || result.averageTokens !== null) && (
                            <div className="benchmark-metrics mt-1 flex flex-wrap items-center gap-x-1.5 text-xs leading-5 text-brand-text-secondary">
                              <span className="whitespace-nowrap">{copy.timeLabel} {result.averageTimeSeconds ?? missingValue}</span>
                              <span aria-hidden="true">·</span>
                              <span className="whitespace-nowrap">{copy.tokensLabel} {result.averageTokens ?? missingValue}</span>
                            </div>
                          )}
                        </div>
                        <div className="benchmark-track" aria-hidden="true">
                          <div className="benchmark-bar" style={{ width: `${result.successRate}%` }} />
                        </div>
                        <span className="benchmark-value benchmark-reported-value text-sm font-semibold">
                          {result.successRate.toFixed(2)}%
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mt-6 text-xs leading-6 text-brand-text-secondary">{copy.unitsNote}</p>
              </div>

              <div className="benchmark-tabs border-t border-brand-border/70 bg-brand-bg/50 px-4 py-5 sm:px-9">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3" role="tablist" aria-label={copy.selectBenchmark}>
                  {benchmarkDatasets.map((item, index) => (
                    <button
                      key={item.id}
                      id={`benchmark-tab-${item.id}`}
                      type="button"
                      role="tab"
                      aria-selected={activeIndex === index}
                      aria-controls="benchmark-panel"
                      tabIndex={activeIndex === index ? 0 : -1}
                      ref={(element) => { tabRefs.current[index] = element; }}
                      onClick={() => setActiveIndex(index)}
                      onKeyDown={(event) => handleTabKeyDown(event, index)}
                      className={`benchmark-tab inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors sm:min-w-36 sm:px-6 ${activeIndex === index
                        ? 'border-brand-accent bg-brand-accent text-brand-text-on-accent shadow-soft'
                        : 'border-brand-border bg-brand-bg-secondary text-brand-text-secondary hover:border-brand-accent/40 hover:text-brand-text'}`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="benchmark-card mx-auto mt-5 max-w-6xl rounded-2xl border px-5 py-5 sm:px-9 sm:py-6">
              <h3 className="text-lg font-semibold tracking-tight">{copy.taskDetails}</h3>
              <p className="mt-2 text-sm leading-7 text-brand-text-secondary">{copy.taskDetailsDescription}</p>
              <details className="group mt-1" key={dataset.id}>
                <summary className="benchmark-summary inline-flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-md text-sm font-medium">
                  {copy.viewResults} ({dataset.results.length})
                  <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-open:rotate-90 motion-reduce:transition-none" aria-hidden="true" />
                </summary>
                <div className="mt-2 space-y-4 border-t border-brand-border/60 pt-5 text-xs leading-6 text-brand-text-secondary">
                  <div className="overflow-x-auto rounded-xl border border-brand-border/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accent" role="region" aria-label={`${dataset.name} · ${copy.details}`} tabIndex={0}>
                    <table className="w-full min-w-[1040px] border-collapse text-left">
                      <caption className="sr-only">{dataset.name} · {copy.details}</caption>
                      <thead className="bg-brand-bg">
                        <tr>
                          {[copy.strategy, copy.successRate, copy.controlMode, copy.basedOnPaos, copy.averageTime, copy.averageTokens].map((label) => (
                            <th className="px-4 py-2.5 font-semibold text-brand-text" scope="col" key={label}>{label}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {dataset.results.map((result) => (
                          <tr className="border-t border-brand-border/60" key={result.id}>
                            <th className="min-w-[230px] px-4 py-3 font-medium text-brand-text" scope="row">{result.name}</th>
                            <td className="whitespace-nowrap px-4 py-3 tabular-nums">{result.successRate === null ? missingValue : `${result.successRate.toFixed(2)}%`}</td>
                            <td className="min-w-[300px] px-4 py-3">
                              {result.mode === null ? missingValue : (
                                <>
                                  <span className="block font-medium text-brand-text">{copy.modes[result.mode]}</span>
                                  <span className="mt-1 block leading-5">{copy.modeDescriptions[result.mode]}</span>
                                </>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-4 py-3">{result.source === 'phyagentos' ? copy.yes : copy.no}</td>
                            <td className="whitespace-nowrap px-4 py-3 tabular-nums">{result.averageTimeSeconds ?? missingValue}</td>
                            <td className="whitespace-nowrap px-4 py-3 tabular-nums">{result.averageTokens ?? missingValue}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p>{copy.sourceNote}</p>
                </div>
              </details>
            </div>
            <BenchmarkProtocol benchmarkId={dataset.id} name={dataset.name} />
          </ScrollReveal>
          <p className="sr-only" aria-live="polite" aria-atomic="true">{dataset.name} · {copy.resultsLabel}</p>
        </div>
      </div>
    </section>
  );
}
