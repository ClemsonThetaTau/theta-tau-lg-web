import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/components/nav/nav-sidebar"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Brother Dashboard for CMT Purposes",
}

const appsNavItems = [
  {
    title: "Contact Cards",
    href: "/dashboard/apps/contact-cards",
  },
  {
    title: "LLMs",
    href: "/dashboard/apps/llms",
  }
]

const settingsNavItems = [
  {
    title: "Profile",
    href: "/dashboard/settings",
  },
  {
    title: "Account",
    href: "/dashboard/settings/account",
  },
  {
    title: "Web Chair",
    subItems: [
      {
        title: "Officers & Chairs",
        href: "/dashboard/settings/web-chair/officers-and-chairs"
      }
    ]
  }
]

const sections = [
  {
    title: "Apps",
    items: appsNavItems
  },
  {
    title: "Settings",
    items: settingsNavItems
  }
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="space-y-6 p-10 pb-16 md:block">
      {/* <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6" /> */}
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav sections={sections} />
        </aside>
        <div className="flex-1 lg:max-w-4xl">{children}</div>
      </div>
    </div>
  )
}