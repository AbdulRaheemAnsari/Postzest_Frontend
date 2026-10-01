"use client";

import { usePathname } from "next/navigation";
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
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Bell } from "lucide-react";

const routeTitleMap: Record<string, string> = {
  "/home": "Overview",
  "/new-post": "New Post",
  "/analytics": "Analytics",
  "/ideas": "Ideas Board",
  "/calendar": "Calendar",
  "/posts": "All Posts",
  "/scheduled-posts": "Scheduled Posts",
  "/uploaded-posts": "Uploaded Posts",
  "/draft": "Draft Posts",
  "/social-accounts": "Social Accounts",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentTitle = routeTitleMap[pathname] || "Dashboard";

  return (
    <SidebarProvider className="h-screen max-h-screen w-full overflow-hidden bg-[#F7F6F3] dark:bg-background">
      {/* App Sidebar */}
      <AppSidebar variant="inset" className="h-full border-r-0" />

      {/* Main content area card container - Fixed height, inner content scrollable */}
      <SidebarInset className="h-[calc(100vh-1rem)] m-2 ml-0 flex-1 flex flex-col min-w-0 overflow-hidden bg-background rounded-xl border! border-border shadow-none!">
        {/* Fixed Topbar header */}
        <header className="shrink-0 flex items-center justify-between border-b px-6 py-3.5 backdrop-blur-md bg-background/90 z-20 h-16">
          <div className="flex items-center gap-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/home" className="font-medium text-muted-foreground hover:text-foreground">
                    PostZest
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-foreground">{currentTitle}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-3">
            <SearchForm className="" />
            <div className="border p-2 rounded-xl cursor-pointer hover:bg-muted transition-colors">
              <Bell strokeWidth={2} className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </header>

        {/* Inner Content Area - Only this scrolls */}
        <main className="flex-1 overflow-y-auto min-h-0 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

