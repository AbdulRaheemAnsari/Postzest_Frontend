"use client";
import { Label } from "@/components/ui/label";
import confirmEmail from "../../../assets/images/confirmemail.png";
import Image from "next/image";

const EmailSentSuccessfully = () => {
  // const email = localStorage.getItem("email");
  const email = sessionStorage.getItem("resetEmail");
  return (
    <div className="w-full h-screen bg-bg-color-secoundry flex items-start justify-center">
      <div className="max-w-md bg-background flex flex-col items-center justify-center px-6 py-6 mt-32 rounded-lg space-y-2">
        <Image
          src={confirmEmail}
          alt="confirm-email"
          className="w-20 h-20 mb-6"
        />
        <Label className="text-foreground text-3xl font-semibold">
          Check your email
        </Label>
        <span className="text-center text-foreground font-medium text-sm leading-5 px-4">
          We just sent an email with password reset instructions to
          <br />
          <strong>{email}</strong>
        </span>
      </div>
    </div>
  );
};

export default EmailSentSuccessfully;
