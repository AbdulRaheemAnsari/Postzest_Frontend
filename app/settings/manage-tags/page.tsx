"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { CreateTagSheet } from "@/components/common/CreateTagSheet";
import { TagsGrid } from "@/components/common/TagsGrid";
import { TagsEmptyState } from "@/components/common/TagsEmptyState";

interface Tag {
  id: string;
  name: string;
  color: string;
}

const ManageTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  const handleSaveTag = (tagData: Omit<Tag, "id">) => {
    if (editingTag) {
      setTags(
        tags.map((tag) =>
          tag.id === editingTag.id ? { ...tag, ...tagData } : tag
        )
      );
      setEditingTag(null);
    } else {
      const newTag: Tag = {
        id: crypto.randomUUID(),
        ...tagData,
      };
      setTags([...tags, newTag]);
    }
  };

  const handleEditTag = (tag: Tag) => {
    setEditingTag(tag);
    setIsSheetOpen(true);
  };

  const handleDeleteTag = (tagId: string) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
    toast.success("Tag deleted successfully");
  };

  const handleNewTag = () => {
    setEditingTag(null);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setEditingTag(null);
  };

  return (
    <div className="bg-background">
      <div className="py-4">
        {tags.length > 0 && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-semibold text-foreground mb-2">
                Tag Manager
              </h1>
              <p className="text-muted-foreground text-lg">
                {tags.length} {tags.length === 1 ? "tag" : "tags"} • Organize
                and track your content
              </p>
            </div>
            <Button
              onClick={handleNewTag}
              className="gap-1 flex items-center cursor-pointer bg-primary hover:bg-primary/80 py-6 px-6 rounded-sm font-semibold"
            >
               <Plus strokeWidth={3} className="w-6 h-6" />
              New Tag
            </Button>
          </div>
        )}

        {tags.length === 0 ? (
          <TagsEmptyState onNewTag={handleNewTag} />
        ) : (
          <TagsGrid
            tags={tags}
            onEdit={handleEditTag}
            onDelete={handleDeleteTag}
          />
        )}

        <CreateTagSheet
          open={isSheetOpen}
          onClose={handleCloseSheet}
          onSave={handleSaveTag}
          editTag={editingTag}
        />
      </div>
    </div>
  );
};

export default ManageTags;
