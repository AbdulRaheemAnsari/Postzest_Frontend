"use client"
import FAQSection from "@/components/HomeComponents/FAQSection";
import FeaturesSection from "@/components/HomeComponents/FeaturesSection";
import Hero from "@/components/HomeComponents/Hero";
import ImpactSection from "@/components/HomeComponents/ImpactSection";
import PricingSection from "@/components/HomeComponents/PricingSection";
import ROISection from "@/components/HomeComponents/ROISection";
import SocialConnectSection from "@/components/HomeComponents/SocialConnectSection";
import SocialProof from "@/components/HomeComponents/SocialProof";
import TestimonialsSection from "@/components/HomeComponents/TestimonialsSection";
import UseCaseSection from "@/components/HomeComponents/UseCaseSection";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const Index = () => {
  const { ref: socialConnectRef, isIntersecting: socialConnectVisible } = useIntersectionObserver();
   const { ref: featuresRef, isIntersecting: featuresVisible } = useIntersectionObserver();
  const { ref: impactRef, isIntersecting: impactVisible } = useIntersectionObserver();
  const { ref: roiRef, isIntersecting: roiVisible } = useIntersectionObserver();
  const { ref: useCaseRef, isIntersecting: useCaseVisible } = useIntersectionObserver();
  const { ref: testimonialsRef, isIntersecting: testimonialsVisible } = useIntersectionObserver();
  const { ref: faqRef, isIntersecting: faqVisible } = useIntersectionObserver();
  const { ref: socialRef, isIntersecting: socialVisible } = useIntersectionObserver();

  return (
   <div className="min-h-screen bg-background">
      <Hero />
       <div
        ref={socialConnectRef}
        className={`transition-all duration-700 ${
          socialConnectVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <SocialConnectSection />
      </div>
      <div
        ref={featuresRef}
        className={`transition-all duration-700 ${
          featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <FeaturesSection />
      </div>
      <div
        ref={impactRef}
        className={`transition-all duration-700 ${
          impactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <ImpactSection />
      </div>
      <div
        ref={roiRef}
        className={`transition-all duration-700 ${
          roiVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <ROISection />
      </div>
      <div
        ref={useCaseRef}
        className={`transition-all duration-700 ${
          useCaseVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <UseCaseSection />
      </div>
      <PricingSection />
      <div
        ref={testimonialsRef}
        className={`transition-all duration-700 ${
          testimonialsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <TestimonialsSection />
      </div>
      <div
        ref={faqRef}
        className={`transition-all duration-700 ${
          faqVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <FAQSection />
      </div>
      <div
        ref={socialRef}
        className={`transition-all duration-700 ${
          socialVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <SocialProof />
      </div>
    </div>
  );
};

export default Index;
