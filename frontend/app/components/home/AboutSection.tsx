"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { Info } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-[90px] relative z-10 w-[min(1180px,calc(100%-40px))] mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <GlassCard size="lg" className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1">
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] mb-6">
              <Info className="text-white" size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">About Nova Intelligence</h2>
            <p className="text-[#a1a1aa] leading-relaxed mb-6">
              We built this platform because we believe that deep, actionable intelligence shouldn't be locked behind clunky dashboards or noisy analytics. Our AI-native execution engine connects directly to your ecosystem, extracting truth from telemetry rather than self-reported metrics.
            </p>
            <p className="text-[#a1a1aa] leading-relaxed">
              Designed for modern founders, operators, and forward-thinking teams, Nova acts as a digital execution layer—bringing clarity to your data, automating operational guidance, and fundamentally changing how you scale.
            </p>
          </div>
          
          <div className="flex-1 w-full relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative border border-[rgba(255,255,255,0.1)]">
              {/* Subtle animated placeholder for about visual */}
              <div className="absolute inset-0 bg-[#0c0c0c]">
                <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,transparent_60%)] -translate-y-1/2 translate-x-1/4 mix-blend-screen" />
                <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-[rgba(12,12,12,0.8)] to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: [0, 360] }} 
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 rounded-full border border-[rgba(255,255,255,0.15)] border-t-transparent"
                  />
                  <motion.div 
                    animate={{ rotate: [360, 0] }} 
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute w-48 h-48 rounded-full border border-[rgba(255,255,255,0.08)] border-b-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}
