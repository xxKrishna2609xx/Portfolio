import React, { useState } from 'react';
import { Cpu, Server, ShieldCheck, Activity } from 'lucide-react';

export const SystemInfo: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(9); // Default to 'Today'

  const specCards = [
    { label: 'SYSTEM NAME', value: 'KRISHNA OS' },
    { label: 'CORE DEVELOPER', value: 'Krishna Goyal' },
    { label: 'ROLE CLASSIFICATION', value: 'Backend & AI Engineer' },
    { label: 'ACADEMIC SPECS', value: 'B.Tech in Computer Science' },
    { label: 'PRIMARY FOCUS', value: 'FastAPI / LangGraph / Flutter' },
    { label: 'GEOGRAPHIC NODE', value: 'India (GMT+5:30)' },
    { label: 'AVAILABILITY', value: 'Active / Recruiter Friendly' },
  ];

  const timelineSteps = [
    { label: 'Started', desc: 'Initiated execution logic. Discovered the magic of writing code, automating files, and exploring programming principles.' },
    { label: 'Java', desc: 'Implemented structured architecture logic. Mastered Object-Oriented principles, data encapsulation, and class inheritance.' },
    { label: 'DSA', desc: 'Optimized search & storage efficiency. Programmed complex structures, binary trees, recursion trees, and sorting algorithms.' },
    { label: 'React', desc: 'Engineered web user interfaces. Designed custom state hooks, component matrices, modular routing, and DOM integrations.' },
    { label: 'Python', desc: 'Created script modules. Built web scrapers, local desktop automations, API integrations, and mathematical scripts.' },
    { label: 'Machine Learning', desc: 'Analyzed predictive modeling nodes. Worked with Scikit-Learn classifiers, model tuning, regression, and data metrics.' },
    { label: 'Hackathons', desc: 'Collaborative development sprints. Programmed rapid prototypes, pitched modules under intense 36-hour timelines.' },
    { label: 'Internship', desc: 'Enterprise systems developer at Right Ads Digital. Structured MongoDB schemas, built REST API routes, and scaled backends.' },
    { label: 'Flutter', desc: 'Synthesized cross-platform codebases. Built responsive mobile dashboards, asynchronous networking pools, and native components.' },
    { label: 'Today', desc: 'Assembling robust AI agents and high-performance server backends. Orchestrating advanced model prompts and LangGraph workflows.' },
  ];

  return (
    <section id="about" className="py-24 px-4 max-w-6xl mx-auto flex flex-col justify-center select-none pointer-events-auto">
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-xs font-bold tracking-[0.5em] text-brand-cyan uppercase mb-2">SYSTEM PARAMETERS</h2>
        <h1 className="text-4xl md:text-5xl font-black font-orbitron tracking-wider text-white text-hologram">
          ABOUT THE CORE
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Specifications HUD */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between glow-border-cyan relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-300 pointer-events-none">
            <Cpu className="w-48 h-48 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Cpu className="w-5 h-5 text-brand-cyan animate-pulse" />
              <h3 className="text-xs font-bold font-orbitron tracking-widest text-slate-300">
                SYSTEM SPECIFICATIONS
              </h3>
            </div>
            <div className="space-y-4 font-mono-tech text-xs">
              {specCards.map((spec, index) => (
                <div key={index} className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-500 font-medium">{spec.label}</span>
                  <span className="text-slate-200 text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between text-[10px] font-mono-tech text-brand-cyan">
            <span>CORE STATUS: ONLINE</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-ping" />
              100% HEALTH
            </span>
          </div>
        </div>

        {/* Real-time metrics log HUD */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between border-white/5 relative overflow-hidden">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-brand-purple animate-pulse" />
              <h3 className="text-xs font-bold font-orbitron tracking-widest text-slate-300">
                PERFORMANCE LOG MATRIX
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4 font-mono-tech text-center">
              <div className="bg-slate-950/45 p-4 rounded-xl border border-white/5">
                <span className="block text-[9px] text-slate-500 tracking-wider">CPU UTILIZATION</span>
                <span className="block text-2xl font-black text-brand-cyan mt-1">14.6%</span>
              </div>
              <div className="bg-slate-950/45 p-4 rounded-xl border border-white/5">
                <span className="block text-[9px] text-slate-500 tracking-wider">RAM ALLOCATED</span>
                <span className="block text-2xl font-black text-brand-purple mt-1">5.1 GB</span>
              </div>
              <div className="bg-slate-950/45 p-4 rounded-xl border border-white/5">
                <span className="block text-[9px] text-slate-500 tracking-wider">AI MODULES RUNNING</span>
                <span className="block text-2xl font-black text-brand-green mt-1">4 ACTIVE</span>
              </div>
              <div className="bg-slate-950/45 p-4 rounded-xl border border-white/5">
                <span className="block text-[9px] text-slate-500 tracking-wider">FIREWALL AUDIT</span>
                <span className="block text-2xl font-black text-white mt-1">PASSED</span>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-white/5 pt-4 flex items-center justify-between text-[10px] font-mono-tech text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
              SSL PROTOCOL SECURED
            </span>
            <span>BUILD v1.0.42</span>
          </div>
        </div>

        {/* Timeline HUD Details inspector */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between border-white/5 glow-border-purple relative">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Server className="w-5 h-5 text-brand-purple animate-pulse" />
              <h3 className="text-xs font-bold font-orbitron tracking-widest text-slate-300">
                PIPELINE INSPECTOR
              </h3>
            </div>
            <div className="bg-slate-950/50 rounded-xl p-4 border border-white/5 font-mono-tech text-xs min-h-[150px] flex flex-col justify-center">
              <div className="text-[10px] text-brand-purple uppercase tracking-wider mb-2 font-bold">
                NODE {activeStep}: {timelineSteps[activeStep].label}
              </div>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                {timelineSteps[activeStep].desc}
              </p>
            </div>
          </div>
          <div className="mt-6 text-[9px] font-mono-tech text-slate-500 leading-relaxed">
            * Select a data node in the sequence evolution pipeline below to query timeline details.
          </div>
        </div>
      </div>

      {/* Interactive System Pipeline Timeline flow chart */}
      <div className="glass-panel border-white/5 rounded-2xl p-6 mt-6 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="w-5 h-5 text-brand-cyan animate-pulse" />
          <h3 className="text-xs font-bold font-orbitron tracking-widest text-slate-300">
            SYSTEM EVOLUTION PIPELINE
          </h3>
        </div>

        {/* Horizontal scrollable track container */}
        <div className="overflow-x-auto pb-4 scrollbar-none">
          <div className="flex items-center min-w-[750px] justify-between relative px-6">
            {/* SVG Connecting pipeline line */}
            <div className="absolute top-1/2 left-6 right-6 h-[1.5px] bg-gradient-to-r from-brand-cyan via-brand-indigo to-brand-purple -translate-y-1/2 z-0 opacity-40" />

            {timelineSteps.map((step, index) => {
              const isActive = activeStep === index;
              
              return (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className="relative z-10 flex flex-col items-center group focus:outline-none interactive"
                >
                  {/* Step bubble */}
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? 'bg-brand-cyan/25 border-brand-cyan shadow-[0_0_12px_rgba(6,182,212,0.65)] scale-110 text-white font-bold' 
                      : 'bg-slate-950 border-white/10 text-slate-500 hover:border-slate-300 group-hover:scale-105'
                  }`}>
                    <span className="text-[10px] font-mono-tech">{index}</span>
                  </div>

                  {/* Label */}
                  <span className={`text-[10px] font-mono-tech uppercase tracking-wider mt-2.5 transition-colors duration-250 ${
                    isActive ? 'text-brand-cyan font-bold' : 'text-slate-500 group-hover:text-slate-300'
                  }`}>
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
