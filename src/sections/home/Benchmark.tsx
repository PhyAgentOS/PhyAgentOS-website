import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import SectionHeader from '../../components/layout/SectionHeader';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useT } from '../../i18n/LanguageContext';

const benchmarkData = [
  { name: 'OpenVLA', first: 74.5, final: 75.5 },
  { name: 'π₀', first: 92.8, final: 93.2 },
  { name: 'π₀.₅', first: 97.0, final: 97.8 },
  { name: 'X-VLA', first: 97.3, final: 98.6 },
];

export default function Benchmark() {
  const t = useT();

  return (
    <section id="benchmark" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 bg-brand-bg-secondary/40" />
      <div className="absolute inset-0 bg-grid opacity-[0.02]" />
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/[0.03] blur-[150px]" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <SectionHeader
              label={t.benchmark.label}
              title={t.benchmark.title}
              highlight={t.benchmark.highlight}
              description={t.benchmark.description}
            />
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-16 rounded-3xl border border-brand-border bg-brand-bg-secondary p-6 shadow-card transition-shadow duration-500 hover:shadow-card-hover sm:p-8">
              <h3 className="text-lg font-semibold text-brand-text">{t.benchmark.chart1Title}</h3>
              <p className="mb-8 mt-2 max-w-3xl text-sm leading-6 text-brand-text-tertiary">
                {t.benchmark.chart1Subtitle}
              </p>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={benchmarkData} margin={{ top: 12, right: 20, left: -14, bottom: 0 }} barGap={6}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(45,58,69,0.08)" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: '#5d6b78', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis
                      domain={[70, 100]}
                      tick={{ fill: '#8d97a3', fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                      formatter={(value: number) => [`${value.toFixed(1)}%`, '']}
                      contentStyle={{
                        background: '#fcfaf5',
                        border: '1px solid rgba(45,58,69,0.1)',
                        borderRadius: '16px',
                        color: '#2d3a45',
                      }}
                      cursor={{ fill: 'rgba(45,58,69,0.03)' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
                    <Bar dataKey="first" name={t.benchmark.first} fill="#a4adb6" radius={[8, 8, 0, 0]} barSize={28} />
                    <Bar dataKey="final" name={t.benchmark.final} fill="#5c7385" radius={[8, 8, 0, 0]} barSize={28} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
