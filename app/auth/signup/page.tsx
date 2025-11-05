import { SignUpForm } from "@/components/signup-form";
import React from "react";

export default function SignUp() {
  return (
    <div className="w-full h-screen bg-background flex flex-col items-center justify-center">
      <div className="md:w-md w-sm">
        <SignUpForm />
      </div>
    </div>
  );
}
