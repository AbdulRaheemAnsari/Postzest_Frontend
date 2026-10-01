"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Crop,
  Trash2,
  Plus,
  Type,
  Maximize2,
  Info,
  Sparkles,
  AlertTriangle,
  MoveHorizontal,
  AlertCircle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { UploadedMedia } from "@/types/create-post";
import { FileUploader } from "@/components/common/FileUploader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export interface MediaCarouselSectionProps {
  mediaList: UploadedMedia[];
  onAddFiles: (files: File[]) => void;
  onRemoveMedia: (id: string) => void;
  onCropMedia: (media: UploadedMedia) => void;
  onUpdateAltText: (id: string, altText: string) => void;
  selectedAspect: "4:5" | "1:1" | "16:9";
  onChangeAspect: (aspect: "4:5" | "1:1" | "16:9") => void;
  maxFiles?: number;
  maxSizeMB?: number;
  className?: string;
}

export const MediaCarouselSection: React.FC<MediaCarouselSectionProps> = ({
  mediaList,
  onAddFiles,
  onRemoveMedia,
  onCropMedia,
  onUpdateAltText,
  selectedAspect,
  onChangeAspect,
  maxFiles = 10,
  maxSizeMB = 10,
  className,
}) => {
  const [altModalMedia, setAltModalMedia] = useState<UploadedMedia | null>(null);
  const [tempAltText, setTempAltText] = useState("");
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleOpenAltModal = (media: UploadedMedia) => {
    setAltModalMedia(media);
    setTempAltText(media.altText || "");
  };

  const handleSaveAltText = () => {
    if (altModalMedia) {
      onUpdateAltText(altModalMedia.id, tempAltText);
      setAltModalMedia(null);
    }
  };

  const handleFilesAdded = (files: File[]) => {
    setUploadError(null);
    onAddFiles(files);
  };

  const handleUploadError = (msg: string) => {
    setUploadError(msg);
  };

  return (
    <div className={cn("w-full space-y-3", className)}>
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">
            Media & Carousel Attachments
          </span>
          <span className="text-xs text-muted-foreground">
            ({mediaList.length} item{mediaList.length === 1 ? "" : "s"} attached)
          </span>
        </div>

        {/* Aspect Ratio Selector Pills */}
        <div className="flex items-center gap-1 bg-muted/40 p-1 rounded-lg border border-border/50 text-xs">
          <span className="text-[11px] font-medium text-muted-foreground px-1.5 hidden sm:inline">
            Aspect:
          </span>
          {(["4:5", "1:1", "16:9"] as const).map((aspect) => (
            <button
              key={aspect}
              type="button"
              onClick={() => onChangeAspect(aspect)}
              className={cn(
                "px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer",
                selectedAspect === aspect
                  ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {aspect === "4:5" ? "4:5 Portrait" : aspect === "1:1" ? "1:1 Square" : "16:9 Wide"}
            </button>
          ))}
        </div>
      </div>

      {/* Error Message Alert Banner */}
      {uploadError && (
        <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-medium animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>{uploadError}</span>
          </div>
          <button
            type="button"
            onClick={() => setUploadError(null)}
            className="text-amber-800/80 hover:text-amber-900 p-0.5 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Grid of Uploaded Images + Add Card / FileUploader */}
      {mediaList.length === 0 ? (
        <FileUploader
          onFilesSelected={handleFilesAdded}
          onError={handleUploadError}
          maxSizeMB={maxSizeMB}
          showIntegrations={true}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-3 bg-muted/20 border border-border/70 rounded-xl items-stretch overflow-hidden">
          {mediaList.map((item, index) => {
            const aspectClass =
              selectedAspect === "4:5"
                ? "aspect-[4/5]"
                : selectedAspect === "16:9"
                ? "aspect-[16/9]"
                : "aspect-square";

            return (
              <div
                key={item.id}
                className={cn(
                  "group relative rounded-xl overflow-hidden border border-border/80 bg-background shadow-xs transition-all duration-200 hover:shadow-md",
                  aspectClass
                )}
              >
                {/* Image display */}
                <img
                  src={item.url}
                  alt={item.altText || item.name}
                  className="w-full h-full object-cover"
                />

                {/* Slide Badge */}
                <div className="absolute top-2 left-2 z-10">
                  <Badge className="bg-black/70 text-white border-none text-[10px] font-bold px-2 py-0.5 backdrop-blur-xs">
                    Slide {index + 1}
                  </Badge>
                </div>

                {/* Aspect Badge at bottom */}
                <div className="absolute bottom-2 left-2 z-10">
                  <Badge
                    variant="outline"
                    className="bg-background/90 text-foreground text-[9px] font-semibold px-1.5 py-0.2 backdrop-blur-xs border-border/80"
                  >
                    {selectedAspect}
                  </Badge>
                </div>

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-2.5 z-20">
                  <div className="flex items-center justify-end gap-1.5">
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      onClick={() => onCropMedia(item)}
                      className="w-7 h-7 bg-background/90 text-foreground hover:bg-background cursor-pointer rounded-lg"
                      title="Crop / Edit Image"
                    >
                      <Crop className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => onRemoveMedia(item.id)}
                      className="w-7 h-7 cursor-pointer rounded-lg"
                      title="Remove image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>

                  {/* Alt Text Button */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleOpenAltModal(item)}
                      className="text-[10px] font-semibold px-2 py-1 rounded-md bg-background/90 hover:bg-background text-foreground flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Type className="w-3 h-3 text-primary" />
                      <span>{item.altText ? "Edit Alt" : "+ Alt"}</span>
                    </button>
                    <span className="text-[9px] text-white/80 font-mono truncate max-w-[80px]">
                      {item.name}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Additional File Uploader Card when images already exist */}
          {mediaList.length < maxFiles && (
            <div
              className={cn(
                "rounded-xl overflow-hidden relative",
                selectedAspect === "4:5"
                  ? "aspect-[4/5]"
                  : selectedAspect === "16:9"
                  ? "aspect-[16/9]"
                  : "aspect-square"
              )}
            >
              <FileUploader
                onFilesSelected={handleFilesAdded}
                onError={handleUploadError}
                maxSizeMB={maxSizeMB}
                showIntegrations={false}
                compact={true}
                className="h-full w-full"
              />
            </div>
          )}
        </div>
      )}

      {/* Alt Text Modal */}
      <Dialog open={!!altModalMedia} onOpenChange={() => setAltModalMedia(null)}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">Image Alt Text (Accessibility)</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <p className="text-xs text-muted-foreground">
              Describe the content of this image for screen readers and search engines.
            </p>
            <Input
              value={tempAltText}
              onChange={(e) => setTempAltText(e.target.value)}
              placeholder="e.g. Infographic showing social media growth metrics in 2026..."
              className="text-sm"
            />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" onClick={() => setAltModalMedia(null)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSaveAltText} className="font-semibold">
              Save Alt Text
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
