import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Music, Type, Wand2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface BulkSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplySettings: (settings: {
    musicTrack?: string;
    captionPrefix?: string;
    captionSuffix?: string;
  }) => void;
}

const musicTracks = [
  "MUTT (baby take ur time)",
  "Walking Dreams",
  "Minecraft 1",
  "Aria Math",
  "Sweden (C418)",
  "Wet Hands",
  "Subwoofer Lullaby",
  "Haggstrom",
];

export const BulkSettingsModal = ({
  open,
  onOpenChange,
  onApplySettings,
}: BulkSettingsModalProps) => {
  const [selectedMusic, setSelectedMusic] = useState<string>("");
  const [captionPrefix, setCaptionPrefix] = useState("");
  const [captionSuffix, setCaptionSuffix] = useState("");

  const handleApply = () => {
    const settings: any = {};
    
    if (selectedMusic) {
      settings.musicTrack = selectedMusic;
    }
    
    if (captionPrefix || captionSuffix) {
      settings.captionPrefix = captionPrefix;
      settings.captionSuffix = captionSuffix;
    }

    onApplySettings(settings);
    onOpenChange(false);
    
    // Reset form
    setSelectedMusic("");
    setCaptionPrefix("");
    setCaptionSuffix("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex text-2xl font-semibold items-center gap-2">
            <Wand2 className="w-5 h-5 text-primary" />
            Bulk Settings
          </DialogTitle>
          <DialogDescription>
            Apply settings to all videos at once. Select only the options you want to change.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Music Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-primary" />
              <Label className="text-base font-semibold">
                Apply Same Music to All Videos
              </Label>
            </div>
            <RadioGroup value={selectedMusic} onValueChange={setSelectedMusic}>
              <div className="grid grid-cols-2 gap-2">
                {musicTracks.map((track) => (
                  <div
                    key={track}
                    className="flex items-center space-x-2 border rounded-lg p-3 hover:border-primary/50 transition-colors"
                  >
                    <RadioGroupItem value={track} id={track} />
                    <Label
                      htmlFor={track}
                      className="text-sm cursor-pointer flex-1"
                    >
                      {track}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
            {selectedMusic && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedMusic("")}
                className="text-xs"
              >
                Clear selection
              </Button>
            )}
          </div>

          {/* Caption Format */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-primary" />
              <Label className="text-base font-semibold">
                Caption Format (Optional)
              </Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Add prefix or suffix to all captions. Leave empty to keep original captions.
            </p>
            <div className="space-y-3">
              <div>
                <Label htmlFor="prefix" className="text-sm">
                  Prefix (appears before caption)
                </Label>
                <Input
                  id="prefix"
                  placeholder="e.g., 🔥"
                  value={captionPrefix}
                  onChange={(e) => setCaptionPrefix(e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="suffix" className="text-sm">
                  Suffix (appears after caption)
                </Label>
                <Input
                  id="suffix"
                  placeholder="e.g., 💯"
                  value={captionSuffix}
                  onChange={(e) => setCaptionSuffix(e.target.value)}
                  className="mt-1.5"
                />
              </div>
              {(captionPrefix || captionSuffix) && (
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Preview:</p>
                  <p className="text-sm">
                    {captionPrefix && <span className="text-primary">{captionPrefix} </span>}
                    <span>Your caption text here</span>
                    {captionSuffix && <span className="text-primary"> {captionSuffix}</span>}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
          className="cursor-pointer text-muted-foreground py-6 px-6 rounded-sm"
          variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            className="rounded-sm cursor-pointer py-6 font-semibold"
            disabled={!selectedMusic && !captionPrefix && !captionSuffix}
          >
            Apply to All Videos
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
