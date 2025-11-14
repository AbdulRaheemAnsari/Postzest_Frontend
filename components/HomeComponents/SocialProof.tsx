import { Button } from "@/components/ui/button";

const SocialProof = () => {
  return (
    <section className="py-20 bg-accent">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 max-w-2xl mx-auto">
          140,000+ people like you use our to build their brand on social media every month
        </h2>
        <p className="text-muted-foreground mb-8">Find your comfort. Learn plans today</p>
        <Button className="bg-foreground text-background hover:bg-foreground/90 px-8 py-6">
          Get started now
        </Button>
      </div>
    </section>
  );
};

export default SocialProof;
