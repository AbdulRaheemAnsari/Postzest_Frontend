import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

const PRESET_TAGS = [
  "Health",
  "Medical",
  "Doctor",
  "Vital",
  "Broadcast",
  "Medical",
];

export default function TagInput({ tags, onTagsChange }: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = (tag: string) => {
    const formattedTag = tag.startsWith("#") ? tag : `#${tag}`;
    if (!tags.includes(formattedTag)) {
      onTagsChange([...tags, formattedTag]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      handleAddTag(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        Add Tags{" "}
        <span className="font-normal text-muted-foreground">(optional)</span>
      </label>

      <Input
        placeholder="Write something..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="h-9 text-sm"
      />

      {/* Preset Tags */}
      <div className="flex flex-wrap gap-1.5">
        {PRESET_TAGS.map((tag, index) => (
          <button
            key={`${tag}-${index}`}
            onClick={() => handleAddTag(tag)}
            className="rounded border bg-background px-2.5 py-1 text-xs hover:bg-accent hover:text-accent-foreground"
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Selected Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-1 rounded bg-secondary px-2.5 py-0.5 text-xs"
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
