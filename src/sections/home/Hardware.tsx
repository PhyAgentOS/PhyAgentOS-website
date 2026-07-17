import { useState } from 'react';
import { Check, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import TiltCard from '../../components/animations/TiltCard';
import SectionHeader from '../../components/layout/SectionHeader';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useT } from '../../i18n/LanguageContext';

export default function Hardware() {
  const t = useT();
const devices = [
  { name: 'AgileX PIPER', typeKey: 'Desktop Arm', image: '/piper.png', status: 'verified' as const, specs: ['6-DoF', 'ROS2', 'ReKep/SAM3'] },
  { name: 'Dobot Nova 2', typeKey: 'Desktop Arm', image: '/dobot.png', status: 'verified' as const, specs: ['4-DoF', 'Collaborative', 'ReKep'] },
  { name: 'Unitree Go2', typeKey: 'Quadruped', image: '/go2.png', status: 'verified' as const, specs: ['12 Motors', 'LiDAR', 'Navigation'] },
  { name: 'Franka Research 3', typeKey: 'Industrial Arm', image: '/franka.png', status: 'verified' as const, specs: ['7-DoF', 'Torque Sensing', 'Industrial'] },
  { name: 'XLeRobot', typeKey: 'Dual Arm', image: '/XLeRobot.png', status: 'verified' as const, specs: ['Dual Arm', 'Bimanual', 'ROS2'] },
  { name: 'SO101', typeKey: 'Desktop Arm', image: '/media/hardware/so101.jpg', status: 'verified' as const, specs: ['Real Robot', 'MuJoCo', 'Verified'] },
  { name: 'Lekiwi', typeKey: 'Wheeled', image: '/media/hardware/lekiwi.jpg', status: 'verified' as const, specs: ['Real Robot', 'MuJoCo', 'Verified'] },
  { name: 'Astra Pro', typeKey: 'Humanoid', image: '/media/hardware/astra-pro.png', status: 'verified' as const, specs: ['Real Robot', 'MuJoCo', 'Verified'] },
  { name: 'Fourier GR-3', typeKey: 'Bipedal Humanoid', image: '/media/hardware/fourier-gr3.jpg', status: 'partial' as const, specs: ['Humanoid', 'MuJoCo', 'Real Robot'] },
  { name: 'Zerith H1 PRO', typeKey: 'Humanoid', image: '/media/hardware/zerith-h1-pro.png', status: 'verified' as const, specs: ['Real Robot', 'MuJoCo', 'Verified'] },
  { name: 'LIBERO', typeKey: 'Simulation', image: '/media/hardware/libero.png', status: 'verified' as const, specs: ['MuJoCo', 'Benchmark', 'Policy Eval'] },
  { name: 'CALVIN', typeKey: 'Simulation', image: '/media/hardware/calvin.png', status: 'verified' as const, specs: ['PyBullet', 'ABC→D', 'Long-Horizon'] },
  { name: 'RoboCasa365', typeKey: 'Simulation', image: '/media/hardware/robocasa365.jpg', status: 'verified' as const, specs: ['MuJoCo', 'target50', '250 Episodes'] },
];
const statusConfig = {
  verified: { icon: Check, color: 'text-emerald-600', bgColor: 'bg-emerald-500/10', borderColor: 'border-emerald-500/25', label: t.hardware.statusVerified },
  partial: { icon: Clock, color: 'text-amber-600', bgColor: 'bg-amber-500/10', borderColor: 'border-amber-500/25', label: t.hardware.statusInProgress },
};
const filterKeys = ['All', 'Arm', 'Quadruped', 'Humanoid', 'Wheeled', 'Simulation'];
const devicesWithType = devices.map((d, idx) => ({
  ...d,
  type: t.hardware.items[idx].type,
  description: t.hardware.items[idx].description,
}));
  const [activeIndex, setActiveIndex] = useState(0);
  const [filter, setFilter] = useState(t.hardware.filters[0]);

  

  const filterKey = filterKeys[t.hardware.filters.indexOf(filter)] || 'All';
  const filteredDevices = filterKey === 'All'
    ? devicesWithType
    : devicesWithType.filter((d) => d.typeKey.includes(filterKey));

  const activeDevice = filteredDevices[activeIndex] || filteredDevices[0];
  const status = statusConfig[activeDevice.status];
  const StatusIcon = status.icon;

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
            <div className="mt-12 flex justify-center gap-2">
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
                  <img
                    src={activeDevice.image}
                    alt={activeDevice.name}
                    className="relative z-10 w-full h-full object-contain transition-all duration-500 drop-shadow-xl"
                  />
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
                {/* Status */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${status.bgColor} border ${status.borderColor}`}>
                  <StatusIcon className={`w-4 h-4 ${status.color}`} />
                  <span className={`text-sm font-mono font-medium ${status.color}`}>{status.label}</span>
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
                  <div className="flex flex-wrap gap-2">
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

          {/* Device Support Matrix */}
          <ScrollReveal delay={0.3}>
            <div className="mt-24">
              <div className="text-center mb-10">
                <h3 className="text-2xl font-display font-bold text-brand-text mb-3">
                  {t.hardware.deviceTable.title}
                </h3>
                <p className="text-brand-text-secondary max-w-2xl mx-auto">
                  {t.hardware.deviceTable.description}
                </p>
              </div>
              <div className="overflow-x-auto rounded-3xl border border-brand-border bg-brand-bg-secondary shadow-card">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-brand-border bg-brand-text/[0.03]">
                      <th className="px-4 py-3 text-left font-semibold text-brand-text">{t.hardware.deviceTable.columns.vendor}</th>
                      <th className="px-4 py-3 text-left font-semibold text-brand-text">{t.hardware.deviceTable.columns.model}</th>
                      <th className="px-4 py-3 text-left font-semibold text-brand-text">{t.hardware.deviceTable.columns.type}</th>
                      <th className="px-4 py-3 text-center font-semibold text-brand-text">{t.hardware.deviceTable.columns.real}</th>
                      <th className="px-4 py-3 text-center font-semibold text-brand-text">{t.hardware.deviceTable.columns.sim}</th>
                      <th className="px-4 py-3 text-center font-semibold text-brand-text">{t.hardware.deviceTable.columns.tested}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.hardware.deviceTable.rows.map((row, index) => (
                      <tr key={index} className="border-b border-brand-border last:border-b-0 hover:bg-brand-text/[0.02]">
                        <td className="px-4 py-3 text-brand-text-secondary whitespace-nowrap">{row.vendor || '-'}</td>
                        <td className="px-4 py-3 text-brand-text font-medium whitespace-nowrap">{row.model}</td>
                        <td className="px-4 py-3 text-brand-text-secondary whitespace-nowrap">{row.type}</td>
                        <td className="px-4 py-3 text-center">{row.real ? '✅' : '❌'}</td>
                        <td className="px-4 py-3 text-center">{row.sim ? '✅' : '❌'}</td>
                        <td className="px-4 py-3 text-center">{row.tested ? '✅' : '❌'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
