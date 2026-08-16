import { Suspense } from "react";
import LeftNavbar from "@/app/components/navigation/LeftNavbar";
import TopNavbar from "@/app/components/navigation/TopNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0c0c0c] text-white">
      <LeftNavbar />
      <div className="flex flex-1 flex-col ml-16 md:ml-16">
        <Suspense fallback={<div className="h-[70px] border-b border-[rgba(255,255,255,0.09)]" />}>
          <TopNavbar />
        </Suspense>
        <main className="flex-1 p-6 mt-[70px]">
          {children}
        </main>
      </div>
    </div>
  );
}
