import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Grid3x3, Plus, X, Wand2 } from "lucide-react";

interface ContentItemsProps {
  items: string[];
  onItemsChange: (items: string[]) => void;
}

export const ContentItems = ({ items, onItemsChange }: ContentItemsProps) => {
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim()) {
      onItemsChange([...items, newItem.trim()]);
      setNewItem("");
    }
  };

  const removeItem = (index: number) => {
    onItemsChange(items.filter((_, i) => i !== index));
  };

  const generateSimilar = () => {
    // Mock AI generation
    const suggestions = [
      "wireless earbuds",
      "smart watch",
      "phone case",
      "tablet stand"
    ];
    onItemsChange([...items, ...suggestions]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Grid3x3 className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Content Items</h3>
        </div>
        <Badge variant="secondary" className="font-semibold">
          {items.length} items
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground">
        Items for the 2×2 grid images (4 random items per video)
      </p>
      
      <div className="grid grid-cols-2 gap-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-3 bg-card border rounded-lg group hover:border-primary/50 transition-colors"
          >
            <span className="flex-1 text-sm truncate">{item}</span>
            <button
              onClick={() => removeItem(index)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Add a new item..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
          className="flex-1"
        />
        <Button onClick={addItem} size="icon" variant="outline">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <Button
        onClick={generateSimilar}
        variant="default"
        size="sm"
        className="w-full"
      >
        <Wand2 className="w-4 h-4 mr-2" />
        Generate similar (AI)
      </Button>
    </div>
  );
};
