"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  Info,
} from "lucide-react";
import { ToggleSwitch } from "@/components/common/ToggleSwitch";
import FloatingInput from "@/components/common/FloatingInput";

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | null>(
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
  );

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  // Open file dialog on pencil click
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-background py-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Avatar Section */}
        <div className="grid md:grid-cols-[300px_1fr] gap-20 items-start">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">Avatar</h2>
            <p className="text-muted-foreground">Edit your profile picture</p>
          </div>
          <div className="flex items-center justify-center md:justify-start">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={image || ""} alt="Profile Picture" />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>

              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />

              {/* Pencil Button */}
              <button
                onClick={handleClick}
                className="absolute bottom-0 right-0 bg-muted rounded-full p-2 border-2 border-background cursor-pointer"
              >
                <Pencil className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Personal Information Section */}
        <div className="grid md:grid-cols-[300px_1fr] gap-20">
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                Personal Information
              </h2>
              <p className="text-muted-foreground">
                Change your identity informations.
              </p>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/80 md:w-auto py-6 text-background cursor-pointer font-semibold">
              Save Changes
            </Button>
          </div>
          <div className="space-y-4 pr-36">
            <FloatingInput
              label="Full Name"
              icon={<User className="h-5 w-5 text-muted-foreground" />}
              id="fullName"
              placeholder="Full Name"
            />

            <FloatingInput
              label="Email"
              icon={<Mail className="h-5 w-5 text-muted-foreground" />}
              id="email"
              type="email"
            />
            <FloatingInput
              label="Phone (optional)"
              icon={<Phone className="h-5 w-5 text-muted-foreground" />}
              id="phone"
              type="tel"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Security Section */}
        <div className="grid md:grid-cols-[300px_1fr] gap-20">
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                Security
              </h2>
              <p className="text-muted-foreground">Last change 12 days ago.</p>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/80 md:w-auto py-6 text-background cursor-pointer font-semibold">
              Save Changes
            </Button>
          </div>
          <div className="space-y-6 pr-36">
            <div className="relative">
              <FloatingInput
                label="Password"
                icon={<Lock className="h-5 w-5 text-muted-foreground" />}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 cursor-pointer" />
                ) : (
                  <Eye className="h-5 w-5 cursor-pointer" />
                )}
              </button>
            </div>

            <div className="relative">
              <FloatingInput
                label="Confirm Password"
                icon={<Lock className="h-5 w-5 text-muted-foreground" />}
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 cursor-pointer" />
                ) : (
                  <Eye className="h-5 w-5 cursor-pointer" />
                )}
              </button>
            </div>

            <div className="space-y-3 mt-20">
              <div className="flex items-center justify-between">
                <Label htmlFor="twoFactor" className="text-lg font-semibold">
                  Two-step Authentication
                </Label>

                <ToggleSwitch
                  checked={twoFactorEnabled}
                  onCheckedChange={setTwoFactorEnabled}
                />
              </div>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-3">
                <Info className="h-5 text-primary w-5 text-info flex-shrink-0 mt-0.5" />
                <p className="text-sm text-primary font-medium ">
                  Two-factor authentication secures your account by requiring a
                  code from your authenticator app each time you log in.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Delete Account Section */}
        <div className="grid md:grid-cols-[300px_1fr] gap-20">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">
              Delete Account
            </h2>
          </div>
          <div className="pr-36">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-start justify-between gap-4">
              <p className="text-sm text-destructive">
                <span className="font-semibold">Note:</span> If you just want to
                pause or stop using PostZest, you can manage your subscription
                instead of deleting your account
              </p>
              <button className="text-destructive hover:text-destructive/80 flex-shrink-0">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
