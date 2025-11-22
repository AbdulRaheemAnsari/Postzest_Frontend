"use client";
import { useState } from "react";
import { Globe, Clock, Calendar, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import light from "@/assets/images/light.png";
import dark from "@/assets/images/dark.png";
import lightDark from "@/assets/images/light-dark.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import type { StaticImageData } from "next/image";

type Theme = "system" | "light" | "dark";

const Preferences = () => {
  const [timezone, setTimezone] = useState("Karachi");
  const [timeFormat, setTimeFormat] = useState("12-hours");
  const [startOfWeek, setStartOfWeek] = useState("Sunday");
  const [selectedTheme, setSelectedTheme] = useState<Theme>("system");

  const timezones = [
    "Karachi",
    "New York",
    "London",
    "Tokyo",
    "Sydney",
    "Dubai",
    "Paris",
    "Singapore",
  ];

  const timeFormats = ["12-hours", "24-hours"];

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const themes: { value: Theme; label: string; image: StaticImageData }[] = [
    { value: "system", label: "System Preference", image: lightDark },
    { value: "light", label: "Light", image: light },
    { value: "dark", label: "Dark", image: dark },
  ];

  const handleSave = () => {
    console.log("Saving preferences:", {
      timezone,
      timeFormat,
      startOfWeek,
      theme: selectedTheme,
    });
    // Add your save logic here
  };

  return (
    <div className=" bg-background py-4">
      <div className="space-y-8 container max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <h1 className="text-3xl font-semibold text-foreground">Preferences</h1>

        {/* Timezone */}
        <div className="space-y-3">
          <div>
            <h2 className="text-base font-semibold text-foreground mb-1">
              Timezone
            </h2>
            <p className="text-sm text-muted-foreground">
              Sets the default timezone for your connected channels, scheduled
              posts, and activity tracking in PostZest.
            </p>
          </div>
          <Select value={timezone} onValueChange={setTimezone}>
            <SelectTrigger className="w-full md:w-40 gap-0 bg-background">
              <Globe className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timezones.map((tz) => (
                <SelectItem key={tz} value={tz}>
                  {tz}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Time Format */}
        <div className="space-y-3">
          <div>
            <h2 className="text-base font-semibold text-foreground mb-1">
              Time Format
            </h2>
            <p className="text-sm text-muted-foreground">
              Choose how times appear in your Calendar and Schedule.
            </p>
          </div>
          <Select value={timeFormat} onValueChange={setTimeFormat}>
            <SelectTrigger className="w-full md:w-40 bg-background">
              <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeFormats.map((format) => (
                <SelectItem key={format} value={format}>
                  {format}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Start of Week */}
        <div className="space-y-3">
          <div>
            <h2 className="text-base font-semibold text-foreground mb-1">
              Start of Week
            </h2>
            <p className="text-sm text-muted-foreground">
              Choose which day your week begins for the Calendar, date picker,
              and streaks.
            </p>
          </div>
          <Select value={startOfWeek} onValueChange={setStartOfWeek}>
            <SelectTrigger className="w-full md:w-40 bg-background">
              <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {daysOfWeek.map((day) => (
                <SelectItem key={day} value={day}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Theme */}
        <div className="space-y-4">
          <div>
            <h2 className="text-base font-semibold text-foreground mb-1">
              Theme
            </h2>
            <p className="text-sm text-muted-foreground">
              Switch between light and dark mode to match your style and
              comfort.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-fit">
            {themes.map((theme) => (
              <Card
                key={theme.value}
                className="relative border-none cursor-pointer overflow-hidden shadow-none"
                onClick={() => setSelectedTheme(theme.value)}
              >
                <div>
                  {/* Theme Preview */}
                  <div
                    className={` rounded-lg p-1
                    ${
                      selectedTheme === theme.value
                        ? "border-2 border-primary duration-500 "
                        : "border-border border-2"
                    }
                    `}
                  >
                    <div
                      className={`w-fit relative pt-2 px-2 rounded-lg overflow-hidden
                    ${
                      selectedTheme === theme.value
                        ? "border-2 border-primary duration-500 "
                        : "border-border border-2"
                    }
                    bg-muted`}
                    >
                      <Image src={theme.image} alt="image" className="w-40" />

                      {selectedTheme === theme.value && (
                        <div className="bg-primary z-30 absolute left-1 bottom-1 w-5 h-5 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-background" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Theme Label */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {theme.label}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 pb-8">
          <Button
            variant="ghost"
            className="bg-muted text-muted-foreground/70 hover:text-muted-foreground/40 py-6 rounded-md font-semibold cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-primary text-background py-6 rounded-md font-semibold hover:bg-primary/80 cursor-pointer"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
