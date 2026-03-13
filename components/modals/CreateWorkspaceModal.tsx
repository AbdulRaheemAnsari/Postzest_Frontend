import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState, useRef } from "react";
import { Upload, Palette, Sparkles } from "lucide-react";

interface CreateWorkspaceModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function CreateWorkspaceModal({
  isOpen,
  setIsOpen,
}: CreateWorkspaceModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brandColor, setBrandColor] = useState("#3B82F6");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      return;
    }

    console.log("Creating workspace:", {
      name,
      description,
      brandColor,
      image: imagePreview,
    });

    setIsOpen(false);
    setName("");
    setDescription("");
    setBrandColor("#3B82F6");
    setImagePreview(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-semibold">
              Create Workspace
            </DialogTitle>
          </div>
          <DialogDescription className="text-base">
            Set up your workspace with a unique identity and brand
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="workspace-name" className="text-sm font-medium">
              Workspace Name *
            </Label>
            <Input
              id="workspace-name"
              placeholder="e.g., Marketing Team, Personal Projects"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="py-6 transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              Workspace Picture
            </Label>
            <div className="flex md:flex-row flex-col justify-start md:items-center items-start gap-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`
                  relative cursor-pointer rounded-full border-2 border-dashed 
                  transition-all duration-200 md:w-26 md:h-20 w-22 h-22 flex items-center justify-center
                  ${isDragging
                    ? "border-primary bg-primary/5 scale-105"
                    : "border-border hover:border-primary/50 hover:bg-secondary/50"
                  }
                `}
              >
                {imagePreview ? (
                  <div className="relative w-full h-full p-1">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                    <div className="absolute inset-0 bg-foreground/40 opacity-0 hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                      <span className="text-background text-xs font-medium text-center px-2">
                        Click to change
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-4">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border border-border px-6 py-4 text-center rounded-md w-full items-center justify-center flex flex-col cursor-pointer hover:border-primary/50 hover:bg-secondary/50 transition-all"
              >
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-primary font-semibold">
                    Click to upload
                  </span>
                  or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG (max, 800x400px)
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="What's this workspace about? (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] resize-none transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Brand Color */}
          <div className="space-y-3">
            <Label
              htmlFor="brand-color"
              className="text-sm font-medium flex items-center gap-2"
            >
              <Palette className="w-4 h-4 text-primary" />
              Brand Color
            </Label>

            <div className="flex items-center gap-3">
              <div
                className="relative w-12 h-12 rounded-lg border border-border shadow-sm overflow-hidden group"
                style={{ backgroundColor: brandColor }}
              >
                <input
                  id="brand-color"
                  type="color"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/10 transition z-0">
                  <Palette className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="flex flex-col flex-1">
                <div className="flex items-center border border-border rounded-md px-3 py-2 bg-background focus-within:ring-2 focus-within:ring-primary/40 transition">
                  <span className="text-xs text-muted-foreground mr-2">
                    HEX
                  </span>
                  <input
                    type="text"
                    value={brandColor.toUpperCase()}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="flex-1 bg-transparent text-sm outline-none font-medium uppercase"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Click the box or enter a hex color
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8 pt-6 border-t">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="flex-1 py-6 font-medium cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 py-6 font-semibold text-sm cursor-pointer bg-primary hover:bg-primary/90 transition-all"
          >
            Create Workspace
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
