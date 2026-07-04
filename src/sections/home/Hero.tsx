import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import gsap from 'gsap';
import { useT } from '../../i18n/LanguageContext';
import ParticleField from '../../components/three/ParticleField';
import { useMousePosition } from '../../hooks/useMousePosition';

export default function Hero() {
  const t = useT();
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const mousePosition = useMousePosition();

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      const children = contentRef.current?.querySelectorAll('.hero-animate');

      if (children) {
        tl.fromTo(
          children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.12,
            ease: 'power3.out',
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Three.js Particle Background */}
      {isLoaded && (
        <ParticleField
          mousePosition={{
            x: mousePosition.normalizedX,
            y: mousePosition.normalizedY,
          }}
          className="z-0"
        />
      )}

      {/* Radial glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-brand-accent/[0.04] rounded-full blur-[150px] z-[1]" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-brand-accent/[0.04] rounded-full blur-[120px] z-[1]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-warning/10 rounded-full blur-[120px] z-[1]" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-[0.025] z-[2]" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full px-6 sm:px-8 lg:px-16 xl:px-24 pt-24"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Label */}
          <div className="hero-animate inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-bg-secondary border border-brand-accent/20 shadow-glow-soft mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-accent" />
            </span>
            <span className="text-sm font-semibold text-brand-accent-light">
              {t.hero.label}
            </span>
          </div>

          {/* Title */}
          <h1 className="hero-animate text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-[1.05] mb-7">
            {t.hero.titleLine1}
            <br />
            <span className="text-gradient">{t.hero.titleLine2}</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-animate text-lg sm:text-xl md:text-2xl text-brand-text-secondary max-w-2xl mx-auto mb-5 leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* Description */}
          <p className="hero-animate text-sm sm:text-base text-brand-text-tertiary max-w-xl mx-auto mb-12 leading-relaxed">
            {t.hero.description}
          </p>

          {/* CTA Buttons */}
          <div className="hero-animate flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/PhyAgentOS/PhyAgentOS"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-brand-accent hover:bg-brand-accent-light text-brand-text-on-accent font-semibold rounded-2xl transition-all duration-300 flex items-center gap-2 shadow-glow-soft hover:shadow-glow"
            >
              {t.hero.getStarted}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#demo"
              className="group px-8 py-4 glass text-brand-text font-semibold rounded-2xl transition-all duration-300 flex items-center gap-2 hover:bg-brand-bg-secondary hover:shadow-soft"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-accent/10 mr-1">
                <Play className="w-3 h-3 text-brand-accent fill-brand-accent" />
              </span>
              {t.hero.watchDemo}
            </a>
          </div>

          {/* Stats preview */}
          <div className="hero-animate mt-16 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-6 mx-auto">
            {[
              { value: '6+', label: t.hero.statTargets },
              { value: 'MIT', label: t.hero.statOpenSource },
              { value: 'v0.1.6', label: t.hero.statRelease },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex min-h-[112px] flex-col items-center justify-center rounded-lg border border-brand-border/50 bg-brand-bg-secondary/70 px-6 py-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-brand-accent/25 hover:bg-brand-bg-secondary/85 sm:min-h-[128px] sm:px-7 lg:min-h-[140px] lg:px-8"
              >
                <div className="font-display text-4xl font-bold leading-none text-brand-text sm:text-5xl lg:text-6xl">
                  {stat.value}
                </div>
                <div className="mt-3 text-sm font-medium leading-tight text-brand-text-tertiary sm:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
