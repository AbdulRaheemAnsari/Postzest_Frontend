"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, Lock, Pencil, Trash2, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ToggleSwitch } from "@/components/common/ToggleSwitch";
import FloatingInput from "@/components/common/FloatingInput";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";

const Profile = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | null>(
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
  );

  const [formData, setFormData] = useState({
    firstName: "Abdul Raheem",
    email: "ans@gmail.com",
    phone: "09213453243",
  });

  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Please select an image under 5MB");
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      toast.success("Profile picture updated successfully");
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(password))
      return "Password must contain an uppercase letter";
    if (!/[a-z]/.test(password))
      return "Password must contain a lowercase letter";
    if (!/[0-9]/.test(password)) return "Password must contain a number";
    return "";
  };

  const handleSavePersonalInfo = () => {
    const newErrors = {
      firstName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);

    if (!newErrors.firstName && !newErrors.email) {
      toast.success("Personal information updated successfully");
    }
  };

  const handleSavePassword = () => {
    const newErrors = {
      firstName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    };

    if (!passwordData.password) {
      newErrors.password = "Password is required";
    } else {
      const passwordError = validatePassword(passwordData.password);
      if (passwordError) {
        newErrors.password = passwordError;
      }
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (passwordData.password !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (!newErrors.password && !newErrors.confirmPassword) {
      toast.success("Password updated successfully");
      setPasswordData({ password: "", confirmPassword: "" });
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteDialog(false);
    toast.success("Account deleted successfully");
  };

  const handleTwoFactorToggle = (checked: boolean) => {
    setTwoFactorEnabled(checked);
    toast.success(
      `Two-factor authentication ${
        checked ? "enabled" : "disabled"
      } successfully`
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="space-y-10">
          {/* Avatar Section */}
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-12">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Avatar</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Edit your profile picture
              </p>
            </div>

            <div className="flex items-center justify-center md:justify-start">
              <div className="relative group">
                <Avatar className="h-22 w-22 ring-2 ring-border">
                  <AvatarImage
                    src={image || ""}
                    draggable={false}
                    alt="Profile Picture"
                  />
                  <AvatarFallback className="text-2xl">AR</AvatarFallback>
                </Avatar>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-background border-2 border-background rounded-full p-1 cursor-pointer shadow-md hover:bg-accent transition-colors"
                >
                  <Pencil className="h-4 w-4 text-foreground" />
                </button>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-12">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Personal Information
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Change your identity informations.
              </p>
              <Button
                onClick={handleSavePersonalInfo}
                className="mt-4 rounded-sm py-6 cursor-pointer font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Save Changes
              </Button>
            </div>

            <div className="space-y-5 max-w-lg">
              <div>
                <FloatingInput
                  label="First Name"
                  icon={<User className="h-5 w-5" />}
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => {
                    setFormData({ ...formData, firstName: e.target.value });
                    if (errors.firstName) {
                      setErrors({ ...errors, firstName: "" });
                    }
                  }}
                  error={errors.firstName}
                />
              </div>

              <div>
                <FloatingInput
                  label="Email"
                  icon={<Mail className="h-5 w-5" />}
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) {
                      setErrors({ ...errors, email: "" });
                    }
                  }}
                  error={errors.email}
                />
              </div>

              <div>
                <FloatingInput
                  label="Phone (optional)"
                  icon={<Phone className="h-5 w-5" />}
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-12">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Security
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Last change 12 days ago.
              </p>
              <Button
                onClick={handleSavePassword}
                className="mt-4 rounded-sm py-6 cursor-pointer font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Save Changes
              </Button>
            </div>

            <div className="space-y-5 max-w-lg">
              <div>
                <div className="relative">
                  <FloatingInput
                    label="Password"
                    icon={<Lock className="h-5 w-5" />}
                    id="password"
                    type="password"
                    value={passwordData.password}
                    onChange={(e) => {
                      setPasswordData({
                        ...passwordData,
                        password: e.target.value,
                      });
                      if (errors.password) {
                        setErrors({ ...errors, password: "" });
                      }
                    }}
                    className="pr-12"
                    error={errors.password}
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <FloatingInput
                    label="Confirm Password"
                    icon={<Lock className="h-5 w-5" />}
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => {
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      });
                      if (errors.confirmPassword) {
                        setErrors({ ...errors, confirmPassword: "" });
                      }
                    }}
                    className="pr-12"
                    error={errors.confirmPassword}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Two-step Authentication */}
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-12">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Two-step Authentication
              </h2>
            </div>

            <div className="space-y-4 max-w-lg">
              <div className="flex items-center justify-end">
                <ToggleSwitch
                  checked={twoFactorEnabled}
                  onCheckedChange={handleTwoFactorToggle}
                />
              </div>

              {twoFactorEnabled && (
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex gap-3">
                  <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-primary">
                    Two-factor authentication secures your account by requiring
                    a code from your authenticator app each time you log in.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Delete Account Section */}
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-12">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Delete Account
              </h2>
            </div>

            <div className="max-w-lg">
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-start justify-between gap-4">
                <p className="text-sm text-destructive flex-1">
                  <span className="font-semibold">Note:</span> If you just want
                  to pause or stop using PostZest, you can manage your
                  subscription instead of deleting your account
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
        </div>
      </div>

      {/* Delete Account Confirmation Dialog */}
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
                This action cannot be undone. This will permanently delete your
                account and remove all your data from our servers.
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
  );
};

export default Profile;
