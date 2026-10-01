"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Upload, ImagePlus, AlertCircle, WandSparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import googledrive from "@/assets/images/googledrive.png";
import dropBox from "@/assets/images/dropbox.png";
import canva from "@/assets/images/canva.png";

export interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  onError?: (errorMessage: string) => void;
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number; // Maximum file size in MB per file
  className?: string;
  disabled?: boolean;
  showIntegrations?: boolean;
  compact?: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFilesSelected,
  onError,
  accept = "image/*,video/*",
  multiple = true,
  maxSizeMB = 10,
  className,
  disabled = false,
  showIntegrations = true,
  compact = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndProcessFiles = (fileList: FileList | File[]) => {
    setErrorMessage(null);
    const files = Array.from(fileList);
    const validFiles: File[] = [];
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    for (const file of files) {
      if (file.size > maxSizeBytes) {
        const msg = `File "${file.name}" (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds maximum allowed size of ${maxSizeMB}MB.`;
        setErrorMessage(msg);
        if (onError) onError(msg);
        return;
      }
      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFiles(e.target.files);
      e.target.value = "";
    }
  };

  return (
    <div className={cn("w-full flex flex-col justify-center", compact && "h-full", className)}>
      {/* Full Mode Error Banner */}
      {!compact && errorMessage && (
        <div className="flex items-center justify-between p-3 mb-2 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-destructive/80 hover:text-destructive p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Drag & Drop Box */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={cn(
          "group relative border-2 border-dashed rounded-xl transition-all duration-200 cursor-pointer text-center bg-background/50 hover:bg-muted/30 flex flex-col items-center justify-center overflow-hidden",
          isDragging
            ? "border-primary bg-primary/5 ring-4 ring-primary/10"
            : "border-border/80 hover:border-primary/50",
          compact ? "h-full w-full p-2" : "p-6 sm:p-8",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          disabled={disabled}
          className="hidden"
        />

        {compact ? (
          /* Compact Dropzone inside image grid */
          <div className="flex flex-col items-center justify-center space-y-1 text-center p-1 w-full h-full">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <ImagePlus className="w-4 h-4" />
            </div>
            <p className="text-[11px] font-medium text-muted-foreground leading-tight px-1">
              <span className="text-primary font-semibold">Drag & drop</span> or select a file
            </p>
          </div>
        ) : (
          /* Full Dropzone */
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 text-primary">
              <ImagePlus className="w-6 h-6" />
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground">
                <span className="text-primary hover:underline">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Supports JPEG, PNG, GIF, MP4, WEBP, PDF (Max {maxSizeMB}MB)
              </p>
            </div>
          </div>
        )}

        {/* Integration Buttons Row (Only in Full Mode) */}
        {!compact && showIntegrations && (
          <div
            className="flex items-center justify-between pt-4 mt-4 border-t border-border/60 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-1.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 px-2.5 bg-background border-border hover:bg-muted text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Image src={googledrive} alt="Drive" className="w-4 h-4" />
                    <span className="hidden sm:inline">Drive</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Import from Google Drive</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 px-2.5 bg-background border-border hover:bg-muted text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Image src={dropBox} alt="Dropbox" className="w-4 h-4" />
                    <span className="hidden sm:inline">Dropbox</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Import from Dropbox</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 px-2.5 bg-background border-border hover:bg-muted text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Image src={canva} alt="Canva" className="w-4 h-4" />
                    <span className="hidden sm:inline">Canva</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Design with Canva</TooltipContent>
              </Tooltip>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 text-xs font-semibold text-amber-600 border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 cursor-pointer gap-1"
            >
              <WandSparkles className="w-3.5 h-3.5" />
              <span>AI Media</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
