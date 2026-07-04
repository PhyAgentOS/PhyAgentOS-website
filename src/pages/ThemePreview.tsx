import { useEffect } from 'react';
import { themes } from '../themes/theme-config';
import { applyThemeToDOM } from '../themes/ThemeContext';
import { useTheme } from '../themes/ThemeContext';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Sparkles, Eye, Palette, Layers, Zap } from 'lucide-react';

function MiniHero({ theme }: { theme: typeof themes[0] }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-8 mb-6"
      style={{
        background: `linear-gradient(135deg, ${theme.colors.bgSecondary} 0%, ${theme.colors.bgTertiary} 100%)`,
        border: `1px solid ${theme.colors.border}`,
      }}
    >
      <div
        className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[60px] opacity-30"
        style={{ background: theme.colors.accent }}
      />
      <div className="relative z-10">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider mb-4"
          style={{
            background: `${theme.colors.accent}20`,
            color: theme.colors.accent,
            border: `1px solid ${theme.colors.accent}40`,
          }}
        >
          <Sparkles className="w-3 h-3" />
          {theme.name}
        </div>
        <h3
          className="text-2xl font-display font-bold mb-2"
          style={{ color: theme.colors.text }}
        >
          Self-Evolving Physical Agent Operating System
        </h3>
          <p className="text-sm mb-4 max-w-md"
          style={{ color: theme.colors.textSecondary }}
        >
          PhyAgentOS - A unified, transparent, and auditable runtime foundation for physical agents
        </p>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium"
            style={{ background: theme.colors.accent, color: theme.colors.textOnAccent ?? '#fff' }}
          >
            Get Started
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium"
            style={{
              background: `${theme.colors.accent}15`,
              color: theme.colors.accent,
              border: `1px solid ${theme.colors.accent}30`,
            }}
          >
            View Demo
          </button>
        </div>
      </div>
    </div>
  );
}

function MiniCards({ theme }: { theme: typeof themes[0] }) {
  const cards = [
    { icon: Eye, title: 'State-as-a-File', desc: 'Markdown protocol' },
    { icon: Layers, title: 'Dual-Track', desc: 'Cognitive + Physical' },
    { icon: Zap, title: 'Self-Evolving', desc: 'Auto-learning' },
    { icon: Palette, title: 'Cross-Embodiment', desc: 'Zero-code migration' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={i}
            className="p-4 rounded-xl"
            style={{
              background: theme.colors.bgTertiary,
              border: `1px solid ${theme.colors.border}`,
            }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
              style={{
                background: `${theme.colors.accent}15`,
              }}
            >
              <Icon className="w-4 h-4" style={{ color: theme.colors.accent }} />
            </div>
            <p className="text-sm font-medium" style={{ color: theme.colors.text }}>
              {card.title}
            </p>
            <p className="text-xs" style={{ color: theme.colors.textTertiary }}>
              {card.desc}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function ThemeCard({
  theme,
  isActive,
  onSelect,
}: {
  theme: typeof themes[0];
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className={`relative rounded-3xl overflow-hidden transition-all duration-500 ${
        isActive ? 'ring-2 scale-[1.02]' : 'hover:scale-[1.01]'
      }`}
      style={{
        background: theme.colors.bg,
        border: `1px solid ${isActive ? theme.colors.accent + '60' : theme.colors.border}`,
        outline: isActive ? `2px solid ${theme.colors.accent}` : 'none',
        outlineOffset: '-2px',
      }}
    >
      {/* Active badge */}
      {isActive && (
        <div
          className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            background: theme.colors.accent,
            color: '#fff',
          }}
        >
          <Check className="w-3 h-3" />
          Current
        </div>
      )}

      {/* Preview area */}
      <div className="p-6">
        <MiniHero theme={theme} />
        <MiniCards theme={theme} />
      </div>

      {/* Info bar */}
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{
          background: theme.colors.bgSecondary,
          borderTop: `1px solid ${theme.colors.border}`,
        }}
      >
        <div>
          <h3 className="text-lg font-display font-bold" style={{ color: theme.colors.text }}>
            {theme.name}
          </h3>
          <p className="text-xs mt-0.5" style={{ color: theme.colors.textTertiary }}>
            {theme.description}
          </p>
        </div>
        <button
          onClick={onSelect}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
          style={{
            background: isActive ? theme.colors.accent + '20' : theme.colors.accent,
            color: isActive ? theme.colors.accent : '#fff',
            border: isActive ? `1px solid ${theme.colors.accent}40` : 'none',
          }}
        >
          {isActive ? 'Applied' : 'Apply'}
          {!isActive && <ArrowRight className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}

export default function ThemePreview() {
  const { currentTheme, setTheme, allThemes } = useTheme();

  useEffect(() => {
    // Ensure current theme is applied when page loads
    applyThemeToDOM(currentTheme);
  }, [currentTheme]);

  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20" style={{ background: currentTheme.colors.bg }}>
      <div className="px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider mb-6"
              style={{
                background: `${currentTheme.colors.accent}15`,
                color: currentTheme.colors.accent,
                border: `1px solid ${currentTheme.colors.accent}30`,
              }}
            >
              <Palette className="w-3.5 h-3.5" />
              Theme Gallery
            </div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-4"
              style={{ color: currentTheme.colors.text }}
            >
              Choose your <span style={{ color: currentTheme.colors.accent }}>style</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: currentTheme.colors.textSecondary }}>
              Preview the available design directions for the PhyAgentOS website.
              Click "Apply" to see the full site in that theme.
            </p>
          </div>

          {/* Theme Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {allThemes.map((theme) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                isActive={currentTheme.id === theme.id}
                onSelect={() => setTheme(theme.id)}
              />
            ))}
          </div>

          {/* Back to home */}
          <div className="mt-16 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300"
              style={{
                background: currentTheme.colors.accent,
                color: '#fff',
              }}
            >
              View Full Website
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
