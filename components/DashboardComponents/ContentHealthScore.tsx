import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthMetric {
  label: string;
  score: number;
  status: "good" | "warning" | "critical";
}

const metrics: HealthMetric[] = [
  { label: "Posting Consistency", score: 92, status: "good" },
  { label: "Engagement Rate", score: 78, status: "good" },
  { label: "Content Variety", score: 65, status: "warning" },
  { label: "Response Time", score: 45, status: "critical" },
];

export function ContentHealthScore() {
  const overallScore = Math.round(
    metrics.reduce((sum, m) => sum + m.score, 0) / metrics.length
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getStatusIcon = (status: string) => {
    if (status === "good") return <CheckCircle2 className="h-4 w-4 text-success" />;
    if (status === "warning") return <AlertTriangle className="h-4 w-4 text-warning" />;
    return <AlertTriangle className="h-4 w-4 text-destructive" />;
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Content Health Score</CardTitle>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-success" />
            <span className={cn("text-3xl font-bold", getScoreColor(overallScore))}>
              {overallScore}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                {getStatusIcon(metric.status)}
                <span className="font-medium">{metric.label}</span>
              </div>
              <span className={cn("font-bold", getScoreColor(metric.score))}>
                {metric.score}%
              </span>
            </div>
            <Progress
              value={metric.score}
              className={cn(
                "h-2",
                metric.status === "good" && "[&>div]:bg-success",
                metric.status === "warning" && "[&>div]:bg-warning",
                metric.status === "critical" && "[&>div]:bg-destructive"
              )}
            />
          </div>
        ))}
        <div className="pt-2 text-sm text-muted-foreground">
          <p>💡 Tip: Increase content variety to improve your score</p>
        </div>
      </CardContent>
    </Card>
  );
}
