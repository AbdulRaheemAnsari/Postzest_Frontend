import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TagsEmptyStateProps {
  onNewTag: () => void;
}

export const TagsEmptyState = ({ onNewTag }: TagsEmptyStateProps) => {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="text-center max-w-lg px-4">
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl animate-pulse">
            <Sparkles className="w-16 h-16 text-background" strokeWidth={2} />
          </div>
          <div className="absolute -top-2 -right-2 w-20 h-20 bg-accent/20 rounded-full blur-2xl" />
          <div className="absolute -bottom-2 -left-2 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
        </div>

        <h2 className="text-4xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Start Organizing
        </h2>
        <p className="text-lg text-muted-foreground mb-3 leading-relaxed">
          Create your first tag to categorize and track your content
          effectively.
        </p>
        <p className="text-muted-foreground mb-10 leading-relaxed">
          Tags help you stay organized and analyze performance across your
          campaigns.
        </p>

        <Button
          onClick={onNewTag}
          className="flex items-center justify-center gap-0.5 !px-4 mx-auto text-md py-7 cursor-pointer rounded-sm font-semibold"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Create Your First Tag
        </Button>
      </div>
    </div>
  );
};
