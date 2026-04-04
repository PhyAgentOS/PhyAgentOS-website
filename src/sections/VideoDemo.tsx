import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Pause } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function VideoDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(contentRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="video-demo"
      className="relative py-24 lg:py-32 bg-brand-bg-light overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-dark opacity-10" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-6xl mx-auto">
          <div ref={contentRef}>
            {/* Header */}
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 bg-brand-accent/10 text-brand-accent text-xs font-mono uppercase tracking-wider rounded mb-4">
                Live Demo
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-brand-text-dark mb-4">
                See It In Action
              </h2>
              <p className="text-lg text-brand-text-dark/50 max-w-2xl mx-auto">
                Watch PhyAgentOS orchestrate embodied AI agents in real-time
              </p>
            </div>

            {/* Video Container */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/50">
              {/* Video */}
              <video
                ref={videoRef}
                src="/PhyAgentOS-website/demo.webm"
                className="w-full h-auto aspect-video"
                autoPlay
                loop
                muted
                playsInline
              />

              {/* Play/Pause Overlay */}
              <button
                onClick={togglePlay}
                className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 group-hover:scale-110 transition-transform" />
                ) : (
                  <Play className="w-6 h-6 ml-0.5 group-hover:scale-110 transition-transform" />
                )}
              </button>

              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-brand-accent/30 rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-brand-accent/30 rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-brand-accent/30 rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-brand-accent/30 rounded-br-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
