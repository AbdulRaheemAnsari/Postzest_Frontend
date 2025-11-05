import { Check } from "lucide-react";

interface OnboardingProgressProps {
  currentStep: number; // 1-based index
  totalSteps: number;
}

export default function OnboardingProgress({
  currentStep,
  totalSteps,
}: OnboardingProgressProps) {
  return (
    <div className="flex items-center justify-center w-fit">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div key={index} className="flex items-center">
            {/* Step Circle */}
            <div
              className={`flex items-center justify-center w-6 h-6 rounded-full border
                ${
                  isActive
                    ? "bg-primary border-primary"
                    : isCompleted
                    ? "bg-primary"
                    : "border-muted-foreground/40 bg-background"
                }`}
            >
              {isCompleted ? (
                <Check className="w-4 h-4 text-background" />
              ) : isActive ? (
                <div className="w-3 h-3 bg-background rounded-full" />
              ) : null}
            </div>

            {/* Dashed Line (except last step) */}
            {stepNumber !== totalSteps && (
              <div
                className={`w-24 border-t-2 border-dashed ${
                  isCompleted ? "border-primary" : "border-muted-foreground/40"
                } mx-2`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
