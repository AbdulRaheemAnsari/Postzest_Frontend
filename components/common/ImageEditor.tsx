import { useEffect, useRef, useState } from "react";
import { RotateCw, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface ImageEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  image: File;
  onSave: (editedImage: File) => void;
}

const FILTERS = [
  { name: "Normal", filter: "" },
  { name: "Grayscale", filter: "grayscale(100%)" },
  { name: "Sepia", filter: "sepia(100%)" },
  { name: "Vintage", filter: "sepia(50%) contrast(120%)" },
  { name: "Cool", filter: "hue-rotate(180deg) saturate(150%)" },
  { name: "Warm", filter: "sepia(30%) saturate(150%)" },
];

export const ImageEditor = ({ open, onOpenChange, image, onSave }: ImageEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [brightness, setBrightness] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (open && image) {
      const img = new Image();
      img.onload = () => {
        setOriginalImage(img);
        drawImage(img);
      };
      img.src = URL.createObjectURL(image);
    }
  }, [open, image]);

  useEffect(() => {
    if (originalImage) {
      drawImage(originalImage);
    }
  }, [selectedFilter, brightness, rotation, originalImage]);

  const drawImage = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle rotation
    const isRotated = rotation % 180 !== 0;
    canvas.width = isRotated ? img.height : img.width;
    canvas.height = isRotated ? img.width : img.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    // Apply rotation
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-img.width / 2, -img.height / 2);

    // Apply brightness
    ctx.filter = `brightness(${brightness}%) ${selectedFilter}`;
    ctx.drawImage(img, 0, 0);
    ctx.restore();
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleSave = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) {
        const editedFile = new File([blob], image.name, {
          type: image.type,
          lastModified: Date.now(),
        });
        onSave(editedFile);
        onOpenChange(false);
      }
    }, image.type);
  };

  const handleCancel = () => {
    setSelectedFilter("");
    setBrightness(100);
    setRotation(0);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6 py-4">
          {/* Canvas Preview */}
          <div className="flex items-center justify-center bg-muted rounded-lg p-4 min-h-[300px]">
            <canvas
              ref={canvasRef}
              className="max-w-full max-h-[400px] object-contain"
            />
          </div>

          {/* Filters */}
          <div className="space-y-3">
            <Label>Filters</Label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {FILTERS.map((filter) => (
                <button
                  key={filter.name}
                  onClick={() => setSelectedFilter(filter.filter)}
                  className={cn(
                    "relative rounded-lg overflow-hidden border-2 transition-all hover:scale-105",
                    selectedFilter === filter.filter
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border"
                  )}
                >
                  <div
                    className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20"
                    style={{ filter: filter.filter }}
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-background/90 text-xs py-1 text-center">
                    {filter.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Brightness */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Brightness</Label>
              <span className="text-sm text-muted-foreground">{brightness}%</span>
            </div>
            <Slider
              value={[brightness]}
              onValueChange={(value) => setBrightness(value[0])}
              min={50}
              max={150}
              step={1}
              className="w-full"
            />
          </div>

          {/* Rotate */}
          <div className="space-y-3">
            <Label>Rotate</Label>
            <Button
              variant="outline"
              onClick={handleRotate}
              className="gap-2"
            >
              <RotateCw className="h-4 w-4" />
              Rotate 90°
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel} className="gap-2">
            <X className="h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Check className="h-4 w-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
