import { useState, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import preview from "@/assets/images/preview.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  X,
  Image as ImageIcon,
  Video,
  Smile,
  Calendar,
  Bold,
  Italic,
  Underline,
  Link as LinkIcon,
  Crop,
  Upload,
  Trash2,
  Plus,
  Info,
  WandSparkles,
  ImagePlus,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { closeCreatePostModal } from "@/store/slices/createPostModalSlice";
import { useDispatch } from "react-redux";
import { ImageCropModal } from "./ImageCropModal";
import { ScheduleModal } from "./ScheduleModal";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";

interface CreatePostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface UploadedImage {
  id: string;
  url: string;
  file?: File;
}

const CreatePostModal = ({ open, onOpenChange }: CreatePostModalProps) => {
  const dispatch = useDispatch();
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<UploadedImage | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [scheduledTime, setScheduledTime] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isOpen = useSelector(
    (state: RootState) => state.postModal.createPostModalOpen
  );

  const suggestedTags = [
    "Health",
    "Medical",
    "Doctor",
    "Viral",
    "Socialpost",
    "Medical",
  ];

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;

    const newImages: UploadedImage[] = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      file,
    }));

    setUploadedImages((prev) => [...prev, ...newImages]);
    toast.success(`${newImages.length} image(s) added`);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const imageFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );

      if (imageFiles.length > 0) {
        handleImageUpload(imageFiles as unknown as FileList);
      } else {
        toast.error("Please drop only image files");
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleCropClick = (image: UploadedImage) => {
    setImageToCrop(image);
    setCropModalOpen(true);
  };

  const handleCropComplete = (croppedImageUrl: string) => {
    if (imageToCrop) {
      setUploadedImages((prev) =>
        prev.map((img) =>
          img.id === imageToCrop.id ? { ...img, url: croppedImageUrl } : img
        )
      );
      toast.success("Image cropped successfully");
    }
  };

  const handleRemoveImage = (id: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
    toast.success("Image removed");
  };

  const handleSchedule = (date: Date, time: string) => {
    setScheduledDate(date);
    setScheduledTime(time);
    toast.success(`Post scheduled for ${date.toLocaleDateString()} at ${time}`);
  };

  const handlePostNow = () => {
    if (uploadedImages.length === 0) {
      toast.error("Please add at least one image");
      return;
    }
    toast.success("Post published successfully!");
    onOpenChange(false);
  };

  const handleSaveDraft = () => {
    toast.success("Draft saved successfully!");
  };

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags(tags ? `${tags}, ${tag}` : tag);
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={() => dispatch(closeCreatePostModal())}
      >
        <DialogContent className="max-w-[95vw] md:max-w-[1000px] p-0 gap-0 h-[90vh] overflow-hidden">
          <div className="w-full flex items-center h-full">
            {/* Left Panel */}
            <div className=" w-[60%] h-[90vh] flex flex-col">
              <div className="md:p-4 p-3 flex items-center justify-between">
                <h2 className="text-lg md:text-xl font-semibold text-foreground">
                  Create Image Post
                </h2>
              </div>

              {/* Select Accounts */}
              <div className="space-y-4 md:p-4 p-3 flex-1 overflow-y-auto pr-2">
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-foreground">
                      Select Accounts
                    </Label>
                    <Select defaultValue="ramsaanap">
                      <SelectTrigger className="w-full py-6">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ramsaanap">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary/10" />
                            <span>ramsaanap7284</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="ansari">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary/10" />
                            <span>ansari1223</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-foreground">
                      Post Type
                    </Label>
                    <Select defaultValue="image">
                      <SelectTrigger className="w-full py-6">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image">Image Post</SelectItem>
                        <SelectItem value="video">Video Post</SelectItem>
                        <SelectItem value="carousel">Carousel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Caption */}
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-foreground">
                    Add Caption
                  </Label>
                  <div className="relative">
                    <Textarea
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      className="min-h-[100px] resize-none pr-24 pb-12"
                      placeholder="Write your caption..."
                    />
                    <div className="absolute bottom-2 left-2 flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Smile className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Italic className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hidden sm:flex"
                      >
                        <Underline className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hidden sm:flex"
                      >
                        <LinkIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute rounded-sm border cursor-pointer border-dashed border-amber-500 text-amber-500 transition-colors hover:text-amber-600 bottom-2 right-2 text-xs hover:bg-[#FFCE0020]"
                    >
                      <WandSparkles />
                      Write with AI
                    </Button>
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-foreground">
                    Add Tags{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Input
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Write something..."
                    className="mb-2 py-6"
                  />
                  <div className="flex flex-wrap gap-2">
                    {suggestedTags.map((tag) => (
                      <Button
                        key={tag}
                        variant="outline"
                        size="sm"
                        className="text-xs py-4 flex items-center gap-0.5"
                        onClick={() => addTag(tag)}
                      >
                        <Plus className="w-2 h-2" />
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Media Upload */}
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-foreground">
                    Add Media
                  </Label>

                  {/* Drag & Drop Zone */}
                  {uploadedImages.length === 0 ? (
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                      className={cn(
                        "group border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                        isDragging
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <ImagePlus className="h-10 w-10 mx-auto mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-100 group-hover:text-primary text-muted-foreground" />
                      {/* <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" /> */}
                      <p className="text-sm font-medium text-foreground mb-1">
                        Drop images here or click to upload
                      </p>
                      <p className="text-xs text-muted-foreground">
                        JPEG, PNG, GIF, MPR, PDF, AVIF, WEBP
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Image Grid */}
                      <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className={cn(
                          "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 p-3 border-2 border-dashed rounded-lg",
                          isDragging
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        )}
                      >
                        {uploadedImages.map((img, index) => (
                          <div
                            key={img.id}
                            className="relative group aspect-square"
                          >
                            <img
                              src={img.url}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-1">
                              <Button
                                variant="secondary"
                                size="icon"
                                className="h-7 w-7 cursor-pointer"
                                onClick={() => handleCropClick(img)}
                              >
                                <Crop className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="icon"
                                className="h-7 w-7 cursor-pointer"
                                onClick={() => handleRemoveImage(img.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                            {index === 0 && uploadedImages.length > 1 && (
                              <div className="absolute bottom-1 left-1 bg-background/90 text-xs px-1.5 py-0.5 rounded">
                                +{uploadedImages.length - 1}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-blue-500"
                    >
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-blue-500"
                    >
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-blue-500"
                    >
                      <Smile className="h-4 w-4" />
                    </Button>
                    {uploadedImages.length > 0 && (
                      <Button
                        size="sm"
                        className="text-xs rounded-sm cursor-pointer ml-auto"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        + Add more
                      </Button>
                    )}

                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => handleImageUpload(e.target.files)}
                    />
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div
                className="bg-background sticky md:px-4 px-3 bottom-0 left-0 flex flex-col sm:flex-row 
                  items-stretch sm:items-center justify-between gap-3 mt-6 py-4 border-t z-10"
              >
                <Button
                  variant="outline"
                  onClick={handleSaveDraft}
                  className="w-full sm:w-auto cursor-pointer py-6 px-4 text-foreground hover:text-foreground rounded-sm"
                >
                  Save as Draft
                </Button>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    className="gap-2 w-full sm:w-auto cursor-pointer py-6 px-8 rounded-sm font-semibold text-foreground"
                    onClick={() => setScheduleModalOpen(true)}
                  >
                    <Calendar className="h-4 w-4" />
                    {scheduledDate ? `Scheduled: ${scheduledTime}` : "Schedule"}
                  </Button>
                  <Button
                    variant={"default"}
                    onClick={handlePostNow}
                    className="w-full bg-primary hover:bg-primary/80 font-semibold sm:w-auto py-6 px-6 rounded-sm cursor-pointer"
                  >
                    Post Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Panel - Preview */}
            <div className="bg-muted w-[40%] h-[90vh] border-t lg:border-t-0 lg:border-l p-4 md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-md font-medium text-foreground">
                  Media Preview
                </h3>
                <Info className="w-4 h-4 text-muted-foreground" />
              </div>

              {/* Instagram Preview */}
              <ScrollArea className="h-[82vh] py-8">
                <div className="bg-background rounded-lg flex-1 shadow-sm max-w-md mx-auto">
                  {/* Header */}
                  <div className="flex items-center justify-between p-3 border-b">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <div className="w-7 h-7 rounded-full bg-background flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-primary" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-semibold">
                            ramsaanap
                          </span>
                          <svg
                            className="w-3 h-3 text-blue-500"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <p className="text-[10px] text-muted-foreground">
                          Lonar, Maharashtra
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <span className="text-xl">⋯</span>
                    </Button>
                  </div>

                  {/* Image */}
                  <div className="aspect-square bg-muted-foreground/18 relative">
                    {uploadedImages.length > 0 ? (
                      <img
                        src={uploadedImages[0].url}
                        alt="Post preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <Image
                            src={preview}
                            alt="No Preview"
                            draggable={false}
                            className="w-50 object-cover"
                          />
                          {/* <ImageIcon className="h-12 w-12 mx-auto mb-2 text-muted-foreground" /> */}
                          <p className="text-sm text-muted-foreground">
                            No Preview yet!
                          </p>
                        </div>
                      </div>
                    )}
                    {uploadedImages.length > 1 && (
                      <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-background/80 flex items-center justify-center">
                        <span className="text-xs">🖼️</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                          </svg>
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                          />
                        </svg>
                      </Button>
                    </div>

                    {uploadedImages.length > 1 && (
                      <div className="flex gap-1">
                        {uploadedImages.slice(0, 5).map((_, i) => (
                          <div
                            key={i}
                            className={`h-1.5 rounded-full ${
                              i === 0
                                ? "w-6 bg-primary"
                                : "w-1.5 bg-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    <div>
                      <p className="text-xs">
                        <span className="font-semibold">ramsaanap</span>{" "}
                        <span className="text-muted-foreground">
                          {caption || "Your caption will appear here..."}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        View 1 comment
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ImageCropModal
        open={cropModalOpen}
        onOpenChange={setCropModalOpen}
        imageSrc={imageToCrop?.url || ""}
        onCropComplete={handleCropComplete}
      />

      <ScheduleModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        onSchedule={handleSchedule}
      />
    </>
  );
};

export default CreatePostModal;
