import { Button } from "@/components/ui/button";

const ROISection = () => {
  const stats = [
    {
      number: "2,272",
      label: "impressions",
      description: "Your content inside high innovative visibility and expanding your reactions.",
    },
    {
      number: "15.75%",
      label: "content",
      description: "Plan to increase of 70.75 to content around effortlessly create.",
    },
    {
      number: "18.25%",
      label: "savings",
      description: "Saved to 25% more by opting for our yearly plan, maximizing.",
    },
    {
      number: "96%",
      label: "new followers",
      description: "Why easy tremendous 10k-25k growth in page followers over the past.",
    },
    {
      number: "25+",
      label: "clients",
      description: "All schedule manage would make life over 25+ clients with never-failed.",
    },
    {
      number: "Weekly",
      label: "Scheduled",
      description: "Over 250+ posts can scheduled each week across various platforms.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            What is the return on investment of implementing plan social media strategy for businesses?
          </h2>
          <p className="text-muted-foreground mb-8">
            SociBoost: businesses post consistently whether working ideyas: See graphics to integrate scheduled
          </p>
          <Button className="bg-foreground text-background hover:bg-foreground/90 px-8 py-6">
            Get Started
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl font-bold text-foreground mb-2">{stat.number}</div>
              <div className="text-sm font-semibold text-foreground mb-3">{stat.label}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ROISection;
