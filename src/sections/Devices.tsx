import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const devices = [
  {
    name: 'AgileX PIPER',
    type: 'Desktop Arm',
    image: '/PhyAgentOS-website/piper.png',
    status: 'verified',
    description: 'Full pipeline verified with ReKep & SAM3',
  },
  {
    name: 'Dobot Nova 2',
    type: 'Desktop Arm',
    image: '/PhyAgentOS-website/dobot.png',
    status: 'verified',
    description: 'ReKep deployment verified',
  },
  {
    name: 'Unitree Go2',
    type: 'Quadruped',
    image: '/PhyAgentOS-website/go2.png',
    status: 'partial',
    description: 'Mobile and semantic navigation supported',
  },
  {
    name: 'Franka Research 3',
    type: 'Industrial Arm',
    image: '/PhyAgentOS-website/franka.png',
    status: 'untested',
    description: 'Driver protocol integration in progress',
  },
  {
    name: 'XLeRobot',
    type: 'Dual Arm',
    image: '/PhyAgentOS-website/XLeRobot.png',
    status: 'partial',
    description: 'Dual-arm operation protocol supported',
  },
  {
    name: 'SparkBot',
    type: 'IoT Device',
    image: '/PhyAgentOS-website/sparkbot.png',
    status: 'partial',
    description: 'Voice dialogue interaction supported',
  },
];

const statusConfig = {
  verified: {
    icon: Check,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10',
    borderColor: 'border-emerald-400/30',
    label: 'Verified',
  },
  partial: {
    icon: Clock,
    color: 'text-amber-400',
    bgColor: 'bg-amber-400/10',
    borderColor: 'border-amber-400/30',
    label: 'Partial',
  },
  untested: {
    icon: Clock,
    color: 'text-gray-400',
    bgColor: 'bg-gray-400/10',
    borderColor: 'border-gray-400/30',
    label: 'In Progress',
  },
};

export default function Devices() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(contentRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
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

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % devices.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + devices.length) % devices.length);
  };

  const activeDevice = devices[activeIndex];
  const status = statusConfig[activeDevice.status as keyof typeof statusConfig];
  const StatusIcon = status.icon;

  return (
    <section 
      ref={sectionRef}
      id="devices"
      className="relative py-24 lg:py-32 bg-brand-bg-light overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-dark opacity-10" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <div ref={contentRef}>
            {/* Header */}
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 bg-brand-accent/10 text-brand-accent text-xs font-mono uppercase tracking-wider rounded mb-4">
                Hardware
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-brand-text-dark mb-4">
                Supported Devices
              </h2>
              <p className="text-lg text-brand-text-dark/50 max-w-2xl mx-auto">
                Through HAL (Hardware Abstraction Layer) protocol, PhyAgentOS supports multiple embodiment types
              </p>
            </div>

            {/* Device Showcase */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Device Image */}
              <div className="relative">
                <div className="relative aspect-square max-w-md mx-auto bg-white rounded-xl border border-brand-border-light shadow-lg p-8">
                  {/* Glow */}
                  <div className="absolute inset-0 bg-brand-accent/5 blur-2xl rounded-xl" />
                  
                  {/* Image */}
                  <img 
                    src={activeDevice.image}
                    alt={activeDevice.name}
                    className="relative z-10 w-full h-full object-contain transition-all duration-500"
                  />
                </div>

                {/* Navigation */}
                <div className="flex justify-center gap-4 mt-6">
                  <button
                    onClick={prevSlide}
                    className="w-10 h-10 rounded-lg bg-white border border-brand-border-light flex items-center justify-center text-brand-text-dark hover:border-brand-accent hover:text-brand-accent transition-colors shadow-sm"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-10 h-10 rounded-lg bg-white border border-brand-border-light flex items-center justify-center text-brand-text-dark hover:border-brand-accent hover:text-brand-accent transition-colors shadow-sm"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Right: Device Info */}
              <div className="space-y-6">
                {/* Status badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${status.bgColor} border ${status.borderColor}`}>
                  <StatusIcon className={`w-4 h-4 ${status.color}`} />
                  <span className={`text-sm font-mono ${status.color}`}>{status.label}</span>
                </div>

                {/* Device name */}
                <div>
                  <p className="text-sm font-mono text-brand-text-dark/40 uppercase tracking-wider mb-2">
                    {activeDevice.type}
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-display font-bold text-brand-text-dark">
                    {activeDevice.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-lg text-brand-text-dark/60">
                  {activeDevice.description}
                </p>

                {/* Device list */}
                <div className="pt-6 border-t border-brand-border-light">
                  <p className="text-sm font-mono text-brand-text-dark/40 mb-4">All Devices</p>
                  <div className="flex flex-wrap gap-2">
                    {devices.map((device, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          index === activeIndex
                            ? 'bg-brand-accent text-white'
                            : 'bg-white text-brand-text-dark/60 hover:text-brand-text-dark border border-brand-border-light'
                        }`}
                      >
                        {device.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
