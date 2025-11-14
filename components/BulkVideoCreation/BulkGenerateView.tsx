import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Download, ArrowLeft } from "lucide-react";

interface BulkGenerateViewProps {
  videoCount: number;
  onBack: () => void;
}

export const BulkGenerateView = ({
  videoCount,
  onBack,
}: BulkGenerateViewProps) => {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  const startGeneration = () => {
    setGenerating(true);
    setProgress(0);

    // Simulate generation progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setGenerating(false);
          setComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  if (complete) {
    return (
      <div className="space-y-6">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Customize Videos
        </Button>

        <div className="text-center space-y-4 py-8">
          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-success-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">All videos generated!</h2>
        </div>

        <Progress value={100} className="h-3" />

        <Button
          size="lg"
          className="w-full"
          onClick={() => console.log("Download all")}
        >
          <Download className="w-5 h-5 mr-2" />
          Download All {videoCount} Videos
        </Button>

        <div className="space-y-3">
          {Array.from({ length: videoCount }, (_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-card border rounded-lg hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">Video {i + 1}</h4>
                  <p className="text-sm text-muted-foreground">
                    sample caption text for video {i + 1}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (generating) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4 py-12">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <h2 className="text-2xl font-bold">Generating Videos</h2>
          <p className="text-muted-foreground">
            Please wait while we create your {videoCount} videos...
          </p>
        </div>

        <Progress value={progress} className="h-3" />

        <p className="text-center text-sm text-muted-foreground">
          {progress}% complete
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={onBack}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Customize Videos
      </Button>

      <div className="text-center space-y-6 py-12">
        <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
          <Play className="w-10 h-10 text-primary" />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-2">Ready to Generate</h2>
          <p className="text-lg text-muted-foreground">
            Ready to generate {videoCount} videos using your 2×2 grid template.
          </p>
        </div>

        <Button
          size="lg"
          className="text-lg px-8 py-6"
          onClick={startGeneration}
        >
          <Play className="w-5 h-5 mr-2" />
          Start Bulk Generation
        </Button>
      </div>
    </div>
  );
};
