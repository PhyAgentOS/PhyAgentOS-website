import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from '../sections/home/Hero';
import InterviewFeature from '../sections/home/InterviewFeature';
import ProblemSolution from '../sections/home/ProblemSolution';
import CoreConcepts from '../sections/home/CoreConcepts';
import Architecture from '../sections/home/Architecture';
import Scenarios from '../sections/home/Scenarios';
import LiveDemo from '../sections/home/LiveDemo';
import Benchmark from '../sections/home/Benchmark';
import TeamPreview from '../sections/home/TeamPreview';
import DocsCTA from '../sections/home/DocsCTA';

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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>
      <Hero />
      <div className="section-divider" />
      <InterviewFeature />
      <div className="section-divider" />
      <ProblemSolution />
      <div className="section-divider" />
      <CoreConcepts />
      <div className="section-divider" />
      <Architecture />
      <div className="section-divider" />
      <Scenarios />
      <div className="section-divider" />
      <LiveDemo />
      <div className="section-divider" />
      <Benchmark />
      <div className="section-divider" />
      <DocsCTA />
      <div className="section-divider" />
      <TeamPreview />
    </div>
  );
}
