"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Users, Settings, ChevronRight } from "lucide-react";
import { cn } from "@/app/lib/utils";

const NAV_ITEMS = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Teams", href: "/teams", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function LeftNavbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ width: 64 }}
      animate={{ width: isExpanded ? 240 : 64 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className="fixed left-0 top-0 bottom-0 z-50 flex flex-col bg-[#0c0c0c] border-r border-[rgba(255,255,255,0.09)] overflow-hidden"
    >
      <div className="h-[70px] flex items-center px-4 border-b border-[rgba(255,255,255,0.05)]">
        <div className="w-8 h-8 shrink-0 rounded-lg bg-gradient-to-br from-white to-[#a1a1aa] text-[#0c0c0c] font-black flex items-center justify-center text-sm shadow-[0_0_15px_rgba(255,255,255,0.15)]">
          N
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-3 font-bold text-white whitespace-nowrap"
        >
          Nova
        </motion.span>
      </div>

      <div className="flex-1 py-6 px-3 flex flex-col gap-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center h-10 px-2 rounded-xl cursor-pointer transition-colors whitespace-nowrap group",
                  isActive
                    ? "bg-[rgba(255,255,255,0.1)] text-white"
                    : "text-[#a1a1aa] hover:bg-[rgba(255,255,255,0.05)] hover:text-white"
                )}
              >
                <div className="w-6 h-6 shrink-0 flex items-center justify-center">
                  <Icon size={18} className={isActive ? "text-white" : "text-[#a1a1aa] group-hover:text-white transition-colors"} />
                </div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isExpanded ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-3 text-sm font-medium"
                >
                  {item.name}
                </motion.span>
              </div>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
