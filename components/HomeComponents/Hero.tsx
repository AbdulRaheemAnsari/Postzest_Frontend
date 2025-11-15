"use client";
import { Button } from "@/components/ui/button";
import dashboardHero from "@/assets/images/dashboard-hero.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import facebook from "@/assets/images/facebook.png";
import instagram from "@/assets/images/instagram.png";
import tiktok from "@/assets/images/tiktok.png";
import linkedin from "@/assets/images/linkedin.png";
import youtube from "@/assets/images/youtube.png";
import threads from "@/assets/images/threads.png";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const socialIcons = [
    { Icon: facebook, position: "top-30 left-25" },
    { Icon: instagram, position: "top-1/3 left-65" },
    { Icon: tiktok, position: "top-1/2 left-20" },
    { Icon: linkedin, position: "top-30 right-30" },
    { Icon: threads, position: "top-1/3 right-65" },
    { Icon: youtube, position: "top-1/2 right-20" },
  ];

  const calculateTransform = (baseX: number, baseY: number) => {
    const moveX = (mousePosition.x - window.innerWidth / 2) / 50;
    const moveY = (mousePosition.y - window.innerHeight / 2) / 50;
    return `translate(${moveX}px, ${moveY}px)`;
  };
  return (
    <section className="relative pt-32 pb-20 bg-accent overflow-hidden">
      {/* Animated Social Media Icons */}
      {socialIcons.map(({ Icon, position }, index) => (
        <div
          key={index}
          className={`hidden lg:block absolute ${position} transition-transform duration-300 ease-out`}
          style={{
            transform: calculateTransform(index * 100, index * 150),
          }}
        >
          <div className="bg-background rounded-lg p-1.5 blur-[0.8px] transition-shadow ">
            <Image src={Icon} className="w-10" alt="icon" />
          </div>
        </div>
      ))}

      <div className="container mx-auto px-4">
        {/* <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            🚀 Instant Invoicing
          </span>
        </div> */}

        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-foreground">
            Track, Analyze, and Grow Your Social Media with Ease
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get real-time insights on audience growth, follower trends, and
            potential clients, all in one place
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              // onClick={() => setIsVideoOpen(true)}÷]
              className="bg-primary cursor-pointer text-primary-foreground hover:bg-primary/90 px-8 py-7 font-semibold text-sm rounded-md"
            >
              Get started for free
            </Button>
          </div>
          {/* Customer Reviews */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex -space-x-3">
              <Avatar className="border-2 border-background w-12 h-12">
                <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                <AvatarFallback>U1</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background w-12 h-12">
                <AvatarImage src="https://i.pravatar.cc/150?img=2" />
                <AvatarFallback>U2</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background w-12 h-12">
                <AvatarImage src="https://i.pravatar.cc/150?img=3" />
                <AvatarFallback>U3</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background w-12 h-12">
                <AvatarImage src="https://i.pravatar.cc/150?img=4" />
                <AvatarFallback>U4</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background w-12 h-12">
                <AvatarImage src="https://i.pravatar.cc/150?img=5" />
                <AvatarFallback>U5</AvatarFallback>
              </Avatar>
            </div>
            <p className="text-muted-foreground">
              Used by <span className="font-bold text-foreground">1,362</span>{" "}
              happy customers
            </p>
          </div>
          <p className="text-sm text-foreground font-medium">
            14-day free trial - No credit card required.
          </p>
        </div>

        {/* Dashboard Image */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
          <Image
            src={dashboardHero}
            alt="SociBoost Dashboard"
            className="relative z-10 rounded-2xl shadow-2xl w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
