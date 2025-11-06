import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Account {
  id: string;
  username: string;
  platform: "instagram" | "tiktok";
  avatar?: string;
}

const mockAccounts: Account[] = [
  { id: "1", username: "raheemansari7284", platform: "instagram" },
  { id: "2", username: "johndoe_insta", platform: "instagram" },
  { id: "3", username: "sarahsmith_tk", platform: "tiktok" },
  { id: "4", username: "creativemind", platform: "instagram" },
  { id: "5", username: "tiktok_creator", platform: "tiktok" },
];

interface AccountMultiSelectProps {
  selectedAccounts: Account[];
  onSelectionChange: (accounts: Account[]) => void;
}

export const AccountMultiSelect = ({
  selectedAccounts,
  onSelectionChange,
}: AccountMultiSelectProps) => {
  const [open, setOpen] = useState(false);

  const toggleAccount = (account: Account) => {
    const isSelected = selectedAccounts.some((a) => a.id === account.id);
    if (isSelected) {
      onSelectionChange(selectedAccounts.filter((a) => a.id !== account.id));
    } else {
      onSelectionChange([...selectedAccounts, account]);
    }
  };

  const removeAccount = (accountId: string) => {
    onSelectionChange(selectedAccounts.filter((a) => a.id !== accountId));
  };

  const getPlatformColor = (platform: string) => {
    return platform === "instagram"
      ? "bg-gradient-to-r from-purple-500 to-pink-500"
      : "bg-gradient-to-r from-cyan-500 to-blue-500";
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Select Accounts
      </label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-background hover:bg-accent/50 h-auto min-h-[40px] py-2"
          >
            <div className="flex items-center gap-2 flex-wrap">
              {selectedAccounts.length === 0 ? (
                <span className="text-muted-foreground">
                  Select accounts...
                </span>
              ) : (
                selectedAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center gap-1.5 bg-primary/10 text-primary rounded-md px-2 py-1"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Avatar className="w-4 h-4">
                      <AvatarImage src={account.avatar} />
                      <AvatarFallback
                        className={cn(
                          "text-[8px] text-white",
                          getPlatformColor(account.platform)
                        )}
                      >
                        {account.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">
                      {account.username}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeAccount(account.id);
                      }}
                      className="hover:bg-primary/20 rounded-sm p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))
              )}
            </div>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full p-0 bg-popover border-border z-50"
          align="start"
        >
          <div className="max-h-[300px] overflow-y-auto">
            <div className="p-2 space-y-1">
              {mockAccounts.map((account) => {
                const isSelected = selectedAccounts.some(
                  (a) => a.id === account.id
                );
                return (
                  <button
                    key={account.id}
                    onClick={() => toggleAccount(account)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
                      "hover:bg-accent",
                      isSelected && "bg-accent"
                    )}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={account.avatar} />
                      <AvatarFallback
                        className={cn(
                          "text-xs text-white font-medium",
                          getPlatformColor(account.platform)
                        )}
                      >
                        {account.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-foreground">
                        {account.username}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {account.platform}
                      </p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-primary" />}
                  </button>
                );
              })}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {selectedAccounts.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {selectedAccounts.length} account
          {selectedAccounts.length > 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
};

export type { Account };
export { mockAccounts };
