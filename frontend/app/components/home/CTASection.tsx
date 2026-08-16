"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { Button } from "../ui/Button";

export function CTASection() {
  return (
    <section className="py-[90px] pb-[120px] relative z-10 w-[min(1180px,calc(100%-40px))] mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <GlassCard size="xl" className="text-center overflow-hidden">
          {/* Subtle animated background gradients inside the CTA */}
          <div className="absolute inset-0 pointer-events-none opacity-50 mix-blend-screen">
             <motion.div 
               animate={{ x: ["-10%", "10%", "-10%"], y: ["-10%", "10%", "-10%"] }} 
               transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
               className="absolute w-[80%] h-[150%] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.1)_0%,transparent_50%)] -left-1/4 -top-1/4" 
             />
             <motion.div 
               animate={{ x: ["10%", "-10%", "10%"], y: ["10%", "-10%", "10%"] }} 
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute w-[80%] h-[150%] bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.1)_0%,transparent_50%)] -right-1/4 -bottom-1/4" 
             />
          </div>

          <div className="relative z-10 py-10 max-w-[720px] mx-auto flex flex-col items-center">
            <h2 className="m-0 mb-5 text-[clamp(31px,5vw,52px)] font-bold tracking-tight text-white leading-tight">
              Build something worth remembering.
            </h2>
            <p className="m-0 mb-8 text-[#a1a1aa] text-lg leading-relaxed max-w-[560px]">
              A dark foundation. Transparent surfaces. Controlled color. Subtle movement. Nothing unnecessary.
            </p>
            <Button variant="primary" className="px-8 py-4 text-base rounded-xl font-bold shadow-[0_8px_25px_rgba(255,255,255,0.1)]">
              Get Started
            </Button>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}
