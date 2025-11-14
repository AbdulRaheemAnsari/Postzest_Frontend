import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  name: string;
  icon: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center gap-2">
            <div
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center text-lg font-semibold transition-all",
                currentStep > step.id
                  ? "bg-success text-success-foreground"
                  : currentStep === step.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {currentStep > step.id ? (
                <Check className="w-6 h-6" />
              ) : (
                step.icon
              )}
            </div>
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                currentStep >= step.id
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {step.name}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "w-16 h-0.5 mx-4 transition-colors",
                currentStep > step.id ? "bg-success" : "bg-border"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};
