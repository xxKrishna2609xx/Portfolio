import React, { useState } from 'react';
import { Cpu, Terminal, Eye, Award } from 'lucide-react';

interface SkillInfo {
  name: string;
  exp: 'Expert' | 'Advanced' | 'Intermediate';
  projects: string[];
  usage: string;
  desc: string;
}

export const SkillsMatrix: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillInfo | null>({
    name: 'FastAPI',
    exp: 'Expert',
    projects: ['JobGuard AI', 'Business Listing Website', 'Business Listing Android App'],
    usage: 'Primary Framework for high-performance microservices and async API endpoints.',
    desc: 'High-performance Python web framework designed for building scalable APIs with auto-generated OpenAPI documentation.',
  });

  const categories: Record<string, SkillInfo[]> = {
    Backend: [
      { name: 'FastAPI', exp: 'Expert', projects: ['JobGuard AI', 'Business Listing Website', 'Business Listing Android App'], usage: 'High frequency (Async API systems)', desc: 'High-performance Python web framework designed for building scalable APIs with auto-generated OpenAPI documentation.' },
      { name: 'Node.js', exp: 'Advanced', projects: ['Backend Microservices'], usage: 'Medium frequency (Real-time modules)', desc: 'Event-driven, asynchronous JavaScript runtime built on Chrome V8, engineered for writing real-time backend services.' },
      { name: 'Firebase', exp: 'Advanced', projects: ['Business Listing Website', 'Business Listing Android App'], usage: 'High frequency (Auth, Database syncing)', desc: 'Google cloud platform suite that handles OAuth logins, real-time reactive databases, and static hosting.' },
      { name: 'MongoDB', exp: 'Advanced', projects: ['Business Listing Website', 'Business Listing Android App'], usage: 'High frequency (Document stores)', desc: 'Highly scalable document-based NoSQL database, structured for JSON-like documents with dynamic schemas.' },
    ],
    Frontend: [
      { name: 'React', exp: 'Expert', projects: ['JobGuard AI', 'Business Listing Website'], usage: 'High frequency (Dashboard layouts)', desc: 'Modern web component interface library, providing rapid reactivity and optimized browser DOM re-renders.' },
      { name: 'Flutter', exp: 'Expert', projects: ['Business Listing Android App'], usage: 'High frequency (Native Android/iOS compilation)', desc: 'Google-created UI framework for writing natively compiled mobile applications from a single Dart codebase.' },
      { name: 'Tailwind CSS', exp: 'Expert', projects: ['JobGuard AI', 'Business Listing Website', 'Portfolio'], usage: 'High frequency (Responsive layouts)', desc: 'Utility-first CSS styling compilation system, accelerating layout design and minimizing build outputs.' },
      { name: 'TypeScript', exp: 'Advanced', projects: ['Portfolio', 'React Dashboards'], usage: 'High frequency (Type-safe client coding)', desc: 'Strict syntactical superset of JavaScript, preventing runtime exceptions by verifying typing at compiler level.' },
    ],
    AI: [
      { name: 'Python', exp: 'Expert', projects: ['JobGuard AI', 'PyClimate Explorer'], usage: 'High frequency (Model training, state graphs)', desc: 'Versatile backend language, widely treated as the core programming syntax for artificial intelligence operations.' },
      { name: 'Scikit Learn', exp: 'Advanced', projects: ['JobGuard AI'], usage: 'Medium frequency (Data classification classifiers)', desc: 'Comprehensive Python ML toolbox for data analysis, classification, and statistical regression modeling.' },
      { name: 'LangGraph', exp: 'Advanced', projects: ['JobGuard AI'], usage: 'Medium frequency (Stateful multi-agent workflows)', desc: 'Orchestration library for building stateful, multi-agent LLM systems with cycle loops and graph steps.' },
      { name: 'Gemini API', exp: 'Expert', projects: ['JobGuard AI', 'AIAssistant'], usage: 'High frequency (LLM integrations)', desc: 'Google developer endpoint accessing multimodal models (like Flash or Pro) for text, code, and media reasoning.' },
      { name: 'Machine Learning', exp: 'Advanced', projects: ['JobGuard AI', 'PyClimate Explorer'], usage: 'High frequency (Analytical data science)', desc: 'Statistical engineering algorithms designed to learn patterns from datasets and evaluate validation predictions.' },
    ],
    Database: [
      { name: 'MongoDB', exp: 'Advanced', projects: ['Business Listing Website'], usage: 'High frequency (JSON NoSQL schemas)', desc: 'Document database optimized for storing dynamic JSON structures and supporting fast query speeds.' },
      { name: 'Firebase', exp: 'Advanced', projects: ['Business Listing Android App'], usage: 'High frequency (Real-time Cloud storage)', desc: 'Hosted backend suite that handles authentication database structures, hosting, and cloud storage.' },
      { name: 'SQL', exp: 'Advanced', projects: ['Relational systems'], usage: 'Medium frequency (Relational indexing)', desc: 'Relational database query language, optimized for tabular data integrity, schemas, and indexing.' },
    ],
    Tools: [
      { name: 'Git', exp: 'Expert', projects: ['All codebases'], usage: 'High frequency (Version controls)', desc: 'Distributed version control database, tracking modifications and branch integrations across development teams.' },
      { name: 'GitHub', exp: 'Expert', projects: ['Open Source contributions'], usage: 'High frequency (Repository hosting, CI/CD)', desc: 'Cloud platform hosting Git repositories, tracking contributions, issues, actions, and pull requests.' },
      { name: 'Docker', exp: 'Advanced', projects: ['API Deployments'], usage: 'Medium frequency (Isolated container deployments)', desc: 'Containerization tool packaging dependencies and server scripts into virtualized images for deployment.' },
      { name: 'Android Studio', exp: 'Advanced', projects: ['Business Listing Android App'], usage: 'High frequency (Flutter debug tools)', desc: 'Google developer IDE optimized for compiling, debugging, and running Android Flutter code.' },
      { name: 'VS Code', exp: 'Expert', projects: ['All development folders'], usage: 'High frequency (Text compilation)', desc: 'High performance modular code editor configured with language servers, syntax compilers, and terminal tools.' },
    ],
  };

  return (
    <section id="skills" className="py-24 px-4 max-w-6xl mx-auto flex flex-col justify-center select-none pointer-events-auto">
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-xs font-bold tracking-[0.5em] text-brand-cyan uppercase mb-2">SYSTEM CAPABILITIES</h2>
        <h1 className="text-4xl md:text-5xl font-black font-orbitron tracking-wider text-white text-hologram">
          TECH MATRIX HUD
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Skill Category Blocks (Left Column) */}
        <div className="lg:col-span-7 space-y-6">
          {Object.entries(categories).map(([catName, skills]) => (
            <div key={catName} className="glass-panel rounded-2xl p-5 border-white/5">
              <div className="flex items-center gap-2 mb-3.5 border-b border-white/5 pb-2">
                <Cpu className="w-4 h-4 text-brand-cyan" />
                <h3 className="text-xs font-bold font-orbitron tracking-wider text-slate-400 uppercase">
                  {catName}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill) => {
                  const isSelected = selectedSkill?.name === skill.name;
                  return (
                    <button
                      key={skill.name}
                      onMouseEnter={() => setSelectedSkill(skill)}
                      onClick={() => setSelectedSkill(skill)}
                      className={`px-3 py-1.5 rounded-lg font-mono-tech text-xs border transition-all duration-200 interactive flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-brand-cyan/20 border-brand-cyan text-white shadow-[0_0_12px_rgba(6,182,212,0.35)] scale-105 font-bold'
                          : 'bg-slate-900/50 border-white/5 text-slate-400 hover:text-white hover:border-brand-cyan/40 hover:bg-brand-cyan/5'
                      }`}
                    >
                      <span>{skill.name}</span>
                      <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-brand-cyan' : 'bg-slate-600'}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* HUD Details Panel (Right Column) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="glass-panel-heavy rounded-2xl p-6 glow-border-cyan relative min-h-[370px] flex flex-col justify-between crt-effect">
            <div>
              {/* Header info */}
              <div className="flex items-center gap-2.5 border-b border-white/5 pb-4 mb-5">
                <Terminal className="w-5 h-5 text-brand-cyan animate-pulse" />
                <div>
                  <h3 className="text-xs font-bold font-orbitron tracking-widest text-slate-500">
                    HUD SPECIFICATIONS
                  </h3>
                  <h2 className="text-xl font-black font-orbitron text-white mt-0.5 tracking-wide">
                    {selectedSkill ? selectedSkill.name : 'WAITING FOR INPUT'}
                  </h2>
                </div>
              </div>

              {selectedSkill ? (
                <div className="space-y-4 font-mono-tech text-xs">
                  {/* EXP LEVEL */}
                  <div>
                    <span className="text-slate-500 block uppercase tracking-wider mb-1.5">EXPERIENCE LEVEL</span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-200 text-xs font-bold w-20">{selectedSkill.exp}</span>
                      {/* Block-meter visualization */}
                      <div className="flex gap-1.5 flex-1">
                        <div className={`h-2.5 flex-1 rounded-sm border ${
                          selectedSkill.exp === 'Intermediate' || selectedSkill.exp === 'Advanced' || selectedSkill.exp === 'Expert'
                            ? 'bg-brand-cyan/35 border-brand-cyan' : 'bg-slate-950 border-white/5'
                        }`} />
                        <div className={`h-2.5 flex-1 rounded-sm border ${
                          selectedSkill.exp === 'Advanced' || selectedSkill.exp === 'Expert'
                            ? 'bg-brand-indigo/35 border-brand-indigo' : 'bg-slate-950 border-white/5'
                        }`} />
                        <div className={`h-2.5 flex-1 rounded-sm border ${
                          selectedSkill.exp === 'Expert'
                            ? 'bg-brand-purple/35 border-brand-purple shadow-[0_0_8px_rgba(139,92,246,0.35)]' : 'bg-slate-950 border-white/5'
                        }`} />
                      </div>
                    </div>
                  </div>

                  {/* USAGE FREQUENCY */}
                  <div>
                    <span className="text-slate-500 block uppercase tracking-wider mb-1.5">UTILITY METRIC</span>
                    <span className="text-slate-300 text-xs font-medium bg-slate-900/60 border border-white/5 px-2.5 py-1.5 rounded-lg block leading-relaxed">
                      {selectedSkill.usage}
                    </span>
                  </div>

                  {/* PROJECTS */}
                  <div>
                    <span className="text-slate-500 block uppercase tracking-wider mb-1.5">INTEGRATED IN PROJECTS</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSkill.projects.map((proj, index) => (
                        <span 
                          key={index}
                          className="bg-slate-900/80 border border-white/5 px-2.5 py-1 rounded text-[9px] text-brand-purple font-medium"
                        >
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* SYNOPSIS */}
                  <div>
                    <span className="text-slate-500 block uppercase tracking-wider mb-1.5">COMPILER SYNOPSIS</span>
                    <p className="text-slate-300 leading-relaxed text-xs">
                      {selectedSkill.desc}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-[210px] flex items-center justify-center font-mono-tech text-xs text-slate-500 animate-pulse text-center">
                  [SYSTEM: WAITING FOR CHIP INPUT]
                  <br />
                  Hover over a technology chip to inspector compile specs.
                </div>
              )}
            </div>

            <div className="mt-8 border-t border-white/5 pt-4 flex items-center justify-between text-[9px] font-mono-tech text-slate-500">
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-brand-cyan" />
                HUD ACTIVE
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-brand-cyan" />
                VERIFIED SKILLS MATRIX
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
