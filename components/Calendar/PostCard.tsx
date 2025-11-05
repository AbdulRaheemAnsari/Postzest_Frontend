'use client';

interface PostCardProps {
  post: any;
  onClick: () => void;
  isHovered?: boolean;
}

export default function PostCard({
  post,
  onClick,
  isHovered,
}: PostCardProps) {
  const getPlatformIcon = () => {
    const icons: { [key: string]: string } = {
      instagram: '📷',
      linkedin: '💼',
      twitter: '𝕏',
      facebook: '📘',
    };
    return icons[post.platform] || '📱';
  };

  const getPlatformColor = () => {
    const colors: { [key: string]: string } = {
      instagram: 'bg-pink-100 dark:bg-pink-950',
      linkedin: 'bg-blue-100 dark:bg-blue-950',
      twitter: 'bg-slate-100 dark:bg-slate-950',
      facebook: 'bg-blue-50 dark:bg-blue-900',
    };
    return colors[post.platform] || 'bg-slate-100';
  };

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2 px-2 py-1 rounded text-xs font-medium cursor-pointer transition-all ${getPlatformColor()} ${
        isHovered ? 'ring-1 ring-blue-600' : ''
      }`}
    >
      <span className="flex-shrink-0">{getPlatformIcon()}</span>
      <span className="text-foreground truncate flex-1">{post.scheduledTime}</span>
      {post.author && (
        <img
          src={post.author.avatar || "/placeholder.svg"}
          alt={post.author.name}
          className="w-4 h-4 rounded-full flex-shrink-0"
        />
      )}
    </div>
  );
}