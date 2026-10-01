"use client";

import * as React from "react";
import {
  CalendarCheck,
  CalendarDays,
  FileChartColumnIncreasing,
  FilePenLine,
  FilePlus,
  FileText,
  LayoutDashboard,
  Lightbulb,
  Plus,
  Settings,
  Upload,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { openCreatePostModal } from "@/store/slices/createPostModalSlice";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "PostZest",
      logo: LayoutDashboard,
      plan: "Pro",
    },
  ],
  navMain: [
    {
      title: "Overview",
      items: [
        {
          title: "Home",
          url: "/home",
          icon: LayoutDashboard,
        },
        {
          title: "New Post",
          url: "/new-post",
          icon: FilePlus,
        },
        {
          title: "Analytics",
          url: "/analytics",
          icon: FileChartColumnIncreasing,
        },
      ],
    },
    {
      title: "Content Menu",
      items: [
        {
          title: "Ideas",
          url: "/ideas",
          icon: Lightbulb,
        },
        {
          title: "Calendar",
          url: "/calendar",
          icon: CalendarDays,
        },
        {
          title: "All Posts",
          url: "/posts",
          icon: FileText,
          badge: 21,
        },
        {
          title: "Scheduled Posts",
          url: "/scheduled-posts",
          icon: CalendarCheck,
          badge: 11,
        },
        {
          title: "Uploaded Posts",
          url: "/uploaded-posts",
          icon: Upload,
          badge: 261,
        },
        {
          title: "Draft",
          url: "/draft",
          icon: FilePenLine,
          badge: 6,
        },
      ],
    },
    {
      title: "Configurations",
      items: [
        {
          title: "Social Accounts",
          url: "/social-accounts",
          icon: Users,
        },
        {
          title: "Settings",
          url: "/settings/profile",
          icon: Settings,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState<string | boolean>(false);

  const isCollapsed =
    // @ts-ignore
    state === true || state === "collapsed" || state === "icon";

  return (
    <Sidebar className="group-data-[collapsible=icon]:px-0 px-0!" collapsible="icon" {...props}>
      <SidebarHeader className="py-3 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:py-2 group-data-[collapsible=icon]:mb-0 flex items-center justify-center">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <div className="space-y-2.5 px-1 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:space-y-1.5 group-data-[collapsible=icon]:mb-2 flex flex-col items-center w-full">
        <Button
          onClick={() => dispatch(openCreatePostModal())}
          className={
            isCollapsed
              ? "h-8 w-8 p-0 mx-auto rounded-md flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground shadow-xs cursor-pointer shrink-0"
              : "w-full font-semibold text-sm h-11 px-4 rounded-full cursor-pointer flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
          }
          title="Create Post"
        >
          <Plus strokeWidth={2.5} className="h-4 w-4 shrink-0" />
          {!isCollapsed && <span>Create New</span>}
        </Button>
      </div>


      {/* Navigation */}
      <SidebarContent className="group-data-[collapsible=icon]:px-0">
        <NavMain items={data.navMain} />
      </SidebarContent>

      {/* Footer with profile + sidebar toggle icon */}
      <SidebarFooter className="border-t border-muted-foreground/10 p-1 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-2 mt-auto flex flex-col items-center justify-center">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
