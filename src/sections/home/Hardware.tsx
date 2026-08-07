import { useState } from 'react';
import { Bot, ChevronLeft, ChevronRight } from 'lucide-react';
import TiltCard from '../../components/animations/TiltCard';
import SectionHeader from '../../components/layout/SectionHeader';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useT } from '../../i18n/LanguageContext';

type AccessTag = 'real' | 'mujoco' | 'isaac' | 'pending';

const devices: {
  name: string;
  typeKey: string;
  image: string;
  access: AccessTag[];
  specs: string[];
}[] = [
  { name: 'AgileX PIPER', typeKey: 'Desktop Arm', image: '/piper.png', access: ['real', 'mujoco', 'isaac'], specs: ['6-DoF', 'ROS2', 'ReKep/SAM3'] },
  { name: 'SO101', typeKey: 'Desktop Arm', image: '/media/hardware/so101.jpg', access: ['real', 'mujoco', 'isaac'], specs: ['Open Source', 'MuJoCo', 'Real Robot'] },
  { name: 'SO100', typeKey: 'Desktop Arm', image: '/media/hardware/so100.webp', access: ['mujoco'], specs: ['Open Source', 'MuJoCo'] },
  { name: 'RealMan RM65-B', typeKey: 'Desktop Arm', image: '/media/hardware/robotic-arm-rm65-6.webp', access: ['mujoco'], specs: ['6-DoF', 'Collaborative', 'ROS2'] },
  { name: 'BOBABOT', typeKey: 'Desktop Arm', image: '/media/hardware/bobabot.jpg', access: ['mujoco'], specs: ['Open Source', 'MuJoCo'] },
  { name: 'Elfin 5L', typeKey: 'Industrial Arm', image: '/media/hardware/elfin-5l.jpg', access: ['mujoco'], specs: ['6-DoF', 'Collaborative', 'Industrial'] },
  { name: 'Franka Emika Panda', typeKey: 'Industrial Arm', image: '/media/hardware/franka-panda.png', access: ['mujoco'], specs: ['7-DoF', 'Torque Sensing', 'Research'] },
  { name: 'Franka Research 3', typeKey: 'Industrial Arm', image: '/franka.png', access: ['mujoco'], specs: ['7-DoF', 'Torque Sensing', 'Industrial'] },
  { name: 'ViperX300', typeKey: 'Desktop Arm', image: '/media/hardware/viperx300.jpg', access: ['mujoco'], specs: ['6-DoF', 'MuJoCo'] },
  { name: 'Unitree Z1', typeKey: 'Desktop Arm', image: '/media/hardware/unitree-z1.jpeg', access: ['mujoco'], specs: ['Unitree', 'Arm', 'MuJoCo'] },
  { name: 'UR5e', typeKey: 'Industrial Arm', image: '/media/hardware/ur5e.jpeg', access: ['mujoco'], specs: ['6-DoF', 'Collaborative', 'MuJoCo'] },
  { name: 'Kinova Gen3', typeKey: 'Industrial Arm', image: '/media/hardware/kinova-gen3.jpeg', access: ['pending'], specs: ['7-DoF', 'Collaborative', 'Pending'] },
  { name: 'Dobot Nova 2', typeKey: 'Desktop Arm', image: '/dobot.png', access: ['pending'], specs: ['4-DoF', 'Collaborative', 'Pending'] },
  { name: 'Unitree Go2', typeKey: 'Quadruped', image: '/go2.png', access: ['real', 'mujoco'], specs: ['12 Motors', 'LiDAR', 'Navigation'] },
  { name: 'Unitree Go1', typeKey: 'Quadruped', image: '/media/hardware/unitree-go1.png', access: ['mujoco'], specs: ['Quadruped', 'MuJoCo'] },
  { name: 'Unitree A1', typeKey: 'Quadruped', image: '/media/hardware/unitree-a1.jpeg', access: ['mujoco'], specs: ['Quadruped', 'MuJoCo'] },
  { name: 'Unitree A2', typeKey: 'Quadruped', image: '/media/hardware/unitree-a2.jpeg', access: ['mujoco'], specs: ['Quadruped', 'MuJoCo'] },
  { name: 'Unitree AS2', typeKey: 'Quadruped', image: '/media/hardware/unitree-as2.jpeg', access: ['mujoco'], specs: ['Quadruped', 'MuJoCo'] },
  { name: 'Unitree B1', typeKey: 'Quadruped', image: '/media/hardware/unitree-b1.webp', access: ['mujoco'], specs: ['Quadruped', 'MuJoCo'] },
  { name: 'Unitree B2', typeKey: 'Quadruped', image: '/media/hardware/unitree-b2.webp', access: ['mujoco'], specs: ['Quadruped', 'MuJoCo'] },
  { name: 'Unitree AlienGo', typeKey: 'Quadruped', image: '/media/hardware/unitree-aliengo.jpeg', access: ['mujoco'], specs: ['Quadruped', 'MuJoCo'] },
  { name: 'Unitree G1', typeKey: 'Bipedal Humanoid', image: '/media/hardware/unitree-g1.webp', access: ['real', 'mujoco'], specs: ['Humanoid', 'MuJoCo', 'Real Robot'] },
  { name: 'Fourier GR-3', typeKey: 'Bipedal Humanoid', image: '/media/hardware/fourier-gr3.jpg', access: ['real', 'mujoco'], specs: ['Humanoid', 'MuJoCo', 'Real Robot'] },
  { name: 'Unitree R1', typeKey: 'Bipedal Humanoid', image: '/media/hardware/unitree-r1.webp', access: ['mujoco'], specs: ['Humanoid', 'MuJoCo'] },
  { name: 'Unitree H1', typeKey: 'Bipedal Humanoid', image: '/media/hardware/unitree-h1.jpeg', access: ['mujoco'], specs: ['Humanoid', 'MuJoCo'] },
  { name: 'Unitree H1-2', typeKey: 'Bipedal Humanoid', image: '/media/hardware/unitree-h1-2.jpeg', access: ['mujoco'], specs: ['Humanoid', 'MuJoCo'] },
  { name: 'Unitree H2', typeKey: 'Bipedal Humanoid', image: '/media/hardware/unitree-h2.jpeg', access: ['mujoco'], specs: ['Humanoid', 'MuJoCo'] },
  { name: 'Unitree H2-PLUS', typeKey: 'Bipedal Humanoid', image: '/media/hardware/unitree-h2-plus.png', access: ['mujoco'], specs: ['Humanoid', 'MuJoCo'] },
  { name: 'Unitree R1-A5', typeKey: 'Bipedal Humanoid', image: '/media/hardware/unitree-r1-a5.jpeg', access: ['mujoco'], specs: ['Humanoid', 'MuJoCo'] },
  { name: 'Unitree G1-D', typeKey: 'Wheeled Humanoid', image: '/media/hardware/unitree-g1-d.webp', access: ['mujoco'], specs: ['Wheeled', 'MuJoCo'] },
  { name: 'Astra Pro', typeKey: 'Wheeled Humanoid', image: '/media/hardware/astra-pro.png', access: ['real', 'mujoco'], specs: ['Wheeled', 'MuJoCo', 'Real Robot'] },
  { name: 'Zerith H1 PRO', typeKey: 'Wheeled Humanoid', image: '/media/hardware/zerith-h1-pro.png', access: ['real', 'mujoco'], specs: ['Wheeled', 'MuJoCo', 'Real Robot'] },
  { name: 'Lekiwi', typeKey: 'Wheeled', image: '/media/hardware/lekiwi.jpg', access: ['real', 'mujoco'], specs: ['Mobile', 'MuJoCo', 'Real Robot'] },
  { name: 'XLeRobot', typeKey: 'Wheeled', image: '/XLeRobot.png', access: ['real', 'mujoco'], specs: ['Mobile', 'Bimanual', 'Real Robot'] },
  { name: 'Aloha', typeKey: 'Wheeled', image: '/media/hardware/aloha.avif', access: ['mujoco'], specs: ['Mobile', 'Bimanual', 'MuJoCo'] },
  { name: 'Stella Gaia Hand 20', typeKey: 'Dexterous Hand', image: '/media/hardware/stella-gaia-hand-20.png', access: ['real', 'mujoco'], specs: ['20-DoF', 'Dexterous', 'Real Robot'] },
];

export default function Hardware() {
  const t = useT();

  const accessConfig: Record<AccessTag, { color: string; bgColor: string; borderColor: string; label: string }> = {
    real: { color: 'text-emerald-600', bgColor: 'bg-emerald-500/10', borderColor: 'border-emerald-500/25', label: t.hardware.statusReal },
    mujoco: { color: 'text-sky-600', bgColor: 'bg-sky-500/10', borderColor: 'border-sky-500/25', label: t.hardware.statusMujoco },
    isaac: { color: 'text-violet-600', bgColor: 'bg-violet-500/10', borderColor: 'border-violet-500/25', label: t.hardware.statusIsaac },
    pending: { color: 'text-amber-600', bgColor: 'bg-amber-500/10', borderColor: 'border-amber-500/25', label: t.hardware.statusPending },
  };

  const filterKeys = ['All', 'Arm', 'Quadruped', 'Humanoid', 'Wheeled', 'Hand'];
  const devicesWithType = devices.map((d, idx) => ({
    ...d,
    type: t.hardware.items[idx]?.type ?? d.typeKey,
    description: t.hardware.items[idx]?.description ?? '',
  }));
  const [activeIndex, setActiveIndex] = useState(0);
  const [filter, setFilter] = useState(t.hardware.filters[0]);

  const filterKey = filterKeys[t.hardware.filters.indexOf(filter)] || 'All';
  const filteredDevices = filterKey === 'All'
    ? devicesWithType
    : devicesWithType.filter((d) => d.typeKey.includes(filterKey));

  const activeDevice = filteredDevices[activeIndex] || filteredDevices[0];

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setActiveIndex(0);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % filteredDevices.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + filteredDevices.length) % filteredDevices.length);
  };

  return (
    <section id="hardware" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.02]" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-accent/[0.03] rounded-full blur-[150px]" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionHeader
              label={t.hardware.label}
              title={t.hardware.title}
              highlight={t.hardware.highlight}
              description={t.hardware.description}
            />
          </ScrollReveal>

          {/* Filter */}
          <ScrollReveal delay={0.1}>
            <div className="mt-12 flex justify-center gap-2 flex-wrap">
              {t.hardware.filters.map((option) => (
                <button
                  key={option}
                  onClick={() => handleFilterChange(option)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    filter === option
                      ? 'bg-brand-accent text-white shadow-glow-soft'
                      : 'bg-brand-bg-secondary text-brand-text-tertiary border border-brand-border hover:text-brand-text hover:border-brand-accent/30 hover:shadow-soft'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Device Showcase */}
          <ScrollReveal delay={0.2}>
            <div className="mt-12 grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Image */}
              <div className="relative">
                <TiltCard className="relative aspect-square max-w-md mx-auto rounded-3xl bg-gradient-to-br from-brand-bg-secondary to-brand-bg-tertiary border border-brand-border p-10 flex items-center justify-center shadow-card" tiltAmount={4}>
                  <div className="absolute inset-0 bg-brand-accent/[0.03] blur-2xl rounded-3xl" />
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-transparent rounded-3xl" />
                  {activeDevice.image ? (
                    <img
                      src={activeDevice.image}
                      alt={activeDevice.name}
                      className="relative z-10 w-full h-full object-contain transition-all duration-500 drop-shadow-xl"
                    />
                  ) : (
                    <div className="relative z-10 flex flex-col items-center justify-center gap-3 text-brand-text-tertiary">
                      <div className="w-20 h-20 rounded-2xl border border-dashed border-brand-border flex items-center justify-center bg-brand-text/[0.02]">
                        <Bot className="w-9 h-9 opacity-50" />
                      </div>
                      <p className="text-sm font-medium">{t.hardware.imagePending}</p>
                    </div>
                  )}
                </TiltCard>

                {/* Navigation */}
                <div className="flex justify-center gap-3 mt-8">
                  <button
                    onClick={prevSlide}
                    className="w-11 h-11 rounded-2xl bg-brand-bg-secondary border border-brand-border flex items-center justify-center text-brand-text-secondary hover:text-brand-text hover:border-brand-accent/30 hover:shadow-soft transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-11 h-11 rounded-2xl bg-brand-bg-secondary border border-brand-border flex items-center justify-center text-brand-text-secondary hover:text-brand-text hover:border-brand-accent/30 hover:shadow-soft transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Right: Info */}
              <div className="space-y-6">
                {/* Access tags */}
                <div className="flex flex-wrap gap-2">
                  {activeDevice.access.map((tag) => {
                    const cfg = accessConfig[tag];
                    return (
                      <div
                        key={tag}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${cfg.bgColor} border ${cfg.borderColor}`}
                      >
                        <span className={`text-sm font-mono font-medium ${cfg.color}`}>{cfg.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Name */}
                <div>
                  <p className="text-sm font-mono text-brand-text-tertiary uppercase tracking-wider mb-2">
                    {activeDevice.type}
                  </p>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-brand-text leading-tight">
                    {activeDevice.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-base text-brand-text-secondary leading-relaxed">
                  {activeDevice.description}
                </p>

                {/* Specs */}
                <div className="flex flex-wrap gap-2">
                  {activeDevice.specs.map((spec) => (
                    <span
                      key={spec}
                      className="px-4 py-2 rounded-xl bg-brand-text/[0.03] border border-brand-border text-xs text-brand-text-tertiary font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Device list */}
                <div className="pt-6 border-t border-brand-border">
                  <p className="text-xs font-mono text-brand-text-tertiary uppercase tracking-wider mb-4">
                    {filteredDevices.length} Devices
                  </p>
                  <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
                    {filteredDevices.map((device, index) => (
                      <button
                        key={device.name}
                        onClick={() => setActiveIndex(index)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                          index === activeIndex
                            ? 'bg-brand-accent text-white shadow-glow-soft'
                            : 'bg-brand-bg-secondary text-brand-text-tertiary border border-brand-border hover:text-brand-text hover:shadow-soft'
                        }`}
                      >
                        {device.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
