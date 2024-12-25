"use client"

import * as React from "react"
import Image from "next/image"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { CMTNav } from "./cmt-nav"
import { CMTUser } from "./cmt-user"

const user = {
  name: "John Smith",
  email: "john.smith@clemson.edu",
}

export function CMTSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Image
                    src="/images/crest.png"
                    alt="Theta Tau Crest"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Theta Tau</span>
                  <span className="">Lambda Gamma</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <CMTNav />
      </SidebarContent>
      <SidebarFooter>
        <CMTUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
