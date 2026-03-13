"use client";
import { useEffect, useState, forwardRef } from "react";
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

const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  (
    {
      label,
      icon,
      className,
      id,
      parentClassName,
      type,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Check if the field has a value - important for pre-filled forms
    const checkHasValue = (val: any) => {
      if (val === null || val === undefined) return false;
      if (typeof val === "string") return val.length > 0;
      return true;
    };

    const [hasValue, setHasValue] = useState(
      () => checkHasValue(value) || checkHasValue(defaultValue)
    );

    // Update hasValue when value prop changes (important for React Hook Form)
    useEffect(() => {
      setHasValue(checkHasValue(value));
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setHasValue(checkHasValue(inputValue));
      // Call the onChange from React Hook Form or parent component
      if (onChange) {
        onChange(e);
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (onFocus) {
        onFocus(e);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(checkHasValue(e.target.value));
      if (onBlur) {
        onBlur(e);
      }
    };

    const isPassword = type === "password";

    return (
      <div className={cn("relative", parentClassName)}>
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
            className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 z-20 text-muted-foreground hover:text-foreground transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        <Input
          ref={ref}
          id={id}
          type={isPassword && showPassword ? "text" : type}
          value={value}
          defaultValue={defaultValue}
          autoComplete="off"
          className={cn(
            "peer h-14 transition-all bg-background text-md",
            icon ? "pl-12" : "pl-4",
            isPassword ? "pr-12" : "pr-4",
            "border-border hover:border-primary/50 focus:border-primary",
            "focus-visible:ring-1 focus-visible:ring-primary",
            className
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
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
  }
);

FloatingInput.displayName = "FloatingInput";

export default FloatingInput;
