import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

const activities = [
  {
    id: 1,
    user: "Sarah Chen",
    initials: "SC",
    action: "published",
    target: "LinkedIn Post: Q4 Results",
    time: "2 min ago",
    color: "bg-success",
  },
  {
    id: 2,
    user: "Mike Johnson",
    initials: "MJ",
    action: "scheduled",
    target: "Twitter Thread: Product Launch",
    time: "15 min ago",
    color: "bg-warning",
  },
  {
    id: 3,
    user: "Emily Davis",
    initials: "ED",
    action: "commented on",
    target: "Instagram Post Draft",
    time: "1 hour ago",
    color: "bg-primary",
  },
  {
    id: 4,
    user: "Alex Kumar",
    initials: "AK",
    action: "approved",
    target: "Facebook Campaign",
    time: "2 hours ago",
    color: "bg-chart-2",
  },
];

export function TeamActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Team Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className={`${activity.color} text-white font-medium`}>
                  {activity.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{activity.user}</span>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground font-medium">{activity.action}</span>{" "}
                  {activity.target}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
