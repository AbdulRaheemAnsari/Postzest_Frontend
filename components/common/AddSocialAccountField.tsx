import { openSocialConnectModal } from "@/store/slices/socialConnectModalSlice";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";

const AddSocialAccountField = () => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(openSocialConnectModal())}
      className="bg-background rounded-xl cursor-pointer border-2 border-dashed border-border p-4 hover:border-primary/50 transition-all min-h-[140px] flex flex-col items-center justify-center gap-3 group"
    >
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Plus className="w-6 h-6 text-primary" />
      </div>
      <div className="text-center">
        <p className="font-semibold text-card-foreground mb-1">
          Connect a new account
        </p>
        <p className="text-sm text-muted-foreground">You have 1 slot left</p>
      </div>
    </button>
  );
};

export default AddSocialAccountField;
