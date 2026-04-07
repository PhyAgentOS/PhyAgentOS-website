import { useEffect, useState } from 'react';
import { Github, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Devices', href: '#devices' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoSrc = `${import.meta.env.BASE_URL}LOGO.png`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
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
            <a 
              href="#"
              className="flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
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
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-4 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
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
              <a
                href="https://github.com/PhyAgentOS/PhyAgentOS/blob/main/docs/user_manual/README.md"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-brand-accent hover:bg-brand-accent-light text-white text-sm font-medium rounded-lg transition-colors"
              >
                Get Started
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu panel */}
        <div 
          className={`absolute top-16 left-4 right-4 bg-[#1a1a1a] border border-white/10 rounded-xl p-6 transition-all duration-300 ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block px-4 py-3 rounded-lg text-white font-medium hover:bg-white/5 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
            <a
              href="https://github.com/SYSU-HCP-EAI/PhyAgentOS"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-white/10 rounded-lg text-white hover:border-brand-accent transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="https://github.com/PhyAgentOS/PhyAgentOS/blob/main/docs/user_manual/README.md"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-3 bg-brand-accent hover:bg-brand-accent-light text-white font-medium rounded-lg transition-colors text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
