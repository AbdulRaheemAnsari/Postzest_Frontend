"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import postzestLogo from "@/assets/images/postzestlogo.png";
import bgbox from "@/assets/images/bgbox.png";
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
import { useResendOtp } from "@/queries/auth/useResendOtp";
import { useDispatch } from "react-redux";
import { setAuthData } from "@/store/slices/authSlice";
import { toast } from "react-toastify";

const page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const email =
    typeof window !== "undefined" ? localStorage.getItem("email") : "";

  const form = useForm<z.infer<typeof otpRequestSchema>>({
    defaultValues: { otp: "" },
  });

  const { control, handleSubmit } = form;
  const { mutate: verifyOtp, isPending: verifyOtpIsPending } = useOtpVerify();


  const onSubmit = (data: z.infer<typeof otpRequestSchema>) => {
    verifyOtp({ email: email || "", otp: data.otp }, {
      onSuccess: (res: any) => {
        console.log("verifyRes", res);
        const token = res?.data?.accessToken;
        const user = res?.data?.user;

        dispatch(setAuthData({ token, user }));
        toast.success(res?.message);

        setTimeout(() => {
          router.push("/onboarding/creator-type");
        }, 1000);
      },
      onError: (err: any) => {
        console.log("eddrr", err);
        toast.error("Invalid OTP");
        }
      });
    };

  const { mutate: resendOtp, isPending: resendOtpIsPending } = useResendOtp({
    onSuccess: (res: any) => {
      toast.success(res?.data?.message);
    },
    onError: (err: any) => {
      console.log("err", err);
      toast.error(err?.request?.data?.message);
    },
  });

  const handleResendOtp = () => {
    resendOtp({ email });
  };

  return (
    <>
      <Image
        src={bgbox}
        alt="background"
        className="h-[400px] opacity-70 object-cover absolute top-0 object-center"
        priority
      />

    <div className="relative z-10">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit, (formErrors) => {
            console.log("Form errors:", formErrors);
          })}
          className="w-full h-screen flex items-start justify-center"
        >
          <div>
            <div className="max-w-md flex flex-col items-center justify-center px-6 py-4 mt-32 rounded-lg space-y-2">
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
                      minLength: { value: 4, message: "OTP must be 4 digits" },
                      maxLength: { value: 4, message: "OTP must be 4 digits" },
                    }}
                    render={({ field }) => (
                      <InputOTP
                        {...field}
                        maxLength={6}
                        containerClassName="gap-4"
                        value={field.value || ""}
                        onChange={field.onChange}
                      >
                        <InputOTPGroup className="md:gap-3 gap-2 mx-auto">
                          <InputOTPSlot
                            index={0}
                            className="w-20 h-20 text-5xl font-semibold text-primary border-2 border-primary rounded-xl"
                          />
                          <InputOTPSlot
                            index={1}
                            className="w-20 h-20 text-5xl font-semibold text-primary border-2 border-primary rounded-xl"
                          />
                          <InputOTPSlot
                            index={2}
                            className="w-20 h-20 text-5xl font-semibold text-primary border-2 border-primary rounded-xl"
                          />
                          <InputOTPSlot
                            index={3}
                            className="w-20 h-20 text-5xl font-semibold text-primary border-2 border-primary rounded-xl"
                          />
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

                <FieldDescription className="text-center text-base text-muted-foreground/60 flex items-center justify-center gap-2">
                  Didn&apos;t receive the code?{" "}
                  <span
                    onClick={handleResendOtp}
                    className={`flex items-center gap-1 ${
                      resendOtpIsPending && "text-primary/30"
                    } text-primary hover:text-primary/70 font-semibold cursor-pointer`}
                  >
                    {resendOtpIsPending ? "Resending..." : "Resend"}
                  </span>
                </FieldDescription>
              </FieldGroup>
             
                <span 
                 onClick={() => router.push("/auth/signup")}
                className="text-base cursor-pointer text-primary hover:text-primary/70 mt-2 font-bold">
                  Use a different email
                </span>
            </div>
            <Image
              className="w-50 mx-auto cursor-pointer mt-2"
              src={postzestLogo}
              alt="postzest-logo"
            />
          </div>
        </form>
      </Form>
      </div>
    </>
  );
};

export default page;
