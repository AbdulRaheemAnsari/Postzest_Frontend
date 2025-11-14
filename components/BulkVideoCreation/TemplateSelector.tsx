import { cn } from "@/lib/utils";
import {
  Sparkles,
  UtensilsCrossed,
  Dumbbell,
  Briefcase,
  Sparkle,
  Laptop,
  Plane,
  DollarSign,
  GraduationCap,
} from "lucide-react";

const templates = [
  { id: "none", name: "None", icon: Sparkles },
  { id: "food", name: "Food", icon: UtensilsCrossed },
  { id: "fitness", name: "Fitness", icon: Dumbbell },
  { id: "productivity", name: "Productivity", icon: Briefcase },
  { id: "beauty", name: "Beauty", icon: Sparkle },
  { id: "tech", name: "Tech", icon: Laptop },
  { id: "travel", name: "Travel", icon: Plane },
  { id: "finance", name: "Finance", icon: DollarSign },
  { id: "study", name: "Study", icon: GraduationCap },
];

interface TemplateSelectorProps {
  selected: string;
  onSelect: (id: string) => void;
}

export const TemplateSelector = ({
  selected,
  onSelect,
}: TemplateSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Quick Start Templates</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Choose from proven templates or start from scratch
      </p>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <button
              key={template.id}
              onClick={() => onSelect(template.id)}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all hover:scale-105",
                selected === template.id
                  ? "border-primary bg-secondary shadow-md"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <Icon
                className={cn(
                  "w-6 h-6",
                  selected === template.id
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium",
                  selected === template.id ? "text-primary" : "text-foreground"
                )}
              >
                {template.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
