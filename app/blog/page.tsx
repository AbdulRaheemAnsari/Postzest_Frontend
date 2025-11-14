"use client";
import { useState } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "10 TikTok Growth Strategies That Actually Work in 2024",
    excerpt:
      "Discover proven tactics to boost your TikTok engagement and grow your audience organically.",
    category: "TikTok",
    platform: "tiktok",
    readTime: 8,
    date: "March 15, 2024",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop",
    author: "Sarah Johnson",
  },
  {
    id: 2,
    title: "Instagram Reels vs Stories: Which Drives More Engagement?",
    excerpt:
      "A comprehensive analysis of Instagram's content formats and their impact on audience engagement.",
    category: "Instagram",
    platform: "instagram",
    readTime: 6,
    date: "March 12, 2024",
    image:
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&auto=format&fit=crop",
    author: "Mike Chen",
  },
  {
    id: 3,
    title: "YouTube SEO: How to Rank Your Videos Higher",
    excerpt:
      "Master YouTube's algorithm with these essential SEO techniques for better visibility.",
    category: "YouTube",
    platform: "youtube",
    readTime: 10,
    date: "March 10, 2024",
    image:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&auto=format&fit=crop",
    author: "David Park",
  },
  {
    id: 4,
    title: "LinkedIn Content Strategy for B2B Success",
    excerpt:
      "Transform your LinkedIn presence with these proven content strategies for business growth.",
    category: "LinkedIn",
    platform: "linkedin",
    readTime: 7,
    date: "March 8, 2024",
    image:
      "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=800&auto=format&fit=crop",
    author: "Emma Wilson",
  },
  {
    id: 5,
    title: "Twitter Analytics: Understanding Your Audience",
    excerpt:
      "Learn how to interpret Twitter analytics to create more engaging content for your followers.",
    category: "Twitter",
    platform: "twitter",
    readTime: 5,
    date: "March 5, 2024",
    image:
      "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&auto=format&fit=crop",
    author: "Alex Rodriguez",
  },
  {
    id: 6,
    title: "Facebook Ads vs Organic Reach: What Works Better?",
    excerpt:
      "Compare paid and organic strategies to maximize your Facebook marketing ROI.",
    category: "Facebook",
    platform: "facebook",
    readTime: 9,
    date: "March 3, 2024",
    image:
      "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&auto=format&fit=crop",
    author: "Lisa Martinez",
  },
  {
    id: 7,
    title: "Instagram Algorithm Changes: What You Need to Know",
    excerpt:
      "Stay ahead of Instagram's latest algorithm updates and optimize your content strategy.",
    category: "Instagram",
    platform: "instagram",
    readTime: 6,
    date: "March 1, 2024",
    image:
      "https://images.unsplash.com/photo-1611162618479-ee3d24aaef0b?w=800&auto=format&fit=crop",
    author: "Sarah Johnson",
  },
  {
    id: 8,
    title: "TikTok for Business: A Complete Guide",
    excerpt:
      "Everything you need to know about using TikTok for business marketing and brand awareness.",
    category: "TikTok",
    platform: "tiktok",
    readTime: 12,
    date: "February 28, 2024",
    image:
      "https://images.unsplash.com/photo-1611162617263-4ec3060a058e?w=800&auto=format&fit=crop",
    author: "Mike Chen",
  },
  {
    id: 9,
    title: "YouTube Shorts: The Ultimate Growth Hack",
    excerpt:
      "Leverage YouTube Shorts to grow your channel faster and reach new audiences.",
    category: "YouTube",
    platform: "youtube",
    readTime: 7,
    date: "February 25, 2024",
    image:
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&auto=format&fit=crop",
    author: "David Park",
  },
];

const Blog = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  const platforms = [
    { id: "all", name: "All Posts" },
    { id: "tiktok", name: "TikTok" },
    { id: "instagram", name: "Instagram" },
    { id: "youtube", name: "YouTube" },
    { id: "linkedin", name: "LinkedIn" },
    { id: "twitter", name: "Twitter" },
    { id: "facebook", name: "Facebook" },
  ];

  const filteredPosts =
    selectedPlatform === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.platform === selectedPlatform);

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-accent via-background to-accent">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Social Media Insights & Tips
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest trends, strategies, and best
              practices for social media marketing
            </p>
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="py-8 bg-background border-b border-border sticky top-16 z-40 backdrop-blur-md bg-background/80">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {platforms.map((platform) => (
                <Button
                  key={platform.id}
                  variant={
                    selectedPlatform === platform.id ? "default" : "outline"
                  }
                  onClick={() => setSelectedPlatform(platform.id)}
                  className="rounded-full"
                >
                  {platform.name}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => {
                // Helper to convert title to slug
                const titleToSlug = (title: string) =>
                  title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "");
                const slug = titleToSlug(post.title);
                return (
                  <Link key={post.id} href={`/blog/${slug}`}>
                    <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                      <div className="relative overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                          {post.category}
                        </Badge>
                      </div>
                      <CardHeader>
                        <h3 className="text-xl font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Clock size={16} />
                              {post.readTime} min read
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar size={16} />
                              {post.date}
                            </span>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-border">
                          <p className="text-sm text-muted-foreground">
                            By {post.author}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No posts found for this platform. Check back soon!
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Blog;
