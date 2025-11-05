"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import postzestLogo from "@/assets/images/postzestlogo.png";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import Image from "next/image";
import otpImage from "@/assets/images/otp.png";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import { ArrowLeft } from "lucide-react";
import { otpRequestSchema, useOtpVerify } from "@/queries/auth/useVerifyOtp";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useResendOtp } from "@/queries/auth/useResendOtp";
import { useDispatch } from "react-redux";
import { setAuthData } from "@/store/slices/authSlice";

const page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const email =
    typeof window !== "undefined" ? localStorage.getItem("email") : "";

  const form = useForm<z.infer<typeof otpRequestSchema>>({
    defaultValues: { otp: "" },
  });

  const { control, handleSubmit } = form;

  const { mutate: verifyOtp, isPending: verifyOtpIsPending } = useOtpVerify({
    onSuccess: (res) => {
      const accessToken = res?.data?.accessToken;
      const user = res?.data?.user;

      dispatch(setAuthData({ accessToken, user }));
      toast.success(res?.data?.message);

      setTimeout(() => {
        router.push("/onboarding/creator-type");
      }, 1000);
    },

    onError: (err) => {
      console.log("eddrr", err);
      toast.error("Invalid OTP");
    },
  });

  const onSubmit = (data: z.infer<typeof otpRequestSchema>) => {
    verifyOtp({ email, otp: data.otp });
  };

  const { mutate: resendOtp, isPending: resendOtpIsPending } = useResendOtp({
    onSuccess: (res) => {
      toast.success(res?.data?.message);
    },
    onError: (err) => {
      console.log("err", err);
      toast.error(err?.request?.data?.message);
    },
  });

  const handleResendOtp = () => {
    resendOtp({ email });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-screen bg-bg-color-secoundry flex items-start justify-center"
      >
        <div>
          <div className="max-w-md bg-background flex flex-col items-center justify-center px-6 py-4 mt-32 rounded-lg space-y-2">
            <Image
              src={otpImage}
              alt="OTP Verification"
              className="w-20 h-20"
            />
            <Label className="text-foreground text-3xl font-semibold">
              Confirm your email
            </Label>

            <span className="text-center text-foreground font-semibold text-sm leading-4 px-4">
              We have sent a 6-digit verification code to{" "}
              <span className="font-bold text-primary">
                {email || "your email"}
              </span>
            </span>

            <FieldGroup className="gap-4 pt-4">
              <Field>
                <FieldLabel htmlFor="otp" className="sr-only">
                  Verification code
                </FieldLabel>

                <Controller
                  name="otp"
                  control={control}
                  rules={{
                    required: "OTP is required",
                    minLength: { value: 6, message: "OTP must be 6 digits" },
                    maxLength: { value: 6, message: "OTP must be 6 digits" },
                  }}
                  render={({ field }) => (
                    <InputOTP
                      {...field}
                      maxLength={6}
                      containerClassName="gap-4"
                      value={field.value || ""}
                      onChange={field.onChange}
                    >
                      <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-14 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-lg">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-14 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-lg">
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  )}
                />
              </Field>

              <Button
                disabled={verifyOtpIsPending}
                className="flex w-full text-background font-semibold text-md rounded-md items-center text-md py-7 justify-center gap-1.5 bg-primary hover:bg-primary/80 cursor-pointer"
                type="submit"
              >
                {verifyOtpIsPending ? <Spinner /> : "Verify email"}
              </Button>

              <FieldDescription className="text-center text-sm flex items-center justify-center gap-2">
                Didn&apos;t receive the code?{" "}
                <span
                  onClick={handleResendOtp}
                  className={`flex items-center gap-1 ${
                    resendOtpIsPending && "text-primary/30"
                  } text-primary hover:text-primary/70 font-medium cursor-pointer`}
                >
                  {resendOtpIsPending ? "Resending..." : "Resend"}
                </span>
              </FieldDescription>
            </FieldGroup>
            <div
              onClick={() => router.push("/auth/login")}
              className="flex items-center justify-center gap-2 hover:bg-muted px-2 py-1 rounded-md cursor-pointer transition-all duration-200"
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

export default page;
