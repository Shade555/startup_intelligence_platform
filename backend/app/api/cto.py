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
        
        # Pull Data
        open_issues = repo.open_issues_count
        stars = repo.stargazers_count
        forks = repo.forks_count
        
        # Analyze recent commits (last 30 days)
        since = datetime.now() - timedelta(days=30)
        commits = repo.get_commits(since=since)
        commit_count = commits.totalCount
        
        # Pull Requests
        pulls = repo.get_pulls(state='open')
        open_prs = pulls.totalCount

        # Generate "CTO Insights"
        tech_debt_score = min(100, (open_issues * 2) + (open_prs * 3))
        velocity_score = min(100, (commit_count / 30.0) * 10)  # simple metric
        
        insights = []
        if commit_count < 10:
            insights.append("Low development velocity detected in the last 30 days. Consider unblocking developers.")
        else:
            insights.append(f"Healthy commit velocity ({commit_count} commits this month).")
            
        if open_issues > 20:
            insights.append(f"High number of open issues ({open_issues}). Tech debt might be accumulating.")
            
        if open_prs > 5:
            insights.append(f"There are {open_prs} open PRs. Code reviews might be bottlenecking the pipeline.")

        return {
            "repository": repo.full_name,
            "metrics": {
                "open_issues": open_issues,
                "open_prs": open_prs,
                "recent_commits_30d": commit_count,
                "stars": stars,
                "forks": forks,
            },
            "cto_scores": {
                "tech_debt_risk": tech_debt_score,
                "developer_velocity": round(velocity_score, 1)
            },
            "ai_insights": insights
        }

    except GithubException as e:
        raise HTTPException(status_code=400, detail=f"GitHub API Error: {e.data.get('message', str(e))}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
