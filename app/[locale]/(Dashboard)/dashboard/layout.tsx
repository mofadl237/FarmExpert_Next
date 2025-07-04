
import { AppSidebar } from "@/components/SideBar";
// import { Metadata } from "next";
import { ReactNode } from "react";
// export const metadata: Metadata = {
//   title: "Product Page",
//   description: "All Product Mobile Clothes",
// };


import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";


interface IProps {
  children: ReactNode;
}

const Layout = async ({ children }: IProps) => {
  
  
  return (
    
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <main className="w-full">
          {children}
           
        </main>
      </SidebarProvider>
   
  );
};

export default Layout;
