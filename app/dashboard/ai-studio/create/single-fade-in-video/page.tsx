"use client";
import { useState } from "react";
import { ArrowLeft, Info, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { ExamplesModal } from "@/components/SingleFadeInVideoComponents/ExamplesModal";
import { UploadZone } from "@/components/SingleFadeInVideoComponents/UploadZone";

const Index = () => {
  const [caption, setCaption] = useState("");
  const [noCaptionMode, setNoCaptionMode] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const [showExamples, setShowExamples] = useState(false);

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    toast.success("Image uploaded", {
      description: `${file.name} is ready to use`,
    });
  };

  const handleMusicSelect = (file: File) => {
    setMusicFile(file);

    toast.success("Music uploaded", {
      description: `${file.name} is ready to use`,
    });
  };

  const handleGenerateVideo = () => {
    if (!imageFile) {
      toast.error("Missing image", {
        description: "Please upload an image to generate your video",
      });
      return;
    }

    toast.error("Generating video...", {
      description:
        "Your fade-in video is being created. This may take a moment.",
    });

    // Simulate video generation
    setTimeout(() => {
      toast.error("Video ready!", {
        description: "Your fade-in video has been generated successfully.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-foreground">
                Content Studio
              </h1>
              <Button
                onClick={() => window.history.back()}
                variant="ghost"
                size="sm"
                className="gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to templates
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Single Fade-in Video
            </h2>
            <p className="text-muted-foreground">
              Create stunning fade-in videos with captions and music
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Controls */}
            <div className="lg:col-span-2 space-y-6">
              {/* Caption Section */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle>Main Caption</CardTitle>
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      placeholder="Enter your main caption here..."
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      disabled={noCaptionMode}
                      className="text-base"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      id="no-caption"
                      checked={noCaptionMode}
                      onCheckedChange={setNoCaptionMode}
                    />
                    <Label
                      htmlFor="no-caption"
                      className="cursor-pointer flex items-center gap-2"
                    >
                      No Caption (Image Only)
                      <Info className="w-3 h-3 text-muted-foreground" />
                    </Label>
                  </div>
                </CardContent>
              </Card>

              {/* Image Upload */}
              <Card>
                <CardHeader>
                  <CardTitle>Upload Image</CardTitle>
                  <CardDescription>
                    Add your main visual content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {imageFile ? (
                    <div className="space-y-4">
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                        <img
                          src={URL.createObjectURL(imageFile)}
                          alt="Uploaded preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setImageFile(null)}
                        className="w-full"
                      >
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <UploadZone
                      type="image"
                      onFileSelect={handleImageSelect}
                      accept="image/*"
                      recommendedSize="Recommended size: 500×400(ish)"
                    />
                  )}
                </CardContent>
              </Card>

              {/* Music Upload */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle>Upload Music</CardTitle>
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <Button variant="outline" size="sm">
                      Free Tracks
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {musicFile ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 rounded-lg bg-muted">
                        <div className="p-3 rounded-full bg-primary/10">
                          <Video className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {musicFile.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {(musicFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setMusicFile(null)}
                        className="w-full"
                      >
                        Change Music
                      </Button>
                    </div>
                  ) : (
                    <UploadZone
                      type="music"
                      onFileSelect={handleMusicSelect}
                      accept=".mp3,.wav"
                      recommendedSize="MP3, WAV files accepted"
                    />
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Info & Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About This Template</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This simple format has been used for billions of views
                    across thousands of pieces of content. Use it now and check
                    the examples below for how you can apply it to your
                    business.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowExamples(true)}
                  >
                    Viral Examples
                  </Button>
                </CardContent>
              </Card>

              <Button
                size="lg"
                className="w-full gap-2"
                onClick={handleGenerateVideo}
              >
                <Video className="w-5 h-5" />
                Generate Video
              </Button>
            </div>
          </div>
        </div>
      </main>

      <ExamplesModal open={showExamples} onOpenChange={setShowExamples} />
    </div>
  );
};

export default Index;
