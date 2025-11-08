"use client";
import React, { useState } from "react";

interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  icon?: React.ReactNode;
  parentClassName?: string;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  label,
  id,
  icon,
  parentClassName,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value);

  return (
    <div className={`relative w-full ${parentClassName ?? ""}`}>
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
          {icon}
        </div>
      )}

      <input
        id={id}
        {...props}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          setHasValue(!!e.target.value);
          props.onBlur?.(e);
        }}
        className={`peer w-full rounded-lg border border-input-border !bg-transparent 
          ${icon ? "pl-10 pr-4" : "px-4"} pt-5 pb-2 text-base text-foreground
          focus:border-primary focus:ring-0 focus:outline-none transition-all duration-200`}
        placeholder=" "
      />

      <label
        htmlFor={id}
        className={`absolute transition-all duration-200 bg-background px-1
          ${icon ? "left-10" : "left-4"}
          ${
            focused || hasValue
              ? "-top-2 text-xs text-foreground"
              : "top-3.5 text-base text-muted-foreground"
          }`}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;
