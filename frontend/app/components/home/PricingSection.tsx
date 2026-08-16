"use client";

import { motion, Variants } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";

export function PricingSection() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  return (
    <section className="py-[120px] relative z-10 w-[min(1180px,calc(100%-40px))] mx-auto">
      <div className="max-w-[700px] mb-12">
        <h2 className="m-0 mb-4 text-[clamp(30px,5vw,48px)] tracking-tight font-bold text-white">Simple pricing.</h2>
        <p className="m-0 text-[#a1a1aa] text-lg leading-relaxed">
          Predictable scaling aligned with your actual growth, not artificial limits.
        </p>
      </div>

      <motion.div 
        variants={container} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        <motion.div variants={item}>
          <GlassCard size="md" className="h-full flex flex-col justify-between transition-transform hover:-translate-y-1 hover:border-[rgba(255,255,255,0.15)]">
            <div>
              <h3 className="m-0 mb-2 text-xl font-bold text-white">Starter</h3>
              <div className="text-[34px] font-bold tracking-tight text-white mb-4">
                $0 <span className="text-[11px] font-normal text-[#71717a]">/month</span>
              </div>
              <p className="m-0 text-[#a1a1aa] text-sm leading-relaxed">Everything you need to explore the platform.</p>
            </div>
            <button className="w-full mt-6 py-3 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.055)] text-white font-semibold transition-colors hover:bg-[rgba(255,255,255,0.1)]">
              Get Started
            </button>
          </GlassCard>
        </motion.div>

        <motion.div variants={item}>
          <GlassCard size="md" className="h-full flex flex-col justify-between border-[rgba(251,191,36,0.25)] bg-[linear-gradient(145deg,rgba(251,191,36,0.07),rgba(255,255,255,0.04))] relative overflow-visible transition-transform hover:-translate-y-1">
            <div className="absolute -top-3 left-6">
              <span className="px-3 py-1 rounded-full text-[9px] font-bold bg-[rgba(251,191,36,0.1)] text-[#fbbf24] border border-[rgba(251,191,36,0.18)] backdrop-blur-md">
                MOST POPULAR
              </span>
            </div>
            <div className="pt-2">
              <h3 className="m-0 mb-2 text-xl font-bold text-white">Professional</h3>
              <div className="text-[34px] font-bold tracking-tight text-white mb-4">
                $49 <span className="text-[11px] font-normal text-[#71717a]">/month</span>
              </div>
              <p className="m-0 text-[#a1a1aa] text-sm leading-relaxed">Advanced tools for growing businesses.</p>
            </div>
            <button className="w-full mt-6 py-3 rounded-xl border border-[rgba(255,255,255,0.16)] bg-white text-[#0c0c0c] font-bold shadow-[0_4px_15px_rgba(255,255,255,0.05)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(255,255,255,0.15)]">
              Start Free Trial
            </button>
          </GlassCard>
        </motion.div>

        <motion.div variants={item}>
          <GlassCard size="md" className="h-full flex flex-col justify-between transition-transform hover:-translate-y-1 hover:border-[rgba(255,255,255,0.15)]">
            <div>
              <h3 className="m-0 mb-2 text-xl font-bold text-white">Enterprise</h3>
              <div className="text-[34px] font-bold tracking-tight text-white mb-4">
                Custom
              </div>
              <p className="m-0 text-[#a1a1aa] text-sm leading-relaxed">Tailored solutions for large organizations.</p>
            </div>
            <button className="w-full mt-6 py-3 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.055)] text-white font-semibold transition-colors hover:bg-[rgba(255,255,255,0.1)]">
              Contact Sales
            </button>
          </GlassCard>
        </motion.div>
      </motion.div>
    </section>
  );
}
