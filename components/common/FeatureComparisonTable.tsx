import { Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FeatureComparisonTable = () => {
  const features = [
    {
      name: "Multiple accounts per platform",
      tooltip:
        "Connect multiple Instagram, Facebook, Twitter, or LinkedIn accounts under one plan",
      starter: true,
      booster: true,
      ultimate: true,
    },
    {
      name: "Bulk Post Scheduling",
      tooltip:
        "Upload and schedule multiple posts at once using CSV or bulk import",
      starter: true,
      booster: true,
      ultimate: true,
    },
    {
      name: "Unlimited Posts",
      tooltip: "No limits on the number of posts you can schedule or publish",
      starter: true,
      booster: true,
      ultimate: true,
    },
    {
      name: "Carousel Posts",
      tooltip:
        "Create and schedule multi-image carousel posts for Instagram and LinkedIn",
      starter: true,
      booster: true,
      ultimate: true,
    },
    {
      name: "Basic Analytics",
      tooltip: "View essential metrics like likes, comments, shares, and reach",
      starter: true,
      booster: false,
      ultimate: false,
    },
    {
      name: "Advanced Analytics",
      tooltip:
        "Get detailed insights with engagement rates, best posting times, audience demographics, and custom reports",
      starter: false,
      booster: true,
      ultimate: true,
    },
    {
      name: "AI Assistant",
      tooltip:
        "AI-powered caption writing, content suggestions, and hashtag recommendations",
      starter: false,
      booster: true,
      ultimate: true,
    },
    {
      name: "Hashtag Manager",
      tooltip:
        "Save, organize, and reuse hashtag groups for different content types",
      starter: false,
      booster: true,
      ultimate: true,
    },
    {
      name: "First Comment Scheduling",
      tooltip:
        "Automatically post the first comment with hashtags or additional info after your post goes live",
      starter: false,
      booster: true,
      ultimate: true,
    },
    {
      name: "Human Support",
      tooltip: "Get help from our support team via email or live chat",
      starter: true,
      booster: true,
      ultimate: true,
    },
    {
      name: "Workspaces",
      tooltip:
        "Separate workspaces to manage different brands, clients, or teams",
      starter: "5",
      booster: "10",
      ultimate: "50",
    },
    {
      name: "Social Accounts",
      tooltip: "Total number of social media accounts you can connect",
      starter: "5",
      booster: "15",
      ultimate: "Unlimited",
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-background shadow-sm">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[300px] font-bold text-foreground bg-background">
              Features
            </TableHead>
            <TableHead className="text-center font-bold text-foreground bg-background">
              Starter
            </TableHead>
            <TableHead className="text-center font-bold text-foreground bg-featured-card/20">
              Booster
            </TableHead>
            <TableHead className="text-center font-bold text-foreground bg-background">
              Ultimate
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-foreground py-6">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help border-b border-dotted border-muted-foreground/50">
                        {feature.name}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <p>{feature.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell className="text-center">
                {typeof feature.starter === "boolean" ? (
                  feature.starter ? (
                    <Check className="h-5 w-5 text-primary mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-muted-foreground mx-auto" />
                  )
                ) : (
                  <span className="text-foreground font-medium">
                    {feature.starter}
                  </span>
                )}
              </TableCell>
              <TableCell className="text-center bg-featured-card/10">
                {typeof feature.booster === "boolean" ? (
                  feature.booster ? (
                    <Check className="h-5 w-5 text-primary mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-muted-foreground mx-auto" />
                  )
                ) : (
                  <span className="text-foreground font-medium">
                    {feature.booster}
                  </span>
                )}
              </TableCell>
              <TableCell className="text-center">
                {typeof feature.ultimate === "boolean" ? (
                  feature.ultimate ? (
                    <Check className="h-5 w-5 text-primary mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-muted-foreground mx-auto" />
                  )
                ) : (
                  <span className="text-foreground font-medium">
                    {feature.ultimate}
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FeatureComparisonTable;
