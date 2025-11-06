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
import { accounts } from "@/data/mockPosts";

export default function SocialAccounts() {
  const dispatch = useDispatch();

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
            className="flex cursor-pointer hover:bg-primary/90 items-center justify-center gap-0.5 bg-primary py-6 !px-5 font-semibold text-md"
          >
            <Plus strokeWidth={3} className="w-6 h-6" />
            Connect Account
          </Button>
        </div>
      )}
    </div>
  );
}
