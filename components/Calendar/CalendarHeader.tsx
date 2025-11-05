"use client";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe,
  LayoutGrid,
  SlidersVertical,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CalendarHeaderProps {
  currentDate: Date;
  viewType: "monthly" | "weekly";
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onViewChange: (view: "monthly" | "weekly") => void;
}

export default function CalendarHeader({
  currentDate,
  viewType,
  onPrevMonth,
  onNextMonth,
  onToday,
  onViewChange,
}: CalendarHeaderProps) {
  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onPrevMonth}
            className="p-1"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-xl font-semibold text-foreground min-w-40">
            {monthYear}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onNextMonth}
            className="p-1"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onToday}
            className="text-sm rounded-sm cursor-pointer"
          >
            Today
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 cursor-pointer rounded-sm"
              >
                {viewType === "weekly" ? "Weekly" : "Monthly"}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup
                value={viewType}
                onValueChange={onViewChange}
              >
                <DropdownMenuRadioItem value="weekly">
                  Weekly
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="monthly">
                  Monthly
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm ">
        {/* All Platforms Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="gap-2 bg-background rounded-sm cursor-pointer flex items-center justify-center"
            >
              <SlidersVertical /> All Posts
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-popover">
            <DropdownMenuItem>All</DropdownMenuItem>
            <DropdownMenuItem>Published</DropdownMenuItem>
            <DropdownMenuItem>Scheduled</DropdownMenuItem>
            <DropdownMenuItem>Draft</DropdownMenuItem>
            <DropdownMenuItem>Failled</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Tags Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="gap-2 bg-background rounded-sm cursor-pointer flex items-center justify-center"
            >
              <Tag /> Tags
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-popover">
            <DropdownMenuItem>All Tags</DropdownMenuItem>
            <DropdownMenuItem>Marketing</DropdownMenuItem>
            <DropdownMenuItem>Product</DropdownMenuItem>
            <DropdownMenuItem>News</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* All Accounts  */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="gap-2 bg-background rounded-sm cursor-pointer flex items-center justify-center"
            >
              <LayoutGrid /> All Accounts
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-popover">
            <DropdownMenuItem>All Accounts</DropdownMenuItem>
            <DropdownMenuItem>Account 1</DropdownMenuItem>
            <DropdownMenuItem>Account 2</DropdownMenuItem>
            <DropdownMenuItem>Account 3</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Zone  */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="gap-2 bg-background rounded-sm cursor-pointer flex items-center justify-center"
            >
              <Globe /> Karachi
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-popover">
            <DropdownMenuItem>All Accounts</DropdownMenuItem>
            <DropdownMenuItem>Account 1</DropdownMenuItem>
            <DropdownMenuItem>Account 2</DropdownMenuItem>
            <DropdownMenuItem>Account 3</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
