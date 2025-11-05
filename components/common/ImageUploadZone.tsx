import { useRef } from "react";
import { Upload, X } from "lucide-react";

interface UploadedImage {
  id: string;
  url: string;
  file: File;
}

interface ImageUploadZoneProps {
  images: UploadedImage[];
  onImageUpload: (files: FileList | null) => void;
  onRemoveImage: (id: string) => void;
}

export default function ImageUploadZone({
  images,
  onImageUpload,
  onRemoveImage,
}: ImageUploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onImageUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">Add Media</label>

      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 transition-colors hover:border-primary/50 hover:bg-muted/50"
      >
        <div className="mb-2 rounded-full bg-muted p-3">
          <Upload className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="mb-1 text-sm">
          <span className="font-medium">Drag and Drop or </span>
          <span className="font-medium text-primary">Click to upload</span>
        </p>
        <p className="text-xs text-muted-foreground">
          JPEG, PNG, MP4, PDF, GIF, WEBP
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => onImageUpload(e.target.files)}
          className="hidden"
        />
      </div>

      {/* Image Thumbnails */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {images.map((image) => (
            <div key={image.id} className="group relative h-20 w-20">
              <img
                src={image.url}
                alt="Upload preview"
                className="h-full w-full rounded-lg object-cover"
              />
              <button
                onClick={() => onRemoveImage(image.id)}
                className="absolute -right-1.5 -top-1.5 rounded-full bg-destructive p-1 text-destructive-foreground shadow-md hover:bg-destructive/90"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
