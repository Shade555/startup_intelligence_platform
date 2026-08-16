"use client";

import { motion, Variants } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { Workflow, TrendingUp, AlertTriangle } from "lucide-react";

export function FeaturesSection() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const card: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 } 
    }
  };

  return (
    <section className="py-[120px] relative z-10 w-[min(1180px,calc(100%-40px))] mx-auto">
      <div className="max-w-[700px] mb-12">
        <h2 className="m-0 mb-4 text-[clamp(30px,5vw,48px)] tracking-tight font-bold text-white">Everything in one place.</h2>
        <p className="m-0 text-[#a1a1aa] text-lg leading-relaxed">
          A flexible system that lets your business move faster while keeping every important detail visible.
        </p>
      </div>

      <motion.div 
        variants={container} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        <motion.div variants={card}>
          <GlassCard size="md" hoverEffect className="min-h-[250px] flex flex-col group">
            <div className="w-11 h-11 grid place-items-center rounded-xl mb-6 text-white bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.12)] transition-colors group-hover:bg-white group-hover:text-black">
              <Workflow size={20} />
            </div>
            <h3 className="m-0 mb-3 text-[19px] font-bold text-white">Intelligent workflows</h3>
            <p className="m-0 text-[#a1a1aa] text-[13px] leading-relaxed flex-1">
              Automate repetitive work and give your team more time for decisions that actually matter.
            </p>
          </GlassCard>
        </motion.div>

        <motion.div variants={card}>
          <GlassCard size="md" hoverEffect className="min-h-[250px] flex flex-col group">
            <div className="w-11 h-11 grid place-items-center rounded-xl mb-6 text-[#10b981] bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.17)] transition-colors group-hover:bg-[#10b981] group-hover:text-[#06140f]">
              <TrendingUp size={20} />
            </div>
            <h3 className="m-0 mb-3 text-[19px] font-bold text-white">Real-time growth</h3>
            <p className="m-0 text-[#a1a1aa] text-[13px] leading-relaxed flex-1">
              Understand performance through live metrics, trends and actionable business intelligence.
            </p>
          </GlassCard>
        </motion.div>

        <motion.div variants={card}>
          <GlassCard size="md" hoverEffect className="min-h-[250px] flex flex-col group">
            <div className="w-11 h-11 grid place-items-center rounded-xl mb-6 text-[#f59e0b] bg-[rgba(245,158,11,0.08)] border border-[rgba(245,158,11,0.17)] transition-colors group-hover:bg-[#f59e0b] group-hover:text-[#1a1002]">
              <AlertTriangle size={20} />
            </div>
            <h3 className="m-0 mb-3 text-[19px] font-bold text-white">Smart decisions</h3>
            <p className="m-0 text-[#a1a1aa] text-[13px] leading-relaxed flex-1">
              Surface important changes before they become problems with contextual alerts and insights.
            </p>
          </GlassCard>
        </motion.div>
      </motion.div>
    </section>
  );
}
