import { Metadata } from "next"

import { CMTSidebar } from "@/components/cmt/nav/cmt-sidebar"
import { SidebarProvider } from "@/components/ui/navigation/sidebar"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Brother Dashboard for CMT Purposes",
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <CMTSidebar />
        <main className="flex-1 w-0 overflow-hidden">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
