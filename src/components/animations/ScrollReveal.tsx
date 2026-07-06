import { useEffect, useRef, type ReactNode, type ElementType } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  scale?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
  as?: ElementType;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  y = 40,
  x = 0,
  scale = 1,
  stagger = 0.1,
  start = 'top 85%',
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const children = ref.current?.querySelectorAll('.reveal-item');
      const targets = children && children.length > 0 ? children : ref.current;

      gsap.fromTo(
        targets,
        {
          y,
          x,
          scale: scale !== 1 ? scale : undefined,
        },
        {
          y: 0,
          x: 0,
          scale: 1,
          duration,
          delay,
          stagger: children && children.length > 1 ? stagger : 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: once ? 'play none none none' : 'play none none reverse',
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, duration, y, x, scale, stagger, start, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
