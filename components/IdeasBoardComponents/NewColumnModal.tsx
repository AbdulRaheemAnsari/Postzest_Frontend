import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FloatingInput from "../common/FloatingInput";

interface NewColumnModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (title: string) => void;
}

export function NewColumnModal({
  open,
  onOpenChange,
  onSave,
}: NewColumnModalProps) {
  const [title, setTitle] = useState("");

  const handleSave = () => {
    if (!title.trim()) return;
    onSave(title.trim());
    setTitle("");
    onOpenChange(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] animate-scale-in rounded-sm">
        <DialogHeader>
          <DialogTitle>New Group</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <FloatingInput
              label="Group Name"
              id="columnTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              className="py-6 rounded-sm"
              autoFocus
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            className="cursor-pointer rounded-sm py-6"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="cursor-pointer rounded-sm py-6 px-8 font-semibold text-background"
            onClick={handleSave}
            disabled={!title.trim()}
          >
            Create Group
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
