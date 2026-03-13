import { addDays, subDays, format, isWithinInterval, parseISO } from "date-fns";

// Generate comprehensive mock data for the last year
export const generateAnalyticsData = () => {
  const data = [];
  const today = new Date();
  const startDate = subDays(today, 365);

  for (let i = 0; i <= 365; i++) {
    const date = addDays(startDate, i);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Create realistic variation in data
    const baseViews = isWeekend ? 800 : 1200;
    const seasonalMultiplier = 1 + Math.sin((i / 365) * Math.PI * 2) * 0.3;

    data.push({
      date: format(date, "yyyy-MM-dd"),
      views: Math.floor((baseViews + Math.random() * 600) * seasonalMultiplier),
      likes: Math.floor((400 + Math.random() * 300) * seasonalMultiplier),
      shares: Math.floor((100 + Math.random() * 150) * seasonalMultiplier),
      comments: Math.floor((50 + Math.random() * 80) * seasonalMultiplier),
      desktop: Math.floor((150 + Math.random() * 350) * seasonalMultiplier),
      mobile: Math.floor((120 + Math.random() * 400) * seasonalMultiplier),
    });
  }

  return data;
};

export const analyticsData = generateAnalyticsData();

export const contentTypeData = [
  { name: "Video", value: 35, color: "#4B4DDD" },
  { name: "Image", value: 30, color: "#5EC169" },
  { name: "Text", value: 20, color: "#EAA23B" },
  { name: "Carousel", value: 15, color: "#A35ED5" },
];

export const platformData = [
  { platform: "LinkedIn", posts: 245, engagement: 7.2 },
  { platform: "Twitter", posts: 62, engagement: 5.8 },
  { platform: "Instagram", posts: 38, engagement: 8.5 },
  { platform: "Facebook", posts: 92, engagement: 4.9 },
  { platform: "Pinterest", posts: 189, engagement: 6.8 },
  { platform: "Threads", posts: 129, engagement: 5.2 },
];

export const topPostsData = [
  {
    id: 1,
    title: "Product Launch Video",
    platform: "LinkedIn",
    views: 12500,
    engagement: 8.2,
    score: 95,
    date: "2024-11-15",
  },
  {
    id: 2,
    title: "Behind the Scenes Story",
    platform: "Instagram",
    views: 9800,
    engagement: 7.5,
    score: 88,
    date: "2024-11-20",
  },
  {
    id: 3,
    title: "Industry Report 2024",
    platform: "Twitter",
    views: 8200,
    engagement: 6.8,
    score: 82,
    date: "2024-11-25",
  },
  {
    id: 4,
    title: "Customer Testimonial",
    platform: "Facebook",
    views: 7500,
    engagement: 6.2,
    score: 78,
    date: "2024-10-30",
  },
  {
    id: 5,
    title: "Tutorial: Getting Started",
    platform: "LinkedIn",
    views: 6800,
    engagement: 5.9,
    score: 75,
    date: "2024-10-15",
  },
];

export interface DateRange {
  from: Date;
  to: Date;
}

export const filterDataByDateRange = (
  data: typeof analyticsData,
  dateRange: DateRange
) => {
  return data.filter((item) => {
    const itemDate = parseISO(item.date);
    return isWithinInterval(itemDate, {
      start: dateRange.from,
      end: dateRange.to,
    });
  });
};

export const calculateStats = (filteredData: typeof analyticsData) => {
  const totalViews = filteredData.reduce((sum, item) => sum + item.views, 0);
  const totalLikes = filteredData.reduce((sum, item) => sum + item.likes, 0);
  const totalShares = filteredData.reduce((sum, item) => sum + item.shares, 0);
  const totalComments = filteredData.reduce(
    (sum, item) => sum + item.comments,
    0
  );

  const engagementRate =
    totalViews > 0
      ? (
          ((totalLikes + totalShares + totalComments) / totalViews) *
          100
        ).toFixed(1)
      : "0";

  return {
    totalViews,
    totalLikes,
    totalShares,
    totalComments,
    engagementRate,
  };
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

export const getDateRangeFromPreset = (preset: string): DateRange => {
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  switch (preset) {
    case "7d":
      return { from: subDays(today, 7), to: today };
    case "28d":
      return { from: subDays(today, 28), to: today };
    case "90d":
      return { from: subDays(today, 90), to: today };
    case "12m":
      return { from: subDays(today, 365), to: today };
    default:
      return { from: subDays(today, 7), to: today };
  }
};
