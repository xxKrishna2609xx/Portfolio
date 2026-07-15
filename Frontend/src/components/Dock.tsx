import React, { useState } from 'react';
import { Home, User, Cpu, FolderGit, History, Trophy, Mail, FileText } from 'lucide-react';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface DockProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Dock: React.FC<DockProps> = ({ onNavigate, activeSection }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const dockItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'projects', label: 'Projects', icon: FolderGit },
    { id: 'experience', label: 'Experience', icon: History },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'github', label: 'GitHub', icon: GithubIcon },
    { id: 'contact', label: 'Contact', icon: Mail },

  ];

  const getScale = (idx: number) => {
    if (hoveredIdx === null) return 1;
    const distance = Math.abs(idx - hoveredIdx);
    if (distance === 0) return 1.35;
    if (distance === 1) return 1.15;
    return 1;
  };

  const getTranslateY = (idx: number) => {
    if (hoveredIdx === null) return 0;
    const distance = Math.abs(idx - hoveredIdx);
    if (distance === 0) return -10;
    if (distance === 1) return -5;
    return 0;
  };

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 pointer-events-auto select-none">
      <div 
        className="glass-panel px-4 py-2.5 rounded-2xl flex items-end gap-3.5 border border-white/8 shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-300"
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {dockItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const scale = getScale(idx);
          const translateY = getTranslateY(idx);

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => setHoveredIdx(idx)}
              className="relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 focus:outline-none group interactive"
              style={{
                transform: `scale(${scale}) translateY(${translateY}px)`,
                transformOrigin: 'bottom center',
              }}
              title={item.label}
            >
              {/* Active state indicator glow dot */}
              {isActive && (
                <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-brand-cyan shadow-[0_0_8px_rgba(6,182,212,1)]" />
              )}

              <Icon
                className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-250 ${
                  isActive ? 'text-brand-cyan' : 'text-slate-400 group-hover:text-white'
                }`}
              />

              {/* Holographic Tooltip */}
              <span className="absolute bottom-14 scale-0 group-hover:scale-100 transition-all duration-150 origin-bottom px-2 py-1 rounded bg-slate-950/90 border border-brand-cyan/20 text-[9px] font-mono-tech uppercase tracking-wider text-brand-cyan backdrop-blur-md pointer-events-none whitespace-nowrap shadow-[0_4px_12px_rgba(6,182,212,0.15)]">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Separator bar */}
        <div className="w-[1px] h-7 bg-white/10 self-center" />

        {/* Resume Button Option */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            alert("Downloading Krishna Goyal's Resume...");
          }}
          className="relative flex flex-col items-center justify-center p-2 rounded-xl text-slate-400 hover:text-brand-green transition-transform duration-200 focus:outline-none group interactive"
          onMouseEnter={() => setHoveredIdx(dockItems.length + 1)}
          style={{
            transform: hoveredIdx === dockItems.length + 1 ? 'scale(1.35) translateY(-10px)' : 'scale(1) translateY(0px)',
            transformOrigin: 'bottom center',
          }}
        >
          <FileText className="w-5 h-5 md:w-6 md:h-6" />
          <span className="absolute bottom-14 scale-0 group-hover:scale-100 transition-all duration-150 origin-bottom px-2 py-1 rounded bg-slate-950/90 border border-brand-green/20 text-[9px] font-mono-tech uppercase tracking-wider text-brand-green backdrop-blur-md pointer-events-none whitespace-nowrap shadow-[0_4px_12px_rgba(34,197,94,0.15)]">
            Resume
          </span>
        </a>
      </div>
    </div>
  );
};
