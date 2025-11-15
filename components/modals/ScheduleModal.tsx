import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSchedule: (date: Date, time: string) => void;
}

export const ScheduleModal = ({
  open,
  onOpenChange,
  onSchedule,
}: ScheduleModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedHour, setSelectedHour] = useState("12");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM">("PM");

  const hours = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0")
  );

  const handleSchedule = () => {
    if (!selectedDate) return;

    // Convert to 24-hour format
    let hour = parseInt(selectedHour);
    if (selectedPeriod === "PM" && hour !== 12) hour += 12;
    if (selectedPeriod === "AM" && hour === 12) hour = 0;

    const scheduledDate = new Date(selectedDate);
    scheduledDate.setHours(hour, parseInt(selectedMinute), 0, 0);

    const timeString = `${selectedHour}:${selectedMinute} ${selectedPeriod}`;
    onSchedule(scheduledDate, timeString);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[500px] p-0 gap-0">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Schedule Post
              </h2>
              <p className="text-sm text-muted-foreground">
                Choose when to publish your post
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Calendar */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground mb-2 block">
              Select Date
            </label>
            <div className="border rounded-lg">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                className={cn("p-3 pointer-events-auto")}
              />
            </div>
          </div>

          {/* Time Picker */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground mb-2 block">
              Select Time
            </label>
            <div className="flex gap-2">
              <Select value={selectedHour} onValueChange={setSelectedHour}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {hours.map((hour) => (
                    <SelectItem key={hour} value={hour}>
                      {hour}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <span className="flex items-center text-2xl text-muted-foreground">
                :
              </span>

              <Select value={selectedMinute} onValueChange={setSelectedMinute}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {minutes.map((minute) => (
                    <SelectItem key={minute} value={minute}>
                      {minute}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedPeriod}
                onValueChange={(v) => setSelectedPeriod(v as "AM" | "PM")}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Selected DateTime Display */}
          {selectedDate && (
            <div className="mb-6 p-3 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground">Scheduled for:</p>
              <p className="text-sm font-medium text-foreground">
                {format(selectedDate, "MMMM d, yyyy")} at {selectedHour}:
                {selectedMinute} {selectedPeriod}
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="flex gap-2 justify-end pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSchedule} disabled={!selectedDate}>
              Schedule Post
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
