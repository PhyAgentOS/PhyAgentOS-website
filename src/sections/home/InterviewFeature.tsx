import { MessageSquareText } from 'lucide-react';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useLang } from '../../i18n/LanguageContext';

export default function InterviewFeature() {
  const { lang } = useLang();
  const copy = lang === 'zh'
    ? {
        label: '概念短片',
        title: '从会话到行动',
        highlight: '理解 PhyAgentOS',
        description:
          '通过概念短片展示 Session 文件协议、可审计验证，以及 PhyAgentOS 如何把思考、协议与真实物理执行连接起来。',
        meta: '概念短片',
      }
    : {
        label: 'Concept Film',
        title: 'From sessions to action',
        highlight: 'inside PhyAgentOS',
        description:
          'A concept film showing Session files, auditable verification, and how PhyAgentOS connects reasoning, protocol state, and real-world execution.',
        meta: 'Concept film',
      };

  return (
    <section id="interview" className="relative overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 bg-brand-bg" />
      <div className="absolute inset-0 bg-grid opacity-[0.02]" />
      <div className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-brand-accent/[0.035] blur-[180px]" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mb-10 max-w-4xl">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-4 py-2 text-xs font-mono font-semibold uppercase tracking-[0.18em] text-brand-accent-light">
                  <MessageSquareText className="h-4 w-4" />
                  {copy.label}
                </div>
                <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-brand-text sm:text-5xl lg:text-6xl">
                  {copy.title}
                  <span className="block text-gradient">{copy.highlight}</span>
                </h2>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="relative overflow-hidden rounded-3xl border border-brand-border bg-black shadow-2xl">
              <video
                className="aspect-video w-full object-cover"
                src="/media/demos/overview.mp4"
                poster="/media/demos/overview.jpg"
                controls
                autoPlay
                muted
                preload="auto"
                playsInline
              />
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
