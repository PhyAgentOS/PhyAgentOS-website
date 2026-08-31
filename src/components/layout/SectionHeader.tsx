import type { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';

interface SectionLabelProps {
  children: ReactNode;
  labelIcon?: ReactNode;
  className?: string;
}

export function SectionLabel({ children, labelIcon, className = '' }: SectionLabelProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-4 py-2 text-xs font-mono uppercase tracking-wider text-brand-accent-dark shadow-glow-soft ${className}`}
    >
      {labelIcon || <Sparkles className="h-3.5 w-3.5" />}
      {children}
    </div>
  );
}

interface SectionHeaderProps {
  label?: string;
  labelIcon?: React.ReactNode;
  title: string;
  highlight?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeader({
  label,
  labelIcon,
  title,
  highlight,
  description,
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';
  const maxWidthClass = align === 'center' ? 'max-w-3xl mx-auto' : 'max-w-2xl';

  return (
    <div className={`${alignClass} ${maxWidthClass} ${className}`}>
      {label && (
        <SectionLabel labelIcon={labelIcon} className="mb-6">
          {label}
        </SectionLabel>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold tracking-tight leading-[1.22] text-brand-text">
        {title}
        {highlight && (
          <>
            {title.endsWith('，') ? null : ' '}
            <span className="inline-block text-gradient">{highlight}</span>
          </>
        )}
      </h2>

      {description && (
        <p className="mt-6 text-base sm:text-lg text-brand-text-secondary leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
