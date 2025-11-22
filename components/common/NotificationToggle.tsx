"use client"
import { useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationToggleProps {
  title: string;
  description: string;
  defaultEnabled?: boolean;
  onChange?: (enabled: boolean) => void;
}

const NotificationToggle = ({
  title,
  description,
  defaultEnabled = false,
  onChange,
}: NotificationToggleProps) => {
  const [enabled, setEnabled] = useState(defaultEnabled);

  const handleToggle = () => {
    const newState = !enabled;
    setEnabled(newState);
    onChange?.(newState);
  };

  return (
    <div className="flex items-start justify-between gap-4 py-6 border-b border-border last:border-0">
      <div className="flex-1">
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
      <button
        onClick={handleToggle}
        className={cn(
          "relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
          enabled ? "bg-primary" : "bg-muted"
        )}
        role="switch"
        aria-checked={enabled}
      >
        <span
          className={cn(
            "pointer-events-none inline-flex h-7 w-7 transform items-center justify-center rounded-full bg-background shadow-lg ring-0 transition-transform duration-200 ease-in-out",
            enabled ? "translate-x-6" : "translate-x-0.5"
          )}
        >
          {enabled ? (
            <Check className="h-4 w-4 text-primary" strokeWidth={3} />
          ) : (
            <X className="h-4 w-4 text-muted-foreground" strokeWidth={3} />
          )}
        </span>
      </button>
    </div>
  );
};

export default NotificationToggle;
