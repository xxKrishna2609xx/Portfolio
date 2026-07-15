import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Terminal as TerminalIcon, Calendar, Star, GitFork, 
  Award, Zap, Cpu, Activity, Info, 
  Play, ExternalLink, RefreshCw, AlertTriangle
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { fetchGithubDashboard, type DashboardResponse } from '../../services/github';
import { LINKS } from '../../config';

const CountUp: React.FC<{ end: number; suffix?: string }> = ({ end, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = Math.max(1, Math.ceil(end / 40));
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [end]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

export const GitHubDashboard: React.FC = () => {
  const [loadingStep, setLoadingStep] = useState(0);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'guest@krishna-os:~$ github status',
    'Connection Node: api.github.com',
    'Verified User: xxKrishna2609xx',
    'Status: ONLINE',
    'Type "help" for a list of system calls.'
  ]);
  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const [chartTab, setChartTab] = useState<'commits' | 'stars' | 'repos'>('commits');

  const loadingSequence = [
    'Connecting to GitHub core...',
    'Authenticating handshake...',
    'Fetching user repositories...',
    'Analyzing code metrics...',
    'Compiling activity pipelines...',
    'Generating AI Insights specs...',
    'Connected successfully ✓'
  ];

  // React Query fetcher
  const { data, isLoading, error, refetch, isRefetching } = useQuery<DashboardResponse>({
    queryKey: ['githubDashboard'],
    queryFn: fetchGithubDashboard,
    refetchOnWindowFocus: false,
    staleTime: 600000, // 10 minutes cache
  });

  // Simulated boot sequence effect during load
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev >= loadingSequence.length - 1) {
            clearInterval(interval);
            return loadingSequence.length - 1;
          }
          return prev + 1;
        });
      }, 450);
      return () => clearInterval(interval);
    } else {
      setLoadingStep(loadingSequence.length - 1);
    }
  }, [isLoading]);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    const newHistory = [...terminalHistory, `guest@krishna-os:~$ ${terminalInput}`];

    if (!data?.data) {
      newHistory.push('System: Missing data nodes.');
      setTerminalHistory(newHistory);
      setTerminalInput('');
      return;
    }

    const { profile, metrics, insights, current_project } = data.data;

    switch (cmd) {
      case 'help':
        newHistory.push(
          'Available Terminal Commands:',
          '  status       Check developer account authentication state.',
          '  repos        Summarize active pinned repositories.',
          '  latest       Query details on the most active project.',
          '  activity     Display recent repository event stream actions.',
          '  languages    Query radial percentage metrics for codebases.',
          '  stats        Check overall developer impact scores.',
          '  insights     Output AI-generated coding patterns summary.',
          '  clear        Clear console terminal cache history.'
        );
        break;
      case 'status':
        newHistory.push(
          `Account: ${profile.username}`,
          `Role: ${profile.bio}`,
          `Availability: ${profile.availability}`,
          `Location: ${profile.location}`
        );
        break;
      case 'repos':
        newHistory.push(
          'Pinned Modules:',
          ...data.data.pinned.map(p => `  - ${p.name}: ${p.description} (${p.language})`)
        );
        break;
      case 'latest':
        newHistory.push(
          `Project: ${current_project.name}`,
          `Status: ${current_project.status}`,
          `Branch: ${current_project.branch}`,
          `Last Commit: ${current_project.last_commit}`,
          `Last Sync: ${current_project.updated}`
        );
        break;
      case 'activity':
        newHistory.push(
          'Recent Actions:',
          ...data.data.activity.map(a => `  [${a.time}] ${a.repo} (${a.branch}) - ${a.message}`)
        );
        break;
      case 'languages':
        newHistory.push(
          'Top Stacks:',
          ...data.data.languages.map(l => `  - ${l.name}: ${l.percentage}% (${l.projects} repos)`)
        );
        break;
      case 'stats':
        newHistory.push(
          `Public Repos: ${metrics.repos}`,
          `Total Stars: ${metrics.stars}`,
          `Pull Requests: ${metrics.pull_requests}`,
          `Est. Lines of Code: ${metrics.lines_of_code.toLocaleString()}`,
          `Commit Streak: ${metrics.current_streak} days`
        );
        break;
      case 'insights':
        newHistory.push(
          `Synopsis: ${insights.summary}`,
          `Core Strengths: ${insights.strengths.join(', ')}`,
          `Favorite Tech: ${insights.favorite_tech.join(', ')}`
        );
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        newHistory.push(`bash: command not found: ${terminalInput}. Type "help" for a list of system calls.`);
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  // Render Skeleton Loaders while fetching
  if (isLoading || loadingStep < loadingSequence.length - 1) {
    return (
      <section id="github" className="py-24 px-4 max-w-6xl mx-auto flex flex-col justify-center select-none font-mono-tech">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold tracking-[0.5em] text-brand-cyan uppercase mb-2">INITIALIZING APIS</h2>
          <h1 className="text-4xl md:text-5xl font-black font-orbitron tracking-wider text-white text-hologram">
            ANALYTICS HUB
          </h1>
        </div>

        {/* Loading status panel */}
        <div className="glass-panel rounded-2xl p-8 max-w-lg mx-auto w-full border border-brand-cyan/20 shadow-[0_0_20px_rgba(6,182,212,0.15)] text-xs text-brand-cyan crt-effect mb-8">
          <div className="flex justify-between border-b border-white/5 pb-3 mb-4 font-bold">
            <span>guest@krishna-os:~$ boot_logs</span>
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          </div>
          <div className="space-y-2">
            {loadingSequence.map((step, idx) => {
              const isLogged = idx <= loadingStep;
              return (
                <div key={idx} className={isLogged ? 'text-brand-cyan' : 'text-slate-700'}>
                  {isLogged ? '[ OK ]' : '[WAIT]'} {step}
                </div>
              );
            })}
          </div>
        </div>

        {/* Skeleton grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-30 pointer-events-none animate-pulse">
          <div className="glass-panel h-52 rounded-2xl" />
          <div className="glass-panel h-52 rounded-2xl" />
          <div className="glass-panel h-52 rounded-2xl" />
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section id="github" className="py-24 px-4 max-w-xl mx-auto text-center font-mono-tech select-none">
        <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4 animate-bounce" />
        <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-2">API Connection Failed</h2>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          Failed to establish tunnel pipeline to local server API endpoints. Ensure Python FastAPI is running on port 8000.
        </p>
        <button
          onClick={() => refetch()}
          className="bg-slate-900 border border-white/10 hover:border-brand-cyan/40 text-xs text-slate-300 hover:text-white px-5 py-2.5 rounded-xl transition-all duration-200 interactive"
        >
          Retry Connection
        </button>
      </section>
    );
  }

  const { profile, metrics, languages, pinned, contribution_calendar, activity, commits, analytics, impact, insights, current_project, badges } = data.data;
  const isDemo = data.mode === 'DEMO_MODE' || data.mode === 'RATE_LIMIT_DEMO' || data.mode === 'CLIENT_FALLBACK_DEMO';

  // Format Recharts variables
  const repoChartData = analytics.repo_creation_timeline;
  const starsChartData = analytics.stars_growth;
  const frequencyChartData = analytics.commits_frequency;

  const getChartConfig = () => {
    switch (chartTab) {
      case 'stars':
        return { data: starsChartData, dataKey: 'stars', stroke: '#8B5CF6', fillId: 'colorStars', stopColor: '#8B5CF6' };
      case 'repos':
        return { data: repoChartData, dataKey: 'count', stroke: '#22C55E', fillId: 'colorRepos', stopColor: '#22C55E' };
      case 'commits':
      default:
        return { data: frequencyChartData, dataKey: 'commits', stroke: '#06B6D4', fillId: 'colorCommits', stopColor: '#06B6D4' };
    }
  };

  const chartConfig = getChartConfig();

  return (
    <section id="github" className="py-24 px-4 max-w-6xl mx-auto flex flex-col justify-center select-none pointer-events-auto">
      {/* Dynamic demo mode notification banner */}
      {isDemo && (
        <div className="w-full bg-brand-purple/10 border border-brand-purple/35 rounded-xl px-4 py-2.5 mb-8 flex justify-between items-center text-[10px] font-mono-tech text-brand-purple animate-pulse shadow-[0_0_12px_rgba(139,92,246,0.1)]">
          <span className="flex items-center gap-2">
            <Info className="w-4 h-4" />
            [SYSTEM: DEMO_MODE ACTIVE] Served cached data due to API limits or server configuration.
          </span>
          <button 
            onClick={() => refetch()} 
            className="underline hover:text-white uppercase font-bold interactive"
            disabled={isRefetching}
          >
            {isRefetching ? 'Reloading...' : 'Sync Live'}
          </button>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-xs font-bold tracking-[0.5em] text-brand-cyan uppercase mb-2">INTEGRATED ENDPOINTS</h2>
        <h1 className="text-4xl md:text-5xl font-black font-orbitron tracking-wider text-white text-hologram">
          DEVELOPER HUB
        </h1>
      </div>

      <div className="space-y-8">
        
        {/* ROW 1: Status Spec Card & Live Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Status HUD (lg:col-span-5) */}
          <div className="lg:col-span-5 glass-panel rounded-2xl p-6 glow-border-cyan relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300 pointer-events-none">
              <Cpu className="w-40 h-40 text-white" />
            </div>
            <div className="flex gap-4 items-center mb-6">
              <img src={profile.avatar_url} alt="Avatar" className="w-14 h-14 rounded-xl border border-white/10 shadow-[0_0_10px_rgba(6,182,212,0.2)]" />
              <div>
                <h3 className="text-base font-black font-orbitron text-white tracking-wide">{profile.name}</h3>
                <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="text-xs font-mono-tech text-brand-cyan hover:underline flex items-center gap-1 interactive">
                  @{profile.username}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            
            <div className="space-y-3 font-mono-tech text-[11px] border-b border-white/5 pb-4 mb-4">
              <div className="flex justify-between">
                <span className="text-slate-500">DEVELOPER STATUS:</span>
                <span className="text-brand-green font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-ping" />
                  ACTIVE_PIPELINE
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">LOCATION:</span>
                <span className="text-slate-200">{profile.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">MEMBER SINCE:</span>
                <span className="text-slate-200">{profile.member_since}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">AVAILABILITY:</span>
                <span className="text-brand-cyan font-bold">{profile.availability}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 font-mono-tech text-center">
              <div className="bg-slate-950/45 p-2 rounded-lg border border-white/5">
                <span className="block text-[8px] text-slate-500">FOLLOWERS</span>
                <span className="block text-xs font-bold text-white mt-0.5">{profile.followers}</span>
              </div>
              <div className="bg-slate-950/45 p-2 rounded-lg border border-white/5">
                <span className="block text-[8px] text-slate-500">FOLLOWING</span>
                <span className="block text-xs font-bold text-white mt-0.5">{profile.following}</span>
              </div>
              <div className="bg-slate-950/45 p-2 rounded-lg border border-white/5">
                <span className="block text-[8px] text-slate-500">REPOSITORIES</span>
                <span className="block text-xs font-bold text-brand-purple mt-0.5">{profile.public_repos}</span>
              </div>
            </div>
          </div>

          {/* Stats Matrix Grid (lg:col-span-7) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono-tech">
            <div className="glass-panel rounded-2xl p-4 flex flex-col justify-between border-white/5">
              <span className="text-[8px] text-slate-500 tracking-wider uppercase">Stars Earned</span>
              <h2 className="text-2xl font-black text-white mt-2 text-glow-indigo">
                <CountUp end={metrics.stars} />
              </h2>
            </div>
            <div className="glass-panel rounded-2xl p-4 flex flex-col justify-between border-white/5">
              <span className="text-[8px] text-slate-500 tracking-wider uppercase">Forks cataloged</span>
              <h2 className="text-2xl font-black text-white mt-2 text-glow-indigo">
                <CountUp end={metrics.forks} />
              </h2>
            </div>
            <div className="glass-panel rounded-2xl p-4 flex flex-col justify-between border-white/5">
              <span className="text-[8px] text-slate-500 tracking-wider uppercase">Commits pushed</span>
              <h2 className="text-2xl font-black text-brand-cyan mt-2">
                <CountUp end={metrics.commits} />
              </h2>
            </div>
            <div className="glass-panel rounded-2xl p-4 flex flex-col justify-between border-white/5">
              <span className="text-[8px] text-slate-500 tracking-wider uppercase">Pull requests</span>
              <h2 className="text-2xl font-black text-brand-cyan mt-2">
                <CountUp end={metrics.pull_requests} />
              </h2>
            </div>
            <div className="glass-panel rounded-2xl p-4 flex flex-col justify-between border-white/5">
              <span className="text-[8px] text-slate-500 tracking-wider uppercase">Active Streak</span>
              <h2 className="text-2xl font-black text-brand-green mt-2">
                <CountUp end={metrics.current_streak} suffix="d" />
              </h2>
            </div>
            <div className="glass-panel rounded-2xl p-4 flex flex-col justify-between border-white/5">
              <span className="text-[8px] text-slate-500 tracking-wider uppercase">Longest Streak</span>
              <h2 className="text-2xl font-black text-brand-green mt-2">
                <CountUp end={metrics.longest_streak} suffix="d" />
              </h2>
            </div>
            <div className="glass-panel rounded-2xl p-4 flex flex-col justify-between border-white/5 col-span-2">
              <span className="text-[8px] text-slate-500 tracking-wider uppercase font-bold">Estimated lines of code</span>
              <h2 className="text-2xl font-black text-white mt-2 tracking-wider">
                <CountUp end={metrics.lines_of_code} />
              </h2>
            </div>
          </div>

        </div>

        {/* ROW 2: Pinned Repositories Grid */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2 select-none">
            <Star className="w-4 h-4 text-brand-cyan animate-pulse" />
            <h3 className="text-xs font-bold font-orbitron tracking-widest text-slate-400 uppercase">
              PINNED SOFTWARE MODULES
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pinned.map((repo) => (
              <div key={repo.name} className="glass-panel rounded-2xl p-5 border-white/5 hover:glow-border-cyan transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-base font-bold font-orbitron text-white group-hover:text-brand-cyan transition-colors">
                      {repo.name}
                    </h4>
                    <span className="bg-slate-900 border border-white/5 px-2 py-0.5 rounded text-[8px] font-mono-tech uppercase tracking-wider text-slate-400 font-bold">
                      {repo.language}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4 font-outfit">
                    {repo.description}
                  </p>
                  
                  {/* Topics */}
                  <div className="flex flex-wrap gap-1 mb-5">
                    {repo.topics.map((t) => (
                      <span key={t} className="bg-slate-950/50 border border-white/5 px-1.5 py-0.5 rounded text-[8px] font-mono-tech text-brand-purple">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-3.5 flex justify-between items-center font-mono-tech text-[10px]">
                  <div className="flex gap-3 text-slate-500">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" />
                      {repo.forks}
                    </span>
                  </div>
                  <span className="text-slate-600">Pushed: {repo.updated}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 3: Contribution Heatmap Grid */}
        <div className="glass-panel rounded-2xl p-5 border-white/5 select-none relative overflow-hidden">
          <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
            <Calendar className="w-4 h-4 text-brand-cyan animate-pulse" />
            <h3 className="text-xs font-bold font-orbitron tracking-widest text-slate-400 uppercase">
              CONTRIBUTION HEATMAP PIPELINE
            </h3>
          </div>
          {/* Live contribution calendar grids */}
          <div className="overflow-x-auto pb-2 scrollbar-none">
            <div className="flex gap-[3px] min-w-[850px] justify-between px-2">
              {contribution_calendar.map((week, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-[3px]">
                  {week.contributionDays.map((day, rowIdx) => {
                    const count = day.contributionCount;
                    let colorClass = 'bg-slate-900/60 border-white/5';
                    if (count > 4) {
                      colorClass = 'bg-brand-green border-brand-green/20 shadow-[0_0_6px_rgba(34,197,94,0.4)]';
                    } else if (count > 2) {
                      colorClass = 'bg-brand-cyan/60 border-brand-cyan/20 shadow-[0_0_6px_rgba(6,182,212,0.3)]';
                    } else if (count > 0) {
                      colorClass = 'bg-brand-cyan/25 border-brand-cyan/10';
                    }

                    return (
                      <div
                        key={rowIdx}
                        className={`w-3.5 h-3.5 rounded-sm border transition-colors group relative ${colorClass}`}
                      >
                        {/* Tooltip */}
                        <span className="absolute bottom-6 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all duration-150 origin-bottom px-2 py-0.5 rounded bg-slate-950/95 border border-brand-cyan/25 text-[8px] font-mono-tech text-brand-cyan whitespace-nowrap pointer-events-none z-10 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                          {count} commit{count !== 1 ? 's' : ''} on {day.date}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center text-[9px] font-mono-tech text-slate-500">
            <span>* Past year commit nodes. Glow intensity represents compilation frequencies.</span>
            <div className="flex gap-2 items-center">
              <span>Less</span>
              <div className="flex gap-0.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-slate-900 border border-white/5" />
                <div className="w-2.5 h-2.5 rounded-sm bg-brand-cyan/25 border border-brand-cyan/10" />
                <div className="w-2.5 h-2.5 rounded-sm bg-brand-cyan/60 border border-brand-cyan/20" />
                <div className="w-2.5 h-2.5 rounded-sm bg-brand-green border-brand-green/20" />
              </div>
              <span>More</span>
            </div>
          </div>
        </div>

        {/* ROW 4: RADIAL LANGUAGES & INTEL METRICS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Languages radial cards (lg:col-span-6) */}
          <div className="lg:col-span-6 glass-panel rounded-2xl p-5 border-white/5">
            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-3">
              <Cpu className="w-4 h-4 text-brand-cyan" />
              <h3 className="text-xs font-bold font-orbitron tracking-widest text-slate-400 uppercase">
                TOP CODEBASE LANGUAGES
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4 font-mono-tech text-xs">
              {languages.map((lang) => (
                <div key={lang.name} className="bg-slate-900/40 border border-white/5 p-4 rounded-xl flex items-center justify-between group hover:border-brand-cyan/25 transition-all duration-200">
                  <div>
                    <span className="text-sm font-bold text-white">{lang.name}</span>
                    <span className="block text-[9px] text-slate-500 mt-1 uppercase">
                      {lang.projects} Projects • {lang.recent}
                    </span>
                  </div>
                  {/* Styled Radial Ring */}
                  <div className="relative w-11 h-11 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="22" cy="22" r="18" stroke="rgba(255,255,255,0.03)" strokeWidth="3" fill="transparent" />
                      <circle cx="22" cy="22" r="18" stroke="rgba(6,182,212,0.8)" strokeWidth="3" fill="transparent"
                              strokeDasharray={`${2 * Math.PI * 18}`}
                              strokeDashoffset={`${2 * Math.PI * 18 * (1 - lang.percentage / 100)}`}
                              className="transition-all duration-500 group-hover:stroke-brand-purple" />
                    </svg>
                    <span className="absolute text-[8px] font-bold text-slate-200">{lang.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights HUD (lg:col-span-6) */}
          <div className="lg:col-span-6 glass-panel rounded-2xl p-5 border-white/5 glow-border-purple flex flex-col justify-between crt-effect">
            <div>
              <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
                <Zap className="w-4 h-4 text-brand-purple animate-pulse" />
                <h3 className="text-xs font-bold font-orbitron tracking-widest text-slate-400 uppercase">
                  AI INTEL INSIGHTS
                </h3>
              </div>
              <div className="font-mono-tech text-xs space-y-4">
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase tracking-wider mb-1.5">ANALYTICS SUMMARY</span>
                  <p className="text-slate-300 leading-relaxed font-outfit text-sm">
                    {insights.summary}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase tracking-wider mb-1.5 font-bold">CORE STRENGTHS</span>
                  <div className="flex flex-wrap gap-1.5">
                    {insights.strengths.map((str) => (
                      <span key={str} className="bg-slate-900 border border-white/5 px-2 py-0.5 rounded text-[9px] text-brand-cyan">
                        {str}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-white/5 pt-4 flex justify-between items-center text-[9px] font-mono-tech text-slate-500">
              <span>DEVELOPER RANK: {impact.developer_rank}</span>
              <span>GROWTH: {insights.growth}</span>
            </div>
          </div>

        </div>

        {/* ROW 5: RECHARTS ANALYTICS GRAPHS */}
        <div className="glass-panel rounded-2xl p-5 border-white/5">
          <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-brand-cyan animate-pulse" />
              <h3 className="text-xs font-bold font-orbitron tracking-widest text-slate-400 uppercase">
                DEVELOPER ACTIVITY FREQUENCY & METRICS
              </h3>
            </div>
            {/* Tab switch buttons */}
            <div className="flex gap-2 font-mono-tech text-[10px]">
              <button onClick={() => setChartTab('commits')} className={`px-2.5 py-1 rounded border transition-colors interactive ${chartTab === 'commits' ? 'bg-brand-cyan/20 border-brand-cyan text-white font-bold' : 'bg-slate-900 border-white/5 text-slate-400'}`}>Commits</button>
              <button onClick={() => setChartTab('stars')} className={`px-2.5 py-1 rounded border transition-colors interactive ${chartTab === 'stars' ? 'bg-brand-purple/20 border-brand-purple text-white font-bold' : 'bg-slate-900 border-white/5 text-slate-400'}`}>Stars</button>
              <button onClick={() => setChartTab('repos')} className={`px-2.5 py-1 rounded border transition-colors interactive ${chartTab === 'repos' ? 'bg-brand-green/20 border-brand-green text-white font-bold' : 'bg-slate-900 border-white/5 text-slate-400'}`}>Repos</button>
            </div>
          </div>
          {/* Recharts area chart */}
          <div className="w-full h-56 font-mono-tech text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartConfig.data as any[]} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id={chartConfig.fillId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartConfig.stopColor} stopOpacity={0.25}/>
                    <stop offset="95%" stopColor={chartConfig.stopColor} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey={chartTab === 'commits' ? 'week' : 'month'} stroke="#475569" fontSize={9} tickLine={false} />
                <YAxis stroke="#475569" fontSize={9} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: 'rgba(6,182,212,0.2)', fontSize: '10px' }} />
                <Area type="monotone" dataKey={chartConfig.dataKey} stroke={chartConfig.stroke} strokeWidth={1.5} fillOpacity={1} fill={`url(#${chartConfig.fillId})`} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ROW 6: RECENT ACTIVITY LOGS & ACTIVE PROJECT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Recent Activity stream (lg:col-span-7) */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-5 border-white/5">
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
              <TerminalIcon className="w-4 h-4 text-brand-cyan animate-pulse" />
              <h3 className="text-xs font-bold font-orbitron tracking-widest text-slate-400 uppercase">
                EVENT TIMELINE LOGS
              </h3>
            </div>
            <div className="space-y-3.5 font-mono-tech text-[11px]">
              {activity.slice(0, 4).map((act, idx) => (
                <div key={idx} className="flex gap-2 text-slate-300 leading-relaxed">
                  <Play className="w-3.5 h-3.5 text-brand-cyan shrink-0 mt-0.5 rotate-90" />
                  <p>
                    <span className="text-brand-cyan font-bold">{act.repo}</span>
                    <span className="text-slate-500"> ({act.branch}):</span> {act.message}
                    <span className="text-slate-600 block text-[9px] mt-0.5">{act.time}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Current Active Project (lg:col-span-5) */}
          <div className="lg:col-span-5 glass-panel rounded-2xl p-5 border-white/5 flex flex-col justify-between relative overflow-hidden group">
            <div>
              <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
                <Info className="w-4 h-4 text-brand-green animate-pulse" />
                <h3 className="text-xs font-bold font-orbitron tracking-widest text-slate-400 uppercase">
                  CURRENT ACTIVE PROJECT
                </h3>
              </div>
              <div className="font-mono-tech text-xs space-y-3">
                <div>
                  <h4 className="text-sm font-black text-white">{current_project.name}</h4>
                  <span className="text-[9px] text-brand-green font-medium uppercase">
                    Status: {current_project.status}
                  </span>
                </div>
                <div className="space-y-1 bg-slate-950/45 p-3 rounded-lg border border-white/5">
                  <div className="text-[10px] text-slate-500 uppercase">Last Commit:</div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {current_project.last_commit}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 border-t border-white/5 pt-3.5 flex justify-between items-center text-[9px] font-mono-tech text-slate-500">
              <span>Branch: {current_project.branch}</span>
              <span>Updated: {current_project.updated}</span>
            </div>
          </div>

        </div>

        {/* ROW 6.5: LATEST COMMITS FEED (Section 7) */}
        <div className="glass-panel rounded-2xl p-5 border-white/5 font-mono-tech text-xs">
          <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
            <TerminalIcon className="w-4 h-4 text-brand-purple animate-pulse" />
            <h3 className="text-xs font-bold font-orbitron tracking-widest text-slate-400 uppercase">
              LATEST COMMITS FEED
            </h3>
          </div>
          <div className="space-y-3">
            {commits.map((c) => (
              <div key={c.hash} className="flex justify-between items-start border-b border-white/5 pb-2.5 last:border-0 last:pb-0">
                <div>
                  <span className="text-brand-cyan font-bold">[{c.repo}/{c.branch}]</span>{' '}
                  <span className="text-slate-200">{c.message}</span>
                  <span className="block text-[10px] text-slate-500 mt-1">
                    Author: {c.author} • Files Changed: {c.files_changed}
                  </span>
                </div>
                <span className="text-[10px] text-brand-purple font-semibold bg-slate-900 border border-white/10 px-2 py-0.5 rounded shrink-0">
                  {c.hash}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 6.8: ACHIEVEMENT WALL (Section 12) */}
        <div className="glass-panel rounded-2xl p-5 border-white/5">
          <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
            <Award className="w-4 h-4 text-brand-green animate-pulse" />
            <h3 className="text-xs font-bold font-orbitron tracking-widest text-slate-400 uppercase">
              ACHIEVEMENT WALL
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 font-mono-tech text-center">
            {badges.map((b) => (
              <div key={b.name} className="bg-slate-900/40 border border-white/5 p-3.5 rounded-xl hover:border-brand-green/20 transition-all duration-200 font-mono-tech text-center">
                <span className="block text-xs font-bold text-brand-green uppercase tracking-wide">{b.name}</span>
                <span className="block text-[8px] text-slate-500 mt-1 uppercase font-medium">{b.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 7: INTEGRATED Linux CLI Terminal */}
        <div className="glass-panel-heavy rounded-2xl overflow-hidden border border-brand-cyan/20 shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex flex-col h-[400px] crt-effect">
          <div className="bg-slate-950/65 px-4 py-2.5 border-b border-white/5 flex items-center justify-between">
            <div className="flex gap-2">
              <CircleIcon color="bg-red-500/70" />
              <CircleIcon color="bg-yellow-500/70" />
              <CircleIcon color="bg-green-500/70" />
            </div>
            <span className="text-[9px] font-mono-tech text-slate-500 uppercase tracking-widest flex items-center gap-1.5 select-none">
              <TerminalIcon className="w-3.5 h-3.5 text-brand-cyan" />
              guest@krishna-os: /usr/analytics
            </span>
            <div className="w-12 h-1" />
          </div>

          {/* CLI Logs Screen */}
          <div className="flex-1 overflow-y-auto p-5 font-mono-tech text-xs space-y-2 select-text selection:bg-brand-cyan/35 selection:text-white scrollbar-none">
            {terminalHistory.map((line, idx) => {
              let textClass = 'text-slate-300';
              if (line.startsWith('guest@krishna-os:~$')) textClass = 'text-white font-semibold';
              else if (line.startsWith('Available') || line.startsWith('Pinned') || line.startsWith('Recent')) textClass = 'text-brand-purple font-bold';
              else if (line.includes('ONLINE') || line.includes('Success')) textClass = 'text-brand-green';

              return (
                <div key={idx} className={`${textClass} leading-relaxed whitespace-pre-wrap`}>
                  {line}
                </div>
              );
            })}
            <div ref={terminalBottomRef} />
          </div>

          {/* Prompt */}
          <form
            onSubmit={handleTerminalSubmit}
            className="bg-slate-950/50 px-5 py-3 border-t border-white/5 flex items-center gap-2 font-mono-tech text-xs"
          >
            <span className="text-brand-cyan font-bold select-none">guest@krishna-os:~$</span>
            <input
              type="text"
              value={terminalInput}
              onChange={e => setTerminalInput(e.target.value)}
              placeholder='Type "help" for a list of system calls...'
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-600 tracking-wide font-mono-tech focus:ring-0"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </form>
        </div>

      </div>
    </section>
  );
};

const CircleIcon: React.FC<{ color: string }> = ({ color }) => (
  <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
);
