Startup Execution Intelligence & Founder Ecosystem Platform

1. Project Overview
An AI-native execution intelligence and founder ecosystem platform designed to validate, monitor, and scale early-stage startups using verified telemetry rather than self-reported pitch materials. The platform automates operational guidance via domain-specific multi-agent roles, provides an objective execution score, and connects founders to a broader entrepreneurial ecosystem.

2. Technology Stack
- Frontend: Next.js, React, Tailwind CSS, Chart.js
- Backend: FastAPI (Python), WebSockets, Celery, Redis
- Storage & Databases:
  - PostgreSQL: Primary relational data (Users, Roles, Startups, Financials, Meetings, Telemetry logs)
  - Qdrant: Vector database (Idea embeddings, document RAG, competitor data)
  - Neo4j: Graph database (Founder-mentor-investor matchmaking and skill graphs)
- AI & ML Architecture:
  - Multi-Agent Orchestration: LangGraph / CrewAI Supervisor Architecture
  - Advisory LLMs: Llama 3.1 8B (QLoRA fine-tuned via Unsloth) and OpenAI GPT models
  - Predictive Analytics: XGBoost (Execution scoring), SHAP (Explainability), Crunchbase Success Predictor
- Telemetry & Integrations: GitHub API, Jira API, static ecosystem datasets (Crunchbase, Product Hunt, Y Combinator directory, OpenAlex)

3. UI & Design System Specifications
- Design Language: Dark Glassmorphic Design System
- Core Surfaces & Neutral Tokens:
  - Base Background: `--background: #0c0c0c`
  - Soft Background: `--background-soft: #111214`
  - Elevated Surface: `--background-elevated: #151619`
  - Subtle Surface: `--background-subtle: #1a1c1f`
  - Glass Card: `rgba(255, 255, 255, 0.045)` with `24px` backdrop blur, `rgba(255, 255, 255, 0.09)` border, and ambient gradient border highlight
  - Typography: Inter, ui-sans-serif; Primary Text `#ffffff`, Secondary Text `#a1a1aa`, Muted Text `#71717a`
- Functional Accent Palette:
  - Success / Execution: Green `#10b981` (Soft BG: `rgba(16, 185, 129, 0.08)`, Border: `rgba(16, 185, 129, 0.18)`)
  - Actions / Alerts: Amber `#f59e0b` (Soft BG: `rgba(245, 158, 11, 0.08)`, Border: `rgba(245, 158, 11, 0.18)`)
  - Insights / Highlights: Yellow `#fbbf24` (Soft BG: `rgba(251, 191, 36, 0.08)`, Border: `rgba(251, 191, 36, 0.18)`)
  - Danger / Blockers: Red `#ef4444` (Soft BG: `rgba(239, 68, 68, 0.08)`, Border: `rgba(239, 68, 68, 0.18)`)
  - Milestones / Metrics: Rose `#f43f5e` (Soft BG: `rgba(244, 63, 94, 0.08)`, Border: `rgba(244, 63, 94, 0.18)`)

4. Core Views & Functionality
- Global Discovery / Home: Multi-startup switcher, Founder DNA test link, upcoming YC/investor events, recommended mentor cards, community activity feed.
- Startup Onboarding Flow: 5-step wizard (Founder profile, AI Discovery chat interview, third-party integrations, financial data input, review and file uploads).
- Executive Dashboard: Execution score widget (0-100), 4-week trendline chart, "Needs Attention" priority triggers, recent activity logs, fast links to CTO/CFO/COO agents.
- Specialized Agent Pages (CTO, CFO, COO): Left-hand live telemetry metric sidebar, priority-sorted event feed cards (High/Medium/Low) with Accept/Dismiss/Discuss actions, and an embedded "Ask Why" chat drawer.
- Matchmaking & Ecosystem: Match cards showing compatibility score percentage, direct messaging threads, and calendar meeting scheduler.
- Reports Center: Auto-generated execution, financial, market landscape, and investor due diligence reports with summary breakdowns and PDF export capability.
- Settings & Workspace: Integrations management (OAuth connectors for GitHub, Jira, Slack), background telemetry polling interval toggles (1h, 6h, daily), team member role assignment, and custom alert thresholds.

