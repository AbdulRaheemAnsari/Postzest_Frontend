import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MusicSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTrack: (track: string) => void;
  currentTrack?: string;
}

const musicTracks = [
  "Minecraft 1",
  "Minecraft 2",
  "Walking Dreams",
  "Aria Math",
  "Flawed Mangoes 1",
  "Flawed Mangoes 2",
  "Dorian Concept",
  "MUTT (baby take ur time)",
];

export const MusicSelector = ({
  open,
  onOpenChange,
  onSelectTrack,
  currentTrack,
}: MusicSelectorProps) => {
  const handleSelectTrack = (track: string) => {
    onSelectTrack(track);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Free Music Tracks
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[500px] pr-4">
          <div className="space-y-3">
            {musicTracks.map((track) => (
              <div
                key={track}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Music className="w-5 h-5 text-success" />
                  <span className="font-medium text-foreground">{track}</span>
                </div>
                <Button
                  onClick={() => handleSelectTrack(track)}
                  className="bg-primary hover:bg-primary/80 text-background cursor-pointer"
                >
                  Use Music
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex justify-end pt-4">
          <Button
            className=" cursor-pointer"
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
