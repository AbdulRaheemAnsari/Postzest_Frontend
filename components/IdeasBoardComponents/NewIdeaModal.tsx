import { useState, useRef, useEffect } from "react";
import { Idea, Column, Tag } from "@/types/idea";
import { X, Image, FileText, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TagSelector } from "./TagSelector";
import FloatingInput from "../common/FloatingInput";

interface NewIdeaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columns: Column[];
  tags: Tag[];
  initialColumnId?: string;
  editingIdea?: Idea | null;
  onSave: (idea: Omit<Idea, "id" | "createdAt" | "updatedAt">) => void;
  onUpdate?: (id: string, updates: Partial<Idea>) => void;
  onCreateTag: (name: string) => Tag;
}

export function NewIdeaModal({
  open,
  onOpenChange,
  columns,
  tags,
  initialColumnId,
  editingIdea,
  onSave,
  onUpdate,
  onCreateTag,
}: NewIdeaModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [columnId, setColumnId] = useState(initialColumnId || "unassigned");
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset form when modal opens or editingIdea changes
  useEffect(() => {
    if (open) {
      if (editingIdea) {
        setTitle(editingIdea.title);
        setDescription(editingIdea.description);
        setColumnId(editingIdea.columnId);
        setSelectedTagIds(editingIdea.tagIds || []);
        setImageUrl(editingIdea.imageUrl || "");
        setFileName(editingIdea.fileName || "");
      } else {
        setTitle("");
        setDescription("");
        setColumnId(initialColumnId || "unassigned");
        setSelectedTagIds([]);
        setImageUrl("");
        setFileName("");
      }
    }
  }, [open, editingIdea, initialColumnId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSave = () => {
    if (!title.trim()) return;

    if (editingIdea && onUpdate) {
      onUpdate(editingIdea.id, {
        title: title.trim(),
        description: description.trim(),
        columnId,
        tagIds: selectedTagIds,
        imageUrl,
        fileName,
      });
    } else {
      onSave({
        title: title.trim(),
        description: description.trim(),
        columnId,
        tagIds: selectedTagIds,
        imageUrl,
        fileName,
      });
    }

    onOpenChange(false);
  };

  const removeFile = () => {
    setImageUrl("");
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {editingIdea ? "Edit Idea" : "New Idea"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Title */}
          <div className="space-y-2">
            <FloatingInput
              label="Title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-sm py-6"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="font-semibold text-foreground" htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your idea..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Column Selection */}
          <div className="flex gap-3">
            <div className="flex-1 space-y-2">
              <Label className="font-semibold text-foreground">Status</Label>
              <Select value={columnId} onValueChange={setColumnId}>
                <SelectTrigger className="py-6 font-semibold w-full">
                  <SelectValue placeholder="Select a column" />
                </SelectTrigger>
                <SelectContent>
                  {columns.map((col) => (
                    <SelectItem className="font-semibold" key={col.id} value={col.id}>
                      {col.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 space-y-2">
              <Label className="font-semibold text-foreground">Tags</Label>
              <TagSelector
                tags={tags}
                selectedTagIds={selectedTagIds}
                onTagsChange={setSelectedTagIds}
                onCreateTag={onCreateTag}
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label className="font-semibold text-foreground">Attachment</Label>
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,.pdf,.doc,.docx,.txt"
              className="hidden"
            />

            {!fileName ? (
              <Button
                type="button"
                variant="outline"
                className="w-full h-24 border-dashed border-muted-foreground/60 hover:border-primary hover:cursor-pointer flex flex-col gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-6 w-6 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Click to upload image or file
                </span>
              </Button>
            ) : (
              <div className="relative border rounded-lg p-3 bg-muted/50">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-md mb-2"
                  />
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    {imageUrl ? (
                      <Image className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="truncate max-w-[200px]">{fileName}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={removeFile}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <Button 
          className="font-semibold cursor-pointer rounded-sm py-6"
          variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
          className="font-semibold cursor-pointer rounded-sm py-6"
          onClick={handleSave} disabled={!title.trim()}>
            {editingIdea ? "Save Changes" : "Create Idea"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
