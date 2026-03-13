import { useState } from 'react';
import { Tag } from '@/types/idea';
import { Tag as TagIcon, Plus, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TagSelectorProps {
  tags: Tag[];
  selectedTagIds: string[];
  onTagsChange: (tagIds: string[]) => void;
  onCreateTag: (name: string) => Tag;
}

export function TagSelector({ 
  tags, 
  selectedTagIds, 
  onTagsChange, 
  onCreateTag 
}: TagSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [newTagName, setNewTagName] = useState('');

  const filteredTags = tags.filter(tag => 
    tag.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedTags = tags.filter(tag => selectedTagIds.includes(tag.id));

  const toggleTag = (tagId: string) => {
    if (selectedTagIds.includes(tagId)) {
      onTagsChange(selectedTagIds.filter(id => id !== tagId));
    } else {
      onTagsChange([...selectedTagIds, tagId]);
    }
  };

  const handleCreateTag = () => {
    if (newTagName.trim()) {
      const newTag = onCreateTag(newTagName.trim());
      onTagsChange([...selectedTagIds, newTag.id]);
      setNewTagName('');
      setIsCreating(false);
    }
  };

  const removeTag = (e: React.MouseEvent, tagId: string) => {
    e.stopPropagation();
    onTagsChange(selectedTagIds.filter(id => id !== tagId));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="py-6 font-semibold w-full hover:bg-background"
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <TagIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
            {selectedTags.length > 0 ? (
              <div className="flex gap-1 flex-wrap">
                {selectedTags.slice(0, 3).map(tag => (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className="text-xs px-1.5 py-0 font-semibold"
                    style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                  >
                    {tag.name}
                    <button
                      onClick={(e) => removeTag(e, tag.id)}
                      className="ml-1 hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {selectedTags.length > 3 && (
                  <Badge variant="secondary" className="text-xs px-1.5 py-0 font-semibold">
                    +{selectedTags.length - 3}
                  </Badge>
                )}
              </div>
            ) : (
              <span className="text-muted-foreground">Tags</span>
            )}
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0 bg-popover" align="start">
        <div className="p-2 border-b">
          <Input
            placeholder="Search tags"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9"
          />
        </div>

        <div className="max-h-48 overflow-y-auto p-2">
          {filteredTags.length > 0 ? (
            <div className="space-y-1">
              {filteredTags.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className={cn(
                    "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-left hover:bg-accent transition-colors",
                    selectedTagIds.includes(tag.id) && "bg-accent"
                  )}
                >
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: tag.color }}
                  />
                  <span className="truncate">{tag.name}</span>
                  {selectedTagIds.includes(tag.id) && (
                    <span className="ml-auto text-primary">✓</span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center mb-2">
                <TagIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                {search ? 'No tags found.' : 'There are no tags yet.'}
              </p>
            </div>
          )}
        </div>

        <div className="border-t p-2">
          {isCreating ? (
            <div className="flex gap-2">
              <Input
                placeholder="Tag name"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateTag()}
                className="h-9"
                autoFocus
              />
              <Button size="sm" onClick={handleCreateTag} disabled={!newTagName.trim()}>
                Add
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setIsCreating(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="default"
              size="sm"
              className="w-full gap-2"
              onClick={() => setIsCreating(true)}
            >
              <Plus className="h-4 w-4" />
              New tag
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
