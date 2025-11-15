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

  // All dashboard routes
  const isDashboard = ["/dashboard", "/settings"].some((route) =>
    pathname.startsWith(route)
  );

  return (
    <>
      {!isDashboard && (
        <>
          {/* Header only for non-dashboard pages */}
          <Header />
        </>
      )}

      {children}

      {!isDashboard && (
        <>
          {/* Footer only for non-dashboard pages */}
          <Footer />
        </>
      )}
    </>
  );
}
