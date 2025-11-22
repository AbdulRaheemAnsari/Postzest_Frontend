"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import GlobalRouteLoader from "./common/GlobalLoaderProvider";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  console.log("accessToken", accessToken)

  useEffect(() => {
    if (!accessToken) {
      router.replace("/auth/login");
    }
  }, [accessToken, router]);

  if (!accessToken) return <GlobalRouteLoader />;

  return <>{children}</>;
}
