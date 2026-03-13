import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { closeSocialConnectModal } from "@/store/slices/socialConnectModalSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import facebook from "@/assets/images/facebook.png";
import instagram from "@/assets/images/instagram.png";
import linkedin from "@/assets/images/linkedin.png";
import { useGetLinkedinAuthUrl } from "@/queries/social/useLinkedinConnect";
import bluesky from "@/assets/images/bluesky.png";
import pinterest from "@/assets/images/pinterest.png";
import youtube from "@/assets/images/youtube.png";
import threads from "@/assets/images/threads.png";
import tiktok from "@/assets/images/tiktok.png";
import { Plus } from "lucide-react";
import Image from "next/image";
import { StaticImageData } from "next/image";

interface SocialAccount {
  id: string;
  name: string;
  subtitle: string;
  icon: StaticImageData;
  color: string;
  connected: boolean;
}

interface SocialConnectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const socialAccounts: SocialAccount[] = [
  {
    id: "facebook",
    name: "Facebook",
    subtitle: "Profiles & Pages",
    icon: facebook,
    color: "#1877F2",
    connected: false,
  },
  {
    id: "instagram",
    name: "Instagram",
    subtitle: "Business",
    icon: instagram,
    color: "#E4405F",
    connected: false,
  },
  {
    id: "tiktok",
    name: "Tik Tok",
    subtitle: "Personal & business",
    icon: tiktok,
    color: "#000000",
    connected: false,
  },
  {
    id: "youtube",
    name: "Youtube",
    subtitle: "Channels",
    icon: youtube,
    color: "#FF0000",
    connected: false,
  },
  {
    id: "linkedin",
    name: "Linkedin",
    subtitle: "Profile & pages",
    icon: linkedin,
    color: "#0A66C2",
    connected: false,
  },
  {
    id: "pinterest",
    name: "Pinterest",
    subtitle: "Profile & public boards",
    icon: pinterest,
    color: "#E60023",
    connected: false,
  },
  {
    id: "threads",
    name: "Threads",
    subtitle: "Profile",
    icon: threads,
    color: "#000000",
    connected: false,
  },
  {
    id: "bluesky",
    name: "Bluesky",
    subtitle: "Profile",
    icon: bluesky,
    color: "#1185FE",
    connected: false,
  },
];

export const SocialConnectModal = ({ }: SocialConnectModalProps) => {
  const dispatch = useDispatch();
  const isSocialConnectModalOpen = useSelector(
    (state: RootState) => state.socialConnectModal.socialConnectModalOpen
  );
  const { refetch: getLinkedinUrl } = useGetLinkedinAuthUrl();

  const handleConnect = async (accountId: string) => {
    if (accountId === "linkedin") {
      const { data: url } = await getLinkedinUrl();
      if (url) {
        window.location.href = url;
      }
    } else {
      console.log(`Connecting to ${accountId}`);
    }
  };

  return (
    <Dialog
      open={isSocialConnectModalOpen}
      onOpenChange={() => dispatch(closeSocialConnectModal())}
    >
      <DialogContent className="max-w-[95vw] sm:max-w-[85vw] md:max-w-2xl p-0 gap-0 bg-background max-h-[90vh] overflow-y-auto">
        <DialogHeader className="px-4 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-semibold">
              Connect New Accounts
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="px-4 pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {socialAccounts.map((account) => (
              <div
                key={account.id}
                className="flex sm:flex-col sm:gap-0 gap-2 flex-row items-center justify-between px-3 py-4 bg-background border border-border rounded-lg transition-all duration-200"
              >
                <div className="flex sm:flex-col flex-row items-center gap-2">
                  <Image
                    src={account.icon}
                    alt="Social Icon"
                    draggable={false}
                    className="mb-3 w-16 h-16"
                  />
                  <div className="flex flex-col sm:items-center justify-center">
                    <h3 className="font-semibold text-lg sm:mb-1">
                      {account.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-4">
                      {account.subtitle}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="sm:w-full font-semibold flex py-4 hover:bg-primary/10 items-center justify-center gap-0.5 cursor-pointer hover:text-primary text-primary border-primary transition-colors"
                  onClick={() => handleConnect(account.id)}
                >
                  <Plus />
                  Connect
                </Button>
              </div>
            ))}

            {/* Can't find it card */}
            <div className="flex sm:flex-col flex-row gap-2 items-center sm:justify-center px-3 py-4 border border-border rounded-lg transition-all duration-200 cursor-pointer sm:min-h-[200px]">
              <div className="sm:mb-3 w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Plus className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Can't find it?</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
