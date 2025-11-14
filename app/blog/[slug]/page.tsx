"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Calendar, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&auto=format&fit=crop",
    author: "Sarah Johnson",
    content: `
      <p>TikTok has become one of the most powerful platforms for content creators and businesses alike. With over 1 billion active users, the potential for growth is enormous. However, standing out requires strategic planning and execution.</p>

      <h2>1. Understand Your Audience</h2>
      <p>Before creating content, dive deep into TikTok Analytics to understand who your audience is. Look at demographics, watch time, and engagement patterns. This data will guide your content strategy and help you create videos that resonate.</p>

      <h2>2. Leverage Trending Sounds</h2>
      <p>TikTok's algorithm favors content that uses trending audio. Browse the Discover page daily to identify trending sounds in your niche. Don't just use any trending sound—make sure it aligns with your brand and message.</p>

      <h2>3. Post at Optimal Times</h2>
      <p>Timing is everything on TikTok. Analyze when your audience is most active and schedule your posts accordingly. Generally, evenings and weekends see higher engagement, but this can vary based on your specific audience.</p>

      <h2>4. Create Hook-Heavy Content</h2>
      <p>The first 3 seconds of your video are crucial. Create a strong hook that stops users from scrolling. Use text overlays, compelling visuals, or intriguing questions to capture attention immediately.</p>

      <h2>5. Engage with Comments</h2>
      <p>Reply to comments on your videos within the first hour of posting. This signals to TikTok that your content is engaging and can boost your video's reach. Consider creating response videos to interesting comments.</p>

      <h2>6. Collaborate with Other Creators</h2>
      <p>Duets and stitches are powerful features for growth. Collaborate with creators in your niche to tap into their audience. Choose partners whose content aligns with yours for authentic collaborations.</p>

      <h2>7. Use Strategic Hashtags</h2>
      <p>Use a mix of trending, niche-specific, and branded hashtags. Avoid using too many hashtags—3-5 relevant ones work best. Research which hashtags your target audience follows and incorporate them naturally.</p>

      <h2>8. Consistency is Key</h2>
      <p>Post consistently to maintain visibility in the algorithm. Aim for at least one post per day, but prioritize quality over quantity. Develop a content calendar to stay organized and maintain consistency.</p>

      <h2>9. Analyze and Adapt</h2>
      <p>Regularly review your analytics to see what's working and what isn't. Look at completion rates, shares, and saves—these metrics are more important than likes. Use these insights to refine your strategy.</p>

      <h2>10. Tell Stories</h2>
      <p>People connect with stories, not just content. Share behind-the-scenes moments, personal experiences, or customer success stories. Authentic storytelling builds deeper connections with your audience.</p>

      <h2>Conclusion</h2>
      <p>Growing on TikTok requires patience, creativity, and strategic planning. Implement these strategies consistently, and you'll see your audience grow organically. Remember, viral success rarely happens overnight—focus on building genuine connections with your audience.</p>
    `,
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
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&auto=format&fit=crop",
    author: "Mike Chen",
    content: `
      <p>Instagram offers multiple content formats, but Reels and Stories are the two most popular. Understanding which format drives more engagement can help you optimize your content strategy and achieve better results.</p>

      <h2>Understanding Instagram Reels</h2>
      <p>Reels are short-form videos up to 90 seconds that appear in the Reels feed, Explore page, and your profile grid. They're designed to be discovered by new audiences and can significantly expand your reach beyond your existing followers.</p>

      <h2>The Power of Stories</h2>
      <p>Stories are ephemeral content that disappears after 24 hours. They appear at the top of the Instagram feed and are primarily consumed by your existing followers. Stories create a sense of urgency and intimacy with your audience.</p>

      <h2>Engagement Metrics Comparison</h2>
      <p>Our analysis of over 10,000 accounts reveals interesting patterns. Reels typically generate 2-3x more reach than Stories, but Stories often have higher engagement rates among existing followers. The choice depends on your goals.</p>

      <h2>When to Use Reels</h2>
      <p>Use Reels when you want to attract new followers, showcase products or services, or create shareable content. Reels are perfect for tutorials, entertainment, and trending content that can go viral.</p>

      <h2>When to Use Stories</h2>
      <p>Stories excel at building community, sharing behind-the-scenes content, conducting polls, and driving immediate action. They're ideal for time-sensitive announcements or daily updates.</p>

      <h2>Best Practice: Use Both</h2>
      <p>The most successful accounts use both formats strategically. Create Reels for discoverable content and use Stories to nurture your existing community. Repurpose Reels as Stories to maximize content value.</p>

      <h2>Conclusion</h2>
      <p>Both Reels and Stories have unique strengths. Instead of choosing one over the other, integrate both into your content strategy. Use Reels for growth and Stories for engagement to build a thriving Instagram presence.</p>
    `,
  },
];

interface Params {
  params: { slug: string };
}

const BlogDetail = () => {
  const params = useParams();

  const titleToSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const post = blogPosts.find((p) => titleToSlug(p.title) === params.slug);

  console.log("post", post);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <div className="pt-32 pb-20 container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Post Not Found
          </h1>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-20">
        {/* Back Button */}
        <div className="border-b border-border">
          <div className="container mx-auto px-4 py-4">
            {/* <Link href="/blog">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft size={16} />
                Back to Blog
              </Button>
            </Link> */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink className="flex items-center gap-0.5">
                    <Link href={"/blog"}>Blog</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                  <BreadcrumbLink className="flex items-center gap-0.5">
                    <span>{params?.slug}</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-[400px] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background to-transparent" />
        </div>

        {/* Article Content */}
        <article className="container mx-auto px-4 -mt-20 relative z-10">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8 lg:p-12">
              <div className="mb-6">
                <Badge className="bg-primary text-primary-foreground mb-4">
                  {post.category}
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span>By {post.author}</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {post.readTime} min read
                  </span>
                </div>

                <div className="flex gap-2 pb-6 border-b border-border">
                  <Button variant="outline" className="gap-2">
                    <Share2 size={16} />
                    Share
                  </Button>
                </div>
              </div>

              <div
                className="prose prose-lg max-w-none
                  prose-headings:text-foreground prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                  prose-strong:text-foreground
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Author Bio */}
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">
                      {post.author}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Social media strategist and content creator with over 5
                      years of experience helping brands grow their online
                      presence.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Posts */}
          <div className="max-w-4xl mx-auto mt-12 mb-20">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts
                .filter((p) => p.id !== post.id && p.platform === post.platform)
                .slice(0, 2)
                .map((relatedPost) => {
                  const relatedSlug = titleToSlug(relatedPost.title);
                  return (
                    <Link key={relatedPost.id} href={`/blog/${relatedSlug}`}>
                      <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-40 object-cover rounded-t-lg"
                        />
                        <CardContent className="p-6">
                          <Badge className="mb-2">{relatedPost.category}</Badge>
                          <h3 className="font-bold text-foreground line-clamp-2 mb-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;
