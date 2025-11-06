"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import PostCard from "./PostCard";
import SchedulePostModal from "./SchedulePostModal";
import { useDispatch } from "react-redux";
import { openCreatePostModal } from "@/store/slices/createPostModalSlice";

interface CalendarDayCellProps {
  date: Date;
  posts: any[];
  onPostClick: (post: any) => void;
  isCurrentDay?: boolean;
  isOtherMonth?: boolean;
}

export default function CalendarDayCell({
  date,
  posts,
  onPostClick,
  isCurrentDay,
  isOtherMonth,
}: CalendarDayCellProps) {
  const [hoveredPostId, setHoveredPostId] = useState<string | null>(null);
  const [hoveredPost, setHoveredPost] = useState<any>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const handlePostHover = (post: any, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: rect.left,
      y: rect.bottom,
    });
    setHoveredPostId(post.id);
    setHoveredPost(post);
  };

  const handleMouseLeave = () => {
    setHoveredPostId(null);
    setHoveredPost(null);
  };

  const today = new Date();
  const isTodayOrFuture =
    date.setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0);

  const handleSelect = (type: "text" | "image" | "video") => {
    setOpen(false);
    console.log("Selected type:", type);
    dispatch(openCreatePostModal());
  };

  return (
    <div
      className={`relative min-h-48 p-3 flex flex-col gap-2 transition-colors group ${
        isCurrentDay ? "bg-primary/5 h-full" : ""
      } ${isOtherMonth ? "opacity-30 bg-muted" : ""}`}
    >
      {/* Date Number */}
      <div className="flex items-center justify-between">
        <span
          className={`text-sm font-semibold ${
            isCurrentDay
              ? "flex items-center justify-center w-7 h-7 rounded-full bg-primary text-background"
              : "text-foreground"
          }`}
        >
          {date.getDate()}
        </span>
      </div>

      {/* Posts */}
      <div className="space-y-1 flex-1">
        {posts.slice(0, 3).map((post) => (
          <div
            key={post.id}
            className="group relative"
            onMouseEnter={(e) => handlePostHover(post, e)}
            onMouseLeave={handleMouseLeave}
          >
            <PostCard
              post={post}
              onClick={() => onPostClick(post)}
              isHovered={hoveredPostId === post.id}
            />
          </div>
        ))}
        {posts.length > 3 && (
          <div className="text-xs text-muted-foreground px-2 py-1">
            +{posts.length - 3} more
          </div>
        )}
      </div>

      {/* Hover Tooltip */}
      {hoveredPost && (
        <div
          className="fixed z-50 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-border p-3 w-56"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            transform: "translateY(4px)",
          }}
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <img
                src={
                  hoveredPost.platform === "instagram"
                    ? "/instagram.svg"
                    : "/linkedin.svg"
                }
                alt={hoveredPost.platform}
                className="w-5 h-5"
              />
              <span className="text-sm font-semibold">
                {hoveredPost.scheduledTime}
              </span>
            </div>
            <p className="text-sm text-foreground line-clamp-2">
              {hoveredPost.content}
            </p>
            <img
              src={
                hoveredPost.image ||
                "/placeholder.svg?height=120&width=200&query=social media post"
              }
              alt="Post preview"
              className="w-full h-24 object-cover rounded"
            />
          </div>
        </div>
      )}

      {!isOtherMonth && isTodayOrFuture && (
        <div className="group-hover:opacity-100 bg-muted rounded-md opacity-0 p-2 mt-4 transition-opacity ">
          <div className="h-7 bg-muted-foreground/20 w-7 rounded-full mb-2" />
          <div className="h-2 w-full bg-muted-foreground/20 rounded-sm mb-1" />
          <div className="h-2 w-full bg-muted-foreground/20 rounded-sm mb-1" />
          <div className="h-6 w-full bg-muted-foreground/20 rounded-sm mb-2" />
          <Button
            onClick={() => setOpen(true)}
            className="py-4 mt-2 flex items-center text-xs justify-center text-background gap-0.5 cursor-pointer w-full bg-primary rounded-sm"
          >
            <Plus className="w-4 h-4" />
            Schedule Post
          </Button>
        </div>
      )}

      <SchedulePostModal
        open={open}
        onOpenChange={setOpen}
        onSelectPostType={handleSelect}
      />
    </div>
  );
}
