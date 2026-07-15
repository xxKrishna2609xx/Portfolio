export interface ProfileData {
  avatar_url: string;
  username: string;
  name: string;
  bio: string;
  location: string;
  availability: string;
  followers: number;
  following: number;
  public_repos: number;
  member_since: string;
  organizations: string[];
}

export interface MetricStats {
  repos: number;
  followers: number;
  stars: number;
  forks: number;
  commits: number;
  pull_requests: number;
  issues: number;
  discussions: number;
  packages: number;
  contributions: number;
  lines_of_code: number;
  current_streak: number;
  longest_streak: number;
}

export interface LanguageRatio {
  name: string;
  percentage: number;
  projects: number;
  recent: string;
}

export interface PinnedRepo {
  name: string;
  description: string;
  topics: string[];
  language: string;
  stars: number;
  forks: number;
  issues: number;
  latest_commit: string;
  updated: string;
  demo_url?: string;
}

export interface ActivityEvent {
  type: 'push' | 'pr_merge' | 'repo_create';
  repo: string;
  branch: string;
  message: string;
  time: string;
}

export interface CommitFeed {
  hash: string;
  message: string;
  repo: string;
  branch: string;
  time: string;
  files_changed: number;
  author: string;
}

export interface AnalyticTimeline {
  repo_creation_timeline: { month: string; count: number }[];
  stars_growth: { month: string; stars: number }[];
  commits_frequency: { week: string; commits: number }[];
}

export interface ImpactStats {
  stars_received: number;
  forks: number;
  watchers: number;
  contributors: number;
  releases: number;
  downloads: number;
  community_score: number;
  impact_score: number;
  developer_rank: string;
}

export interface AIInsights {
  summary: string;
  active_in: string[];
  strengths: string[];
  favorite_tech: string[];
  growth: string;
}

export interface CurrentProject {
  name: string;
  branch: string;
  last_commit: string;
  status: string;
  updated: string;
  languages: string[];
}

export interface BadgeItem {
  name: string;
  desc: string;
}

export interface DashboardResponse {
  mode: 'LIVE' | 'LIVE_CACHED' | 'RATE_LIMIT_DEMO' | 'DEMO_MODE' | 'CLIENT_FALLBACK_DEMO';
  data: {
    profile: ProfileData;
    metrics: MetricStats;
    languages: LanguageRatio[];
    pinned: PinnedRepo[];
    activity: ActivityEvent[];
    commits: CommitFeed[];
    analytics: AnalyticTimeline;
    impact: ImpactStats;
    insights: AIInsights;
    current_project: CurrentProject;
    badges: BadgeItem[];
  };
}

const CLIENT_MOCK_DATA: DashboardResponse["data"] = {
  profile: {
    avatar_url: "https://avatars.githubusercontent.com/u/144670000?v=4",
    username: "xxKrishna2609xx",
    name: "Krishna Goyal",
    bio: "Backend Developer | AI Engineer | Flutter Developer. Building intelligent software that solves real-world problems.",
    location: "India",
    availability: "Available for Opportunities",
    followers: 32,
    following: 28,
    public_repos: 24,
    member_since: "2023",
    organizations: ["Right Ads Digital"],
  },
  metrics: {
    repos: 24,
    followers: 32,
    stars: 42,
    forks: 12,
    commits: 542,
    pull_requests: 68,
    issues: 15,
    discussions: 4,
    packages: 2,
    contributions: 542,
    lines_of_code: 34800,
    current_streak: 14,
    longest_streak: 42,
  },
  languages: [
    { name: "Python", percentage: 45, projects: 8, recent: "Daily" },
    { name: "Dart", percentage: 30, projects: 5, recent: "Weekly" },
    { name: "TypeScript", percentage: 18, projects: 4, recent: "Weekly" },
    { name: "HTML/CSS", percentage: 7, projects: 7, recent: "Monthly" },
  ],
  pinned: [
    {
      name: "JobGuard-AI",
      description: "Multi-agent LLM framework detecting mock postings and evaluating classification parameters.",
      topics: ["react", "fastapi", "langgraph", "gemini-api", "machine-learning"],
      language: "Python",
      stars: 12,
      forks: 4,
      issues: 0,
      latest_commit: "merge safety verification layers",
      updated: "2 hours ago",
      demo_url: "https://jobguard.krishna.os"
    },
    {
      name: "Business-Listing-Website",
      description: "Enterprise-grade local catalog listing dashboard built for listing moderations and directory queries.",
      topics: ["react", "fastapi", "mongodb", "firebase"],
      language: "TypeScript",
      stars: 9,
      forks: 3,
      issues: 0,
      latest_commit: "optimize admin search routes",
      updated: "1 day ago",
      demo_url: "https://catalog.krishna.os"
    },
    {
      name: "Business-Listing-App",
      description: "Native mobile client for business directories synchronizing databases asynchronously.",
      topics: ["flutter", "dart", "fastapi", "firebase"],
      language: "Dart",
      stars: 7,
      forks: 2,
      issues: 1,
      latest_commit: "bump async client buffers",
      updated: "3 days ago"
    },
    {
      name: "PyClimate-Explorer",
      description: "Meteorological streaming framework projecting NetCDF global thermal heatmaps and datasets.",
      topics: ["python", "streamlit", "plotly", "xarray"],
      language: "Python",
      stars: 6,
      forks: 1,
      issues: 0,
      latest_commit: "refactor coordinates render speeds",
      updated: "1 week ago",
      demo_url: "https://climate.krishna.os"
    }
  ],
  activity: [
    { type: "push", repo: "JobGuard-AI", branch: "main", message: "merge safety verification agent layers", time: "2 hours ago" },
    { type: "pr_merge", repo: "Business-Listing-Website", branch: "main", message: "Merge pull request #14 from admin-dash", time: "1 day ago" },
    { type: "push", repo: "Business-Listing-App", branch: "dev", message: "implement maps cache loading listeners", time: "3 days ago" },
    { type: "repo_create", repo: "PyClimate-Explorer", branch: "main", message: "Initial commit - meteorological grid viewer", time: "1 week ago" }
  ],
  commits: [
    { hash: "e6f42c1", message: "merge safety verification agent layers", repo: "JobGuard-AI", branch: "main", time: "2 hours ago", files_changed: 4, author: "xxKrishna2609xx" },
    { hash: "a4d3f28", message: "integrate shap explainability matrices output", repo: "JobGuard-AI", branch: "main", time: "4 hours ago", files_changed: 7, author: "xxKrishna2609xx" },
    { hash: "d1c2b9a", message: "optimize catalog database index paths", repo: "Business-Listing-Website", branch: "main", time: "1 day ago", files_changed: 2, author: "xxKrishna2609xx" },
    { hash: "b5e6f3d", message: "configure firebase security auth checkers", repo: "Business-Listing-App", branch: "dev", time: "3 days ago", files_changed: 5, author: "xxKrishna2609xx" }
  ],
  analytics: {
    repo_creation_timeline: [
      { month: "Jan", count: 12 },
      { month: "Feb", count: 14 },
      { month: "Mar", count: 16 },
      { month: "Apr", count: 18 },
      { month: "May", count: 21 },
      { month: "Jun", count: 24 }
    ],
    stars_growth: [
      { month: "Jan", stars: 15 },
      { month: "Feb", stars: 22 },
      { month: "Mar", stars: 28 },
      { month: "Apr", stars: 32 },
      { month: "May", stars: 38 },
      { month: "Jun", stars: 42 }
    ],
    commits_frequency: [
      { week: "W1", commits: 12 },
      { week: "W2", commits: 24 },
      { week: "W3", commits: 18 },
      { week: "W4", commits: 32 },
      { week: "W5", commits: 28 },
      { week: "W6", commits: 40 }
    ]
  },
  impact: {
    stars_received: 42,
    forks: 12,
    watchers: 8,
    contributors: 3,
    releases: 4,
    downloads: 120,
    community_score: 94,
    impact_score: 88,
    developer_rank: "A-Grade Core"
  },
  insights: {
    summary: "Krishna is primarily a Backend Developer focused on FastAPI microservices, Flutter mobile catalogs, and AI-engineered workflows.",
    active_in: ["JobGuard AI", "Business Listing Portal", "State Graph Flows", "ML Explainability"],
    strengths: ["Fast API Design", "Asynchronous Pipelines", "Type Safety", "Explainable Model Outputs"],
    favorite_tech: ["FastAPI", "LangGraph", "Flutter", "PyTest", "MongoDB"],
    growth: "Developer output scaled up by 32% since previous log node updates."
  },
  current_project: {
    name: "JobGuard-AI",
    branch: "main",
    last_commit: "merge safety verification agent layers",
    status: "Active Development",
    updated: "2 hours ago",
    languages: ["Python", "JavaScript"]
  },
  badges: [
    { name: "500+ Commits", desc: "High frequency pusher" },
    { name: "Python Expert", desc: "Advanced scripting engines" },
    { name: "FastAPI Developer", desc: "Microservices architect" },
    { name: "Flutter Builder", desc: "Fluid mobile layouts" },
    { name: "AI Graph Orchestrator", desc: "LangGraph multi-agent designer" }
  ]
};

export const fetchGithubDashboard = async (): Promise<DashboardResponse> => {
  try {
    const res = await fetch("http://localhost:8000/api/github/dashboard");
    if (!res.ok) {
      throw new Error("Server response failed");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn("FastAPI offline. Serving client-side failsafe databank:", err);
    return {
      mode: "CLIENT_FALLBACK_DEMO",
      data: CLIENT_MOCK_DATA
    };
  }
};
