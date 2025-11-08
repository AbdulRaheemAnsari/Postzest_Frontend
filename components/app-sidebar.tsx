"use client";

import * as React from "react";
import {
  CalendarCheck,
  CalendarDays,
  FilePenLine,
  FilePlus,
  FileText,
  Layers,
  LayoutDashboard,
  Settings,
  Upload,
  Users,
  WandSparkles,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { WorkspaceSwitcher } from "./common/WorkspaceSwitcher";
import { CreateWorkspaceModal } from "./modals/CreateWorkspaceModal";
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
        // {
        //   title: "New Post",
        //   url: "/new-post",
        //   icon: FilePlus,
        // },
        {
          title: "Content Studio",
          url: "/dashboard/content-studio",
          icon: WandSparkles,
        },
        {
          title: "Bulk Tools",
          url: "/dashboard/bulk-tools",
          icon: Layers,
        },
      ],
    },
    {
      title: "Content Menu",
      items: [
        {
          title: "Calendar",
          url: "/dashboard/calendar",
          icon: CalendarDays,
        },
        {
          title: "All Posts",
          url: "/dashboard/posts",
          icon: FileText,
          badge: 21,
        },
        {
          title: "Scheduled Posts",
          url: "/dashboard/scheduled-posts",
          icon: CalendarCheck,
          badge: 11,
        },
        {
          title: "Uploaded Posts",
          url: "/dashboard/uploaded-posts",
          icon: Upload,
          badge: 261,
        },
        {
          title: "Draft",
          url: "/dashboard/draft",
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
          url: "/dashboard/social-accounts",
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
  const [isOpen, setIsOpen] = React.useState("");

  const isCollapsed =
    state === true || state === "collapsed" || state === "icon";

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b border-muted-foreground/10 mb-4 px-0">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <div className="px-2 ">
        <WorkspaceSwitcher
          setIsOpen={setIsOpen}
          isCollapsed={isCollapsed}
          workspaces={[]}
          currentWorkspaceId={""}
          onSelectWorkspace={() => {}}
          onEditWorkspace={() => {}}
          onCreateWorkspace={() => {}}
          onDeleteWorkspace={() => {}}
        />
        <Separator className="bg-muted-foreground/10 my-2" />

        <Button
          onClick={() => dispatch(openCreatePostModal())}
          className="w-full rounded-sm font-semibold text-md p-3 py-5 cursor-pointer flex items-center justify-center gap-2"
        >
          <FilePlus className="h-5 w-5" />
          {!isCollapsed && <span>Create Post</span>}
        </Button>
      </div>

      <Separator className="bg-muted-foreground/10 mt-4" />

      {/* Navigation */}
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
      <CreateWorkspaceModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </Sidebar>
  );
}
