"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Send,
  Bookmark,
  Share2,
  MoreHorizontal,
  CheckCircle2,
  Globe,
  Info,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UploadedMedia, SocialAccount, PlatformId, PLATFORM_CONFIGS } from "@/types/create-post";
import linkedinImg from "@/assets/images/linkedin.png";
import instagramImg from "@/assets/images/instagram.png";
import tiktokImg from "@/assets/images/tiktok.png";
import facebookImg from "@/assets/images/facebook.png";
import blueskyImg from "@/assets/images/bluesky.png";
import threadsImg from "@/assets/images/threads.png";
import defaultAvatar from "@/assets/images/creator.png";
import previewImg from "@/assets/images/preview.png";

export interface FeedPreviewPanelProps {
  platform: PlatformId;
  onSelectPlatform: (platform: PlatformId) => void;
  account?: SocialAccount;
  caption: string;
  firstComment?: string;
  title?: string;
  mediaList: UploadedMedia[];
  className?: string;
}

const platformIconMap: Record<string, any> = {
  linkedin: linkedinImg,
  instagram: instagramImg,
  tiktok: tiktokImg,
  facebook: facebookImg,
  bluesky: blueskyImg,
  threads: threadsImg,
};

export const FeedPreviewPanel: React.FC<FeedPreviewPanelProps> = ({
  platform,
  onSelectPlatform,
  account,
  caption,
  firstComment,
  title,
  mediaList,
  className,
}) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  const authorName = account?.name || "Abdul Raheem";
  const authorHandle = account?.username || "abdul_growth";
  const avatarSrc = account?.avatar || defaultAvatar;

  const displayCaption = caption || "Your post caption will appear here...";

  return (
    <div className={cn("w-full h-full flex flex-col space-y-4", className)}>
      {/* Header & Platform Selector Tabs */}
      <div className="flex items-center justify-between pb-2 border-b border-border/60">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Feed Preview</h3>
        </div>

        {/* Platform switch tabs */}
        <div className="flex items-center gap-1 bg-muted/40 p-1 rounded-lg border border-border/50">
          {(["linkedin", "x", "instagram", "tiktok"] as PlatformId[]).map((p) => {
            const isSelected = platform === p;
            const config = PLATFORM_CONFIGS[p];

            return (
              <button
                key={p}
                type="button"
                onClick={() => onSelectPlatform(p)}
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1.5",
                  isSelected
                    ? "bg-background text-foreground font-semibold shadow-xs ring-1 ring-border"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span>{p === "x" ? "𝕏" : config?.name.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Preview Container Scrollable Area */}
      <div className="flex-1 overflow-y-auto pr-1 py-2">
        {/* LINKEDIN PREVIEW */}
        {platform === "linkedin" && (
          <div className="bg-background border border-border rounded-xl shadow-sm max-w-md mx-auto overflow-hidden">
            {/* Header */}
            <div className="p-3.5 flex items-start justify-between border-b border-border/40">
              <div className="flex items-start gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border/60 shrink-0">
                  <Image src={avatarSrc} alt={authorName} fill className="object-cover" unoptimized />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-foreground">{authorName}</span>
                    <span className="text-[10px] text-muted-foreground">• 1st</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-tight">
                    Founder at Postzest • Scaling Multichannel Distribution
                  </p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                    <span>Just now</span> • <Globe className="w-2.5 h-2.5" />
                  </p>
                </div>
              </div>
              <button type="button" className="text-muted-foreground hover:text-foreground">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Post Text */}
            <div className="p-3.5 text-xs text-foreground leading-relaxed whitespace-pre-wrap">
              {displayCaption}
            </div>

            {/* Media Gallery or Fallback Preview Image */}
            {mediaList.length > 0 ? (
              <div className="relative bg-muted/30 border-y border-border/50 aspect-[4/3] max-h-[300px] overflow-hidden flex items-center justify-center">
                <img
                  src={mediaList[activeMediaIndex]?.url || mediaList[0]?.url}
                  alt="LinkedIn media"
                  className="w-full h-full object-cover"
                />

                {mediaList.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setActiveMediaIndex((prev) => (prev > 0 ? prev - 1 : mediaList.length - 1))}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveMediaIndex((prev) => (prev < mediaList.length - 1 ? prev + 1 : 0))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-full font-mono">
                      {activeMediaIndex + 1} / {mediaList.length}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="bg-muted/15 border-y border-border/50 aspect-[4/3] max-h-[260px] overflow-hidden flex flex-col items-center justify-center p-4 text-center">
                <Image src={previewImg} alt="No Preview yet!" className="w-44 h-auto object-contain mx-auto mb-2" draggable={false} />
                <p className="text-sm font-medium text-muted-foreground">No Preview yet!</p>
              </div>
            )}

            {/* First Comment Tag Preview */}
            {firstComment && (
              <div className="mx-3.5 my-2 p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-[11px] text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                <span className="font-bold shrink-0">1st Comment:</span>
                <span className="truncate">{firstComment}</span>
              </div>
            )}

            {/* Action Buttons Bar */}
            <div className="p-2 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground font-medium">
              <button type="button" className="flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-muted cursor-pointer">
                <Heart className="w-4 h-4 text-blue-500" />
                <span>Like</span>
              </button>
              <button type="button" className="flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-muted cursor-pointer">
                <MessageCircle className="w-4 h-4" />
                <span>Comment</span>
              </button>
              <button type="button" className="flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-muted cursor-pointer">
                <Repeat2 className="w-4 h-4" />
                <span>Repost</span>
              </button>
              <button type="button" className="flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-muted cursor-pointer">
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </div>
          </div>
        )}

        {/* X (TWITTER) PREVIEW */}
        {platform === "x" && (
          <div className="bg-background border border-border rounded-xl shadow-sm max-w-md mx-auto p-4 space-y-3">
            {/* Author Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border/60 shrink-0">
                  <Image src={avatarSrc} alt={authorName} fill className="object-cover" unoptimized />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-foreground">{authorName}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500 stroke-white" />
                  </div>
                  <span className="text-[11px] text-muted-foreground">@{authorHandle}</span>
                </div>
              </div>
              <span className="text-[13px] font-bold">𝕏</span>
            </div>

            {/* Tweet Content */}
            <div className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">
              {displayCaption}
            </div>

            {/* Tweet Media or Fallback Preview Image */}
            {mediaList.length > 0 ? (
              <div className="rounded-xl overflow-hidden border border-border/60 aspect-[16/9] bg-muted/30 relative">
                <img
                  src={mediaList[0]?.url}
                  alt="Tweet media"
                  className="w-full h-full object-cover"
                />
                {mediaList.length > 1 && (
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-md font-mono">
                    +{mediaList.length - 1} more
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-xl overflow-hidden border border-border/60 aspect-[16/9] bg-muted/15 relative flex flex-col items-center justify-center p-3 text-center">
                <Image src={previewImg} alt="No Preview yet!" className="w-36 h-auto object-contain mx-auto mb-1" draggable={false} />
                <p className="text-xs font-medium text-muted-foreground">No Preview yet!</p>
              </div>
            )}

            {/* First Comment Preview */}
            {firstComment && (
              <div className="p-2 rounded-lg bg-blue-500/5 border border-blue-500/20 text-[11px] text-blue-700 dark:text-blue-300 flex items-start gap-2">
                <span className="font-bold shrink-0">Auto Reply:</span>
                <span className="truncate">{firstComment}</span>
              </div>
            )}

            {/* Engagement Metrics / Icons */}
            <div className="pt-2 border-t border-border/60 flex items-center justify-between text-muted-foreground text-xs">
              <button type="button" className="flex items-center gap-1 hover:text-blue-500 cursor-pointer">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>24</span>
              </button>
              <button type="button" className="flex items-center gap-1 hover:text-green-500 cursor-pointer">
                <Repeat2 className="w-3.5 h-3.5" />
                <span>12</span>
              </button>
              <button type="button" className="flex items-center gap-1 hover:text-pink-500 cursor-pointer">
                <Heart className="w-3.5 h-3.5" />
                <span>189</span>
              </button>
              <button type="button" className="flex items-center gap-1 hover:text-blue-500 cursor-pointer">
                <Bookmark className="w-3.5 h-3.5" />
                <span>45</span>
              </button>
              <button type="button" className="hover:text-foreground cursor-pointer">
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* INSTAGRAM PREVIEW */}
        {platform === "instagram" && (
          <div className="bg-background border border-border rounded-xl shadow-sm max-w-md mx-auto overflow-hidden">
            {/* Header */}
            <div className="p-3 flex items-center justify-between border-b border-border/50">
              <div className="flex items-center gap-2">
                <div className="p-0.5 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden border border-background">
                    <Image src={avatarSrc} alt={authorName} fill className="object-cover" unoptimized />
                  </div>
                </div>
                <span className="text-xs font-bold text-foreground">{authorHandle}</span>
              </div>
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </div>

            {/* Media Canvas or Fallback Preview Image */}
            <div className="aspect-square bg-muted/15 relative flex items-center justify-center">
              {mediaList.length > 0 ? (
                <img
                  src={mediaList[0]?.url}
                  alt="Instagram media"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-6 flex flex-col items-center justify-center">
                  <Image src={previewImg} alt="No Preview yet!" className="w-48 h-auto object-contain mx-auto mb-2" draggable={false} />
                  <p className="text-sm font-medium text-muted-foreground">No Preview yet!</p>
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between text-foreground">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 cursor-pointer hover:text-pink-500" />
                  <MessageCircle className="w-5 h-5 cursor-pointer hover:text-primary" />
                  <Send className="w-5 h-5 cursor-pointer hover:text-primary" />
                </div>
                <Bookmark className="w-5 h-5 cursor-pointer hover:text-primary" />
              </div>

              {/* Caption */}
              <div className="text-xs text-foreground leading-snug">
                <span className="font-bold mr-1.5">{authorHandle}</span>
                <span className="text-muted-foreground">{displayCaption}</span>
              </div>
            </div>
          </div>
        )}

        {/* TIKTOK PREVIEW */}
        {platform === "tiktok" && (
          <div className="bg-black text-white rounded-2xl shadow-xl max-w-sm mx-auto overflow-hidden relative aspect-[9/16] flex flex-col justify-between p-4">
            {/* Top Bar */}
            <div className="flex items-center justify-between text-xs font-semibold z-10">
              <span>Following</span>
              <span className="underline underline-offset-4 decoration-white">For You</span>
              <span>🔍</span>
            </div>

            {/* Background Media or Fallback Preview Image */}
            {mediaList.length > 0 ? (
              <img
                src={mediaList[0]?.url}
                alt="TikTok background"
                className="absolute inset-0 w-full h-full object-cover opacity-90"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-800 to-black flex flex-col items-center justify-center text-center p-6">
                <Image src={previewImg} alt="No Preview yet!" className="w-44 h-auto object-contain mx-auto mb-3 opacity-90" draggable={false} />
                <p className="text-xs font-medium text-zinc-300">No Preview yet!</p>
              </div>
            )}

            {/* TikTok Overlay Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Bottom Content & Side Buttons */}
            <div className="relative z-10 flex items-end justify-between gap-4 mt-auto">
              <div className="space-y-1.5 max-w-[80%]">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">@{authorHandle}</span>
                  <span className="bg-red-500 text-[9px] px-1.5 py-0.2 rounded font-bold">LIVE</span>
                </div>
                {title && <p className="text-xs font-bold text-amber-300">{title}</p>}
                <p className="text-xs text-zinc-200 line-clamp-3">{displayCaption}</p>
              </div>

              {/* Right Sidebar Icons */}
              <div className="flex flex-col items-center gap-4 text-xs">
                <div className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                  <Image src={avatarSrc} alt={authorName} fill className="object-cover" unoptimized />
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <Heart className="w-6 h-6 fill-white text-white" />
                  <span className="text-[10px] font-bold">12.4K</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <MessageCircle className="w-6 h-6 fill-white text-white" />
                  <span className="text-[10px] font-bold">842</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <Bookmark className="w-6 h-6 fill-white text-white" />
                  <span className="text-[10px] font-bold">3.1K</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <Share2 className="w-6 h-6 text-white" />
                  <span className="text-[10px] font-bold">Share</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
