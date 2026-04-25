import { Outlet, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Github, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Features', href: '/#features' },
  { label: 'Architecture', href: '/#architecture' },
  { label: 'Devices', href: '/#devices' },
  { label: 'Docs', href: '/#docs' },
];

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const logoSrc = `${import.meta.env.BASE_URL}LOGO.png`;
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isHome) return;
    e.preventDefault();
    const hash = href.split('#')[1];
    const element = document.querySelector(`#${hash}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
          <div className="max-w-7xl mx-auto flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2"
              onClick={scrollToTop}
            >
              <img
                src={logoSrc}
                alt="PhyAgentOS logo"
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg object-contain"
                loading="eager"
                decoding="async"
              />
              <span className="font-display font-semibold text-white hidden sm:block">
                PhyAgentOS
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-4 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/hackathon"
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                  location.pathname === '/hackathon'
                    ? 'text-brand-accent bg-brand-accent/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                Hackathon
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="https://github.com/SYSU-HCP-EAI/PhyAgentOS"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white flex items-center gap-2 px-4 py-2"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <Link
                to="/hackathon"
                className="px-4 py-2 bg-brand-accent hover:bg-brand-accent-light text-white text-sm font-medium rounded-lg transition-colors"
              >
                Join Hackathon
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden p-2 text-white/60 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
            <div className="px-6 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block px-4 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/hackathon"
                className={`block px-4 py-2 rounded-lg text-sm transition-all ${
                  location.pathname === '/hackathon'
                    ? 'text-brand-accent bg-brand-accent/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                Hackathon
              </Link>
              <div className="pt-2 border-t border-white/10 mt-2">
                <a
                  href="https://github.com/SYSU-HCP-EAI/PhyAgentOS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-white/60 hover:text-white"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-white/10 py-12">
        <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <img
                    src={logoSrc}
                    alt="PhyAgentOS"
                    className="h-8 w-8 rounded-lg object-contain"
                  />
                  <span className="font-display font-semibold text-white">PhyAgentOS</span>
                </div>
                <p className="text-white/50 text-sm max-w-sm">
                  The embodied AI framework that bridges cognitive intelligence with physical action. Build, deploy, and orchestrate intelligent agents across any hardware.
                </p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-3 text-sm">Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="https://github.com/PhyAgentOS/PhyAgentOS/blob/main/docs/user_manual/README.md" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm transition-colors">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/PhyAgentOS/PhyAgentOS" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm transition-colors">
                      GitHub
                    </a>
                  </li>
                  <li>
                    <Link to="/hackathon" className="text-white/50 hover:text-brand-accent text-sm transition-colors">
                      Hackathon 2026
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-3 text-sm">Community</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="https://github.com/PhyAgentOS/PhyAgentOS/issues" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm transition-colors">
                      Issues
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/PhyAgentOS/PhyAgentOS/blob/main/docs/user_development_guide/contribution_workflow.md" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm transition-colors">
                      Contribute
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-white/40 text-xs">
                &copy; {new Date().getFullYear()} PhyAgentOS. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://github.com/PhyAgentOS/PhyAgentOS" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
