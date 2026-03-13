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
import { SetMagicLinkPasswordMutation } from "@/queries/auth/useMagicLink";
import { toast } from "react-toastify";
import { Spinner } from "@/components/ui/spinner";
import { setAuthData } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";




const resetPasswordSchema = z
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

export default function SetPasswordForm() {
    const dispatch = useDispatch();
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


    const { mutate: setMagicLinkPassword, isPending: isSettingPassword } = SetMagicLinkPasswordMutation();

    const onSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
        const payload: any = {
            token: token ?? "",
            password: values.password,
            confirmPassword: values.confirmPassword,
        };

        setMagicLinkPassword(payload, {
            onSuccess: (res) => {
                const token = res.data?.accessToken;
                const user = res.data?.user;
                dispatch(setAuthData({ token, user }));
                console.log("resetRes", res);
                toast.success(res?.message);
                if (typeof window !== "undefined") {
                    localStorage.setItem("email", res?.user?.email);
                }
                router.push("/onboarding/creator-type");
            },
            onError: (err: any) => {
                toast.error(err?.response?.data?.message);
            },
        });
    };
    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(
                        onSubmit,
                        (errors) => {
                            console.log("Form errors:", errors);
                        }
                    )}
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
                                Set Password
                            </Label>
                            <span className="text-center text-foreground font-semibold text-sm leading-4 px-4">
                                Create a strong password to secure your account.
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
                                disabled={isSettingPassword}
                            >
                                {isSettingPassword ? <><Spinner /> Setting Password...</> : "Set Password"}
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
        </div>
    )
}