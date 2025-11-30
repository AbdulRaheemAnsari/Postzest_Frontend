import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  MessageSquare,
  Share2,
} from "lucide-react";
import { Button } from "../ui/button";
import facebook from "@/assets/images/facebook.png";
import instagram from "@/assets/images/instagram.png";
import tiktok from "@/assets/images/tiktok.png";
import linkedin from "@/assets/images/linkedin.png";
import youtube from "@/assets/images/youtube.png";
import threads from "@/assets/images/threads.png";
import bluesky from "@/assets/images/bluesky.png";
import pinterest from "@/assets/images/pinterest.png";
import mastodon from "@/assets/images/mastodon.png";
import Image from "next/image";

const SocialConnectSection = () => {
  const socialPlatforms = [
    {
      name: "Bluesky",
      Icon: bluesky,
      color: "#0085FF",
      bgColor: "hsl(211, 100%, 50%)",
    },
    // {
    //   name: "Google",
    //   Icon: Share2,
    //   color: "#4285F4",
    //   bgColor: "hsl(217, 89%, 61%)",
    // },
    {
      name: "Instagram",
      Icon: instagram,
      color: "#E4405F",
      bgColor: "hsl(349, 77%, 57%)",
    },
     {
      name: "Facebook",
      Icon: facebook,
      color: "#1877F2",
      bgColor: "hsl(214, 89%, 52%)",
    },
     {
      name: "Threads",
      Icon: threads,
      color: "#000000",
      bgColor: "hsl(0, 0%, 0%)",
    },
    {
      name: "LinkedIn",
      Icon: linkedin,
      color: "#0A66C2",
      bgColor: "hsl(201, 92%, 40%)",
    },
    {
      name: "Mastodon",
      Icon: mastodon,
      color: "#6364FF",
      bgColor: "hsl(240, 100%, 69%)",
    },
    {
      name: "Pinterest",
      Icon: pinterest,
      color: "#E60023",
      bgColor: "hsl(352, 98%, 45%)",
    },
   
    {
      name: "TikTok",
      Icon: tiktok,
      color: "#000000",
      bgColor: "hsl(0, 0%, 0%)",
    },
    // { name: "X", Icon: Twitter, color: "#000000", bgColor: "hsl(0, 0%, 0%)" },
    {
      name: "YouTube",
      Icon: youtube,
      color: "#FF0000",
      bgColor: "hsl(0, 100%, 50%)",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/20 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-xl lg:text-2xl font-semibold text-foreground mb-2">
            Connect your favorite accounts
          </h2>
          <p className="text-md text-muted-foreground max-w-xl mx-auto mb-8">
            Link all your social media profiles in seconds and start managing
            everything from one powerful dashboard
          </p>
        </div>

        {/* Social Icons Grid */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-12 max-w-5xl mx-auto">
          {socialPlatforms.map(({ name, Icon, bgColor }) => (
            <div key={name} className="group relative cursor-pointer">
              <div
                className="w-20 h-20 p-1 rounded-2xl border-2 border-foreground/10 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:shadow-md"
                style={{
                  backgroundColor: "hsl(var(--background))",
                }}
              >
                <div className="bg-accent rounded-2xl p-1">
                  <Image
                    src={Icon}
                    alt="Social Icon"
                    draggable={false}
                    style={{ color: bgColor }}
                    className="transition-transform duration-300 w-18  group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Tooltip */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                <span className="text-xs font-medium text-muted-foreground">
                  {name}
                </span>
              </div>

              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"
                // style={{ backgroundColor: bgColor }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialConnectSection;
