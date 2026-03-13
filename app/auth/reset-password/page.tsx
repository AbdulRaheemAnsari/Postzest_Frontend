"use client";

import FloatingInput from "@/components/common/FloatingInput";
import resetImage from "@/assets/images/resetpassword.png";
import postzestLogo from "@/assets/images/postzestlogo.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { ArrowLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useResetPasswordMutation } from "@/queries/auth/useForgotPassword";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "react-toastify";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // highlight confirmPassword field
  });

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: resetPassword, isPending: resetPasswordIsPending } =
    useResetPasswordMutation();

  const onSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
    const payload = {
      token: token ?? "",
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    resetPassword(payload, {
      onSuccess: (res) => {
        toast.success(res.message);
        router.push("/auth/password-reset-successfully");
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message);
      },
    });
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
              src={resetImage}
              alt="Reset Password"
              className="w-20 h-20"
            />
            <Label className="text-foreground text-3xl font-semibold">
              Set New Password
            </Label>
            <span className="text-center text-foreground font-semibold text-sm leading-4 px-4">
              Your new password must be different from previously used
              passwords.
            </span>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full pt-4">
                  <FormControl>
                    <FloatingInput
                      {...field}
                      label="Password"
                      type="password"
                      id="password"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full pb-2">
                  <FormControl>
                    <FloatingInput
                      {...field}
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Button
              className="flex w-full text-background font-semibold text-md rounded-md items-center text-md py-7 justify-center gap-1.5 bg-primary hover:bg-primary/80 cursor-pointer"
              type="submit"
              disabled={resetPasswordIsPending}
            >
              {resetPasswordIsPending ? (
                <>
                  <Spinner />
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>

            <div
              onClick={() => router.push("/auth/login")}
              className="flex items-center justify-center gap-2 mt-2 hover:bg-muted px-2 py-1 rounded-md cursor-pointer transition-all duration-200"
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

const ResetPassword = () => (
  <Suspense>
    <ResetPasswordForm />
  </Suspense>
);

export default ResetPassword;
