import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

interface BulkImageUploadProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadImages: (
    images: Array<{ id: string; name: string; url: string }>
  ) => void;
  videoCount: number;
}

export const BulkImageUpload = ({
  open,
  onOpenChange,
  onUploadImages,
  videoCount,
}: BulkImageUploadProps) => {
  const [uploadedImages, setUploadedImages] = useState<
    Array<{ id: string; name: string; url: string }>
  >([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const recommendedCount = videoCount * 4;

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newImages = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setUploadedImages((prev) => [...prev, ...newImages]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleRemoveImage = (id: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleUseImages = () => {
    onUploadImages(uploadedImages);
    setUploadedImages([]);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setUploadedImages([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Bulk Image Upload
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Upload images to distribute across your {videoCount} videos
          </p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4">
          {uploadedImages.length === 0 ? (
            <div
              className={cn(
                "border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center gap-4 transition-colors",
                isDragging ? "border-primary bg-primary/5" : "border-border"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                <Upload className="w-10 h-10 text-muted-foreground" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-1">
                  Drop images here or click to browse
                </h3>
                <p className="text-sm text-muted-foreground">
                  Recommended: {recommendedCount} images total ({videoCount}{" "}
                  videos × 4 images each)
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer py-4"
              >
                <Upload className="w-4 h-4" />
                Select Images
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files)}
              />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  <span className="font-medium">
                    {uploadedImages.length} image
                    {uploadedImages.length !== 1 ? "s" : ""} uploaded
                  </span>
                  <span className="text-sm text-muted-foreground">
                    (Recommended: {recommendedCount})
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer py-4"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4" />
                  Add More
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFileSelect(e.target.files)}
                />
              </div>

              <div className="grid grid-cols-4 gap-3">
                {uploadedImages.map((image) => (
                  <div
                    key={image.id}
                    className="relative aspect-square rounded-lg overflow-hidden border border-border group"
                  >
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8 cursor-pointer bg-destructive/70 "
                        onClick={() => handleRemoveImage(image.id)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-foreground/70 p-2 text-xs text-background truncate">
                      {image.name}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <DialogFooter className="pt-4">
          <Button
            className="cursor-pointer text-muted-foreground py-6 px-6 rounded-sm"
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUseImages}
            disabled={uploadedImages.length === 0}
            className="bg-primary cursor-pointer py-6 rounded-sm font-semibold hover:bg-primary/90"
          >
            <ImageIcon className="w-4 h-4" />
            Use {uploadedImages.length} Image
            {uploadedImages.length !== 1 ? "s" : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
