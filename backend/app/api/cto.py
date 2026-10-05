from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
from github import Github
from github.GithubException import GithubException
from datetime import datetime, timedelta

router = APIRouter()

class RepoInsightRequest(BaseModel):
    repo_name: str  # Format: "owner/repo"

@router.post("/analyze")
def analyze_github_repo(request: RepoInsightRequest, x_github_token: str = Header(None)):
    if not x_github_token:
        raise HTTPException(status_code=401, detail="GitHub Token (x-github-token) header is missing")
    
    try:
        # Initialize GitHub client
        g = Github(x_github_token)
        repo = g.get_repo(request.repo_name)
        
        # Safe Data Pulls
        open_issues = repo.open_issues_count
        stars = repo.stargazers_count
        forks = repo.forks_count
        
        # Analyze recent commits safely (avoid totalCount which paginates forever)
        since = datetime.now() - timedelta(days=30)
        commits = repo.get_commits(since=since)
        
        # Fetch up to 50 commits to avoid rate limits/timeouts
        commit_count = 0
        for _ in commits[:50]:
            commit_count += 1
            
        # Pull Requests safely
        pulls = repo.get_pulls(state='open')
        open_prs = 0
        for _ in pulls[:50]:
            open_prs += 1

        # Languages
        langs = repo.get_languages()
        top_language = max(langs, key=langs.get) if langs else "Unknown"
        
        last_updated = "Unknown"
        if repo.updated_at:
            last_updated = repo.updated_at.strftime("%Y-%m-%d %H:%M")

        # Generate "CTO Insights"
        tech_debt_score = min(100, (open_issues * 2) + (open_prs * 3))
        velocity_score = min(100, (commit_count / 30.0) * 10)
        
        insights = []
        if commit_count < 10:
            insights.append("Critical: Low development velocity detected in the last 30 days. Consider unblocking developers.")
        else:
            insights.append(f"Healthy commit velocity ({commit_count}+ commits this month).")
            
        if open_issues > 20:
            insights.append(f"Warning: High number of open issues ({open_issues}). Tech debt might be accumulating.")
            
        if open_prs > 5:
            insights.append(f"Action Required: There are {open_prs}+ open PRs. Code reviews might be bottlenecking.")

        return {
            "repository": repo.full_name,
            "metrics": {
                "open_issues": open_issues,
                "open_prs": open_prs,
                "recent_commits_30d": commit_count,
                "stars": stars,
                "forks": forks,
                "top_language": top_language,
                "last_updated": last_updated
            },
            "cto_scores": {
                "tech_debt_risk": tech_debt_score,
                "developer_velocity": round(velocity_score, 1)
            },
            "ai_insights": insights
        }

    except GithubException as e:
        err_msg = str(e)
        if hasattr(e, 'data') and isinstance(e.data, dict):
            err_msg = e.data.get('message', str(e))
        raise HTTPException(status_code=400, detail=f"GitHub API Error: {err_msg}")
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Internal CTO Error: {str(e)}")
