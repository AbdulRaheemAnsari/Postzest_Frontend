"use client";

import { usePathname } from "next/navigation";
import Header from "../HomeComponents/Header";
import Footer from "../HomeComponents/Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Marketing pages where public Header and Footer should be rendered
  const isMarketing =
    pathname === "/" ||
    ["/pricing", "/blog", "/privacy-policy", "/terms-of-services"].some(
      (route) => pathname.startsWith(route)
    );

  return (
    <>
      {isMarketing && <Header />}
      {children}
      {isMarketing && <Footer />}
    </>
  );
}

