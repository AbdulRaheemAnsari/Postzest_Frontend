"use client";
import Image from "next/image";
import SocialAccountImg from "@/assets/images/socialaccounts.png";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import AddSocialAccountField from "@/components/common/AddSocialAccountField";
import SocialAccountCard from "@/components/common/SocialAccountCard";
import { useDispatch } from "react-redux";
import { openSocialConnectModal } from "@/store/slices/socialConnectModalSlice";

export default function SocialAccounts() {
  const dispatch = useDispatch();
  const accounts = [
    {
      id: 1,
      username: "@abdulraheem7284",
      profileImage:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
      hasToggle: true,
      hasRemoveButton: false,
    },
    {
      id: 2,
      username: "@abdulraheem7284",
      profileImage:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      hasToggle: false,
      hasRemoveButton: true,
    },
    {
      id: 3,
      username: "@abdulraheem7284",
      profileImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      hasToggle: true,
      hasRemoveButton: false,
    },
    {
      id: 4,
      username: "@abdulraheem7284",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      hasToggle: false,
      hasRemoveButton: true,
    },
    {
      id: 5,
      username: "@abdulraheem7284",
      profileImage:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      hasToggle: false,
      hasRemoveButton: true,
    },
    {
      id: 6,
      username: "@abdulraheem7284",
      profileImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      hasToggle: true,
      hasRemoveButton: false,
    },
    {
      id: 7,
      username: "@abdulraheem7284",
      profileImage:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop",
      hasToggle: true,
      hasRemoveButton: false,
    },
    {
      id: 8,
      username: "@abdulraheem7284",
      profileImage:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
      hasToggle: false,
      hasRemoveButton: true,
    },
    {
      id: 9,
      username: "@abdulraheem7284",
      profileImage:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      hasToggle: false,
      hasRemoveButton: true,
    },
    {
      id: 10,
      username: "@abdulraheem7284",
      profileImage:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop",
      hasToggle: true,
      hasRemoveButton: false,
    },
    {
      id: 11,
      username: "@abdulraheem7284",
      profileImage:
        "https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=100&h=100&fit=crop",
      hasToggle: true,
      hasRemoveButton: false,
    },
  ];

  const handleDisconnect = (id: number) => {
    toast("Account Disconnected");
  };

  const handleRefresh = (id: number) => {
    toast.success("Connection Refreshed");
  };

  return (
    <div className="w-full bg-background flex flex-col items-center justify-start">
      {/* Header */}
      <div className="flex md:flex-row flex-col w-full items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-foreground whitespace-nowrap">
          Connected Accounts
        </h1>
        <div className="flex md:flex-row flex-col items-center justify-end gap-4 w-full">
          <button className="p-2 hover:bg-accent rounded-lg transition-colors">
            <Search className="w-5 h-5 text-muted-foreground" />
          </button>
          <Button
            onClick={() => dispatch(openSocialConnectModal())}
            className="flex md:w-auto w-full cursor-pointer hover:bg-primary/90 items-center justify-center gap-0.5 bg-primary py-6 px-12 font-semibold text-sm"
          >
            <Plus strokeWidth={3} className="w-6 h-6" />
            Connect Account
          </Button>
        </div>
      </div>

      {accounts.length > 0 ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((account) => (
            <SocialAccountCard
              key={account.id}
              username={account.username}
              profileImage={account.profileImage}
              isConnected={true}
              hasToggle={account.hasToggle}
              hasRemoveButton={account.hasRemoveButton}
              onDisconnect={() => handleDisconnect(account.id)}
              onRefresh={() => handleRefresh(account.id)}
            />
          ))}
          <AddSocialAccountField />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-2">
          <Image
            draggable={false}
            src={SocialAccountImg}
            alt="SocialAccounts"
            className="md:w-80 w-60"
          />
          <p className="md:text-3xl text-2xl text-center font-semibold text-foreground">
            No Social Accounts Connected
          </p>
          <span className="md:text-lg text-sm font-medium text-muted-foreground text-center leading-5 pb-4">
            To upload post on social media and reach you audience, you <br />
            should link your accounts.
          </span>
          <Button
            onClick={() => dispatch(openSocialConnectModal())}
            className="flex cursor-pointer hover:bg-primary/90 items-center justify-center gap-0.5 bg-primary py-6 px-12 font-semibold text-sm"
          >
            <Plus className="w-6 h-6" />
            Connect Account
          </Button>
        </div>
      )}
    </div>
  );
}
