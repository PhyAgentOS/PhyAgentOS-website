import { useEffect, useState } from 'react';
import { Github, Menu, X, Star, Sun, Moon, LogIn, LogOut, RefreshCcw, UserRound } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useT } from '../../i18n/LanguageContext';
import { useLang } from '../../i18n/LanguageContext';
import { useTheme } from '../../themes/ThemeContext';
import { getProfile, type AuthUser } from '../../lib/userSystemApi';

export default function Navigation() {
  const t = useT();
  const { lang } = useLang();
  const navigate = useNavigate();
  const docsBase = lang === 'zh' ? '/docs' : '/docs/en';
  const { currentTheme, setTheme } = useTheme();
  const isLight = currentTheme.category === 'light';
  const authLabel = lang === 'zh' ? '登录/注册' : 'Login / Register';
  const switchAccountLabel = lang === 'zh' ? '切换账号' : 'Switch account';
  const logoutLabel = lang === 'zh' ? '退出登录' : 'Log out';

  const navItems = [
    { label: t.nav.conceptFilm, href: '/#interview' },
    { label: t.nav.features, href: '/#features' },
    { label: t.nav.architecture, href: '/#architecture' },
    { label: t.nav.scenarios, href: '/#scenarios' },
    { label: t.liveDemo.label, href: '/#demo' },
    { label: t.nav.benchmark, href: '/#benchmark' },
    { label: t.nav.gettingStartedDocs, href: '/#docs' },
  ];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [starCount, setStarCount] = useState<number | null>(() => {
    const cached = window.localStorage.getItem('phyagentos-star-count');
    return cached ? Number(cached) : null;
  });
  const location = useLocation();
  const logoSrc = `${import.meta.env.BASE_URL}LOGO.png`;
  const isHome = location.pathname === '/';

  const toggleTheme = () => {
    setTheme(isLight ? 'apple-dark' : 'morandi-light');
  };

  const clearAuth = () => {
    window.localStorage.removeItem('phyagentos_user_token');
    window.localStorage.removeItem('phyagentos_user_profile');
    setAuthUser(null);
    setIsUserMenuOpen(false);
  };

  const switchAccount = () => {
    clearAuth();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const logout = () => {
    clearAuth();
    navigate('/');
    setIsMobileMenuOpen(false);
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
      let stars: number | null = null;

      try {
        const res = await fetch('https://api.github.com/repos/PhyAgentOS/PhyAgentOS', {
          headers: { Accept: 'application/vnd.github+json' },
        });
        if (res.ok) {
          const data = await res.json();
          stars = data.stargazers_count;
        }
      } catch {
        // Try the cached Shields endpoint below.
      }

      if (stars === null) {
        try {
          const res = await fetch('https://img.shields.io/github/stars/PhyAgentOS/PhyAgentOS.json');
          if (res.ok) {
            const data = await res.json();
            stars = Number(data.value);
          }
        } catch {
          // Keep the last successfully cached value.
        }
      }

      if (stars !== null && Number.isFinite(stars)) {
        setStarCount(stars);
        window.localStorage.setItem('phyagentos-star-count', String(stars));
      }
    };

    fetchStars();
    const interval = setInterval(fetchStars, 300000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    let isMounted = true;

    const syncAuthUser = async () => {
      const token = window.localStorage.getItem('phyagentos_user_token');
      const cachedProfile = window.localStorage.getItem('phyagentos_user_profile');

      if (!token) {
        if (isMounted) {
          setAuthUser(null);
        }
        return;
      }

      if (cachedProfile) {
        try {
          const user = JSON.parse(cachedProfile) as AuthUser;
          if (isMounted) {
            setAuthUser(user);
          }
        } catch {
          window.localStorage.removeItem('phyagentos_user_profile');
        }
      }

      try {
        const profile = await getProfile(token);
        window.localStorage.setItem('phyagentos_user_profile', JSON.stringify(profile));
        if (isMounted) {
          setAuthUser(profile);
        }
      } catch {
        clearAuth();
      }
    };

    syncAuthUser();
    window.addEventListener('phyagentos-auth-updated', syncAuthUser);
    window.addEventListener('storage', syncAuthUser);

    return () => {
      isMounted = false;
      window.removeEventListener('phyagentos-auth-updated', syncAuthUser);
      window.removeEventListener('storage', syncAuthUser);
    };
  }, []);

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
        <div className="px-6 sm:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between lg:h-20">
            {/* Logo */}
            <Link to="/" className="group flex shrink-0 items-center gap-3 whitespace-nowrap" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="relative shrink-0">
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

            {/* Desktop Navigation + Actions */}
            <div className="hidden xl:flex items-center gap-2 xl:gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="shrink-0 whitespace-nowrap rounded-xl px-3 py-2 text-[13px] text-brand-text-secondary transition-all duration-200 hover:bg-brand-text/[0.04] hover:text-brand-text"
                >
                  {item.label}
                </Link>
              ))}

              <div className="mx-1 h-5 w-px shrink-0 bg-brand-border/70" />

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="shrink-0 rounded-xl p-2.5 text-brand-text-secondary transition-all duration-200 hover:bg-brand-text/[0.04] hover:text-brand-text"
                aria-label="Toggle theme"
                title={isLight ? 'Switch to dark' : 'Switch to light'}
              >
                {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
              <a
                href="https://github.com/PhyAgentOS/PhyAgentOS"
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm text-brand-text-secondary transition-all duration-200 hover:bg-brand-text/[0.04] hover:text-brand-text"
              >
                <Github className="w-4 h-4" />
                <span>{t.nav.github}</span>
                {starCount !== null && (
                  <span className="flex items-center gap-1 text-xs text-brand-text-tertiary bg-brand-text/[0.04] px-1.5 py-0.5 rounded-md">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    {starCount}
                  </span>
                )}
              </a>
              <div className="relative">
                {authUser ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsUserMenuOpen((open) => !open)}
                      className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border border-brand-border px-3 py-2.5 text-sm font-medium text-brand-text transition-all duration-200 hover:border-brand-accent/35 hover:bg-brand-text/[0.04]"
                    >
                      <UserRound className="w-4 h-4 text-brand-accent" />
                      <span>{authUser.username}</span>
                    </button>
                    {isUserMenuOpen && (
                      <div className="absolute right-0 top-full mt-2 w-44 rounded-lg border border-brand-border bg-brand-bg-secondary/95 p-2 shadow-large backdrop-blur-2xl">
                        <button
                          type="button"
                          onClick={switchAccount}
                          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-brand-text transition hover:bg-brand-text/[0.06]"
                        >
                          <RefreshCcw className="h-4 w-4 text-brand-accent" />
                          {switchAccountLabel}
                        </button>
                        <button
                          type="button"
                          onClick={logout}
                          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-brand-text-secondary transition hover:bg-brand-text/[0.06] hover:text-brand-text"
                        >
                          <LogOut className="h-4 w-4" />
                          {logoutLabel}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border border-brand-border px-3 py-2.5 text-sm font-medium text-brand-text transition-all duration-200 hover:border-brand-accent/35 hover:bg-brand-text/[0.04]"
                  >
                    <LogIn className="w-4 h-4 text-brand-accent" />
                    <span>{authLabel}</span>
                  </Link>
                )}
              </div>
              <a
                href={`${docsBase}/api-reference/`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 whitespace-nowrap rounded-xl bg-brand-accent px-4 py-2.5 text-sm font-medium text-brand-text-on-accent shadow-glow-soft transition-all duration-300 hover:bg-brand-accent-light hover:shadow-glow"
              >
                {t.nav.getStarted}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="xl:hidden p-2 rounded-xl text-brand-text-secondary hover:text-brand-text hover:bg-brand-text/[0.04] transition-all"
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
        className={`fixed inset-0 z-40 xl:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          className={`absolute top-20 left-4 right-4 max-h-[calc(100vh-6rem)] overflow-y-auto bg-brand-bg-secondary/95 backdrop-blur-2xl border border-brand-border rounded-3xl p-6 shadow-large transition-all duration-500 ${
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
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-accent text-brand-text-on-accent font-medium transition-all shadow-glow-soft hover:bg-brand-accent-light"
            >
              {authUser ? <UserRound className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
              {authUser ? authUser.username : authLabel}
            </Link>
            {authUser && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={switchAccount}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-brand-border text-brand-text hover:border-brand-accent/30 transition-all"
                >
                  <RefreshCcw className="w-4 h-4" />
                  {switchAccountLabel}
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-brand-border text-brand-text hover:border-brand-accent/30 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  {logoutLabel}
                </button>
              </div>
            )}

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
              {starCount !== null && (
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
