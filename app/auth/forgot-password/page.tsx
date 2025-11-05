"use client";

import { Label } from "@/components/ui/label";
import Image from "next/image";
import forgotImage from "@/assets/images/forgotpassword.png";
import postzestLogo from "@/assets/images/postzestlogo.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import FloatingInput from "@/components/common/FloatingInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

const ForgotPassword = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof forgotPasswordSchema>) => {
    console.log("Forgot password for:", values.email);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full h-screen bg-bg-color-secoundry flex items-start justify-center"
      >
        <div>
          <div className="max-w-md bg-background flex flex-col items-center justify-center px-6 py-4 mt-32 rounded-lg space-y-2">
            <Image
              src={forgotImage}
              alt="Forgot Password"
              className="w-20 h-20"
            />
            <Label className="text-foreground text-3xl font-semibold">
              Forgot Password?
            </Label>
            <span className="text-center text-foreground font-semibold text-sm leading-4 px-4">
              Enter the email address associated with your account, and we'll
              email you a link to reset your password
            </span>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full pt-4 pb-2">
                  <FormControl>
                    <FloatingInput
                      {...field}
                      label="Email"
                      type="email"
                      id="email"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Button
              className="flex w-full text-background font-semibold text-md rounded-md items-center text-md py-7 justify-center gap-1.5 bg-primary hover:bg-primary/80 cursor-pointer"
              type="submit"
            >
              Send reset link
            </Button>

            <div
              onClick={() => router.push("/auth/login")}
              className="flex items-center justify-center gap-2 mt-2 hover:bg-muted px-2 py-1 rounded-md cursor-pointer transition-all duration-200 "
            >
              <ArrowLeft className="w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Back to login
              </span>
            </div>
          </div>
          <Image
            className="w-50 mx-auto cursor-pointer mt-2"
            src={postzestLogo}
            alt="postzest-logo"
          />
        </div>
      </form>
    </Form>
  );
};

export default ForgotPassword;
