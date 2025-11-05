"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { openCreatePostModal } from "@/store/slices/createPostModalSlice";
import {
  ChevronDown,
  Search,
  Plus,
  LayoutGrid,
  Info,
  SlidersVertical,
  Tag,
  Clock,
} from "lucide-react";
import { useDispatch } from "react-redux";

export const FilterBar = ({ title }: { title: string }) => {
  const dispatch = useDispatch();
  return (
    <div className="bg-background py-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex flex-col items-start gap-4 flex-wrap flex-1">
          <div className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <span>{title}</span>
            <Info className="text-muted-foreground/50 w-4 h-4" />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* All Accounts Dropdown */}
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

            {/* All Platforms Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 bg-background rounded-sm cursor-pointer flex items-center justify-center"
                >
                  <SlidersVertical /> All Platforms
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-popover">
                <DropdownMenuItem>All Platforms</DropdownMenuItem>
                <DropdownMenuItem>Facebook</DropdownMenuItem>
                <DropdownMenuItem>Instagram</DropdownMenuItem>
                <DropdownMenuItem>Twitter</DropdownMenuItem>
                <DropdownMenuItem>LinkedIn</DropdownMenuItem>
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

            {/* All Time Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 bg-background rounded-sm cursor-pointer flex items-center justify-center"
                >
                  <Clock /> All Time
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-popover">
                <DropdownMenuItem>All Time</DropdownMenuItem>
                <DropdownMenuItem>Today</DropdownMenuItem>
                <DropdownMenuItem>This Week</DropdownMenuItem>
                <DropdownMenuItem>This Month</DropdownMenuItem>
                <DropdownMenuItem>This Year</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Search className="h-5 w-5" />
          </Button>
          <Button
            onClick={() => dispatch(openCreatePostModal())}
            className="flex md:w-auto w-full cursor-pointer hover:bg-primary/90 items-center justify-center gap-0.5 bg-primary py-6 !px-5 font-semibold text-sm"
          >
            <Plus strokeWidth={3} className="w-6 h-6" />
            Create Post
          </Button>
        </div>
      </div>
    </div>
  );
};
