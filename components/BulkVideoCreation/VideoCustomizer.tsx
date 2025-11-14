import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Play,
  RefreshCw,
  Trash2,
  Edit2,
  Music,
  Settings,
  Upload,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MusicSelector } from "./MusicSelector";
import { BulkImageUpload } from "./BulkImageUpload";
import { BulkSettingsModal } from "./BulkSettingsModal";
import { VideoPreviewModal } from "./VideoPreviewModal";
import { toast } from "sonner";
// import { useToast } from "@/hooks/use-toast";

interface Video {
  id: number;
  caption: string;
  images: Array<{ id: string; name: string; url?: string }>;
  music: string;
  progress: number;
}

interface VideoCustomizerProps {
  videos: Video[];
  onVideosChange: (videos: Video[]) => void;
}

export const VideoCustomizer = ({
  videos,
  onVideosChange,
}: VideoCustomizerProps) => {
  const [editingCaption, setEditingCaption] = useState<number | null>(null);
  const [musicSelectorOpen, setMusicSelectorOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<number | null>(null);
  const [bulkUploadOpen, setBulkUploadOpen] = useState(false);
  const [bulkSettingsOpen, setBulkSettingsOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<number | null>(null);
  const [regeneratingVideo, setRegeneratingVideo] = useState<number | null>(
    null
  );
  const [regeneratingImage, setRegeneratingImage] = useState<string | null>(
    null
  );
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewVideo, setPreviewVideo] = useState<Video | null>(null);
  // const { toast } = useToast();

  const updateCaption = (id: number, caption: string) => {
    onVideosChange(videos.map((v) => (v.id === id ? { ...v, caption } : v)));
    setEditingCaption(null);
  };

  const regenerateImages = async (id: number) => {
    setRegeneratingVideo(id);
    toast.success("Regenerating images...", {
      description: "Creating 4 new images for your video",
    });

    // Simulate image regeneration with placeholder images
    setTimeout(() => {
      const video = videos.find((v) => v.id === id);
      if (!video) return;

      const newImages = Array.from({ length: 4 }, (_, index) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: `Generated Image ${index + 1}`,
        url: `https://images.unsplash.com/photo-${
          1500000000000 + Math.floor(Math.random() * 100000000)
        }?w=800&h=450&fit=crop`,
      }));

      onVideosChange(
        videos.map((v) => (v.id === id ? { ...v, images: newImages } : v))
      );

      setRegeneratingVideo(null);
      toast.success("Images regenerated!", {
        description: "New images have been created successfully",
      });
    }, 2000);
  };

  const regenerateSingleImage = async (
    videoId: number,
    imageId: string,
    imageIndex: number
  ) => {
    setRegeneratingImage(imageId);
    toast.success("Regenerating image...", {
      description: `Creating new image ${imageIndex + 1}`,
    });
    // Simulate single image regeneration with placeholder
    setTimeout(() => {
      const newImage = {
        id: Math.random().toString(36).substr(2, 9),
        name: `Generated Image ${imageIndex + 1}`,
        url: `https://images.unsplash.com/photo-${
          1500000000000 + Math.floor(Math.random() * 100000000)
        }?w=800&h=450&fit=crop`,
      };

      onVideosChange(
        videos.map((v) => {
          if (v.id === videoId) {
            const newImages = [...v.images];
            newImages[imageIndex] = newImage;
            return { ...v, images: newImages };
          }
          return v;
        })
      );

      setRegeneratingImage(null);

      toast.success("Image regenerated!", {
        description: "New image has been created successfully",
      });
    }, 1500);
  };

  const handleMusicChange = (id: number) => {
    setSelectedVideoId(id);
    setMusicSelectorOpen(true);
  };

  const handleSelectTrack = (track: string) => {
    if (selectedVideoId !== null) {
      onVideosChange(
        videos.map((v) =>
          v.id === selectedVideoId ? { ...v, music: track } : v
        )
      );
    }
  };

  const handleBulkUploadImages = (
    uploadedImages: Array<{ id: string; name: string; url: string }>
  ) => {
    // Distribute images across videos (4 images per video)
    const imagesPerVideo = 4;
    const updatedVideos = videos.map((video, index) => {
      const startIdx = index * imagesPerVideo;
      const videoImages = uploadedImages.slice(
        startIdx,
        startIdx + imagesPerVideo
      );
      return {
        ...video,
        images: videoImages.length > 0 ? videoImages : video.images,
      };
    });
    onVideosChange(updatedVideos);
  };

  const handleApplyBulkSettings = (settings: {
    musicTrack?: string;
    captionPrefix?: string;
    captionSuffix?: string;
  }) => {
    const updatedVideos = videos.map((video) => {
      let updatedVideo = { ...video };

      if (settings.musicTrack) {
        updatedVideo.music = settings.musicTrack;
      }

      if (settings.captionPrefix || settings.captionSuffix) {
        const prefix = settings.captionPrefix || "";
        const suffix = settings.captionSuffix || "";
        updatedVideo.caption = `${prefix}${prefix ? " " : ""}${video.caption}${
          suffix ? " " : ""
        }${suffix}`.trim();
      }

      return updatedVideo;
    });

    onVideosChange(updatedVideos);
  };

  const handleDeleteVideo = (id: number) => {
    setVideoToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (videoToDelete !== null) {
      onVideosChange(videos.filter((v) => v.id !== videoToDelete));
      toast.success("Video deleted", {
        description: "The video has been removed successfully",
      });
    }
    setDeleteConfirmOpen(false);
    setVideoToDelete(null);
  };

  const handlePreview = (video: Video) => {
    setPreviewVideo(video);
    setPreviewOpen(true);
  };

  const allReady = videos.every((v) => v.progress === 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Play className="w-6 h-6 text-primary" />
          <div>
            <h3 className="text-xl font-bold">Video Templates</h3>
            <p className="text-sm text-muted-foreground">
              {videos.filter((v) => v.progress === 100).length}/{videos.length}{" "}
              videos ready
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setBulkSettingsOpen(true)}
          >
            <Settings className="w-4 h-4 mr-2" />
            Bulk Settings
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setBulkUploadOpen(true)}
          >
            <Upload className="w-4 h-4 mr-2" />
            Bulk Upload
          </Button>
        </div>
      </div>

      <Progress
        value={
          (videos.filter((v) => v.progress === 100).length / videos.length) *
          100
        }
        className="h-2"
      />

      <div className="grid md:grid-cols-2 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="border rounded-xl p-5 bg-card hover:border-primary/50 transition-all space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5 text-success" />
                <h4 className="font-semibold">Video {video.id}</h4>
                <Badge variant="secondary" className="text-xs">
                  {video.progress}%
                </Badge>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handlePreview(video)}
                  title="Preview video"
                >
                  <Play className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => regenerateImages(video.id)}
                  disabled={regeneratingVideo === video.id}
                  title="Regenerate all images"
                >
                  <RefreshCw
                    className={cn(
                      "w-4 h-4",
                      regeneratingVideo === video.id && "animate-spin"
                    )}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleDeleteVideo(video.id)}
                  title="Delete video"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>

            <Progress value={video.progress} className="h-1.5" />

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Caption</label>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setEditingCaption(video.id)}
                >
                  <Edit2 className="w-3 h-3" />
                </Button>
              </div>
              {editingCaption === video.id ? (
                <Input
                  value={video.caption}
                  onChange={(e) => updateCaption(video.id, e.target.value)}
                  onBlur={() => setEditingCaption(null)}
                  autoFocus
                  className="text-sm"
                />
              ) : (
                <p className="text-sm bg-success/10 text-success-foreground p-3 rounded-lg">
                  {video.caption}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Images (2×2 Grid)</label>
                <span className="text-xs text-muted-foreground">
                  Max 50 AI photo generations/hour
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {video.images.map((image, imageIndex) => (
                  <div
                    key={image.id}
                    className="aspect-square rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground border relative group overflow-hidden"
                  >
                    {image.url ? (
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg" />
                        <span className="relative z-10 p-2 text-center">
                          {image.name}
                        </span>
                      </>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() =>
                          regenerateSingleImage(video.id, image.id, imageIndex)
                        }
                        disabled={regeneratingImage === image.id}
                        className="gap-2"
                      >
                        <RefreshCw
                          className={cn(
                            "h-3 w-3",
                            regeneratingImage === image.id && "animate-spin"
                          )}
                        />
                        {regeneratingImage === image.id ? "..." : "Regenerate"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Background Music
              </label>
              <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg">
                <Music className="w-4 h-4 text-success" />
                <span className="text-sm flex-1">{video.music}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => handleMusicChange(video.id)}
                >
                  Change
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {video.progress === 100 && (
              <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg">
                <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-success-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-success">
                  Ready for generation
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {allReady && (
        <div className="flex items-center justify-center p-4 bg-success/10 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center">
              <svg
                className="w-4 h-4 text-success-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="font-semibold">
              All videos ready for generation!
            </span>
          </div>
        </div>
      )}

      <MusicSelector
        open={musicSelectorOpen}
        onOpenChange={setMusicSelectorOpen}
        onSelectTrack={handleSelectTrack}
      />

      <BulkImageUpload
        open={bulkUploadOpen}
        onOpenChange={setBulkUploadOpen}
        onUploadImages={handleBulkUploadImages}
        videoCount={videos.length}
      />

      <BulkSettingsModal
        open={bulkSettingsOpen}
        onOpenChange={setBulkSettingsOpen}
        onApplySettings={handleApplyBulkSettings}
      />

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Video?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this video? This action cannot be
              undone and all customizations will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <VideoPreviewModal
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        video={previewVideo}
      />
    </div>
  );
};
