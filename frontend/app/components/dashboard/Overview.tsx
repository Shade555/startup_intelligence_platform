"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";

export default function Overview() {
  const router = useRouter();

  const handleAgentClick = (agent: string) => {
    router.push(`/dashboard?tab=${agent.toLowerCase()} agent`);
  };

  return (
    <div className="flex flex-col w-full h-full pb-10">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <GlassCard className="p-6 !bg-[#131313]/80 hover:!bg-[#1a1a1a]/80 transition-colors cursor-pointer border-[rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-2 mb-4 text-[#a1a1aa] text-sm font-medium">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            Execution
          </div>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-4xl font-bold text-white">61</span>
            <span className="text-sm text-[#71717a]">/100</span>
          </div>
          <div className="text-sm text-[#ef4444]">↓ 17 this week</div>
        </GlassCard>

        <GlassCard className="p-6 !bg-[#131313]/80 hover:!bg-[#1a1a1a]/80 transition-colors cursor-pointer border-[rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-2 mb-4 text-[#a1a1aa] text-sm font-medium">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            Investment readiness
          </div>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-4xl font-bold text-white">54</span>
            <span className="text-sm text-[#71717a]">/100</span>
          </div>
          <div className="text-sm text-[#f43f5e]">3.2 mo runway</div>
        </GlassCard>

        <GlassCard className="p-6 !bg-[#131313]/80 hover:!bg-[#1a1a1a]/80 transition-colors cursor-pointer border-[rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-2 mb-4 text-[#a1a1aa] text-sm font-medium">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
            Market position
          </div>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-3xl font-bold text-white">Mid-tier</span>
          </div>
          <div className="text-sm text-[#fbbf24]">68% saturation</div>
        </GlassCard>
      </div>

      {/* Main Chart Area */}
      <GlassCard className="mb-6 p-6 !bg-[#131313]/80 border-[rgba(255,255,255,0.05)]">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-medium text-white">Execution score, last 4 weeks</h3>
          <span className="text-xs text-[#71717a]">Updates every 6h</span>
        </div>
        
        {/* Animated SVG Line Chart */}
        <div className="w-full h-[200px] relative mt-12 mb-4">
          <svg viewBox="0 0 800 200" className="w-full h-full overflow-visible preserve-3d">
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              d="M 50 150 Q 150 130 250 110 T 450 130 T 600 170 T 750 160"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Chart Grid Lines (Subtle) */}
            <line x1="0" y1="50" x2="800" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <line x1="0" y1="100" x2="800" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <line x1="0" y1="150" x2="800" y2="150" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            
            {/* Current Point Dot */}
            <motion.circle
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.3 }}
              cx="750" cy="160" r="5" fill="#3b82f6"
            />
          </svg>
        </div>
        
        <div className="flex justify-between text-xs text-[#71717a]">
          <span>4 wks ago</span>
          <span>This week</span>
        </div>
      </GlassCard>

      {/* Needs Attention & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GlassCard className="p-6 !bg-[#131313]/80 flex flex-col h-full border-[rgba(255,255,255,0.05)]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-white">Needs your attention</h3>
            <span className="bg-[#ef4444] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">3</span>
          </div>
          
          <div className="flex flex-col gap-4 mb-8 flex-1">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
              <span className="text-sm text-[#e4e4e7] group-hover:text-white transition-colors">Sprint velocity dropped 20%</span>
              <svg className="w-4 h-4 ml-auto text-[#52525b] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </div>
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
              <span className="text-sm text-[#e4e4e7] group-hover:text-white transition-colors">Runway dropped below 4 months</span>
              <svg className="w-4 h-4 ml-auto text-[#52525b] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </div>
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
              <span className="text-sm text-[#e4e4e7] group-hover:text-white transition-colors">Compliance risk detected</span>
              <svg className="w-4 h-4 ml-auto text-[#52525b] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </div>
          </div>
          
          <Button variant="ghost" className="w-full bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.05)] text-[#a1a1aa] hover:text-white">
            View all decisions
          </Button>
        </GlassCard>

        <GlassCard className="p-6 !bg-[#131313]/80 flex flex-col h-full border-[rgba(255,255,255,0.05)]">
          <h3 className="font-bold text-white mb-6">Recent activity</h3>
          <div className="flex flex-col gap-5 flex-1">
            <div className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-md bg-[rgba(255,255,255,0.05)] flex items-center justify-center shrink-0 mt-0.5 border border-[rgba(255,255,255,0.05)]">
                <svg className="w-3.5 h-3.5 text-[#a1a1aa]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-[#e4e4e7]">Riya Kapoor sent you a message</span>
                <span className="text-xs text-[#52525b] mt-0.5">32 min ago</span>
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-md bg-[rgba(255,255,255,0.05)] flex items-center justify-center shrink-0 mt-0.5 border border-[rgba(255,255,255,0.05)]">
                <svg className="w-3.5 h-3.5 text-[#a1a1aa]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-[#e4e4e7]">Weekly Execution Report ready</span>
                <span className="text-xs text-[#52525b] mt-0.5">2h ago</span>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-md bg-[rgba(255,255,255,0.05)] flex items-center justify-center shrink-0 mt-0.5 border border-[rgba(255,255,255,0.05)]">
                <svg className="w-3.5 h-3.5 text-[#a1a1aa]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-[#e4e4e7]">Call with Riya Kapoor scheduled</span>
                <span className="text-xs text-[#52525b] mt-0.5">5h ago</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Footer Agents */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard 
          onClick={() => handleAgentClick('CTO')}
          className="p-4 flex items-center justify-between !bg-[#131313]/80 hover:!bg-[#1a1a1a]/80 transition-colors cursor-pointer group border-[rgba(255,255,255,0.05)]"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#1e293b] flex items-center justify-center text-[#3b82f6] border border-[#3b82f6]/30">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
            </div>
            <span className="font-medium text-sm text-[#e4e4e7]">Ask CTO agent</span>
          </div>
          <svg className="w-4 h-4 text-[#52525b] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
        </GlassCard>

        <GlassCard 
          onClick={() => handleAgentClick('CFO')}
          className="p-4 flex items-center justify-between !bg-[#131313]/80 hover:!bg-[#1a1a1a]/80 transition-colors cursor-pointer group border-[rgba(255,255,255,0.05)]"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#1e293b] flex items-center justify-center text-[#3b82f6] border border-[#3b82f6]/30">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <span className="font-medium text-sm text-[#e4e4e7]">Ask CFO agent</span>
          </div>
          <svg className="w-4 h-4 text-[#52525b] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
        </GlassCard>

        <GlassCard 
          onClick={() => handleAgentClick('COO')}
          className="p-4 flex items-center justify-between !bg-[#131313]/80 hover:!bg-[#1a1a1a]/80 transition-colors cursor-pointer group border-[rgba(255,255,255,0.05)]"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#1e293b] flex items-center justify-center text-[#3b82f6] border border-[#3b82f6]/30">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <span className="font-medium text-sm text-[#e4e4e7]">Ask COO agent</span>
          </div>
          <svg className="w-4 h-4 text-[#52525b] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
        </GlassCard>
      </div>
    </div>
  );
}
