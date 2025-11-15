import { Button } from "@/components/ui/button";
import logo from "@/assets/images/postzestlogo.png"
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-accent backdrop-blur-md">
      <div className="container mx-auto py-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} draggable={false} alt="postzest-logo" className="w-40" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/features"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Features
            </Link>
             <Link
              href="/platforms"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Platforms
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
           
          </nav>

         <div className="flex items-center gap-1.5">
           <Button
           variant={"outline"}
           className=" text-foreground py-5 bg-transparent px-6 hover:bg-muted cursor-pointer">
            Login
          </Button>
           {/* <Button className="bg-primary py-6 px-6 text-background hover:bg-primary/80 cursor-pointer">
            Start free trail
          </Button> */}
         </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
