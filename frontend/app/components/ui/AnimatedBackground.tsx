"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate, useTransform } from "framer-motion";

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse coordinates
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 15 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 15 });

  useEffect(() => {
    setMounted(true);
    // Center initially
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Subtle parallax tilt based on mouse position
  // 50vw/50vh is roughly the center
  const rotateX = useTransform(smoothY, [0, 1000], [55, 65]);
  const rotateY = useTransform(smoothX, [0, 2000], [-3, 3]);
  
  if (!mounted) return <div className="absolute inset-0 bg-[#0c0c0c]" />;

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a0a0c] z-0 pointer-events-none" style={{ perspective: "1000px" }}>
      
      {/* 3D Wireframe Grid Floor */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformOrigin: "center top",
        }}
        className="absolute top-[30%] left-[-50%] w-[200%] h-[150%] z-10"
      >
        {/* Base Grid */}
        <motion.div
          animate={{
            backgroundPosition: ["0px 0px", "0px 80px"]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Pulse Lines Grid (moves faster to simulate data packets) */}
        <motion.div
          animate={{
            backgroundPosition: ["0px 0px", "0px 240px"]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 w-full h-full opacity-60"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(16, 185, 129, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(16, 185, 129, 0.4) 2px, transparent 2px)
            `,
            backgroundSize: "240px 240px",
          }}
        />
      </motion.div>

      {/* Heavy vignette to fade the grid out at the edges and horizon */}
      <div className="absolute inset-0 z-30 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0c_80%)] pointer-events-none" />
      <div className="absolute inset-0 z-30 bg-gradient-to-t from-[#0a0a0c] via-transparent to-[#0a0a0c] pointer-events-none opacity-60" />
      
      {/* Subtle Noise Texture for high-end feel */}
      <div 
        className="absolute inset-0 z-40 opacity-[0.03] mix-blend-screen pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
    </div>
  );
}
