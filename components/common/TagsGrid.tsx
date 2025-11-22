import { useState } from "react";
import { Search, Grid3x3, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TagCard } from "./TagCard";

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface TagsGridProps {
  tags: Tag[];
  onEdit: (tag: Tag) => void;
  onDelete: (tagId: string) => void;
}

export const TagsGrid = ({ tags, onEdit, onDelete }: TagsGridProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 text-base"
          />
        </div>
        <div className="flex items-center gap-1 bg-background rounded-sm py-0.5 px-2 border border-border w-fit">
          {/* List Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 rounded-xs cursor-pointer transition-all px-3 py-1.5 text-sm font-medium ${
              viewMode === "list"
                ? "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary shadow-sm"
                : "text-gray-600 hover:text-gray-800 hover:bg-muted"
            }`}
          >
            <List className="h-4 w-4" />
            List
          </Button>

          {/* Calendar Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 rounded-xs cursor-pointer transition-all px-3 py-1.5 text-sm font-medium ${
              viewMode === "grid"
                ? "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary shadow-sm"
                : "text-gray-600 hover:text-gray-800 hover:bg-muted"
            }`}
          >
            <Grid3x3 className="h-4 w-4" />
            Grid
          </Button>
        </div>
      </div>

      {filteredTags.length === 0 ? (
        <div className="text-center py-20 px-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-lg text-muted-foreground">
            {searchQuery
              ? "No tags found matching your search"
              : "No tags available"}
          </p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2"
              : "grid grid-cols-1 gap-2"
          }
        >
          {filteredTags.map((tag) => (
            <TagCard
              key={tag.id}
              tag={tag}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
