import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Video } from "lucide-react";

interface VideoCountSliderProps {
  count: number;
  onCountChange: (count: number) => void;
}

export const VideoCountSlider = ({ count, onCountChange }: VideoCountSliderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Video className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Number of Videos</h3>
        </div>
        <Badge className="bg-primary text-primary-foreground font-bold text-lg px-4 py-1">
          {count} videos
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground">
        How many videos do you want to create?
      </p>
      
      <div className="pt-4">
        <Slider
          value={[count]}
          onValueChange={([value]) => onCountChange(value)}
          min={1}
          max={20}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>1</span>
          <span>5</span>
          <span>10</span>
          <span>15</span>
          <span>20</span>
        </div>
      </div>
    </div>
  );
};
