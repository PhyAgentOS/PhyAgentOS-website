import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Film, MessageSquareText, Play } from 'lucide-react';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useLang } from '../../i18n/LanguageContext';

const films = [
  {
    id: 'concept-film-20260922',
    src: '/media/demos/concept-film-20260922.mp4',
    poster: '/media/demos/concept-film-20260922.jpg',
    duration: '01:44',
  },
  {
    id: 'concept-film',
    src: '/media/demos/concept-film.mp4',
    poster: '/media/demos/concept-film.jpg',
    duration: '03:37',
  },
];

export default function InterviewFeature() {
  const { lang } = useLang();
  const [activeId, setActiveId] = useState(films[0].id);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState({ previous: false, next: false });
  const copy = lang === 'zh'
    ? {
        label: '概念短片',
        title: '从会话到行动',
        highlight: '理解 PhyAgentOS',
        playlist: '概念短片播放列表',
        hint: '左右滑动浏览，点击切换短片',
        selected: '当前播放',
        previous: '向左浏览概念短片',
        next: '向右浏览概念短片',
        films: [
          {
            title: '从会话到行动：让 AI 真正走进物理世界',
            eyebrow: 'CONCEPT FILM · 全新短片',
            description: '了解 PhyAgentOS 如何通过统一的 Harness，连接模型、技能与不同机器人，让 Physical Agent 能够执行、验证、恢复，并在真实交互中持续进化。',
          },
          {
            title: '三个机器人，如何协作调制一杯六级 pH 彩虹？',
            eyebrow: 'CONCEPT FILM · 经典案例',
            description: '三个机器人根据自然语言指令协同完成实验，在异常发生后自主分析、重新规划并继续执行，最终完成验收，将成功经验沉淀为可复用的长期记忆。',
          },
        ],
      }
    : {
        label: 'Concept Film',
        title: 'From sessions to action',
        highlight: 'inside PhyAgentOS',
        playlist: 'Concept film playlist',
        hint: 'Swipe to browse, select a film to watch',
        selected: 'Now playing',
        previous: 'Browse previous concept films',
        next: 'Browse next concept films',
        films: [
          {
            title: 'From Sessions to Action: Bringing AI into the Physical World',
            eyebrow: 'CONCEPT FILM · New Film',
            description: 'Discover how PhyAgentOS connects models, skills, and different robots through a unified Harness, enabling Physical Agents to execute, verify, recover, and continuously evolve through real-world interaction.',
          },
          {
            title: 'How Do Three Robots Work Together to Mix a Six-Level pH Rainbow?',
            eyebrow: 'CONCEPT FILM · Classic Case',
            description: 'Three robots follow natural-language instructions to carry out an experiment together. When an anomaly occurs, they independently analyze it, replan, and continue execution, ultimately passing verification and storing successful experience as reusable long-term memory.',
          },
        ],
      };
  const playlist = films.map((film, index) => ({ ...film, ...copy.films[index] }));
  const activeFilm = playlist.find((film) => film.id === activeId) ?? playlist[0];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateScrollControls = () => {
      setCanScroll({
        previous: track.scrollLeft > 1,
        next: track.scrollLeft + track.clientWidth < track.scrollWidth - 1,
      });
    };
    const observer = new ResizeObserver(updateScrollControls);
    observer.observe(track);
    track.addEventListener('scroll', updateScrollControls, { passive: true });

    return () => {
      observer.disconnect();
      track.removeEventListener('scroll', updateScrollControls);
    };
  }, []);

  const scrollFilms = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollBy({
      left: direction * track.clientWidth * 0.84,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  return (
    <section id="interview" className="relative overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 bg-brand-bg" />
      <div className="absolute inset-0 bg-grid opacity-[0.02]" />
      <div className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-brand-accent/[0.035] blur-[180px]" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mb-10 max-w-4xl">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-4 py-2 text-xs font-mono font-semibold uppercase tracking-[0.18em] text-brand-accent-light">
                  <MessageSquareText className="h-4 w-4" />
                  {copy.label}
                </div>
                <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-brand-text sm:text-5xl lg:text-6xl">
                  {copy.title}
                  <span className="block text-gradient">{copy.highlight}</span>
                </h2>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="relative overflow-hidden rounded-3xl border border-brand-border bg-black shadow-2xl">
              <video
                key={activeFilm.id}
                id="concept-film-player"
                aria-label={activeFilm.title}
                className="aspect-video w-full object-contain"
                src={activeFilm.src}
                poster={activeFilm.poster}
                controls
                autoPlay
                muted
                preload="auto"
                playsInline
              />
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-brand-text-secondary">{copy.playlist}</h3>
                  <p className="mt-1 text-xs font-mono tracking-wide text-brand-text-tertiary">{copy.hint}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => scrollFilms(-1)}
                    disabled={!canScroll.previous}
                    aria-label={copy.previous}
                    aria-controls="concept-film-playlist"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-border bg-brand-bg-secondary text-brand-text-secondary shadow-soft transition-all enabled:hover:-translate-y-0.5 enabled:hover:border-brand-accent/30 enabled:hover:text-brand-accent disabled:cursor-default disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollFilms(1)}
                    disabled={!canScroll.next}
                    aria-label={copy.next}
                    aria-controls="concept-film-playlist"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-border bg-brand-bg-secondary text-brand-text-secondary shadow-soft transition-all enabled:hover:-translate-y-0.5 enabled:hover:border-brand-accent/30 enabled:hover:text-brand-accent disabled:cursor-default disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div
                ref={trackRef}
                id="concept-film-playlist"
                role="group"
                aria-label={copy.playlist}
                className="demo-carousel flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4"
              >
                {playlist.map((film) => {
                  const active = film.id === activeFilm.id;
                  return (
                    <button
                      key={film.id}
                      type="button"
                      onClick={() => setActiveId(film.id)}
                      aria-pressed={active}
                      aria-controls="concept-film-player"
                      className={`group relative flex w-[84%] flex-none snap-start flex-col gap-3 rounded-2xl border p-3 text-left transition-all duration-300 sm:w-[48%] lg:w-[32%] xl:w-[24%] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-accent ${
                        active
                          ? 'border-brand-accent/35 bg-brand-accent/10 shadow-glow-soft'
                          : 'border-brand-border bg-brand-bg-secondary hover:border-brand-accent/30 hover:shadow-soft'
                      }`}
                    >
                      <div className="relative w-full overflow-hidden rounded-xl bg-black">
                        <img
                          src={film.poster}
                          alt=""
                          loading="lazy"
                          className="aspect-video w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <span className="absolute bottom-2 left-2 rounded-full bg-black/65 px-2 py-0.5 text-[11px] font-mono text-white/85">
                          {film.duration}
                        </span>
                        {active ? (
                          <span className="absolute right-2 top-2 rounded-full bg-black/65 px-2 py-1 text-[11px] font-medium text-white">
                            {copy.selected}
                          </span>
                        ) : (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white transition-transform group-hover:scale-110">
                              <Play className="ml-0.5 h-4 w-4" aria-hidden="true" />
                            </span>
                          </span>
                        )}
                      </div>
                      <div className="min-w-0 w-full py-1">
                        <div className="flex items-center gap-2 text-brand-text-tertiary">
                          <Film className="h-4 w-4 shrink-0" aria-hidden="true" />
                          <p className="truncate text-xs font-mono uppercase tracking-[0.14em]">{film.eyebrow}</p>
                        </div>
                        <h4 className={`mt-2 font-display text-lg font-bold leading-tight ${active ? 'text-brand-text' : 'text-brand-text-secondary'}`}>
                          {film.title}
                        </h4>
                        <p className="mt-1 text-sm leading-6 text-brand-text-tertiary">{film.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
