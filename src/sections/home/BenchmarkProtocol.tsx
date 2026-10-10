import { ChevronRight } from 'lucide-react';
import { benchmarkProtocols } from '../../data/benchmarkProtocols';
import { useLang } from '../../i18n/LanguageContext';

const labels = {
  zh: {
    title: '测评协议', expand: '查看抽样任务与随机种子', parameters: '抽样参数',
    tasks: '任务名单', task: '任务', episodes: '总集数', configuration: '套件 / 配置',
    seeds: '种子与复现说明',
    common: '三个 benchmark 均经 PAOS 拉起，bench.run 提交，成功判定取环境原始 checker。任务名单均为能力覆盖型目的性抽样，不是随机抽样。init_state_id（初始态）与 seed（环境种子）相互独立，每个抽样点跑 1 次。',
    source: '来源：三Bench测评协议_简版_20261010.md',
  },
  en: {
    title: 'Evaluation protocol', expand: 'View sampled tasks & random seeds', parameters: 'Sampling parameters',
    tasks: 'Task list', task: 'Task', episodes: 'Total episodes', configuration: 'Suite / configuration',
    seeds: 'Seeds & reproducibility',
    common: 'All three benchmarks are launched through PAOS and submitted with bench.run; success is determined by the original environment checker. Tasks are purposively selected for capability coverage, rather than randomly sampled. The initial state (init_state_id) and environment seed (seed) are independent, with one run per sampling point.',
    source: 'Source: 三Bench测评协议_简版_20261010.md',
  },
};

export default function BenchmarkProtocol({ benchmarkId, name }: { benchmarkId: string; name: string }) {
  const { lang } = useLang();
  const copy = labels[lang];
  const protocol = benchmarkProtocols[benchmarkId];
  const parameters = [
    ...(protocol.configuration ? [[copy.configuration, protocol.configuration]] : []),
    ['init_state_ids', protocol.initStateIds],
    ['seed', protocol.seed],
    ['num_runs', '1'],
    ['max_steps', protocol.maxSteps[lang]],
    [copy.episodes, `${protocol.tasks.length} × 3 = ${protocol.episodes}`],
  ];

  return (
    <div className="benchmark-card benchmark-protocol mx-auto mt-5 max-w-6xl rounded-2xl border px-5 py-5 sm:px-9 sm:py-6">
      <h3 className="text-lg font-semibold tracking-tight">{name} · {copy.title}</h3>
      <p className="mt-2 text-sm leading-7 text-brand-text-secondary">{protocol.summary[lang]}</p>
      <details className="group mt-1" key={benchmarkId}>
        <summary className="benchmark-summary inline-flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-md text-sm font-medium">
          {copy.expand}
          <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-open:rotate-90 motion-reduce:transition-none" aria-hidden="true" />
        </summary>
        <div className="benchmark-protocol-details mt-2 space-y-6 border-t pt-5 text-sm leading-7 text-brand-text-secondary">
          <p>{copy.common}</p>
          <div>
            <h4 className="benchmark-name mb-3 font-semibold">{copy.parameters}</h4>
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {parameters.map(([label, value]) => (
                <div className="benchmark-protocol-parameter rounded-xl border px-4 py-3" key={label}>
                  <dt className="text-xs">{label}</dt>
                  <dd className="benchmark-name mt-1 font-medium tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h4 className="benchmark-name mb-3 font-semibold">{copy.tasks} ({protocol.tasks.length})</h4>
            <div className="benchmark-protocol-table overflow-x-auto rounded-xl border focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accent" role="region" aria-label={`${name} · ${copy.tasks}`} tabIndex={0}>
              <table className="w-full border-collapse text-left text-xs sm:text-sm">
                <caption className="sr-only">{name} · {copy.tasks}</caption>
                <thead>
                  <tr>
                    <th className="w-20 px-4 py-2.5 font-semibold" scope="col">task_id</th>
                    <th className="px-4 py-2.5 font-semibold" scope="col">{copy.task}</th>
                    {protocol.groupLabel && <th className="px-4 py-2.5 font-semibold" scope="col">{protocol.groupLabel[lang]}</th>}
                  </tr>
                </thead>
                <tbody>
                  {protocol.tasks.map((task, index) => (
                    <tr className="border-t" key={task.name}>
                      <th className="px-4 py-3 font-medium tabular-nums" scope="row">{index}</th>
                      <td className="min-w-[180px] break-words px-4 py-3 [overflow-wrap:anywhere]">{task.name}</td>
                      {protocol.groupLabel && <td className="min-w-[140px] px-4 py-3">{task.group?.[lang]}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h4 className="benchmark-name mb-2 font-semibold">{copy.seeds}</h4>
            <p className="[overflow-wrap:anywhere]">{protocol.seedNote[lang]}</p>
          </div>
          <p className="text-xs [overflow-wrap:anywhere]">{copy.source}</p>
        </div>
      </details>
    </div>
  );
}
