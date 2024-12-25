"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import {
  Settings2,
  Users,
  LayoutDashboard,
  AppWindow,
  Contact,
  Bot,
  UserCog,
  ScrollText,
} from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

interface SubItem {
  title: string
  url: string
}

interface NavItem {
  title: string
  icon: LucideIcon
  items?: Array<{
    title: string
    url?: string
    icon?: LucideIcon
    items?: SubItem[]
  }>
  isActive?: boolean
}

interface NavGroup {
  label: string
  items: NavItem[]
}

const data = {
  navGroups: [
    {
      label: "Platform",
      items: [
        {
          title: "Dashboard",
          icon: LayoutDashboard,
          isActive: true,
          items: [
            {
              title: "Overview", 
              url: "/dashboard",
            },
          ],
        },
        {
          title: "Apps",
          icon: AppWindow,
          items: [
            {
              title: "Contact Cards",
              url: "/dashboard/apps/contact-cards",
              icon: Contact,
            },
            {
              title: "LLMs",
              url: "/dashboard/apps/llms", 
              icon: Bot,
            },
          ],
        },
      ]
    },
    {
      label: "Administration",
      items: [
        {
          title: "Settings",
          icon: Settings2,
          items: [
            {
              title: "Profile",
              url: "/dashboard/settings/profile",
              icon: UserCog,
            },
            {
              title: "Account", 
              url: "/dashboard/settings/account",
              icon: Users,
            },
          ],
        },
        {
          title: "Web Chair",
          icon: ScrollText,
          items: [
            {
              title: "Officers & Chairs",
              url: "/dashboard/settings/web-chair/officers-and-chairs",
            },
            {
              title: "Users",
              url: "/dashboard/settings/web-chair/users",
            },
          ],
        },
      ]
    }
  ] as NavGroup[],
}


export function CMTNav() {
  return (
    <>
      {data.navGroups.map((group) => (
        <SidebarGroup key={group.label}>
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          <SidebarMenu>
            {group.items.map((item) => (
              <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      <item.icon />
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a href={subItem.url}>
                                {subItem.icon && <subItem.icon />}
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                            {subItem.items?.length ? (
                              <SidebarMenuSub>
                                {subItem.items.map((nestedItem) => (
                                  <SidebarMenuSubItem key={nestedItem.title}>
                                    <SidebarMenuSubButton asChild>
                                      <a href={nestedItem.url}>{nestedItem.title}</a>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            ) : null}
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  )
}
