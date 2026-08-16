import DashboardMain from "@/app/components/dashboard/DashboardMain";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-[50vh]"><div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div></div>}>
      <DashboardMain />
    </Suspense>
  );
}
