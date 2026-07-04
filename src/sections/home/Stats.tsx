import { useEffect, useState } from 'react';
import CountUp from '../../components/animations/CountUp';
import { useT } from '../../i18n/LanguageContext';
import ScrollReveal from '../../components/animations/ScrollReveal';

const GITHUB_OWNER = import.meta.env.VITE_GITHUB_OWNER ?? 'PhyAgentOS';
const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO ?? 'PhyAgentOS';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export default function Stats() {
  const t = useT();
const staticStats: StatItem[] = [
  { value: 19, suffix: '+', label: t.stats.targetAdapters, description: t.stats.targetAdaptersDesc },
  { value: 100, suffix: '%', label: t.stats.auditable, description: t.stats.auditableDesc },
  { value: 100, suffix: '%', label: t.stats.openSource, description: t.stats.openSourceDesc },
];
  const [stats, setStats] = useState<StatItem[]>(staticStats);

  useEffect(() => {
    const controller = new AbortController();

    const fetchGitHubData = async () => {
      try {
        const [repoRes, contribRes] = await Promise.all([
          fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`, {
            signal: controller.signal,
            headers: { Accept: 'application/vnd.github+json' },
          }),
          fetch(
            `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contributors?per_page=1&anon=true`,
            {
              signal: controller.signal,
              headers: { Accept: 'application/vnd.github+json' },
            }
          ),
        ]);

        let stars = 0;
        let contributors = 0;

        if (repoRes.ok) {
          const repoData = await repoRes.json();
          stars = repoData.stargazers_count || 0;
        }

        if (contribRes.ok) {
          const linkHeader = contribRes.headers.get('link');
          if (linkHeader) {
            const lastPageMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
            if (lastPageMatch) {
              contributors = Number(lastPageMatch[1]);
            }
          } else {
            const contributorsData = await contribRes.json();
            contributors = contributorsData.length;
          }
        }

        const dynamicStats: StatItem[] = [
          { value: stars, suffix: '', label: t.stats.githubStars, description: t.stats.githubStarsDesc },
          { value: 19, suffix: '+', label: t.stats.targetAdapters, description: t.stats.targetAdaptersDesc },
          { value: contributors, suffix: '', label: t.stats.contributors, description: t.stats.contributorsDesc },
        ];

        setStats(dynamicStats);
      } catch {
        // Keep static stats on error
      }
    };

    fetchGitHubData();
    const interval = setInterval(fetchGitHubData, 300000);
    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-brand-bg-secondary/40" />
      <div className="absolute inset-0 bg-grid opacity-[0.02]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-accent/[0.03] rounded-full blur-[150px]" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-brand-text leading-tight">
                  {t.stats.title}
                </h2>
              </div>
              <div>
                <p className="text-brand-text-secondary leading-relaxed text-lg">
                  {t.stats.description}
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="relative p-8 rounded-3xl bg-brand-bg border border-brand-border group hover:border-brand-accent/30 transition-all duration-500 shadow-card hover:shadow-card-hover overflow-hidden"
                >
                  <div className="absolute inset-0 bg-brand-accent/[0.03] opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />

                  {/* Corner brackets */}
                  <div className="absolute top-5 left-5 w-5 h-5 border-t-2 border-l-2 border-brand-border group-hover:border-brand-accent/30 transition-colors" />
                  <div className="absolute bottom-5 right-5 w-5 h-5 border-b-2 border-r-2 border-brand-border group-hover:border-brand-accent/30 transition-colors" />

                  <div className="relative z-10">
                    <div className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-brand-text mb-4">
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm font-semibold text-brand-text mb-1">{stat.label}</div>
                    <div className="text-xs text-brand-text-tertiary">{stat.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
