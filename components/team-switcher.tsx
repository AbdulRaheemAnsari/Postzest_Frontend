"use client";

import * as React from "react";
import postzestLogo from "@/assets/images/postzestlogo.png";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
}) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarMenu className="!px-0">
      <SidebarMenuItem>
        <SidebarMenuButton size="sm" className="cursor-pointer hover:bg-transparent justify-start px-0">
          {isCollapsed ? (
            <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mx-auto overflow-hidden">
              <Image src={postzestLogo} alt="PostZest" className="h-6 w-20 max-w-none object-cover object-left" />
            </div>
          ) : (
            <Image src={postzestLogo} alt="PostZest" className="h-12 w-auto object-contain max-w-[170px]" />
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

