"use client"
import React, { useState } from "react";

interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  label,
  id,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value);

  return (
    <div className="relative w-full">
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
        className={`peer w-full rounded-lg border border-input-border bg-transparent px-4 pt-6 pb-2 text-base text-foreground 
          focus:border-primary focus:ring-0 focus:outline-none transition-all duration-200`}
        placeholder=" " // space to trigger peer-placeholder-shown
      />
      <label
        htmlFor={id}
        className={`absolute left-4 text-foreground transition-all duration-200 
          ${
            focused || hasValue
              ? "-top-2 text-xs text-foreground bg-background px-1"
              : "top-3.5 text-base text-muted-foreground"
          }`}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;
