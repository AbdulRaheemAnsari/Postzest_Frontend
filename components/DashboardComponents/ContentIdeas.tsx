import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Plus } from "lucide-react";

const ideas = [
  {
    id: 1,
    title: "Share customer success story",
    category: "Case Study",
    trending: true,
    platforms: ["LinkedIn", "Twitter"],
  },
  {
    id: 2,
    title: "Behind-the-scenes team photo",
    category: "Culture",
    trending: false,
    platforms: ["Instagram", "Facebook"],
  },
  {
    id: 3,
    title: "Industry trend analysis",
    category: "Thought Leadership",
    trending: true,
    platforms: ["LinkedIn", "Medium"],
  },
  {
    id: 4,
    title: "Quick tip video (30 sec)",
    category: "Educational",
    trending: false,
    platforms: ["TikTok", "Instagram"],
  },
];

export function ContentIdeas() {
  return (
    <Card className="bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-warning" />
          Content Ideas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors group"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-medium text-sm">{idea.title}</h4>
                  {idea.trending && (
                    <Badge variant="secondary" className="text-xs bg-warning/10 text-warning border-warning/20">
                      🔥 Trending
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">
                    {idea.category}
                  </Badge>
                  {idea.platforms.map((platform) => (
                    <span key={platform} className="text-xs text-muted-foreground">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
