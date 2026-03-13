import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Column, Idea, Tag } from "@/types/idea";
import { DraggableIdeaCard } from "./DraggableIdeaCard";
import {
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  GripVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SortableColumnProps {
  column: Column;
  columns: Column[];
  tags: Tag[];
  ideas: Idea[];
  ideaCount: number;
  selectedIds: Set<string>;
  selectionMode: boolean;
  onAddIdea: (columnId: string) => void;
  onEditIdea: (idea: Idea) => void;
  onDeleteIdea: (id: string) => void;
  onDuplicateIdea: (id: string) => void;
  onMoveIdea: (id: string, columnId: string) => void;
  onSelectIdea: (id: string) => void;
  onToggleSelectionMode: (id: string) => void;
  onRenameColumn: (id: string, title: string) => void;
  onDeleteColumn: (id: string) => void;
  isDefaultColumn?: boolean;
}

export function SortableColumn({
  column,
  columns,
  tags,
  ideas,
  ideaCount,
  selectedIds,
  selectionMode,
  onAddIdea,
  onEditIdea,
  onDeleteIdea,
  onDuplicateIdea,
  onMoveIdea,
  onSelectIdea,
  onToggleSelectionMode,
  onRenameColumn,
  onDeleteColumn,
  isDefaultColumn = false,
}: SortableColumnProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(column.title);

  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "column",
      column,
    },
  });

  const { setNodeRef: setDroppableRef } = useDroppable({
    id: `column-${column.id}`,
    data: {
      type: "column",
      columnId: column.id,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleRename = () => {
    if (editTitle.trim() && editTitle !== column.title) {
      onRenameColumn(column.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRename();
    } else if (e.key === "Escape") {
      setEditTitle(column.title);
      setIsEditing(false);
    }
  };

  const ideaIds = ideas.map((idea) => idea.id);

  return (
    <div
      ref={setSortableRef}
      style={style}
      className={`column-container bg-[#F3F4F9] p-4 rounded-sm flex flex-col h-full animate-slide-in ${
        isDragging ? "ring-2 ring-primary/20" : ""
      }`}
    >
      {/* Column Header */}
      <div className="flex w-[260px] items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <button
            {...attributes}
            {...listeners}
            className="p-1 rounded hover:bg-muted cursor-grab active:cursor-grabbing shrink-0"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground/50" />
          </button>

          {isEditing ? (
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleRename}
              onKeyDown={handleKeyDown}
              className="h-7 text-sm font-semibold bg-card"
              autoFocus
            />
          ) : (
            <h3
              className="font-semibold text-column-header text-sm truncate cursor-pointer hover:text-primary transition-colors"
              onClick={() => setIsEditing(true)}
            >
              {column.title}
            </h3>
          )}

          <Badge
            variant="secondary"
            className="text-xs bg-background rounded-full px-1.5 py-0 h-5 shrink-0"
          >
            {ideaCount}
          </Badge>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:bg-muted-foreground/5 rounded-xs cursor-pointer"
            onClick={() => onAddIdea(column.id)}
          >
            <Plus className="h-4 w-4" />
          </Button>

          {!isDefaultColumn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 hover:bg-muted-foreground/5 rounded-xs cursor-pointer"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem onClick={() => setIsEditing(true)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onDeleteColumn(column.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  <div className="flex flex-col">
                    <span>Delete</span>
                    <span className="text-xs text-muted-foreground">
                      Delete group and move ideas to "Unassigned"
                    </span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Ideas List - Droppable Area */}
      <div
        ref={setDroppableRef}
        className="flex-1 overflow-y-auto scrollbar-thin space-y-2 min-h-[200px]"
      >
        <SortableContext items={ideaIds} strategy={verticalListSortingStrategy}>
          {ideas.map((idea) => (
            <DraggableIdeaCard
              key={idea.id}
              idea={idea}
              columns={columns}
              tags={tags}
              isSelected={selectedIds.has(idea.id)}
              selectionMode={selectionMode}
              onEdit={onEditIdea}
              onDelete={onDeleteIdea}
              onDuplicate={onDuplicateIdea}
              onMove={onMoveIdea}
              onSelect={onSelectIdea}
              onToggleSelectionMode={onToggleSelectionMode}
            />
          ))}
        </SortableContext>

        {/* Add New Idea Button */}
        <Button
          variant="ghost"
          className="w-full flex items-center justify-center gap-1 rounded-sm cursor-pointer font-semibold text-foreground hover:bg-muted-foreground/5 hover:text-foreground h-auto py-3"
          onClick={() => onAddIdea(column.id)}
        >
          <Plus strokeWidth={3} className="h-4 w-4" />
          New Idea
        </Button>
      </div>
    </div>
  );
}
