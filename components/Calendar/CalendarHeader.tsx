"use client";

import {
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  Globe,
  LayoutGrid,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { PopoverSelect } from "../common/PopoverSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
            className="p-1 cursor-pointer"
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
            className="p-1 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={onToday}
            className="text-sm rounded-sm cursor-pointer"
          >
            Today
          </Button>

          <Select value={viewType} onValueChange={onViewChange}>
            <SelectTrigger className="justify-between rounded-sm gap-2 cursor-pointer focus:ring-none focus:ring-offset-none">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm ">
        {/* All Platforms Dropdown */}
        <PopoverSelect
          isSearchable={false}
          icon={<FileSpreadsheet className="h-4 w-4" />}
          placeholder="All Posts"
          width="auto"
          options={[
            { label: "All Posts", value: "all" },
            { label: "Published", value: "published" },
            { label: "Scheduled", value: "scheduled" },
            { label: "Draft", value: "draft" },
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

        {/* All Accounts */}
        <PopoverSelect
          icon={<LayoutGrid className="h-4 w-4" />}
          placeholder="All Accounts"
          defaultValue="all"
          width="auto"
          options={[
            { label: "All Accounts", value: "all" },
            { label: "Account 1", value: "account1" },
            { label: "Account 2", value: "account2" },
            { label: "Account 3", value: "account3" },
          ]}
        />

        {/* Zone */}
        <PopoverSelect
          icon={<Globe className="h-4 w-4" />}
          placeholder="Karachi"
          defaultValue="karachi"
          width="auto"
          options={[
            { label: "Karachi", value: "karachi" },
            { label: "Lahore", value: "lahore" },
            { label: "Islamabad", value: "islamabad" },
            { label: "Multan", value: "multan" },
          ]}
        />
      </div>
    </div>
  );
}
