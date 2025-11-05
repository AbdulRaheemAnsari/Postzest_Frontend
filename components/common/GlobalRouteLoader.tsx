"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import FullPageLoader from "./FullPageLoader";

export default function GlobalRouteLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return loading ? <FullPageLoader /> : null;
}
