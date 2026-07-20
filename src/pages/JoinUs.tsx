import { useT } from '../i18n/LanguageContext';

export default function JoinUs() {
  const t = useT();

  return (
    <div className="min-h-screen bg-brand-bg px-4 pb-12 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 font-display text-2xl font-bold text-brand-text">{t.hero.joinUs}</h1>
        <div className="overflow-hidden rounded-2xl border border-brand-border bg-brand-bg-secondary/50 p-2 shadow-soft sm:p-4">
          <img
            src="/media/community.png"
            alt={t.hero.joinUs}
            className="mx-auto h-auto max-h-[calc(100vh-10rem)] w-auto max-w-full rounded-xl object-contain"
          />
        </div>
      </div>
    </div>
  );
}
