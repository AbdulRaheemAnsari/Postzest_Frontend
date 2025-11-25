"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  parentClassName?: string;
}

const FloatingInput = ({
  label,
  icon,
  className,
  id,
  parentClassName,
  type,
  ...props
}: FloatingInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hasValue, setHasValue] = useState(
    !!props.value || !!props.defaultValue
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value !== "");
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const isPassword = type === "password";

  return (
    <div className={`relative ${parentClassName}`}>
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10 text-muted-foreground">
          {icon}
        </div>
      )}

      {/* Eye Icon for password */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-muted-foreground"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}

      <Input
        id={id}
        type={isPassword && showPassword ? "text" : type}
        className={cn(
          "peer h-14 transition-all bg-background pr-12 text-md",
          icon ? "pl-12" : "pl-4",
          "border-border hover:border-primary/50 focus:border-primary",
          "focus-visible:ring-1 focus-visible:ring-primary",
          isFocused || hasValue ? "py-2" : "py-2",
          className
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value !== "");
        }}
        onChange={handleChange}
        {...props}
      />
      <Label
        htmlFor={id}
        className={cn(
          "absolute transition-all pointer-events-none font-medium duration-200",
          icon ? "left-12" : "left-4",
          isFocused || hasValue
            ? `-top-1.5 text-xs ${
                icon && "left-10"
              } px-1 bg-background text-xs text-muted-foreground`
            : "top-1/2 -translate-y-1/2 text-md text-muted-foreground"
        )}
      >
        {label}
      </Label>
    </div>
  );
};

export default FloatingInput;