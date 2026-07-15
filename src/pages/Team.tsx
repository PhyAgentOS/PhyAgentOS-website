import { Github, Mail, MapPin, ExternalLink } from 'lucide-react';
import ScrollReveal from '../components/animations/ScrollReveal';
import SectionHeader from '../components/layout/SectionHeader';
import { useLang } from '../i18n/LanguageContext';

const coreTeam = [
  {
    name: 'HCP Lab',
    avatar: 'HCP',
  },
  {
    name: 'Peng Cheng Lab',
    avatar: 'PCL',
  },
  {
    name: 'X-Era Lab',
    avatar: 'X-Era',
  },
];

export default function Team() {
  const { lang, t } = useLang();
  const docsBase = lang === 'zh' ? '/docs' : '/docs/en';
  return (
    <div className="min-h-screen pt-24 lg:pt-32">
      <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionHeader
              label={t.teamPage.label}
              title={t.teamPage.title}
              highlight={t.teamPage.highlight}
              description={t.teamPage.description}
              align="left"
            />
          </ScrollReveal>

          {/* Core Team */}
          <div className="mt-20">
            <h2 className="text-2xl font-display font-bold text-brand-text mb-8">{t.teamPage.coreTeam}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {coreTeam.map((member, index) => (
                <ScrollReveal key={index} delay={index * 0.15}>
                  <div className="group relative p-8 rounded-3xl bg-brand-bg-secondary border border-brand-border hover:border-brand-accent/20 transition-all duration-500 shadow-card hover:shadow-card-hover overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center flex-shrink-0 shadow-glow-soft">
                          <span className="text-lg font-display font-bold text-brand-accent-dark">
                            {member.avatar}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-display font-bold text-brand-text">
                            {member.name}
                          </h3>
                          <p className="text-sm text-brand-accent font-medium">
                            {t.teamPage.members[index].role}
                          </p>
                          <p className="text-xs text-brand-text-tertiary mt-1">
                            {t.teamPage.members[index].institution}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Contributors */}
          <div className="mt-20">
            <h2 className="text-2xl font-display font-bold text-brand-text mb-8">{t.teamPage.contributors}</h2>
            <ScrollReveal>
              <div className="p-8 rounded-3xl bg-brand-bg-secondary border border-brand-border shadow-card hover:shadow-card-hover transition-shadow duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center shadow-glow-soft">
                    <Github className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-brand-text">{t.teamPage.openSourceCommunity}</h3>
                    <p className="text-sm text-brand-text-tertiary">
                      {t.teamPage.contributorsFrom}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-brand-text-secondary leading-relaxed mb-6">
                  {t.teamPage.contributionDescription}
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://github.com/PhyAgentOS/PhyAgentOS/graphs/contributors"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-accent text-brand-text-on-accent text-sm font-medium hover:bg-brand-accent-light transition-all shadow-glow-soft hover:shadow-glow"
                  >
                    <Github className="w-4 h-4" />
                    {t.teamPage.viewContributors}
                  </a>
                  <a
                    href={`${docsBase}/developer-guide/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-text/[0.03] border border-brand-border text-brand-text text-sm hover:border-brand-accent/30 hover:shadow-soft transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t.teamPage.contributionGuide}
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact */}
          <div className="mt-20 mb-20">
            <h2 className="text-2xl font-display font-bold text-brand-text mb-8">{t.teamPage.contact}</h2>
            <ScrollReveal>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <a
                  href="https://github.com/PhyAgentOS/PhyAgentOS/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 rounded-3xl bg-brand-bg-secondary border border-brand-border hover:border-brand-accent/20 transition-all group shadow-card hover:shadow-card-hover"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center group-hover:bg-brand-accent/20 transition-colors shadow-glow-soft">
                    <Github className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-text">{t.teamPage.githubIssues}</p>
                    <p className="text-xs text-brand-text-tertiary">{t.teamPage.reportBugs}</p>
                  </div>
                </a>

                <a
                  href="mailto:phyagentos@gmail.com"
                  className="flex items-center gap-4 p-6 rounded-3xl bg-brand-bg-secondary border border-brand-border hover:border-brand-accent/20 transition-all group shadow-card hover:shadow-card-hover"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center group-hover:bg-brand-accent/20 transition-colors shadow-glow-soft">
                    <Mail className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-text">{t.teamPage.email}</p>
                    <p className="text-xs text-brand-text-tertiary">phyagentos@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-6 rounded-3xl bg-brand-bg-secondary border border-brand-border shadow-card">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center shadow-glow-soft">
                    <MapPin className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-text">{t.teamPage.location}</p>
                    <p className="text-xs text-brand-text-tertiary">{t.teamPage.locationValue}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
