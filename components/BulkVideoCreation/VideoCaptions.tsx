import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Plus, X, Wand2 } from "lucide-react";

interface VideoCaptionsProps {
  captions: string[];
  onCaptionsChange: (captions: string[]) => void;
}

export const VideoCaptions = ({ captions, onCaptionsChange }: VideoCaptionsProps) => {
  const [newCaption, setNewCaption] = useState("");

  const addCaption = () => {
    if (newCaption.trim()) {
      onCaptionsChange([...captions, newCaption.trim()]);
      setNewCaption("");
    }
  };

  const removeCaption = (index: number) => {
    onCaptionsChange(captions.filter((_, i) => i !== index));
  };

  const generateSimilar = () => {
    // Mock AI generation
    const variations = [
      "the ultimate productivity hack you need",
      "game-changing tech that saves hours",
      "this simple trick changed everything"
    ];
    onCaptionsChange([...captions, ...variations.slice(0, 3)]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Video Captions</h3>
        </div>
        <Badge variant="secondary" className="font-semibold">
          {captions.length} captions
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground">
        Viral-style captions that will be randomly assigned to your videos
      </p>
      
      <div className="space-y-3">
        {captions.map((caption, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg group hover:bg-muted transition-colors"
          >
            <span className="flex-1 text-sm">{caption}</span>
            <button
              onClick={() => removeCaption(index)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Add a new caption..."
          value={newCaption}
          onChange={(e) => setNewCaption(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addCaption()}
          className="flex-1"
        />
        <Button onClick={addCaption} size="icon" variant="outline">
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
