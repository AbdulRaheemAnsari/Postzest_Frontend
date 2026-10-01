"use client";

import React from "react";
import Image from "next/image";
import { RefreshCw, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SocialAccount, PLATFORM_CONFIGS, PlatformId } from "@/types/create-post";
import linkedinImg from "@/assets/images/linkedin.png";
import instagramImg from "@/assets/images/instagram.png";
import tiktokImg from "@/assets/images/tiktok.png";
import facebookImg from "@/assets/images/facebook.png";
import blueskyImg from "@/assets/images/bluesky.png";
import threadsImg from "@/assets/images/threads.png";
import youtubeImg from "@/assets/images/youtube.png";

export interface ChannelCustomizerProps {
  selectedAccounts: SocialAccount[];
  activeTab: "base" | string; // "base" or accountId
  onSelectTab: (tabId: "base" | string) => void;
  isCustomizingPerChannel: boolean;
  onToggleCustomizingPerChannel: (enabled: boolean) => void;
  getCharCountForTab: (tabId: "base" | string) => { count: number; max?: number };
  className?: string;
}

const platformIconMap: Record<string, any> = {
  linkedin: linkedinImg,
  instagram: instagramImg,
  tiktok: tiktokImg,
  facebook: facebookImg,
  bluesky: blueskyImg,
  threads: threadsImg,
  youtube: youtubeImg,
};

export const ChannelCustomizer: React.FC<ChannelCustomizerProps> = ({
  selectedAccounts,
  activeTab,
  onSelectTab,
  isCustomizingPerChannel,
  onToggleCustomizingPerChannel,
  getCharCountForTab,
  className,
}) => {
  return (
    <div className={cn("w-full space-y-3", className)}>
      {/* Top Header Row with Toggle Switch */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-2.5">
        {/* Channel Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          {/* Base Content Tab */}
          <button
            type="button"
            onClick={() => onSelectTab("base")}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer",
              activeTab === "base"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <RefreshCw className={cn("w-3.5 h-3.5", activeTab === "base" && "animate-spin-once")} />
            <span>Base Content (Sync All)</span>
          </button>

          {/* Individual Social Account Tabs */}
          {selectedAccounts.map((acc) => {
            const platformConfig = PLATFORM_CONFIGS[acc.platform];
            const platformIcon = platformIconMap[acc.platform];
            const { count, max } = getCharCountForTab(acc.id);
            const isTabActive = activeTab === acc.id;
            const isOver = max ? count > max : false;

            return (
              <button
                key={acc.id}
                type="button"
                onClick={() => {
                  if (!isCustomizingPerChannel) {
                    onToggleCustomizingPerChannel(true);
                  }
                  onSelectTab(acc.id);
                }}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer border",
                  isTabActive
                    ? "bg-background border-primary text-foreground shadow-xs ring-1 ring-primary/20"
                    : "bg-muted/40 border-transparent hover:bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {/* Platform Icon */}
                {platformIcon ? (
                  <Image src={platformIcon} alt={acc.platform} width={14} height={14} className="object-contain shrink-0" />
                ) : (
                  <span className="text-[10px] font-bold shrink-0">
                    {acc.platform === "x" ? "𝕏" : acc.platform[0].toUpperCase()}
                  </span>
                )}

                <span className="truncate max-w-[90px]">{acc.name}</span>

                {/* Character Count pill */}
                {max && (
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.2 rounded-full font-mono font-medium",
                      isOver
                        ? "bg-destructive/15 text-destructive font-bold"
                        : isTabActive
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {count}/{max}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Customize per channel Toggle */}
        <div className="flex items-center gap-2 ml-auto shrink-0 bg-muted/30 px-3 py-1.5 rounded-lg border border-border/50">
          <Switch
            id="customize-toggle"
            checked={isCustomizingPerChannel}
            onCheckedChange={onToggleCustomizingPerChannel}
          />
          <Label
            htmlFor="customize-toggle"
            className="text-xs font-semibold text-foreground cursor-pointer select-none flex items-center gap-1"
          >
            <span>Customize per channel</span>
            {isCustomizingPerChannel && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </Label>
        </div>
      </div>
    </div>
  );
};
