"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Palette,
  Briefcase,
  Heart,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Plus,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import bgImage from "../../../assets/images/onboardingbg.png";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";

interface OnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  icon: typeof Palette;
}

interface SocialPlatform {
  id: string;
  name: string;
  color: string;
  bgColor: string;
}

const goals: Goal[] = [
  {
    id: "creator",
    title: "Creator",
    description: "Starting your blog and explore ways to monetize and grow",
    icon: Palette,
  },
  {
    id: "business",
    title: "Business",
    description: "Grow my business and reach more customers",
    icon: Briefcase,
  },
  {
    id: "personal",
    title: "Personal",
    description: "Share my story, life, my friends and family",
    icon: Heart,
  },
];

const socialPlatforms: SocialPlatform[] = [
  {
    id: "facebook",
    name: "Facebook",
    color: "#1877F2",
    bgColor: "bg-[#1877F2]/10",
  },
  {
    id: "instagram",
    name: "Instagram",
    color: "#E4405F",
    bgColor: "bg-[#E4405F]/10",
  },
  { id: "tiktok", name: "Tik Tok", color: "#000000", bgColor: "bg-black/10" },
  {
    id: "youtube",
    name: "Youtube",
    color: "#FF0000",
    bgColor: "bg-[#FF0000]/10",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    color: "#0A66C2",
    bgColor: "bg-[#0A66C2]/10",
  },
  { id: "threads", name: "Threads", color: "#000000", bgColor: "bg-black/10" },
  {
    id: "pinterest",
    name: "Pinterest",
    color: "#E60023",
    bgColor: "bg-[#E60023]/10",
  },
  {
    id: "bluesky",
    name: "Bluesky",
    color: "#1185FE",
    bgColor: "bg-[#1185FE]/10",
  },
];

const mainGoals = [
  "Grow my audience",
  "Stay consistent",
  "Boost reach & engagement",
  "Sell digital products",
  "Manage multiple brands easily",
  "Schedule and automate posts",
  "Spend less time posting, more time creating",
];

const OnboardingModal = ({ onOpenChange }: OnboardingModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedMainGoals, setSelectedMainGoals] = useState<string[]>([]);
  const totalSteps = 4;
  const router = useRouter();

  const handleContinue = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onOpenChange(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  };

  const toggleMainGoal = (goal: string) => {
    setSelectedMainGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  return (
    <ProtectedRoute>
      <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        <Image
          src={bgImage}
          alt="background"
          fill
          className="object-fill object-center"
          priority
        />

        <Dialog open={true} onOpenChange={onOpenChange}>
          <DialogContent className="sm:max-w-[640px] p-0 gap-0 overflow-hidden max-h-[70vh] [&>button.absolute]:hidden">
            <div className="flex flex-col">
              <div className="flex items-center justify-between px-4 sm:px-6 pt-6 pb-4 gap-2">
                {[...Array(totalSteps)].map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300 flex-1",
                      index < currentStep ? "bg-primary" : "bg-muted"
                    )}
                  />
                ))}
              </div>

              {/* Step 1: Goal Selection */}
              {currentStep === 1 && (
                <>
                  <div className="px-4 sm:px-6 pb-6">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                      Which best describes your main goal for using PostZest?
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      This will help us tailor your experience to your needs.
                    </p>
                  </div>

                  <div className="px-4 sm:px-6 pb-6 space-y-3 ">
                    {goals.map((goal) => {
                      const Icon = goal.icon;
                      return (
                        <button
                          key={goal.id}
                          onClick={() => setSelectedGoal(goal.id)}
                          className={cn(
                            "w-full flex cursor-pointer items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border-2 transition-all duration-200",
                            "hover:shadow-[var(--shadow-card-hover)] hover:scale-[1.02]",
                            selectedGoal === goal.id
                              ? "border-primary bg-primary/5 shadow-[var(--shadow-card-hover)]"
                              : "border-border bg-card shadow-[var(--shadow-card)]"
                          )}
                        >
                          <div
                            className={cn(
                              "flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-colors",
                              selectedGoal === goal.id
                                ? "bg-primary text-primary-foreground"
                                : "bg-accent text-accent-foreground"
                            )}
                          >
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <div className="flex-1 text-left">
                            <h3 className="font-semibold text-sm sm:text-base mb-1">
                              {goal.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                              {goal.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="px-4 sm:px-6 pb-6">
                    <Button
                      onClick={handleContinue}
                      disabled={!selectedGoal}
                      className="w-full cursor-pointer py-6 text-sm sm:text-base font-semibold"
                    >
                      Continue
                    </Button>
                  </div>
                </>
              )}

              {/* Step 2: Social Profiles */}
              {currentStep === 2 && (
                <>
                  <div className="px-4 sm:px-6 pb-4">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                      Connect your Social Profiles
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Select the social media platforms where you post your
                      content.
                    </p>
                  </div>

                  <div className="px-4 sm:px-6 flex-1 overflow-y-auto max-h-[40vh] pb-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        {socialPlatforms.map((platform) => (
                          <button
                            key={platform.id}
                            onClick={() => togglePlatform(platform.id)}
                            className={cn(
                              "w-full flex items-center cursor-pointer justify-between p-3 sm:p-4 rounded-xl border transition-all duration-200",
                              "hover:shadow-[var(--shadow-card-hover)] hover:scale-[1.02]",
                              selectedPlatforms.includes(platform.id)
                                ? "border-primary bg-primary/5 shadow-[var(--shadow-card-hover)]"
                                : "border-border bg-card shadow-[var(--shadow-card)]"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={cn(
                                  "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center",
                                  platform.bgColor
                                )}
                                style={{
                                  backgroundColor: `${platform.color}15`,
                                }}
                              >
                                <div
                                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-full"
                                  style={{ backgroundColor: platform.color }}
                                />
                              </div>
                              <span className="font-medium text-sm sm:text-base text-foreground">
                                {platform.name}
                              </span>
                            </div>
                            <div
                              className={cn(
                                "w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-colors",
                                selectedPlatforms.includes(platform.id)
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              )}
                            >
                              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-4 sm:px-6 pb-6 flex gap-3 pt-2">
                    <Button
                      onClick={handleBack}
                      variant="outline"
                      className="cursor-pointer py-6 text-sm sm:text-base font-semibold"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleContinue}
                      className="flex-1 cursor-pointer py-6 text-sm sm:text-base font-semibold"
                    >
                      Skip & Continue
                    </Button>
                  </div>
                </>
              )}

              {/* Step 3: Main Goals */}
              {currentStep === 3 && (
                <>
                  <div className="px-4 sm:px-6 pb-6">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                      What's your main goal with PostZest?
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      We'll personalize your experience based on what matters
                      most to you.
                    </p>
                  </div>

                  <div className="px-4 sm:px-6 pb-6 overflow-y-auto h-[40vh]">
                    <div className="grid grid-cols-1 gap-6">
                      {/* Goals Selection */}
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {mainGoals.map((goal) => (
                            <button
                              key={goal}
                              onClick={() => toggleMainGoal(goal)}
                              className={cn(
                                "px-4 py-4 rounded-lg cursor-pointer border-2 text-sm font-medium transition-all duration-200",
                                "hover:shadow-md hover:scale-[1.02]",
                                selectedMainGoals.includes(goal)
                                  ? "border-primary bg-primary/5 text-foreground"
                                  : "border-border bg-card text-foreground hover:border-primary/50"
                              )}
                            >
                              {goal}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 sm:px-6 pb-6 flex gap-3">
                    <Button
                      onClick={handleBack}
                      variant="outline"
                      className="py-6 cursor-pointer text-sm sm:text-base font-semibold"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleContinue}
                      className="flex-1 py-6 cursor-pointer text-sm sm:text-base font-semibold"
                    >
                      Continue
                    </Button>
                  </div>
                </>
              )}

              {/* Step 4: Completion */}
              {currentStep === 4 && (
                <>
                  <div className="px-4 sm:px-6 py-12 sm:py-16 flex flex-col items-center text-center">
                    <div className="relative w-full max-w-sm mb-8">
                      <div className="absolute -top-4 left-12 text-primary/60 animate-bounce">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div
                        className="absolute top-8 -right-4 text-yellow-400 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      >
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div
                        className="absolute -bottom-4 left-20 text-primary/40 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      >
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div
                        className="absolute bottom-12 -right-8 text-purple-400 animate-bounce"
                        style={{ animationDelay: "0.6s" }}
                      >
                        <Sparkles className="w-5 h-5" />
                      </div>

                      <div className="relative bg-card border border-border rounded-2xl shadow-lg p-6 mx-auto max-w-xs">
                        <div className="space-y-3">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 p-2 rounded-lg bg-primary/5"
                            >
                              <div className="flex-shrink-0 w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                              </div>
                              <div className="flex-1 h-2 rounded-full bg-primary/20" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="absolute -left-8 bottom-0 w-16 h-24 flex items-end">
                        <div className="w-12 h-12 rounded-full bg-yellow-400 dark:bg-yellow-600" />
                      </div>
                    </div>

                    <h2 className="text-2xl sm:text-4xl font-bold mb-3">
                      You're all set!
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground mb-8 max-w-md font-semibold">
                      Your creator workspace is ready. Let's start scheduling
                      your first post and grow your presence!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                      <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="h-11 sm:h-12 cursor-pointer text-sm sm:text-base font-semibold"
                      >
                        Watch a quick demo
                      </Button>
                      <Button
                        onClick={() => router.push("/dashboard")}
                        className="h-11 sm:h-12 cursor-pointer text-sm sm:text-base font-semibold flex items-center gap-2"
                      >
                        Go to my Dashboard
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
};

export default OnboardingModal;
