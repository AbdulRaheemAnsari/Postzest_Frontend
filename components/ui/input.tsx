import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm outline-none transition",
        "placeholder:text-gray-400",
        "focus:border-primary focus:ring-0",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };
