"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import postzestLogo from "@/assets/images/postzestlogo.png";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldSeparator } from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import FloatingInput from "@/components/common/FloatingInput";
import Link from "next/link";
import {
  signUpRequestSchema,
  useSignUpMutation,
} from "@/queries/auth/useSignupMutation";
import { Spinner } from "./ui/spinner";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpRequestSchema>>({
    resolver: zodResolver(signUpRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate: signUpUser, isPending: signUpUserIsPending } =
    useSignUpMutation({
      onSuccess: (res: any) => {
        console.log("signup-res", res);
        toast.success(res?.message);
        localStorage.setItem("email", res?.user?.email);
        router.push("/auth/otp");
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message);
      },
    });

  const onSubmit = (values: z.infer<typeof signUpRequestSchema>) => {
    signUpUser(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={cn("flex flex-col gap-2", className)} {...props}>
          <Card className="border-none shadow-none">
            <CardHeader className="text-center">
              <Image
                className="w-50 mx-auto"
                src={postzestLogo}
                alt="postzest-logo"
              />
              <CardTitle className="text-3xl font-semibold">
                Get Started Now
              </CardTitle>
              <CardDescription className="font-medium text-md">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card text-xs mb-2">
                Sign up with
              </FieldSeparator>
              <FieldGroup className="gap-4">
                <Field className="pb-2 gap-2">
                  <Button
                    className="border-input-disabled-border border rounded-lg py-7 text-md cursor-pointer shadow-none font-semibold"
                    variant="outline"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Sign up with Google
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="border-input-disabled-border border rounded-lg text-md py-7 cursor-pointer shadow-none font-semibold"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                        fill="currentColor"
                      />
                    </svg>
                    Sign up with Apple
                  </Button>
                </Field>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card text-xs">
                  Or with email
                </FieldSeparator>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FloatingInput
                          label="First Name"
                          id="firstName"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                          <FloatingInput
                          label="Email"
                          id="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FloatingInput
                          label="Password"
                          type="password"
                          id="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <Field>
                  <Button
                    disabled={signUpUserIsPending}
                    className="flex w-full text-background font-semibold text-md rounded-md items-center text-md py-7 justify-center gap-1.5 bg-primary hover:bg-primary/80 cursor-pointer"
                    type="submit"
                  >
                    {signUpUserIsPending ? <Spinner /> : "Create Account"}
                  </Button>
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>

          <FormDescription className="px-6 text-center text-xs leading-4 text-muted-foreground">
            By signing up, you agree to our
            <Link className="underline" href={"/"}>
              Term of Service
            </Link>
            and
            <Link className="underline" href={"/"}>
              Privacy Policy
            </Link>
            . This site is protected by reCAPTCHA and the Google Terms of
            Service and
            <Link className="underline" href={"/"}>
              Privacy Policy
            </Link>
            apply.
          </FormDescription>
        </div>
      </form>
    </Form>
  );
}
