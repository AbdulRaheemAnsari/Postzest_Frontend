import dashboardEngagement from "@/assets/images/dashboard-engagement.png";
import dashboardSentiment from "@/assets/images/dashboard-sentiment.png";
import dashboardProfile from "@/assets/images/dashboard-profile.png";
import Image from "next/image";
import { Badge } from "../ui/badge";

const UseCaseSection = () => {
  const useCases = [
    {
      tag: "Schedule & Publish",
      title: "Transform Your Bio Links Into a Traffic Driving",
      description:
        "Effortlessly turn followers into customers. Use your Instagram and TikTok bios to convert traffic to your website, online shop, or blog.",
      image: dashboardEngagement,
      bgColor: "bg-[#D5F3F0]",
      tabColor: "bg-[#E9FAF8]",
    },
    {
      tag: "Link with Product",
      title: "Unlock Powerful Insights That Drive Real Results",
      description:
        "Dive deep into your social media performance with SociBoost Analytics. Access essential insights to enhance the success of content creation succeeding.",
      image: dashboardSentiment,
      bgColor: "bg-[#FCEBC7]",
      tabColor: "bg-[#FEF6E7]",
    },
    {
      tag: "Later Analytics",
      title: "Plan your content once and watch it work for you",
      description:
        "SociBoost helps you keep your social media content fresh with well-organized. Effortlessly create, APRs, and schedule posts for the week when you need them.",
      image: dashboardProfile,
      bgColor: "bg-[#D1C3FB]",
      tabColor: "bg-[#DED3FF]",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-muted-foreground text-sm mb-4">Note: option</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground max-w-2xl mx-auto">
            Use SociBoost when you're online. Disconnect when you're not.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Effortlessly control of your social media engagement with real
            questions. Engage with your audience effortlessly.
          </p>
        </div>

        <div className="space-y-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className={` rounded-3xl border border-foreground/10 p-2 items-center`}
            >
              <div
                className={`${useCase.bgColor} rounded-2xl p-8 lg:p-12 grid lg:grid-cols-2 gap-8 items-center w-full`}
              >
                {index % 2 === 0 ? (
                  <>
                    <div className="space-y-4">
                      <Badge
                        className={`text-sm text-foreground font-medium ${useCase.tabColor}`}
                      >
                        {useCase.tag}
                      </Badge>
                      <h3 className="text-3xl font-bold text-foreground">
                        {useCase.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {useCase.description}
                      </p>
                    </div>
                    <div className="bg-background rounded-2xl p-6">
                      <Image
                        src={useCase.image}
                        alt={useCase.title}
                        className="rounded-xl w-full"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-background rounded-2xl p-6 lg:order-1">
                      <Image
                        src={useCase.image}
                        alt={useCase.title}
                        className="rounded-xl w-full"
                      />
                    </div>
                    <div className="space-y-4 lg:order-2">
                      <Badge
                        className={`text-sm text-foreground font-medium ${useCase.tabColor}`}
                      >
                        {useCase.tag}
                      </Badge>
                      <h3 className="text-3xl font-bold text-foreground">
                        {useCase.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {useCase.description}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCaseSection;
