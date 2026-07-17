import React, { useEffect, useState } from 'react';
import { Trophy, Award, FileCode, CheckSquare, Zap } from 'lucide-react';

interface CounterProps {
  end: number;
  suffix?: string;
}

const CountUp: React.FC<CounterProps> = ({ end, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const stepTime = Math.max(Math.floor(duration / end), 12);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / 30);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [end]);

  return <span>{count}{suffix}</span>;
};

export const StatsConsole: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('hackathons');

  const stats = [
    { label: 'PROJECTS DEPLOYED', val: Number(import.meta.env.VITE_STATS_PROJECTS_DEPLOYED) || 15, suffix: '+' },
    { label: 'REPOSITORIES RUNNING', val: Number(import.meta.env.VITE_STATS_REPOSITORIES_RUNNING) || 24, suffix: '' },
    { label: 'TOTAL COMMITS', val: Number(import.meta.env.VITE_STATS_TOTAL_COMMITS) || 500, suffix: '+' },
    { label: 'TECH STACKS', val: Number(import.meta.env.VITE_STATS_TECH_STACKS) || 18, suffix: '+' },
    { label: 'HACKATHONS SPRINTED', val: Number(import.meta.env.VITE_STATS_HACKATHONS_SPRINTED) || 5, suffix: '' },
  ];

  const categories: Record<string, { title: string; subtitle: string; desc: string; icon: any }> = {
    hackathons: {
      title: 'Hackathons',
      subtitle: '36-Hour AI Prototype Sprints',
      desc: 'Participated in multiple engineering hackathons, collaborating in high-speed developer teams to design, code, and pitch functional AI systems under intense schedules.',
      icon: Trophy,
    },
    certificates: {
      title: 'Certificates',
      subtitle: 'Verified Academic Milestones',
      desc: 'Completed specialized courses covering machine learning models, database scaling paradigms, security layers, and object-oriented algorithms.',
      icon: Award,
    },
    workshops: {
      title: 'Workshops',
      subtitle: 'Hands-on Technology Panels',
      desc: 'Attended advanced technical workshops on stateful LLM graph orchestration, server containerization, and modern frontend design principles.',
      icon: Zap,
    },
    internship: {
      title: 'Internships',
      subtitle: 'Production Backend Engineering',
      desc: 'Acquired core enterprise industry experience, building secure database queries, writing API pipelines, and reviewing server loads at Right Ads Digital.',
      icon: FileCode,
    },
    opensource: {
      title: 'Open Source',
      subtitle: 'Community Code Integrations',
      desc: 'Contributed modules, resolved issues, and optimized documentation across public codebases and scripting tools on GitHub.',
      icon: CheckSquare,
    },
  };

  const SelectedIcon = categories[activeCategory].icon;

  return (
    <section id="achievements" className="py-24 px-4 max-w-6xl mx-auto flex flex-col justify-center select-none pointer-events-auto">
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-xs font-bold tracking-[0.5em] text-brand-cyan uppercase mb-2">SYSTEM TELEMETRY DATA</h2>
        <h1 className="text-4xl md:text-5xl font-black font-orbitron tracking-wider text-white text-hologram">
          STATS & ACHIEVEMENTS
        </h1>
      </div>

      {/* Stats counter matrix */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 font-mono-tech">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-panel rounded-xl p-4 text-center border-white/5 relative overflow-hidden group">
            <span className="block text-[8px] text-slate-500 tracking-wider mb-2 uppercase">{stat.label}</span>
            <span className="block text-2xl md:text-3xl font-black text-white text-glow-indigo group-hover:text-brand-cyan transition-colors">
              <CountUp end={stat.val} suffix={stat.suffix} />
            </span>
          </div>
        ))}
      </div>

      {/* Interactive Achievements categories */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Category triggers (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-3 w-full">
          {Object.entries(categories).map(([key, data]) => {
            const isActive = activeCategory === key;
            const Icon = data.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border text-left font-mono-tech transition-all duration-200 interactive ${
                  isActive
                    ? 'bg-brand-indigo/10 border-brand-indigo text-white shadow-[0_0_12px_rgba(139,92,246,0.2)]'
                    : 'bg-slate-900/50 border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-brand-purple animate-pulse' : 'text-slate-500'}`} />
                  <span className="text-xs font-bold uppercase tracking-wider">{data.title}</span>
                </div>
                <span className="text-[8px] text-slate-600 font-medium">QUERY_SYS</span>
              </button>
            );
          })}
        </div>

        {/* HUD specs viewer (lg:col-span-7) */}
        <div className="lg:col-span-7 w-full">
          <div className="glass-panel-heavy rounded-2xl p-6 glow-border-purple relative overflow-hidden min-h-[260px] flex flex-col justify-between crt-effect font-mono-tech">
            <div>
              <div className="flex items-center gap-2.5 border-b border-white/5 pb-4 mb-5">
                <SelectedIcon className="w-5 h-5 text-brand-purple animate-pulse" />
                <div>
                  <h3 className="text-xs font-bold font-orbitron tracking-widest text-slate-500">
                    CONSOLE SPECT DETAIL
                  </h3>
                  <h2 className="text-xl font-black font-orbitron text-white mt-0.5 tracking-wide uppercase">
                    {categories[activeCategory].title}
                  </h2>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase tracking-wider mb-1.5">DATA TYPE</span>
                  <span className="text-brand-cyan text-xs font-bold bg-slate-900 border border-white/5 px-2.5 py-1.5 rounded-lg inline-block">
                    {categories[activeCategory].subtitle}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase tracking-wider mb-1.5">TELEMETRY SYNOPSIS</span>
                  <p className="text-slate-300 leading-relaxed text-xs sm:text-sm font-outfit">
                    {categories[activeCategory].desc}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-white/5 pt-4 flex items-center justify-between text-[9px] text-slate-500">
              <span>TELEMETRY SECURE AUDIT</span>
              <span>VERIFIED: TRUE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
