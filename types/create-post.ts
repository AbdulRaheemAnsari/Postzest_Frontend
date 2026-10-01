export type PlatformId =
  | "x"
  | "linkedin"
  | "instagram"
  | "tiktok"
  | "threads"
  | "bluesky"
  | "facebook"
  | "youtube";

export interface SocialAccount {
  id: string;
  name: string;
  username: string;
  platform: PlatformId;
  avatar: string;
  isConnected: boolean;
  color?: string;
}

export interface UploadedMedia {
  id: string;
  url: string;
  file?: File;
  name: string;
  size: number; // bytes
  type: "image" | "video";
  aspectRatio?: "4:5" | "1:1" | "16:9" | "custom";
  altText?: string;
}

export interface ChannelContent {
  caption: string;
  firstComment: string;
  title?: string;
  isCustomized: boolean;
}

export interface PlatformConfig {
  id: PlatformId;
  name: string;
  maxChars: number;
  supportsFirstComment: boolean;
  supportsTitle: boolean;
  color: string;
  iconName: string;
}

export const PLATFORM_CONFIGS: Record<PlatformId, PlatformConfig> = {
  x: {
    id: "x",
    name: "X (Twitter)",
    maxChars: 280,
    supportsFirstComment: true,
    supportsTitle: false,
    color: "#000000",
    iconName: "x",
  },
  linkedin: {
    id: "linkedin",
    name: "LinkedIn",
    maxChars: 3000,
    supportsFirstComment: true,
    supportsTitle: false,
    color: "#0A66C2",
    iconName: "linkedin",
  },
  instagram: {
    id: "instagram",
    name: "Instagram",
    maxChars: 2200,
    supportsFirstComment: true,
    supportsTitle: false,
    color: "#E4405F",
    iconName: "instagram",
  },
  tiktok: {
    id: "tiktok",
    name: "TikTok",
    maxChars: 2200,
    supportsFirstComment: false,
    supportsTitle: true,
    color: "#000000",
    iconName: "tiktok",
  },
  threads: {
    id: "threads",
    name: "Threads",
    maxChars: 500,
    supportsFirstComment: false,
    supportsTitle: false,
    color: "#000000",
    iconName: "threads",
  },
  bluesky: {
    id: "bluesky",
    name: "Bluesky",
    maxChars: 300,
    supportsFirstComment: false,
    supportsTitle: false,
    color: "#1185FE",
    iconName: "bluesky",
  },
  facebook: {
    id: "facebook",
    name: "Facebook",
    maxChars: 63206,
    supportsFirstComment: true,
    supportsTitle: false,
    color: "#1877F2",
    iconName: "facebook",
  },
  youtube: {
    id: "youtube",
    name: "YouTube",
    maxChars: 5000,
    supportsFirstComment: true,
    supportsTitle: true,
    color: "#FF0000",
    iconName: "youtube",
  },
};
