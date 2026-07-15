import React, { useEffect, useState } from 'react';

interface BootScreenProps {
  onComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [loadingSkills, setLoadingSkills] = useState(0);
  const [loadingProjects, setLoadingProjects] = useState(0);
  const [loadingAI, setLoadingAI] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Chronological boot logs
    const t1 = setTimeout(() => {
      setLines(['████████████████████', 'Initializing Krishna OS...']);
    }, 150);

    const t2 = setTimeout(() => {
      setLines(prev => [...prev, 'Loading Skills...']);
      const interval = setInterval(() => {
        setLoadingSkills(p => {
          if (p >= 100) {
            clearInterval(interval);
            return 100;
          }
          return p + 10;
        });
      }, 40);
    }, 550);

    const t3 = setTimeout(() => {
      setLines(prev => [...prev, 'Loading Projects...']);
      const interval = setInterval(() => {
        setLoadingProjects(p => {
          if (p >= 100) {
            clearInterval(interval);
            return 100;
          }
          return p + 10;
        });
      }, 40);
    }, 1100);

    const t4 = setTimeout(() => {
      setLines(prev => [...prev, 'Loading AI Modules...']);
      const interval = setInterval(() => {
        setLoadingAI(p => {
          if (p >= 100) {
            clearInterval(interval);
            return 100;
          }
          return p + 10;
        });
      }, 40);
    }, 1650);

    const t5 = setTimeout(() => {
      setLines(prev => [...prev, 'Connecting GitHub...']);
    }, 2200);

    const t6 = setTimeout(() => {
      setLines(prev => [...prev, 'Connected ✓', 'Launching Interface...']);
    }, 2550);

    const t7 = setTimeout(() => {
      setShowWelcome(true);
    }, 3050);

    const t8 = setTimeout(() => {
      setIsFadingOut(true);
    }, 4150);

    const t9 = setTimeout(() => {
      onComplete();
    }, 4650);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
      clearTimeout(t8);
      clearTimeout(t9);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050816] font-mono-tech text-brand-cyan transition-all duration-700 ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Visual scans */}
      <div className="scanlines" />
      <div className="noise-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,#000000_92%)] pointer-events-none" />

      {!showWelcome ? (
        <div className="w-[85%] max-w-lg text-left select-none space-y-2 crt-effect">
          {lines.map((line, idx) => {
            if (line === 'Loading Skills...') {
              return (
                <div key={idx} className="flex justify-between">
                  <span>{line}</span>
                  <span className={loadingSkills === 100 ? 'text-brand-green' : 'text-brand-cyan'}>
                    {loadingSkills}%
                  </span>
                </div>
              );
            }
            if (line === 'Loading Projects...') {
              return (
                <div key={idx} className="flex justify-between">
                  <span>{line}</span>
                  <span className={loadingProjects === 100 ? 'text-brand-green' : 'text-brand-cyan'}>
                    {loadingProjects}%
                  </span>
                </div>
              );
            }
            if (line === 'Loading AI Modules...') {
              return (
                <div key={idx} className="flex justify-between">
                  <span>{line}</span>
                  <span className={loadingAI === 100 ? 'text-brand-green' : 'text-brand-cyan'}>
                    {loadingAI}%
                  </span>
                </div>
              );
            }
            if (line === 'Connected ✓') {
              return (
                <div key={idx} className="text-brand-green">
                  {line}
                </div>
              );
            }
            if (line === 'Launching Interface...') {
              return (
                <div key={idx} className="text-brand-purple animate-pulse">
                  {line}
                </div>
              );
            }
            return <div key={idx}>{line}</div>;
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-6 crt-effect select-none text-center px-4">
          <div className="h-[1px] w-20 bg-brand-cyan/40 animate-pulse" />
          <h2 className="text-[10px] font-bold tracking-[0.5em] text-brand-cyan/70">OS INTERFACE ONLINE</h2>
          <h1 className="text-4xl md:text-5xl font-black font-orbitron tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-indigo to-brand-purple text-hologram animate-pulse leading-tight">
            WELCOME
            <br />
            <span className="text-2xl md:text-3xl text-white font-outfit mt-1 block">KRISHNA GOYAL</span>
          </h1>
          <div className="h-[1px] w-20 bg-brand-indigo/40 animate-pulse" />
        </div>
      )}
    </div>
  );
};
