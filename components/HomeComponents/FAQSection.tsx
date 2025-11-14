import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What platforms does SociBoost support?",
    answer:
      "SociBoost supports all major social media platforms including Facebook, Instagram, Twitter, LinkedIn, TikTok, and YouTube. You can manage all your accounts from a single unified dashboard.",
  },
  {
    question: "How does the scheduling feature work?",
    answer:
      "Our intelligent scheduling system allows you to plan and queue posts weeks or months in advance. You can set specific times for each platform, use our AI-powered optimal posting time recommendations, and schedule recurring content with ease.",
  },
  {
    question: "Can I try SociBoost before committing to a paid plan?",
    answer:
      "Yes! We offer a 14-day free trial with full access to all features. No credit card required. You can explore the platform and see how it transforms your social media management before making any commitment.",
  },
  {
    question: "What kind of analytics does SociBoost provide?",
    answer:
      "SociBoost offers comprehensive analytics including engagement rates, audience growth, post performance, sentiment analysis, reach metrics, and demographic insights. All data is presented in easy-to-understand dashboards with exportable reports.",
  },
  {
    question: "Is there a limit on team members?",
    answer:
      "The number of team members depends on your plan. The Starter plan includes 1 user, Professional includes up to 5 users, and Enterprise offers unlimited team members with advanced permission controls and collaboration features.",
  },
  {
    question: "How secure is my data?",
    answer:
      "We take security seriously. All data is encrypted in transit and at rest using industry-standard protocols. We're SOC 2 compliant and never share your data with third parties. Your social media credentials are stored using OAuth, so we never have access to your passwords.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Absolutely! You can cancel your subscription at any time with no penalties or hidden fees. If you cancel, you'll retain access to your plan features until the end of your billing period.",
  },
  {
    question: "Do you offer customer support?",
    answer:
      "Yes! All plans include email support with response times within 24 hours. Professional and Enterprise plans also include priority support with faster response times and dedicated account managers for Enterprise customers.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about SociBoost
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-border rounded-lg px-6 bg-card hover:shadow-md transition-shadow duration-300"
            >
              <AccordionTrigger className="text-left hover:no-underline py-5">
                <span className="text-lg font-semibold text-foreground pr-4">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <a
            href="#contact"
            className="text-primary hover:underline font-medium"
          >
            Contact our support team →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
