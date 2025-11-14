import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, Pause, Music } from "lucide-react";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

interface Video {
  id: number;
  caption: string;
  images: Array<{ id: string; name: string; url?: string }>;
  music: string;
  progress: number;
}

interface VideoPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  video: Video | null;
}

export const VideoPreviewModal = ({
  open,
  onOpenChange,
  video,
}: VideoPreviewModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying || !video) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentImageIndex((current) => {
            const nextIndex = current + 1;
            if (nextIndex >= video.images.length) {
              setIsPlaying(false);
              return 0;
            }
            return nextIndex;
          });
          return 0;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, video]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentImageIndex(0);
    setProgress(0);
  };

  if (!video) return null;

  const currentImage = video.images[currentImageIndex];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Video Preview</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
            {currentImage?.url ? (
              <img
                src={currentImage.url}
                alt={currentImage.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">No image available</p>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-white text-lg font-medium">{video.caption}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Image {currentImageIndex + 1} of {video.images.length}
              </span>
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4" />
                <span>{video.music || "No music selected"}</span>
              </div>
            </div>

            <Progress value={progress} className="h-1" />
          </div>

          <div className="flex items-center justify-center gap-2">
            <Button
              onClick={handlePlayPause}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" /> Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" /> Play
                </>
              )}
            </Button>

            <Button onClick={handleReset} variant="ghost" size="lg">
              Reset
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
