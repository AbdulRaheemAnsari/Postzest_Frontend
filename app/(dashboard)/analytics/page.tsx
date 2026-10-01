"use client";
import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import { TrendingUp, Users, Heart, Share2, Calendar } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format, subDays } from "date-fns";
import {
  analyticsData,
  contentTypeData,
  platformData,
  topPostsData,
  filterDataByDateRange,
  calculateStats,
  formatNumber,
  getDateRangeFromPreset,
} from "@/data/analytics-data";
import { DateRangePicker } from "@/components/DateRangePicker";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [platformTimeRange, setPlatformTimeRange] = useState("7d");
  const [customDateRange, setCustomDateRange] = useState<DateRange | undefined>(
    {
      from: subDays(new Date(), 7),
      to: new Date(),
    }
  );

  // Calculate the actual date range based on selection
  const effectiveDateRange = useMemo(() => {
    if (
      timeRange === "custom" &&
      customDateRange?.from &&
      customDateRange?.to
    ) {
      return { from: customDateRange.from, to: customDateRange.to };
    }
    return getDateRangeFromPreset(timeRange);
  }, [timeRange, customDateRange]);

  // Filter data based on date range
  const filteredData = useMemo(() => {
    return filterDataByDateRange(analyticsData, effectiveDateRange);
  }, [effectiveDateRange]);

  // Calculate stats from filtered data
  const stats = useMemo(() => {
    return calculateStats(filteredData);
  }, [filteredData]);

  // Calculate percentage changes (comparing to previous period)
  const previousPeriodData = useMemo(() => {
    const periodLength = filteredData.length;
    const previousStart = subDays(effectiveDateRange.from, periodLength);
    const previousEnd = subDays(effectiveDateRange.from, 1);
    return filterDataByDateRange(analyticsData, {
      from: previousStart,
      to: previousEnd,
    });
  }, [effectiveDateRange, filteredData.length]);

  const previousStats = useMemo(() => {
    return calculateStats(previousPeriodData);
  }, [previousPeriodData]);

  const calculateChange = (current: number, previous: number): string => {
    if (previous === 0) return "+100%";
    const change = ((current - previous) / previous) * 100;
    return `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`;
  };

  // Chart configuration
  const chartConfig: ChartConfig = {
    views: {
      label: "Views",
      color: "hsl(var(--chart-1))",
    },
    likes: {
      label: "Likes",
      color: "hsl(var(--chart-2))",
    },
    shares: {
      label: "Shares",
      color: "hsl(var(--chart-3))",
    },
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  };

  const total = useMemo(
    () => ({
      desktop: filteredData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: filteredData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    [filteredData]
  );

  const totalVisitors = total.desktop + total.mobile;

  // Radial chart data for stacked view
  const radialData = useMemo(
    () => [
      { name: "mobile", visitors: total.mobile, fill: "hsl(var(--chart-2))" },
      { name: "desktop", visitors: total.desktop, fill: "hsl(var(--chart-1))" },
    ],
    [total]
  );

  // Platform data filtered by platform time range
  const filteredPlatformData = useMemo(() => {
    const range = getDateRangeFromPreset(platformTimeRange);
    const filtered = filterDataByDateRange(analyticsData, range);

    // Aggregate platform data based on filtered period
    const multiplier = filtered.length / 30; // Normalize based on 30-day baseline
    return platformData.map((p) => ({
      ...p,
      posts: Math.round(p.posts * multiplier),
      engagement: parseFloat(
        (p.engagement * (0.8 + Math.random() * 0.4)).toFixed(1)
      ),
    }));
  }, [platformTimeRange]);

  // Get date range label for display
  const getDateRangeLabel = () => {
    if (
      timeRange === "custom" &&
      customDateRange?.from &&
      customDateRange?.to
    ) {
      return `${format(customDateRange.from, "MMM d")} - ${format(
        customDateRange.to,
        "MMM d, yyyy"
      )}`;
    }
    return `${format(effectiveDateRange.from, "MMM d")} - ${format(
      effectiveDateRange.to,
      "MMM d, yyyy"
    )}`;
  };

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    if (value !== "custom") {
      const range = getDateRangeFromPreset(value);
      setCustomDateRange({ from: range.from, to: range.to });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Track your content performance • {getDateRangeLabel()}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={timeRange} onValueChange={handleTimeRangeChange}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="h-4 w-4 mr-2" />
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
            {timeRange === "custom" && (
              <DateRangePicker
                dateRange={customDateRange}
                onDateRangeChange={setCustomDateRange}
              />
            )}
          </div>
        </div>

        {/* 1. Overview Stats - 4 Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Total Views",
              value: formatNumber(stats.totalViews),
              change: calculateChange(
                stats.totalViews,
                previousStats.totalViews
              ),
              icon: Users,
              colorClass: "bg-chart-1",
            },
            {
              label: "Engagement Rate",
              value: `${stats.engagementRate}%`,
              change: calculateChange(
                parseFloat(stats.engagementRate),
                parseFloat(previousStats.engagementRate)
              ),
              icon: TrendingUp,
              colorClass: "bg-chart-2",
            },
            {
              label: "Total Likes",
              value: formatNumber(stats.totalLikes),
              change: calculateChange(
                stats.totalLikes,
                previousStats.totalLikes
              ),
              icon: Heart,
              colorClass: "bg-chart-5",
            },
            {
              label: "Shares",
              value: formatNumber(stats.totalShares),
              change: calculateChange(
                stats.totalShares,
                previousStats.totalShares
              ),
              icon: Share2,
              colorClass: "bg-chart-3",
            },
          ].map((stat, idx) => (
            <Card key={idx} className="transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <h3 className="text-2xl font-bold mt-2 text-foreground">
                      {stat.value}
                    </h3>
                    <p
                      className={`text-sm mt-2 font-medium ${
                        stat.change.startsWith("+")
                          ? "text-success"
                          : "text-destructive"
                      }`}
                    >
                      {stat.change} vs previous period
                    </p>
                  </div>
                  <div
                    className={`h-10 w-10 rounded-lg flex items-center justify-center ${stat.colorClass}`}
                  >
                    <stat.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 2. Engagement Over Time Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Engagement Over Time</CardTitle>
            <CardDescription>
              Views, likes, and shares • {getDateRangeLabel()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E2E2" />
                <XAxis
                  dataKey="date"
                  stroke="#B0B0B0"
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <YAxis stroke="#B0B0B0" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFF",
                    border: "1px solid #d1d1d1",
                    borderRadius: "var(--radius)",
                  }}
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#4B4DDD"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="likes"
                  stroke="#5EC169"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="shares"
                  stroke="#EAA23B"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 3. Content Type Performance + Traffic Overview in 1 row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Content Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Content Type Performance</CardTitle>
              <CardDescription>Distribution by content format</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={contentTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
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
                      backgroundColor: "#FFF",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Traffic Overview - Single Stacked Radial Chart */}
          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Traffic Overview</CardTitle>
              <CardDescription>{getDateRangeLabel()}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <RadialBarChart
                  data={radialData}
                  startAngle={180}
                  endAngle={0}
                  innerRadius={80}
                  outerRadius={130}
                >
                  <PolarAngleAxis
                    type="number"
                    domain={[0, totalVisitors]}
                    angleAxisId={0}
                    tick={false}
                  />
                  <RadialBar
                    dataKey="visitors"
                    background={{ fill: "#4B4DDD" }}
                    cornerRadius={10}
                    fill="var(--color-desktop)"
                  />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-foreground text-3xl font-bold"
                  >
                    {totalVisitors.toLocaleString()}
                  </text>
                  <text
                    x="50%"
                    y="60%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-muted-foreground text-sm"
                  >
                    Visitors
                  </text>
                </RadialBarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by{" "}
                {((total.desktop / (total.mobile || 1) - 1) * 100).toFixed(1)}%
                this period
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="flex gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-chart-1" />
                  Desktop: {total.desktop.toLocaleString()}
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-chart-2" />
                  Mobile: {total.mobile.toLocaleString()}
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* 4. Top Performing Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Posts</CardTitle>
            <CardDescription>Your best content this period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPostsData.slice(0, 5).map((post, idx) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      #{idx + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-card-foreground">
                        {post.title}
                      </h4>
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
                        ? "bg-success/10 text-success border-success/20"
                        : post.score >= 80
                        ? "bg-warning/10 text-warning border-warning/20"
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

        {/* 5. Platform Comparison with its own date filter */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Platform Comparison</CardTitle>
                <CardDescription>
                  Posts and engagement by platform
                </CardDescription>
              </div>
              <Select
                value={platformTimeRange}
                onValueChange={setPlatformTimeRange}
              >
                <SelectTrigger className="w-[160px]">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="28d">Last 28 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="12m">Last 12 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredPlatformData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="platform"
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="posts"
                  name="Posts"
                  fill="hsl(var(--chart-1))"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="engagement"
                  name="Engagement %"
                  fill="hsl(var(--chart-2))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
