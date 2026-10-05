"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface AgentViewProps {
  agent: "CTO" | "CFO" | "COO";
}

const AGENT_DATA: Record<string, any> = {
  CTO: {
    telemetry: {
      title1: "Commits (7d)", val1: "34",
      title2: "Open P1 issues", val2: "3", color2: "text-[#ef4444]",
      title3: "Sprint velocity", val3: "-20%", color3: "text-[#ef4444]"
    },
    score: { label: "Execution score", value: "61", max: "/100", bg: "bg-[#0f172a]" }, // Deep blue
    high: {
      title: "Sprint velocity dropped 20%",
      time: "2h ago",
      desc: "3 P1 issues open, auth bug blocks 2 dependent tickets. Recommend delaying launch by 4 days.",
      meta: "34 commits | #142, #146",
      buttons: ["Delay launch 4 days"],
      actions: ["Ignore", "Discuss"]
    },
    medium: {
      title: "No commits in 3 days on core repo",
      time: "1d ago",
      desc: "Activity paused since Thursday. Worth checking if the team is blocked.",
      actions: ["Mark reviewed", "Discuss"]
    },
    low: "Weekly check completed · no anomalies · 3d ago",
    chatInit: {
      trigger: "Re: Sprint velocity dropped 20%",
      messages: [
        { role: "user", text: "Why 4 days specifically?" },
        { role: "agent", text: "Based on your team's average issue-resolution rate (0.75/day), clearing 3 P1s takes ~4 days at current pace." }
      ]
    }
  },
  CFO: {
    telemetry: {
      title1: "Runway", val1: "3.2 months", color1: "text-[#ef4444]",
      title2: "Monthly burn", val2: "₹9.2L",
      title3: "MRR", val3: "₹1.4L"
    },
    score: { label: "Investment readiness", value: "54", max: "/100", bg: "bg-[#0f172a]" },
    high: {
      title: "Runway dropped below 4 months",
      time: "3h ago",
      desc: "Burn increased 15% this week with no matching revenue growth. At current pace, funds run out in 3.2 months. Recommend starting investor outreach now.",
      meta: "burn: ₹9.2L/mo | MRR: ₹1.4L",
      buttons: ["Start investor outreach", "Cut costs instead"],
      actions: ["Ignore"]
    },
    medium: {
      title: "Hiring plan exceeds current runway",
      time: "1d ago",
      desc: "Adding 1 dev hire as planned would cut runway to 2.1 months. Consider delaying hire until next funding round.",
      actions: ["Delay hire", "Keep plan"]
    },
    low: "Weekly financial review completed · logged · 3d ago",
    chatInit: {
      trigger: "Re: Runway dropped below 4 months",
      messages: [
        { role: "user", text: "What's driving the 15% burn increase?" },
        { role: "agent", text: "Server costs spiked by 40% (AWS) and new software licenses added ₹1.2L this month." }
      ]
    }
  },
  COO: {
    telemetry: {
      title1: "Market saturation", val1: "68%", color1: "text-[#fbbf24]",
      title2: "Tracked competitors", val2: "12",
      title3: "Compliance status", val3: "1 flag", color3: "text-[#f43f5e]"
    },
    score: { label: "Market position", value: "Mid-tier", max: "", bg: "bg-[#0f172a]" },
    high: {
      title: "Compliance risk detected",
      time: "4h ago",
      desc: "Your data storage practices may not meet regional data protection requirements for your target market. Recommend legal review before expansion.",
      meta: "flagged: data storage clause",
      buttons: ["Schedule legal review"],
      actions: ["Ignore"]
    },
    medium: {
      title: "Competitor raised funding",
      time: "1d ago",
      desc: "A close competitor closed a seed round this week. Market saturation in your segment is now at 68%, up from 61%. Consider differentiating your positioning.",
      actions: ["View competitor analysis", "Dismiss"]
    },
    low: "Weekly market scan completed · no new entrants · 2d ago",
    chatInit: {
      trigger: "Re: Compliance risk detected",
      messages: [
        { role: "user", text: "Which region is affected?" },
        { role: "agent", text: "EU (GDPR). We need to verify if our database backups are physically stored within the EU region." }
      ]
    }
  }
};

export default function AgentView({ agent }: AgentViewProps) {
  const router = useRouter();
  const [chatInput, setChatInput] = useState("");
  
  // Dynamic CTO Data State
  const [dynamicData, setDynamicData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (agent === "CTO") {
      const token = localStorage.getItem("github_token");
      const repo = localStorage.getItem("github_repo");
      
      if (token && repo) {
        setIsLoading(true);
        fetch("/api/cto", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ github_token: token, repo_name: repo })
        })
        .then(res => res.json())
        .then(resData => {
          if (resData.error) throw new Error(resData.error);
          setDynamicData(resData);
        })
        .catch(err => setError(err.message))
        .finally(() => setIsLoading(false));
      }
    }
  }, [agent]);

  let data = AGENT_DATA[agent];

  // Merge dynamic data for CTO
  if (agent === "CTO" && dynamicData) {
    data = {
      ...data,
      telemetry: {
        title1: "Recent Commits", val1: dynamicData.metrics.recent_commits_30d.toString(), color1: "text-[#10b981]",
        title2: "Open PRs", val2: dynamicData.metrics.open_prs.toString(), color2: dynamicData.metrics.open_prs > 5 ? "text-[#fbbf24]" : "text-[#10b981]",
        title3: "Top Language", val3: dynamicData.metrics.top_language || "Unknown", color3: "text-[#3b82f6]"
      },
      score: { label: "Developer Velocity", value: dynamicData.cto_scores.developer_velocity.toString(), max: "/100", bg: "bg-[#0f172a]" },
      high: {
        title: `Tech Debt Risk: ${dynamicData.cto_scores.tech_debt_risk}%`,
        time: "Just now",
        desc: dynamicData.ai_insights.find((i: string) => i.startsWith("Critical")) || dynamicData.ai_insights[0] || "No critical issues detected.",
        meta: `${dynamicData.metrics.open_issues} Open Issues`,
        buttons: ["Review Issues"],
        actions: ["Ignore"]
      },
      medium: {
         title: `Active Pipeline bottlenecks`,
         time: "Just now",
         desc: dynamicData.ai_insights.find((i: string) => i.startsWith("Action Required")) || `Repository currently has ${dynamicData.metrics.open_prs} open PRs waiting for review.`,
         actions: ["View PRs", "Dismiss"]
      },
      low: `Repo ${dynamicData.repository} synced. Last updated on ${dynamicData.metrics.last_updated}`
    }
  }

  const handleAgentSwitch = (newAgent: string) => {
    router.push(`/dashboard?tab=${newAgent.toLowerCase()} agent`);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full h-full pb-10">
      {/* LEFT COLUMN: Context */}
      <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-4">
        {/* Agents List */}
        <GlassCard className="p-2 !bg-[#131313]/80 border-[rgba(255,255,255,0.05)]">
          <div className="px-3 py-2 text-xs text-[#71717a] font-medium uppercase tracking-wider mb-1">Agents</div>
          
          <button 
            onClick={() => handleAgentSwitch('CTO')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${agent === 'CTO' ? 'bg-[#0f172a] text-white' : 'text-[#a1a1aa] hover:bg-[rgba(255,255,255,0.03)] hover:text-white'}`}
          >
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
              <span className="text-sm font-medium">CTO agent</span>
            </div>
            {agent === 'CTO' && <span className="bg-[#ef4444] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">2</span>}
          </button>
          
          <button 
            onClick={() => handleAgentSwitch('CFO')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors mt-1 ${agent === 'CFO' ? 'bg-[#0f172a] text-white' : 'text-[#a1a1aa] hover:bg-[rgba(255,255,255,0.03)] hover:text-white'}`}
          >
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span className="text-sm font-medium">CFO agent</span>
            </div>
            {agent === 'CFO' && <span className="bg-[#f43f5e] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">1</span>}
          </button>
          
          <button 
            onClick={() => handleAgentSwitch('COO')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors mt-1 ${agent === 'COO' ? 'bg-[#0f172a] text-white' : 'text-[#a1a1aa] hover:bg-[rgba(255,255,255,0.03)] hover:text-white'}`}
          >
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <span className="text-sm font-medium">COO agent</span>
            </div>
            {agent === 'COO' && <span className="bg-[#fbbf24] text-[#0c0c0c] text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">2</span>}
          </button>
        </GlassCard>

        {/* Live Telemetry */}
        <GlassCard className="p-5 !bg-[#131313]/80 border-[rgba(255,255,255,0.05)]">
          <div className="text-xs text-[#71717a] font-medium mb-5">Live telemetry</div>
          
          <div className="flex flex-col gap-5">
            <div>
              <div className="text-xs text-[#a1a1aa] mb-1">{data.telemetry.title1}</div>
              <div className={`text-xl font-bold ${data.telemetry.color1 || "text-white"}`}>{data.telemetry.val1}</div>
            </div>
            <div>
              <div className="text-xs text-[#a1a1aa] mb-1">{data.telemetry.title2}</div>
              <div className={`text-xl font-bold ${data.telemetry.color2 || "text-white"}`}>{data.telemetry.val2}</div>
            </div>
            <div>
              <div className="text-xs text-[#a1a1aa] mb-1">{data.telemetry.title3}</div>
              <div className={`text-xl font-bold ${data.telemetry.color3 || "text-white"}`}>{data.telemetry.val3}</div>
            </div>
          </div>
        </GlassCard>

        {/* Score Block */}
        <GlassCard className={`p-5 ${data.score.bg} border-[rgba(255,255,255,0.05)]`}>
          <div className="text-xs text-[#a1a1aa] mb-2">{data.score.label}</div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-white">{data.score.value}</span>
            <span className="text-sm text-[#71717a]">{data.score.max}</span>
          </div>
        </GlassCard>
      </div>

      {/* MIDDLE COLUMN: Priority Inbox */}
      <div className="flex-1 flex flex-col gap-6 max-w-[500px]">
        <div className="flex justify-end text-xs text-[#71717a] pb-2 border-b border-[rgba(255,255,255,0.05)]">
          Sorted by priority
        </div>

        {/* High Priority */}
        <div>
          <div className="text-xs font-bold text-[#ef4444] uppercase tracking-wider mb-3">High Priority</div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border-l-2 border-[#ef4444] bg-[#1a1a1a] p-5 shadow-lg relative overflow-hidden"
          >
            {/* Subtle glow behind card */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[rgba(239,68,68,0.1)] to-transparent pointer-events-none" />
            
            <div className="flex items-start justify-between mb-3 relative z-10">
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 rounded-full bg-[#ef4444]/20 flex items-center justify-center mt-0.5 shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                </div>
                <h3 className="font-semibold text-[#ef4444] text-sm leading-tight">{data.high.title}</h3>
              </div>
              <span className="text-xs text-[#71717a] whitespace-nowrap ml-4">{data.high.time}</span>
            </div>
            
            <p className="text-sm text-[#e4e4e7] mb-4 leading-relaxed relative z-10">{data.high.desc}</p>
            
            {data.high.meta && (
              <div className="text-xs text-[#a1a1aa] mb-5 relative z-10 flex gap-4">
                <span>{data.high.meta}</span>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2 relative z-10">
              {data.high.buttons?.map((btn: string) => (
                <button key={btn} className="bg-[#f87171] hover:bg-[#ef4444] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                  {btn}
                </button>
              ))}
              {data.high.actions?.map((act: string) => (
                <button key={act} className="bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] text-[#e4e4e7] text-xs font-medium px-4 py-2 rounded-lg transition-colors">
                  {act}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Medium Priority */}
        <div>
          <div className="text-xs font-bold text-[#fbbf24] uppercase tracking-wider mb-3">Medium Priority</div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border-l-2 border-[#fbbf24] bg-[#1a1a1a] p-5 shadow-lg relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[rgba(251,191,36,0.05)] to-transparent pointer-events-none" />
            
            <div className="flex items-start justify-between mb-3 relative z-10">
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 rounded-full bg-[#fbbf24]/20 flex items-center justify-center mt-0.5 shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />
                </div>
                <h3 className="font-semibold text-[#fbbf24] text-sm leading-tight">{data.medium.title}</h3>
              </div>
              <span className="text-xs text-[#71717a] whitespace-nowrap ml-4">{data.medium.time}</span>
            </div>
            
            <p className="text-sm text-[#e4e4e7] mb-5 leading-relaxed relative z-10">{data.medium.desc}</p>
            
            <div className="flex flex-wrap gap-2 relative z-10">
              {data.medium.actions?.map((act: string) => (
                <button key={act} className="bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] text-[#e4e4e7] text-xs font-medium px-4 py-2 rounded-lg transition-colors">
                  {act}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Low Priority */}
        <div>
          <div className="text-xs font-bold text-[#71717a] uppercase tracking-wider mb-3">Low Priority</div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl bg-[#1a1a1a] p-4 flex items-center gap-3 border border-[rgba(255,255,255,0.03)]"
          >
            <div className="w-5 h-5 rounded bg-[rgba(255,255,255,0.05)] flex items-center justify-center shrink-0">
              <svg className="w-3 h-3 text-[#71717a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
            </div>
            <span className="text-sm text-[#a1a1aa]">{data.low}</span>
          </motion.div>
        </div>
      </div>

      </div>);}

