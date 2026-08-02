import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import SectionHeader from '../../components/layout/SectionHeader';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useT } from '../../i18n/LanguageContext';

type ComparisonDatum = { name: string; first: number; final: number };
type Unit = '%' | '';

const calvinData = {
  one: [
    { name: 'X-VLA', first: 96.8, final: 97.0 },
    { name: 'π₀', first: 86.5, final: 86.8 },
    { name: 'π₀.₅', first: 99.7, final: 99.7 },
  ],
  two: [
    { name: 'X-VLA', first: 92.0, final: 92.0 },
    { name: 'π₀', first: 74.0, final: 74.7 },
    { name: 'π₀.₅', first: 98.0, final: 98.5 },
  ],
  three: [
    { name: 'X-VLA', first: 86.2, final: 86.3 },
    { name: 'π₀', first: 62.2, final: 64.1 },
    { name: 'π₀.₅', first: 94.5, final: 95.2 },
  ],
  four: [
    { name: 'X-VLA', first: 81.7, final: 81.9 },
    { name: 'π₀', first: 50.9, final: 53.7 },
    { name: 'π₀.₅', first: 91.5, final: 92.5 },
  ],
  five: [
    { name: 'X-VLA', first: 74.3, final: 75.7 },
    { name: 'π₀', first: 38.9, final: 45.6 },
    { name: 'π₀.₅', first: 85.3, final: 89.4 },
  ],
  average: [
    { name: 'X-VLA', first: 4.310, final: 4.329 },
    { name: 'π₀', first: 3.125, final: 3.249 },
    { name: 'π₀.₅', first: 4.690, final: 4.753 },
  ],
};

const robocasaData = {
  atomic: [
    { name: 'π₀.₅', first: 41.1, final: 56.7 },
    { name: 'RLDX-1', first: 70.0, final: 75.6 },
    { name: 'WorldDreamer', first: 66.7, final: 73.3 },
  ],
  composite: [
    { name: 'π₀.₅', first: 4.4, final: 10.0 },
    { name: 'RLDX-1', first: 16.2, final: 24.4 },
    { name: 'WorldDreamer', first: 15.6, final: 25.0 },
  ],
  overall: [
    { name: 'π₀.₅', first: 17.6, final: 26.8 },
    { name: 'RLDX-1', first: 35.6, final: 42.8 },
    { name: 'WorldDreamer', first: 34.0, final: 42.4 },
  ],
};

type CalvinMetric = keyof typeof calvinData;
type RoboCasaMetric = keyof typeof robocasaData;

function formatValue(value: number, unit: Unit) {
  return unit === '%' ? `${value.toFixed(1)}%` : value.toFixed(3);
}

function getDomain(data: ComparisonDatum[], unit: Unit): [number, number] {
  if (unit === '') {
    return [0, 5];
  }
  const maximum = Math.max(...data.flatMap((item) => [item.first, item.final]));
  return [0, Math.ceil(maximum)];
}

function MetricSelector({
  label,
  options,
  active,
  onChange,
}: {
  label: string;
  options: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-2" aria-label={label}>
      <span className="mr-1 text-xs font-mono font-semibold uppercase tracking-[0.12em] text-brand-text-tertiary">
        {label}
      </span>
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onChange(option.id)}
          className={`min-w-14 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
            active === option.id
              ? 'border-brand-accent/40 bg-brand-accent/12 text-brand-accent-dark'
              : 'border-brand-border bg-brand-bg text-brand-text-tertiary hover:text-brand-text'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function ComparisonChart({
  title,
  subtitle,
  data,
  unit,
  firstLabel,
  finalLabel,
  controls,
  note,
}: {
  title: string;
  subtitle: string;
  data: ComparisonDatum[];
  unit: Unit;
  firstLabel: string;
  finalLabel: string;
  controls?: React.ReactNode;
  note?: string;
}) {
  const domain = getDomain(data, unit);

  return (
    <div className="rounded-3xl border border-brand-border bg-brand-bg-secondary p-6 shadow-card transition-shadow duration-500 hover:shadow-card-hover sm:p-8">
      <h3 className="text-lg font-semibold text-brand-text">{title}</h3>
      <p className="mt-2 max-w-4xl text-sm leading-6 text-brand-text-tertiary">{subtitle}</p>
      {controls}
      <div className="mt-5 h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 28, right: 20, left: -4, bottom: 0 }} barGap={6}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(45,58,69,0.08)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: '#5d6b78', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis
              domain={domain}
              tick={{ fill: '#8d97a3', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => (unit === '%' ? `${value}%` : Number(value).toFixed(1))}
            />
            <Tooltip
              formatter={(value: number, name: string) => [formatValue(value, unit), name]}
              contentStyle={{
                background: '#fcfaf5',
                border: '1px solid rgba(45,58,69,0.1)',
                borderRadius: '12px',
                color: '#2d3a45',
              }}
              cursor={{ fill: 'rgba(45,58,69,0.03)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
            <Bar dataKey="first" name={firstLabel} fill="#a4adb6" radius={[8, 8, 0, 0]} barSize={28}>
              <LabelList dataKey="first" position="top" formatter={(value: number) => formatValue(value, unit)} fill="#7a858f" fontSize={11} />
            </Bar>
            <Bar dataKey="final" name={finalLabel} fill="#5c7385" radius={[8, 8, 0, 0]} barSize={28}>
              <LabelList dataKey="final" position="top" formatter={(value: number) => formatValue(value, unit)} fill="#425867" fontSize={11} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      {note && <p className="mt-3 text-xs leading-6 text-brand-text-tertiary">{note}</p>}
    </div>
  );
}

export default function Benchmark() {
  const t = useT();
  const [calvinMetric, setCalvinMetric] = useState<CalvinMetric>('five');
  const [robocasaMetric, setRobocasaMetric] = useState<RoboCasaMetric>('overall');
  const [benchmarkIndex, setBenchmarkIndex] = useState(0);

  const calvinOptions = [
    { id: 'one', label: '1/5' },
    { id: 'two', label: '2/5' },
    { id: 'three', label: '3/5' },
    { id: 'four', label: '4/5' },
    { id: 'five', label: '5/5' },
    { id: 'average', label: t.benchmark.averageLength },
  ];
  const robocasaOptions = [
    { id: 'atomic', label: t.benchmark.atomic },
    { id: 'composite', label: t.benchmark.composite },
    { id: 'overall', label: t.benchmark.overall },
  ];
  const charts = [
    {
      name: 'CALVIN',
      content: (
        <ComparisonChart
          title={t.benchmark.chartCalvinTitle}
          subtitle={t.benchmark.chartCalvinSubtitle}
          data={calvinData[calvinMetric]}
          unit={calvinMetric === 'average' ? '' : '%'}
          firstLabel={t.benchmark.first}
          finalLabel={t.benchmark.final}
          controls={
            <MetricSelector
              label={t.benchmark.metric}
              options={calvinOptions}
              active={calvinMetric}
              onChange={(id) => setCalvinMetric(id as CalvinMetric)}
            />
          }
        />
      ),
    },
    {
      name: 'RoboCasa365',
      content: (
        <ComparisonChart
          title={t.benchmark.chartRobocasaTitle}
          subtitle={t.benchmark.chartRobocasaSubtitle}
          data={robocasaData[robocasaMetric]}
          unit="%"
          firstLabel={t.benchmark.first}
          finalLabel={t.benchmark.final}
          controls={
            <MetricSelector
              label={t.benchmark.metric}
              options={robocasaOptions}
              active={robocasaMetric}
              onChange={(id) => setRobocasaMetric(id as RoboCasaMetric)}
            />
          }
          note={`${t.benchmark.rescued}: π₀.₅ 23 · RLDX-1 18 · WorldDreamer 21`}
        />
      ),
    },
  ];
  const activeChart = charts[benchmarkIndex];
  const changeBenchmark = (direction: number) => {
    setBenchmarkIndex((current) => (current + direction + charts.length) % charts.length);
  };

  return (
    <section id="benchmark" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 bg-brand-bg-secondary/40" />
      <div className="absolute inset-0 bg-grid opacity-[0.02]" />

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

          <ScrollReveal delay={0.1}>
            <div className="mx-auto mt-12 max-w-5xl">
              <div className="mb-4 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => changeBenchmark(-1)}
                  title={t.benchmark.previousBenchmark}
                  aria-label={t.benchmark.previousBenchmark}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border bg-brand-bg-secondary text-brand-text-secondary transition-colors hover:border-brand-accent/35 hover:text-brand-text"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="min-w-40 text-center">
                  <p className="font-display text-lg font-bold text-brand-text">{activeChart.name}</p>
                  <p className="mt-1 text-xs font-mono text-brand-text-tertiary">
                    {benchmarkIndex + 1} / {charts.length}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => changeBenchmark(1)}
                  title={t.benchmark.nextBenchmark}
                  aria-label={t.benchmark.nextBenchmark}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border bg-brand-bg-secondary text-brand-text-secondary transition-colors hover:border-brand-accent/35 hover:text-brand-text"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <div key={activeChart.name}>{activeChart.content}</div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
