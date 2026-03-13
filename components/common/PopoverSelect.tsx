"use client";

import * as React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string;
}

interface PopoverSelectProps {
  icon?: React.ReactNode;
  placeholder?: string;
  options: Option[];
  defaultValue?: string;
  width?: string;
  onChange?: (value: string) => void;
  isSearchable?: boolean;
}

export function PopoverSelect({
  icon,
  placeholder = "Select...",
  options,
  defaultValue,
  width = "180px",
  isSearchable = true,
  onChange,
}: PopoverSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue || "");

  const selected = options.find((o) => o.value === value);

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue;
    setValue(newValue);
    setOpen(false);
    onChange?.(newValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "justify-between rounded-sm bg-background gap-2",
            `w-[${width}]`
          )}
        >
          <div className="flex items-center gap-2">
            {icon}
            {selected ? selected.label : placeholder}
          </div>
          <ChevronDown className="h-4 w-4 opacity-60" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className={cn("p-0", `w-[${width}] !rounded-sm shadow-[0_4px_25px_rgba(0,0,0,0.02)]`)}>
        <Command>
          {isSearchable && (
            <CommandInput placeholder={`Search...`} className="h-9" />
          )}
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.value}
                  onSelect={() => handleSelect(opt.value)}
                >
                  {opt.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === opt.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
