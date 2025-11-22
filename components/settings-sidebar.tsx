"use client";

import * as React from "react";
import {
  ArrowLeft,
  BanknoteArrowUp,
  Bell,
  CalendarCheck,
  CalendarDays,
  CircleUserRound,
  FilePenLine,
  FilePlus,
  FileText,
  Gift,
  Layers,
  LayoutDashboard,
  Receipt,
  Settings,
  Settings2,
  Sparkles,
  Tags,
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
import { useRouter } from "next/navigation";

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
      title: "Account Settings",
      items: [
        {
          title: "Profile",
          url: "/settings/profile",
          icon: CircleUserRound,
        },
        {
          title: "Notifications",
          url: "/settings/notifications",
          icon: Bell,
        },
        {
          title: "Preferences",
          url: "/settings/preferences",
          icon: Settings2,
        },
        {
          title: "Billing",
          url: "/settings/billing",
          icon: BanknoteArrowUp,
        },
        {
          title: "Subscription",
          url: "/settings/subscription",
          icon: Receipt,
        },
        {
          title: "Manage Tags",
          url: "/settings/manage-tags",
          icon: Tags,
        },
        // {
        //   title: "Beta Features",
        //   url: "/settings/beta-features",
        //   icon: Sparkles,
        // },
        {
          title: "Refer a Friend",
          url: "/settings/refer-a-friend",
          icon: Gift,
        },
      ],
    },
  ],
};

export function SettingsSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState("");

  const isCollapsed =
    state === true || state === "collapsed" || state === "icon";

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b border-muted-foreground/10 mb-0 px-4 items-start">
        <Button
          onClick={() => router.push("/dashboard/ai-studio")}
          variant="ghost"
          className="bg-muted hover:bg-muted-foreground/10 border border-border cursor-pointer gap-1 flex items-center justify-center text-sm text-muted-foreground hover:text-muted-foreground"
        >
          <ArrowLeft />
          Back
        </Button>
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>

      {/* <Separator className="bg-muted-foreground/10 mt-4" /> */}

      {/* Navigation */}
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarRail />
      <CreateWorkspaceModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </Sidebar>
  );
}
