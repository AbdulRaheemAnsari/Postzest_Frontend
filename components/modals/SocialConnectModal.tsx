import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Youtube, Linkedin, Plus, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { closeSocialConnectModal } from "@/store/slices/socialConnectModalSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface SocialAccount {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
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
    icon: <Facebook className="w-10 h-10" />,
    color: "#1877F2",
    connected: false,
  },
  {
    id: "instagram",
    name: "Instagram",
    subtitle: "Business",
    icon: <Instagram className="w-10 h-10" />,
    color: "#E4405F",
    connected: false,
  },
  {
    id: "tiktok",
    name: "Tik Tok",
    subtitle: "Personal & business",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
    color: "#000000",
    connected: false,
  },
  {
    id: "youtube",
    name: "Youtube",
    subtitle: "Channels",
    icon: <Youtube className="w-10 h-10" />,
    color: "#FF0000",
    connected: false,
  },
  {
    id: "linkedin",
    name: "Linkedin",
    subtitle: "Profile & pages",
    icon: <Linkedin className="w-10 h-10" />,
    color: "#0A66C2",
    connected: false,
  },
  {
    id: "pinterest",
    name: "Pinterest",
    subtitle: "Profile & public boards",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
      </svg>
    ),
    color: "#E60023",
    connected: false,
  },
  {
    id: "threads",
    name: "Threads",
    subtitle: "Profile",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.02-5.11.934-6.54 2.717-1.296 1.615-1.971 3.963-2.007 6.987v.018c.036 3.021.715 5.367 2.015 6.982 1.43 1.786 3.631 2.698 6.541 2.717 2.623-.02 4.584-.787 5.825-2.28.875-1.054 1.463-2.396 1.745-3.986h-5.51V11.29h7.51v1.55c0 2.822-.747 5.177-2.217 7.005-1.643 2.055-4.049 3.114-7.153 3.155z" />
      </svg>
    ),
    color: "#000000",
    connected: false,
  },
  {
    id: "bluesky",
    name: "Bluesky",
    subtitle: "Profile",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z" />
      </svg>
    ),
    color: "#1185FE",
    connected: false,
  },
];

export const SocialConnectModal = ({}: SocialConnectModalProps) => {
  const dispatch = useDispatch();
  const isSocialConnectModalOpen = useSelector(
    (state: RootState) => state.socialConnectModal.socialConnectModalOpen
  );

  const handleConnect = (accountId: string) => {
    console.log(`Connecting to ${accountId}`);
  };

  return (
    <Dialog
      open={isSocialConnectModalOpen}
      onOpenChange={() => dispatch(closeSocialConnectModal())}
    >
      <DialogContent className="max-w-[95vw] sm:max-w-[85vw] md:max-w-2xl lg:max-w-3xl p-0 gap-0 bg-background max-h-[90vh] overflow-y-auto">
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
                  <div
                    className="mb-3 transition-transform duration-200 hover:scale-110"
                    style={{ color: account.color }}
                  >
                    {account.icon}
                  </div>
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
