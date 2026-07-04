import { useEffect, useState } from 'react';
import { Github, Menu, X, Star, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useT } from '../../i18n/LanguageContext';
import { useLang } from '../../i18n/LanguageContext';
import { useTheme } from '../../themes/ThemeContext';

export default function Navigation() {
  const t = useT();
  const { lang } = useLang();
  const docsBase = lang === 'zh' ? '/docs' : '/docs/en';
  const { currentTheme, setTheme } = useTheme();
  const isLight = currentTheme.category === 'light';

  const navItems = [
    { label: t.nav.features, href: '/#features' },
    { label: t.nav.architecture, href: '/#architecture' },
    { label: t.nav.scenarios, href: '/#scenarios' },
    { label: t.nav.hardware, href: '/#hardware' },
    { label: t.nav.roadmap, href: '/#roadmap' },
    { label: t.nav.team, href: '/team' },
  ];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [starCount, setStarCount] = useState(0);
  const location = useLocation();
  const logoSrc = `${import.meta.env.BASE_URL}LOGO.png`;
  const isHome = location.pathname === '/';

  const toggleTheme = () => {
    setTheme(isLight ? 'apple-dark' : 'morandi-light');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const res = await fetch('https://api.github.com/repos/PhyAgentOS/PhyAgentOS', {
          headers: { Accept: 'application/vnd.github+json' },
        });
        if (res.ok) {
          const data = await res.json();
          setStarCount(data.stargazers_count || 0);
        }
      } catch {
        // silently fail
      }
    };

    fetchStars();
    const interval = setInterval(fetchStars, 300000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isHome && href.startsWith('/#')) {
      return;
    }
    if (href.startsWith('/#')) {
      e.preventDefault();
      const hash = href.split('#')[1];
      const element = document.querySelector(`#${hash}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-brand-bg/85 backdrop-blur-2xl border-b border-brand-border shadow-soft'
            : 'bg-transparent'
        }`}
      >
        <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
          <div className="max-w-7xl mx-auto flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="relative">
                <img
                  src={logoSrc}
                  alt="PhyAgentOS"
                  className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl object-contain transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 rounded-xl bg-brand-accent/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="font-display font-semibold text-brand-text text-lg hidden sm:block">
                PhyAgentOS
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 bg-brand-bg-secondary/40 backdrop-blur-xl rounded-2xl p-1 border border-brand-border/50">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-4 py-2 rounded-xl text-sm text-brand-text-secondary hover:text-brand-text hover:bg-brand-text/[0.04] transition-all duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl text-brand-text-secondary hover:text-brand-text hover:bg-brand-text/[0.04] transition-all duration-200"
                aria-label="Toggle theme"
                title={isLight ? 'Switch to dark' : 'Switch to light'}
              >
                {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
              <a
                href="https://github.com/PhyAgentOS/PhyAgentOS"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-brand-text-secondary hover:text-brand-text hover:bg-brand-text/[0.04] transition-all duration-200"
              >
                <Github className="w-4 h-4" />
                <span>{t.nav.github}</span>
                {starCount > 0 && (
                  <span className="flex items-center gap-1 text-xs text-brand-text-tertiary bg-brand-text/[0.04] px-1.5 py-0.5 rounded-md">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    {starCount}
                  </span>
                )}
              </a>
              <a
                href={`${docsBase}/api-reference/`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-brand-accent hover:bg-brand-accent-light text-brand-text-on-accent text-sm font-medium rounded-xl transition-all duration-300 shadow-glow-soft hover:shadow-glow"
              >
                {t.nav.getStarted}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-xl text-brand-text-secondary hover:text-brand-text hover:bg-brand-text/[0.04] transition-all"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          className={`absolute top-20 left-4 right-4 bg-brand-bg-secondary/95 backdrop-blur-2xl border border-brand-border rounded-3xl p-6 shadow-large transition-all duration-500 ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
          }`}
        >
          <div className="space-y-1">
            {navItems.map((item, idx) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block px-4 py-3 rounded-xl text-brand-text font-medium hover:bg-brand-text/[0.04] transition-all"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-brand-border space-y-3">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-brand-border text-brand-text hover:border-brand-accent/30 transition-all w-full"
            >
              {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              <span>{isLight ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
            <a
              href="https://github.com/PhyAgentOS/PhyAgentOS"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-brand-border text-brand-text hover:border-brand-accent/30 transition-all"
            >
              <Github className="w-4 h-4" />
              GitHub
              {starCount > 0 && (
                <span className="flex items-center gap-1 text-xs text-brand-text-tertiary">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  {starCount}
                </span>
              )}
            </a>
            <a
              href={`${docsBase}/api-reference/`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 py-3 bg-brand-accent hover:bg-brand-accent-light text-brand-text-on-accent font-medium rounded-xl transition-all text-center shadow-glow-soft"
            >
              {t.nav.getStarted}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
