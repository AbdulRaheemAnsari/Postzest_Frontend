"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

interface ToggleSwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function ToggleSwitch({
  checked = false,
  onCheckedChange,
}: ToggleSwitchProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    onCheckedChange?.(newState);
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative flex items-center transition-colors duration-300 ease-in-out
        ${isChecked ? "bg-primary" : "bg-gray-300"}
        w-11 h-[27px] rounded-full cursor-pointer`}
      aria-pressed={isChecked}
      role="switch"
    >
      {/* Knob */}
      <div
        className="absolute top-[2px] left-[3px] w-[22px] h-[22px] bg-white rounded-full shadow-sm flex items-center justify-center transition-transform duration-300 ease-in-out"
        style={{
          transform: isChecked ? "translateX(17px)" : "translateX(0px)",
          boxShadow: isChecked
            ? "0 2px 5px rgba(37, 99, 235, 0.35)"
            : "0 2px 4px rgba(0,0,0,0.15)",
        }}
      >
        {/* Icon fade animation */}
        <div className="relative flex items-center justify-center">
          {/* Check icon (ON) */}
          <div
            className="absolute transition-all duration-300 ease-in-out"
            style={{
              opacity: isChecked ? 1 : 0,
              transform: isChecked ? "scale(1)" : "scale(0.7)",
            }}
          >
            <Check size={12} className="text-primary" strokeWidth={3} />
          </div>

          {/* X icon (OFF) */}
          <div
            className="absolute transition-all duration-300 ease-in-out"
            style={{
              opacity: isChecked ? 0 : 1,
              transform: isChecked ? "scale(0.7)" : "scale(1)",
            }}
          >
            <X size={12} className="text-gray-500" strokeWidth={3} />
          </div>
        </div>
      </div>
    </button>
  );
}
