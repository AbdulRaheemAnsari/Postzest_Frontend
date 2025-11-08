"use client";
import { useState } from "react";
import PricingCard from "@/components/common/PricingCard";
import PricingToggle from "@/components/common/PricingToggle";
import FeatureComparisonTable from "@/components/common/FeatureComparisonTable";

const Subscription = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const starterFeatures = [
    { name: "Multiple accounts per platform", included: true },
    { name: "Bulk Post Scheduling", included: true },
    { name: "Unlimited Posts", included: true },
    { name: "Carousel Posts", included: true },
    { name: "Basic Analytics", included: true },
    { name: "5 Workspace", included: true },
    { name: "Human Support", included: true },
  ];

  const boosterFeatures = [
    { name: "Multiple accounts per platform", included: true },
    { name: "Bulk Post Scheduling", included: true },
    { name: "Unlimited Posts", included: true },
    { name: "Carousel Posts", included: true },
    { name: "Advanced Analytics", included: true },
    { name: "10 Workspace", included: true },
    { name: "AI Assistant", included: true },
    { name: "Hashtag Manager", included: true },
    { name: "First Comment Scheduling", included: true },
    { name: "Human Support", included: true },
  ];

  const ultimateFeatures = [
    { name: "Multiple accounts per platform", included: true },
    { name: "Bulk Post Scheduling", included: true },
    { name: "Unlimited Posts", included: true },
    { name: "Carousel Posts", included: true },
    { name: "Advanced Analytics", included: true },
    { name: "50 Workspace", included: true },
    { name: "AI Assistant", included: true },
    { name: "Hashtag Manager", included: true },
    { name: "First Comment Scheduling", included: true },
    { name: "Human Support", included: true },
  ];

  const getPrice = (basePrice: number) => {
    return isAnnual ? Math.floor(basePrice * 0.8) : basePrice;
  };

  return (
    <main className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Subscription
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your social media scheduling needs
          </p>
        </div>

        <PricingToggle onToggle={setIsAnnual} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          <PricingCard
            name="Starter"
            description="For individuals and small creators getting started with smart scheduling."
            price={getPrice(4)}
            period="month"
            accounts="Connect up to 5 social accounts"
            features={starterFeatures}
          />

          <PricingCard
            name="Booster"
            description="For growing creators and small teams who want more power and flexibility."
            price={getPrice(14)}
            period="month"
            accounts="Connect up to 15 social accounts"
            features={boosterFeatures}
            featured
          />

          <PricingCard
            name="Ultimate"
            description="For agencies and businesses managing multiple brands at scale."
            price={getPrice(24)}
            period="month"
            accounts="Connect unlimited social accounts"
            features={ultimateFeatures}
          />
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>

         <div className="mt-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Compare Plans
            </h2>
            <p className="text-muted-foreground">
              See all features side by side
            </p>
          </div>
          <FeatureComparisonTable />
        </div>
      </div>
    </main>
  );
};

export default Subscription;
