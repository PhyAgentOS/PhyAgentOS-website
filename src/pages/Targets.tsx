import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/layout/SectionHeader';
import {
  ArrowLeft,
  Bot,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import ScrollReveal from '../components/animations/ScrollReveal';
import { useLang } from '../i18n/LanguageContext';

type AccessTag = 'real' | 'mujoco' | 'isaac' | 'pending';

interface HardwareDevice {
  name: string;
  typeKey: string;
  image: string;
  access: AccessTag[];
  specs: string[];
}

const hardwareDevices: HardwareDevice[] = [
  { name: 'AgileX PIPER', typeKey: 'Desktop Arm', image: '/piper.png', access: ['real', 'mujoco', 'isaac'], specs: ['6-DoF', 'ROS2', 'ReKep/SAM3'] },
  { name: 'SO101', typeKey: 'Desktop Arm', image: '/media/hardware/so101.jpg', access: ['real', 'mujoco', 'isaac'], specs: ['Open Source', 'MuJoCo', 'Real Robot'] },
  { name: 'SO100', typeKey: 'Desktop Arm', image: '/media/hardware/so100.webp', access: ['mujoco'], specs: ['Open Source', 'MuJoCo'] },
  { name: 'RealMan RM65-B', typeKey: 'Desktop Arm', image: '/media/hardware/robotic-arm-rm65-6.webp', access: ['mujoco'], specs: ['6-DoF', 'Collaborative', 'ROS2'] },
  { name: 'BOBABOT', typeKey: 'Desktop Arm', image: '/media/hardware/bobabot.png', access: ['mujoco'], specs: ['Open Source', 'MuJoCo'] },
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
  { name: 'Unitree R1-A5', typeKey: 'Wheeled', image: '/media/hardware/unitree-r1-a5.jpeg', access: ['mujoco'], specs: ['Wheeled', 'MuJoCo'] },
  { name: 'Unitree G1-D', typeKey: 'Wheeled', image: '/media/hardware/unitree-g1-d.webp', access: ['mujoco'], specs: ['Wheeled', 'MuJoCo'] },
  { name: 'Astra Pro', typeKey: 'Wheeled', image: '/media/hardware/astra-pro.png', access: ['real', 'mujoco'], specs: ['Wheeled', 'MuJoCo', 'Real Robot'] },
  { name: 'Zerith H1 PRO', typeKey: 'Wheeled', image: '/media/hardware/zerith-h1-pro.png', access: ['real', 'mujoco'], specs: ['Wheeled', 'MuJoCo', 'Real Robot'] },
  { name: 'Lekiwi', typeKey: 'Wheeled', image: '/media/hardware/lekiwi.jpg', access: ['real', 'mujoco'], specs: ['Mobile', 'MuJoCo', 'Real Robot'] },
  { name: 'XLeRobot', typeKey: 'Wheeled', image: '/XLeRobot.png', access: ['real', 'mujoco'], specs: ['Mobile', 'Bimanual', 'Real Robot'] },
  { name: 'Aloha', typeKey: 'Desktop Arm', image: '/media/hardware/aloha.avif', access: ['mujoco'], specs: ['Mobile', 'Bimanual', 'MuJoCo'] },
  { name: 'Stella Gaia Hand 20', typeKey: 'Dexterous Hand', image: '/media/hardware/stella-gaia-hand-20.png', access: ['real', 'mujoco'], specs: ['20-DoF', 'Dexterous', 'Real Robot'] },
];


const filterKeys = ['All', 'Arm', 'Quadruped', 'Humanoid', 'Wheeled', 'Hand'];
const accessFilters: (AccessTag | 'all')[] = ['all', 'real', 'mujoco', 'isaac'];
const officialDeviceNames = new Set(['AgileX PIPER', 'RealMan RM65-B', 'XLeRobot']);

const vendorOverrides: Record<string, string> = {
  'AgileX PIPER': 'AgileX',
  SO101: 'Hugging Face',
  SO100: 'Hugging Face',
  'RealMan RM65-B': 'RealMan',
  BOBABOT: 'BOBABOT',
  'Elfin 5L': 'Han\'s Robot',
  'Franka Emika Panda': 'Franka',
  'Franka Research 3': 'Franka',
  ViperX300: 'Interbotix',
  'Unitree Z1': 'Unitree',
  UR5e: 'Universal Robots',
  'Kinova Gen3': 'Kinova',
  'Dobot Nova 2': 'Dobot',
  'Unitree Go2': 'Unitree',
  'Unitree Go1': 'Unitree',
  'Unitree A1': 'Unitree',
  'Unitree A2': 'Unitree',
  'Unitree AS2': 'Unitree',
  'Unitree B1': 'Unitree',
  'Unitree B2': 'Unitree',
  'Unitree AlienGo': 'Unitree',
  'Unitree G1': 'Unitree',
  'Fourier GR-3': 'Fourier',
  'Unitree R1': 'Unitree',
  'Unitree H1': 'Unitree',
  'Unitree H1-2': 'Unitree',
  'Unitree H2': 'Unitree',
  'Unitree H2-PLUS': 'Unitree',
  'Unitree R1-A5': 'Unitree',
  'Unitree G1-D': 'Unitree',
  'Astra Pro': 'Huibo',
  'Zerith H1 PRO': 'Zerith',
  Lekiwi: 'Lekiwi',
  XLeRobot: 'XLeRobot',
  Aloha: 'Trossen Robotics',
  'Stella Gaia Hand 20': 'Stella',
};

export default function Targets() {
  const { lang, t } = useLang();
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState(0);
  const [accessFilter, setAccessFilter] = useState<AccessTag | 'all'>('all');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const copy = lang === 'zh'
    ? {
        backLabel: '返回首页',
        label: '硬件目录',
        title: '持续扩展的',
        highlight: '机器人构型',
        description: '通过统一的 Target Adapter，将物理机器人与仿真模型以同一套 Session 协议连接。',
        search: '搜索品牌或设备型号',
        targetTypes: '构型',
        environments: '验证环境',
        allBrands: '全部品牌',
        showing: '显示',
        devices: '个设备',
        models: '设备型号',
        types: '构型类别',
        verifiedEnvironments: '验证环境',
        availableSkills: '可用技能',
        details: '查看适配详情',
        official: '官方维护',
        community: '社区适配',
        evaluating: '评估中',
        reset: '清空筛选',
        accessLabels: {
          all: '全部',
          real: '真机',
          mujoco: 'MuJoCo',
          isaac: 'Isaac',
          pending: '等待接入',
        },
      }
    : {
        backLabel: 'Back to home',
        label: 'Hardware Catalog',
        title: 'An expanding collection of',
        highlight: 'robot targets',
        description: 'Target Adapter connects physical robots and simulation models through the same Session protocol.',
        search: 'Search brand or device model',
        targetTypes: 'Target Type',
        environments: 'Verified Environment',
        allBrands: 'All brands',
        showing: 'Showing',
        devices: 'devices',
        models: 'device models',
        types: 'target types',
        verifiedEnvironments: 'verified environments',
        availableSkills: 'available skills',
        details: 'View adapter details',
        official: 'Official',
        community: 'Community',
        evaluating: 'Evaluating',
        reset: 'Reset filters',
        accessLabels: {
          all: 'All',
          real: 'Real',
          mujoco: 'MuJoCo',
          isaac: 'Isaac',
          pending: 'Pending',
        },
      };

  const accessConfig: Record<AccessTag, { className: string; label: string }> = {
    real: { className: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-700', label: copy.accessLabels.real },
    mujoco: { className: 'border-sky-500/25 bg-sky-500/10 text-sky-700', label: copy.accessLabels.mujoco },
    isaac: { className: 'border-violet-500/25 bg-violet-500/10 text-violet-700', label: copy.accessLabels.isaac },
    pending: { className: 'border-amber-500/25 bg-amber-500/10 text-amber-700', label: copy.accessLabels.pending },
  };

  const devices = hardwareDevices.map((device, index) => ({
    ...device,
    vendor: vendorOverrides[device.name] ?? device.name.split(' ')[0],
    type: t.hardware.items[index]?.type ?? device.typeKey,
    description: t.hardware.items[index]?.description ?? '',
    skillCount: Math.max(4, Math.min(8, device.specs.length + device.access.length + (index % 3))),
  }));

  const filteredDevices = (() => {
    const normalizedQuery = query.trim().toLowerCase();
    const key = filterKeys[typeFilter] ?? 'All';

    return devices.filter((device) => {
      const matchesQuery = !normalizedQuery
        || device.name.toLowerCase().includes(normalizedQuery)
        || device.vendor.toLowerCase().includes(normalizedQuery);
      const matchesType = key === 'All' || device.typeKey.includes(key);
      const matchesAccess = accessFilter === 'all' || device.access.includes(accessFilter);

      return matchesQuery && matchesType && matchesAccess;
    });
  })();

  const verifiedEnvironmentCount = accessFilters.length - 1;
  const statusFor = (device: HardwareDevice) => {
    if (device.access.includes('pending')) return copy.evaluating;
    if (officialDeviceNames.has(device.name)) return copy.official;
    return copy.community;
  };

  return (
    <div className="min-h-screen pt-24 lg:pt-32">
      <div className="px-6 pb-24 sm:px-8 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-brand-text-tertiary transition-colors hover:text-brand-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              {copy.backLabel}
            </Link>

            <SectionHeader
              label={copy.label}
              title={copy.title}
              highlight={copy.highlight}
              description={copy.description}
              align="left"
            />

          </ScrollReveal>

          <ScrollReveal delay={0.1}>
          <div className="relative mt-6">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-text-tertiary" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copy.search}
                className="h-14 w-full rounded-2xl border border-brand-border bg-brand-bg-secondary pl-12 pr-4 text-sm text-brand-text outline-none transition-all placeholder:text-brand-text-tertiary focus:border-brand-accent/40 focus:shadow-glow-soft"
              />
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { value: hardwareDevices.length, label: copy.models },
                { value: filterKeys.length - 1, label: copy.types },
                { value: verifiedEnvironmentCount, label: copy.verifiedEnvironments },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg border border-brand-border bg-brand-bg-secondary/80 px-6 py-4 shadow-soft">
                  <div className="font-display text-3xl font-bold text-brand-text">{stat.value}</div>
                  <div className="mt-1 text-sm font-medium text-brand-text-tertiary">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="mt-8 rounded-2xl border border-brand-border bg-brand-bg-secondary/80 p-4 shadow-soft">
              <div className="grid gap-5 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
                <div>
                  <div className="mb-3 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-text-tertiary">
                    <SlidersHorizontal className="h-4 w-4" />
                    {copy.targetTypes}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {filterKeys.map((key, index) => (
                      <button
                        key={key}
                        onClick={() => setTypeFilter(index)}
                        className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                          typeFilter === index
                            ? 'bg-brand-accent text-white shadow-glow-soft'
                            : 'border border-brand-border bg-brand-text/[0.03] text-brand-text-tertiary hover:border-brand-accent/30 hover:text-brand-text'
                        }`}
                      >
                        {index === 0 ? copy.accessLabels.all : (lang === 'zh' ? ['机械臂', '四足', '人形', '轮式', '灵巧手'][index - 1] : key)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3 text-xs font-mono uppercase tracking-wider text-brand-text-tertiary">
                    {copy.environments}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {accessFilters.map((key) => (
                      <button
                        key={key}
                        onClick={() => setAccessFilter(key)}
                        className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                          accessFilter === key
                            ? 'bg-brand-accent text-white shadow-glow-soft'
                            : 'border border-brand-border bg-brand-text/[0.03] text-brand-text-tertiary hover:border-brand-accent/30 hover:text-brand-text'
                        }`}
                      >
                        {copy.accessLabels[key]}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setQuery('');
                    setTypeFilter(0);
                    setAccessFilter('all');
                  }}
                  className="rounded-xl border border-brand-border bg-brand-bg px-4 py-2 text-sm font-medium text-brand-text-tertiary transition-all hover:border-brand-accent/30 hover:text-brand-text"
                >
                  {copy.reset}
                </button>
              </div>

              <div className="mt-5 border-t border-brand-border pt-4 text-sm text-brand-text-tertiary">
                {copy.showing} <span className="font-semibold text-brand-text">{filteredDevices.length}</span> {copy.devices}
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredDevices.map((device, index) => (
            <ScrollReveal key={device.name} delay={Math.min(index * 0.035, 0.28)}>
              <article className="group relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-2xl border border-brand-border bg-brand-bg-secondary p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/25 hover:shadow-card-hover">
                
                {/* 右上角状态 */}
                <span
                  className={`absolute right-5 top-5 z-10 rounded-full px-3 py-1 text-xs font-medium ${
                    device.access.includes('pending')
                      ? 'bg-amber-500/10 text-amber-700'
                      : officialDeviceNames.has(device.name)
                        ? 'bg-sky-500/10 text-sky-700'
                        : 'bg-emerald-500/10 text-emerald-700'
                  }`}
                >
                  {statusFor(device)}
                </span>

                {/* 顶部图片区域 */}
                <div className="flex h-40 w-full items-center justify-center rounded-xl bg-brand-text/[0.03] p-5">
                  {device.image ? (
                    <img
                      src={device.image}
                      alt={device.name}
                      className="h-full max-h-32 w-full object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <Bot className="h-12 w-12 text-brand-text-tertiary" />
                  )}
                </div>

                {/* 内容区域 */}
                <div className="mt-5 flex min-w-0 flex-1 flex-col">
                  <div>
                    <p className="truncate text-xs font-medium text-brand-text-tertiary">
                      {device.vendor}
                    </p>

                    <h2 className="mt-1 break-words font-display text-lg font-bold leading-snug text-brand-text sm:text-xl">
                      {device.name}
                    </h2>
                  </div>

                  {/* 标签 */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {device.access.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full border px-2.5 py-1 text-xs font-medium ${accessConfig[tag].className}`}
                      >
                        {accessConfig[tag].label}
                      </span>
                    ))}
                  </div>

                  {/* 描述 */}
                  <p className="mt-5 flex-1 text-sm leading-6 text-brand-text-secondary">
                    {device.description}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
