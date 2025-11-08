import { Check, Info, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Feature {
  name: string;
  included: boolean;
}

interface PricingCardProps {
  name: string;
  description: string;
  price: number;
  period: string;
  accounts: string;
  features: Feature[];
  featured?: boolean;
  buttonText?: string;
}

const PricingCard = ({
  name,
  description,
  price,
  period,
  accounts,
  features,
  featured = false,
  buttonText = "Start 14-day free trial",
}: PricingCardProps) => {
  return (
    <Card
      className={`relative p-6 flex flex-col h-full transition-all duration-300 ${
        featured
          ? "bg-featured-card border-featured-border border-2 shadow-xl scale-105 border-primary"
          : "bg-card border-border"
      }`}
    >
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
            Recommended
          </span>
        </div>
      )}

      <div className="flex-1">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-foreground mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="mb-6">
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-6xl font-semibold text-foreground">
              ${price}
            </span>
            <span className="text-muted-foreground">/{period}</span>
          </div>
          <p className="text-sm text-foreground font-medium">{accounts}</p>
        </div>

        <div className="mb-6">
        

          <Button
            className={`w-full group bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer py-6 font-semibold`}
            size="lg"
          >
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-2">
            $0.00 due today, cancel anytime
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4">
            What's included
          </h4>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground flex-1">
                  {feature.name}
                </span>
                <Info className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default PricingCard;
