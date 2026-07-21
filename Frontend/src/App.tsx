import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CustomCursor } from './components/CustomCursor';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { BootScreen } from './components/BootScreen';
import { CommandPalette } from './components/CommandPalette';
import { AIAssistant } from './components/AIAssistant';
import { Dock } from './components/Dock';

import { SystemInfo } from './components/sections/SystemInfo';
import { SkillsMatrix } from './components/sections/SkillsMatrix';
import { ProjectModules } from './components/sections/ProjectModules';
import { ExperienceLog } from './components/sections/ExperienceLog';
import { StatsConsole } from './components/sections/StatsConsole';
import { GitHubDashboard } from './components/sections/GitHubDashboard';
import { CommandCenter } from './components/sections/CommandCenter';

const queryClient = new QueryClient();

export default function App() {
  const [booting, setBooting] = useState(true);
  const [theme, setTheme] = useState<'cyan' | 'indigo' | 'cyberpunk' | 'minimal'>('cyan');
  const [activeSection, setActiveSection] = useState('hero');

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    if (booting) return;

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    const raf = (time: number) => {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
    };
  }, [booting]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (booting) return;

    const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'achievements', 'github', 'contact'];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.25 } // Trigger when 25% visible
      );

      observer.observe(el);
      return { el, observer };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [booting]);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleThemeChange = (newTheme: 'cyan' | 'indigo' | 'cyberpunk' | 'minimal' | 'purple') => {
    if (newTheme === 'purple') {
      setTheme('cyberpunk');
    } else {
      setTheme(newTheme);
    }
  };

  if (booting) {
    return <BootScreen onComplete={() => setBooting(false)} />;
  }

  // Get active text accents for the theme
  const getThemeTextClass = () => {
    switch (theme) {
      case 'cyberpunk':
        return 'text-brand-purple';
      case 'minimal':
        return 'text-slate-400';
      case 'indigo':
        return 'text-brand-indigo';
      case 'cyan':
      default:
        return 'text-brand-cyan';
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`relative min-h-screen text-slate-200 overflow-x-hidden ${theme}`}>
        {/* Visual Overlay Scanline and Noise Filters */}
        <div className="scanlines" />
        <div className="noise-overlay" />
        
        {/* Background canvas container */}
        <BackgroundCanvas theme={theme} />

        {/* Floating Utilities */}
        <CustomCursor />
        <CommandPalette 
          onNavigate={handleNavigate} 
          onThemeChange={handleThemeChange} 
          currentTheme={theme} 
        />
        <AIAssistant />
        <Dock onNavigate={handleNavigate} activeSection={activeSection} />

        {/* Core Workspaces Panels */}
        <main className="pb-32">
          {/* HERO SECTION */}
          <section
            id="hero"
            className="min-h-screen flex flex-col justify-center px-4 relative max-w-6xl mx-auto select-none pointer-events-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-16">
              {/* Title Column */}
              <div className="lg:col-span-7 text-left space-y-6">
                <div className="space-y-2">
                  <span className={`text-[10px] sm:text-xs font-mono-tech uppercase font-bold tracking-[0.4em] ${getThemeTextClass()} block`}>
                    KRISHNA_OS v1.0.0 HOST_INITIALIZED
                  </span>
                  <h1 className="text-5xl sm:text-6xl md:text-7xl font-black font-orbitron tracking-wider text-white text-hologram leading-none">
                    KRISHNA GOYAL
                  </h1>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 text-xs sm:text-sm font-mono-tech text-slate-400">
                    <span className="bg-slate-900 border border-white/5 px-3 py-1.5 rounded-lg">Backend Developer</span>
                    <span className="bg-slate-900 border border-white/5 px-3 py-1.5 rounded-lg">AI Engineer</span>
                    <span className="bg-slate-900 border border-white/5 px-3 py-1.5 rounded-lg">Flutter Developer</span>
                  </div>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg font-outfit">
                    Building Intelligent Software That Solves Real Problems. Specializing in high-throughput API systems, LLM graph pipelines, and native cross-platform UI directories.
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3.5 pt-4">
                  <button
                    onClick={() => handleNavigate('projects')}
                    className="bg-brand-cyan hover:bg-brand-cyan/85 text-black font-mono-tech font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-xl transition-all duration-250 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_22px_rgba(6,182,212,0.45)] interactive focus:outline-none border border-brand-cyan"
                  >
                    Explore My Work
                  </button>
                  <button
                    onClick={() => handleNavigate('contact')}
                    className="bg-slate-900/60 border border-white/10 hover:border-brand-cyan/35 text-white font-mono-tech font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-xl transition-all duration-250 interactive focus:outline-none"
                  >
                    Contact Me
                  </button>
                  <button
                    onClick={() => window.open('https://www.dropbox.com/scl/fi/hw8coll690s2u3h6dxuqm/Krishna-Goyal-CV-GLA.pdf?rlkey=uxqzh6hc6d1j33zmdlbubh7xv&st=3smhtw8w&dl=0', '_blank')}
                    className="bg-slate-900/40 border border-white/5 hover:border-brand-green/25 text-slate-400 hover:text-brand-green font-mono-tech font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-xl transition-all duration-250 interactive focus:outline-none"
                  >
                    Download Resume
                  </button>
                </div>
              </div>

              {/* Developer Photo Column */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="relative group select-none">
                  {/* Ambient outer glow rings */}
                  <div className="absolute inset-0 rounded-full bg-brand-cyan/10 blur-3xl scale-110 pointer-events-none" />
                  <div className="absolute w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] rounded-full border border-brand-cyan/15 animate-pulse pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animationDuration: '3s' }} />
                  <div className="absolute w-[390px] h-[390px] sm:w-[460px] sm:h-[460px] rounded-full border border-brand-purple/10 pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping" style={{ animationDuration: '7s' }} />

                  {/* Photo frame */}
                  <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] rounded-full overflow-hidden border-2 border-brand-cyan/40 shadow-[0_0_40px_rgba(6,182,212,0.3),0_0_80px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_55px_rgba(6,182,212,0.45),0_0_100px_rgba(6,182,212,0.15)] transition-shadow duration-700">
                    <img
                      src="/developer-photo.jpg"
                      alt="Krishna Goyal"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Dark gradient at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                    {/* Animated scan beam */}
                    <div
                      className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-cyan to-transparent opacity-70 shadow-[0_0_10px_#06b6d4] pointer-events-none"
                      style={{ animation: 'scanline 3s linear infinite', top: '0%' }}
                    />

                    {/* VERIFIED badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 text-[8px] font-mono-tech text-brand-green bg-slate-950/80 border border-brand-green/30 px-2 py-0.5 rounded-full">
                      <span className="w-1 h-1 rounded-full bg-brand-green animate-ping" />
                      VERIFIED
                    </div>

                    {/* Bottom name overlay */}
                    <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                      <p className="text-[10px] font-mono-tech text-brand-cyan tracking-widest uppercase">Core Developer</p>
                    </div>
                  </div>

                  {/* Bottom label */}
                  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2 font-mono-tech text-[9px] text-brand-cyan tracking-[0.2em] bg-slate-950/80 border border-brand-cyan/20 px-4 py-1.5 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.15)] pointer-events-none uppercase whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-ping" />
                    [ID: KRISHNA_GOYAL]
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-ping" style={{ animationDelay: '0.5s' }} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SYSTEM INFORMATION (ABOUT) */}
          <SystemInfo />

          {/* TECH MATRIX HUD (SKILLS) */}
          <SkillsMatrix />

          {/* FEATURED MODULES (PROJECTS) */}
          <ProjectModules />

          {/* EXPERIENCE ACTIVITY STREAM */}
          <ExperienceLog />

          {/* TELEMETRY DATA COUNTERS (ACHIEVEMENTS) */}
          <StatsConsole />

          {/* INTEGRATED GITHUB DEV DASHBOARD */}
          <GitHubDashboard />

          {/* COMMUNICATION COCKPIT (CONTACT) */}
          <CommandCenter />
        </main>

        {/* Global OS screen ambient lighting effects */}
        <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-brand-cyan/15 bg-glow-spot -z-20" />
        <div className="absolute top-[60%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-brand-purple/15 bg-glow-spot -z-20" />
      </div>
    </QueryClientProvider>
  );
}
