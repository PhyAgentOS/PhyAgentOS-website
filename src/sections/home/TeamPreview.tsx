import { ExternalLink, Network } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader, { SectionLabel } from '../../components/layout/SectionHeader';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useT } from '../../i18n/LanguageContext';

export default function TeamPreview() {
  const t = useT();
const institutions = [
  { name: t.teamPreview.institutions[0].name, shortName: 'SYSU', href: 'https://www.sysu-hcp.net/', role: t.teamPreview.institutions[0].role, description: t.teamPreview.institutions[0].description },
  { name: t.teamPreview.institutions[1].name, shortName: 'PCL', href: 'https://www.pcl.ac.cn/', role: t.teamPreview.institutions[1].role, description: t.teamPreview.institutions[1].description },
  { name: t.teamPreview.institutions[2].name, shortName: 'X-Era', href: 'https://www.ex-ai.cn/', role: t.teamPreview.institutions[2].role, description: t.teamPreview.institutions[2].description },
];
const teamHighlights = [
  { label: t.teamPreview.highlights[0].label, value: t.teamPreview.highlights[0].value },
  { label: t.teamPreview.highlights[1].label, value: t.teamPreview.highlights[1].value },
  { label: t.teamPreview.highlights[2].label, value: t.teamPreview.highlights[2].value },
  { label: t.teamPreview.highlights[3].label, value: t.teamPreview.highlights[3].value },
];
const collaborators = [
  { name: 'XLeRobot', logo: '/media/collaborators/xlerobot.png', href: 'https://xlerobot.readthedocs.io/en/latest/' },
  { name: 'AGILEX', logo: '/media/collaborators/agile-x.png', href: 'https://www.agilex.ai/' },
  { name: 'RealMan', logo: '/media/collaborators/realman.png', href: 'https://www.realman-robotics.cn/' },
  { name: 'Zerith', logo: '/media/collaborators/zerith.png', href: 'https://zerith.com/' },
  { name: 'Digua Robot', logo: '/media/collaborators/digua.png', href: 'https://developer.d-robotics.cc/' },
  { name: 'SigmaStar', logo: '/media/collaborators/sigmastar.png', href: 'https://www.sigmastar.com.cn/' },
];
  return (
    <section id="team" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.02]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/[0.02] rounded-full blur-[200px]" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionHeader
              label={t.teamPreview.label}
              title={t.teamPreview.title}
              highlight={t.teamPreview.highlight}
              description={t.teamPreview.description}
              className="whitespace-nowrap"
            />
          </ScrollReveal>

          <div className="mt-16 grid md:grid-cols-3 gap-6 lg:gap-8">
            {institutions.map((inst, index) => (
              <ScrollReveal key={index} delay={index * 0.15}>
                <div className="group relative p-8 rounded-3xl bg-brand-bg-secondary border border-brand-border hover:border-brand-accent/30 transition-all duration-500 shadow-card hover:shadow-card-hover overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-accent/[0.03] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center shadow-glow-soft">
                        <span className="text-xl font-display font-bold text-brand-accent-dark">
                          {inst.shortName}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-bold text-brand-text">
                          {inst.name}
                        </h3>
                        <p className="text-sm text-brand-accent font-mono">
                          {inst.role}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-brand-text-secondary leading-relaxed">
                      {inst.description}
                    </p>

                    <a
                      href={inst.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-accent-dark hover:text-brand-accent-light transition-colors"
                    >
                      {t.teamPreview.visitInstitution}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Highlights */}
          <ScrollReveal delay={0.3}>
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {teamHighlights.map((item, index) => (
                <div
                  key={index}
                  className="text-center p-5 rounded-2xl bg-brand-bg-secondary border border-brand-border shadow-soft hover:shadow-card transition-shadow duration-300"
                >
                  <div className="text-sm font-bold text-brand-text mb-2">{item.value}</div>
                  <div className="text-xs text-brand-text-tertiary font-mono uppercase tracking-wider">{item.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Collaborators */}
          <ScrollReveal delay={0.45}>
            <div className="mt-16">
              <div className="text-center mb-8">
                <SectionLabel
                  labelIcon={<Network className="h-3.5 w-3.5" />}
                  className="mb-5"
                >
                  {t.teamPreview.collaboratorsLabel}
                </SectionLabel>
                <h3 className="text-2xl font-display font-bold text-brand-text">
                  {t.teamPreview.collaboratorsTitle}
                </h3>
                <p className="mt-2 text-sm text-brand-text-secondary max-w-2xl mx-auto">
                  {t.teamPreview.collaboratorsDescription}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {collaborators.map((company) => (
                  <a
                    key={company.name}
                    href={company.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${company.name} official website`}
                    className="group relative flex items-center justify-center rounded-2xl border border-brand-border/40 bg-white/[0.92] p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-accent/30 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
                  >
                    <img
                      src={company.logo}
                      alt={company.name}
                      loading="lazy"
                      className="max-h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-brand-border/60 bg-white/90 text-brand-text-tertiary opacity-0 shadow-soft transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal delay={0.4}>
            <div className="mt-12 text-center">
              <Link
                to="/team"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-bg-secondary border border-brand-border text-brand-text hover:border-brand-accent/30 hover:text-brand-accent hover:shadow-soft transition-all duration-300"
              >
                <span>{t.teamPreview.viewFullTeam}</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
