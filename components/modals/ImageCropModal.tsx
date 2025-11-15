import { useState, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Crop as CropIcon } from "lucide-react";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop";

interface ImageCropModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc: string;
  onCropComplete: (croppedImage: string) => void;
}

const gradientFilters = [
  { id: 1, gradient: "linear-gradient(135deg, #ffd89b 0%, #19547b 100%)" },
  { id: 2, gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)" },
  { id: 3, gradient: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)" },
  { id: 4, gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
  { id: 5, gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
  { id: 6, gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)" },
  { id: 7, gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
  { id: 8, gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)" },
  { id: 9, gradient: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" },
  { id: 10, gradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)" },
];

export const ImageCropModal = ({
  open,
  onOpenChange,
  imageSrc,
  onCropComplete,
}: ImageCropModalProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const onCropCompleteInternal = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const createCroppedImage = async () => {
    if (!croppedAreaPixels) return imageSrc;

    const image = new Image();
    image.src = imageSrc;

    return new Promise<string>((resolve) => {
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          resolve(imageSrc);
          return;
        }

        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(URL.createObjectURL(blob));
          } else {
            resolve(imageSrc);
          }
        }, "image/jpeg");
      };
    });
  };

  const handleConfirm = async () => {
    const croppedImage = await createCroppedImage();
    onCropComplete(croppedImage);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[840px] p-0 gap-0">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <CropIcon className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Crop header image
                </h2>
                <p className="text-sm text-muted-foreground">
                  Upload a 1600 × 480px image for best results.
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Crop Area */}
          <div className="relative h-[320px] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZGRkIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNkZGQiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] rounded-lg overflow-hidden mb-4">
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={16 / 9}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropCompleteInternal}
                style={{
                  containerStyle: {
                    background: "transparent",
                  },
                }}
              />
            )}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: gradientFilters[selectedFilter - 1]?.gradient,
                mixBlendMode: "overlay",
                opacity: 0.3,
              }}
            />
          </div>

          {/* Filter Selection */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {gradientFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`w-10 h-10 rounded-full flex-shrink-0 transition-all ${
                  selectedFilter === filter.id
                    ? "ring-2 ring-primary ring-offset-2"
                    : "hover:scale-110"
                }`}
                style={{ background: filter.gradient }}
              />
            ))}
            <button className="w-10 h-10 rounded-full flex-shrink-0 border-2 border-dashed border-muted-foreground/30 flex items-center justify-center hover:border-muted-foreground/50 transition-colors">
              <span className="text-muted-foreground text-lg">+</span>
            </button>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2">
              <Checkbox
                id="dont-show"
                checked={dontShowAgain}
                onCheckedChange={(checked) =>
                  setDontShowAgain(checked as boolean)
                }
              />
              <label
                htmlFor="dont-show"
                className="text-sm text-foreground cursor-pointer select-none"
              >
                Don't show again
              </label>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirm}>Confirm</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
