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
      className={`relative w-14 cursor-pointer h-8 rounded-full transition-colors duration-400 ${
        isChecked ? "bg-primary" : "bg-gray-300"
      }`}
      aria-pressed={isChecked}
      role="switch"
    >
      {/* Sliding knob */}
      <div
        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-400`}
        style={{
          transform: isChecked ? "translateX(24px)" : "translateX(0px)",
          boxShadow: isChecked
            ? "0 4px 10px rgba(37, 99, 235, 0.4)"
            : "0 3px 6px rgba(0,0,0,0.15)",
        }}
      >
        {/* Icon fade animation */}
        <div className="relative flex items-center justify-center">
          {/* Check icon when ON */}
          <div
            className="absolute transition-all duration-300 ease-in-out"
            style={{
              opacity: isChecked ? 1 : 0,
              transform: isChecked ? "scale(1)" : "scale(0.8)",
            }}
          >
            <Check size={14} className="text-primary" strokeWidth={3} />
          </div>

          {/* X icon when OFF */}
          <div
            className="absolute transition-all duration-300 ease-in-out"
            style={{
              opacity: isChecked ? 0 : 1,
              transform: isChecked ? "scale(0.8)" : "scale(1)",
            }}
          >
            <X size={16} className="text-gray-500" strokeWidth={3} />
          </div>
        </div>
      </div>
    </button>
  );
}
