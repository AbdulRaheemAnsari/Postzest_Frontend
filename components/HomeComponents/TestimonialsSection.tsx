import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    content: "SociBoost transformed our social media strategy. We've seen a 300% increase in engagement and our team saves 15 hours per week on scheduling.",
    rating: 5,
    avatar: "SJ"
  },
  {
    name: "Michael Chen",
    role: "Social Media Manager",
    company: "GrowthLab",
    content: "The analytics dashboard is incredibly intuitive. Finally, a tool that helps us understand our audience and optimize our content strategy in real-time.",
    rating: 5,
    avatar: "MC"
  },
  {
    name: "Emily Rodriguez",
    role: "CEO",
    company: "BrandFlow",
    content: "We switched from three different tools to just SociBoost. The ROI has been phenomenal - both in cost savings and improved performance.",
    rating: 5,
    avatar: "ER"
  },
  {
    name: "David Park",
    role: "Content Creator",
    company: "MediaHouse",
    content: "The scheduling features and content calendar are game-changers. I can plan months ahead and still maintain authenticity across all platforms.",
    rating: 5,
    avatar: "DP"
  },
  {
    name: "Lisa Thompson",
    role: "Brand Manager",
    company: "RetailPro",
    content: "Customer engagement has never been easier. The sentiment analysis helps us respond quickly and maintain our brand reputation effectively.",
    rating: 5,
    avatar: "LT"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Trusted by Marketing Teams Worldwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our customers have to say about transforming their social media presence
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-2">
                  <Card className="bg-background border-border hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex gap-1 mb-2">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        "{testimonial.content}"
                      </p>
                      
                      <div className="flex items-center gap-3 pt-4 border-t border-border">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-semibold">
                            {testimonial.avatar}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role} at {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
