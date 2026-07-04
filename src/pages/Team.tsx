import { Github, Mail, MapPin, ExternalLink } from 'lucide-react';
import ScrollReveal from '../components/animations/ScrollReveal';
import SectionHeader from '../components/layout/SectionHeader';
import { useLang } from '../i18n/LanguageContext';

const coreTeam = [
  {
    name: 'HCP Lab',
    role: 'Core Development Team',
    institution: 'Sun Yat-sen University',
    description: 'Leading research in human-computer perception and embodied AI. Responsible for the overall architecture and cognitive layer design.',
    avatar: 'HCP',
    links: {
      github: 'https://github.com/SYSU-HCP-EAI',
      website: 'https://www.sysu.edu.cn/',
    },
  },
  {
    name: 'Peng Cheng Lab',
    role: 'Research Partner',
    institution: 'Peng Cheng Laboratory',
    description: 'National laboratory for AI and robotics research. Contributing to simulation environments and hardware integration.',
    avatar: 'PCL',
    links: {
      github: 'https://github.com/PCL-AI',
      website: 'https://www.pcl.ac.cn/',
    },
  },
  {
    name: 'X-Era Lab',
    role: 'Research Collaborator',
    institution: 'X-Era Lab',
    description: 'Cross-era embodied intelligence research lab. Contributing to long-horizon reasoning, self-evolution, and real-world deployment.',
    avatar: 'X-Era',
    links: {
      github: 'https://github.com/PhyAgentOS/PhyAgentOS',
      website: 'https://phyagentos.org/',
    },
  },
];

export default function Team() {
  const { lang } = useLang();
  const docsBase = lang === 'zh' ? '/docs' : '/docs/en';
  return (
    <div className="min-h-screen pt-24 lg:pt-32">
      <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionHeader
              label="Team"
              title="The people behind"
              highlight="PhyAgentOS"
              description="A collaboration between Sun Yat-sen University, Peng Cheng Laboratory, and X-Era Lab, built with the open-source community."
              align="left"
            />
          </ScrollReveal>

          {/* Core Team */}
          <div className="mt-20">
            <h2 className="text-2xl font-display font-bold text-brand-text mb-8">Core Team</h2>
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
                            {member.role}
                          </p>
                          <p className="text-xs text-brand-text-tertiary mt-1">
                            {member.institution}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-brand-text-secondary leading-relaxed mb-6">
                        {member.description}
                      </p>

                      <div className="flex gap-3">
                        <a
                          href={member.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-text/[0.03] border border-brand-border text-sm text-brand-text-secondary hover:text-brand-text hover:border-brand-accent/30 hover:shadow-soft transition-all"
                        >
                          <Github className="w-4 h-4" />
                          GitHub
                        </a>
                        <a
                          href={member.links.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-text/[0.03] border border-brand-border text-sm text-brand-text-secondary hover:text-brand-text hover:border-brand-accent/30 hover:shadow-soft transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Website
                        </a>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Contributors */}
          <div className="mt-20">
            <h2 className="text-2xl font-display font-bold text-brand-text mb-8">Contributors</h2>
            <ScrollReveal>
              <div className="p-8 rounded-3xl bg-brand-bg-secondary border border-brand-border shadow-card hover:shadow-card-hover transition-shadow duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center shadow-glow-soft">
                    <Github className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-brand-text">Open Source Community</h3>
                    <p className="text-sm text-brand-text-tertiary">
                      Contributors from around the world
                    </p>
                  </div>
                </div>

                <p className="text-sm text-brand-text-secondary leading-relaxed mb-6">
                  PhyAgentOS is an open-source project that welcomes contributions from the community.
                  Whether you are fixing bugs, adding new features, improving documentation, or sharing
                  your use cases, every contribution matters.
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://github.com/PhyAgentOS/PhyAgentOS/graphs/contributors"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-accent text-brand-text-on-accent text-sm font-medium hover:bg-brand-accent-light transition-all shadow-glow-soft hover:shadow-glow"
                  >
                    <Github className="w-4 h-4" />
                    View Contributors
                  </a>
                  <a
                    href={`${docsBase}/developer-guide/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-text/[0.03] border border-brand-border text-brand-text text-sm hover:border-brand-accent/30 hover:shadow-soft transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Contribution Guide
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact */}
          <div className="mt-20 mb-20">
            <h2 className="text-2xl font-display font-bold text-brand-text mb-8">Contact</h2>
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
                    <p className="text-sm font-semibold text-brand-text">GitHub Issues</p>
                    <p className="text-xs text-brand-text-tertiary">Report bugs & request features</p>
                  </div>
                </a>

                <a
                  href="mailto:contact@phyagentos.org"
                  className="flex items-center gap-4 p-6 rounded-3xl bg-brand-bg-secondary border border-brand-border hover:border-brand-accent/20 transition-all group shadow-card hover:shadow-card-hover"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center group-hover:bg-brand-accent/20 transition-colors shadow-glow-soft">
                    <Mail className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-text">Email</p>
                    <p className="text-xs text-brand-text-tertiary">contact@phyagentos.org</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-6 rounded-3xl bg-brand-bg-secondary border border-brand-border shadow-card">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center shadow-glow-soft">
                    <MapPin className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-text">Location</p>
                    <p className="text-xs text-brand-text-tertiary">Guangzhou, China</p>
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
