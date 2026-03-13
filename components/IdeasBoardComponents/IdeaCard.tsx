import { useState } from 'react';
import { Idea } from '@/types/idea';
import { MoreHorizontal, Pencil, Trash2, Image } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface IdeaCardProps {
  idea: Idea;
  onEdit: (idea: Idea) => void;
  onDelete: (id: string) => void;
}

export function IdeaCard({ idea, onEdit, onDelete }: IdeaCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="idea-card animate-fade-in group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onEdit(idea)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground text-sm leading-snug mb-1">
            {idea.title}
          </h4>
          {idea.description && (
            <p className="text-muted-foreground text-xs line-clamp-2">
              {idea.description}
            </p>
          )}
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className={`h-6 w-6 shrink-0 transition-opacity ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(idea); }}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={(e) => { e.stopPropagation(); onDelete(idea.id); }}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {idea.imageUrl && (
        <div className="mt-3 rounded-md overflow-hidden bg-muted">
          <img
            src={idea.imageUrl}
            alt={idea.title}
            className="w-full h-32 object-cover"
          />
        </div>
      )}

      {idea.fileName && !idea.imageUrl && (
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground bg-muted rounded-md px-2 py-1.5">
          <Image className="h-3.5 w-3.5" />
          <span className="truncate">{idea.fileName}</span>
        </div>
      )}
    </div>
  );
}
