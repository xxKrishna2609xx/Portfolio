import React, { useState, useEffect, useRef } from 'react';
import { Search, Compass, Terminal, ShieldAlert, Check } from 'lucide-react';
import { LINKS } from '../config';

interface CommandPaletteProps {
  onNavigate: (sectionId: string) => void;
  onThemeChange: (theme: 'cyberpunk' | 'minimal' | 'indigo' | 'cyan' | 'purple') => void;
  currentTheme: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onNavigate, onThemeChange, currentTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const commands = [
    { id: 'nav-hero', label: 'System: Go to Home Workspace', category: 'Navigation', action: () => onNavigate('hero') },
    { id: 'nav-about', label: 'System: Go to About Specs Dashboard', category: 'Navigation', action: () => onNavigate('about') },
    { id: 'nav-skills', label: 'System: Go to Skills HUD Matrix', category: 'Navigation', action: () => onNavigate('skills') },
    { id: 'nav-projects', label: 'System: Go to Project Repositories', category: 'Navigation', action: () => onNavigate('projects') },
    { id: 'nav-experience', label: 'System: Go to Work Experience Logs', category: 'Navigation', action: () => onNavigate('experience') },
    { id: 'nav-achievements', label: 'System: Go to Achievements Counter', category: 'Navigation', action: () => onNavigate('achievements') },
    { id: 'nav-github', label: 'System: Go to Terminal CLI Interface', category: 'Navigation', action: () => onNavigate('github') },
    { id: 'nav-contact', label: 'System: Go to Contact Cockpit', category: 'Navigation', action: () => onNavigate('contact') },
    { id: 'theme-cyan', label: 'UI Theme: Set Cyan Neon OS (Default)', category: 'Themes', action: () => onThemeChange('cyan') },
    { id: 'theme-indigo', label: 'UI Theme: Set Indigo Neon OS', category: 'Themes', action: () => onThemeChange('indigo') },
    { id: 'theme-cyberpunk', label: 'UI Theme: Set Cyberpunk Core OS', category: 'Themes', action: () => onThemeChange('cyberpunk') },
    { id: 'theme-minimal', label: 'UI Theme: Set Minimal Slate OS', category: 'Themes', action: () => onThemeChange('minimal') },
    { id: 'action-resume', label: 'System Utility: Download PDF Resume', category: 'System Actions', action: () => alert("Downloading Krishna Goyal's Resume...") },
    { id: 'action-github', label: 'System Link: Launch GitHub Profile', category: 'System Actions', action: () => window.open(LINKS.github, '_blank') },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        setSearch('');
        setSelectedIdx(0);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredCommands.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx(prev => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIdx]) {
        filteredCommands[selectedIdx].action();
        setIsOpen(false);
      }
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed top-4 right-4 z-40 hidden md:block select-none pointer-events-auto">
        <button
          onClick={() => setIsOpen(true)}
          className="glass-panel px-3 py-1.5 rounded-lg border border-white/5 hover:border-brand-cyan/25 text-xs font-mono-tech text-slate-400 hover:text-white flex items-center gap-2.5 transition-all duration-200 interactive"
        >
          <span>OS Console</span>
          <kbd className="bg-slate-900 border border-white/10 px-1.5 py-0.5 rounded text-[10px] text-brand-cyan font-bold tracking-wider">
            CTRL + K
          </kbd>
        </button>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-[999] flex items-start justify-center pt-[15vh] px-4 select-none pointer-events-auto"
      onClick={() => setIsOpen(false)}
    >
      {/* Dark blur backdrop */}
      <div className="absolute inset-0 bg-[#050816]/75 backdrop-blur-md" />

      {/* Command Palette container */}
      <div
        ref={containerRef}
        onClick={e => e.stopPropagation()}
        className="glass-panel-heavy w-full max-w-2xl rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-brand-cyan/20 z-10 crt-effect"
        onKeyDown={handleKeyDown}
      >
        {/* Input Header */}
        <div className="flex items-center gap-3 px-4.5 py-4 border-b border-white/5 bg-slate-950/20">
          <Search className="w-5 h-5 text-brand-cyan animate-pulse" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search system logs, commands, directory shortcuts..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setSelectedIdx(0);
            }}
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500 font-mono-tech text-sm tracking-wide"
          />
          <span className="text-[9px] font-mono-tech uppercase bg-slate-900 border border-white/10 px-2 py-0.5 rounded text-slate-500 select-none">
            ESC to close
          </span>
        </div>

        {/* Command list */}
        <div className="max-h-[320px] overflow-y-auto py-2">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIdx;
              const isThemeCmd = cmd.category === 'Themes';
              const themeName = cmd.id.replace('theme-', '');
              const isThemeActive = isThemeCmd && currentTheme === themeName;

              return (
                <div
                  key={cmd.id}
                  onClick={() => {
                    cmd.action();
                    setIsOpen(false);
                  }}
                  onMouseEnter={() => setSelectedIdx(idx)}
                  className={`flex items-center justify-between px-5 py-3.5 cursor-pointer transition-all duration-150 border-l-2 ${
                    isSelected 
                      ? 'bg-gradient-to-r from-brand-cyan/15 to-transparent border-brand-cyan text-white shadow-[inset_1px_0_0_rgba(6,182,212,0.1)]' 
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    {cmd.category === 'Navigation' && <Compass className={`w-4 h-4 ${isSelected ? 'text-brand-cyan' : 'text-slate-500'}`} />}
                    {cmd.category === 'Themes' && <Terminal className={`w-4 h-4 ${isSelected ? 'text-brand-purple' : 'text-slate-500'}`} />}
                    {cmd.category === 'System Actions' && <ShieldAlert className={`w-4 h-4 ${isSelected ? 'text-brand-green' : 'text-slate-500'}`} />}
                    <span className="text-xs font-mono-tech tracking-wide">{cmd.label}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {isThemeActive && <Check className="w-3.5 h-3.5 text-brand-green" />}
                    <span className={`text-[8px] font-mono-tech uppercase tracking-widest px-2 py-0.5 rounded border border-white/5 bg-slate-900 ${
                      isSelected ? 'text-brand-cyan border-brand-cyan/15' : 'text-slate-600'
                    }`}>
                      {cmd.category}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="px-5 py-8 text-center text-slate-500 font-mono-tech text-xs">
              No matching system commands found in OS indexes.
            </div>
          )}
        </div>

        {/* Console status footer */}
        <div className="bg-slate-950/45 px-5 py-2.5 border-t border-white/5 flex items-center justify-between text-[9px] font-mono-tech text-slate-500 tracking-wider">
          <div className="flex gap-4">
            <span>[UP/DN ARROWS] navigate</span>
            <span>[ENTER] execute</span>
          </div>
          <span>KRISHNA_OS_V1.0</span>
        </div>
      </div>
    </div>
  );
};
