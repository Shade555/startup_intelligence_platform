"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const TOP_NAV_MAP: Record<string, string[]> = {
  "/home": ["Upcoming events", "Add Startup"],
  "/dashboard": ["Overview", "CTO Agent", "CFO Agent", "COO Agent"],
  "/settings": ["Profile", "Notifications", "Integrations", "Account"],
  "/teams": ["Team Overview", "Members"],
};

export default function TopNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab")?.toLowerCase();

  // Find the exact match or fallback to empty array
  let buttons = ["Upcoming events"]; // Default
  if (pathname.startsWith("/settings")) buttons = TOP_NAV_MAP["/settings"];
  else if (pathname.startsWith("/teams")) buttons = TOP_NAV_MAP["/teams"];
  else if (pathname.startsWith("/dashboard")) buttons = TOP_NAV_MAP["/dashboard"];
  else if (pathname.startsWith("/home")) buttons = TOP_NAV_MAP["/home"];

  // Use the root path prefix as a key to trigger AnimatePresence completely
  const activeKey = pathname.split("/")[1] || "home";
  
  // Default active index if no tab is provided
  const activeIndex = currentTab 
    ? buttons.findIndex(b => b.toLowerCase() === currentTab)
    : 0;

  const handleTabClick = (btn: string) => {
    if (btn === "Add Startup") {
      router.push("/onboarding");
      return;
    }
    router.push(`${pathname}?tab=${btn.toLowerCase()}`);
  };

  return (
    <header className="fixed top-0 left-16 right-0 h-[70px] z-40 bg-[rgba(12,12,12,0.7)] backdrop-blur-[24px] border-b border-[rgba(255,255,255,0.09)] flex items-center px-8">
      <div className="flex-1 overflow-hidden h-full flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeKey}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex items-center gap-6"
          >
            {buttons.map((btn, i) => (
              <button
                key={btn}
                onClick={() => handleTabClick(btn)}
                className={`text-sm font-medium transition-colors relative group py-2 ${
                  i === (activeIndex === -1 ? 0 : activeIndex) ? "text-white" : "text-[#a1a1aa] hover:text-white"
                }`}
              >
                {btn}
                {i === (activeIndex === -1 ? 0 : activeIndex) && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  />
                )}
              </button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="shrink-0 flex items-center gap-4">
        {pathname.startsWith("/home") && (
          <div className="relative group">
            <svg className="w-4 h-4 text-[#a1a1aa] absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-full py-1.5 pl-9 pr-4 text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:border-[rgba(255,255,255,0.2)] focus:bg-[rgba(255,255,255,0.08)] transition-all w-[200px] focus:w-[250px]"
            />
          </div>
        )}
        {/* Placeholder for user profile / actions */}
        <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)]" />
      </div>
    </header>
  );
}
