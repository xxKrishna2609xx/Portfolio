import React, { useState } from 'react';
import { Terminal, Calendar, Building, FileCode } from 'lucide-react';


export const ExperienceLog: React.FC = () => {
  const [activeLog, setActiveLog] = useState<number>(0);

  const experiences = [
    {
      company: 'Right Ads Digital',
      role: 'Web Developer Intern',
      duration: 'June 2025 - Present',
      location: 'Remote',
      actions: [
        'Built Business Listing Website using React, FastAPI, and MongoDB.',
        'Developed Flutter cross-platform catalog application for Android deployment.',
        'Integrated REST APIs with structured JSON data formatting.',
        'Managed Firebase Authentication database flows and storage buckets.',
        'Collaborated on database schemas design and REST API scaling optimization.',
      ],
      systemLogs: [
        { type: 'SUCCESS', desc: 'Initialize Business Listing Portal. Structured frontend React grids + FastAPI backends.' },
        { type: 'SUCCESS', desc: 'Synthesized Mobile Catalog Modules. Programmed Flutter views, binding MongoDB endpoints.' },
        { type: 'SUCCESS', desc: 'API Interception Hook. Configured secure Firebase OAuth checks and sessions.' },
        { type: 'INFO', desc: 'Load Balancer Audit. Co-designed index configurations, scaling query lookups by 15%.' },
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 px-4 max-w-6xl mx-auto flex flex-col justify-center select-none pointer-events-auto">
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-xs font-bold tracking-[0.5em] text-brand-cyan uppercase mb-2">SYSTEM ACTIVITY STREAM</h2>
        <h1 className="text-4xl md:text-5xl font-black font-orbitron tracking-wider text-white text-hologram">
          EXPERIENCE LOGS
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left timeline stream list */}
        <div className="lg:col-span-5 space-y-4">
          {experiences.map((exp, index) => {
            const isActive = activeLog === index;
            return (
              <div
                key={index}
                onClick={() => setActiveLog(index)}
                className={`glass-panel rounded-2xl p-5 border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                  isActive ? 'bg-brand-cyan/10 border-brand-cyan shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'border-white/5 hover:border-brand-cyan/30'
                }`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                  <Building className="w-16 h-16 text-white" />
                </div>
                <div className="flex gap-4 items-start">
                  <div className={`p-2.5 rounded-xl border ${
                    isActive ? 'bg-brand-cyan/20 border-brand-cyan text-white' : 'bg-slate-900 border-white/10 text-slate-500'
                  }`}>
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-orbitron text-white tracking-wide">{exp.company}</h3>
                    <p className="text-xs text-slate-400 font-mono-tech mt-0.5">{exp.role}</p>
                    <div className="flex items-center gap-1.5 mt-2.5 text-[10px] font-mono-tech text-slate-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right log terminal view */}
        <div className="lg:col-span-7">
          <div className="glass-panel-heavy rounded-2xl p-6 glow-border-cyan relative overflow-hidden min-h-[420px] flex flex-col justify-between crt-effect font-mono-tech">
            {/* Terminal Header */}
            <div>
              <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-brand-cyan animate-pulse" />
                  <span className="text-xs font-bold text-slate-400">EXP_STREAM_INSPECTOR.SH</span>
                </div>
                <span className="text-[9px] bg-slate-900 border border-white/5 px-2 py-0.5 rounded text-brand-green">
                  LOGS LOADED
                </span>
              </div>

              {/* Terminal Logs printing */}
              <div className="space-y-4 text-xs">
                {/* Specs */}
                <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 border-b border-white/5 pb-3">
                  <div>HOST COMPANY: <span className="text-white">{experiences[activeLog].company}</span></div>
                  <div>GEOGRAPHIC NODE: <span className="text-white">{experiences[activeLog].location}</span></div>
                  <div>WORK STATUS: <span className="text-brand-purple">VERIFIED_INTERN</span></div>
                  <div>DURATION TIME: <span className="text-brand-cyan">{experiences[activeLog].duration}</span></div>
                </div>

                {/* Event stream lines */}
                <div className="space-y-3">
                  <span className="text-slate-500 block text-[9px] uppercase tracking-wider font-bold">
                    SYSTEM PIPELINE ACTIONS
                  </span>
                  {experiences[activeLog].actions.map((act, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start leading-relaxed text-slate-300">
                      <FileCode className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                      <p className="text-[11px] sm:text-xs">{act}</p>
                    </div>
                  ))}
                </div>

                {/* Audit outputs */}
                <div className="space-y-2 border-t border-white/5 pt-4">
                  <span className="text-slate-500 block text-[9px] uppercase tracking-wider font-bold">
                    SYSTEM COMPILER AUDIT LOG
                  </span>
                  {experiences[activeLog].systemLogs.map((log, idx) => (
                    <div key={idx} className="flex gap-2 text-[10px]">
                      <span className={log.type === 'SUCCESS' ? 'text-brand-green' : 'text-brand-purple'}>
                        [{log.type}]
                      </span>
                      <span className="text-slate-400 leading-relaxed">{log.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-white/5 pt-4 flex items-center justify-between text-[9px] text-slate-500">
              <span>SECURITY LOG SHIELD v3.2</span>
              <span>AUDIT CHECKSUMS: PASSED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
