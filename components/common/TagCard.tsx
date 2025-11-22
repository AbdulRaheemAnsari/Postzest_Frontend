import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface TagCardProps {
  tag: Tag;
  onEdit: (tag: Tag) => void;
  onDelete: (tagId: string) => void;
}

export const TagCard = ({ tag, onEdit, onDelete }: TagCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-lg p-4 transition-all duration-300 border border-border">
      <div className="flex flex-col h-full justify-between">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-foreground">{tag.name}</h3>
          <div className="flex gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(tag)}
              className="h-8 w-8 text-muted-foreground cursor-pointer hover:bg-background/20"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(tag.id)}
              className="h-8 w-8 text-muted-foreground cursor-pointer hover:bg-background/20"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-4 w-4 rounded-full bg-background/80"
            style={{ backgroundColor: `hsl(${tag.color})` }}
          />
          <span className="text-sm text-muted-foreground font-medium">
            Active
          </span>
        </div>
      </div>
    </div>
  );
};
