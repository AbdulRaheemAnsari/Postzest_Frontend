import FAQSection from "@/components/HomeComponents/FAQSection";
import SocialProof from "@/components/HomeComponents/SocialProof";
import PricingSection from "@/components/PricingPageComponents/PricingSection";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="pt-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your social media management needs. All plans include a 14-day free trial.
          </p>
        </div>
        <PricingSection />
        <FAQSection />
        <SocialProof />
      </div>
    </div>
  );
};

export default Pricing;
