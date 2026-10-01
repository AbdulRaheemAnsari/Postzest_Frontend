"use client";

import React, { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { closeCreatePostModal } from "@/store/slices/createPostModalSlice";
import { openSocialConnectModal } from "@/store/slices/socialConnectModalSlice";
import {
  Tag,
  FileText,
  WandSparkles,
  Eye,
  Maximize2,
  Minimize2,
  X,
  Pin,
  ChevronDown,
  Check,
  AlertCircle,
  Clock,
  Send,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SocialAccountSelector } from "@/components/common/SocialAccountSelector";
import { RichTextEditor } from "@/components/create-post/RichTextEditor";
import { ChannelCustomizer } from "@/components/create-post/ChannelCustomizer";
import { FirstCommentSection } from "@/components/create-post/FirstCommentSection";
import { MediaCarouselSection } from "@/components/create-post/MediaCarouselSection";
import { FeedPreviewPanel } from "@/components/create-post/FeedPreviewPanel";
import { ImageCropModal } from "@/components/modals/ImageCropModal";
import { SocialAccount, UploadedMedia, PlatformId, PLATFORM_CONFIGS } from "@/types/create-post";

import alexAvatar from "@/assets/images/creator.png";
import testImage1 from "@/assets/images/dashboard-hero.png";

const MOCK_ACCOUNTS: SocialAccount[] = [
  {
    id: "x-1",
    name: "X (Twitter)",
    username: "alex_growth",
    platform: "x",
    avatar: alexAvatar.src,
    isConnected: true,
  },
  {
    id: "linkedin-1",
    name: "LinkedIn",
    username: "alexchen",
    platform: "linkedin",
    avatar: alexAvatar.src,
    isConnected: true,
  },
  {
    id: "instagram-1",
    name: "Instagram",
    username: "alexcreates",
    platform: "instagram",
    avatar: alexAvatar.src,
    isConnected: true,
  },
  {
    id: "tiktok-1",
    name: "TikTok",
    username: "alexcreates",
    platform: "tiktok",
    avatar: alexAvatar.src,
    isConnected: true,
  },
  {
    id: "threads-1",
    name: "Threads",
    username: "alex_growth",
    platform: "threads",
    avatar: alexAvatar.src,
    isConnected: true,
  },
  {
    id: "bluesky-1",
    name: "Bluesky",
    username: "alexchen.bsky",
    platform: "bluesky",
    avatar: alexAvatar.src,
    isConnected: true,
  },
];

const TIME_SLOTS = [
  "08:00 AM",
  "09:15 AM",
  "10:15 AM",
  "11:30 AM",
  "01:00 PM",
  "02:30 PM",
  "04:00 PM",
  "06:30 PM",
  "08:00 PM",
];

export interface CreatePostModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function CreatePostModal({ open, onOpenChange }: CreatePostModalProps) {
  const dispatch = useDispatch();
  const reduxOpen = useSelector(
    (state: RootState) => state.postModal.createPostModalOpen
  );
  const isOpen = open !== undefined ? open : reduxOpen;

  const handleClose = () => {
    if (onOpenChange) onOpenChange(false);
    dispatch(closeCreatePostModal());
  };

  // Accounts state
  const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>([
    "linkedin-1",
    "tiktok-1",
  ]);

  // Buffer-style Channel Customization State
  const [isCustomizingPerChannel, setIsCustomizingPerChannel] = useState(false);
  const [activeTab, setActiveTab] = useState<"base" | string>("base");

  // Content States
  const [baseCaption, setBaseCaption] = useState(
    "Hey there is very big news for you I am building a product for creators"
  );
  const [baseFirstComment, setBaseFirstComment] = useState("");
  const [baseTitle, setBaseTitle] = useState("");

  // Channel Overrides: key is accountId
  const [channelOverrides, setChannelOverrides] = useState<
    Record<string, { caption: string; firstComment: string; title?: string }>
  >({
    "tiktok-1": {
      caption: "djskdsjdskdjskdjskdjsdjs",
      firstComment: "",
      title: "",
    },
  });

  const [firstCommentEnabled, setFirstCommentEnabled] = useState(true);

  // Uploaded Media State
  const [mediaList, setMediaList] = useState<UploadedMedia[]>([
    {
      id: "media-1",
      url: alexAvatar.src,
      name: "creator-photo.png",
      size: 1.1 * 1024 * 1024,
      type: "image",
    },
    {
      id: "media-2",
      url: testImage1.src,
      name: "dashboard-analytics.png",
      size: 1.8 * 1024 * 1024,
      type: "image",
    },
  ]);
  const [selectedAspect, setSelectedAspect] = useState<"4:5" | "1:1" | "16:9">("4:5");

  // Action Mode State: "schedule" | "now"
  const [postActionMode, setPostActionMode] = useState<"schedule" | "now">("schedule");

  // Scheduling state
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(Date.now() + 86400000)
  );
  const [selectedTime, setSelectedTime] = useState<string>("02:56 AM");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [createAnother, setCreateAnother] = useState(true);

  // Preview Platform State
  const [previewPlatform, setPreviewPlatform] = useState<PlatformId>("linkedin");

  // Crop Modal state
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<UploadedMedia | null>(null);

  // Smooth Maximize / Full-Screen state
  const [isMaximized, setIsMaximized] = useState(false);

  // Account selector helpers
  const handleToggleAccount = (id: string) => {
    setSelectedAccountIds((prev) =>
      prev.includes(id) ? prev.filter((accId) => accId !== id) : [...prev, id]
    );
  };

  const selectedAccounts = MOCK_ACCOUNTS.filter((acc) =>
    selectedAccountIds.includes(acc.id)
  );

  // Active Content Getter/Setter based on active tab
  const getActiveCaption = (): string => {
    if (activeTab === "base" || !isCustomizingPerChannel) return baseCaption;
    return channelOverrides[activeTab]?.caption ?? baseCaption;
  };

  const getActiveFirstComment = (): string => {
    if (activeTab === "base" || !isCustomizingPerChannel) return baseFirstComment;
    return channelOverrides[activeTab]?.firstComment ?? baseFirstComment;
  };

  const getActiveTitle = (): string => {
    if (activeTab === "base" || !isCustomizingPerChannel) return baseTitle;
    return channelOverrides[activeTab]?.title ?? baseTitle;
  };

  const handleCaptionChange = (val: string) => {
    if (activeTab === "base" || !isCustomizingPerChannel) {
      setBaseCaption(val);
    } else {
      setChannelOverrides((prev) => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          caption: val,
          firstComment: prev[activeTab]?.firstComment ?? baseFirstComment,
        },
      }));
    }
  };

  const handleFirstCommentChange = (val: string) => {
    if (activeTab === "base" || !isCustomizingPerChannel) {
      setBaseFirstComment(val);
    } else {
      setChannelOverrides((prev) => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          caption: prev[activeTab]?.caption ?? baseCaption,
          firstComment: val,
        },
      }));
    }
  };

  const getCharCountForTab = (tabId: "base" | string) => {
    if (tabId === "base") {
      return { count: baseCaption.length };
    }
    const acc = MOCK_ACCOUNTS.find((a) => a.id === tabId);
    const platformConfig = acc ? PLATFORM_CONFIGS[acc.platform] : undefined;
    const text = channelOverrides[tabId]?.caption ?? baseCaption;
    return {
      count: text.length,
      max: platformConfig?.maxChars,
    };
  };

  // Media Handlers
  const handleAddFiles = (files: File[]) => {
    const newItems: UploadedMedia[] = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      file,
      name: file.name,
      size: file.size,
      type: file.type.startsWith("video/") ? "video" : "image",
    }));

    setMediaList((prev) => [...prev, ...newItems]);
    toast.success(`${files.length} file(s) attached!`);
  };

  const handleRemoveMedia = (id: string) => {
    setMediaList((prev) => prev.filter((item) => item.id !== id));
    toast.info("Media removed");
  };

  const handleCropClick = (media: UploadedMedia) => {
    setImageToCrop(media);
    setCropModalOpen(true);
  };

  const handleCropComplete = (croppedUrl: string) => {
    if (imageToCrop) {
      setMediaList((prev) =>
        prev.map((item) => (item.id === imageToCrop.id ? { ...item, url: croppedUrl } : item))
      );
      toast.success("Image cropped successfully!");
    }
  };

  const handleUpdateAltText = (id: string, altText: string) => {
    setMediaList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, altText } : item))
    );
    toast.success("Alt text updated");
  };

  // Actions
  const handleSaveDraft = () => {
    toast.success("Draft saved successfully!");
  };

  const handlePublishNow = () => {
    if (selectedAccountIds.length === 0) {
      toast.error("Please select at least 1 social channel");
      return;
    }
    toast.success(`Post published live across ${selectedAccountIds.length} channels!`);
    if (!createAnother) handleClose();
  };

  const handleSchedulePost = () => {
    if (selectedAccountIds.length === 0) {
      toast.error("Please select at least 1 social channel");
      return;
    }
    const dateStr = selectedDate ? format(selectedDate, "MMM d, yyyy") : "Selected Date";
    toast.success(`Post scheduled for ${dateStr} at ${selectedTime}!`);
    if (!createAnother) handleClose();
  };

  const activeAccount = MOCK_ACCOUNTS.find((a) => a.id === activeTab);
  const activeChannelName = activeAccount ? activeAccount.name : undefined;
  const activePlatformMaxChars = activeAccount
    ? PLATFORM_CONFIGS[activeAccount.platform]?.maxChars
    : undefined;

  const hasContent = getActiveCaption().trim().length > 0 || mediaList.length > 0;
  const isReady = selectedAccountIds.length > 0 && hasContent;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent
          className={
            isMaximized
              ? "max-w-none w-screen h-screen max-h-screen p-0 gap-0 overflow-hidden flex flex-col rounded-none border-none bg-background shadow-none transition-all duration-300 ease-in-out inset-0 fixed z-50"
              : "max-w-[95vw] md:max-w-[1240px] w-[95vw] h-[90vh] max-h-[90vh] p-0 gap-0 overflow-hidden flex flex-col rounded-xl bg-background border border-border shadow-2xl transition-all duration-300 ease-in-out"
          }
        >
          {/* 1. Modal Header (Exact reference design) */}
          <div className="p-3 px-4 border-b border-border/80 flex items-center justify-between bg-background shrink-0 z-10">
            <div className="flex items-center gap-3">
              <h2 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                Create Post
              </h2>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-2.5 rounded-lg text-xs font-semibold border-border hover:bg-muted text-foreground cursor-pointer gap-1.5"
                  >
                    <Tag className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>Tags</span>
                    <ChevronDown className="w-3 h-3 text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="bottom" align="start" className="w-48 p-2">
                  <div className="text-xs space-y-1">
                    <p className="font-semibold text-muted-foreground px-2 py-1">Select Tags</p>
                    {["#Health", "#Medical", "#Doctor", "#Viral", "#Socialpost"].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        className="w-full text-left px-2 py-1 rounded hover:bg-muted text-xs font-medium cursor-pointer"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Header Right Action Icons */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer gap-1.5 hidden sm:flex"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Templates</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer gap-1.5"
              >
                <WandSparkles className="w-3.5 h-3.5" />
                <span>AI Assistant</span>
              </Button>

              {/* Active Green Preview Pill */}
              <div className="h-8 px-3 rounded-xl text-xs font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 border border-emerald-500/20">
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </div>

              {/* Smooth Fullscreen Maximize / Minimize Toggle */}
              <button
                type="button"
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors cursor-pointer"
                title={isMaximized ? "Exit full screen" : "Full screen expand"}
              >
                {isMaximized ? (
                  <Minimize2 className="w-4 h-4 text-primary" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={handleClose}
                className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors cursor-pointer"
                title="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2. Modal Body: Independent Dual Column Scrolling */}
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
            {/* Left Column: Editing Section (Independent Scroll) */}
            <div className="lg:col-span-7 h-full overflow-y-auto p-4 md:p-5 space-y-5 flex flex-col">
              {/* Social Accounts Selector */}
              <div className="bg-background border border-border/80 rounded-2xl p-4 shadow-xs">
                <SocialAccountSelector
                  accounts={MOCK_ACCOUNTS}
                  selectedAccountIds={selectedAccountIds}
                  onToggleAccount={handleToggleAccount}
                  onConnectChannelClick={() => dispatch(openSocialConnectModal())}
                />
              </div>

              {/* Buffer-style Channel Customizer System */}
              <div className="bg-background border border-border/80 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
                <ChannelCustomizer
                  selectedAccounts={selectedAccounts}
                  activeTab={activeTab}
                  onSelectTab={setActiveTab}
                  isCustomizingPerChannel={isCustomizingPerChannel}
                  onToggleCustomizingPerChannel={setIsCustomizingPerChannel}
                  getCharCountForTab={getCharCountForTab}
                />

                <RichTextEditor
                  value={getActiveCaption()}
                  onChange={handleCaptionChange}
                  maxChars={activePlatformMaxChars}
                  channelName={activeChannelName}
                />
              </div>

              {/* First Comment Section */}
              <FirstCommentSection
                value={getActiveFirstComment()}
                onChange={handleFirstCommentChange}
                enabled={firstCommentEnabled}
                onToggleEnabled={setFirstCommentEnabled}
              />

              {/* Media & Carousel Section */}
              <div className="bg-background border border-border/80 rounded-2xl p-4 sm:p-5 shadow-xs">
                <MediaCarouselSection
                  mediaList={mediaList}
                  onAddFiles={handleAddFiles}
                  onRemoveMedia={handleRemoveMedia}
                  onCropMedia={handleCropClick}
                  onUpdateAltText={handleUpdateAltText}
                  selectedAspect={selectedAspect}
                  onChangeAspect={setSelectedAspect}
                />
              </div>
            </div>

            {/* Right Column: Post Preview & Scheduling (Independent Scroll + Sidebar Background #F7F6F3) */}
            <div className="lg:col-span-5 h-full overflow-y-auto p-4 md:p-5 space-y-5 bg-[#F7F6F3] dark:bg-muted/20 border-l border-border/80 flex flex-col">
              {/* Live Feed Preview Panel */}
              <div className="bg-background border border-border/80 rounded-2xl p-3 sm:p-4 shadow-xs flex-1 flex flex-col min-h-[460px]">
                <FeedPreviewPanel
                  platform={previewPlatform}
                  onSelectPlatform={setPreviewPlatform}
                  account={selectedAccounts.find((a) => a.platform === previewPlatform)}
                  caption={getActiveCaption()}
                  firstComment={firstCommentEnabled ? getActiveFirstComment() : ""}
                  title={getActiveTitle()}
                  mediaList={mediaList}
                />
              </div>
            </div>
          </div>

          {/* 3. Modal Footer: Both Publish Now and Schedule Post Available */}
          <div className="p-3 px-4 md:px-6 border-t border-border/80 flex flex-wrap items-center justify-between gap-3 bg-background shrink-0 z-10">
            {/* Left Side Footer Actions */}
            <div className="flex items-center gap-3">

              <span className="text-border mx-1">•</span>

              <button
                type="button"
                onClick={handleSaveDraft}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Save Drafts
              </button>
            </div>

            {/* Right Side Footer Scheduling & Publishing Action Controls */}
            <div className="flex items-center">
              {/* Outer Unified Control Container */}
              <div className="inline-flex items-stretch rounded-xl border border-border bg-background shadow-xs overflow-hidden h-10">
                {/* Date & Time Picker Popover Pill (Visible in Schedule mode) */}
                {postActionMode === "schedule" && (
                  <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="h-full px-3.5 bg-background hover:bg-muted/40 text-xs font-semibold text-foreground flex items-center gap-1.5 cursor-pointer border-r border-border transition-colors outline-none"
                      >
                        <Pin className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>
                          {selectedDate
                            ? `${format(selectedDate, "MMM d")}, ${selectedTime}`
                            : "Set Date and Time"}
                        </span>
                        <ChevronDown className="w-3 h-3 text-muted-foreground" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent side="top" align="end" className="w-72 p-3 space-y-3">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-foreground">Select Schedule Date</p>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => setSelectedDate(date)}
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        />
                      </div>
                      <div className="space-y-1 pt-1 border-t border-border">
                        <p className="text-xs font-semibold text-foreground">Select Time</p>
                        <Select value={selectedTime} onValueChange={setSelectedTime}>
                          <SelectTrigger className="w-full h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {TIME_SLOTS.map((slot) => (
                              <SelectItem key={slot} value={slot}>
                                {slot}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}

                {/* Action Buttons Combo with Split Dropdown */}
                <div className="inline-flex items-stretch bg-primary text-primary-foreground h-full">
                  {!isReady ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="inline-flex items-stretch h-full">
                          <Button
                            type="button"
                            disabled={true}
                            className="h-full px-5 text-xs font-bold bg-primary/75 text-primary-foreground/80 cursor-not-allowed rounded-none border-none shadow-none flex items-center gap-1.5"
                          >
                            {postActionMode === "schedule" ? (
                              <>
                                <CalendarIcon className="w-3.5 h-3.5" />
                                <span>Schedule Posts</span>
                              </>
                            ) : (
                              <>
                                <Send className="w-3.5 h-3.5" />
                                <span>Publish Now ({selectedAccounts.length})</span>
                              </>
                            )}
                          </Button>
                          <button
                            type="button"
                            disabled={true}
                            className="h-full px-2.5 bg-primary/75 text-primary-foreground/80 cursor-not-allowed border-l border-white/20 flex items-center justify-center rounded-none"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs font-semibold bg-red-600 text-white border-none">
                        <div className="flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>
                            {selectedAccountIds.length === 0
                              ? "Select at least 1 account"
                              : "Add content or media to publish/schedule"}
                          </span>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <>
                      {postActionMode === "schedule" ? (
                        <Button
                          type="button"
                          onClick={handleSchedulePost}
                          className="h-full px-5 text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer transition-colors rounded-none border-none shadow-none flex items-center gap-1.5"
                        >
                          <CalendarIcon className="w-3.5 h-3.5" />
                          <span>Schedule Posts</span>
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          onClick={handlePublishNow}
                          className="h-full px-5 text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer transition-colors rounded-none border-none shadow-none flex items-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Publish Now ({selectedAccounts.length})</span>
                        </Button>
                      )}

                      {/* Dropdown to switch mode seamlessly */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className="h-full px-2.5 bg-primary hover:bg-primary/90 text-primary-foreground border-l border-white/20 cursor-pointer flex items-center justify-center rounded-none transition-colors outline-none"
                            title="Switch action mode"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 p-1">
                          <DropdownMenuItem
                            onClick={() => {
                              setPostActionMode("now");
                            }}
                            className="text-xs font-semibold py-2 cursor-pointer flex items-center gap-2"
                          >
                            <Send className="w-4 h-4 text-emerald-600" />
                            <span>Publish Immediately Now</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setPostActionMode("schedule");
                            }}
                            className="text-xs font-semibold py-2 cursor-pointer flex items-center gap-2"
                          >
                            <CalendarIcon className="w-4 h-4 text-primary" />
                            <span>Schedule Post for Later Date/Time</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Crop Modal */}
      <ImageCropModal
        open={cropModalOpen}
        onOpenChange={setCropModalOpen}
        imageSrc={imageToCrop?.url || ""}
        onCropComplete={handleCropComplete}
      />
    </>
  );
}
