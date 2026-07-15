import os
import time
import requests
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI(title="KRISHNA OS GitHub API Core", version="1.0.0")

# Enable CORS for local Frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GITHUB_PAT = os.getenv("GITHUB_PAT")
GITHUB_USERNAME = "xxKrishna2609xx"

# In-Memory Cache parameters
CACHE = {}
CACHE_TTL = 600  # 10 minutes cache duration

# High-Fidelity Mock Database for Failsafe Fallbacks
MOCK_DATA = {
    "profile": {
        "avatar_url": "https://avatars.githubusercontent.com/u/144670000?v=4",
        "username": GITHUB_USERNAME,
        "name": "Krishna Goyal",
        "bio": "Backend Developer | AI Engineer | Flutter Developer. Building intelligent software that solves real-world problems.",
        "location": "India",
        "availability": "Available for Opportunities",
        "followers": 32,
        "following": 28,
        "public_repos": 24,
        "member_since": "Sep 2023",
        "organizations": ["Right Ads Digital"],
    },
    "metrics": {
        "repos": 24,
        "followers": 32,
        "stars": 42,
        "forks": 12,
        "commits": 542,
        "pull_requests": 68,
        "issues": 15,
        "discussions": 4,
        "packages": 2,
        "contributions": 542,
        "lines_of_code": 34800,
        "current_streak": 14,
        "longest_streak": 42,
    },
    "languages": [
        {"name": "Python", "percentage": 45, "projects": 8, "recent": "Daily"},
        {"name": "Dart", "percentage": 30, "projects": 5, "recent": "Weekly"},
        {"name": "TypeScript", "percentage": 18, "projects": 4, "recent": "Weekly"},
        {"name": "HTML/CSS", "percentage": 7, "projects": 7, "recent": "Monthly"},
    ],
    "pinned": [
        {
            "name": "JobGuard-AI",
            "description": "Multi-agent LLM framework detecting mock postings and evaluating classification parameters.",
            "topics": ["react", "fastapi", "langgraph", "gemini-api", "machine-learning"],
            "language": "Python",
            "stars": 12,
            "forks": 4,
            "issues": 0,
            "latest_commit": "merge multi-agent safety checks",
            "updated": "2 hours ago",
            "demo_url": "https://jobguard.krishna.os"
        },
        {
            "name": "Business-Listing-Website",
            "description": "Enterprise-grade local catalog listing dashboard built for listing moderations and directory queries.",
            "topics": ["react", "fastapi", "mongodb", "firebase"],
            "language": "TypeScript",
            "stars": 9,
            "forks": 3,
            "issues": 0,
            "latest_commit": "optimize admin search routes",
            "updated": "1 day ago",
            "demo_url": "https://catalog.krishna.os"
        },
        {
            "name": "Business-Listing-App",
            "description": "Native mobile client for business directories synchronizing databases asynchronously.",
            "topics": ["flutter", "dart", "fastapi", "firebase"],
            "language": "Dart",
            "stars": 7,
            "forks": 2,
            "issues": 1,
            "latest_commit": "bump async client buffers",
            "updated": "3 days ago"
        },
        {
            "name": "PyClimate-Explorer",
            "description": "Meteorological streaming framework projecting NetCDF global thermal heatmaps and datasets.",
            "topics": ["python", "streamlit", "plotly", "xarray"],
            "language": "Python",
            "stars": 6,
            "forks": 1,
            "issues": 0,
            "latest_commit": "refactor coordinates render speeds",
            "updated": "1 week ago",
            "demo_url": "https://climate.krishna.os"
        }
    ],
    "activity": [
        {"type": "push", "repo": "JobGuard-AI", "branch": "main", "message": "merge safety verification agent layers", "time": "2 hours ago"},
        {"type": "pr_merge", "repo": "Business-Listing-Website", "branch": "main", "message": "Merge pull request #14 from admin-dash", "time": "1 day ago"},
        {"type": "push", "repo": "Business-Listing-App", "branch": "dev", "message": "implement maps cache loading listeners", "time": "3 days ago"},
        {"type": "repo_create", "repo": "PyClimate-Explorer", "branch": "main", "message": "Initial commit - meteorological grid viewer", "time": "1 week ago"}
    ],
    "commits": [
        {"hash": "e6f42c1", "message": "merge safety verification agent layers", "repo": "JobGuard-AI", "branch": "main", "time": "2 hours ago", "files_changed": 4, "author": "xxKrishna2609xx"},
        {"hash": "a4d3f28", "message": "integrate shap explainability matrices output", "repo": "JobGuard-AI", "branch": "main", "time": "4 hours ago", "files_changed": 7, "author": "xxKrishna2609xx"},
        {"hash": "d1c2b9a", "message": "optimize catalog database index paths", "repo": "Business-Listing-Website", "branch": "main", "time": "1 day ago", "files_changed": 2, "author": "xxKrishna2609xx"},
        {"hash": "b5e6f3d", "message": "configure firebase security auth checkers", "repo": "Business-Listing-App", "branch": "dev", "time": "3 days ago", "files_changed": 5, "author": "xxKrishna2609xx"}
    ],
    "analytics": {
        "repo_creation_timeline": [
            {"month": "Jan", "count": 12},
            {"month": "Feb", "count": 14},
            {"month": "Mar", "count": 16},
            {"month": "Apr", "count": 18},
            {"month": "May", "count": 21},
            {"month": "Jun", "count": 24}
        ],
        "stars_growth": [
            {"month": "Jan", "stars": 15},
            {"month": "Feb", "stars": 22},
            {"month": "Mar", "stars": 28},
            {"month": "Apr", "stars": 32},
            {"month": "May", "stars": 38},
            {"month": "Jun", "stars": 42}
        ],
        "commits_frequency": [
            {"week": "W1", "commits": 12},
            {"week": "W2", "commits": 24},
            {"week": "W3", "commits": 18},
            {"week": "W4", "commits": 32},
            {"week": "W5", "commits": 28},
            {"week": "W6", "commits": 40}
        ]
    },
    "impact": {
        "stars_received": 42,
        "forks": 12,
        "watchers": 8,
        "contributors": 3,
        "releases": 4,
        "downloads": 120,
        "community_score": 94,
        "impact_score": 88,
        "developer_rank": "A-Grade Core"
    },
    "insights": {
        "summary": "Krishna is primarily a Backend Developer focused on FastAPI microservices, Flutter mobile catalogs, and AI-engineered workflows.",
        "active_in": ["JobGuard AI", "Business Listing Portal", "State Graph Flows", "ML Explainability"],
        "strengths": ["Fast API Design", "Asynchronous Pipelines", "Type Safety", "Explainable Model Outputs"],
        "favorite_tech": ["FastAPI", "LangGraph", "Flutter", "PyTest", "MongoDB"],
        "growth": "Developer output scaled up by 32% since previous log node updates."
    },
    "current_project": {
        "name": "JobGuard-AI",
        "branch": "main",
        "last_commit": "merge safety verification agent layers",
        "status": "Active Development",
        "updated": "2 hours ago",
        "languages": ["Python", "JavaScript"]
    },
    "badges": [
        {"name": "500+ Commits", "desc": "High frequency pusher"},
        {"name": "Python Expert", "desc": "Advanced scripting engines"},
        {"name": "FastAPI Developer", "desc": "Microservices architect"},
        {"name": "Flutter Builder", "desc": "Fluid mobile layouts"},
        {"name": "AI Graph Orchestrator", "desc": "LangGraph multi-agent designer"}
    ]
}

# Helper to load cached metrics
def get_cache(key: str):
    if key in CACHE:
        val, ts = CACHE[key]
        if time.time() - ts < CACHE_TTL:
            return val
    return None

def set_cache(key: str, val):
    CACHE[key] = (val, time.time())

@app.get("/api/github/dashboard")
def fetch_github_dashboard():
    # If no PAT is set, immediately serve high-fidelity mock data (offline/demo mode)
    if not GITHUB_PAT:
        return {"mode": "DEMO_MODE", "data": MOCK_DATA}

    cached = get_cache("dashboard_data")
    if cached:
        return {"mode": "LIVE_CACHED", "data": cached}

    # Fetch live data from GitHub API
    headers = {"Authorization": f"token {GITHUB_PAT}"}
    try:
        # Profile fetch
        profile_res = requests.get(f"https://api.github.com/users/{GITHUB_USERNAME}", headers=headers, timeout=5)
        if profile_res.status_code != 200:
            raise Exception("Failed profile fetch")
        profile = profile_res.json()

        # Repos fetch
        repos_res = requests.get(f"https://api.github.com/users/{GITHUB_USERNAME}/repos?per_page=100&sort=updated", headers=headers, timeout=5)
        if repos_res.status_code != 200:
            raise Exception("Failed repos fetch")
        repos = repos_res.json()

        # Events fetch
        events_res = requests.get(f"https://api.github.com/users/{GITHUB_USERNAME}/events", headers=headers, timeout=5)
        if events_res.status_code != 200:
            raise Exception("Failed events fetch")
        events = events_res.json()

        # Aggregate live variables from the profile
        total_stars = 0
        total_forks = 0
        languages_count = {}
        for r in repos:
            total_stars += r.get("stargazers_count", 0)
            total_forks += r.get("forks_count", 0)
            lang = r.get("language")
            if lang:
                languages_count[lang] = languages_count.get(lang, 0) + 1

        # Format Top Languages percentages
        total_lang_repos = sum(languages_count.values())
        formatted_langs = []
        if total_lang_repos > 0:
            formatted_langs = [
                {
                    "name": k,
                    "percentage": int((v / total_lang_repos) * 100),
                    "projects": v,
                    "recent": "Weekly" if k in ["TypeScript", "Dart"] else "Daily"
                }
                for k, v in sorted(languages_count.items(), key=lambda item: item[1], reverse=True)[:4]
            ]
        else:
            formatted_langs = MOCK_DATA["languages"]

        # Format events into activity logs
        activity = []
        for e in events[:5]:
            repo_name = e.get("repo", {}).get("name", "").replace(f"{GITHUB_USERNAME}/", "")
            event_type = e.get("type", "")
            commits = e.get("payload", {}).get("commits", [])
            msg = commits[0].get("message", "") if commits else f"Activity type: {event_type}"
            
            activity.append({
                "type": "push" if event_type == "PushEvent" else "create",
                "repo": repo_name,
                "branch": e.get("payload", {}).get("ref", "main").replace("refs/heads/", ""),
                "message": msg,
                "time": "Just now"
            })

        if not activity:
            activity = MOCK_DATA["activity"]

        # Merge fetched live statistics with premium mock visuals (like the heatmap / charts)
        live_dataset = {
            "profile": {
                "avatar_url": profile.get("avatar_url"),
                "username": GITHUB_USERNAME,
                "name": profile.get("name") or "Krishna Goyal",
                "bio": profile.get("bio") or MOCK_DATA["profile"]["bio"],
                "location": profile.get("location") or "India",
                "availability": "Available for Opportunities",
                "followers": profile.get("followers", 32),
                "following": profile.get("following", 28),
                "public_repos": profile.get("public_repos", 24),
                "member_since": profile.get("created_at")[:4] if profile.get("created_at") else "2023",
                "organizations": MOCK_DATA["profile"]["organizations"]
            },
            "metrics": {
                "repos": profile.get("public_repos", 24),
                "followers": profile.get("followers", 32),
                "stars": total_stars or MOCK_DATA["metrics"]["stars"],
                "forks": total_forks or MOCK_DATA["metrics"]["forks"],
                "commits": MOCK_DATA["metrics"]["commits"],  # Requires massive paginated requests, fallback used
                "pull_requests": MOCK_DATA["metrics"]["pull_requests"],
                "issues": MOCK_DATA["metrics"]["issues"],
                "discussions": MOCK_DATA["metrics"]["discussions"],
                "packages": MOCK_DATA["metrics"]["packages"],
                "contributions": MOCK_DATA["metrics"]["contributions"],
                "lines_of_code": MOCK_DATA["metrics"]["lines_of_code"],
                "current_streak": MOCK_DATA["metrics"]["current_streak"],
                "longest_streak": MOCK_DATA["metrics"]["longest_streak"]
            },
            "languages": formatted_langs,
            "pinned": MOCK_DATA["pinned"],  # Pinned items require specific GraphQL node mapping, merge mockup
            "activity": activity,
            "commits": MOCK_DATA["commits"],
            "analytics": MOCK_DATA["analytics"],
            "impact": MOCK_DATA["impact"],
            "insights": MOCK_DATA["insights"],
            "current_project": MOCK_DATA["current_project"],
            "badges": MOCK_DATA["badges"]
        }

        set_cache("dashboard_data", live_dataset)
        return {"mode": "LIVE", "data": live_dataset}

    except Exception as err:
        # Failsafe fallback on rate limit / api errors
        print(f"GitHub API Error: {err}. Serving cached mock databank.")
        return {"mode": "RATE_LIMIT_DEMO", "data": MOCK_DATA}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
