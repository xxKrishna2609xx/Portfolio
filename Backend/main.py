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

def generate_mock_calendar():
    import datetime
    import random
    start_date = datetime.date.today() - datetime.timedelta(days=371)
    current_date = start_date
    mock_weeks = []
    random.seed(42)
    for _ in range(53):
        week_days = []
        for _ in range(7):
            rand_val = random.random()
            commit_count = 0
            if rand_val > 0.85:
                commit_count = random.randint(3, 6)
            elif rand_val > 0.6:
                commit_count = random.randint(1, 2)
            week_days.append({
                "contributionCount": commit_count,
                "date": current_date.strftime("%Y-%m-%d")
            })
            current_date += datetime.timedelta(days=1)
        mock_weeks.append({"contributionDays": week_days})
    return mock_weeks

# High-Fidelity Mock Database for Failsafe Fallbacks
MOCK_DATA = {
    "contribution_calendar": generate_mock_calendar(),
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

        # Commits search
        commits_search = requests.get(
            f"https://api.github.com/search/commits?q=author:{GITHUB_USERNAME}",
            headers={**headers, "Accept": "application/vnd.github.cloak-preview"},
            timeout=5
        )
        total_commits = MOCK_DATA["metrics"]["commits"]
        if commits_search.status_code == 200:
            total_commits = commits_search.json().get("total_count", total_commits)

        # Pull requests search
        pr_search = requests.get(
            f"https://api.github.com/search/issues?q=author:{GITHUB_USERNAME}+type:pr",
            headers=headers,
            timeout=5
        )
        total_pr = MOCK_DATA["metrics"]["pull_requests"]
        if pr_search.status_code == 200:
            total_pr = pr_search.json().get("total_count", total_pr)

        # Issues search
        issues_search = requests.get(
            f"https://api.github.com/search/issues?q=author:{GITHUB_USERNAME}+type:issue",
            headers=headers,
            timeout=5
        )
        total_issues = MOCK_DATA["metrics"]["issues"]
        if issues_search.status_code == 200:
            total_issues = issues_search.json().get("total_count", total_issues)

        # Pinned Repositories query via GraphQL
        graphql_query = """
        query {
          user(login: "xxKrishna2609xx") {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  name
                  description
                  stargazerCount
                  forkCount
                  primaryLanguage {
                    name
                  }
                  repositoryTopics(first: 5) {
                    nodes {
                      topic {
                        name
                      }
                    }
                  }
                  openIssues: issues(states: OPEN) {
                    totalCount
                  }
                  pushedAt
                }
              }
            }
          }
        }
        """
        pinned_repos = []
        try:
            graphql_res = requests.post(
                "https://api.github.com/graphql",
                headers=headers,
                json={"query": graphql_query},
                timeout=5
            )
            if graphql_res.status_code == 200:
                res_json = graphql_res.json()
                nodes = res_json.get("data", {}).get("user", {}).get("pinnedItems", {}).get("nodes", [])
                for node in nodes:
                    if node:
                        topics = [t.get("topic", {}).get("name") for t in node.get("repositoryTopics", {}).get("nodes", []) if t and t.get("topic", {}).get("name")]
                        pushed_at = node.get("pushedAt", "")
                        time_str = "recently"
                        if pushed_at:
                            time_str = pushed_at[:10]
                        pinned_repos.append({
                            "name": node.get("name"),
                            "description": node.get("description") or "No description provided.",
                            "topics": topics,
                            "language": node.get("primaryLanguage", {}).get("name") or "Markdown",
                            "stars": node.get("stargazerCount", 0),
                            "forks": node.get("forkCount", 0),
                            "issues": node.get("openIssues", {}).get("totalCount", 0),
                            "latest_commit": "Latest changes synced",
                            "updated": time_str
                        })
        except Exception as e:
            print(f"GraphQL pinned items fetch failed: {e}")

        if not pinned_repos:
            for r in repos[:4]:
                pushed_at = r.get("pushed_at", "")
                time_str = "recently"
                if pushed_at:
                    time_str = pushed_at[:10]
                pinned_repos.append({
                    "name": r.get("name"),
                    "description": r.get("description") or "No description provided.",
                    "topics": r.get("topics", []),
                    "language": r.get("language") or "Markdown",
                    "stars": r.get("stargazers_count", 0),
                    "forks": r.get("forks_count", 0),
                    "issues": r.get("open_issues_count", 0),
                    "latest_commit": "Latest changes synced",
                    "updated": time_str
                })

        # Contributions Calendar query via GraphQL
        calendar_query = """
        query {
          user(login: "xxKrishna2609xx") {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
        """
        contributions_count = MOCK_DATA["metrics"]["contributions"]
        current_streak = MOCK_DATA["metrics"]["current_streak"]
        longest_streak = MOCK_DATA["metrics"]["longest_streak"]
        contribution_weeks = []
        try:
            calendar_res = requests.post(
                "https://api.github.com/graphql",
                headers=headers,
                json={"query": calendar_query},
                timeout=5
            )
            if calendar_res.status_code == 200:
                calendar_data = calendar_res.json().get("data", {}).get("user", {}).get("contributionsCollection", {}).get("contributionCalendar", {})
                contributions_count = calendar_data.get("totalContributions", contributions_count)
                
                weeks = calendar_data.get("weeks", [])
                for w in weeks:
                    contribution_weeks.append({
                        "contributionDays": [
                            {
                                "contributionCount": d.get("contributionCount", 0),
                                "date": d.get("date", "")
                            }
                            for d in w.get("contributionDays", [])
                        ]
                    })
                
                days = []
                for w in weeks:
                    for d in w.get("contributionDays", []):
                        days.append(d)
                        
                days.sort(key=lambda x: x.get("date", ""))
                
                # Streak calculation logic
                longest = 0
                temp_streak = 0
                for d in days:
                    count = d.get("contributionCount", 0)
                    if count > 0:
                        temp_streak += 1
                        if temp_streak > longest:
                            longest = temp_streak
                    else:
                        temp_streak = 0
                        
                current = 0
                for d in reversed(days):
                    count = d.get("contributionCount", 0)
                    if count > 0:
                        current += 1
                    else:
                        if current > 0:
                            break
                            
                current_streak = current or current_streak
                longest_streak = longest or longest_streak
        except Exception as e:
            print(f"GraphQL contributions fetch failed: {e}")

        if not contribution_weeks:
            contribution_weeks = generate_mock_calendar()

        # Aggregate live variables from the profile
        total_stars = 0
        total_forks = 0
        total_watchers = 0
        languages_count = {}
        for r in repos:
            total_stars += r.get("stargazers_count", 0)
            total_forks += r.get("forks_count", 0)
            total_watchers += r.get("watchers_count", 0)
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

        total_size = sum(r.get("size", 0) for r in repos)
        lines_of_code = max(1000, total_size * 50)

        # Calculate community & impact scores dynamically
        community_score = min(100, 70 + (total_stars * 1) + (total_forks * 2))
        impact_score = min(100, 65 + (profile.get("followers", 0) * 0.5) + (total_stars * 0.8))

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
                "commits": total_commits,
                "pull_requests": total_pr,
                "issues": total_issues,
                "discussions": MOCK_DATA["metrics"]["discussions"],
                "packages": MOCK_DATA["metrics"]["packages"],
                "contributions": contributions_count,
                "lines_of_code": lines_of_code,
                "current_streak": current_streak,
                "longest_streak": longest_streak
            },
            "languages": formatted_langs,
            "pinned": pinned_repos,
            "contribution_calendar": contribution_weeks,
            "activity": activity,
            "commits": MOCK_DATA["commits"],
            "analytics": MOCK_DATA["analytics"],
            "impact": {
                "stars_received": total_stars,
                "forks": total_forks,
                "watchers": total_watchers,
                "contributors": 3,
                "releases": len([r for r in repos if r.get("has_downloads")]),
                "downloads": 120,
                "community_score": community_score,
                "impact_score": impact_score,
                "developer_rank": "A-Grade Core"
            },
            "insights": MOCK_DATA["insights"],
            "current_project": {
                "name": repos[0].get("name") if repos else "JobGuard-AI",
                "branch": repos[0].get("default_branch") if repos else "main",
                "last_commit": "Latest sync complete",
                "status": "Active Development",
                "updated": "Syncing recently",
                "languages": [repos[0].get("language")] if repos and repos[0].get("language") else ["Python"]
            },
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
