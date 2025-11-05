import { Heart, Send, Bookmark, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UploadedImage {
  id: string;
  url: string;
  file: File;
}

interface MediaPreviewProps {
  caption: string;
  images: UploadedImage[];
  account: string;
}

export default function MediaPreview({
  caption,
  images,
  account,
}: MediaPreviewProps) {
  return (
    <div className="w-[380px] border-l bg-background p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Media Preview</h3>
        <button className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="8"
              cy="8"
              r="7"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M8 4.5V8.5M8 11V11.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Instagram-style Preview */}
      <div className="overflow-hidden rounded-lg border bg-background shadow-md">
        {/* Post Header */}
        <div className="flex items-center justify-between border-b p-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                {account.charAt(1).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold">{account}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
              >
                <path
                  d="M5.25 7L6.5 8.25L8.75 5.75M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <button className="text-muted-foreground hover:text-foreground">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

        {/* Post Image */}
        {images.length > 0 && (
          <div className="aspect-square bg-muted">
            <img
              src={images[0].url}
              alt="Post preview"
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Post Actions */}
        <div className="space-y-2 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="hover:text-muted-foreground">
                <Heart className="h-6 w-6" />
              </button>
              <button className="hover:text-muted-foreground">
                <Send className="h-6 w-6" />
              </button>
              <button className="hover:text-muted-foreground">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </button>
            </div>
            <button className="hover:text-muted-foreground">
              <Bookmark className="h-6 w-6" />
            </button>
          </div>

          {/* Caption */}
          {caption && (
            <div className="text-sm">
              <span className="font-semibold">{account}</span>{" "}
              <span className="text-foreground/90">{caption}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
