"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, Lock, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FloatingInput from "@/components/common/FloatingInput";
import { toast } from "react-toastify";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useGetProfile, useUpdateAvatar, useUpdatePassword, useUpdateProfile } from "@/queries/user/updateUser";
import { Spinner } from "@/components/ui/spinner";

// --- Zod Schemas ---
const personalInfoSchema = z.object({
  name: z.string().nonempty("First name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  avatar: z.instanceof(File).optional(),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(8, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[a-z]/, "Password must contain a lowercase letter")
      .regex(/[0-9]/, "Password must contain a number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PersonalInfoForm = z.infer<typeof personalInfoSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;

export default function Profile() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string>("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // --- Forms ---
  const personalForm = useForm<PersonalInfoForm>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: { name: "", email: "", phone: "", avatar: undefined },
  });

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  const { data: profileData } = useGetProfile();
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useUpdateProfile();
  const { mutate: updateAvatar } = useUpdateAvatar();
  const { mutate: updatePassword, isPending: isUpdatingPassword } = useUpdatePassword();

  useEffect(() => {
    if (profileData) {
      personalForm.reset({
        name: profileData.name || "",
        email: profileData.email || "",
        phone: profileData.phone || "",
      });
      setImage(profileData.avatar || ""); // Assuming the API returns avatarUrl
    }
  }, [profileData]);

  // --- Handlers ---
  const onSubmitPersonal = (data: PersonalInfoForm) => {
    const Payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
    };
    updateProfile(Payload as any, {
      onSuccess: (res: any) => {
        toast.success(res.message);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
      },
    });
  };

  const handleAvatarUpload = (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);
    updateAvatar(formData as any, {
      onSuccess: (res: any) => {
        toast.success(res.message);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
      },
    });
  };

  const onSubmitPassword = (data: PasswordForm) => {
    console.log("Password data:", data);
    updatePassword(data as any, {
      onSuccess: (res: any) => {
        toast.success(res.message);
        passwordForm.reset();
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
      },
    });
  };

  const handleDeleteAccount = () => {
    setShowDeleteDialog(false);
    toast.success("Account deleted successfully");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        {/* --- Avatar Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-12">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Avatar</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Edit your profile picture
            </p>
          </div>
          <div className="flex items-center justify-center md:justify-start">
            <div className="relative group">
              <Controller
                control={personalForm.control}
                name="avatar"
                render={({ field }) => (
                  <div className="flex items-center gap-4 relative">
                    <Avatar
                      onClick={() => fileInputRef.current?.click()}
                      className="h-22 w-22 ring-2 ring-border cursor-pointer hover:opacity-70 transition-opacity"
                    >
                      <AvatarImage
                        className="rounded-full object-cover"
                        src={image}
                        draggable={false}
                        alt="Profile Picture"
                      />
                      <AvatarFallback className="text-2xl">AR</AvatarFallback>
                    </Avatar>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 bg-background border-2 border-background rounded-full p-1 cursor-pointer shadow-md hover:bg-accent transition-colors"
                    >
                      <Pencil className="h-4 w-4 text-foreground" />
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        if (file.size > 5 * 1024 * 1024) {
                          toast.error("Please select an image under 5MB");
                          return;
                        }

                        setImage(URL.createObjectURL(file)); // preview
                        handleAvatarUpload(file);
                      }}
                    />
                  </div>
                )}
              />
            </div>
          </div>
        </div>

        {/* --- Personal Information Form --- */}
        <Form {...personalForm}>
          <form onSubmit={personalForm.handleSubmit(onSubmitPersonal)}>
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-12">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Personal Information
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Change your identity information
                </p>
                <Button
                  type="submit"
                  disabled={isUpdatingProfile}
                  className="mt-4 cursor-pointer rounded-sm py-6 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isUpdatingProfile ? (
                    <>
                      <Spinner />
                      Updating...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
              <div className="space-y-5 max-w-lg">
                <FormField
                  control={personalForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FloatingInput
                          label="Full name"
                          icon={<User className="h-5 w-5" />}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={personalForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FloatingInput
                          label="Email"
                          icon={<Mail className="h-5 w-5" />}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={personalForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FloatingInput
                          label="Phone (optional)"
                          icon={<Phone className="h-5 w-5" />}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>

        {/* --- Password Form --- */}
        <Form {...passwordForm}>
          <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)}>
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-12">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Security
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Last change 12 days ago.
                </p>
                <Button
                  type="submit"
                  disabled={isUpdatingPassword}
                  className="mt-4 cursor-pointer rounded-sm py-6 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isUpdatingPassword ? (
                    <>
                      <Spinner />
                      Updating...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
              <div className="space-y-5 max-w-lg">
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FloatingInput
                          label="Current Password"
                          type="password"
                          icon={<Lock className="h-5 w-5" />}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FloatingInput
                          label="Password"
                          type="password"
                          icon={<Lock className="h-5 w-5" />}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FloatingInput
                          label="Confirm Password"
                          type="password"
                          icon={<Lock className="h-5 w-5" />}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>

        {/* --- Delete Account Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-12">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Delete Account
            </h2>
          </div>
          <div className="max-w-lg">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-start justify-between gap-4">
              <p className="text-sm text-destructive flex-1">
                <span className="font-semibold">Note:</span> If you just want to
                pause or stop using PostZest, you can manage your subscription
                instead of deleting your account
              </p>
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setShowDeleteDialog(true)}
                className="text-destructive bg-destructive/10 hover:bg-destructive/16 cursor-pointer hover:text-destructive/80 transition-colors flex-shrink-0"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* --- Delete Account Dialog --- */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-destructive flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                Delete Account
              </DialogTitle>
              <DialogDescription className="pt-4 space-y-3">
                <p className="text-foreground font-semibold">
                  Are you absolutely sure?
                </p>
                <p>
                  This action cannot be undone. This will permanently delete
                  your account and remove all your data from our servers.
                </p>
                <FloatingInput
                  label="Enter password"
                  type="password"
                  parentClassName="mt-4"
                />
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="!gap-2 sm:gap-0">
              <Button
                variant="outline"
                className="cursor-pointer rounded-sm py-6"
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                className="gap-2 cursor-pointer font-semibold rounded-sm py-6 hover:bg-destructive/90"
              >
                <Trash2 className="h-4 w-4" />
                Delete Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
