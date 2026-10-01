"use client";

import React, { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Crop as CropIcon, ZoomIn, RotateCw } from "lucide-react";
import Cropper, { Area } from "react-easy-crop";
import { cn } from "@/lib/utils";

interface ImageCropModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc: string;
  onCropComplete: (croppedImage: string) => void;
  initialAspect?: number;
}

export const ImageCropModal = ({
  open,
  onOpenChange,
  imageSrc,
  onCropComplete,
  initialAspect = 4 / 5,
}: ImageCropModalProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState<number>(initialAspect);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropCompleteInternal = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const createCroppedImage = async () => {
    if (!croppedAreaPixels || !imageSrc) return imageSrc;

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

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);

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
        ctx.restore();

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(URL.createObjectURL(blob));
          } else {
            resolve(imageSrc);
          }
        }, "image/jpeg");
      };
      image.onerror = () => resolve(imageSrc);
    });
  };

  const handleConfirm = async () => {
    const croppedImage = await createCroppedImage();
    onCropComplete(croppedImage);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[640px] p-0 gap-0 overflow-hidden bg-background">
        <div className="p-5 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <CropIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">Crop & Edit Image</h3>
                <p className="text-xs text-muted-foreground">Adjust framing and aspect ratio before publishing</p>
              </div>
            </div>
          </div>

          {/* Aspect Ratio Presets */}
          <div className="flex items-center justify-between gap-2 bg-muted/40 p-1.5 rounded-xl border border-border/50 text-xs">
            <span className="font-semibold text-muted-foreground px-2">Presets:</span>
            <div className="flex items-center gap-1">
              {[
                { label: "4:5 Portrait", ratio: 4 / 5 },
                { label: "1:1 Square", ratio: 1 / 1 },
                { label: "16:9 Wide", ratio: 16 / 9 },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setAspect(item.ratio)}
                  className={cn(
                    "px-3 py-1 rounded-lg font-medium transition-all cursor-pointer",
                    aspect === item.ratio
                      ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cropper Container */}
          <div className="relative h-[320px] bg-zinc-950 rounded-xl overflow-hidden border border-border/60 shadow-inner">
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={aspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
                onCropComplete={onCropCompleteInternal}
              />
            )}
          </div>

          {/* Controls: Zoom slider & Rotate button */}
          <div className="flex items-center justify-between gap-4 pt-1 px-1 text-xs">
            <div className="flex items-center gap-3 flex-1">
              <ZoomIn className="w-4 h-4 text-muted-foreground shrink-0" />
              <Slider
                value={[zoom]}
                min={1}
                max={3}
                step={0.1}
                onValueChange={(v) => setZoom(v[0])}
                className="flex-1 cursor-pointer"
              />
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setRotation((prev) => (prev + 90) % 360)}
              className="h-8 px-2.5 text-xs font-medium cursor-pointer gap-1"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Rotate</span>
            </Button>
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/60">
            <Button variant="outline" size="sm" onClick={() => onOpenChange(false)} className="px-4 h-9 cursor-pointer">
              Cancel
            </Button>
            <Button size="sm" onClick={handleConfirm} className="px-5 h-9 font-bold cursor-pointer">
              Apply Crop
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
