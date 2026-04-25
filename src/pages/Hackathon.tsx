import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Trophy,
  Target,
  MapPin,
  RefreshCw,
  Shield,
  Plug,
  FileText,
  GitBranch,
  Puzzle,
  CheckCircle2,
  Zap,
  Video,
  MessageSquare,
  ChevronDown,
  ExternalLink,
  Github,
  Sparkles,
  BrainCircuit,
  Cpu,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ───────── Pain Points ───────── */
const painPoints = [
  {
    pain: 'LLM directly controls hardware, errors hard to trace',
    solution: 'Cognitive-Physical Decoupling — Planner and HAL run independently, communicating transparently via ACTION.md',
  },
  {
    pain: 'Action failures cannot be learned from',
    solution: 'LESSONS.md experience library for automatic accumulation, enabling true self-evolution',
  },
  {
    pain: 'Debugging like a black box',
    solution: 'Markdown Protocol Matrix — all states readable and writable, extreme transparency',
  },
  {
    pain: 'No safety guarantees',
    solution: 'Critic Multi-Agent Verification — high-risk actions must validate against EMBODIED.md before execution',
  },
];

/* ───────── Directions ───────── */
const directions = [
  {
    icon: Target,
    title: 'Precision Manipulation',
    desc: 'Semantic grasping based on SAM3 / ReKep: "Put that red tool into the second drawer on the left"',
    color: 'from-amber-500/20 to-orange-600/20',
    border: 'border-amber-500/30',
    iconColor: 'text-amber-400',
  },
  {
    icon: MapPin,
    title: 'Semantic Navigation',
    desc: 'Scene-graph grounded natural language movement: "Go to the kitchen and find the cup that\'s still steaming"',
    color: 'from-cyan-500/20 to-blue-600/20',
    border: 'border-cyan-500/30',
    iconColor: 'text-cyan-400',
  },
  {
    icon: RefreshCw,
    title: 'Long-Horizon Tasks',
    desc: 'Complex action chains: "Help me prepare a cup of coffee" (complete SOP including opening, scooping, brewing, and recycling)',
    color: 'from-emerald-500/20 to-green-600/20',
    border: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
  },
  {
    icon: Shield,
    title: 'Safety Evolution',
    desc: 'Demonstrate how the Critic mechanism intercepts dangerous actions and writes correction experiences into LESSONS.md',
    color: 'from-rose-500/20 to-red-600/20',
    border: 'border-rose-500/30',
    iconColor: 'text-rose-400',
  },
  {
    icon: Plug,
    title: 'New Hardware Integration',
    desc: 'Write a hal/drivers/ plugin for your robot, enabling one-click PhyAgentOS takeover',
    color: 'from-violet-500/20 to-purple-600/20',
    border: 'border-violet-500/30',
    iconColor: 'text-violet-400',
  },
];

/* ───────── Tech Requirements ───────── */
const techReqs = [
  { label: 'Required', text: 'Use PhyAgentOS\'s hal_watchdog.py as the hardware execution layer (Track B)', required: true },
  { label: 'Required', text: 'Communicate between cognitive and physical layers via Markdown protocol files (ENVIRONMENT.md / ACTION.md)', required: true },
  { label: 'Bonus', text: 'Implement custom HAL driver plugins to integrate officially unsupported hardware', required: false },
  { label: 'Bonus', text: 'Design reusable SKILL.md workflows to accumulate successful experiences', required: false },
  { label: 'Bonus', text: 'Demonstrate Critic safety correction mechanisms or LESSONS.md failure experience accumulation', required: false },
];

/* ───────── Evaluation Criteria ───────── */
const evalCriteria = [
  { dim: 'Demo Showcase', weight: '40%', desc: 'On-site execution of the embodied task, fluency of the full chain from natural language to physical action, and stability of the system' },
  { dim: 'Documentation', weight: '30%', desc: 'Quality and completeness of SKILL.md (successful workflow), LESSONS.md (failure experiences), and technical write-up' },
  { dim: 'Creative Explanation', weight: '30%', desc: 'Clarity of the scenario motivation, originality of the idea, and insight into how PhyAgentOS\'s decoupled architecture was leveraged' },
];

/* ───────── Support ───────── */
const supports = [
  { icon: FileText, title: 'Integration Guide', desc: 'Official HAL driver templates + plugin development docs for quick hardware integration' },
  { icon: Cpu, title: 'Simulation Support', desc: 'Built-in lightweight simulation—validate logic without hardware' },
  { icon: MessageSquare, title: 'Q&A Channel', desc: 'GitHub Issues with dedicated tags, core maintainers responding online' },
  { icon: Plug, title: 'Hardware Reference', desc: 'Verified robot parameter references (PIPER / Nova 2 / Go2, etc.)' },
];

/* ───────── Submission ───────── */
const submissions = [
  { num: '01', title: 'Code', desc: 'Fork the official repository or submit an independent repository, including complete driver plugins (if applicable)' },
  { num: '02', title: 'Demo Video', desc: '3-5 minute video demonstrating the full chain: Natural Language Instruction → Markdown Protocol → Physical Execution' },
  { num: '03', title: 'Protocol Files', desc: 'Submit your SKILL.md (successful workflow) and/or LESSONS.md (failure experiences)' },
  { num: '04', title: 'Presentation', desc: '5-minute showcase + 3-minute Q&A, focusing on how you leveraged PhyAgentOS\'s decoupled architecture' },
];

export default function Hackathon() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll('.hero-animate'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            delay: 0.2,
          }
        );
      }

      // Scroll-triggered sections
      const sections = contentRef.current?.querySelectorAll('.gsap-section');
      sections?.forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll('.gsap-item'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
            },
          }
        );
      });
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg text-white">
      {/* ───────── Hero ───────── */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20"
      >
        {/* Background effects */}
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-accent/5 rounded-full blur-[100px]" />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-brand-accent/40 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24 max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="hero-animate inline-flex items-center gap-2 px-4 py-2 bg-brand-accent/15 border border-brand-accent/30 rounded-full mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-accent" />
            </span>
            <span className="text-sm font-medium text-brand-accent-light">Open for Registration</span>
          </div>

          {/* Title */}
          <h1 className="hero-animate text-5xl sm:text-6xl lg:text-8xl font-display font-bold tracking-tight mb-6">
            <span className="text-gradient">2026 BETA</span>
            <br />
            <span className="text-white">Hackathon</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-animate text-xl sm:text-2xl text-white/70 max-w-3xl mx-auto mb-4 leading-relaxed">
            Where Intelligence Meets Physics
          </p>
          <p className="hero-animate text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            You focus on the creativity, we handle making the agent
            <span className="text-white/80"> "rememberable, correctable, and comprehensible"</span>.
          </p>

          {/* CTA Buttons */}
          <div className="hero-animate flex flex-wrap justify-center gap-4">
            <a
              href="https://www.notion.so/2026-BETA-Hackathon-34b41d54c5b8806ca0a8c05a812e49db"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-brand-accent hover:bg-brand-accent-light text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 group shadow-glow hover:shadow-glow-lg"
            >
              Register Now
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="https://github.com/PhyAgentOS/PhyAgentOS"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/15 transition-all duration-300 flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="hero-animate mt-20">
            <button
              type="button"
              onClick={() => document.getElementById('why')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-white/30 hover:text-white/60 transition-colors"
            >
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      <div ref={contentRef}>
        {/* ───────── Why PhyAgentOS ───────── */}
        <section id="why" className="gsap-section relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-accent/[0.02] to-transparent" />
          <div className="px-6 sm:px-8 lg:px-16 xl:px-24 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 gsap-item">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-xs text-white/50 mb-4">
                  <BrainCircuit className="w-3.5 h-3.5" />
                  Why PhyAgentOS?
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
                  Pain Points & Solutions
                </h2>
                <p className="text-white/50 max-w-2xl mx-auto">
                  See how PhyAgentOS fundamentally solves the hardest problems in embodied AI.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {painPoints.map((item, idx) => (
                  <div
                    key={idx}
                    className="gsap-item group relative p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 hover:border-brand-accent/30"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <span className="text-red-400 text-lg font-bold">×</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white/60 text-sm mb-3 line-through decoration-red-500/50">
                          {item.pain}
                        </p>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                          <p className="text-white/90 text-sm leading-relaxed">
                            {item.solution}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Recommended Directions ───────── */}
        <section className="gsap-section py-24 lg:py-32">
          <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 gsap-item">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-xs text-white/50 mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  Recommended Directions
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
                  Single Embodiment Tracks
                </h2>
                <p className="text-white/50 max-w-2xl mx-auto">
                  Choose a direction that excites you. Each track pushes the boundary of what embodied AI can achieve.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {directions.map((dir, idx) => {
                  const Icon = dir.icon;
                  return (
                    <div
                      key={idx}
                      className={`gsap-item group relative p-6 rounded-2xl border ${dir.border} bg-gradient-to-br ${dir.color} backdrop-blur-sm hover:scale-[1.02] transition-all duration-300`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-black/30 flex items-center justify-center mb-4 ${dir.iconColor}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {dir.title}
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed">
                        {dir.desc}
                      </p>
                    </div>
                  );
                })}

                {/* CTA Card */}
                <div className="gsap-item relative p-6 rounded-2xl border border-dashed border-white/20 flex flex-col items-center justify-center text-center hover:border-brand-accent/40 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-4">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Your Idea</h3>
                  <p className="text-sm text-white/50 mb-4">
                    Have something else in mind? We welcome all creative directions!
                  </p>
                  <a
                    href="https://www.notion.so/2026-BETA-Hackathon-34b41d54c5b8806ca0a8c05a812e49db"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-accent hover:text-brand-accent-light flex items-center gap-1 transition-colors"
                  >
                    Submit your proposal
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Technical Requirements ───────── */}
        <section className="gsap-section py-24 lg:py-32 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
          <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 gsap-item">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-xs text-white/50 mb-4">
                  <GitBranch className="w-3.5 h-3.5" />
                  Technical Requirements
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
                  Build on Solid Foundations
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 space-y-4">
                  {techReqs.map((req, idx) => (
                    <div
                      key={idx}
                      className="gsap-item flex items-start gap-4 p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                    >
                      <span
                        className={`flex-shrink-0 px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider ${
                          req.required
                            ? 'bg-brand-accent/15 text-brand-accent border border-brand-accent/20'
                            : 'bg-white/5 text-white/50 border border-white/10'
                        }`}
                      >
                        {req.label}
                      </span>
                      <p className="text-sm text-white/70 leading-relaxed">{req.text}</p>
                    </div>
                  ))}
                </div>

                <div className="lg:col-span-2 gsap-item p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center">
                      <Puzzle className="w-5 h-5 text-brand-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Architecture Overview</h3>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">
                    PhyAgentOS uses a dual-track architecture where cognitive planning and physical execution are fully decoupled.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-white/60">
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                      Track A: Cognitive Planning + Critic Verification
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <div className="w-2 h-2 rounded-full bg-brand-accent" />
                      Track B: HAL Watchdog + Physical Execution
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <div className="w-2 h-2 rounded-full bg-white/30" />
                      Protocol: Markdown Files (ACTION.md / ENVIRONMENT.md)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Evaluation Criteria ───────── */}
        <section className="gsap-section py-24 lg:py-32">
          <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 gsap-item">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-xs text-white/50 mb-4">
                  <Trophy className="w-3.5 h-3.5" />
                  Evaluation Criteria
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
                  How We Judge
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {evalCriteria.map((item, idx) => (
                  <div
                    key={idx}
                    className="gsap-item relative p-8 rounded-2xl border border-white/10 bg-white/[0.02] text-center group hover:border-brand-accent/30 transition-all duration-300"
                  >
                    <div className="text-5xl font-display font-bold text-gradient mb-4">
                      {item.weight}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {item.dim}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Participant Support ───────── */}
        <section className="gsap-section py-24 lg:py-32 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
          <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 gsap-item">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-xs text-white/50 mb-4">
                  <Zap className="w-3.5 h-3.5" />
                  Participant Support
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
                  We Got Your Back
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {supports.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="gsap-item p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-semibold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Submission Requirements ───────── */}
        <section className="gsap-section py-24 lg:py-32">
          <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 gsap-item">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-xs text-white/50 mb-4">
                  <FileText className="w-3.5 h-3.5" />
                  Submission Requirements
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
                  What to Submit
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {submissions.map((sub, idx) => (
                  <div
                    key={idx}
                    className="gsap-item relative p-6 rounded-2xl border border-white/10 bg-white/[0.02] group hover:border-brand-accent/30 transition-all duration-300"
                  >
                    <div className="text-4xl font-display font-bold text-white/10 group-hover:text-brand-accent/20 transition-colors mb-4">
                      {sub.num}
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      {sub.title === 'Code' && <Github className="w-4 h-4 text-brand-accent" />}
                      {sub.title === 'Demo Video' && <Video className="w-4 h-4 text-brand-accent" />}
                      {sub.title === 'Protocol Files' && <FileText className="w-4 h-4 text-brand-accent" />}
                      {sub.title === 'Presentation' && <MessageSquare className="w-4 h-4 text-brand-accent" />}
                      <h3 className="text-base font-semibold text-white">{sub.title}</h3>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {sub.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───────── CTA ───────── */}
        <section className="gsap-section relative py-32 lg:py-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-brand-accent/10 via-transparent to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[150px]" />

          <div className="px-6 sm:px-8 lg:px-16 xl:px-24 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="gsap-item">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
                  Ready to Hack the
                  <br />
                  <span className="text-gradient">Physical World?</span>
                </h2>
                <p className="text-lg text-white/50 mb-10 max-w-2xl mx-auto">
                  Join the 2026 BETA Hackathon and build the future of embodied AI with PhyAgentOS. Looking forward to seeing the sparks fly when your embodiment meets PhyAgentOS! ⭐
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="https://www.notion.so/2026-BETA-Hackathon-34b41d54c5b8806ca0a8c05a812e49db"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-10 py-4 bg-brand-accent hover:bg-brand-accent-light text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 group shadow-glow hover:shadow-glow-lg"
                  >
                    Join Hackathon
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="https://github.com/PhyAgentOS/PhyAgentOS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-10 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/15 transition-all duration-300 flex items-center gap-2"
                  >
                    <Github className="w-5 h-5" />
                    Explore Repo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
