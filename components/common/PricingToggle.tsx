import { useState } from "react";

interface PricingToggleProps {
  onToggle: (isAnnual: boolean) => void;
}

const PricingToggle = ({ onToggle }: PricingToggleProps) => {
  const [isAnnual, setIsAnnual] = useState(false);

  const handleToggle = () => {
    const newValue = !isAnnual;
    setIsAnnual(newValue);
    onToggle(newValue);
  };

  return (
    <div className="flex items-center justify-center gap-3 mb-12">
      <span
        className={`text-sm font-medium transition-colors ${
          !isAnnual ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        Monthly
      </span>
      <button
        onClick={handleToggle}
        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors border-primary border cursor-pointer bg-muted"
        role="switch"
        aria-checked={isAnnual}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-primary transition-transform ${
            isAnnual ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
      <span
        className={`text-sm font-medium transition-colors ${
          isAnnual ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        Annual
      </span>
    </div>
  );
};

export default PricingToggle;
