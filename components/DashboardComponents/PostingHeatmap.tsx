import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

const heatmapData = [
  { day: "Mon", hours: [0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 4, 3, 2, 3, 4, 5, 4, 3, 2, 1, 0, 0, 0] },
  { day: "Tue", hours: [0, 0, 0, 0, 0, 0, 2, 3, 4, 5, 5, 5, 4, 3, 4, 5, 5, 4, 3, 2, 1, 0, 0, 0] },
  { day: "Wed", hours: [0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 5, 4, 4, 3, 4, 5, 4, 4, 3, 2, 1, 0, 0, 0] },
  { day: "Thu", hours: [0, 0, 0, 0, 0, 0, 2, 3, 4, 5, 5, 5, 4, 3, 4, 5, 5, 4, 3, 2, 1, 0, 0, 0] },
  { day: "Fri", hours: [0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 4, 4, 3, 2, 3, 4, 4, 3, 3, 2, 1, 1, 0, 0] },
  { day: "Sat", hours: [0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1, 1, 0, 0, 0] },
  { day: "Sun", hours: [0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 3, 3, 2, 2, 3, 3, 3, 2, 2, 1, 1, 0, 0, 0] },
];

export function PostingHeatmap() {
  const getColor = (value: number) => {
    if (value === 0) return "bg-muted";
    if (value === 1) return "bg-primary/20";
    if (value === 2) return "bg-primary/40";
    if (value === 3) return "bg-primary/60";
    if (value === 4) return "bg-primary/80";
    return "bg-primary";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Best Posting Times
          </CardTitle>
          <Badge className="bg-success/10 text-success border-success/20">
            Peak: Tue-Thu 10AM
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {heatmapData.map((row) => (
            <div key={row.day} className="flex items-center gap-2">
              <span className="text-xs font-medium w-10 text-muted-foreground">
                {row.day}
              </span>
              <div className="flex gap-1 flex-1">
                {row.hours.map((value, idx) => (
                  <div
                    key={idx}
                    className={`h-4 flex-1 rounded-sm ${getColor(value)} transition-all hover:scale-110 cursor-pointer`}
                    title={`${row.day} ${idx}:00 - Engagement: ${value}/5`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t text-xs text-muted-foreground">
          <span>Low engagement</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4, 5].map((v) => (
              <div key={v} className={`h-3 w-3 rounded-sm ${getColor(v)}`} />
            ))}
          </div>
          <span>High engagement</span>
        </div>
      </CardContent>
    </Card>
  );
}
