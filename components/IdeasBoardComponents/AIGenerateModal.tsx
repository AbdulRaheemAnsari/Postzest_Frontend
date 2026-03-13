import { useState } from "react";
import { Sparkles, Loader2, Lightbulb } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface AIGenerateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate: (ideas: { title: string; description: string }[]) => void;
}

export function AIGenerateModal({
  open,
  onOpenChange,
  onGenerate,
}: AIGenerateModalProps) {
  const [business, setBusiness] = useState("");
  const [audience, setAudience] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<
    { title: string; description: string }[]
  >([]);

  const handleGenerate = async () => {
    if (!business.trim()) return;

    setIsGenerating(true);

    // Simulate AI generation (in real app, this would call an AI API)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockIdeas = [
      {
        title: `5 Tips for ${business} Success`,
        description: `Share actionable tips that help ${
          audience || "your audience"
        } achieve their goals with ${business}.`,
      },
      {
        title: `Behind the Scenes: A Day at ${business}`,
        description: `Give your followers an authentic look at what happens behind the scenes.`,
      },
      {
        title: `Common Mistakes in ${business} and How to Avoid Them`,
        description: `Educational content that positions you as an expert while helping ${
          audience || "your audience"
        }.`,
      },
      {
        title: `Customer Success Story`,
        description: `Share a transformation story that resonates with ${
          audience || "potential customers"
        }.`,
      },
      {
        title: `Quick Win: One Simple Change for Better Results`,
        description: `Provide immediate value with an easy-to-implement tip for ${
          audience || "your followers"
        }.`,
      },
    ];

    setGeneratedIdeas(mockIdeas);
    setIsGenerating(false);
  };

  const handleAddIdeas = () => {
    onGenerate(generatedIdeas);
    handleClose();
  };

  const handleClose = () => {
    setBusiness("");
    setAudience("");
    setGeneratedIdeas([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] rounded-sm max-h-[85vh] overflow-y-auto animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            Generate Ideas
          </DialogTitle>
        </DialogHeader>

        {generatedIdeas.length === 0 ? (
          <div className="space-y-6 mt-4">
            <p className="text-muted-foreground">
              Let's begin with a few questions ✨
            </p>

            <div className="space-y-2">
              <Label htmlFor="business">What is your business about?</Label>
              <Textarea
                id="business"
                placeholder="A training and fitness brand"
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                rows={3}
                className="resize-none border-2 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="audience">What is your target audience?</Label>
              <Textarea
                id="audience"
                placeholder="Busy working professionals worldwide"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                rows={3}
                className="resize-none"
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!business.trim() || isGenerating}
              className="w-full py-6 rounded-sm cursor-pointer font-semibold ai-button"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating Ideas...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Ideas
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4 mt-4">
            <p className="text-sm text-muted-foreground">
              Here are some content ideas for your {business}:
            </p>

            <div className="space-y-3">
              {generatedIdeas.map((idea, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-muted/50 border border-border/50 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-md bg-primary/10 shrink-0 mt-0.5">
                      <Lightbulb className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">{idea.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {idea.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setGeneratedIdeas([])}
                className="flex-1 cursor-pointer py-6 font-semibold rounded-sm"
              >
                Generate More
              </Button>
              <Button
                onClick={handleAddIdeas}
                className="flex-1 cursor-pointer py-6 font-semibold rounded-sm"
              >
                Add All Ideas
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
