import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { FileText, ImageIcon, VideoIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PostTypeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectPostType: (type: "text" | "image" | "video") => void;
}

const PostTypeModal = ({
  open,
  onOpenChange,
  onSelectPostType,
}: PostTypeModalProps) => {
  const postTypes = [
    {
      type: "text" as const,
      icon: FileText,
      title: "Text Post",
      description: "Share your thoughts and ideas",
      gradient: "from-blue-500/10 to-cyan-500/10",
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-500/10",
    },
    {
      type: "image" as const,
      icon: ImageIcon,
      title: "Image Post",
      description: "Share photos and graphics",
      gradient: "from-purple-500/10 to-pink-500/10",
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBg: "bg-purple-500/10",
    },
    {
      type: "video" as const,
      icon: VideoIcon,
      title: "Video Post",
      description: "Share video content",
      gradient: "from-orange-500/10 to-red-500/10",
      iconColor: "text-orange-600 dark:text-orange-400",
      iconBg: "bg-orange-500/10",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 gap-0 overflow-hidden border-border/50">
        <DialogHeader className="px-6 pt-6 pb-4 ">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Sparkles className="w-6 h-6 text-foreground" />
            </div>
            <DialogTitle className="text-2xl font-bold text-foreground">
              Create Your Post
            </DialogTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Choose the type of content you want to schedule
          </p>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-3">
          {postTypes.map((postType) => (
            <button
              key={postType.type}
              onClick={() => onSelectPostType(postType.type)}
              className={`w-full group relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br ${postType.gradient} p-5 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-hover hover:border-primary/50 active:scale-[0.98]`}
            >
              <div className="relative z-10 flex items-start gap-4">
                <div
                  className={`${postType.iconBg} rounded-xl p-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <postType.icon className={`w-6 h-6 ${postType.iconColor}`} />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    {postType.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {postType.description}
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
          ))}
        </div>

        <div className="px-6 pb-6 pt-2 border-t border-border/50 bg-muted/20">
          <DialogClose asChild>
            <Button variant="ghost" className="w-full">
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostTypeModal;
