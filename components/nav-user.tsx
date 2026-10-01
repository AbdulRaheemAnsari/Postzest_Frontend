"use client";

import {
  CreditCard,
  LogOut,
  Settings,
  Sparkles,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useLogout } from "@/queries/auth/useLogout";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { toast } from "react-toastify";
import { useGetProfile } from "@/queries/user/updateUser";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile, state } = useSidebar();
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: profileData } = useGetProfile();

  const isCollapsed = state === "collapsed";

  const { mutate: logoutUser } = useLogout({
    onSuccess: (res: any) => {
      toast.success(res?.data?.message || "Logged out successfully");
      dispatch(logout());
      router.push("/auth/login");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to log out");
    },
  });

  const handleLogout = () => {
    logoutUser();
  };

  const displayName = profileData?.name || "Abdul Raheem";
  const displaySub = "Free Plan";

  const dropdownMenuItems = (
    <>
      <DropdownMenuGroup>
        <DropdownMenuItem
          onClick={() => router.push("/settings/subscription")}
          className="cursor-pointer font-medium rounded-lg py-2"
        >
          <Sparkles className="h-4 w-4 text-primary mr-2" />
          Upgrade to Pro
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      <DropdownMenuGroup>
        <DropdownMenuItem
          onClick={() => router.push("/settings/profile")}
          className="cursor-pointer font-medium rounded-lg py-2"
        >
          <User strokeWidth={2} className="h-4 w-4 mr-2" />
          View Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/settings/billing")}
          className="cursor-pointer font-medium rounded-lg py-2"
        >
          <CreditCard className="h-4 w-4 mr-2" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/settings/profile")}
          className="cursor-pointer font-medium rounded-lg py-2"
        >
          <Settings className="h-4 w-4 mr-2" />
          Account Settings
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      <DropdownMenuItem
        className="cursor-pointer font-medium text-destructive focus:text-destructive rounded-lg py-2"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4 mr-2" />
        Sign out
      </DropdownMenuItem>
    </>
  );

  return (
    <SidebarMenu className="w-full">
      <SidebarMenuItem className="w-full">
        {/* Expanded Mode Layout */}
        <div className="flex group-data-[collapsible=icon]:hidden items-center justify-between w-full gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2.5 rounded-lg hover:bg-muted-foreground/10 p-1.5 transition-colors text-left outline-none cursor-pointer flex-1 min-w-0"
                title={displayName}
              >
                <Avatar className="h-9 w-9 rounded-md bg-primary/15 text-primary shrink-0 flex items-center justify-center border border-primary/20">
                  <AvatarImage src={profileData?.avatar} alt={displayName} className="rounded-md object-cover" />
                  <AvatarFallback className="rounded-md bg-primary/20 text-primary font-bold text-sm">
                    {displayName.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="grid flex-1 text-left text-xs leading-tight min-w-0">
                  <span className="truncate font-semibold text-foreground text-sm">{displayName}</span>
                  <span className="truncate text-muted-foreground font-medium">{displaySub}</span>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60 rounded-xl p-1.5 shadow-md"
              side={isMobile ? "bottom" : "top"}
              align="start"
              sideOffset={8}
            >
              {dropdownMenuItems}
            </DropdownMenuContent>
          </DropdownMenu>

          <SidebarTrigger className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10 rounded-md cursor-pointer shrink-0" />
        </div>

        {/* Collapsed Mode Layout - Matches Reference Image 1 exactly: Toggle icon on top, profile avatar at bottom */}
        <div className="hidden group-data-[collapsible=icon]:flex flex-col items-center gap-2 w-full mx-auto">
          {/* 1. Sidebar Toggle Button */}
          <SidebarTrigger className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded-md cursor-pointer shrink-0" />

          {/* 2. Profile Avatar Button at very bottom */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="h-8 w-8 rounded-md bg-indigo-200 text-indigo-950 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity shadow-xs border border-indigo-300/40 outline-none shrink-0"
                title={displayName}
              >
                <Avatar className="h-8 w-8 rounded-md bg-indigo-200 text-indigo-950">
                  <AvatarImage src={profileData?.avatar} alt={displayName} className="rounded-md object-cover" />
                  <AvatarFallback className="rounded-md bg-indigo-200 text-indigo-950 font-bold text-sm">
                    {displayName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60 rounded-xl p-1.5 shadow-md"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={8}
            >
              {dropdownMenuItems}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}


