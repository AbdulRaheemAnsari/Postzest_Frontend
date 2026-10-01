"use client";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export interface NavSection {
  title: string;
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    badge?: string | number; // optional
  }[];
}

export function NavMain({ items }: { items: NavSection[] }) {
  const pathname = usePathname();

  return (
    <>
      {items.map((section) => (
        <SidebarGroup className='group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:my-0' key={section.title}>
          <SidebarGroupLabel className='font-semibold text-muted-foreground/70'>{section.title}</SidebarGroupLabel>
          <SidebarMenu className='group-data-[collapsible=icon]:gap-1'>
            {section.items.map((item) => {
              const isActive = pathname === item.url;
              return (
                <SidebarMenuItem key={item.title} className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-full">
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={
                      isActive
                        ? "bg-[#EAE8E5] hover:bg-[#EAE8E5] text-foreground rounded-md! h-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:justify-center"
                        : "font-medium! hover:bg-[#EAE8E5] text-foreground rounded-md! h-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:justify-center"
                    }
                  >
                    <Link
                      href={item.url}
                      className="flex rounded-md items-center w-full h-full px-2.5 gap-2.5 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0"
                    >
                      {item.icon && <item.icon className="h-4.5 w-4.5 shrink-0" />}
                      <span className="flex-1 font-medium text-sm group-data-[collapsible=icon]:hidden">{item.title}</span>
                      {item.badge && (
                        <span className="ml-auto text-xs font-semibold rounded-full px-2 py-0.5 bg-primary/15 text-primary group-data-[collapsible=icon]:hidden">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
