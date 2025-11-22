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
import { PopoverSelect } from "./PopoverSelect";

export const FilterBar = ({ title }: { title: string }) => {
  const dispatch = useDispatch();
  return (
    <div className="bg-background py-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex flex-col items-start gap-4 flex-wrap flex-1">
          <div className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <span className="text-2xl font-semibold text-foreground">{title}</span>
            <Info className="text-muted-foreground/50 w-4 h-4" />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* All Accounts Dropdown */}
            <PopoverSelect
              icon={<LayoutGrid className="h-4 w-4" />}
              placeholder="All Accounts"
              width="auto"
              options={[
                { label: "All Accounts", value: "all" },
                { label: "Account 1", value: "account-1" },
                { label: "Account 2", value: "account-2" },
                { label: "Account 3", value: "account-3" },
              ]}
            />

            {/* All Platforms Dropdown */}
            <PopoverSelect
              icon={<SlidersVertical className="h-4 w-4" />}
              placeholder="All Platforms"
              width="auto"
              options={[
                { label: "All Platforms", value: "all" },
                { label: "Facebook", value: "facebook" },
                { label: "Instagram", value: "instagram" },
                { label: "Twitter", value: "twitter" },
                { label: "LinkedIn", value: "linkedin" },
              ]}
            />

            {/* Tags Dropdown */}
            <PopoverSelect
              icon={<Tag className="h-4 w-4" />}
              placeholder="Tags"
              width="auto"
              options={[
                { label: "All Tags", value: "all" },
                { label: "Marketing", value: "marketing" },
                { label: "Product", value: "product" },
                { label: "News", value: "news" },
              ]}
            />

            {/* All Time Dropdown */}
            <PopoverSelect
            isSearchable={false}
              icon={<Clock className="h-4 w-4" />}
              placeholder="All Time"
              width="auto"
              options={[
                { label: "All Time", value: "all" },
                { label: "Today", value: "today" },
                { label: "This Week", value: "this-week" },
                { label: "This Month", value: "this-month" },
                { label: "This Year", value: "this-year" },
              ]}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Search className="h-5 w-5" />
          </Button>
          <Button
            onClick={() => dispatch(openCreatePostModal())}
            className="flex md:w-auto w-full cursor-pointer hover:bg-primary/90 items-center justify-center gap-0.5 bg-primary py-[22px] rounded-sm font-semibold text-sm"
          >
            <Plus strokeWidth={3} className="w-6 h-6" />
            Create Post
          </Button>
        </div>
      </div>
    </div>
  );
};
