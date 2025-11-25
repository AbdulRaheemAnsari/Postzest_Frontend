import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const events = [
  {
    id: 1,
    title: "Product Launch Day",
    date: "Tomorrow",
    type: "launch",
    prepared: false,
  },
  {
    id: 2,
    title: "Industry Conference",
    date: "Jan 28",
    type: "event",
    prepared: true,
  },
  {
    id: 3,
    title: "Q4 Earnings Call",
    date: "Feb 1",
    type: "financial",
    prepared: true,
  },
];

export function UpcomingEvents() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  {!event.prepared && (
                    <Badge variant="secondary" className="text-xs bg-destructive/10 text-destructive">
                      <Bell className="h-3 w-3 mr-1" />
                      Action needed
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{event.date}</p>
              </div>
              {!event.prepared && (
                <Button size="sm" variant="outline" className="text-xs h-7">
                  Prepare
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
