"use client";
import { Button } from "@/components/ui/button";
import success from "../../../assets/images/success.png";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const PasswordResetSuccessfully = () => {
  const router = useRouter();
  return (
    <div className="w-full h-screen bg-bg-color-secoundry flex items-start justify-center">
      <div className="max-w-md bg-background flex flex-col items-center justify-center p-6 mt-32 rounded-lg space-y-2">
        <Image src={success} alt="resetImage" className="w-20 h-20 mb-6" />
        <Label className="text-foreground text-3xl font-semibold ">
          Password reset successfully
        </Label>
        <span className="text-center text-foreground font-semibold text-sm leading-4 px-4">
          Your password has been successfully reset, click below to continue
          your access.
        </span>

        <Button
          onClick={() => router.push("/auth/login")}
          className="flex w-full text-background mt-4 font-semibold text-md rounded-md items-center text-md py-7 justify-center gap-1.5 bg-primary hover:bg-primary/80 cursor-pointer"
          type="submit"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default PasswordResetSuccessfully;
