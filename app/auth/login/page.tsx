import { LoginForm } from "@/components/login-form";
import React from "react";

export default function Login() {
  return (
    <div className="w-full h-screen bg-background flex flex-col items-center justify-center">
      <div className="md:w-md w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
