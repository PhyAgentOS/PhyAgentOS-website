import { Github, BookOpen, Mail, ExternalLink, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useT } from '../../i18n/LanguageContext';
import { useLang } from '../../i18n/LanguageContext';

export default function Footer() {
  const t = useT();
  const { lang } = useLang();
  const docsBase = lang === 'zh' ? '/docs' : '/docs/en';
  const footerLinks = {
    product: [
      { label: t.nav.features, href: '/#features' },
      { label: t.nav.architecture, href: '/#architecture' },
      { label: t.nav.hardware, href: '/#hardware' },
      { label: t.nav.roadmap, href: '/#roadmap' },
    ],
    resources: [
      { label: t.footer.documentation, href: `${docsBase}/architecture/`, external: true },
      { label: t.footer.apiReference, href: `${docsBase}/api-reference/`, external: true },
      { label: t.footer.techReport, href: '/tech-report', external: false },
      { label: t.nav.github, href: 'https://github.com/PhyAgentOS/PhyAgentOS', external: true },
      { label: t.footer.issues, href: 'https://github.com/PhyAgentOS/PhyAgentOS/issues', external: true },
    ],
    community: [
      { label: t.footer.team, href: '/team' },
      { label: t.footer.hackathon, href: '/hackathon' },
      { label: t.footer.contribute, href: `${docsBase}/developer-guide/`, external: true },
    ],
  };
  const logoSrc = `${import.meta.env.BASE_URL}LOGO.png`;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-brand-bg-secondary/80 border-t border-brand-border">
      <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />
      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Main content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
            {/* Brand */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                <img
                  src={logoSrc}
                  alt="PhyAgentOS"
                  className="h-10 w-10 rounded-xl object-contain"
                />
                <div>
                  <h3 className="text-xl font-display font-bold text-brand-text">PhyAgentOS</h3>
                  <p className="text-sm font-mono text-brand-text-tertiary">{t.footer.physicalAgentOS}</p>
                </div>
              </div>

              <p className="text-brand-text-secondary leading-relaxed max-w-sm text-sm">
                {t.footer.tagline}
              </p>

              <div className="flex gap-3">
                <a
                  href="https://github.com/PhyAgentOS/PhyAgentOS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl border border-brand-border text-brand-text-secondary hover:text-brand-text hover:border-brand-accent/30 hover:bg-brand-bg-tertiary transition-all duration-300 flex items-center gap-2 text-sm"
                >
                  <Github className="w-4 h-4" />
                  {t.footer.starOnGithub}
                </a>
                <a
                  href="mailto:phyagentos@gmail.com"
                  className="px-4 py-2.5 rounded-xl border border-brand-border text-brand-text-secondary hover:text-brand-text hover:border-brand-accent/30 hover:bg-brand-bg-tertiary transition-all duration-300 flex items-center gap-2 text-sm"
                >
                  <Mail className="w-4 h-4" />
                  {t.footer.contact}
                </a>
              </div>
            </div>

            {/* Product */}
            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-5 text-brand-text">
                {t.footer.product}
              </h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-brand-text-secondary hover:text-brand-text transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-5 text-brand-text">
                {t.footer.resources}
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-brand-text-secondary hover:text-brand-text transition-colors duration-200 flex items-center gap-1"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3 opacity-50" />
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-brand-text-secondary hover:text-brand-text transition-colors duration-200 flex items-center gap-1"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Community */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-5 text-brand-text">
                {t.footer.community}
              </h4>
              <ul className="space-y-3">
                {footerLinks.community.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-brand-text-secondary hover:text-brand-text transition-colors duration-200 flex items-center gap-1"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3 opacity-50" />
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-brand-text-secondary hover:text-brand-text transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-brand-border">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 text-xs text-brand-text-tertiary">
                <span>&copy; {currentYear} PhyAgentOS</span>
                <span className="hidden sm:inline">·</span>
                <span>{t.footer.license}</span>
                <span className="hidden sm:inline">·</span>
                <span className="flex items-center gap-1">
                  {t.footer.madeWith} <Heart className="w-3 h-3 text-brand-accent" /> {t.footer.by}{' '}
                  <a
                    href="https://www.sysu-hcp.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-text-secondary hover:text-brand-accent transition-colors"
                  >
                    {t.footer.hcpLab}
                  </a>
                  {' & '}
                  <a
                    href="https://www.pcl.ac.cn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-text-secondary hover:text-brand-accent transition-colors"
                  >
                    {t.footer.pengchengLab}
                  </a>
                  {' & '}
                  <a
                    href="https://www.ex-ai.cn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-text-secondary hover:text-brand-accent transition-colors"
                  >
                    {t.footer.xeraLab}
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/PhyAgentOS/PhyAgentOS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-brand-text-tertiary hover:text-brand-text hover:bg-brand-text/[0.04] transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={`${docsBase}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-brand-text-tertiary hover:text-brand-text hover:bg-brand-text/[0.04] transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Credits */}
            <div className="mt-6 text-center text-[11px] text-brand-text-tertiary/60">
              {t.footer.basedOn}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
