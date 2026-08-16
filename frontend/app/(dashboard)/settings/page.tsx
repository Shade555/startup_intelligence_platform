"use client";

import { useSearchParams } from "next/navigation";
import { GlassCard } from "@/app/components/ui/GlassCard";
import { Link as LinkIcon, Database, CheckCircle2 } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

// Custom SVGs since lucide doesn't have these brand icons built-in
const JiraIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M110.824 163.765C110.824 191.031 88.6667 213.188 61.401 213.188C34.1352 213.188 11.9775 191.031 11.9775 163.765C11.9775 136.499 34.1352 114.341 61.401 114.341H110.824V163.765Z" fill="#2684FF"/>
    <path d="M243.684 96.1834C243.684 123.449 221.526 145.607 194.261 145.607C166.995 145.607 144.837 123.449 144.837 96.1834C144.837 68.9177 166.995 46.7598 194.261 46.7598H243.684V96.1834Z" fill="#2684FF"/>
    <path d="M177.253 163.765C177.253 191.031 155.096 213.188 127.83 213.188C100.564 213.188 78.4062 191.031 78.4062 163.765C78.4062 136.499 100.564 114.341 127.83 114.341H177.253V163.765Z" fill="#0052CC"/>
  </svg>
);

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const SlackIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.835a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.835a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.835zM17.688 8.835a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.313zM15.165 18.958a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.52v-2.522h2.52zM15.165 17.687a2.527 2.527 0 0 1-2.52-2.522 2.528 2.528 0 0 1 2.52-2.522h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.522h-6.313z"/>
  </svg>
);

const TrelloIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.836 21.6A2.839 2.839 0 0 1 0 18.764V2.836A2.839 2.839 0 0 1 2.836 0h18.328A2.839 2.839 0 0 1 24 2.836v15.928A2.839 2.839 0 0 1 21.164 21.6H2.836zM10.8 14.164V3.6H3.6v10.564c0 .66.54 1.2 1.2 1.2h4.8c.66 0 1.2-.54 1.2-1.2zM20.4 10.564V3.6h-7.2v6.964c0 .66.54 1.2 1.2 1.2h4.8c.66 0 1.2-.54 1.2-1.2z"/>
  </svg>
);

const integrations = [
  { 
    id: "github", 
    name: "GitHub", 
    description: "Sync repositories, track pull requests, and calculate developer velocity.", 
    icon: <GithubIcon size={28} className="text-white" />,
    connected: true
  },
  { 
    id: "jira", 
    name: "Jira", 
    description: "Import agile sprints, track backlog blockers, and monitor issue turnaround.", 
    icon: <JiraIcon size={28} />,
    connected: true
  },
  { 
    id: "slack", 
    name: "Slack", 
    description: "Receive AI agent alerts, milestone triggers, and daily standup summaries.", 
    icon: <SlackIcon size={28} className="text-[#E01E5A]" />,
    connected: false
  },
  { 
    id: "trello", 
    name: "Trello", 
    description: "Sync boards and cards to monitor operational progress and blockers.", 
    icon: <TrelloIcon size={28} className="text-[#0052CC]" />,
    connected: false
  },
  { 
    id: "snowflake", 
    name: "Snowflake", 
    description: "Connect your data warehouse for advanced financial & customer analytics.", 
    icon: <Database size={28} className="text-[#29B5E8]" />,
    connected: false
  }
];

import { Suspense } from "react";

function SettingsContent() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab")?.toLowerCase() || "profile";

  return (
    <div className="max-w-[1000px] mx-auto py-8">
      {currentTab === "integrations" ? (
        <div className="animate-in fade-in duration-500">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Integrations</h1>
            <p className="text-[#a1a1aa] max-w-[600px]">
              Connect your essential tools. Our AI agents will automatically extract telemetry, calculate execution scores, and monitor business health using real data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {integrations.map((integration) => (
              <GlassCard key={integration.id} size="md" hoverEffect className="flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center shadow-[inset_0_1px_rgba(255,255,255,0.1)]">
                    {integration.icon}
                  </div>
                  {integration.connected ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(16,185,129,0.08)] text-[#10b981] border border-[rgba(16,185,129,0.18)]">
                      <CheckCircle2 size={14} />
                      Connected
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(255,255,255,0.05)] text-[#a1a1aa] border border-[rgba(255,255,255,0.1)]">
                      Not Connected
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">{integration.name}</h3>
                <p className="text-[#a1a1aa] text-sm leading-relaxed mb-6 flex-1">
                  {integration.description}
                </p>
                
                <div className="mt-auto">
                  {integration.connected ? (
                    <Button variant="secondary" className="w-full">
                      Configure Settings
                    </Button>
                  ) : (
                    <Button variant="primary" className="w-full gap-2">
                      <LinkIcon size={16} />
                      Connect {integration.name}
                    </Button>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      ) : currentTab === "account" ? (
        <div className="animate-in fade-in duration-500 max-w-[500px]">
          <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
          
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-white mb-2">Sign Out</h3>
            <p className="text-[#a1a1aa] text-sm mb-6">
              You will be returned to the sign in page and your session will be ended.
            </p>
            <Button 
              variant="secondary" 
              className="w-full sm:w-auto bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] text-red-400 hover:bg-[rgba(239,68,68,0.15)] hover:text-red-300 transition-colors font-semibold"
              onClick={async () => {
                const { createClient } = await import("@/app/lib/supabase/client");
                const supabase = createClient();
                await supabase.auth.signOut();
                window.location.href = "/auth/signin";
              }}
            >
              Log Out
            </Button>
          </GlassCard>
        </div>
      ) : (
        <div className="animate-in fade-in duration-500">
          <h1 className="text-3xl font-bold mb-4 capitalize">{currentTab}</h1>
          <p className="text-[#a1a1aa]">This section is under construction. Click on "Integrations" or "Account" in the top navbar to see the active tab.</p>
        </div>
      )}
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-[#a1a1aa]">Loading settings...</div>}>
      <SettingsContent />
    </Suspense>
  );
}
