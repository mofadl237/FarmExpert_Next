
import { AppSidebar } from "@/components/SideBar";
// import { Metadata } from "next";
import { ReactNode } from "react";
import { Toaster } from "sonner";
// export const metadata: Metadata = {
//   title: "Product Page",
//   description: "All Product Mobile Clothes",
// };

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ReduxProvider from "@/Providers/ReduxProvider";

interface IProps {
  children: ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <ReduxProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <main className="w-full">
          {children}
           <Toaster richColors />
        </main>
      </SidebarProvider>
    </ReduxProvider>
  );
};

export default Layout;
