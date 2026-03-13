"use client";
import CreatePostModal from "./CreatePostModal";
import { SocialConnectModal } from "./SocialConnectModal";

export default function ClientModals() {
  return (
    <div>
      <CreatePostModal open={false} onOpenChange={() => { }} />
      <SocialConnectModal open={false} onOpenChange={() => { }} />
    </div>
  );
}
