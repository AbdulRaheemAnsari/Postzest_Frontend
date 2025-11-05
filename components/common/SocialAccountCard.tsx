import { useState } from "react";
import { CircleCheck, MoreVertical, RefreshCw, Trash, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import instagram from "@/assets/images/instagram.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "../ui/separator";
import Image from "next/image";

interface AccountCardProps {
  username: string;
  profileImage: string;
  isConnected: boolean;
  hasToggle?: boolean;
  hasRemoveButton?: boolean;
  onToggle?: (checked: boolean) => void;
  onRemove?: () => void;
  onDisconnect?: () => void;
  onRefresh?: () => void;
}

const SocialAccountCard = ({
  username,
  profileImage,
  isConnected,
  hasToggle = true,
  onToggle,
  onDisconnect,
  onRefresh,
}: AccountCardProps) => {
  const [isToggled, setIsToggled] = useState(hasToggle);

  const handleToggle = (checked: boolean) => {
    setIsToggled(checked);
    onToggle?.(checked);
  };

  return (
    <div className="bg-background rounded-xl border border-border p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={profileImage}
              alt={username}
              className="w-12 h-12 rounded-full object-cover border-2 border-primary"
            />
            <div className="absolute -bottom-0.5 z-20 -right-1 w-5 h-5 bg-success rounded-full border border-card">
             <Image src={instagram} alt="" className="w-5" />
            </div>
          </div>
          <div>
            <p className="font-semibold text-card-foreground">Instagram</p>
            <p className="text-sm text-muted-foreground">{username}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-muted-foreground hover:text-foreground transition-colors">
            <MoreVertical className="w-5 h-5 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-popover">
            <DropdownMenuItem
              onClick={onDisconnect}
              className="cursor-pointer hover:bg-accent"
            >
              <Trash />
              Disconnect
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onRefresh}
              className="cursor-pointer hover:bg-accent"
            >
              <RefreshCw />
              Refresh Connection
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator className="bg-muted-foreground/16 my-4" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-0.5 bg-[#F1F9EB] rounded-full px-2 py-0.5">
          <CircleCheck className="w-3 h-3 text-[#78C841]" />
          <span className="text-sm font-medium text-success text-[#78C841]">
            Connected
          </span>
        </div>

        <Switch
          checked={isToggled}
          onCheckedChange={handleToggle}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default SocialAccountCard;
