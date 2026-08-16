"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { useRef } from "react";

export function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={ref} className="w-[min(1180px,calc(100%-40px))] mx-auto relative z-10 perspective-[2000px]">
      <motion.div style={{ rotateX, scale, y, opacity }} className="transform-gpu">
        <GlassCard size="xl" className="mx-auto max-w-[900px] border-[rgba(255,255,255,0.15)] shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="text-[#a1a1aa] text-xs font-medium uppercase tracking-wider">Business Overview</span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[rgba(16,185,129,0.07)] border border-[rgba(16,185,129,0.18)] text-[#10b981]">
                ● Live
              </span>
            </div>
            
            <p className="m-0 text-[clamp(46px,6vw,68px)] tracking-tighter font-bold text-white">84.6%</p>
            <div className="mt-1 text-[#a1a1aa] text-xs">Overall performance</div>
            
            <div className="h-[170px] flex items-end gap-2 mt-9 py-4 border-b border-[rgba(255,255,255,0.05)]">
              {[35, 50, 44, 67, 55, 73, 60, 88].map((height, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: "0%" }}
                  whileInView={{ height: `${height}%` }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, delay: i * 0.1, type: "spring" }}
                  className="flex-1 min-w-0 rounded-t-[7px] rounded-b-[3px] border border-[rgba(255,255,255,0.08)] shadow-[inset_0_1px_rgba(255,255,255,0.12)]"
                  style={{
                    background: [
                      '#151619', '#1a1c1f', '#a1a1aa', '#10b981', 
                      '#f59e0b', '#fbbf24', '#ef4444', '#f43f5e'
                    ][i]
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
            {[
              { label: "Customers", value: "24.8k" },
              { label: "Growth", value: "18.2%" },
              { label: "Uptime", value: "98.4%" }
            ].map((metric, i) => (
              <div key={i} className="p-4 border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.035)] rounded-xl">
                <strong className="block text-[17px] font-bold text-white">{metric.value}</strong>
                <span className="block mt-1 text-[#71717a] text-[11px]">{metric.label}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}
