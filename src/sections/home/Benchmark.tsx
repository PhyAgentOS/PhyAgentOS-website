import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import SectionHeader from '../../components/layout/SectionHeader';
import ScrollReveal from '../../components/animations/ScrollReveal';
import CountUp from '../../components/animations/CountUp';
import { useT } from '../../i18n/LanguageContext';

const benchmarkData = [
  { name: 'PhyAgentOS', successRate: 92, codeLines: 15, robots: 6, fill: '#5c7385' },
  { name: 'Baseline-1', successRate: 78, codeLines: 45, robots: 3, fill: '#a4adb6' },
  { name: 'Baseline-2', successRate: 85, codeLines: 80, robots: 2, fill: '#a4adb6' },
  { name: 'Baseline-3', successRate: 73, codeLines: 35, robots: 2, fill: '#a4adb6' },
];

export default function Benchmark() {
  const t = useT();
const stats = [
  { value: 92, suffix: '%', label: t.benchmark.stats[0].label, description: t.benchmark.stats[0].description },
  { value: 6, suffix: '+', label: t.benchmark.stats[1].label, description: t.benchmark.stats[1].description },
  { value: 100, suffix: 'x', label: t.benchmark.stats[2].label, description: t.benchmark.stats[2].description },
  { value: 100, suffix: '%', label: t.benchmark.stats[3].label, description: t.benchmark.stats[3].description },
];
  return (
    <section id="benchmark" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-brand-bg-secondary/40" />
      <div className="absolute inset-0 bg-grid opacity-[0.02]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-accent/[0.03] rounded-full blur-[150px]" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionHeader
              label={t.benchmark.label}
              title={t.benchmark.title}
              highlight={t.benchmark.highlight}
              description={t.benchmark.description}
            />
          </ScrollReveal>

          {/* Stats Grid */}
          <ScrollReveal delay={0.1}>
            <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="relative p-6 rounded-3xl bg-brand-bg-secondary border border-brand-border group hover:border-brand-accent/30 transition-all duration-500 shadow-card hover:shadow-card-hover"
                >
                  <div className="absolute inset-0 bg-brand-accent/[0.03] opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-brand-text mb-3">
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm font-semibold text-brand-text mb-1">{stat.label}</div>
                    <div className="text-xs text-brand-text-tertiary">{stat.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Charts */}
          <ScrollReveal delay={0.2}>
            <div className="mt-16 grid lg:grid-cols-2 gap-8">
              {/* Success Rate Chart */}
              <div className="p-6 sm:p-8 rounded-3xl bg-brand-bg-secondary border border-brand-border shadow-card hover:shadow-card-hover transition-shadow duration-500">
                <h3 className="text-lg font-semibold text-brand-text mb-2">{t.benchmark.chart1Title}</h3>
                <p className="text-sm text-brand-text-tertiary mb-8">{t.benchmark.chart1Subtitle}</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={benchmarkData} layout="vertical" margin={{ left: 0, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(45,58,69,0.06)" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} tick={{ fill: '#8d97a3', fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis dataKey="name" type="category" tick={{ fill: '#5d6b78', fontSize: 12 }} axisLine={false} tickLine={false} width={90} />
                      <Tooltip
                        contentStyle={{
                          background: '#fcfaf5',
                          border: '1px solid rgba(45,58,69,0.1)',
                          borderRadius: '16px',
                          color: '#2d3a45',
                        }}
                        cursor={{ fill: 'rgba(45,58,69,0.03)' }}
                      />
                      <Bar dataKey="successRate" radius={[0, 12, 12, 0]} barSize={28}>
                        {benchmarkData.map((entry, index) => (
                          <Cell key={index} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Code Lines Chart */}
              <div className="p-6 sm:p-8 rounded-3xl bg-brand-bg-secondary border border-brand-border shadow-card hover:shadow-card-hover transition-shadow duration-500">
                <h3 className="text-lg font-semibold text-brand-text mb-2">{t.benchmark.chart2Title}</h3>
                <p className="text-sm text-brand-text-tertiary mb-8">{t.benchmark.chart2Subtitle}</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={benchmarkData} layout="vertical" margin={{ left: 0, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(45,58,69,0.06)" horizontal={false} />
                      <XAxis type="number" tick={{ fill: '#8d97a3', fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis dataKey="name" type="category" tick={{ fill: '#5d6b78', fontSize: 12 }} axisLine={false} tickLine={false} width={90} />
                      <Tooltip
                        contentStyle={{
                          background: '#fcfaf5',
                          border: '1px solid rgba(45,58,69,0.1)',
                          borderRadius: '16px',
                          color: '#2d3a45',
                        }}
                        cursor={{ fill: 'rgba(45,58,69,0.03)' }}
                      />
                      <Bar dataKey="codeLines" radius={[0, 12, 12, 0]} barSize={28}>
                        {benchmarkData.map((entry, index) => (
                          <Cell key={index} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Note */}
          <ScrollReveal delay={0.3}>
            <p className="mt-8 text-center text-xs text-brand-text-tertiary">
              {t.benchmark.note}{' '}
              <a href="https://github.com/PhyAgentOS/PhyAgentOS" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">
                {t.benchmark.documentation}
              </a>.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
