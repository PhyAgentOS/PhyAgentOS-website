import { useT } from '../i18n/LanguageContext';
import { ExternalLink, MessageCircle } from 'lucide-react';

export default function JoinUs() {
  const t = useT();

  return (
    <div className="min-h-screen bg-brand-bg px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="font-display text-3xl font-bold text-brand-text sm:text-4xl">
            {t.hero.developerCommunity}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-brand-text-secondary">
            {t.communityPage.description}
          </p>
        </div>

        <a
          href="https://discord.gg/YJztZ4wUM"
          target="_blank"
          rel="noopener noreferrer"
          className="group mb-8 flex flex-col items-start justify-between gap-5 rounded-2xl border border-brand-accent/25 bg-brand-accent/[0.08] p-6 shadow-glow-soft transition-all duration-300 hover:border-brand-accent/50 hover:bg-brand-accent/[0.12] sm:flex-row sm:items-center"
        >
          <span className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-accent text-brand-text-on-accent">
              <MessageCircle className="h-6 w-6" />
            </span>
            <span>
              <span className="block text-lg font-semibold text-brand-text">{t.communityPage.discordTitle}</span>
              <span className="mt-1 block text-sm text-brand-text-secondary">{t.communityPage.discordDescription}</span>
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-accent px-5 py-3 text-sm font-semibold text-brand-text-on-accent">
            {t.communityPage.joinDiscord}
            <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </a>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: t.communityPage.feishu, src: '/media/community/feishu.png' },
            { title: t.communityPage.bilibili, src: '/media/community/bilibili.jpg' },
            { title: t.communityPage.xiaohongshu, src: '/media/community/xiaohongshu.jpg' },
          ].map((channel) => (
            <section key={channel.title} className="overflow-hidden rounded-2xl border border-brand-border bg-brand-bg-secondary/50 p-4 shadow-soft">
              <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-xl bg-white">
                <img src={channel.src} alt={channel.title} className="h-full w-full object-contain" />
              </div>
              <div className="px-1 pb-1 pt-4 text-center">
                <h2 className="font-display text-lg font-semibold text-brand-text">{channel.title}</h2>
                <p className="mt-1 text-sm text-brand-text-tertiary">{t.communityPage.scanToJoin}</p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
