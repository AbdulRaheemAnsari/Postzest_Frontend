"use client";

import React, { useState } from "react";
import { MessageSquare, WandSparkles, Smile, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface FirstCommentSectionProps {
  value: string;
  onChange: (comment: string) => void;
  enabled: boolean;
  onToggleEnabled: (enabled: boolean) => void;
  supportedPlatformsLabel?: string;
  className?: string;
}

const FIRST_COMMENT_EMOJIS = ["👇", "🔗", "💬", "📌", "💡", "👀", "🙌"];

export const FirstCommentSection: React.FC<FirstCommentSectionProps> = ({
  value,
  onChange,
  enabled,
  onToggleEnabled,
  supportedPlatformsLabel = "X, LinkedIn & Instagram",
  className,
}) => {
  return (
    <div
      className={cn(
        "w-full rounded-xl border p-4 transition-all duration-200 bg-background shadow-xs space-y-3",
        enabled ? "border-primary/50 bg-primary/2" : "border-border/60 bg-muted/20",
        className
      )}
    >
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">Automated First Comment</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600">
                <ShieldCheck className="w-3 h-3" />
                Bypass Algorithm Penalty
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Automatically post external links in the first comment for {supportedPlatformsLabel}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            id="first-comment-switch"
            checked={enabled}
            onCheckedChange={onToggleEnabled}
          />
        </div>
      </div>

      {/* Input Field (Visible when enabled) */}
      {enabled && (
        <div className="relative pt-1 animate-in fade-in duration-200">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write your first comment (e.g. Read full post on blog: https://postzest.ai)..."
            className="pr-20 py-5 text-sm bg-background border-border/80 focus-visible:ring-primary"
          />

          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <Smile className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent side="top" align="end" className="w-48 p-2">
                <div className="flex flex-wrap gap-1">
                  {FIRST_COMMENT_EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => onChange(value + emoji)}
                      className="h-7 w-7 rounded hover:bg-muted text-base flex items-center justify-center transition-colors cursor-pointer"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 cursor-pointer gap-1"
            >
              <WandSparkles className="w-3 h-3" />
              <span>AI</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
