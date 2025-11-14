"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver();

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals and small teams",
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        "Up to 3 social accounts",
        "Schedule 30 posts per month",
        "Basic analytics",
        "Email support",
        "Content calendar",
      ],
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses",
      monthlyPrice: 79,
      yearlyPrice: 790,
      features: [
        "Up to 10 social accounts",
        "Unlimited post scheduling",
        "Advanced analytics & reporting",
        "Priority support",
        "Team collaboration tools",
        "AI-powered insights",
        "Custom branded reports",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large organizations",
      monthlyPrice: 199,
      yearlyPrice: 1990,
      features: [
        "Unlimited social accounts",
        "Unlimited everything",
        "Premium analytics & insights",
        "24/7 dedicated support",
        "Advanced team management",
        "Custom integrations",
        "API access",
        "White-label solutions",
      ],
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-700 ${
            isIntersecting
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Scale your social media presence with flexible pricing that grows
            with your business
          </p>

          <div className="inline-flex items-center gap-3 bg-accent p-1 rounded-full">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full transition-colors ${
                !isYearly
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full transition-colors ${
                isYearly
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly <span className="text-primary ml-1">(Save 17%)</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const { ref: cardRef, isIntersecting: cardVisible } =
              useIntersectionObserver();

            return (
              <div
                key={plan.name}
                ref={cardRef}
                style={{ transitionDelay: `${index * 150}ms` }}
                className={`relative bg-card border-2 rounded-2xl p-8 transition-all duration-700 ${
                  cardVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                } ${
                  plan.popular
                    ? "border-primary shadow-lg scale-105"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      ${price}
                    </span>
                    <span className="text-muted-foreground">
                      /{isYearly ? "year" : "month"}
                    </span>
                  </div>
                </div>

                <Button
                  className={`w-full mb-6 ${
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-foreground text-background hover:bg-foreground/90"
                  }`}
                >
                  Get Started
                </Button>

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-foreground text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
