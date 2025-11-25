"use client"
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Users, Heart, MessageCircle, Share2 } from "lucide-react";

const engagementData = [
  { date: "Jan 1", views: 2400, likes: 1398, shares: 800 },
  { date: "Jan 8", views: 1398, likes: 2210, shares: 967 },
  { date: "Jan 15", views: 9800, likes: 2290, shares: 1200 },
  { date: "Jan 22", views: 3908, likes: 2000, shares: 1100 },
  { date: "Jan 29", views: 4800, likes: 2181, shares: 1300 },
  { date: "Feb 5", views: 3800, likes: 2500, shares: 1400 },
  { date: "Feb 12", views: 4300, likes: 2100, shares: 1250 },
];

const contentTypeData = [
  { name: "Video", value: 35, color: "#8884d8" },
  { name: "Image", value: 30, color: "#5EC169" },
  { name: "Text", value: 20, color: "#EAA23B" },
  { name: "Carousel", value: 15, color: "#8540E1" },
];

const topPosts = [
  {
    id: 1,
    title: "Product Launch Video",
    platform: "LinkedIn",
    views: 12500,
    engagement: 8.2,
    score: 95,
  },
  {
    id: 2,
    title: "Behind the Scenes Story",
    platform: "Instagram",
    views: 9800,
    engagement: 7.5,
    score: 88,
  },
  {
    id: 3,
    title: "Industry Report 2024",
    platform: "Twitter",
    views: 8200,
    engagement: 6.8,
    score: 82,
  },
];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <div className="space-y-6 animate-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Track your content performance and audience insights
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="28d">Last 28 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="12m">Last 12 months</SelectItem>
            <SelectItem value="custom">Custom range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Total Views", value: "124.5K", change: "+12.5%", icon: Users, color: "bg-chart-1" },
          { label: "Engagement Rate", value: "7.8%", change: "+2.3%", icon: TrendingUp, color: "bg-chart-2" },
          { label: "Total Likes", value: "18.2K", change: "+8.4%", icon: Heart, color: "bg-chart-5" },
          { label: "Shares", value: "3.4K", change: "+15.2%", icon: Share2, color: "bg-chart-3" },
        ].map((stat, idx) => (
          <Card key={idx} className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <h3 className="text-2xl font-bold mt-2 text-foreground">{stat.value}</h3>
                  <p className="text-sm mt-2 font-medium text-success">{stat.change}</p>
                </div>
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Engagement Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Engagement Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#C4C4C4" />
              <XAxis dataKey="date" stroke="#4E4E4E" />
              <YAxis stroke="#4E4E4E" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #d1d1d1",
                  borderRadius: "var(--radius)",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-1))" }}
              />
              <Line
                type="monotone"
                dataKey="likes"
                
                stroke="#82ca9d"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-2))" }}
              />
              <Line
                type="monotone"
                dataKey="shares"
                
                stroke="#FF7B00"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-3))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Content Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Content Type Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={contentTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {contentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Performing Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPosts.map((post, idx) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      #{idx + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-card-foreground">{post.title}</h4>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span>{post.platform}</span>
                        <span>•</span>
                        <span>{post.views.toLocaleString()} views</span>
                        <span>•</span>
                        <span>{post.engagement}% engagement</span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      post.score >= 90
                        ? "bg-success/10 text-success"
                        : post.score >= 80
                        ? "bg-warning/10 text-warning"
                        : "bg-muted text-muted-foreground"
                    }
                  >
                    Score: {post.score}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { platform: "LinkedIn", posts: 245, engagement: 7.2 },
                { platform: "Twitter", posts: 62, engagement: 5.8 },
                { platform: "Instagram", posts: 38, engagement: 81.5 },
                { platform: "Facebook", posts: 92, engagement: 120.9 },
                { platform: "Pinterest", posts: 189, engagement: 200.28 },
                { platform: "Threads", posts: 129, engagement: 92.8 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="platform" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Legend />
              <Bar dataKey="posts" fill="#4C4BEC" radius={[8, 8, 0, 0]} />
              <Bar dataKey="engagement" fill="#5EC169" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
