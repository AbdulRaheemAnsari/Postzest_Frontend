import { Heart, MessageCircle, Send, Bookmark, MoreVertical, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MediaPreviewProps {
  caption: string;
  images: File[];
}

export const ImagePreview = ({ caption, images }: MediaPreviewProps) => {
  return (
    <div className="w-full lg:w-[350px] bg-background border-l animate-in slide-in-from-right duration-300">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          Media Preview
          <span className="text-muted-foreground text-xs font-normal">(ℹ️)</span>
        </h3>
      </div>

      <div className="p-4">
        <div className="bg-muted rounded-lg overflow-hidden">
          {/* Instagram-style post preview */}
          <div className="bg-background">
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    RM
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold">ramsaanap</span>
                    <CheckCircle className="w-3 h-3 fill-primary text-primary-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">Lonar, Maharashtra</p>
                </div>
              </div>
              <MoreVertical className="w-5 h-5 text-foreground" />
            </div>

            {/* Image */}
            {images.length > 0 && (
              <div className="relative aspect-square bg-muted">
                <img
                  src={URL.createObjectURL(images[0])}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                {images.length > 1 && (
                  <div className="absolute top-2 right-2 bg-background/90 px-2 py-1 rounded text-xs font-medium">
                    1/{images.length}
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Heart className="w-6 h-6" />
                  <MessageCircle className="w-6 h-6" />
                  <Send className="w-6 h-6" />
                </div>
                <Bookmark className="w-6 h-6" />
              </div>

              {/* Caption */}
              {caption && (
                <div className="text-sm">
                  <span className="font-semibold">ramsaanap</span>{" "}
                  <span className="text-foreground">{caption}</span>
                </div>
              )}

              <p className="text-xs text-muted-foreground">View 1 comment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
