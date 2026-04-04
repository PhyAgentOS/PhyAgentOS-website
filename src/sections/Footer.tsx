import { Github, BookOpen, Mail } from 'lucide-react';

const quickLinks = [
  { label: 'GitHub', href: 'https://github.com/SYSU-HCP-EAI/PhyAgentOS', icon: Github },
  { label: 'Docs', href: '#', icon: BookOpen },
];

const resources = [
  { label: 'Quick Start', href: '#' },
  { label: 'API Reference', href: '#' },
  { label: 'Development Guide', href: '#' },
  { label: 'Examples', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative bg-brand-bg-light overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-dark opacity-10" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-accent flex items-center justify-center">
                  <span className="text-white font-display font-bold text-lg">P</span>
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-brand-text-dark">PhyAgentOS</h3>
                  <p className="text-sm font-mono text-brand-text-dark/50">Physical Agent OS</p>
                </div>
              </div>
              
              <p className="text-brand-text-dark/60 leading-relaxed max-w-md">
                A self-evolving embodied AI framework based on Agentic workflow, 
                achieving complete decoupling of cognition and physical execution.
              </p>

              <div className="flex gap-3">
                <a 
                  href="https://github.com/SYSU-HCP-EAI/PhyAgentOS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-brand-border-light rounded-lg text-brand-text-dark hover:border-brand-accent hover:text-brand-accent transition-colors flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  Star on GitHub
                </a>
                <a 
                  href="#"
                  className="px-4 py-2 border border-brand-border-light rounded-lg text-brand-text-dark hover:border-brand-accent hover:text-brand-accent transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Contact
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-mono font-semibold uppercase tracking-wider mb-4 text-brand-text-dark">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-2 text-brand-text-dark/60 hover:text-brand-accent transition-colors"
                    >
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-sm font-mono font-semibold uppercase tracking-wider mb-4 text-brand-text-dark">
                Resources
              </h4>
              <ul className="space-y-3">
                {resources.map((resource, index) => (
                  <li key={index}>
                    <a 
                      href={resource.href}
                      className="text-brand-text-dark/60 hover:text-brand-accent transition-colors"
                    >
                      {resource.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-brand-border-light pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 text-sm text-brand-text-dark/50">
                <span>&copy; 2026 PhyAgentOS</span>
                <span className="hidden sm:inline">•</span>
                <span>MIT License</span>
              </div>

              <div className="flex items-center gap-1 text-sm text-brand-text-dark/50">
                <span>Made by</span>
                <a 
                  href="https://github.com/SYSU-HCP-EAI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-accent hover:underline"
                >
                  HCP Lab
                </a>
              </div>
            </div>

            {/* Special thanks */}
            <div className="mt-6 text-center text-xs text-brand-text-dark/40">
              Based on{' '}
              <a 
                href="https://github.com/HKUDS/nanobot"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-accent transition-colors"
              >
                nanobot
              </a>
              {' '}framework
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
