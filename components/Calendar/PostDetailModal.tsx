'use client';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PostDetailModalProps {
  post: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function PostDetailModal({
  post,
  isOpen,
  onClose,
}: PostDetailModalProps) {
  if (!isOpen || !post) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-card rounded-lg shadow-xl border border-border max-w-md w-full mx-4">
        <div className="p-6 space-y-4">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-muted rounded-md transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>

          {/* Platform & Time */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              {post.platform === 'instagram' ? '📷' : '💼'}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground capitalize">
                {post.platform}
              </p>
              <p className="text-xs text-muted-foreground">
                {post.scheduledDate} at {post.scheduledTime}
              </p>
            </div>
          </div>

          {/* Image */}
          {post.image && (
            <img
              src={post.image || "/placeholder.svg"}
              alt="Post preview"
              className="w-full h-48 object-cover rounded-lg"
            />
          )}

          {/* Content */}
          <div className="space-y-2">
            <p className="text-sm text-foreground leading-relaxed">
              {post.content}
            </p>
            {post.hashtags && (
              <p className="text-xs text-blue-600 dark:text-blue-400">
                {post.hashtags.join(' ')}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t border-border">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              Edit Post
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}