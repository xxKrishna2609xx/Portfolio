import React from 'react';
import { ExternalLink, Layers, Cpu, Globe } from 'lucide-react';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Project {
  title: string;
  subtitle: string;
  desc: string;
  tech: string[];
  challenges: string;
  features: string[];
  github: string;
  demo?: string;
  mockupType: 'dashboard' | 'mobile' | 'nodes' | 'charts';
}


export const ProjectModules: React.FC = () => {
  const projects: Project[] = [
    {
      title: 'JobGuard AI',
      subtitle: 'Explainable AI Fake Job Detection Suite',
      desc: 'Machine learning framework built to intercept fraudulent career postings and translate model classifications into clean PDF reports.',
      tech: ['React', 'Python', 'FastAPI', 'LangGraph', 'Gemini API', 'SHAP'],
      challenges: 'Translating complex SHAP mathematical local models into actionable, human-readable safety indexes using LLM reasoning structures.',
      features: ['Fake Job Detection', 'PDF Security Reports', 'Explainable AI HUD', 'Multi-Agent Analysis flow'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      mockupType: 'nodes',
    },
    {
      title: 'Business Listing Website',
      subtitle: 'Scalable Enterprise Directory Portal',
      desc: 'A full-stack, responsive catalog dashboard that allows local business listings, categorization, search query matching, and admin moderation audits.',
      tech: ['React', 'FastAPI', 'Firebase', 'MongoDB'],
      challenges: 'Optimizing high-frequency listing search queries and handling concurrent authentication states across Mongo DB collections.',
      features: ['Business Directory', 'Admin Moderation Console', 'OAuth Authentication', 'Highly polished Responsive UI'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      mockupType: 'dashboard',
    },
    {
      title: 'Business Listing Android App',
      subtitle: 'Native Cross-Platform Mobile Catalog',
      desc: 'A material design Flutter application pulling server data from high-speed backend pipelines, optimized for mobile caching and maps lookup.',
      tech: ['Flutter', 'FastAPI', 'Firebase', 'Material Design'],
      challenges: 'Syncing local mobile cache with remote NoSQL schemas over unstable cellular connections, utilizing custom asynchronous buffers.',
      features: ['Native Performance', 'Fast REST API Integrations', 'Firebase Cloud Syncing', 'Responsive Mobile Layouts'],
      github: 'https://github.com',
      mockupType: 'mobile',
    },
    {
      title: 'PyClimate Explorer',
      subtitle: 'Climate Science Data Processing HUD',
      desc: 'An interactive streaming app processing global climate telemetry coordinates, plotting heatmaps and mapping temperature time-series.',
      tech: ['Python', 'Streamlit', 'Plotly', 'Xarray'],
      challenges: 'Handling multi-dimensional NetCDF meteorological grids and rendering interactive geospatial projections under 2 seconds.',
      features: ['Climate Science Telemetry', 'Global Thermal Heatmaps', 'Time Series Projections', 'Interactive Science Cockpit'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      mockupType: 'charts',
    },
  ];

  // Renders a high-fidelity animated CSS simulation mockup based on the type
  const renderMockup = (type: string) => {
    switch (type) {
      case 'dashboard':
        return (
          <div className="h-40 bg-slate-950/65 rounded-xl border border-white/5 p-3 flex flex-col justify-between font-mono-tech relative overflow-hidden">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[10px] text-brand-cyan tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                DIRECTORY_PORTAL.EXE
              </span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
              </div>
            </div>
            {/* Mock layout metrics */}
            <div className="grid grid-cols-3 gap-2 flex-1 mt-3.5">
              <div className="bg-slate-900/80 rounded border border-white/5 p-2 flex flex-col justify-between">
                <span className="text-[7px] text-slate-500">LISTINGS</span>
                <span className="text-xs font-bold text-white">1,420</span>
              </div>
              <div className="bg-slate-900/80 rounded border border-white/5 p-2 flex flex-col justify-between">
                <span className="text-[7px] text-slate-500">CLIENTS</span>
                <span className="text-xs font-bold text-brand-cyan">3.2k</span>
              </div>
              <div className="bg-slate-900/80 rounded border border-white/5 p-2 flex flex-col justify-between">
                <span className="text-[7px] text-slate-500">PING</span>
                <span className="text-xs font-bold text-brand-purple">12ms</span>
              </div>
            </div>
            <div className="text-[7px] text-brand-cyan/60 mt-1 select-none uppercase tracking-wide">
              {`> GET /api/v1/business/catalog [200 OK]`}
            </div>
          </div>
        );
      case 'mobile':
        return (
          <div className="h-40 bg-slate-950/65 rounded-xl border border-white/5 p-3 flex justify-center items-center font-mono-tech relative overflow-hidden">
            {/* Smartphone shell representation */}
            <div className="w-[105px] h-[145px] bg-slate-900 rounded-xl border-2 border-white/10 p-2 flex flex-col justify-between relative shadow-[0_0_15px_rgba(6,182,212,0.08)] scale-90">
              {/* Notch */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-6 h-2 bg-slate-950 rounded-full" />
              {/* Screen Top header */}
              <div className="h-3 border-b border-white/5 mt-1 flex justify-between items-center text-[6px] text-slate-500">
                <span>FLUTTER_API</span>
                <span>100%</span>
              </div>
              {/* Screen Body */}
              <div className="flex-1 bg-slate-950/65 rounded-lg border border-white/5 my-1.5 p-1 flex flex-col justify-between">
                <div className="w-full h-3 bg-brand-cyan/10 border border-brand-cyan/20 rounded flex items-center justify-center">
                  <span className="text-[5px] text-brand-cyan uppercase tracking-wider">Data Syncing...</span>
                </div>
                <div className="space-y-0.5 mt-1">
                  <div className="w-full h-[3px] bg-slate-800 rounded" />
                  <div className="w-4/5 h-[3px] bg-slate-800 rounded" />
                  <div className="w-3/5 h-[3px] bg-slate-800 rounded" />
                </div>
                <span className="text-[5px] text-brand-green text-center">Connected</span>
              </div>
              <div className="w-3 h-1 bg-white/20 rounded self-center" />
            </div>
          </div>
        );
      case 'nodes':
        return (
          <div className="h-40 bg-slate-950/65 rounded-xl border border-white/5 p-3 flex flex-col justify-between font-mono-tech relative overflow-hidden">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[10px] text-brand-purple tracking-wider flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                LANGGRAPH_FLOW.PY
              </span>
              <span className="text-[8px] text-slate-500 uppercase font-medium">Multi-Agent</span>
            </div>
            {/* Visual multi-agent nodes workflow animation */}
            <div className="flex justify-between items-center flex-1 py-4 px-2">
              <div className="bg-slate-900 border border-brand-cyan/35 text-brand-cyan px-2 py-1 rounded text-[8px] shadow-[0_0_8px_rgba(6,182,212,0.2)] select-none">
                DataParser
              </div>
              <div className="w-7 h-[1px] bg-gradient-to-r from-brand-cyan to-brand-purple animate-pulse" />
              <div className="bg-slate-900 border border-brand-purple/35 text-brand-purple px-2 py-1 rounded text-[8px] shadow-[0_0_8px_rgba(139,92,246,0.2)] select-none">
                ML Classifier
              </div>
              <div className="w-7 h-[1px] bg-gradient-to-r from-brand-purple to-brand-green animate-pulse" />
              <div className="bg-slate-900 border border-brand-green/35 text-brand-green px-2 py-1 rounded text-[8px] shadow-[0_0_8px_rgba(34,197,94,0.2)] select-none">
                PDF HUD
              </div>
            </div>
            <div className="text-[7px] text-brand-purple/60 select-none uppercase tracking-wide">
              {`> SHAP explainable indexes loaded.`}
            </div>
          </div>
        );
      case 'charts':
      default:
        return (
          <div className="h-40 bg-slate-950/65 rounded-xl border border-white/5 p-3 flex flex-col justify-between font-mono-tech relative overflow-hidden">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[10px] text-brand-green tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                METEOROLOGY_GRID.PY
              </span>
              <span className="text-[8px] text-slate-500 uppercase font-medium">Plotly</span>
            </div>
            {/* Mock coordinate chart bars */}
            <div className="flex-1 flex items-end gap-1.5 mt-3 px-2 border-b border-white/5 pb-1 select-none">
              <div className="w-full bg-brand-green/20 h-10 border-t border-brand-green" />
              <div className="w-full bg-brand-green/20 h-16 border-t border-brand-green" />
              <div className="w-full bg-brand-cyan/25 h-24 border-t border-brand-cyan shadow-[0_0_8px_rgba(6,182,212,0.15)]" />
              <div className="w-full bg-brand-purple/20 h-20 border-t border-brand-purple" />
              <div className="w-full bg-brand-purple/20 h-12 border-t border-brand-purple" />
            </div>
            <div className="text-[7px] text-brand-green/60 mt-1 select-none uppercase tracking-wide">
              {`> Global NetCDF temp dataset render success.`}
            </div>
          </div>
        );
    }
  };

  return (
    <section id="projects" className="py-24 px-4 max-w-6xl mx-auto flex flex-col justify-center select-none pointer-events-auto">
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-xs font-bold tracking-[0.5em] text-brand-cyan uppercase mb-2">SYSTEM DEPLOYMENTS</h2>
        <h1 className="text-4xl md:text-5xl font-black font-orbitron tracking-wider text-white text-hologram">
          SOFTWARE MODULES
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {projects.map((proj, idx) => {
          const isPurple = idx % 2 === 0;
          const borderClass = isPurple ? 'hover:glow-border-purple' : 'hover:glow-border-cyan';
          const textAccent = isPurple ? 'text-brand-purple' : 'text-brand-cyan';

          return (
            <div
              key={proj.title}
              className={`glass-panel rounded-2xl p-6 border-white/5 transition-all duration-300 flex flex-col justify-between group ${borderClass}`}
            >
              <div>
                {/* Visual simulator mockup */}
                <div className="mb-5">
                  {renderMockup(proj.mockupType)}
                </div>

                {/* Header */}
                <div className="flex flex-col gap-1 mb-4">
                  <h2 className="text-xl md:text-2xl font-black font-orbitron text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-cyan tracking-wide transition-colors">
                    {proj.title}
                  </h2>
                  <span className={`text-[10px] font-mono-tech uppercase font-bold tracking-wider ${textAccent}`}>
                    {proj.subtitle}
                  </span>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5 font-outfit">
                  {proj.desc}
                </p>

                {/* Core Features */}
                <div className="space-y-2.5 mb-5 border-t border-white/5 pt-4">
                  <span className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-wider block font-bold">
                    MODULE FEATURES
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono-tech text-slate-300">
                    {proj.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-1.5">
                        <span className={`w-1 h-1 rounded-full ${isPurple ? 'bg-brand-purple' : 'bg-brand-cyan'}`} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Challenges */}
                <div className="bg-slate-950/35 border border-white/5 rounded-xl p-3.5 mb-6 font-mono-tech text-xs">
                  <span className="text-slate-500 block uppercase font-bold text-[9px] tracking-wider mb-1">
                    INTEGRATION CHALLENGE
                  </span>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {proj.challenges}
                  </p>
                </div>
              </div>

              {/* Stack and Action CTA Buttons */}
              <div>
                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.tech.map((tag) => (
                    <span
                      key={tag}
                      className="bg-slate-900 border border-white/5 text-slate-400 px-2 py-0.5 rounded text-[9px] font-mono-tech uppercase font-bold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex gap-3 border-t border-white/5 pt-4">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-slate-900/60 border border-white/10 hover:border-brand-cyan/35 text-slate-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-mono-tech tracking-wider uppercase text-center flex items-center justify-center gap-2 transition-all duration-200 interactive"
                  >
                    <GithubIcon className="w-4 h-4" />
                    Source
                  </a>
                  {proj.demo && (
                    <a
                      href={proj.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-brand-cyan hover:bg-brand-cyan/85 text-black px-4 py-2.5 rounded-xl text-xs font-mono-tech font-bold tracking-wider uppercase text-center flex items-center justify-center gap-2 transition-all duration-200 shadow-[0_0_12px_rgba(6,182,212,0.25)] hover:shadow-[0_0_18px_rgba(6,182,212,0.4)] interactive"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
