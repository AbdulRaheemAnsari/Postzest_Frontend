import { Upload, X, Edit2 } from "lucide-react";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  selectedFiles: File[];
  onRemoveFile: (index: number) => void;
  onEditFile?: (index: number) => void;
  accept?: string;
  maxFiles?: number;
}

export const FileUpload = ({
  onFilesSelected,
  selectedFiles,
  onRemoveFile,
  onEditFile,
  accept = "image/*",
  maxFiles = 10,
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const validFiles = files.filter((file) => file.type.startsWith("image/"));

      if (selectedFiles.length + validFiles.length <= maxFiles) {
        onFilesSelected(validFiles);
      }
    },
    [onFilesSelected, selectedFiles.length, maxFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (selectedFiles.length + files.length <= maxFiles) {
        onFilesSelected(files);
      }
    },
    [onFilesSelected, selectedFiles.length, maxFiles]
  );

  return (
    <div className="space-y-4">
      {selectedFiles.length === 0 ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          )}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-foreground mb-2">
            Drag and Drop or{" "}
            <label className="text-primary cursor-pointer hover:underline">
              Click to upload
              <input
                type="file"
                multiple
                accept={accept}
                onChange={handleFileInput}
                className="hidden"
              />
            </label>
          </p>
          <p className="text-xs text-muted-foreground">
            JPEG, PNG, GIF, MPR, PDF, AVIF, WEBP
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                  {onEditFile && (
                    <button
                      onClick={() => onEditFile(index)}
                      className="bg-primary text-primary-foreground rounded-full p-2 hover:scale-110 transition-transform"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => onRemoveFile(index)}
                    className="bg-destructive text-destructive-foreground rounded-full p-2 hover:scale-110 transition-transform"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-background/90 px-2 py-1 rounded text-xs">
                    +{selectedFiles.length}
                  </div>
                )}
              </div>
            ))}
          </div>
          <label className="inline-flex items-center gap-2 text-sm text-primary cursor-pointer hover:underline">
            <Upload className="w-4 h-4" />
            Add more
            <input
              type="file"
              multiple
              accept={accept}
              onChange={handleFileInput}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
};
