import { ArrowDown, Layers3, MoveHorizontal } from 'lucide-react';
import SectionHeader from '../../components/layout/SectionHeader';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useT } from '../../i18n/LanguageContext';
import './control-paradigms.css';

const paradigms = ['general', 'hybrid', 'action'] as const;
type ControlMode = typeof paradigms[number];

function ControlFlow({ mode, label }: { mode: ControlMode; label: string }) {
  return (
    <div className="control-flow" role="img" aria-label={label}>
      {mode === 'hybrid' ? (
        <>
          <div className="control-flow-models">
            <div className="control-flow-node control-flow-source">LLM or VLM</div>
            <MoveHorizontal className="control-flow-exchange" aria-hidden="true" />
            <div className="control-flow-node control-flow-source">VLA or WAM</div>
          </div>
          <svg className="control-flow-merge" viewBox="0 0 400 40" preserveAspectRatio="none" fill="none" aria-hidden="true">
            <path d="M88 2V17H312V2M200 17V35M195 29L200 35L205 29" />
          </svg>
        </>
      ) : (
        <>
          <div className="control-flow-node control-flow-source">{mode === 'general' ? 'LLM or VLM' : 'VLA or WAM'}</div>
          <div className="control-flow-arrow"><ArrowDown aria-hidden="true" /></div>
        </>
      )}
      <div className="control-flow-node control-flow-runtime">PhyAgentOS</div>
      <div className="control-flow-arrow"><ArrowDown aria-hidden="true" /></div>
      <div className="control-flow-node control-flow-action">Action</div>
    </div>
  );
}

export default function ControlParadigms() {
  const { controlParadigms: copy } = useT();

  return (
    <section id="control-paradigms" className="control-paradigms relative scroll-mt-20 overflow-hidden" aria-labelledby="control-paradigms-title">
      {/* Preserve incoming links to the former task section. */}
      <span id="scenarios" className="absolute top-0 scroll-mt-20" aria-hidden="true" />
      <div className="control-paradigms-container">
        <ScrollReveal>
          <div id="control-paradigms-title">
            <SectionHeader
              label={copy.label}
              labelIcon={<Layers3 className="h-5 w-5" />}
              title={copy.title}
              highlight={copy.highlight}
              description={copy.description}
              className="control-paradigms-heading"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal className="control-paradigms-diagram" delay={0.1}>
          <div className="control-paradigms-grid">
            {paradigms.map((mode, index) => {
              const item = copy.items[index];
              return (
                <article className="control-card" data-mode={mode} key={mode}>
                  <header className="control-card-heading">
                    <p className="control-eyebrow">{item.subtitle}</p>
                    <h3>{item.title}</h3>
                  </header>
                  <ControlFlow mode={mode} label={item.flowDescription} />
                  <p className="control-card-description">{item.description}</p>
                </article>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
