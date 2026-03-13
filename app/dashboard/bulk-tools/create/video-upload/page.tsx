"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Video,
  Trash2,
  CalendarIcon,
  Clock3,
  ArrowLeft,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
  AccountMultiSelect,
  Account,
} from "@/components/common/AccountMultiSelect";
import { cn } from "@/lib/utils";
import { FileUpload } from "@/components/common/FileUpload";

interface VideoFile {
  id: string;
  file: File;
  thumbnail: string;
  caption: string;
  date: string;
  time: string;
}

const BulkVideoUpload = () => {
  // Mock videos for demonstration
  const [videos, setVideos] = useState<VideoFile[]>([
    {
      id: "1",
      file: {} as File,
      thumbnail: "",
      caption: "",
      date: "12/9/2025",
      time: "10:28 AM",
    },
    {
      id: "2",
      file: {} as File,
      thumbnail: "",
      caption: "",
      date: "12/9/2025",
      time: "10:28 AM",
    },
    {
      id: "3",
      file: {} as File,
      thumbnail: "",
      caption: "",
      date: "12/9/2025",
      time: "10:28 AM",
    },
  ]);
  const [selectedAccounts, setSelectedAccounts] = useState<Account[]>([]);
  const [bulkCaption, setBulkCaption] = useState("");
  const [startDate, setStartDate] = useState("12/9/2025");
  const [startTime, setStartTime] = useState("10:23 AM");
  const [videosPerDay, setVideosPerDay] = useState("1");

  const getPlatformColor = (platform: string) => {
    return platform === "instagram"
      ? "bg-gradient-to-r from-purple-500 to-pink-500"
      : "bg-gradient-to-r from-cyan-500 to-blue-500";
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload logic
  };

  const applyBulkCaption = () => {
    if (bulkCaption.trim()) {
      setVideos(
        videos.map((video) => ({
          ...video,
          caption: bulkCaption,
        }))
      );
    }
  };

  const updateVideoCaption = (videoId: string, caption: string) => {
    setVideos(
      videos.map((video) =>
        video.id === videoId ? { ...video, caption } : video
      )
    );
  };

  const removeVideo = (id: string) => {
    setVideos(videos.filter((v) => v.id !== id));
  };

  return (
    <div className="bg-background">
      <div className=" py-4">
        <Button
          onClick={() => window.history.back()}
          variant="ghost"
          className="mb-4 bg-muted cursor-pointer gap-1 flex items-center justify-center text-sm text-muted-foreground hover:bg-accent/50"
        >
          <ArrowLeft />
          Back
        </Button>
        <h1 className="text-2xl font-semibold mb-6 text-foreground">
          Bulk Video Scheduling
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-primary rounded-lg p-12 flex flex-col items-center justify-center min-h-[280px] bg-background hover:bg-accent/5 transition-colors cursor-pointer">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <Video className="w-12 h-12 text-primary" strokeWidth={1.5} />
              </div>
              <p className="text-base text-foreground mb-1">
                Drag and Drop or{" "}
                <span className="text-primary font-medium cursor-pointer">
                  Click to upload
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                Up to 30 videos (max 500MB, 3s-2min each)
              </p>
              <input
                type="file"
                multiple
                accept="video/*"
                onChange={handleFileUpload}
                className="hidden"
                id="video-upload"
              />
            </div>

            {/* Bulk Setting */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                Bulk Setting
              </h2>

              {/* Select Accounts */}
              <AccountMultiSelect
                selectedAccounts={selectedAccounts}
                onSelectionChange={setSelectedAccounts}
              />

              {/* Bulk Caption */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Bulk Caption
                </label>
                <div className="relative">
                  <Textarea
                    placeholder="Enter caption to apply to all videos..."
                    value={bulkCaption}
                    onChange={(e) => setBulkCaption(e.target.value)}
                    className="min-h-[120px] resize-none bg-background"
                    maxLength={2200}
                  />
                  <span className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                    {bulkCaption.length}/2200
                  </span>
                </div>
              </div>

              {/* Apply Caption Button */}
              <Button
                onClick={applyBulkCaption}
                disabled={!bulkCaption.trim()}
                className="w-full bg-primary/10 text-primary hover:bg-primary/20 border-0 disabled:opacity-50"
                variant="outline"
              >
                Apply Caption to all Videos
              </Button>

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Start Date
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="bg-background pr-10"
                    />
                    <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Start Time
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="bg-background pr-10"
                    />
                    <Clock3 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              {/* Videos per day */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Video per day (1-24)
                </label>
                <Select value={videosPerDay} onValueChange={setVideosPerDay}>
                  <SelectTrigger className="w-full bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Apply Bulk Schedule Button */}
              <Button
                className="w-full bg-primary/10 text-primary hover:bg-primary/20 border-0"
                variant="outline"
              >
                Apply Bulk Schedule
              </Button>
            </div>

            {/* Confirm & Schedule All */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                Confirm & Schedule All
              </h2>
              <p className="text-sm text-muted-foreground">
                Review individual videos, then click below to schedule all.
              </p>

              {/* Video Cover Frame */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Video Cover Frame
                </label>
                <Select defaultValue="first">
                  <SelectTrigger className="w-full bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first">First Frame</SelectItem>
                    <SelectItem value="middle">Middle Frame</SelectItem>
                    <SelectItem value="last">Last Frame</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Confirmation Box */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-3">
                <p className="text-sm text-muted-foreground">
                  3 videos will be scheduled to the following accounts:
                </p>

                <div className="flex flex-wrap gap-2">
                  {selectedAccounts.length > 0 ? (
                    selectedAccounts.map((account) => (
                      <div
                        key={account.id}
                        className="flex items-center gap-2 bg-background rounded-md px-3 py-2 border border-border"
                      >
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={account.avatar} />
                          <AvatarFallback
                            className={cn(
                              "text-xs text-white font-medium",
                              getPlatformColor(account.platform)
                            )}
                          >
                            {account.username[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-foreground">
                          {account.username}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No accounts selected
                    </p>
                  )}
                </div>

                <p className="text-xs text-muted-foreground">
                  Posts will be spread over approximately 2 days. One video will
                  be posted per day.
                </p>
                <p className="text-xs text-muted-foreground">
                  Video thumnails will use the first frame as the cover image.
                </p>
              </div>

              {/* Schedule Button */}
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-medium">
                Schedule All 3 Videos
              </Button>
            </div>
          </div>

          {/* Right Column - Video List */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              Your Videos (3)
            </h2>

            <div className="space-y-4">
              {/* Video Cards */}
              {videos.map((video) => (
                <Card
                  key={video.id}
                  className="p-4 space-y-3 bg-card border-border"
                >
                  <div className="flex gap-3">
                    <div className="w-24 h-24 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                      <img
                        src="/placeholder.svg"
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <p className="text-sm font-medium text-foreground truncate">
                            postzest_video_mp4
                          </p>
                          <p className="text-xs text-muted-foreground">
                            1.2 MB
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeVideo(video.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="relative">
                    <Textarea
                      placeholder="Write caption"
                      value={video.caption}
                      onChange={(e) =>
                        updateVideoCaption(video.id, e.target.value)
                      }
                      className="min-h-[80px] resize-none text-sm bg-background"
                      maxLength={2200}
                    />
                    <span className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                      {video.caption.length}/2200
                    </span>
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <Input
                        type="text"
                        value={video.date}
                        onChange={(e) =>
                          setVideos(
                            videos.map((v) =>
                              v.id === video.id
                                ? { ...v, date: e.target.value }
                                : v
                            )
                          )
                        }
                        className="bg-background pr-8 text-sm h-9"
                      />
                      <CalendarIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="relative">
                      <Input
                        type="text"
                        value={video.time}
                        onChange={(e) =>
                          setVideos(
                            videos.map((v) =>
                              v.id === video.id
                                ? { ...v, time: e.target.value }
                                : v
                            )
                          )
                        }
                        className="bg-background pr-8 text-sm h-9"
                      />
                      <Clock3 className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkVideoUpload;
