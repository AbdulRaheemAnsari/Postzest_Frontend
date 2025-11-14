import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/images/postzestlogo.png"
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} draggable={false} alt="postzest-logo" className="w-40" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <button className="flex items-center gap-1 text-sm text-foreground hover:text-primary transition-colors">
              Products <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-1 text-sm text-foreground hover:text-primary transition-colors">
              Solutions <ChevronDown className="w-4 h-4" />
            </button>
            <Link
              href="/#features"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <a
              href="#contact"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Contact
            </a>
          </nav>

         <div className="flex items-center gap-1.5">
           <Button
           variant={"outline"}
           className=" text-foreground hover:bg-muted cursor-pointer">
            Login
          </Button>
           <Button className="bg-primary text-background hover:bg-foreground/90 cursor-pointer">
            Start free trail
          </Button>
         </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
