'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PostCard from './PostCard';

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

  return (
    <div
      className={`relative min-h-32 p-3 flex flex-col gap-2 transition-colors ${
        isCurrentDay ? 'bg-blue-50 dark:bg-blue-950' : ''
      } ${isOtherMonth ? 'opacity-50' : ''}`}
    >
      {/* Date Number */}
      <div className="flex items-center justify-between">
        <span
          className={`text-sm font-semibold ${
            isCurrentDay
              ? 'flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white'
              : 'text-foreground'
          }`}
        >
          {date.getDate()}
        </span>
        {!isOtherMonth && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
          >
            <Plus className="w-4 h-4" />
          </Button>
        )}
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
            transform: 'translateY(4px)',
          }}
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <img
                src={hoveredPost.platform === 'instagram' ? '/instagram.svg' : '/linkedin.svg'}
                alt={hoveredPost.platform}
                className="w-5 h-5"
              />
              <span className="text-sm font-semibold">{hoveredPost.scheduledTime}</span>
            </div>
            <p className="text-sm text-foreground line-clamp-2">
              {hoveredPost.content}
            </p>
            <img
              src={hoveredPost.image || '/placeholder.svg?height=120&width=200&query=social media post'}
              alt="Post preview"
              className="w-full h-24 object-cover rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}