import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreVertical, Edit, Share2, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export interface Post {
  id: string;
  image: string;
  title: string;
  date: string;
  time: string;
  type: string;
  status: "published" | "scheduled" | "draft";
  collaborators: Array<{
    name: string;
    avatar?: string;
  }>;
}

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "published":
        return "bg-[#0EEB50] text-background capitalize";
      case "scheduled":
        return "bg-[#3F99F3] text-background capitalize";
      case "draft":
        return "bg-[#FFBA30] text-background capitalize";
      default:
        return "default";
    }
  };

  return (
    <div className="group relative bg-background rounded-2xl overflow-hidden border border-border transition-all shadow-sm">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden p-1.5">
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover rounded-lg"
          />
        )}

        {/* Status Badge */}
        <div className="w-full absolute flex items-center justify-between top-3 right-2 left-3 pr-4 z-10">
          <Badge
            className={`text-background capitalize ${getStatusVariant(
              post.status
            )}`}
          >
            {post.status}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Date and Time */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-muted-foreground">
            {post.date} · {post.time}
          </p>

          <Badge className="bg-accent text-muted-foreground mb-0.5 capitalize">
            {post.type}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-4">
          {post.title}
        </h3>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Collaborators */}
          <div className="flex -space-x-2">
            {post.collaborators.map((collaborator, index) => (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar
                      key={index}
                      className="h-8 w-8 border border-primary bg-muted"
                    >
                      <AvatarImage
                        src={collaborator.avatar}
                        alt={collaborator.name}
                      />
                      <AvatarFallback className="text-xs bg-muted">
                        {collaborator.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>

                  <TooltipContent>{collaborator.name}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-card cursor-pointer"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <div className="">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 bg-card/90 backdrop-blur-sm hover:bg-card cursor-pointer"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-popover">
                  <DropdownMenuItem className="gap-1 cursor-pointer">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Post
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-1 cursor-pointer">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive gap-1 cursor-pointer">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
