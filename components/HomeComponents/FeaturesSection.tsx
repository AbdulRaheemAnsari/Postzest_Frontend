import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import dashboardMentions from "@/assets/images/dashboard-mentions.png";
import Image from "next/image";

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="bg-accent rounded-3xl p-8">
              <Image
                src={dashboardMentions}
                alt="Mentions Client Dashboard"
                className="rounded-xl"
              />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Our features continuous evolve with industry trends and customer
              most feedback
            </h2>
            <p className="text-muted-foreground text-lg">
              Our dedication to innovation allows us to provide a solution that
              grows with your needs, helping you.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-foreground">
                  Ensuring that you have access
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-foreground">
                  Instant insights into activities
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-foreground">
                  Customer-first development
                </span>
              </div>
            </div>
            <Button className="bg-foreground text-background hover:bg-foreground/90 px-8 py-6">
              Find out more
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
