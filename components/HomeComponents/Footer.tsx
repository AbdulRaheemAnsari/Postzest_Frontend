import logo from "@/assets/images/postzestlogo.png";
import Image from "next/image";

const Footer = () => {
  const footerLinks = {
    "About us": [
      "Product",
      "Features",
      "Customer Stories",
      "Our Mission",
      "Our Values",
    ],
    Platform: [
      "Engagement",
      "Proven analytics",
      "Employee advocacy",
      "Analytics",
    ],
    Statistics: ["Customer Care", "Learn Culture", "Professional Data"],
    Resources: [
      "Special Blog",
      "Help Certify",
      "Community",
      "partner directory",
    ],
    Integrations: [
      "Facebook scheduler",
      "Instagram scheduler",
      "Twitter scheduler",
      "LinkedIn scheduler",
      "Tik Tok scheduler",
      "YouTube scheduler",
      "Pinterest scheduler",
      "Threads scheduler",
      "Bluesky scheduler",
    ],
    Compare: ["Option Agencies", "SMV Consideration", "Reason Swittches"],
  };

  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12 pb-8 border-b border-border">
          <div className="flex items-center gap-2">
            <Image
              src={logo}
              draggable={false}
              alt="postzest-logo"
              className="w-40"
            />
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm text-muted-foreground">Search...</span>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center" />
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-foreground mb-4">{title}</h3>
              <ul className="space-y-1.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          © 2025 All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
