"use client";
import FloatingInput from "@/components/common/FloatingInput";
import { Button } from "@/components/ui/button";
import magic from "../../../assets/images/magic.png";
import postzestLogo from "@/assets/images/postzestlogo.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { email } from "zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  magicLinkRequestSchema,
  useMagicLinkMutation,
} from "@/queries/auth/useMagicLink";
import { toast } from "react-toastify";
import { Spinner } from "@/components/ui/spinner";

const MagicLink = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof magicLinkRequestSchema>>({
    resolver: zodResolver(magicLinkRequestSchema),
    defaultValues: {
      email: "",
    },
  });

  const {mutate: magicLinkSend, isPending: MagicLinkIsPending} = useMagicLinkMutation();

  const onSubmit = (values: z.infer<typeof magicLinkRequestSchema>) => {
    magicLinkSend({ email: values.email }, {
      onSuccess: (res) => {
        toast.success(res?.message);
        console.log("magicLinkRes", res);
        localStorage.setItem("email", res?.data?.email);
        router.push("/auth/magic-link-sent-successfully");
      }, onError: (err: any) => {
        toast.error(err?.response?.data?.message);
      }
    });
    console.log("dsdsd", values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full h-screen bg-bg-color-secoundry flex items-start justify-center"
      >
        <div>
          <div className="max-w-md bg-background flex flex-col items-center justify-center px-6 py-4 mt-32 rounded-lg space-y-2">
            <Image src={magic} alt="magic" className="w-20 h-20" />
            <Label className="text-foreground text-2xl font-semibold text-center">
              This is where the magic happens
            </Label>
            <span className="text-center text-foreground font-semibold text-sm leading-4 px-4">
              Enter the email address associated with your account, and we'll
              email you a magic link to log you in.
            </span>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full pt-4">
                  <FormControl>
                    <FloatingInput label="Email" id="email" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Button
            disabled={MagicLinkIsPending}
              className="flex w-full text-background font-semibold text-md rounded-md items-center text-md py-7 justify-center gap-1.5 bg-primary hover:bg-primary/80 cursor-pointer"
              type="submit"
            >
              {MagicLinkIsPending ? <> <Spinner /> Sending Magic Link...</> : "Send Magic Link"}
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

export default MagicLink;
