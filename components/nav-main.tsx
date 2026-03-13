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
        <SidebarGroup className='' key={section.title}>
          <SidebarGroupLabel className='font-semibold text-muted-foreground/70'>{section.title}</SidebarGroupLabel>
          <SidebarMenu>
            {section.items.map((item) => {
              const isActive = pathname === item.url;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={
                      isActive
                        ? "bg-primary/10 text-primary font-semibold hover:bg-primary/10 hover:text-primary"
                        : "font-medium hover:bg-muted-foreground/10 text-foreground"
                    }
                  >
                    <Link
                      href={item.url}
                      className="flex rounded-sm items-center gap-2 w-full"
                    >
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span className="flex-1 font-semibold">{item.title}</span>
                      {item.badge && (
                        <span className="ml-auto text-xs font-semibold rounded-full px-2 py-0.5 bg-primary/10 text-primary">
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
