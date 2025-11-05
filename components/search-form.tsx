import { Search } from "lucide-react";

import { Label } from "@/components/ui/label";
import { SidebarInput } from "./ui/sidebar";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props}>
      <div className="relative flex items-center">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>

        <SidebarInput
          id="search"
          placeholder="Type to search..."
          className="!py-4 w-full rounded-md border bg-white pl-10 pr-14 text-base"
        />

        {/* Left Search Icon */}
        <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 opacity-60" />

        {/* Command + K Badge */}
        <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-sm bg-muted border border-gray-300 px-2 py-0.5 text-xs font-medium text-gray-600">
          ⌘K
        </div>
      </div>
    </form>
  );
}
