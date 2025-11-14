import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import dashboardRecommended from "@/assets/images/dashboard-recommended.png";
import Image from "next/image";

const ImpactSection = () => {
  return (
    <section className="py-20 bg-accent">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Amplify social media impact and accelerate business growth with
              innovative strategies and insights.
            </h2>
            <p className="text-muted-foreground text-lg">
              Our cutting-edge, all-in-one social media management platform is
              meticulously crafted to empower.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-foreground">
                  Salesforce partnership network
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-foreground">
                  Driving business impact should be easier
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-foreground">
                  Capture insights with ease
                </span>
              </div>
            </div>
            <Button className="bg-foreground text-background hover:bg-foreground/90 px-8 py-6">
              Find out more
            </Button>
          </div>
          <div className="relative">
            <div className="bg-background rounded-3xl p-8 shadow-lg">
              <div className="mb-4">
                <span className="text-sm text-primary font-medium">
                  Recommanded times
                </span>
              </div>
              <Image
                src={dashboardRecommended}
                alt="Recommended Times Chart"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
