"use client";

import { useState } from "react";
import { Calendar, CalendarDays, FolderUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CalendarHeader from "@/components/Calendar/CalendarHeader";
import CalendarView from "@/components/Calendar/CalendarView";
import PostDetailModal from "@/components/Calendar/PostDetailModal";
import { mockScheduledPosts } from "@/data/mockPosts";
import { openCreatePostModal } from "@/store/slices/createPostModalSlice";
import { useDispatch } from "react-redux";

type ViewType = "monthly" | "weekly";

export default function CalendarPage() {
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<ViewType>("monthly");
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleViewChange = (view: ViewType) => {
    setViewType(view);
  };

  const handlePostClick = (post: any) => {
    setSelectedPost(post);
    setShowPostModal(true);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalendarDays strokeWidth={2} className="w-6 h-6 text-foreground" />
            <h1 className="text-2xl font-bold text-foreground">
              Manage Your Content
            </h1>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="rounded-sm py-5 cursor-pointer"
            >
              <FolderUp />
              Export
            </Button>
            <Button
              onClick={() => dispatch(openCreatePostModal())}
              className="flex md:w-auto w-full rounded-sm cursor-pointer hover:bg-primary/90 items-center justify-center gap-0.5 bg-primary py-5 !px-5 font-semibold text-sm"
            >
              <Plus strokeWidth={3} className="w-6 h-6" />
              Create Post
            </Button>
          </div>
        </div>

        {/* Calendar Controls */}
        <CalendarHeader
          currentDate={currentDate}
          viewType={viewType}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onToday={handleToday}
          onViewChange={handleViewChange}
        />

        {/* Calendar Grid */}
        <CalendarView
          currentDate={currentDate}
          viewType={viewType}
          posts={mockScheduledPosts}
          onPostClick={handlePostClick}
        />
      </div>

      {/* Post Detail Modal */}
      <PostDetailModal
        post={selectedPost}
        isOpen={showPostModal}
        onClose={() => setShowPostModal(false)}
      />
    </main>
  );
}
