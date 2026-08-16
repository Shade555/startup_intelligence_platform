"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function AmbientBackground() {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 800], [0.8, 0.2]);

  if (!mounted) return <div className="ambient-background" />;

  return (
    <div className="fixed inset-0 z-[-10] overflow-hidden bg-[#0c0c0c]">
      <motion.div 
        style={{ y, opacity }}
        className="absolute w-[120vw] h-[120vw] min-w-[900px] min-h-[900px] max-w-[1800px] max-h-[1800px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          {/* Subtle slow moving glow orbs as mesh gradient, highly blurred */}
          <div className="absolute w-[420px] h-[420px] rounded-full bg-[#10b981] left-[5%] top-[25%] blur-[115px] opacity-[0.13] mix-blend-screen" />
          <div className="absolute w-[420px] h-[420px] rounded-full bg-[#f59e0b] right-[8%] top-[12%] blur-[115px] opacity-[0.13] mix-blend-screen" />
          <div className="absolute w-[350px] h-[350px] rounded-full bg-[#fbbf24] right-[5%] bottom-[25%] blur-[115px] opacity-[0.09] mix-blend-screen" />
          <div className="absolute w-[360px] h-[360px] rounded-full bg-[#ef4444] left-[12%] bottom-[10%] blur-[115px] opacity-[0.09] mix-blend-screen" />
          <div className="absolute w-[450px] h-[450px] rounded-full bg-[#f43f5e] left-[40%] bottom-[-10%] blur-[115px] opacity-[0.10] mix-blend-screen" />
          <div className="absolute w-[330px] h-[330px] rounded-full bg-[#10b981] left-[42%] top-[-15%] blur-[115px] opacity-[0.08] mix-blend-screen" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(12,12,12,0.55)_55%,rgba(12,12,12,0.85)_100%)] pointer-events-none" />
    </div>
  );
}
