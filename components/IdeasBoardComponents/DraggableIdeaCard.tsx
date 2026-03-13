import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Idea, Column, Tag } from "@/types/idea";
import {
  MoreHorizontal,
  Trash2,
  Image,
  GripVertical,
  Copy,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DraggableIdeaCardProps {
  idea: Idea;
  columns: Column[];
  tags: Tag[];
  isSelected: boolean;
  selectionMode: boolean;
  onEdit: (idea: Idea) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onMove: (id: string, columnId: string) => void;
  onSelect: (id: string) => void;
  onToggleSelectionMode: (id: string) => void;
}

export function DraggableIdeaCard({
  idea,
  columns,
  tags,
  isSelected,
  selectionMode,
  onEdit,
  onDelete,
  onDuplicate,
  onMove,
  onSelect,
  onToggleSelectionMode,
}: DraggableIdeaCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: idea.id,
    data: {
      type: "idea",
      idea,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleCardClick = () => {
    if (selectionMode) {
      onSelect(idea.id);
    } else {
      onEdit(idea);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        `bg-background rounded-sm py-4 transition-all duration-100 group`,
        isDragging && "shadow-lg ring-2 ring-primary/20",
        isSelected && "border border-primary bg-primary/5"
      )}
    >
      <div className="flex items-start gap-2">
        {selectionMode ? (
          <div className="mt-0.5 shrink-0">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => onSelect(idea.id)}
              className="h-4 w-4"
            />
          </div>
        ) : (
          <button
            {...attributes}
            {...listeners}
            className="mt-0.5 p-1 rounded hover:bg-muted cursor-grab active:cursor-grabbing shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        )}

        <div
          className="flex-1 min-w-0 cursor-pointer"
          onClick={handleCardClick}
        >
          <h4 className="font-medium text-foreground text-sm leading-snug mb-1">
            {idea.title}
          </h4>
          {idea.description && (
            <p className="text-muted-foreground text-xs line-clamp-2">
              {idea.description}
            </p>
          )}
          {idea.tagIds && idea.tagIds.length > 0 && (
            <div className="flex gap-1 flex-wrap mt-2">
              {idea.tagIds.map((tagId) => {
                const tag = tags.find((t) => t.id === tagId);
                if (!tag) return null;
                return (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className="text-[10px] px-1.5 py-0"
                    style={{
                      backgroundColor: `${tag.color}20`,
                      color: tag.color,
                    }}
                  >
                    {tag.name}
                  </Badge>
                );
              })}
            </div>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-xs cursor-pointer shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-popover">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onToggleSelectionMode(idea.id);
              }}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Select
              <Badge
                variant="secondary"
                className="ml-auto text-[10px] px-1 py-0"
              >
                Beta
              </Badge>
            </DropdownMenuItem>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <ArrowRight className="h-4 w-4 mr-2" />
                Move to Group
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="bg-popover">
                {columns.map((column) => (
                  <DropdownMenuItem
                    key={column.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onMove(idea.id, column.id);
                    }}
                    className={cn(idea.columnId === column.id && "bg-accent")}
                  >
                    {column.title}
                    {idea.columnId === column.id && (
                      <span className="ml-auto">✓</span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate(idea.id);
              }}
            >
              <Copy className="h-4 w-4 mr-2" />
              Duplicate
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onDelete(idea.id);
              }}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {idea.imageUrl && (
        <div className="mt-3 rounded-md overflow-hidden bg-muted ml-6">
          <img
            src={idea.imageUrl}
            alt={idea.title}
            className="w-full h-32 object-cover"
          />
        </div>
      )}

      {idea.fileName && !idea.imageUrl && (
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground bg-muted rounded-md px-2 py-1.5 ml-6">
          <Image className="h-3.5 w-3.5" />
          <span className="truncate">{idea.fileName}</span>
        </div>
      )}
    </div>
  );
}
