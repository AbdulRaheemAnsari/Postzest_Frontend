import logo from "@/assets/images/postzestlogo.png";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const footerLinks: Record<string, { label: string, href: string }[]> = {
    "About us": [
      { label: "Product", href: "#" },
      { label: "Features", href: "#" },
      { label: "Customer Stories", href: "#" },
      { label: "Our Mission", href: "#" },
      { label: "Our Values", href: "#" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
    Platform: [
      { label: "Engagement", href: "#" },
      { label: "Proven analytics", href: "#" },
      { label: "Employee advocacy", href: "#" },
      { label: "Analytics", href: "#" },
    ],
    Statistics: [
      { label: "Customer Care", href: "#" },
      { label: "Learn Culture", href: "#" },
      { label: "Professional Data", href: "#" },
    ],
    Resources: [
      { label: "Special Blog", href: "#" },
      { label: "Help Certify", href: "#" },
      { label: "Community", href: "#" },
      { label: "partner directory", href: "#" },
    ],
    Integrations: [
      { label: "Facebook scheduler", href: "#" },
      { label: "Instagram scheduler", href: "#" },
      { label: "Twitter scheduler", href: "#" },
      { label: "LinkedIn scheduler", href: "#" },
      { label: "Tik Tok scheduler", href: "#" },
      { label: "YouTube scheduler", href: "#" },
      { label: "Pinterest scheduler", href: "#" },
      { label: "Threads scheduler", href: "#" },
      { label: "Bluesky scheduler", href: "#" },
    ],
    Compare: [
      { label: "Option Agencies", href: "#" },
      { label: "SMV Consideration", href: "#" },
      { label: "Reason Swittches", href: "#" },
    ],
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
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
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
