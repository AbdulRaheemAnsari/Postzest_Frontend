"use client";
import { Suspense } from "react";
import SetPasswordForm from "@/components/SetPasswordForm";



export default function MagicLinkSetPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SetPasswordForm />
    </Suspense>
  )
}
