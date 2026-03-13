import { useState } from 'react';
import { Column, Idea } from '@/types/idea';
import { Plus, MoreHorizontal, Pencil, Trash2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IdeaCard } from './IdeaCard';

interface IdeaColumnProps {
  column: Column;
  ideas: Idea[];
  ideaCount: number;
  onAddIdea: (columnId: string) => void;
  onEditIdea: (idea: Idea) => void;
  onDeleteIdea: (id: string) => void;
  onRenameColumn: (id: string, title: string) => void;
  onDeleteColumn: (id: string) => void;
  isDefaultColumn?: boolean;
}

export function IdeaColumn({
  column,
  ideas,
  ideaCount,
  onAddIdea,
  onEditIdea,
  onDeleteIdea,
  onRenameColumn,
  onDeleteColumn,
  isDefaultColumn = false,
}: IdeaColumnProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(column.title);

  const handleRename = () => {
    if (editTitle.trim() && editTitle !== column.title) {
      onRenameColumn(column.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setEditTitle(column.title);
      setIsEditing(false);
    }
  };

  return (
    <div className="column-container flex flex-col h-full animate-slide-in">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <GripVertical className="h-4 w-4 text-muted-foreground/50 cursor-grab shrink-0" />
          
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
          
          <Badge variant="secondary" className="text-xs px-1.5 py-0 h-5 shrink-0">
            {ideaCount}
          </Badge>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => onAddIdea(column.id)}
          >
            <Plus className="h-4 w-4" />
          </Button>
          
          {!isDefaultColumn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
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

      {/* Ideas List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-2 min-h-[200px]">
        {ideas.map((idea) => (
          <IdeaCard
            key={idea.id}
            idea={idea}
            onEdit={onEditIdea}
            onDelete={onDeleteIdea}
          />
        ))}

        {/* Add New Idea Button */}
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground h-auto py-3"
          onClick={() => onAddIdea(column.id)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Idea
        </Button>
      </div>
    </div>
  );
}
