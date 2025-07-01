'use client'
import { Calendar, Home, Inbox, Settings, Tractor } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "All Farms",
    url: "/dashboard/farms",
    icon: Tractor,
  },
  {
    title: "All Manager",
    url: "/dashboard/manager",
    icon: Calendar,
  },
  {
    title: "Farm Requesters",
    url: "/dashboard/requests",
    icon: Inbox,
  },
  {
    title: "Settings",
    url: "/dashboard/",
    icon: Settings,
  },
]

export function AppSidebar() {
  //1-state 
  const pathname =usePathname();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin FarmExpert</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className= {`${pathname ==item.url && 'bg-secondary rounded-md' }`}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}