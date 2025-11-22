"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Plus,
  Settings,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useLogout } from "@/queries/auth/useLogout";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const dispatch = useDispatch();

  const { mutate: logoutUser, isPending: signUpUserIsPending } = useLogout({
    onSuccess: (res) => {
      console.log("res", res);
      toast.success(res?.data?.message);
      dispatch(logout());
      router.push("/auth/login");
    },
    onError: (err) => {
      toast.error(err?.message);
      console.log("err", err);
    },
  });

  const handleLogout = () => {
    logoutUser();
  };

  const workspaces = [
    {
      id: 1,
      name: "Workspace One",
      email: "ws1@company.com",
      avatar: "/avatars/ws1.png",
    },
    {
      id: 2,
      name: "Workspace Two",
      email: "ws2@company.com",
      avatar: "/avatars/ws2.png",
    },
  ];

  const currentWorkspaceId = 1;

  const switchWorkspace = (id: number) => {
    console.log("Switched to workspace", id);
  };

  const addWorkspace = () => {
    console.log("Add workspace clicked");
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            {/* Current User */}
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* Switch Workspace */}
            <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              Switch workspace
            </div>

            {/* Workspace List */}
            {workspaces.map((ws) => (
              <DropdownMenuItem
                key={ws.id}
                className="flex items-center gap-2 cursor-pointer py-2"
                onClick={() => switchWorkspace(ws.id)}
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={ws.avatar} alt={ws.name} />
                  <AvatarFallback className="rounded-lg">WS</AvatarFallback>
                </Avatar>

                <div className="grid flex-1 leading-tight text-sm">
                  <span className="truncate font-medium">{ws.name}</span>
                  <span className="truncate text-xs">{ws.email}</span>
                </div>

                {/* Active workspace indicator */}
                {ws.id === currentWorkspaceId ? (
                  <div className="h-3 w-3 rounded-full bg-purple-600" />
                ) : (
                  <div className="h-3 w-3 rounded-full border border-gray-300" />
                )}
              </DropdownMenuItem>
            ))}

            {/* Add Workspace */}
            <DropdownMenuItem
              className="cursor-pointer mt-1"
              onClick={addWorkspace}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add workspace
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Other Menu Items */}
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
