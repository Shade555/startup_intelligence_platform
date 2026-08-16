"use client";

import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Overview from "./Overview";
import AgentView from "./AgentView";

export default function DashboardMain() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab")?.toLowerCase() || "overview";

  return (
    <div className="w-full max-w-7xl mx-auto mt-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {currentTab === "overview" && <Overview />}
          {currentTab === "dashboard" && <Overview />}
          {currentTab === "cto agent" && <AgentView agent="CTO" />}
          {currentTab === "cfo agent" && <AgentView agent="CFO" />}
          {currentTab === "coo agent" && <AgentView agent="COO" />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
