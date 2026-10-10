import { useT } from '../i18n/LanguageContext';
import { ExternalLink } from 'lucide-react';

export default function JoinUs() {
  const t = useT();
  const communityLinks = [
    {
      href: 'https://www.xiaohongshu.com/user/profile/673d83e3000000001c01a183',
      logo: 'xiaohongshu',
      logoBackground: 'bg-[#ff2442]',
      title: t.communityPage.xiaohongshuTitle,
      description: t.communityPage.xiaohongshuDescription,
      action: t.communityPage.visitXiaohongshu,
    },
    {
      href: 'https://space.bilibili.com/3546880296355920?spm_id_from=333.1007.0.0',
      logo: 'bilibili',
      logoBackground: 'bg-[#00aeec]',
      title: t.communityPage.bilibiliTitle,
      description: t.communityPage.bilibiliDescription,
      action: t.communityPage.visitBilibili,
    },
    {
      href: 'https://www.youtube.com/@PhyAgent-OS',
      logo: 'youtube',
      logoBackground: 'bg-[#ff0033]',
      title: t.communityPage.youtubeTitle,
      description: t.communityPage.youtubeDescription,
      action: t.communityPage.visitYoutube,
    },
    {
      href: 'https://x.com/phyagentos',
      logo: 'x',
      logoBackground: 'bg-[#111113]',
      title: t.communityPage.xTitle,
      description: t.communityPage.xDescription,
      action: t.communityPage.visitX,
    },
  ];
  const groups = [
    {
      title: t.communityPage.feishu,
      logo: 'feishu',
      logoBackground: 'bg-[#eef2ff]',
      src: '/media/community/feishu.png',
      imageWidth: 1372,
      imageHeight: 1456,
      qrCrop: { left: 372, top: 492, size: 632 },
      validity: t.communityPage.feishuValidity,
    },
    {
      title: t.communityPage.wechat,
      logo: 'wechat',
      logoBackground: 'bg-[#edfaf1]',
      src: '/media/community/wechat-20261010.jpg',
      imageWidth: 1146,
      imageHeight: 1661,
      qrCrop: { left: 160, top: 576, size: 824 },
      validity: t.communityPage.wechatValidity,
    },
  ];

  return (
    <div className="min-h-screen bg-brand-bg px-4 pb-14 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-5 inline-flex rounded-full bg-brand-bg-tertiary px-7 py-2 text-sm font-medium tracking-widest text-brand-accent-dark">
            {t.communityPage.label}
          </p>
          <h1 className="font-sans text-3xl font-bold tracking-tight text-brand-text sm:text-4xl lg:text-[2.75rem]">
            {t.communityPage.title}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-brand-text-secondary sm:text-base">
            {t.communityPage.description}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {communityLinks.map(({ href, logo, logoBackground, title, description, action }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-w-0 flex-col items-start justify-between gap-5 rounded-2xl border border-brand-border bg-brand-bg-secondary p-5 shadow-sm transition-all duration-200 hover:border-brand-accent/50 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-4 focus-visible:ring-offset-brand-bg sm:flex-row sm:items-center sm:p-6 lg:flex-col lg:items-start xl:flex-row xl:items-center"
            >
              <span className="flex min-w-0 items-center gap-4">
                <span className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl shadow-sm sm:h-[4.5rem] sm:w-[4.5rem] ${logoBackground}`}>
                  <img
                    src={`/media/community/logos/${logo}.svg`}
                    alt=""
                    aria-hidden="true"
                    className={logo === 'xiaohongshu' ? 'h-14 w-14 brightness-0 invert' : 'h-10 w-10 brightness-0 invert'}
                    width={56}
                    height={56}
                  />
                </span>
                <span>
                  <span className="block text-lg font-semibold text-brand-text">{title}</span>
                  <span className="mt-1 block text-sm leading-6 text-brand-text-secondary">{description}</span>
                </span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-2 self-end whitespace-nowrap rounded-xl bg-brand-accent px-4 py-3 text-sm font-medium text-brand-text-on-accent transition-colors group-hover:bg-brand-accent-dark sm:self-center lg:self-end xl:self-center">
                {action}
                <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          ))}
        </div>

        <section aria-labelledby="developer-groups" className="mx-auto mt-12 max-w-4xl">
          <div className="mb-7 text-center">
            <div className="flex items-center gap-5">
              <span className="h-px flex-1 bg-brand-border" />
              <h2 id="developer-groups" className="font-sans text-base font-medium text-brand-text-secondary">
                {t.communityPage.groupsTitle}
              </h2>
              <span className="h-px flex-1 bg-brand-border" />
            </div>
            <p className="mt-3 text-sm text-brand-text-secondary">{t.communityPage.groupsDescription}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {groups.map((channel) => (
              <article key={channel.logo} className="flex min-w-0 flex-col items-center rounded-2xl border border-brand-border bg-brand-bg-secondary px-6 py-7 text-center shadow-soft sm:px-8">
                <div className={`mb-4 flex h-20 w-20 items-center justify-center rounded-full ${channel.logoBackground}`}>
                  <img src={`/media/community/logos/${channel.logo}.svg`} alt="" aria-hidden="true" className="h-12 w-12" width={48} height={48} />
                </div>
                {/* Frame the unchanged source image around the QR code, including its quiet zone. */}
                <div className="relative aspect-square w-full max-w-[264px] overflow-hidden rounded-lg bg-white">
                  <img
                    src={channel.src}
                    alt={`${channel.title} — ${t.communityPage.scanToJoin}`}
                    width={channel.imageWidth}
                    height={channel.imageHeight}
                    className="absolute h-auto max-w-none"
                    style={{
                      width: `${(channel.imageWidth / channel.qrCrop.size) * 100}%`,
                      left: `${(-channel.qrCrop.left / channel.qrCrop.size) * 100}%`,
                      top: `${(-channel.qrCrop.top / channel.qrCrop.size) * 100}%`,
                    }}
                  />
                </div>
                <h3 className="mt-5 font-sans text-2xl font-semibold text-brand-text">{channel.title}</h3>
                <p className="mt-2 text-base text-brand-text-secondary">{t.communityPage.scanToJoin}</p>
                <p className="mt-6 w-full border-t border-brand-border/70 pt-4 text-xs leading-6 text-brand-text-secondary sm:text-sm">
                  {channel.validity}
                </p>
              </article>
            ))}
          </div>
        </section>
        <p className="mx-auto mt-10 flex max-w-lg items-center justify-center gap-3 text-center text-xs leading-6 text-brand-text-tertiary sm:text-sm">
          <span aria-hidden="true" className="h-px w-5 shrink-0 bg-brand-border" />
          {t.communityPage.tagline}
          <span aria-hidden="true" className="h-px w-5 shrink-0 bg-brand-border" />
        </p>
      </div>
    </div>
  );
}
