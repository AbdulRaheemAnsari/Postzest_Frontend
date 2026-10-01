"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SchedulePickerSectionProps {
  scheduleType: "now" | "queue" | "custom";
  onChangeScheduleType: (type: "now" | "queue" | "custom") => void;
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  selectedTime: string;
  onSelectTime: (time: string) => void;
  timezone?: string;
  className?: string;
}

const TIME_SLOTS = [
  "08:00 AM",
  "09:15 AM",
  "10:15 AM",
  "11:30 AM",
  "01:00 PM",
  "02:30 PM",
  "04:00 PM",
  "06:30 PM",
  "08:00 PM",
];

export const SchedulePickerSection: React.FC<SchedulePickerSectionProps> = ({
  scheduleType,
  onChangeScheduleType,
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
  timezone = "UTC-5 (EST)",
  className,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <div className={cn("w-full space-y-3 p-4 rounded-xl border border-border/80 bg-background shadow-xs", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <h4 className="text-sm font-semibold text-foreground">Publishing Schedule</h4>
        </div>
        <span className="text-xs text-muted-foreground font-mono">{timezone}</span>
      </div>

      {/* Schedule Mode Selector Segmented Tabs */}
      <div className="grid grid-cols-3 gap-1 bg-muted/40 p-1 rounded-xl border border-border/50 text-xs">
        <button
          type="button"
          onClick={() => onChangeScheduleType("now")}
          className={cn(
            "py-2 rounded-lg font-semibold transition-all cursor-pointer text-center",
            scheduleType === "now"
              ? "bg-background text-foreground shadow-xs ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Post Now
        </button>

        <button
          type="button"
          onClick={() => onChangeScheduleType("queue")}
          className={cn(
            "py-2 rounded-lg font-semibold transition-all cursor-pointer text-center",
            scheduleType === "queue"
              ? "bg-background text-foreground shadow-xs ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Next in Queue
        </button>

        <button
          type="button"
          onClick={() => onChangeScheduleType("custom")}
          className={cn(
            "py-2 rounded-lg font-semibold transition-all cursor-pointer text-center",
            scheduleType === "custom"
              ? "bg-primary text-primary-foreground shadow-xs font-bold"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Custom Time
        </button>
      </div>

      {/* Date & Time Pickers (visible when scheduleType === "custom") */}
      {scheduleType === "custom" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 animate-in fade-in duration-200">
          {/* Date Picker Button */}
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-muted-foreground">Publish Date</span>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal h-10 border-border/80 text-xs cursor-pointer"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    onSelectDate(date);
                    setIsCalendarOpen(false);
                  }}
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Picker Dropdown */}
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-muted-foreground">Publish Time</span>
            <Select value={selectedTime} onValueChange={onSelectTime}>
              <SelectTrigger className="w-full h-10 border-border/80 text-xs">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {TIME_SLOTS.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    <div className="flex items-center justify-between w-full">
                      <span>{slot}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
};
