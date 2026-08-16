"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "../ui/Button";
import Link from "next/link";

export function HeroSection() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const item: Variants = {
    hidden: { y: 30, opacity: 0, rotateX: 20 },
    show: { 
      y: 0, 
      opacity: 1, 
      rotateX: 0,
      transition: { type: "spring", stiffness: 80, damping: 20 } 
    }
  };

  return (
    <section className="pt-[140px] pb-[90px] relative z-10 flex flex-col items-center text-center">
      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show"
        className="w-[min(1180px,calc(100%-40px))] mx-auto flex flex-col items-center"
      >
        <motion.div variants={item} className="inline-flex items-center gap-2 px-3 py-1.5 border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.045)] rounded-full text-[#a1a1aa] text-[11px] font-medium tracking-wide mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] shadow-[0_0_12px_rgba(251,191,36,0.7)]"></span>
          A new way to build
        </motion.div>
        
        <motion.h1 variants={item} className="max-w-[800px] text-[clamp(44px,6vw,78px)] leading-[0.97] tracking-tight font-bold m-0 text-white perspective-[1000px]">
          Intelligence <span className="text-[#a1a1aa]">meets</span> simplicity.
        </motion.h1>
        
        <motion.p variants={item} className="max-w-[620px] mt-7 mb-9 text-[#a1a1aa] text-[clamp(15px,2vw,18px)] leading-relaxed">
          A premium business platform designed around clarity, automation and beautiful experiences. Everything you need, without the noise.
        </motion.p>
        
        <motion.div variants={item} className="flex flex-wrap gap-3 justify-center">
          <Link href="/auth/signup">
            <Button variant="primary" className="px-6 py-3.5 text-sm rounded-xl">Sign Up</Button>
          </Link>
          <Link href="/auth/signin">
            <Button variant="secondary" className="px-6 py-3.5 text-sm rounded-xl">Sign In</Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
