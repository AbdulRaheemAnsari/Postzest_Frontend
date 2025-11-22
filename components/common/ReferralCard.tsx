"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Copy, Share2, Gift, Users, TrendingUp, Sparkles } from "lucide-react";
import { toast } from "sonner";

const ReferralCard = () => {
  const [referralLink] = useState(
    "https://postzest.com/join/19c432dda4fc5381c4793a407ce7c..."
  );

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Copied!", {
      description: "Your referral link is ready to share.",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Join me!",
          text: "Check out this amazing platform!",
          url: referralLink,
        })
        .catch(() => {});
    } else {
      copyToClipboard();
    }
  };

  const steps = [
    {
      icon: Gift,
      title: "Get Your Link",
      description:
        "Find your unique referral link below and get ready to share.",
    },
    {
      icon: Share2,
      title: "Share With Friends",
      description:
        "Spread the word via social media, email, or direct message.",
    },
    {
      icon: Users,
      title: "Friends Sign Up",
      description: "Your friends create their free account using your link.",
    },
    {
      icon: TrendingUp,
      title: "Grow Together",
      description:
        "You both get access to amazing features and grow your audience.",
    },
  ];

  return (
    <div className="container max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="">
        {/* Hero Section */}
        <div className="mb-8 lg:mb-16 space-y-4 sm:space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Share & Earn Rewards</span>
          </div>

          <h1 className="text-3xl font-semibold text-foreground">
            Refer Your Friends
          </h1>

          <p className="text-muted-foreground text-md">
            Love what we offer? Share it with your friends and help them
            discover an amazing platform. Everyone wins!
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Left Column - Referral Link Card */}
          <Card className="p-6 sm:p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-shadow duration-300 border-border/50">
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-foreground">
                  Your Referral Link
                </h2>
                <p className="text-muted-foreground">
                  Share this unique link with your friends and start earning
                  rewards today!
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Input
                    value={referralLink}
                    readOnly
                    className="pr-12 h-12 bg-muted/50 border-border text-sm"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={copyToClipboard}
                    className="absolute right-1 cursor-pointer top-1 h-10 w-10 hover:bg-primary/10"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="flex-1 py-6 cursor-pointer border-primary/20 hover:bg-primary/5 hover:border-primary/40"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                  <Button
                    onClick={handleShare}
                    className="flex-1 bg-primary hover:bg-primary/80 text-background hover:text-background font-semibold cursor-pointer py-6 rounded-sm"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Now
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t border-border/50">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Referrals this month
                  </span>
                  <span className="font-semibold text-primary text-lg">0</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Right Column - Benefits */}
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-foreground">
                Why Share?
              </h2>
              <p className="text-muted-foreground">
                When you refer friends, everyone benefits from our growing
                community.
              </p>
            </div>

            <div className="grid gap-4">
              <Card className="p-5 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 hover:border-primary/40 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Gift className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold text-foreground">
                      Unlock Rewards
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Earn exclusive perks and benefits for every successful
                      referral.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-5 bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20 hover:border-accent/40 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold text-foreground">
                      Build Community
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Connect with friends and grow together in a supportive
                      network.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-5 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 hover:border-primary/40 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold text-foreground">
                      Free Forever
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your friends get full access to our platform, completely
                      free.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="space-y-8">
          <div className="text-center space-y-1">
            <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg">
              Simple steps to start sharing and earning
            </p>
          </div>

          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:-translate-y-1 border-border/50"
              >
                <div className="space-y-4">
                  <div className="relative inline-flex">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                    <div className="relative p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-lg">
                      {index + 1}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralCard;
