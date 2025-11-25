"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { toast } from "react-toastify";
import { Label } from "../ui/label";

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface CreateTagSheetProps {
  open: boolean;
  onClose: () => void;
  onSave: (tag: Omit<Tag, "id">) => void;
  editTag?: Tag | null;
}

const TAG_COLORS = [
  { name: "Coral", value: "14 100% 67%" },
  { name: "Orange", value: "25 95% 53%" },
  { name: "Amber", value: "38 92% 50%" },
  { name: "Yellow", value: "48 96% 53%" },
  { name: "Lime", value: "84 81% 44%" },
  { name: "Emerald", value: "142 76% 36%" },
  { name: "Teal", value: "173 80% 40%" },
  { name: "Cyan", value: "189 94% 43%" },
  { name: "Sky", value: "199 89% 48%" },
  { name: "Blue", value: "217 91% 60%" },
  { name: "Indigo", value: "239 84% 67%" },
  { name: "Purple", value: "271 81% 56%" },
  { name: "Fuchsia", value: "292 84% 61%" },
  { name: "Pink", value: "328 86% 70%" },
  { name: "Rose", value: "351 95% 71%" },
  { name: "Slate", value: "215 16% 47%" },
];

export const CreateTagSheet = ({
  open,
  onClose,
  onSave,
  editTag,
}: CreateTagSheetProps) => {
  const [name, setName] = useState(editTag?.name || "");
  const [color, setColor] = useState(editTag?.color || "142 76% 36%");

  // Reset when sheet opens/closes
  useEffect(() => {
    if (open) {
      setName(editTag?.name || "");
      setColor(editTag?.color || "142 76% 36%");
    }
  }, [open, editTag]);

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Please enter a tag name");
      return;
    }

    const tagName = name.trim().startsWith("#")
      ? name.trim()
      : `#${name.trim()}`;

    onSave({ name: tagName, color });
    toast.success(editTag ? "Tag updated!" : "Tag created!");
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={(val) => !val && onClose()}>
      <SheetContent side="right" className="sm:max-w-[480px]">
        <SheetHeader className="border-b border-border pb-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="text-2xl font-semibold">
                {editTag ? "Edit Tag" : "Create New Tag"}
              </SheetTitle>
              <SheetDescription className="text-muted-foreground mt-1">
                {editTag
                  ? "Update your tag details."
                  : "Add a new tag to organize your content."}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 space-y-8 pb-6">
          {/* Tag Name */}
          <div>
            <Label className="text-sm font-semibold pb-1 text-foreground">
              Tag Name
            </Label>
            <Input
              id="tag-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., marketing, viral, trending"
              className="py-6 text-lg"
              autoFocus
            />
            <p className="text-xs pt-1 text-muted-foreground">
              A # symbol will be added automatically
            </p>
          </div>

          {/* Color Picker */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">
              Choose Color
            </Label>
            <div className="grid grid-cols-4 gap-4">
              {TAG_COLORS.map((colorOption) => {
                const isSelected = color === colorOption.value;
                return (
                  <button
                    key={colorOption.name}
                    type="button"
                    onClick={() => setColor(colorOption.value)}
                    className="group relative"
                  >
                    <div
                      className={`w-full aspect-square rounded-xl transition-all duration-200 ${
                        isSelected
                          ? "border-4 border-muted-foreground"
                          : "hover:scale-105"
                      }`}
                      style={{
                        backgroundColor: `hsl(${colorOption.value})`,
                      }}
                    />
                    <span className="text-xs text-muted-foreground mt-2 block text-center">
                      {colorOption.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preview */}
          <div
            className="p-6 rounded-2xl border-2 border-dashed border-border"
            style={{
              backgroundColor: `hsl(${color} / 0.1)`,
              borderColor: `hsl(${color})`,
            }}
          >
            <p className="text-sm text-muted-foreground mb-3">Preview</p>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ backgroundColor: `hsl(${color})` }}
            >
              <span className="text-white font-semibold">
                {name.trim()
                  ? name.trim().startsWith("#")
                    ? name.trim()
                    : `#${name.trim()}`
                  : "#tag"}
              </span>
            </div>
          </div>
        </div>

        <SheetFooter className="mt-auto border-t border-border pt-6">
          <div className="flex gap-3 w-full">
            <Button variant="outline" onClick={onClose} className="flex-1 py-6 rounded-sm cursor-pointer">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 cursor-pointer bg-primary hover:bg-primary/80 text-background hover:text-background py-6 rounded-sm font-semibold"
            >
              {editTag ? "Update Tag" : "Create Tag"}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
