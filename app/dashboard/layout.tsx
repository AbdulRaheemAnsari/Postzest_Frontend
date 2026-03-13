"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SearchForm } from "@/components/search-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Bell } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
    
    >
      <AppSidebar
      variant="inset"
      />

      {/* Main content area */}
      <SidebarInset className="w-(--content-width) overflow-x-hidden ">
        {/* Optional topbar trigger */}
        <header className="flex justify-between backdrop-saturate-150 backdrop-blur-lg bg-white/50 w-full py-3 sticky  h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="px-6 flex items-center gap-2">
            <SearchForm className="" />
            <div className="border p-2 rounded-sm cursor-pointer hover:bg-muted transition-colors">
              <Bell strokeWidth={2} className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="pt-4 pb-4 md:px-6 px-3 overflow-x-hidden">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
