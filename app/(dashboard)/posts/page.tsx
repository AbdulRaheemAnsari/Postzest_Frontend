import { FilterBar } from "@/components/common/FilterBar";
import { PostCard } from "@/components/common/PostCard";
import { mockPosts } from "@/data/mockPosts";

export default function Posts() {
  return (
    <div className="min-h-screen bg-background">
      {/* Filter Bar */}
      <FilterBar title="All Posts" />

      {/* Posts Grid */}
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
