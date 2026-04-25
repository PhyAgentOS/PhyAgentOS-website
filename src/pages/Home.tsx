import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from '../sections/Hero';
import HackathonBanner from '../sections/HackathonBanner';
import Demo from '../sections/Demo';
import Features from '../sections/Features';
import Architecture from '../sections/Architecture';
import VideoDemo from '../sections/VideoDemo';
import Stats from '../sections/Stats';
import Devices from '../sections/Devices';
import Testimonials from '../sections/Testimonials';
import Docs from '../sections/Docs';
import CTA from '../sections/CTA';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Handle reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.globalTimeline.timeScale(0);
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div>
      <Hero />
      <HackathonBanner />
      <Demo />
      <Features />
      <Architecture />
      <VideoDemo />
      <Stats />
      <Devices />
      <Testimonials />
      <Docs />
      <CTA />
    </div>
  );
}
