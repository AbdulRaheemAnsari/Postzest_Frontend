"use client";

import React from "react";
import { Calendar, Send, Save, ChevronDown, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface PostActionsBarProps {
  onSaveDraft: () => void;
  onPublishNow: () => void;
  onSchedulePost: () => void;
  selectedAccountsCount: number;
  hasContent: boolean; // non-empty caption or media uploaded
  isScheduledMode: boolean;
  scheduledTimeLabel?: string;
  isSubmitting?: boolean;
  className?: string;
}

export const PostActionsBar: React.FC<PostActionsBarProps> = ({
  onSaveDraft,
  onPublishNow,
  onSchedulePost,
  selectedAccountsCount,
  hasContent,
  isScheduledMode,
  scheduledTimeLabel,
  isSubmitting = false,
  className,
}) => {
  // Validation rule: At least 1 social account selected AND content present
  const isReady = selectedAccountsCount > 0 && hasContent;

  const getDisabledReason = () => {
    if (selectedAccountsCount === 0 && !hasContent) {
      return "Select at least 1 account and add content to publish";
    }
    if (selectedAccountsCount === 0) {
      return "Please select at least 1 social channel";
    }
    if (!hasContent) {
      return "Please add post content or media";
    }
    return "";
  };

  const disabledReason = getDisabledReason();

  return (
    <div
      className={cn(
        "w-full bg-background/95 backdrop-blur-md border-t border-border/80 px-4 md:px-6 py-2.5 flex items-center justify-between gap-3 sticky bottom-0 z-30 -mb-4 -mx-4 md:-mb-6 md:-mx-6",
        className
      )}
    >
      {/* Save as Draft option */}
      <Button
        type="button"
        variant="outline"
        onClick={onSaveDraft}
        disabled={isSubmitting}
        className="px-4 py-4 text-xs sm:text-sm font-medium border-border hover:bg-muted text-foreground cursor-pointer rounded-xl gap-2 h-9"
      >
        <Save className="w-4 h-4 text-muted-foreground" />
        <span>Save as Draft</span>
      </Button>

      {/* Primary Publishing & Scheduling Actions */}
      <div className="flex items-center gap-2">
        {/* If invalid state, wrap buttons in tooltip explaining why disabled */}
        {!isReady ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  disabled={true}
                  className="px-5 py-4 text-xs sm:text-sm font-bold bg-primary/40 text-primary-foreground cursor-not-allowed rounded-xl opacity-60 gap-2 h-9"
                >
                  {isScheduledMode ? (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>{scheduledTimeLabel ? `Schedule: ${scheduledTimeLabel}` : "Schedule Post"}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Publish Now ({selectedAccountsCount} Channel{selectedAccountsCount === 1 ? "" : "s"})</span>
                    </>
                  )}
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              sideOffset={8}
              className="text-xs font-semibold bg-red-600 text-white border-none shadow-lg px-3.5 py-2 rounded-xl"
            >
              <div className="flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-white" />
                <span>{disabledReason}</span>
              </div>
            </TooltipContent>
          </Tooltip>
        ) : (
          <div className="flex items-center gap-2">
            {/* Action Dropdown button */}
            <DropdownMenu>
              <div className="inline-flex rounded-xl shadow-sm">
                <Button
                  type="button"
                  onClick={isScheduledMode ? onSchedulePost : onPublishNow}
                  disabled={isSubmitting}
                  className="px-5 py-4 text-xs sm:text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer rounded-l-xl rounded-r-none gap-2 h-9"
                >
                  {isScheduledMode ? (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>{scheduledTimeLabel ? `Schedule: ${scheduledTimeLabel}` : "Schedule Post"}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Publish Now ({selectedAccountsCount} Channel{selectedAccountsCount === 1 ? "" : "s"})</span>
                    </>
                  )}
                </Button>

                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    disabled={isSubmitting}
                    className="px-2 py-4 bg-primary/90 hover:bg-primary text-primary-foreground cursor-pointer rounded-r-xl rounded-l-none border-l border-primary-foreground/20 h-9"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
              </div>

              <DropdownMenuContent align="end" className="w-56 p-1">
                <DropdownMenuItem
                  onClick={onPublishNow}
                  className="text-xs font-semibold py-2 cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-4 h-4 text-emerald-600" />
                  <span>Publish Immediately Now</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={onSchedulePost}
                  className="text-xs font-semibold py-2 cursor-pointer flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>Schedule for Later Date/Time</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};
