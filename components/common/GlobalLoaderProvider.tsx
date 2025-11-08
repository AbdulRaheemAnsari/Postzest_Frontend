"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import FullPageLoader from "./FullPageLoader";

export default function GlobalLoaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  // When route changes
  useEffect(() => {
    setIsLoading(true);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 700); // Adjust delay to match page load speed

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      <FullPageLoader isLoading={isLoading} />
      {children}
    </>
  );
}
