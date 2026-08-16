"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { Check, AlertCircle, Sparkles, XCircle, TrendingUp } from "lucide-react";

const activities = [
  { id: 1, type: "success", title: "Revenue target reached", meta: "Finance · 4 minutes ago", value: "+18.2%", icon: Check, color: "#10b981", bg: "rgba(16,185,129,0.08)" },
  { id: 2, type: "attention", title: "Review required", meta: "Operations · 12 minutes ago", value: "Attention", icon: AlertCircle, color: "#fbbf24", bg: "rgba(251,191,36,0.08)" },
  { id: 3, type: "opportunity", title: "New opportunity", meta: "Sales · 28 minutes ago", value: "$12.4k", icon: Sparkles, color: "#f59e0b", bg: "rgba(245,158,11,0.08)" },
  { id: 4, type: "alert", title: "Payment failed", meta: "Billing · 41 minutes ago", value: "Action", icon: XCircle, color: "#ef4444", bg: "rgba(239,68,68,0.08)" },
  { id: 5, type: "growth", title: "Campaign performance", meta: "Marketing · 1 hour ago", value: "+31%", icon: TrendingUp, color: "#f43f5e", bg: "rgba(244,63,94,0.08)" },
];

export function ActivityFeed() {
  return (
    <section className="py-[60px] relative z-10 w-[min(1180px,calc(100%-40px))] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard size="lg" className="h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="m-0 text-xl font-bold text-white">Recent activity</h3>
              <span className="text-[#71717a] text-[11px]">Updated now</span>
            </div>

            <div className="flex flex-col">
              {activities.map((act, idx) => {
                const Icon = act.icon;
                return (
                  <motion.div 
                    key={act.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`grid grid-cols-[40px_1fr_auto] gap-3 items-center py-4 border-b border-[rgba(255,255,255,0.06)] ${idx === activities.length -1 ? 'border-b-0 pb-0' : ''}`}
                  >
                    <div 
                      className="w-10 h-10 grid place-items-center rounded-xl"
                      style={{ color: act.color, backgroundColor: act.bg }}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <strong className="block text-[13px] font-semibold text-white">{act.title}</strong>
                      <span className="block mt-1 text-[#71717a] text-[10px]">{act.meta}</span>
                    </div>
                    <div className="text-xs font-bold" style={{ color: act.color }}>
                      {act.value}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard size="lg" className="h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="m-0 text-[21px] font-bold text-white">Professional</h3>
                  <p className="m-0 mt-1.5 text-[#71717a] text-[11px]">For growing teams</p>
                </div>
                <div className="text-3xl font-bold tracking-tight text-white">$49</div>
              </div>
              
              <ul className="list-none p-0 my-8 flex flex-col gap-3">
                {['Unlimited projects', 'Advanced analytics', 'Automated workflows', 'Priority support', 'Team collaboration'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#a1a1aa] text-[13px]">
                    <span className="w-5 h-5 grid place-items-center rounded-md bg-[rgba(16,185,129,0.08)] text-[#10b981]">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <button className="w-full py-3.5 border border-[rgba(255,255,255,0.16)] rounded-xl bg-white text-[#0c0c0c] font-bold transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(255,255,255,0.1)]">
              Choose Professional
            </button>
          </GlassCard>
        </motion.div>

      </div>
    </section>
  );
}
