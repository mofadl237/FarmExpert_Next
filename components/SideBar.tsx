'use client'
import { Calendar, Home, Inbox, Tractor, Users ,Cat, Boxes, AlertTriangle, LogOut} from "lucide-react"

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
import { redirect, usePathname } from "next/navigation"
// import { useLocale } from "next-intl"
import { getToken, removeToken } from "@/lib/utils"
import { jwtDecode } from 'jwt-decode';
import { Button } from '@/components/ui/button';
import { IJwtPayload } from "@/interface"



export  function AppSidebar() {
  //1-state 
   const pathname =usePathname();
   
   
   // const locale = useLocale();
   //For Admin
   const token = getToken()
   if(!token){
     redirect('/en/login')
   }
   const decoded = jwtDecode <IJwtPayload>(String(token) );
   const {
  ["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]: role,
  ["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]: email,
  FarmId
  
} = decoded;
  

  const DataDashboard = {
    

  admin: [
    // {
    //   title: "Home",
    //   url: `/en/dashboard`,
    //   icon: Home,
    // },
    {
      title: "All Farms",
      url: `/en/dashboard/farms`,
      icon: Tractor,
    },
    {
      title: "All Manager",
      url: `/en/dashboard/manager`,
      icon: Calendar,
    },
    {
      title: "Farm Requesters",
      url: `/en/dashboard/requests`,
      icon: Inbox,
    },
    {
      title: "LogOut",
      url: `/en/login`,
      icon: LogOut,
    },
  ],
  manager: [
    {
      title: "Home",
      url: `/en/dashboard`,
      icon: Home,
    },
    {
      title: "Staff",
      url: `/en/dashboard/staff`,
      icon: Users,
    },
    {
      title: "cattleActive",
      url: `/en/dashboard/cattle-active`,
      icon: Cat,
    },
    {
      title: "Products",
      url: `/en/dashboard/products`,
      icon: Boxes,
    },
    {
      title: "Alerts",
      url: `/en/dashboard/alert`,
      icon: AlertTriangle,
    },
    {
      title: "LogOut",
      url: `/en/login`,
      icon: LogOut,
    },
  ],
  Worker: [
    {
      title: "Home",
      url: `/en/dashboard`,
      icon: Home,
    },
    {
      title: "cattleActive",
      url: `/en/dashboard/cattle-active`,
      icon: Cat,
    },
    {
      title: "Products",
      url: `/en/dashboard/products`,
      icon: Boxes,
    },
    {
      title: "Alerts",
      url: `/en/dashboard/alert`,
      icon: AlertTriangle,
    },
    {
      title: "LogOut",
      url: `/en/login`,
      icon: LogOut,
    },
  ],
};
//[==]
 const sidebarItems = DataDashboard[role as keyof typeof DataDashboard] ?? [];
//2- Handler
const Logout =()=>{
  removeToken()
redirect('/en/login');
}



  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{role} - {email} - {FarmId}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title} className= {`${pathname ==item.url && 'bg-secondary rounded-md' }`}>
                  <SidebarMenuButton asChild>
                    {item.title =='LogOut' ?  (<Button onClick={Logout}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Button> ):  
                    (<Link href={item.url || '#'}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>)}
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