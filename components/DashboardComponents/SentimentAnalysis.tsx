import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, ThumbsUp, ThumbsDown, AlertCircle, Copy, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { analyzeSentiment, PriorityLevel, SentimentType } from "@/utils/sentimentAnalyzer";

interface Comment {
  id: number;
  platform: string;
  author: string;
  text: string;
  timestamp: string;
}

const mockComments: Comment[] = [
  {
    id: 1,
    platform: "Twitter",
    author: "@john_doe",
    text: "Love your new product! This is exactly what I needed. Amazing work! 🎉",
    timestamp: "5 min ago"
  },
  {
    id: 2,
    platform: "LinkedIn",
    author: "Sarah Johnson",
    text: "I'm having issues with the latest update. It keeps crashing and I can't access my data. This is urgent!",
    timestamp: "12 min ago"
  },
  {
    id: 3,
    platform: "Instagram",
    author: "@creative_mind",
    text: "Nice post! When will you be launching the new features you mentioned?",
    timestamp: "23 min ago"
  },
  {
    id: 4,
    platform: "Facebook",
    author: "Mike Chen",
    text: "Worst experience ever. The customer service is terrible and nobody is responding to my emails. Very disappointed.",
    timestamp: "45 min ago"
  },
  {
    id: 5,
    platform: "Twitter",
    author: "@tech_enthusiast",
    text: "Interesting concept. Would like to see more details about the pricing.",
    timestamp: "1 hour ago"
  }
];

const getSentimentColor = (sentiment: SentimentType) => {
  switch (sentiment) {
    case 'positive': return 'bg-success text-white';
    case 'negative': return 'bg-destructive text-white';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getSentimentIcon = (sentiment: SentimentType) => {
  switch (sentiment) {
    case 'positive': return <ThumbsUp className="h-4 w-4" />;
    case 'negative': return <ThumbsDown className="h-4 w-4" />;
    default: return <MessageSquare className="h-4 w-4" />;
  }
};

const getPriorityColor = (priority: PriorityLevel) => {
  switch (priority) {
    case 'high': return 'border-destructive bg-destructive/10 text-destructive';
    case 'medium': return 'border-warning bg-warning/10 text-warning';
    default: return 'border-muted bg-muted/10 text-muted-foreground';
  }
};

export function SentimentAnalysis() {
  const [selectedResponse, setSelectedResponse] = useState<{ [key: number]: number }>({});

  const handleCopyResponse = (response: string, commentId: number) => {
    navigator.clipboard.writeText(response);
    toast.success("Response copied to clipboard!");
  };

  const handleSendResponse = (response: string, comment: Comment) => {
    toast.success("Response sent successfully!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Sentiment Analysis & Response Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mockComments.map((comment) => {
            const analysis = analyzeSentiment(comment.text);
            const currentResponseIndex = selectedResponse[comment.id] || 0;

            return (
              <div
                key={comment.id}
                className={`border-l-4 pl-4 py-3 rounded-r-lg ${getPriorityColor(analysis.priority)}`}
              >
                {/* Comment Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{comment.author}</span>
                    <Badge variant="outline" className="text-xs">
                      {comment.platform}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {analysis.priority === 'high' && (
                      <Badge variant="destructive" className="gap-1">
                        <AlertCircle className="h-3 w-3" />
                        High Priority
                      </Badge>
                    )}
                    <Badge className={`${getSentimentColor(analysis.sentiment)} gap-1`}>
                      {getSentimentIcon(analysis.sentiment)}
                      {analysis.sentiment}
                    </Badge>
                  </div>
                </div>

                {/* Comment Text */}
                <p className="text-sm mb-3 text-foreground/90">{comment.text}</p>

                {/* Sentiment Score */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Sentiment Score</span>
                    <span className="font-medium">{analysis.score}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        analysis.sentiment === 'positive' ? 'bg-success' :
                        analysis.sentiment === 'negative' ? 'bg-destructive' : 'bg-muted-foreground'
                      }`}
                      style={{ width: `${analysis.score}%` }}
                    />
                  </div>
                </div>

                {/* Suggested Responses */}
                <div className="bg-background/50 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">
                      Suggested Responses
                    </span>
                    <div className="flex gap-1">
                      {analysis.suggestedResponses.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedResponse({ ...selectedResponse, [comment.id]: index })}
                          className={`w-2 h-2 rounded-full transition-all ${
                            currentResponseIndex === index ? 'bg-primary' : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-sm bg-background border rounded-md p-3">
                    {analysis.suggestedResponses[currentResponseIndex]}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleCopyResponse(
                        analysis.suggestedResponses[currentResponseIndex],
                        comment.id
                      )}
                    >
                      <Copy className="h-3 w-3 mr-2" />
                      Copy
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => handleSendResponse(
                        analysis.suggestedResponses[currentResponseIndex],
                        comment
                      )}
                    >
                      <Send className="h-3 w-3 mr-2" />
                      Send Response
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
