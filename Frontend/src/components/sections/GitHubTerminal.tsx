import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Circle } from 'lucide-react';

interface LogLine {
  text: string;
  type: 'cmd' | 'output' | 'error' | 'success';
}

export const GitHubTerminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<LogLine[]>([
    { text: 'guest@krishna-os:~$ github status', type: 'cmd' },
    { text: 'Accessing GitHub endpoints via GraphQL API...', type: 'output' },
    { text: 'Host Node: https://api.github.com/users/xxKrishna2609xx', type: 'output' },
    { text: 'Connection Success ✓', type: 'success' },
    { text: '---------------------------------------------------------', type: 'output' },
    { text: 'GitHub Profile: xxKrishna2609xx [Status: Online]', type: 'success' },
    { text: 'Public Repositories: 24  |  Followers: 32', type: 'output' },
    { text: 'Top Languages: Python (45%), Dart/Flutter (30%), TypeScript (20%), Other (5%)', type: 'output' },
    { text: 'Commit Contributions (Past Year): 542 commits', type: 'success' },
    { text: '---------------------------------------------------------', type: 'output' },
    { text: 'Type "help" to see available terminal system commands.', type: 'output' },
  ]);
  const consoleBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    consoleBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    if (!cmd.trim()) return;

    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory: LogLine[] = [...history, { text: `guest@krishna-os:~$ ${cmd}`, type: 'cmd' }];

    switch (trimmedCmd) {
      case 'help':
        newHistory.push(
          { text: 'Available System Calls:', type: 'output' },
          { text: '  status       Query current GitHub profile & system health metrics.', type: 'output' },
          { text: '  repos        List pinned repositories and package specifications.', type: 'output' },
          { text: '  contrib      Print ASCII visual grid of commits contribution map.', type: 'output' },
          { text: '  neofetch     Fetch custom system logs with ASCII logo art.', type: 'output' },
          { text: '  clear        Clear console terminal cache history.', type: 'output' },
          { text: '  help         Display this helper text menu.', type: 'output' }
        );
        break;
      case 'status':
        newHistory.push(
          { text: 'Connection Node: api.github.com', type: 'output' },
          { text: 'Verified User: Krishna Goyal (xxKrishna2609xx)', type: 'success' },
          { text: 'Followers: 32 | Public Gists: 8', type: 'output' },
          { text: 'API Query Status: 200 OK [No Rate Limits]', type: 'success' }
        );
        break;
      case 'repos':
        newHistory.push(
          { text: 'Pinned Software Modules:', type: 'output' },
          { text: '  - JobGuard-AI: LangGraph state-agent fake job detector (React + Python)', type: 'success' },
          { text: '  - PyClimate-Explorer: Streamlit meteorological NetCDF visualizer (Python)', type: 'success' },
          { text: '  - Business-Listing-App: Flutter Android catalog app (Dart + FastAPI)', type: 'success' },
          { text: '  - Business-Listing-Web: Enterprise listing admin dashboard (React + Mongo)', type: 'success' }
        );
        break;
      case 'contrib':
        newHistory.push(
          { text: 'Contribution Graph Mock Stream (Last 30 Days):', type: 'output' },
          { text: '  [■][■][ ][■][■][■][ ][■][■][■][■][ ][■][■][■]', type: 'success' },
          { text: '  [■][ ][■][■][ ][■][■][ ][■][■][ ][■][■][ ][■]', type: 'success' },
          { text: '  [■][■][■][ ][■][■][■][■][ ][■][■][■][ ][■][■]', type: 'success' },
          { text: '  Legend: [ ] No Commits | [■] Commits Logged', type: 'output' }
        );
        break;
      case 'neofetch':
        newHistory.push(
          { text: '      _  _______ ___ ____  _   _    _      ', type: 'success' },
          { text: '     | |/ /  ___|_ _/ ___|| | | |  / \\     ', type: 'success' },
          { text: '     | \' /| |_   | |\\___ \\| |_| | / _ \\    ', type: 'success' },
          { text: '     | . \\|  _|  | | ___) |  _  |/ ___ \\   ', type: 'success' },
          { text: '     |_|\\_\\_|   |___|____/|_| |_/_/   \\_\\  ', type: 'success' },
          { text: '-------------------------------------------', type: 'output' },
          { text: 'OS: KRISHNA OS v1.0.0 (Windows/WSL2 Node)', type: 'output' },
          { text: 'Host: Portfolio CLI Portal', type: 'output' },
          { text: 'Kernel: React 19 / Vite 8 Engine', type: 'output' },
          { text: 'Shell: Custom interactive terminal.sh', type: 'output' },
          { text: 'Theme: Futuristic Cyber-Glass', type: 'output' },
          { text: 'CPU: Intel Core AI i7-Gen', type: 'output' }
        );
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        newHistory.push({ text: `bash: command not found: ${cmd}. Type "help" for a list of system calls.`, type: 'error' });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <section id="github" className="py-24 px-4 max-w-6xl mx-auto flex flex-col justify-center select-none pointer-events-auto">
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-xs font-bold tracking-[0.5em] text-brand-cyan uppercase mb-2">INTEGRATED ENDPOINT</h2>
        <h1 className="text-4xl md:text-5xl font-black font-orbitron tracking-wider text-white text-hologram">
          GITHUB TERMINAL
        </h1>
      </div>

      {/* Terminal box */}
      <div className="glass-panel-heavy rounded-2xl overflow-hidden border border-brand-cyan/20 shadow-[0_15px_40px_rgba(0,0,0,0.65)] flex flex-col h-[460px] max-w-4xl mx-auto crt-effect">
        {/* Header toolbar */}
        <div className="bg-slate-950/65 px-4.5 py-3 border-b border-white/5 flex items-center justify-between">
          <div className="flex gap-2">
            <Circle className="w-3 h-3 fill-red-500/70 stroke-none" />
            <Circle className="w-3 h-3 fill-yellow-500/70 stroke-none" />
            <Circle className="w-3 h-3 fill-green-500/70 stroke-none" />
          </div>
          <span className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-brand-cyan" />
            guest@krishna-os: /usr/github
          </span>
          <div className="w-12 h-1" />
        </div>

        {/* Logs terminal output stream */}
        <div className="flex-1 overflow-y-auto p-5 font-mono-tech text-[11px] sm:text-xs space-y-2 select-text selection:bg-brand-cyan/35 selection:text-white scrollbar-none">
          {history.map((line, idx) => {
            let textColor = 'text-slate-300';
            if (line.type === 'cmd') textColor = 'text-white font-semibold';
            if (line.type === 'success') textColor = 'text-brand-green';
            if (line.type === 'error') textColor = 'text-red-400 font-bold';
            
            return (
              <div key={idx} className={`${textColor} leading-relaxed whitespace-pre-wrap`}>
                {line.text}
              </div>
            );
          })}
          <div ref={consoleBottomRef} />
        </div>

        {/* Input prompt */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleCommand(input);
          }}
          className="bg-slate-950/50 px-5 py-3 border-t border-white/5 flex items-center gap-2 font-mono-tech text-[11px] sm:text-xs"
        >
          <span className="text-brand-cyan font-bold select-none">guest@krishna-os:~$</span>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='Type "help" to see available terminal system commands...'
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-600 tracking-wide font-mono-tech focus:ring-0"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </form>
      </div>
    </section>
  );
};
