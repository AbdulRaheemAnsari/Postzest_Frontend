"use client"
import { useState, useRef, DragEvent } from "react";
import { Upload, Music, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  type: "image" | "music";
  onFileSelect: (file: File) => void;
  accept?: string;
  recommendedSize?: string;
}

export const UploadZone = ({
  type,
  onFileSelect,
  accept,
  recommendedSize,
}: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const Icon = type === "image" ? ImageIcon : Music;

  return (
    <div
      onClick={handleClick}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "relative border-2 border-dashed rounded-lg transition-all cursor-pointer",
        "flex flex-col items-center justify-center p-12",
        isDragging
          ? "border-primary bg-upload-hover"
          : "border-upload-border bg-upload-zone hover:border-primary hover:bg-upload-hover"
      )}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInput}
        className="hidden"
      />

      <div className="flex flex-col items-center gap-3">
        <div
          className={cn(
            "p-4 rounded-full transition-colors",
            isDragging ? "bg-primary/20" : "bg-muted"
          )}
        >
          <Icon
            className={cn(
              "w-8 h-8 transition-colors",
              isDragging ? "text-primary" : "text-muted-foreground"
            )}
          />
        </div>

        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            Click or drag to upload {type}
          </p>
          {recommendedSize && (
            <p className="text-xs text-muted-foreground mt-1">
              {recommendedSize}
            </p>
          )}
          {accept && (
            <p className="text-xs text-muted-foreground mt-1">
              {accept.split(",").join(", ")} files accepted
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
