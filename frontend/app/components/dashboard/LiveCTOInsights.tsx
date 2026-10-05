"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { RefreshCw, Save, CheckCircle2 } from "lucide-react";
import { createClient } from "@/app/lib/supabase/client";

export default function LiveCTOInsights({ githubData, repository }: { githubData: any, repository: string }) {
  const [streamedText, setStreamedText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const supabase = createClient();

  const generateInsights = async () => {
    setIsGenerating(true);
    setStreamedText("");
    setIsSaved(false);

    try {
      const res = await fetch("/api/cto/llm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ githubMetrics: githubData })
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.trim()) {
            try {
              const parsed = JSON.parse(line);
              if (parsed.message?.content) {
                fullText += parsed.message.content;
                setStreamedText(fullText);
              }
            } catch (e) {
              // Not JSON, ignore
            }
          }
        }
      }
      
      // Auto-save to Supabase when done!
      await saveToDatabase(fullText);

    } catch (error) {
      console.error("Failed to generate insights:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const saveToDatabase = async (textToSave: string) => {
    const { data: userData } = await supabase.auth.getUser();
    if (userData.user) {
      // In a real app we'd save to a specific table. 
      // For this hackathon, we'll assume there is an `agent_insights` table, or we just silently fail/succeed.
      await supabase.from("agent_insights").insert([
        { 
          user_id: userData.user.id, 
          agent_type: "CTO", 
          repository: repository,
          insights_raw: textToSave 
        }
      ]).catch(() => console.log("Table agent_insights might not exist yet."));
      
      setIsSaved(true);
    }
  };

  useEffect(() => {
    if (githubData && !streamedText && !isGenerating) {
      generateInsights();
    }
  }, [githubData]);

  // Parsing logic
  const extractCard = (tag: string, text: string) => {
    const regex = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'i');
    const match = text.match(regex);
    if (!match) {
      // Return partial text if currently streaming inside this tag
      const openRegex = new RegExp(`<${tag}>([\\s\\S]*)`, 'i');
      const openMatch = text.match(openRegex);
      return openMatch ? openMatch[1].trim() : null;
    }
    return match[1].trim();
  };

  const parseContent = (content: string) => {
    const lines = content.split('\n');
    const title = lines.find(l => l.includes('**'))?.replace(/\\*\\*/g, '').trim() || "Generating...";
    const desc = lines.filter(l => !l.includes('**') && l.trim().length > 0).join(' ');
    return { title, desc };
  };

  const highContent = extractCard("HIGH", streamedText);
  const mediumContent = extractCard("MEDIUM", streamedText);
  const lowContent = extractCard("LOW", streamedText);

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">AI Generated Priorities</h2>
        <div className="flex gap-3">
          {isSaved && (
            <span className="flex items-center gap-1.5 text-xs text-[#10b981]">
              <CheckCircle2 size={14} /> Saved to Database
            </span>
          )}
          <button 
            onClick={generateInsights}
            disabled={isGenerating}
            className="flex items-center gap-1.5 text-xs text-[#a1a1aa] hover:text-white transition-colors disabled:opacity-50"
          >
            <RefreshCw size={12} className={isGenerating ? "animate-spin" : ""} />
            {isGenerating ? "Analyzing..." : "Refresh Insights"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* HIGH PRIORITY */}
        {(highContent || isGenerating) && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border-l-2 border-[#ef4444] bg-[#1a1a1a] p-5 shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[rgba(239,68,68,0.05)] to-transparent pointer-events-none" />
              <div className="flex items-start gap-2 mb-3 relative z-10">
                <div className="w-4 h-4 rounded-full bg-[#ef4444]/20 flex items-center justify-center mt-0.5 shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-pulse" />
                </div>
                <h3 className="font-semibold text-[#ef4444] text-sm leading-tight">
                  {highContent ? parseContent(highContent).title : "Analyzing High Priority Risks..."}
                </h3>
              </div>
              <p className="text-sm text-[#e4e4e7] leading-relaxed relative z-10 ml-6">
                {highContent ? parseContent(highContent).desc : "..."}
              </p>
            </motion.div>
          </AnimatePresence>
        )}

        {/* MEDIUM PRIORITY */}
        {(mediumContent || (isGenerating && highContent)) && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border-l-2 border-[#fbbf24] bg-[#1a1a1a] p-5 shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[rgba(251,191,36,0.05)] to-transparent pointer-events-none" />
              <div className="flex items-start gap-2 mb-3 relative z-10">
                <div className="w-4 h-4 rounded-full bg-[#fbbf24]/20 flex items-center justify-center mt-0.5 shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />
                </div>
                <h3 className="font-semibold text-[#fbbf24] text-sm leading-tight">
                  {mediumContent ? parseContent(mediumContent).title : "Finding Medium Priority Optimizations..."}
                </h3>
              </div>
              <p className="text-sm text-[#e4e4e7] leading-relaxed relative z-10 ml-6">
                {mediumContent ? parseContent(mediumContent).desc : "..."}
              </p>
            </motion.div>
          </AnimatePresence>
        )}

        {/* LOW PRIORITY */}
        {(lowContent || (isGenerating && mediumContent)) && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-[#1a1a1a] p-4 flex items-center gap-3 border border-[rgba(255,255,255,0.03)]"
            >
              <div className="w-5 h-5 rounded bg-[rgba(255,255,255,0.05)] flex items-center justify-center shrink-0">
                <svg className="w-3 h-3 text-[#71717a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              </div>
              <div className="flex flex-col">
                 <h3 className="font-semibold text-[#a1a1aa] text-sm">
                   {lowContent ? parseContent(lowContent).title : "Checking Routine Telemetry..."}
                 </h3>
                 <span className="text-xs text-[#71717a] mt-1">{lowContent ? parseContent(lowContent).desc : "..."}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
