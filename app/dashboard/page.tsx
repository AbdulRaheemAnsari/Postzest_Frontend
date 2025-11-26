"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  FileText,
  TrendingUp,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Edit,
  Eye,
} from "lucide-react";
import { SentimentAnalysis } from "@/components/DashboardComponents/SentimentAnalysis";
import { ContentIdeas } from "@/components/DashboardComponents/ContentIdeas";
import { TeamActivityFeed } from "@/components/DashboardComponents/TeamActivityFeed";
import { UpcomingEvents } from "@/components/DashboardComponents/UpcomingEvents";
import { StatCard } from "@/components/DashboardComponents/StatCard";
import { ContentHealthScore } from "@/components/DashboardComponents/ContentHealthScore";
import { PostingHeatmap } from "@/components/DashboardComponents/PostingHeatmap";

const recentPosts = [
  {
    id: 1,
    title: "5 Tips for Better Social Media Engagement",
    platform: "LinkedIn",
    status: "scheduled",
    scheduledFor: "Today, 3:00 PM",
    engagement: "—",
  },
  {
    id: 2,
    title: "New Product Launch Announcement",
    platform: "Twitter",
    status: "published",
    scheduledFor: "Yesterday, 10:00 AM",
    engagement: "2.4K views",
  },
  {
    id: 3,
    title: "Behind the Scenes: Team Culture",
    platform: "Instagram",
    status: "draft",
    scheduledFor: "—",
    engagement: "—",
  },
  {
    id: 4,
    title: "Industry Trends Report Q4",
    platform: "Facebook",
    status: "published",
    scheduledFor: "2 days ago",
    engagement: "1.8K views",
  },
];

const aiSuggestions = [
  "Best time to post: Weekdays 9-11 AM",
  "Trending topic: AI automation tools",
  "Engagement up 23% on video content",
];

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening with your content.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Posts"
          value="142"
          change="+12% from last month"
          changeType="positive"
          icon={FileText}
          iconColor="bg-primary"
        />
        <StatCard
          title="Scheduled"
          value="24"
          change="Next: Today 3:00 PM"
          changeType="neutral"
          icon={Clock}
          iconColor="bg-warning"
        />
        <StatCard
          title="Published This Month"
          value="38"
          change="+8% vs last month"
          changeType="positive"
          icon={CheckCircle2}
          iconColor="bg-success"
        />
        <StatCard
          title="Avg. Engagement"
          value="3.2K"
          change="+15% this week"
          changeType="positive"
          icon={TrendingUp}
          iconColor="bg-chart-4"
        />
      </div>

      {/* Content Health & Posting Times */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ContentHealthScore />
        <PostingHeatmap />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Posts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Posts</CardTitle>
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-start justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-card-foreground">{post.title}</h4>
                      <Badge
                        variant={
                          post.status === "published"
                            ? "default"
                            : post.status === "scheduled"
                            ? "secondary"
                            : "outline"
                        }
                        className={
                          post.status === "published"
                            ? "bg-success text-success-foreground"
                            : post.status === "scheduled"
                            ? "bg-warning text-warning-foreground"
                            : ""
                        }
                      >
                        {post.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{post.platform}</span>
                      <span>•</span>
                      <span>{post.scheduledFor}</span>
                      {post.engagement !== "—" && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {post.engagement}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights & Quick Actions */}
        <div className="space-y-6">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aiSuggestions.map((suggestion, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-sm p-3 rounded-md bg-card"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                    <span className="text-card-foreground">{suggestion}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline">
                Get More Insights
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule New Post
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Team Collaboration
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sentiment Analysis */}
      {/* <SentimentAnalysis /> */}

      {/* Content Ideas & Team Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ContentIdeas />
        <div className="space-y-6">
          <TeamActivityFeed />
          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
