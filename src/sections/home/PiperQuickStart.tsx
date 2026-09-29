import { Children, isValidElement, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Check, Copy, ExternalLink, TerminalSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import zhGuide from '../../content/piper-quickstart.md?raw';
import enGuide from '../../content/piper-quickstart.en.md?raw';

const labels = {
  zh: { copy: '复制命令', copied: '已复制', failed: '复制失败，请手动选择命令' },
  en: { copy: 'Copy command', copied: 'Copied', failed: 'Copy failed; select the command manually' },
};

export default function PiperQuickStart({ lang }: { lang: 'zh' | 'en' }) {
  const [copyStatus, setCopyStatus] = useState<{ key: string; result: 'copied' | 'failed' } | null>(null);
  const label = labels[lang];

  useEffect(() => {
    if (!copyStatus) return;
    const timeout = window.setTimeout(() => setCopyStatus(null), 2000);
    return () => window.clearTimeout(timeout);
  }, [copyStatus]);

  const copyCommand = async (key: string, command: string) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopyStatus({ key, result: 'copied' });
    } catch {
      setCopyStatus({ key, result: 'failed' });
    }
  };

  return (
    <div id="piper-quick-start" className="rounded-3xl border border-brand-accent/25 bg-brand-bg-secondary p-5 shadow-soft sm:p-8">
      <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.16em] text-brand-accent">
        <TerminalSquare className="h-4 w-4" />
        PIPER · MOVE-ARM-BY-EE
      </div>
      <div className="mt-3">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => <h1 className="font-display text-2xl font-bold text-brand-text sm:text-3xl">{children}</h1>,
            h2: ({ children }) => <h2 className="mt-8 border-t border-brand-border pt-5 font-display text-lg font-bold text-brand-text">{children}</h2>,
            h3: ({ children }) => <h3 className="mt-5 font-medium text-brand-text">{children}</h3>,
            p: ({ children }) => <p className="mt-2 text-sm leading-7 text-brand-text-secondary">{children}</p>,
            a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-brand-accent hover:underline">{children}<ExternalLink className="h-3.5 w-3.5 shrink-0" /></a>,
            strong: ({ children }) => <strong className="font-semibold text-brand-text">{children}</strong>,
            ul: ({ children }) => <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-7 text-brand-text-secondary">{children}</ul>,
            ol: ({ children }) => <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-7 text-brand-text-secondary">{children}</ol>,
            blockquote: ({ children }) => <blockquote className="mt-3 border-l-2 border-brand-accent pl-4 text-brand-text-secondary">{children}</blockquote>,
            code: ({ children, className }) => <code className={className ?? 'rounded bg-brand-bg-tertiary px-1 py-0.5 font-mono text-xs'}>{children}</code>,
            pre: ({ children, node }) => {
              const codeElement = Children.toArray(children).find((child) => isValidElement<{ children?: ReactNode }>(child));
              const command = isValidElement<{ children?: ReactNode }>(codeElement)
                ? String(codeElement.props.children ?? '').replace(/\n$/, '')
                : '';
              const key = String(node?.position?.start.line ?? command);
              const status = copyStatus?.key === key ? copyStatus.result : null;

              return (
                <div className="relative mt-2 rounded-xl border border-brand-border border-l-[3px] border-l-brand-accent/60 bg-brand-bg-secondary shadow-sm">
                  <pre className="overflow-x-auto py-4 pl-4 pr-14 font-mono text-xs leading-6 text-brand-text sm:text-sm">{children}</pre>
                  <button
                    type="button"
                    onClick={() => void copyCommand(key, command)}
                    aria-label={`${status === 'copied' ? label.copied : label.copy}：${command}`}
                    title={status === 'copied' ? label.copied : label.copy}
                    className={`absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-brand-border bg-brand-bg transition-colors hover:bg-brand-bg-tertiary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent ${status === 'copied' ? 'text-brand-accent' : 'text-brand-text-secondary'}`}
                  >
                    {status === 'copied' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                  {status === 'failed' && <p role="status" className="px-4 pb-2 text-xs text-brand-accent">{label.failed}</p>}
                </div>
              );
            },
          }}
        >
          {lang === 'zh' ? zhGuide : enGuide}
        </ReactMarkdown>
      </div>
    </div>
  );
}
