"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Check, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SocialAccount, PLATFORM_CONFIGS } from "@/types/create-post";
import linkedinImg from "@/assets/images/linkedin.png";
import instagramImg from "@/assets/images/instagram.png";
import tiktokImg from "@/assets/images/tiktok.png";
import facebookImg from "@/assets/images/facebook.png";
import blueskyImg from "@/assets/images/bluesky.png";
import threadsImg from "@/assets/images/threads.png";
import youtubeImg from "@/assets/images/youtube.png";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export interface SocialAccountSelectorProps {
  accounts: SocialAccount[];
  selectedAccountIds: string[];
  onToggleAccount: (id: string) => void;
  onConnectChannelClick?: () => void;
  className?: string;
  badgeSize?: "sm" | "md" | "lg";
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

export const SocialAccountSelector: React.FC<SocialAccountSelectorProps> = ({
  accounts,
  selectedAccountIds,
  onToggleAccount,
  onConnectChannelClick,
  className,
  badgeSize = "md",
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -240 : 240;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const activeCount = selectedAccountIds.length;

  return (
    <div className={cn("w-full space-y-2", className)}>
      {/* Header bar */}
      <div className="flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">Publishing Channels</span>
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
            {activeCount} Active
          </span>
        </div>
        <span className="text-xs text-muted-foreground hidden sm:inline">
          Select platforms to distribute your content
        </span>
      </div>

      {/* Account Badges Container with Horizontal Scroll Controls */}
      <div className="relative group/scroll">
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-7 h-7 rounded-full bg-background border border-border shadow-md flex items-center justify-center text-muted-foreground hover:text-foreground opacity-0 group-hover/scroll:opacity-100 transition-opacity"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1.5 px-0.5 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {accounts.map((acc) => {
            const isSelected = selectedAccountIds.includes(acc.id);
            const platformConfig = PLATFORM_CONFIGS[acc.platform];
            const platformIcon = platformIconMap[acc.platform];

            return (
              <Tooltip key={acc.id}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => onToggleAccount(acc.id)}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-all duration-200 shrink-0 text-left cursor-pointer select-none",
                      isSelected
                        ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
                        : "border-border/80 bg-background hover:bg-muted/40 hover:border-border"
                    )}
                  >
                    {/* Avatar with Platform Badge */}
                    <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-border/50">
                      <Image
                        src={acc.avatar}
                        alt={acc.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-background flex items-center justify-center p-0.5 border border-border shadow-xs">
                        {platformIcon ? (
                          <Image
                            src={platformIcon}
                            alt={acc.platform}
                            width={12}
                            height={12}
                            className="object-contain"
                          />
                        ) : (
                          <span className="text-[9px] font-bold text-foreground">
                            {acc.platform === "x" ? "𝕏" : acc.platform[0].toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Account Info */}
                    <div className="flex flex-col min-w-[70px] max-w-[120px]">
                      <span className="text-xs font-semibold text-foreground truncate leading-tight">
                        {platformConfig?.name || acc.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground truncate leading-tight">
                        @{acc.username}
                      </span>
                    </div>

                    {/* Selected Checkmark Badge */}
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center transition-all shrink-0 ml-0.5",
                        isSelected
                          ? "bg-primary text-primary-foreground scale-100"
                          : "bg-muted text-transparent scale-90"
                      )}
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  {isSelected ? `Remove ${acc.name} from post` : `Add ${acc.name} to post`}
                </TooltipContent>
              </Tooltip>
            );
          })}

          {/* Connect Channel Button */}
          <button
            type="button"
            onClick={onConnectChannelClick}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-border/80 bg-background hover:bg-primary/5 hover:border-primary/50 text-muted-foreground hover:text-primary transition-all duration-200 shrink-0 cursor-pointer text-xs font-medium"
          >
            <Plus className="w-4 h-4" />
            <span>Connect Channel</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-7 h-7 rounded-full bg-background border border-border shadow-md flex items-center justify-center text-muted-foreground hover:text-foreground opacity-0 group-hover/scroll:opacity-100 transition-opacity"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
